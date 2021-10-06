import {
    createElement,
    directionText,
    // tempGuideLine,
    simpleHandWrite,
    sentenseSplitChoice,
} from '../component';
const KM000067 = async function ({
    canvas,
    direction,
    elements,
    wordChoose,
    handWriteValue,
    callback
}) {
    // tempGuideLine(canvas);
    console.log('start');
    const g = canvas.g();
    const backG = g.g();
    const ttsG = g.g();
    const chooseG = g.g();
    const handWriteG = g.g();

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


    const hw = new simpleHandWrite({
        'canvas': handWriteG,
        'x': handWriteValue.x,
        'y': handWriteValue.y,
        'width': handWriteValue.width,
        'height': handWriteValue.height,
        'rXY': handWriteValue.rXY,
        'drawClassNum': handWriteValue.drawClassNum,
        'drawStrokeWidth': handWriteValue.drawStrokeWidth,
        'boxFillClassNum': handWriteValue.boxFillClassNum,
        'boxStrokeClassNum': handWriteValue.boxStrokeClassNum,
        'boxOpacity': handWriteValue.boxOpacity,
        'shadowDx': handWriteValue.shadowDx,
        'shadowDy': handWriteValue.shadowDy,
        'shadowBlur': handWriteValue.shadowBlur,
        'shadowOpacity': handWriteValue.shadowOpacity,
        'shadowClassNum': handWriteValue.shadowClassNum,
        'direction': handWriteValue.direction || true,
        'directionInfo': handWriteValue.directionInfo,
        'startPoint': handWriteValue.startPoint,
        'wordHint': handWriteValue.wordHint || false,
        'wordHintClassNum': handWriteValue.wordHintClassNum,
        'wordHintOpacity': handWriteValue.wordHintOpacity,
        'wordHintFs': handWriteValue.wordHintFs || 120,
        'dotLine': handWriteValue.dotLine || false,
        'dotLineClassNum': handWriteValue.dotLineClassNum,
        'dotLineStrokeWidth': handWriteValue.dotLineStrokeWidth,
        'dotLineOpacity': handWriteValue.dotLineOpacity,
        'okButton': handWriteValue.okButton,
        'undoButton': handWriteValue.undoButton,
        'resetButton': handWriteValue.resetButton,
        'answer': handWriteValue.answer,
        callback: function () {
           console.log('종료');
           callback();
        }
    });

    const choice = new sentenseSplitChoice({
        canvas : chooseG,
        sentense : wordChoose.text,
        x : wordChoose.x,
        y : wordChoose.y,
        classNum : wordChoose.classNum,
        fontSize : wordChoose.fontSize,
        hoverClassNum : wordChoose.hoverClassNum,
        fbClassNum : wordChoose.fbClassNum,
        isHint : wordChoose.isHint,
        ansIndex : wordChoose.ansIndex,
        callback : function(){
            console.log('next go');
            hw.start();
        }
    });
    

    //시작
    hw.show();
    choice.start();
};
export default KM000067;