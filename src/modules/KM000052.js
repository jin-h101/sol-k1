import { hint } from 'sol-common/components';
import { feedback } from 'sol-common/util';

import {
    // tempGuideLine,
    createElement,
    directionText,
    arrayIsSame,
    multiPointerControl
} from '../component';

// choice 모듈(자모음 고르기, 피드백 path 변환)
const KM000052 = function ({ canvas, direction, elements, choice, callback }) {
    // tempGuideLine(canvas);
    const g = canvas.g();
    const backG = g.g();
    const ttsG = g.g();
    const choiceG = g.g();
    let hintEl;
    const choiceEl = [];
    let userAns = [];
    let activeCount = 0;

    // 지시문
    if (direction) directionText({ canvas: ttsG, ...direction });

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

    //choice element 생성
    if (choice) {
        if (choice.bgElement) {
            const bgG = choiceG.g();
            choice.bgElement.forEach(el => {
                createElement({
                    type: el.type,
                    canvas: bgG,
                    meta: el.meta
                });
            });
        }
        const choG = choiceG.g();
        choice.elementText.forEach((el, i) => {
            choiceEl[i] = choG.g().attr('pointerEvents', 'none');
            const rG = choiceEl[i].g();
            const tG = choiceEl[i].g();
            const textEl = createElement({
                type: 'text',
                canvas: tG,
                meta: el
            }); //텍스트
            choiceEl[i]
                .data('data', {
                    index: i,
                    textGroup: textEl,
                    click: false,
                    basicClass: el.classNum,
                    focusClass: el.focusClass
                })
                .touchOrClick(actionCallback);
            const bbox = textEl.getTBox();
            createElement({
                type: 'rect',
                canvas: rG,
                meta: {
                    cx: bbox.cx,
                    cy: bbox.cy,
                    width: bbox.w,
                    height: bbox.h,
                    shapeFillClassNum: '04',
                    shapeOpacity: 0
                }
            }); // 텍스트 클릭하기 위한 가상의 rect
        });
    }

    start(choiceEl, activeCount);

    // 시작 함수
    function start(element, count) {
        if (choice.hint) {
            //힌트 있을 때
            element.forEach((el, k) => {
                if (choice.answer[count] === k) {
                    console.log(k);
                    const elT = choice.elementText;
                    el.attr('pointerEvents', 'auto'); //엘리먼트 활성
                    hintEl = hint({
                        canvas: g,
                        XY: [elT[k].cx, elT[k].cy]
                    }); //힌트 생성
                }
            });
        } else {
            //힌트가 없거나 끝났을 때
            multiPointerControl({ elements: choiceEl, state: 'auto' });
        }
    }

    // 클릭 시 실행 함수 => 정답체크,피드백 까지 실행
    function actionCallback() {
        if (hintEl) hintEl.removeHint(); //힌트 존재 시 지우기;
        const datas = this.data('data'); // 현재 클릭한 element에 대한 정보
        const color = [datas.basicClass, datas.focusClass]; //색상 정보 (기본, 활성 색상)
        datas.click = datas.click ? false : true; // 클릭 여부 바꿔주기
        datas.textGroup
            .selectAll('text')[0]
            .removeClass('f' + color[Number(!datas.click)])
            .addClass('f' + color[Number(datas.click)]); //활성 글자 색으로 변경

        if (datas.click) {
            //활성 (인덱스 추가)
            userAns.push(datas.index);
            userAns.sort();
        } else {
            //비활성 (인덱스 제거)
            const arrIdx = userAns.indexOf(datas.index);
            userAns.splice(arrIdx, 1);
        }

        //정답 판정
        if (choice.answer.length === userAns.length) {
            // 클릭 개수가 충족했을 때
            multiPointerControl({ elements: choiceEl, state: 'none' });
            const bool = arrayIsSame(choice.answer, userAns);
            setTimeout(function () {
                choiceEl.forEach((el,i) => {
                    const endColor = [el.data('data').basicClass, el.data('data').focusClass]; //색상 정보 (기본, 활성 색상)
                    const removeColor = endColor[Number(datas.click)];
                    const newColor = bool ? '0018' : endColor[Number(!datas.click)];
                    if ((bool&&choice.answer.indexOf(i)!==-1) || !bool) {
                        el.data('data')
                            .textGroup.selectAll('text')[0]
                            .removeClass('f' + removeColor)
                            .addClass('f' + newColor);
                            // console.log({removeColor,newColor});
                    }
                });
                const fb = new feedback({
                    canvas: g,
                    el: choiceG,
                    bool: bool,
                    gap: [0, 0],
                    scale: 1,
                    addAction: false,
                    onRemove: function () {
                        if (bool) {
                            //정답 시
                            callback(); //종료
                        } else {
                            //오답시
                            fb.addUserAction();
                            choiceEl.forEach(el => {
                                const datas = el.data('data');
                                if (datas.click) datas.click = false; //클릭 여부 초기화
                            });
                            userAns = [];
                            multiPointerControl({ elements: choiceEl, state: 'auto' });
                        }
                    }
                });
            }, 300);
        } else if (choice.hint) {
            //힌트 시
            multiPointerControl({ elements: choiceEl, state: 'none' });
            activeCount++;
            start(choiceEl, activeCount);
        }
    }
};

export default KM000052;
