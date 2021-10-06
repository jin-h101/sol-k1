import { directionText, com_makeModal, createElement, tempGuideLine, K_makeButton, stepChoice } from '../component';

const KM000049 = function ({ canvas, direction, elements, scrollArea, callback, choice, stepElements }) {
    const g = canvas.g();
    const ttsG = g.g();
    const scrollG = g.g();
    const backG = scrollArea ? scrollG.g() : g.g();

    let info;
    // tempGuideLine(canvas); // 좌표선 삭제
    const choiceStep = [];
    let qCount = 0;
    const choiceEl = [];
    const questionBox = [];
    // 지시문
    if (direction) directionText({ canvas: ttsG, ...direction });
    if (scrollArea) {
        scrollArea = {
            x: 40,
            y: 80,
            x2: 760,
            y2: 300,
            ...scrollArea
        };
    }

    const qG = scrollG.g();
    const stepG = scrollG.g();
    const choiceG = g.g();

    //배경 존재 시 설정
    if (elements) {
        elements.forEach(el => {
            createElement({
                type: el.type,
                canvas: qG,
                meta: el.meta
            });
        });
    }

    let bbox = [];
    if (stepElements) {
        stepElements.forEach((stepEl, i) => {
            const subG = stepG.g().data('index', i);
            stepEl.forEach(el => {
                const elementG = createElement({
                    type: el.type,
                    canvas: subG,
                    meta: el.meta
                });
                if (el.isQ) {
                    questionBox.push(subG.data('beforeClass', 's' + el.meta.shapeStrokeClassNum || 'no'));
                    elementG.select('rect').addClass('box');
                }
            });
        });
        questionBox.forEach((box, i2) => {
            bbox[i2] = box.getTBox();
        });
    }

    //보기부분
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
                btnRxy: rXY,
                // howlerStop:false,
                // modal : 'convert',
                standardIndex: 10,
                // opacity : 0.4,
                choiceCallback: function (idx) {
                    if (questionBox[qCount]) {
                        // const bbox = questionBox[qCount].getBBox();
                        questionBox[qCount].attr('opacity', 0);
                        choice[qCount].elements[idx].forEach(e => {
                            createElement({
                                type: e.type,
                                // canvas: choiceEl[qCount][idx],
                                canvas: backG,
                                meta: {
                                    ...e.meta,
                                    shadowClassNum: undefined,
                                    // cx: bbox.cx,
                                    // cy: bbox.cy
                                    cx: bbox[qCount].cx,
                                    cy: bbox[qCount].cy
                                }
                            });
                        });
                    }
                },
                callback: function (modal) {
                    qCount++;
                    setTimeout(() => {
                        modal.div.remove();
                        if (qCount === questionBox.length) {
                            // scrollG.attr('opacity', 0); // 마지막에 버튼 보이는 버그...
                            callback();
                        } else {
                            start();
                        }
                    }, 300);
                }
            });
        });
    }

    if (scrollArea) {
        info = {
            x: scrollArea.x,
            y: scrollArea.y,
            width: scrollArea.x2 - scrollArea.x,
            height: scrollArea.y2 - scrollArea.y
        };

        //div 생성
        new com_makeModal({
            x: info.x,
            y: info.y,
            width: info.width,
            height: info.height,
            zIndex: 10,
            yGap: 5,
            appendG: scrollG
        }); // div 새로 만들 때
        //외곽 영역 생성
        g.rect(info.x, info.y, info.width, info.height, 20, 20)
            .addClass('f' + (scrollArea.fillClassNum || '0012') + ' s' + scrollArea.strokeClassNum || 'no')
            .attr('fillOpacity', 1);
    }

    //시작
    start();

    function start() {
        choiceStep[qCount].start();
        questionBox[qCount].select('.box').removeClass(questionBox[qCount].data('beforeClass')).addClass('s0002');
    }
};
export default KM000049;
