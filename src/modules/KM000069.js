import {
    createElement,
    directionText,
    // tempGuideLine,
    simpleHandWrite,
    makeOk,
} from '../component';
const KM000069 = async function ({
    canvas,
    direction,
    elements,
    nextStep,
    handWriteValue,
    callback
}) {
    // tempGuideLine(canvas);
    console.log('start');
    const g = canvas.g();
    const backG = g.g();
    const ttsG = g.g();
    const nextStepG = g.g().attr('opacity',0);
    const handWriteG = g.g();
    let isQ = false;
    let nextButton;

    // 지시문
    if (direction)
        directionText({
            canvas: ttsG,
            ...direction
        });

    //배경 존재 시 설정
    if (elements) {
        elements.forEach(el => {
            createElement({
                type: el.type,
                canvas: backG,
                meta: el.meta
            });
        });
    }

    if(nextStep){
        const {elements,okButton} = nextStep;
        if(elements){
            elements.forEach(el => {
                createElement({
                    type: el.type,
                    canvas: nextStepG,
                    meta: el.meta
                });
            });
        }
        if(okButton){
            nextButton = new makeOk({
                'canvas': nextStepG,
                'type': okButton.type,
                'cx': okButton.cx,
                'cy': okButton.cy,
                'scale':okButton.scale,
                'visibility': false,
                'event': false,
                'callback': function() {
                    console.log('종료');
                    callback();
                }
            });
        }
    }

    const hw =[];
    const focus = [];
    let count =0;
    if(handWriteValue){
        isQ = true;
        handWriteValue.forEach((el,i) => {
            const rxy = (el.rXY || 20);
            hw[i] = new simpleHandWrite({
                'canvas': handWriteG,
                'x': el.x,
                'y': el.y,
                'width': el.width,
                'height': el.height,
                'rXY': rxy,
                'drawClassNum': el.drawClassNum,
                'drawStrokeWidth': el.drawStrokeWidth,
                'boxFillClassNum': el.boxFillClassNum,
                'boxStrokeClassNum': el.boxStrokeClassNum,
                'boxOpacity': el.boxOpacity,
                'shadowDx': el.shadowDx,
                'shadowDy': el.shadowDy,
                'shadowBlur': el.shadowBlur,
                'shadowOpacity': el.shadowOpacity,
                'shadowClassNum': el.shadowClassNum,
                'direction': el.direction || false,
                'directionInfo': el.directionInfo,
                'startPoint': el.startPoint,
                'wordHint': el.wordHint || false,
                'wordHintClassNum': el.wordHintClassNum,
                'wordHintOpacity': el.wordHintOpacity,
                'wordHintFs': el.wordHintFs || 140,
                'wordHintShow': true,
                'dotLine': el.dotLine || false,
                'dotLineClassNum': el.dotLineClassNum,
                'dotLineStrokeWidth': el.dotLineStrokeWidth,
                'dotLineOpacity': el.dotLineOpacity,
                'okButton': el.okButton,
                'undoButton': el.undoButton,
                'resetButton': el.resetButton,
                'answer': el.answer,
                callback: next
            });
            focus[i] = handWriteG.rect(el.x,el.y,el.width,el.height,rxy,rxy)
                                .addClass('fno s02')
                                .attr({
                                    'opacity':0,
                                    'strokeWidth':3
                                });
        })
    }

    //시작
    start();
    
    function next() {
        if(count < hw.length-1){
            focus[count].attr('opacity',0);
            hw[count].okBtn.kill();
            count++;
            focus[count].attr('opacity',1);
            hw[count].start();
        }else{
            console.log('종료');
            callback();
        }
    }
    
    function start(){
        if(!isQ){
            setTimeout(() => {
                nextStepG.attr('opacity',1);
            },1000);
            setTimeout(() => {
                nextButton.start();
            },1500);
        }else {
            hw.forEach(el=>el.show());
            focus[count].attr('opacity',1);
            hw[count].start();
        }
    }
};
export default KM000069;