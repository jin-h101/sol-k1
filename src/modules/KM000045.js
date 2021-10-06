import { createElement, tempGuideLine, K_makeButton, directionText } from '../component';
import { loadSound, hint } from 'sol-common';
import { Howler } from 'howler';
import { feedback } from 'sol-common/util';

// 사용안함 > 38로 대체
const KM000045 = async function ({ canvas, direction, elements, imageButtons, choice, callback }) {
    // tempGuideLine(canvas); // 좌표선 삭제
    const g = canvas.g();
    const firstG = g.g();
    const ttsG = g.g();
    const backG = firstG.g();
    const choiceG = firstG.g();
    const choiceGroup = [];
    const imgBtnG = g.g();
    let ans = [];
    let count = 0;
    let hintEl;
    if (imageButtons) {
        for (let z = 0; z < imageButtons.length; z++) {
            if (imageButtons[z].soundInfo) {
                imageButtons[z].voice = loadSound(imageButtons[z].soundInfo.url);
            }
        }
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

    if (choice) {
        let metaOArr = [];
        choice.elements.forEach((choiceEl, i) => {
            metaOArr[i] = [];
            choiceGroup[i] = choiceG.g();
            let rxy = 10;
            choiceEl.forEach((el, j) => {
                createElement({
                    type: el.type,
                    canvas: choiceGroup[i],
                    meta: el.meta
                });
                metaOArr[i][j] = el.meta;
            });
            new K_makeButton({
                el: choiceGroup[i],
                x: metaOArr[i][0].cx,
                y: metaOArr[i][0].cy,
                width: metaOArr[i][0].width,
                height: metaOArr[i][0].height,
                shadowClassNum: '0006',
                r: metaOArr[i][0].rXY || rxy,
                index: i,
                isMetaSize: true,
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
        const bool = ans.indexOf(index) !== -1;
        const element = choiceGroup[index];
        const bbox = element.getTBox();
        if (hintEl) hintEl.removeHint();
        element.data('clickEnd', true); //클릭이 끝남을 나타냄
        //o,x 피드백
        const className = bool ? 'fno s0018' : 'fno s0019';
        const r = group.data('rXY');
        const box = element.rect(bbox.x, bbox.y, bbox.w, bbox.h, r, r).addClass(className).attr({
            strokeWidth: 5
        }); // 윤곽(네모) 피드백

        choiceGroup.forEach(e => e.stop());
        const fb = new feedback({
            canvas: g,
            el: element, // [bbox.x2, bbox.y],
            bool: bool,
            gap: [0, 0],
            scale: 1,
            addAction: false,
            onRemove: function () {
                if (bool) {
                    count++;
                    if (count >= ans.length) {
                        // Howler.stop();
                        callback();
                        // setTimeout(callback, 300);
                    } else start(choiceGroup, count);
                } else {
                    box.attr('opacity', 0);
                    element.attr('opacity', 0.4);
                    fb.addUserAction();
                    setTimeout(function () {
                        start(choiceGroup, count);
                    }, 300);
                }
            }
        });
    }
};

export default KM000045;
