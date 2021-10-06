import { createElement, tempGuideLine, directionText, stepChoice } from '../component';
import { loadSound } from 'sol-common';
import { Howler } from 'howler';

const KM000041 = async function ({ canvas, direction, elements, imageButtons, choice, lastFeedback, callback }) {
    // tempGuideLine(canvas); // 좌표선 삭제
    const g = canvas.g();
    const ttsG = g.g();
    const firstG = g.g();
    const backG = firstG.g();
    const secondG = g.g().attr('visibility', 'hidden');
    const choiceG = g.g();
    const imgBtnG = firstG.g();
    let voice;
    let qCount = 0;
    const choiceStep = [];
    const choiceEl = [];

    if (imageButtons) {
        for (let z = 0; z < imageButtons.length; z++) {
            if (imageButtons[z].soundInfo) {
                imageButtons[z].voice = loadSound(imageButtons[z].soundInfo.url);
            }
        }
    }
    if (lastFeedback && lastFeedback.soundInfo) voice = await loadSound(lastFeedback.soundInfo.url);

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
        if (!Array.isArray(choice)) choice = [choice];
        choice.forEach((arr, j) => {
            const choiceGroup = choiceG.g();
            choiceEl.push([]);
            const { classNum, rXY } = arr.shadow || {};
            arr.elements.forEach((el, i) => {
                choiceEl[j][i] = choiceGroup.g();
                el.forEach(e => {
                    createElement({
                        type: e.type,
                        canvas: choiceEl[j][i],
                        meta: { ...e.meta, shadowClassNum: undefined }
                    });
                });
            });
            choiceStep[j] = new stepChoice({
                canvas: choiceGroup,
                choiceEl: choiceEl[j],
                ans: arr.ansIndex,
                hintCount: arr.hintCount,
                btnShadowClassNum: classNum,
                // fbOpacity: arr.fbOpacity || 0.6,
                btnRxy: rXY,
                // howlerStop:false,
                inactiveAttr: {
                    classNum: '0028',
                    shapeFillClassNum: 14,
                    ...arr.inactiveAttr
                },
                callback: function () {
                    if (qCount < choiceStep.length - 1) {
                        qCount++;
                        choiceStep[qCount].start();
                    } else {
                        last();
                        // console.log('종료');
                        // callback();
                    }
                }
            });
            choiceStep[j].show();
        });
        choiceStep[qCount].start();
    }

    function last() {
        ttsG.attr('pointerEvents', 'none');
        firstG.remove();
        choiceG.remove();
        secondG.attr('visibility', 'visible');
        if (voice) {
            Howler.stop();
            voice.play();
            voice.once('end', callback);
        } else {
            callback();
        }
    }
};

export default KM000041;
