import { createElement, tempGuideLine, sentenseBlank, directionText, com_makeModal } from '../component';
import { loadSound, hint } from 'sol-common';
import { Howler } from 'howler';
import { feedback, SOL } from 'sol-common/util';

// 끝말 잇기
const KM000301 = async function ({
    canvas = SOL.SVG,
    direction,
    elements,
    lastFeedback,
    choice,
    choiceCommon = { elements: {}, bgRect: {} },
    callback,
    sentenseBlanks
}) {
    // const meta = {
    //     choice: [
    //         [
    //             {
    //                 hintCount: 0, //힌트개수
    //                 ansIndex: 1,
    //                 bgRect: {
    //                     type: 'rect',
    //                     meta: {}
    //                 },
    //                 elements: [
    //                     {
    //                         type: 'text',
    //                         meta: {
    //                             cx: 150,
    //                             cy: 430,
    //                             classNum: '000',
    //                             text: '찌개'
    //                         }
    //                     },
    //                     {
    //                         type: 'text',
    //                         meta: {
    //                             cx: 370,
    //                             cy: 430,
    //                             classNum: '000',
    //                             text: '요리사'
    //                         }
    //                     },
    //                     {
    //                         type: 'text',
    //                         meta: {
    //                             cx: 620,
    //                             cy: 430,
    //                             classNum: '000',
    //                             text: '뜨겁습니다'
    //                         }
    //                     }
    //                 ]
    //             },
    //             {
    //                 hintCount: 1,
    //                 ansIndex: 0,
    //                 bgRect: {
    //                     type: 'rect',
    //                     meta: {}
    //                 },
    //                 elements: [
    //                     {
    //                         type: 'text',
    //                         meta: {
    //                             cx: 150,
    //                             cy: 430,
    //                             classNum: '000',
    //                             text: '찌개'
    //                         }
    //                     },
    //                     {
    //                         type: 'text',
    //                         meta: {
    //                             cx: 370,
    //                             cy: 430,
    //                             classNum: '000',
    //                             text: '요리사'
    //                         }
    //                     },
    //                     {
    //                         type: 'text',
    //                         meta: {
    //                             cx: 620,
    //                             cy: 430,
    //                             classNum: '000',
    //                             text: '토끼'
    //                         }
    //                     }
    //                 ]
    //             }
    //         ],
    //         [
    //             {
    //                 hintCount: 1,
    //                 ansIndex: 1,
    //                 bgRect: {
    //                     meta: {},
    //                     type: 'rect'
    //                 },
    //                 elements: [
    //                     {
    //                         type: 'text',
    //                         meta: {
    //                             cx: 200,
    //                             cy: 430,
    //                             classNum: '000',
    //                             text: '요리사'
    //                         }
    //                     },
    //                     {
    //                         type: 'text',
    //                         meta: {
    //                             cx: 600,
    //                             cy: 430,
    //                             classNum: '000',
    //                             text: '토끼'
    //                         }
    //                     }
    //                 ]
    //             }
    //         ]
    //     ],
    //     sentenseBlanks: [
    //         {
    //             x: 150,
    //             y: 205,
    //             dy: 30,
    //             text: '$shape{요리사}가 음식을 만듭니다.\n$shape{찌개}가 보글보글 끓고 있습니다.',
    //             fontSize: 20,
    //             classNum: '000',
    //             textFocusNum: '0002',
    //             focusNum: '0001',
    //             option: [
    //                 {
    //                     type: 'rect',
    //                     blankI: [0, 2],
    //                     meta: {
    //                         width: 50,
    //                         height: 50,
    //                         shapeFillClassNum: 14,
    //                         shapeStrokeClassNum: 117,
    //                         shapeStrokeWidth: 1,
    //                         rXY: '5',
    //                         shadowClassNum: '0006'
    //                     }
    //                 },
    //                 {
    //                     type: 'rect',
    //                     blankI: [0, 1],
    //                     meta: {
    //                         width: 50,
    //                         height: 50,
    //                         shapeFillClassNum: 14,
    //                         shapeStrokeClassNum: 117,
    //                         shapeStrokeWidth: 1,
    //                         rXY: '5',
    //                         shadowClassNum: '0006'
    //                     }
    //                 }
    //             ]
    //         },
    //         {
    //             x: 150,
    //             y: 300,
    //             dy: 30,
    //             text: '$shape{토끼} 가 깡총깡총',
    //             fontSize: 30,
    //             classNum: '000',
    //             textFocusNum: '0002',
    //             focusNum: '0001',
    //             option: [
    //                 {
    //                     type: 'rect',
    //                     blankI: [0, 1],
    //                     meta: {
    //                         width: 70,
    //                         height: 70,
    //                         shapeFillClassNum: '14',
    //                         shapeStrokeClassNum: '117',
    //                         shapeStrokeWidth: 1,
    //                         rXY: '5',
    //                         shadowClassNum: '0006'
    //                     }
    //                 }
    //             ]
    //         }
    //     ]
    // };

    // const choice = meta.choice;
    // const sentenseBlanks = meta.sentenseBlanks;
    tempGuideLine(canvas); // 좌표선 삭제
    let voice;

    // 함수
    const blankStepChoice = function ({
        canvas,
        choiceEl,
        ans,
        hintCount,
        standardIndex,
        fbOpacity = 0.5,
        choiceCallback,
        bgRect,
        howlerStop = true,
        callback
    }) {
        canvas.attr('visibility', 'hidden');
        ans = Array.isArray(ans) ? ans : [ans];
        let n = 0;
        let hintEl;
        let choiceDiv;

        const _class = [];
        let choiceEls;
        let btnG;

        function makeBtn() {
            btnG = canvas.g();

            {
                // 배경렉트
                const { type, meta = {} } = bgRect[0];
                const choiceCommonBgRect = bgRect[1] || {};
                createElement({
                    type: type,
                    canvas: btnG,
                    meta: {
                        ...meta,
                        width: meta.width || choiceCommonBgRect.width,
                        height: meta.height || choiceCommonBgRect.height,
                        rXY: meta.rXY || choiceCommonBgRect.rXY,
                        shapeFillClassNum: meta.shapeFillClassNum || choiceCommonBgRect.shapeFillClassNum
                    }
                });
            }

            choiceEls = [];
            choiceEls.push([]);
            choiceEl.forEach((el, i) => {
                _class[i] = el.meta;
                choiceEls[i] = btnG
                    .g()
                    .data('val', i, 'clickEnd', false)
                    .attr('pointerEvents', 'none')
                    .pressEvent(function (bool) {
                        if (!bool) _handler(choiceEls[i].data('val'), choiceEls[i], _class[i]);
                    });

                const tt = createElement({
                    type: 'text',
                    canvas: choiceEls[i],
                    meta: { ...el.meta }
                });

                choiceEls[i]
                    .rect(el.meta.cx, el.meta.cy, tt.getBBox().w + 20, tt.getBBox().h + 20)
                    .addClass('f02 sno')
                    .attr('opacity', 0)
                    .center();
            });
            console.log('choiceEls', choiceEls);
        }

        if (standardIndex) {
            //div 생성
            choiceDiv = new com_makeModal({
                x: 0,
                y: 0,
                width: 800,
                height: 500,
                zIndex: 0,
                appendG: canvas
            }); // div 새로 만들 때
        }

        function _hintShow(index) {
            if (hintCount) {
                if (typeof hintCount === 'number' && n >= hintCount) return;
                const { cx, cy } = choiceEls[index].getBBox();
                hintEl = hint({
                    canvas: btnG,
                    XY: [cx, cy - 5]
                }); //힌트 생성
                _disable(index);
            }
        }

        function _handler(index, element, beforeClass) {
            console.log('_handler', index, element, ans, beforeClass);
            if (hintEl) hintEl.removeHint();
            choiceEls[index].data('clickEnd', true); //클릭이 끝남을 나타냄
            const { x, y, w, h, x2 } = choiceEls[index].getBBox();
            const bool = ans.indexOf(index) !== -1;
            _disable();
            if (standardIndex) choiceDiv.div.style.zIndex = standardIndex + 1;
            const className = bool ? 'f0018' : 'f0019';
            element
                .select('text')
                .removeClass('f' + beforeClass)
                .addClass(className);
            //피드백
            const fb = new feedback({
                canvas: canvas,
                el: [x2, y],
                bool: bool,
                gap: [0, 0],
                scale: 1,
                addAction: false,
                howlerStop: howlerStop,
                onRemove: function () {
                    if (bool) {
                        n += 1;
                        setTimeout(function () {
                            if (standardIndex) choiceDiv.div.style.zIndex = standardIndex - 1;
                            if (choiceCallback) choiceCallback(index);
                            if (n < ans.length) {
                                _enable();
                                _hintShow(ans[n]);
                            } else {
                                callback(choiceDiv);
                            }
                        }, 300);
                    } else {
                        // fb.addUserAction();
                        element
                            .select('text')
                            .removeClass(className)
                            .addClass('f' + beforeClass);
                        element.attr({
                            opacity: fbOpacity
                        });
                        setTimeout(_enable, 300);
                    }
                }
            });
        }

        function _disable(except) {
            choiceEls.forEach(function (el, i) {
                if (i !== except) {
                    // el.stop();
                    el.attr('pointerEvents', 'none');
                }
            });
        }

        function _enable() {
            choiceEls.forEach(function (el) {
                if (!el.data('clickEnd')) {
                    // el.reStart();
                    el.attr('pointerEvents', 'auto');
                }
            });
        }

        this.show = function () {
            canvas.attr('visibility', 'visible');
        };

        this.start = function () {
            console.log('start', ans);
            canvas.attr('visibility', 'visible');
            makeBtn();
            if (standardIndex) choiceDiv.div.style.zIndex = standardIndex - 1;
            _enable();
            _hintShow(ans[0]);
        };

        return this;
    };

    const g = canvas.g();
    const ttsG = g.g();
    const firstG = g.g();
    const backG = firstG.g();
    const secondG = g.g().attr({ visibility: 'hidden' });
    let hintEl;
    const sentenseG = g.g();
    let sentenseCount = 0;
    let sentenseEls;
    const choiceG = g.g();
    let choiceStep = [];
    let qCount = 0;
    const choiceGroup = [];

    if (lastFeedback && lastFeedback.soundInfo) voice = await loadSound(lastFeedback.soundInfo.url);
    if (direction) directionText({ canvas: ttsG, ...direction });

    //배경 존재 시 설정
    if (elements) {
        elements.forEach(el => {
            const { type, meta } = el;
            createElement({ type, canvas: backG, meta });
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

    function makeSentense(sentenseCount) {
        sentenseG.clear();
        if (sentenseBlanks) {
            sentenseBlanks = Array.isArray(sentenseBlanks) ? sentenseBlanks : [sentenseBlanks];
            const { x, y, dy, text, fontSize, classNum, textFocusNum, focusNum, option } =
                sentenseBlanks[sentenseCount] || {};
            sentenseEls = new sentenseBlank({
                canvas: sentenseG,
                text: text,
                x: x,
                y: y,
                dy: dy || 50,
                fontSize: fontSize || 40,
                classNum: classNum,
                textFocusNum: textFocusNum || '0002',
                focusNum: focusNum || '0001',
                option: option
            });
        }
    }

    function makeChoice(sentenseCount) {
        choiceStep = [];
        choiceG.clear();
        if (choice) {
            choice = Array.isArray(choice[sentenseCount]) ? choice : [choice];
            choice[sentenseCount].forEach((arr, j) => {
                const { ansIndex, elements, bgRect, hintCount } = arr;
                choiceGroup[j] = choiceG.g().attr({ visibility: 'hidden' });

                // const bgRect = {
                //     width: 750,
                //     height: 80,
                //     cx: 400,
                //     cy: 440,
                //     rXY: 15,
                //     shapeFillClassNum: '0040'
                // };
                choiceStep[j] = new blankStepChoice({
                    canvas: choiceGroup[j],
                    choiceEl: elements,
                    ans: ansIndex,
                    hintCount: hintCount,
                    bgRect: [bgRect, choiceCommon.bgRect],
                    // howlerStop: false,
                    // inactiveAttr: {
                    //     classNum: '0028',
                    //     shapeFillClassNum: 14,
                    //     ...arr.inactiveAttr
                    // },
                    // modal: 'convert',
                    // choiceCallback: choiceCallback,
                    callback: choiceCallback
                });
                choiceStep[j].show();
            });
        }
    }

    // console.log('ans', ans);
    // console.log('choiceEl', choiceEl);
    makeSentense(0);
    makeChoice(0);
    start();
    // sentenseG.attr('visibility', 'visible');
    //시작 함수
    function start() {
        console.log('포커스 start', sentenseCount, qCount);
        if (hintEl) hintEl.removeHint();

        hintEl = hint({
            canvas: g,
            XY: [sentenseEls.focusGroup[qCount].getTBox().cx, sentenseEls.focusGroup[qCount].getTBox().cy]
        }); //힌트 생성
        sentenseEls.focusGroup.forEach((el, i) =>
            el.touchOrClick(choiceStart).attr('pointerEvents', i === qCount ? 'auto' : 'none')
        );
    }

    function choiceStart() {
        console.log('choiceStart', sentenseCount, qCount);
        //초이스 시작
        if (hintEl) hintEl.removeHint();
        sentenseEls.focusGroup.forEach(el => el.untouchOrClick());
        sentenseEls.focusGroup[qCount].attr('opacity', 1);
        choiceGroup[qCount].attr('visibility', 'visible');
        choiceStep[qCount].start();
    }

    //choice 정답시 callback
    function choiceCallback() {
        console.log('choiceCallback', sentenseCount, qCount);
        sentenseEls.textGroup[qCount].attr('opacity', 1);
        sentenseEls.focusGroup[qCount].attr({ opacity: 0, pointerEvents: 'none' });
        choiceGroup[qCount].remove();
        qCount++;
        if (qCount < choiceStep.length) {
            start();
        } else {
            last();
        }
    }

    function last() {
        console.log('last');
        sentenseCount++;
        qCount = 0;
        if (sentenseCount < sentenseBlanks.length) {
            makeSentense(sentenseCount);
            makeChoice(sentenseCount);
            start();
        } else {
            ttsG.attr('pointerEvents', 'none');
            secondG.attr('visibility', 'visible');
            if (voice) {
                Howler.stop();
                voice.play();
                voice.once('end', callback);
            } else {
                callback();
            }
        }
    }
};

export default KM000301;
