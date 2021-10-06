import { directionText, com_makeModal, createElement, tempGuideLine, stepChoice } from '../component';
import { Howler } from 'howler';
// 학습만화 모듈
const KM000051 = function ({
    canvas,
    direction,
    elements,
    scrollArea,
    scrollElements,
    lastFeedback,
    callback,
    choice
}) {
    // tempGuideLine(canvas); // 좌표선 삭제

    const g = canvas.g();
    const ttsG = g.g();
    const scrollG = g.g();
    const secondG = g.g().attr('visibility', 'hidden');
    const backG = g.g();
    const scrollElG = scrollG.g();
    const choiceG = scrollG.g();
    let info;

    // 지시문
    if (direction) directionText({ canvas: ttsG, ...direction });
    if (scrollArea) {
        scrollArea = {
            // x: 40,
            // y: 80,
            // x2: 760,
            // y2: 450,
            ...scrollArea
        };
    }

    info = {
        x: scrollArea.x,
        y: scrollArea.y,
        width: scrollArea.x2 - scrollArea.x,
        height: scrollArea.y2 - scrollArea.y
    };

    if (scrollElements) {
        scrollElements.forEach(el => {
            if (!Array.isArray(el)) el = [el];
            el.forEach(el2 => {
                createElement({
                    type: el2.type,
                    canvas: scrollElG,
                    meta: el2.meta
                });
            });
        });
    }

    //배경 존재 시 설정
    if (elements) {
        elements.forEach(el => {
            if (!Array.isArray(el)) el = [el];
            el.forEach(el2 => {
                createElement({
                    type: el2.type,
                    canvas: backG,
                    meta: el2.meta
                });
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

    let choiceEl = [];
    let choiceStep = [];
    let qCount = 0;
    if (choice) {
        choice.forEach((arr, j) => {
            const choiceGroup = choiceG.g();
            choiceEl.push([]);
            const { classNum, rXY } = arr.shadow;
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
                btnRxy: rXY || 10,
                // howlerStop: false,
                inactiveAttr: {
                    classNum: '0028',
                    shapeFillClassNum: 14,
                    ...arr.inactiveAttr
                },
                // modal: 'convert',
                // choiceCallback: function (idx) {},
                callback: function () {
                    if (qCount < choiceStep.length - 1) {
                        qCount++;
                        choiceStep[qCount].start();
                    } else {
                        bgRect.attr('visibility', 'hidden');
                        modalG.div.remove();
                        ttsG.attr('pointerEvents', 'none');
                        scrollG.attr('opacity', 0); // 마지막에 버튼 보이는 버그...
                        last();
                    }
                }
            });
            choiceStep[j].show();
        });
    }

    choiceStep[qCount].start();

    function last() {
        Howler.stop();
        setTimeout(function () {
            secondG.attr('visibility', 'visible');
            setTimeout(function () {
                callback();
            }, lastFeedback.setTime || 300);
        }, 300);
    }

    //div 생성
    const modalG = new com_makeModal({
        x: info.x,
        y: info.y,
        width: info.width,
        height: info.height,
        zIndex: 10,
        yGap: 40,
        appendG: scrollG
    }); // div 새로 만들 때

    //외곽 영역 생성
    const bgRect = g
        .rect(info.x, info.y, info.width, info.height, 20, 20)
        .addClass('f' + (scrollArea.fillClassNum || '0012') + ' s' + scrollArea.strokeClassNum || 'no')
        .attr('fillOpacity', 1);
};

export default KM000051;
