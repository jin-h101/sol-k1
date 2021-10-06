import { createElement, tempGuideLine, directionText, stepChoice } from '../component';
import { loadSound } from 'sol-common';
import { Howler } from 'howler';

// 초이스 1개
const KM000038 = async function ({ canvas, direction, elements, imageButtons, choice, lastFeedback, callback }) {
    // tempGuideLine(canvas); // 좌표선 삭제
    const g = canvas.g();
    const firstG = g.g();
    const secondG = g.g().attr('visibility', 'hidden');
    const backG = firstG.g();
    const imgBtnG = firstG.g();
    const ttsG = g.g();
    const choiceG = g.g();
    let choiceEl = [];
    let choiceStep = [];

    if (imageButtons) {
        for (let z = 0; z < imageButtons.length; z++) {
            if (imageButtons[z].soundInfo) {
                imageButtons[z].voice = loadSound(imageButtons[z].soundInfo.url);
            }
        }
    }

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

    if (imageButtons) {
        imageButtons.forEach(imgButton => {
            //이미지 버튼 마다
            const ibG = imgBtnG.g();
            imgButton.element.forEach(imgEl => {
                const gg = ibG.g();
                createElement({
                    type: imgEl.type,
                    canvas: gg,
                    meta: imgEl.meta
                });
            });
            createElement({
                type: 'rect',
                canvas: ibG,
                meta: { ...ibG.getTBox(), shapeFillClassNum: '14', shapeOpacity: 0 }
            });
            ibG.touchOrClick(function () {
                Howler.stop();
                imgButton.voice.play();
                imgButton.voice.once('end', function () {});
            });
        });
    }

    if (lastFeedback) {
        lastFeedback.elements.forEach(el => {
            createElement({
                type: el.type,
                canvas: secondG,
                meta: el.meta
            });
        });
    }

    if (choice) {
        const choiceGroup = choiceG.g();
        const { classNum, rXY } = choice.shadow || {};
        choice.elements.forEach((el, i) => {
            choiceEl[i] = choiceGroup.g();
            el.forEach(e => {
                createElement({
                    type: e.type,
                    canvas: choiceEl[i],
                    meta: { ...e.meta, shadowClassNum: undefined }
                });
            });
        });

        choiceStep = new stepChoice({
            canvas: choiceGroup,
            choiceEl: choiceEl,
            ans: choice.ansIndex,
            hintCount: choice.hintCount,
            btnShadowClassNum: classNum,
            // fbOpacity: choice.fbOpacity || 0.6,
            btnRxy: rXY,
            // howlerStop: false,
            callback: function () {
                callback();
            }
        });
    }

    //처음 시작
    start();

    //시작 함수
    function start() {
        choiceStep.start();
    }
};

export default KM000038;

/*
초기 초이스버튼
if (choice) {
        choice.elements.forEach((choiceEl, i) => {
            choiceGroup[i] = choiceG.g();
            let rXY;
            let shadowClass;
            choiceEl.forEach((el, j) => {
                const shape = createElement({
                    type: el.type,
                    canvas: choiceGroup[i],
                    // meta: el.meta
                    meta: { ...el.meta, shadowClassNum: undefined }
                });
                if (j === 0) rXY = shape.rXY;
                if (el.meta.shadowClassNum) shadowClass = el.meta.shadowClassNum;
            });

            const bbox = choiceGroup[i].getTBox();
            new K_makeButton({
                el: choiceGroup[i],
                x: bbox.cx,
                y: bbox.cy - 50,
                width: bbox.width,
                height: bbox.height,
                fillClassNum: 'no',
                strokeClassNum: 'no',
                shadowClassNum: shadowClass || '0006',
                pressEffect: true,
                // r: shape.rXY,
                r: rXY,
                index: i,
                isMetaSize: true,
                // reset: true,
                endCallback: actionCallback
            });
            choiceGroup[i].stop();
        });

        ans = Array.isArray(choice.ansIndex) ? choice.ansIndex : [choice.ansIndex];
    }
    //처음 시작
    start(choiceGroup, count);

    //시작 함수
    function start(element, n) {
        element.forEach((el, k) => {
            if (n < choice.hintCount) {
                //힌트 있을 때
                if (ans[n] === k) {
                    const bbox = el.getTBox();
                    // el.attr('pointerEvents', 'auto'); //엘리먼트 활성
                    el.reStart(); //엘리먼트 활성
                    hintEl = hint({
                        canvas: g,
                        XY: [bbox.cx, bbox.cy]
                    }); //힌트 생성
                }
            } else {
                //힌트가 없거나 끝났을 때
                // if (!el.data('clickEnd')) el.attr('pointerEvents', 'auto');
                if (!el.data('clickEnd')) el.reStart();
            }
        });
    }

    //choice callback
    function actionCallback(index, group) {
        const element = choiceGroup[index];
        if (hintEl) hintEl.removeHint();
        element.data('clickEnd', true); //클릭이 끝남을 나타냄
        // const elBBox = element.parent().getTBox();
        const elBBox = element.getTBox();
        const bool = ans.indexOf(index) !== -1;
        // choiceGroup.forEach(e => e.attr('pointerEvents', 'none'));
        choiceGroup.forEach(e => e.stop());
        //o,x 피드백
        const className = bool ? 'fno s0018' : 'fno s0019';
        const r = group.data('rXY');
        const box = firstG.rect(elBBox.x, elBBox.y, elBBox.w, elBBox.h, r, r).addClass(className).attr({
            strokeWidth: 5
        }); // 네모 피드백
        const fb = new feedback({
            canvas: firstG,
            el: element,
            bool: bool,
            gap: [0, 0],
            scale: 1,
            addAction: false,
            onRemove: function () {
                if (bool) {
                    //정답 시
                    count++;
                    setTimeout(function () {
                        if (ans.length === count) {
                            callback();
                        } else {
                            start(choiceGroup, count);
                        }
                    }, 300); // 다음 상태 진행
                } else {
                    //오답 시
                    box.attr('opacity', 0);
                    // element.parent().attr('opacity', 0.4);
                    element.attr('opacity', 0.4);
                    fb.addUserAction();
                    setTimeout(function () {
                        start(choiceGroup, count);
                    }, 300);
                }
            }
        });
    }
*/
