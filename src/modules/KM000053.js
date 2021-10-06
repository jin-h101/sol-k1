import {
    hint,
} from 'sol-common/components'
import { feedback } from 'sol-common/util';


import {
    // tempGuideLine,
    createElement,
    directionText,
    K_makeButton
} from '../component';

// choice 모듈(자모음 고르기, 피드백 path 변환)
const KM000053 = function ({
    canvas,
    direction,
    elements,
    choice,
    callback,
}) {
    // tempGuideLine(canvas);
    const g = canvas.g();
    const backG = g.g();
    const ttsG = g.g();
    const choiceG = g.g();
    const fbG = g.g();
    const choiceEl=[];
    let hintEl;
    let answer;
    let fbElement;
    let count = 0;

    // 지시문
    if (direction) directionText({'canvas':ttsG, ...direction});

    //배경 존재 시 설정
    if(elements){
        elements.forEach(el=>{
            createElement({
                "type": el.type,
                "canvas": backG,
                "meta": el.meta
            });
        })
    }

    //choice element 생성 
    if(choice){
        answer = Array.isArray(choice.ansIndex) ? choice.ansIndex : [choice.ansIndex];
        choice.elements.forEach((choiceGroup,i) =>{
            choiceEl[i] = choiceG.g().data('clickEnd',false);
            let shadowClass, rXY;
            choiceGroup.forEach((el,j) => {
                const oneGroup = createElement({
                    "type": el.type,
                    "canvas": choiceEl[i],
                    "meta": {...el.meta, shadowClassNum: undefined }
                }); //텍스트
                if(j === 0) rXY = oneGroup.rXY || 10;
                if(el.meta.shadowClassNum) shadowClass = el.meta.shadowClassNum
            });
            const bbox = choiceEl[i].getTBox();
            new K_makeButton({
                el: choiceEl[i],
                x: bbox.cx,
                y: bbox.cy,
                width: bbox.width,
                height: bbox.height,
                fillClassNum: 'no',
                strokeClassNum: 'no',
                shadowClassNum: shadowClass || '0006',
                pressEffect: true,
                r: rXY,
                index: i,
                isMetaSize: true,
                endCallback: function(index,group){
                    actionCallback(index,group)
                }
            });
            choiceEl[i].stop();
            if(choice.fbInfo && i === answer[0]) {
                const {text} = choiceGroup[i].meta;
                const {cx, cy, classNum = "91", fontSize = 40, bold = true} = choice.fbInfo;
                fbElement = createElement({
                    "type": 'text',
                    "canvas": fbG,
                    "meta": {"cx":cx, "cy":cy, "text":text, "classNum":classNum, "fontSize":fontSize, "bold":bold}
                }).attr('opacity',0); //텍스트
            }
        });
    }

    const pause = (el) => el.forEach(e => e.stop());
    const active = (el) => el.forEach(e => {
        if(!e.data('clickEnd')) e.reStart();
    });

    // 시작 함수
    const start = (element,c) => {
        if(c < choice.hintCount){ //힌트 있을 때
            console.log(element);
            element.forEach((el,k) => {
                if(answer[c]===k){
                    const bbox = el.getTBox();
                    el.reStart(); //엘리먼트 활성
                    hintEl=hint({
                        "canvas":g,
                        "XY":[bbox.cx, bbox.cy]
                    }); //힌트 생성
                }
            });
        }else{ //힌트가 없거나 끝났을 때
            active(choiceEl);
        }
    }

    // 클릭 시 실행 함수 => 정답체크,피드백 까지 실행    
    const actionCallback = (index,group) => {
        const element = choiceEl[index];
        if(hintEl)hintEl.removeHint(); //힌트 존재 시 지우기;
        element.data('clickEnd', true); //클릭이 끝남을 나타냄
        const elBBox = element.getTBox();
        const bool = answer.indexOf(index) !== -1;
        pause(choiceEl);
        //o,x 피드백
        const className = bool ? 'fno s0018' : 'fno s0019';
        const r = (choice.fbInfo?.markR) || group.data('rXY');
        const box = g.rect(elBBox.x, elBBox.y, elBBox.w, elBBox.h, r, r).addClass(className).attr({
            strokeWidth: 5
        }); // 네모 피드백
        const fb = new feedback({
            canvas: g,
            el: element,
            bool: bool,
            gap: [0, 0],
            scale: 1,
            addAction: false,
            onRemove: function () {
                if (bool) { //정답 시
                    count++;
                    setTimeout(function () {
                        if (answer.length === count) {
                            if(fbElement) fbElement.attr('opacity',1);
                            const t = (choice.fbInfo?.time * 1000) || 300
                            setTimeout(callback, t);
                        } else {
                            start(choiceEl, count);
                        }
                    }, 300); // 다음 상태 진행
                } else { //오답 시
                    box.attr('opacity', 0);
                    element.attr('opacity', 0.4);
                    fb.addUserAction();
                    setTimeout(function () {
                        start(choiceEl, count);
                    }, 300);
                }
            }
        }); 
    }

    //처음 시작
    start(choiceEl,count);
}

export default KM000053;