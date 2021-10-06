import {
    createElement,
    directionText,
    // tempGuideLine,
    helpButton,
    K_makeButton,
} from '../component';
import { feedback } from 'sol-common/util';
import { hint } from 'sol-common';


const KM000074 = async function ({
    canvas,
    direction,
    elements,
    help,
    choice,
    callback
}) {
    // tempGuideLine(canvas);
    console.log('start');
    const g = canvas.g();
    const backG = g.g();
    const ttsG = g.g();
    const choiceG =g.g();
    const choicEl = [];
    let hintEl;
    let count = 0;

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

    if(help){
        const  { x, y, size = 1 }= help.button
        const { fontSize, text, classNum = '91', bold = false, bgFillClass = '14', bgStrokeClass='no', bgOpacity = 1, messageGap} = help.helpText;
        //힌트생성
        new helpButton({
            'canvas': backG,
            'btnXY':[x, y],
            'btnSize':size,
            'fontSize':fontSize,
            'hintMessage': text,
            'className' : 'ffng f' + classNum,
            'bold':bold,
            'backgroundClass':'f'+bgFillClass+' s'+bgStrokeClass,
            'backgroundOpacity': bgOpacity,
            'messageGap' : messageGap,
            'type' : 'r',
            'event': true
        });
    }

    choice.elements.forEach((element,i) => {
        choicEl[i] = choiceG.g();
        let rxy , shadowClass;
        element.forEach(el => {
            rxy = el.meta?.rXY || 10;
            shadowClass = el.meta?.shadowClassNum || '0006';
            createElement({
                type: el.type,
                canvas: choicEl[i],
                meta: { ...el.meta, shadowClassNum: undefined }
            });
        })
        const groupBbox = choicEl[i].getTBox();
        choicEl[i].data('index', i).data('clickEnd', false).data('fbInfo', { rXY: rxy });
        new K_makeButton({
            el: choicEl[i],
            x: groupBbox.cx,
            y: groupBbox.cy,
            width: groupBbox.width,
            height: groupBbox.height,
            fillClassNum: '14',
            strokeClassNum: 'no',
            shadowClassNum: shadowClass,
            r: rxy,
            index: i,
            isMetaSize: true,
            endCallback: actionCallback
        });
        choicEl[i].stop();
    });


    //처음 시작
    start(choicEl, count);

    //시작 함수
    function start(element, n) {
        element.forEach((el, k) => {
            if (n < (choice?.hintCount||0)) {
                //힌트 있을 때
                if (choice.ansIndex === k) {
                    const bbox = el.getTBox();
                    el.reStart(); //엘리먼트 활성
                    hintEl = hint({
                        canvas: g,
                        XY: [bbox.cx, bbox.cy]
                    }); //힌트 생성
                }
            } else {
                //힌트가 없거나 끝났을 때
                if (!el.data('clickEnd')) el.reStart();
            }
        });
    }

    //choice callback
    function actionCallback(index, group) {
        const element = choicEl[index];
        if (hintEl) hintEl.removeHint();
        const elBBox = element.getTBox();
        const bool = choice.ansIndex === index;
        //o,x 피드백
        const className = bool ? 'fno s0018' : 'fno s0019';
        const box = g
            .rect(elBBox.x, elBBox.y, elBBox.w, elBBox.h, group.data('rXY'), group.data('rXY'))
            .addClass(className)
            .attr({
                strokeWidth: 5
            }); // 네모 피드백
        element.data('clickEnd', true); //클릭이 끝남을 나타냄
        pause(choicEl);
        const fb = new feedback({
            canvas: g,
            el: [elBBox.x2 + 10, elBBox.y],
            bool: bool,
            gap: [0, 0],
            scale: 1,
            addAction: false,
            onRemove: function () {
                if (bool) {
                    //정답 시
                    callback();
                } else {
                    //오답 시
                    box.attr('opacity', 0);
                    element.attr('opacity', 0.4);
                    fb.addUserAction();
                    setTimeout(function () {
                        reStart(choicEl);
                    }, 300);
                }
            }
        });
    }

    function pause(el) {
        el.forEach(e => e.stop());
    }

    function reStart(el) {
        el.forEach(e => {
            if (!e.data('clickEnd')) e.reStart();
        });
    }

    

};
export default KM000074;