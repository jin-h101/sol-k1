import { createElement, tempGuideLine, sentenseBlank, directionText, arrayIsSame } from '../component';
import { loadSound, hint } from 'sol-common';
import { Howler } from 'howler';
import { feedback, SOL } from 'sol-common/util';
// 끝말 잇기
const KM000057 = async function ({
    canvas = SOL.SVG,
    direction,
    elements,
    lastFeedback,
    choice,
    choiceCommon = { elements: {}, bgRect: {} },
    callback,
    sentenseBlanks
}) {
    // tempGuideLine(canvas); // 좌표선 삭제
    const g = canvas.g();
    const ttsG = g.g();
    const firstG = g.g();
    const secondG = g.g().attr('visibility', 'hidden');
    const choiceG = [];
    const choiceEl = [];
    const sentenseG = [];
    let ans = [];
    let userAns = [];
    let choiceOrder = 0; // 초이스 개수
    let hintEl;
    let sentenseEls = [];
    let voice;
    if (direction) directionText({ canvas: ttsG, ...direction });
    if (lastFeedback && lastFeedback.soundInfo) voice = await loadSound(lastFeedback.soundInfo.url);

    //배경 존재 시 설정
    if (elements) {
        elements.forEach(el => {
            const { type, meta } = el;
            createElement({ type, canvas: ttsG, meta });
        });
    }

    if (lastFeedback) {
        lastFeedback.elements.forEach(el => {
            createElement({
                type: el.type,
                canvas: secondG,
                meta: el.meta
            });
            // .touchOrClick(function () {
            //     Howler.stop();
            //     voice.play();
            //     voice.once('end', function () {});
            // });
        });
    }

    if (sentenseBlanks) {
        sentenseBlanks.forEach((el, i) => {
            sentenseG[i] = firstG.g();
            const { x, y, dy, text, fontSize, classNum, textFocusNum, focusNum, option } = el || {};
            sentenseEls[i] = new sentenseBlank({
                canvas: sentenseG[i],
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
            sentenseG[i].attr('visibility', 'hidden');
        });
    }

    if (choice) {
        choice.forEach((arr, j) => {
            const { ansIndex, elements, bgRect } = arr;
            choiceG[j] = firstG.g().attr({ visibility: 'hidden' });

            {
                // 배경렉트
                const { type, meta = {} } = bgRect || {};
                choiceCommon.bgRect = choiceCommon.bgRect || {};
                createElement({
                    type: type,
                    canvas: choiceG[j],
                    meta: {
                        ...meta,
                        cx: meta.cx || choiceCommon.bgRect.cx,
                        cy: meta.cy || choiceCommon.bgRect.cy,
                        width: meta.width || choiceCommon.bgRect.width,
                        height: meta.height || choiceCommon.bgRect.height,
                        rXY: meta.rXY || choiceCommon.bgRect.rXY,
                        shapeFillClassNum: meta.shapeFillClassNum || choiceCommon.bgRect.shapeFillClassNum,
                        shapeStrokeWidth: meta.shapeStrokeWidth || choiceCommon.bgRect.shapeStrokeWidth,
                        shapeOpacity: meta.shapeOpacity || choiceCommon.bgRect.shapeOpacity
                    }
                });
            }
            {
                // 초이스(텍스트)
                choiceEl[j] = [];
                elements.forEach((el, i) => {
                    const { type, meta = choiceCommon.elements || {} } = el;
                    const {
                        fontSize = choiceCommon.elements.fontSize || '25',
                        classNum = choiceCommon.elements.classNum || '000',
                        cy = choiceCommon.elements.cy,
                        cx = choiceCommon.elements.cx,
                        bold = choiceCommon.elements.bold || false
                    } = meta;
                    choiceEl[j][i] = choiceG[j].g().attr({ pointerEvents: 'none' });
                    createElement({
                        type,
                        canvas: choiceEl[j][i],
                        meta: { fontSize, classNum, cx, cy, bold, ...meta }
                    });
                    choiceEl[j][i].data('data', { index: i, click: false }).touchOrClick(actionCallback);
                });
            }
            ans[j] = ansIndex;
        });
    }

    start();
    //시작 함수
    function start() {
        if (hintEl) hintEl.removeHint();
        sentenseG[choiceOrder].attr('visibility', 'visible');
        hintEl = hint({
            canvas: firstG,
            XY: [
                sentenseEls[choiceOrder].focusGroup[0].getTBox().cx,
                sentenseEls[choiceOrder].focusGroup[0].getTBox().cy
            ]
        }); //힌트 생성
        sentenseEls[choiceOrder].focusGroup[0].touchOrClick(next).attr('pointerEvents', 'auto');
    }

    function next() {
        // console.log('next', choiceOrder, choice[choiceOrder].hintCount);
        this.untouchOrClick();
        if (hintEl) hintEl.removeHint();
        sentenseEls[choiceOrder].focusGroup[0].attr('opacity', 1);
        choiceG[choiceOrder].attr('visibility', 'visible');
        choiceEl[choiceOrder].forEach((el, k) => {
            if (choice[choiceOrder].hintCount !== 0) {
                //힌트 있을 때
                if (k === ans[choiceOrder]) {
                    const bbox = el.getTBox();
                    el.attr('pointerEvents', 'auto'); //엘리먼트 활성
                    hintEl = hint({
                        canvas: choiceG[choiceOrder],
                        XY: [bbox.cx, bbox.cy]
                    }); //힌트 생성
                }
            } else {
                //힌트가 없거나 끝났을 때
                el.attr('pointerEvents', 'auto');
            }
        });
    }

    //choice callback
    function actionCallback() {
        //초이스 콜백
        if (hintEl) hintEl.removeHint();
        const datas = this.data('data'); // 현재 클릭한 element에 대한 정보
        datas.click = datas.click ? false : true; // 클릭 여부 바꿔주기

        if (datas.click) {
            //활성 (인덱스 추가)
            userAns.push(datas.index);
            userAns.sort();
        } else {
            //비활성 (인덱스 제거)
            const arrIdx = userAns.indexOf(datas.index);
            userAns.splice(arrIdx, 1);
        }

        this.untouchOrClick();
        const bool = arrayIsSame(ans[choiceOrder], userAns);
        // console.log('초이스 콜백', choiceOrder, ans[choiceOrder], userAns, bool);
        const className = bool ? 'f0018' : 'f0019';
        choiceEl[choiceOrder][datas.index].select('text').removeClass('f000').addClass(className);
        const preventTouchRect = bool && g.rect(0, 0, 800, 500).attr({ opacity: '0' }); //누름방지
        const fb = new feedback({
            canvas: choiceG[choiceOrder],
            el: this,
            bool: bool,
            gap: [0, 0],
            scale: 1,
            addAction: false,
            onRemove: function () {
                choiceEl[choiceOrder][datas.index].select('text').removeClass(className).addClass('f000');

                if (bool) {
                    //정답 시
                    sentenseEls[choiceOrder].textGroup[0].attr('opacity', 1);
                    sentenseEls[choiceOrder].focusGroup[0].attr({ opacity: 0, pointerEvents: 'none' });

                    preventTouchRect.remove();
                    choiceG[choiceOrder].remove();
                    choiceEl[choiceOrder].forEach(el => {
                        el.attr({ pointerEvents: 'none' });
                    });
                    choiceOrder++;
                    setTimeout(function () {
                        sentenseG[choiceOrder - 1].remove();
                        if (choiceOrder < ans.length) {
                            userAns = [];
                            start();
                        } else {
                            last();
                        }
                    }, 500);
                } else {
                    //오답시
                    fb.addUserAction();
                    choiceEl[choiceOrder].forEach((el, k) => {
                        if (k === datas.index) el.attr({ opacity: 0.4 });
                    });
                    userAns = [];
                }
            }
        });
    }

    function last() {
        ttsG.attr('pointerEvents', 'none');
        firstG.remove();
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

export default KM000057;
