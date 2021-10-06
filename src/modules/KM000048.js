import { createElement, tempGuideLine, sentenseBlank, directionText, arrayIsSame } from '../component';
import { loadSound, hint } from 'sol-common';
import { Howler } from 'howler';
import { feedback, SOL } from 'sol-common/util';
// 끝말 잇기
const KM000048 = async function ({
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
    const backG = firstG.g();
    const secondG = g.g().attr({ visibility: 'hidden' });
    const choiceG = [];
    const choiceEl = [];
    let ans = [];
    let userAns = [];
    let count = 0;
    let hintEl;
    let backT;
    let voice;
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

    if (sentenseBlanks) {
        const { x, y, dy, text, fontSize, classNum, textFocusNum, focusNum, option } = sentenseBlanks || {};
        backT = new sentenseBlank({
            canvas: backG,
            text: text,
            x: x,
            y: y,
            dy: dy || 50,
            fontSize: fontSize || 40,
            classNum: classNum,
            textFocusNum: textFocusNum || '0002',
            focusNum: focusNum || '0001',
            option: option
            // {'type':'regularPolygon','blankI':[],'meta':{'length':50,'sideNum':5,'shapeFillClassNum':'14','shapeStrokeClassNum':'117','shapeStrokeWidth':1,'shadowClassNum':'0006','polygonOffset':{'x':0,'y':-5}}},
        });
    }

    if (choice) {
        choice.forEach((arr, j) => {
            const { ansIndex, elements, bgRect = {} } = arr;
            choiceG[j] = firstG.g().attr({ visibility: 'hidden' });

            {
                // 배경렉트
                const { type, meta = {} } = bgRect;
                choiceCommon.bgRect = choiceCommon.bgRect || {};
                createElement({
                    type: type,
                    canvas: choiceG[j],
                    meta: {
                        ...meta,
                        width: meta.width || choiceCommon.bgRect.width,
                        height: meta.height || choiceCommon.bgRect.height,
                        rXY: meta.rXY || choiceCommon.bgRect.rXY,
                        shapeFillClassNum: meta.shapeFillClassNum || choiceCommon.bgRect.shapeFillClassNum
                    }
                });
            }

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
                    meta: { fontSize, cy, cx, classNum, bold, ...meta }
                });
                choiceEl[j][i].data('data', { index: i, click: false }).touchOrClick(actionCallback);
            });
            ans[j] = ansIndex; //Array.isArray(ansIndex) ? ansIndex : [ansIndex];
        });
    }

    start();
    //시작 함수
    function start() {
        if (hintEl) hintEl.removeHint();
        hintEl = hint({
            canvas: backG,
            XY: [backT.focusGroup[count].getTBox().cx, backT.focusGroup[count].getTBox().cy]
        }); //힌트 생성
        backT.focusGroup.forEach((el, i) => el.touchOrClick(next).attr('pointerEvents', i === count ? 'auto' : 'none'));
    }

    function next() {
        // console.log('next', count, choice[count].hintCount);
        //초이스 시작
        this.untouchOrClick();
        backT.focusGroup[count].attr('opacity', 1);
        if (hintEl) hintEl.removeHint();
        choiceG[count].attr('visibility', 'visible');
        choiceEl[count].forEach((el, k) => {
            if (choice[count].hintCount !== 0) {
                //힌트 있을 때
                if (k === ans[count]) {
                    const bbox = el.getTBox();
                    el.attr('pointerEvents', 'auto'); //엘리먼트 활성
                    hintEl = hint({
                        canvas: choiceG[count],
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
        const bool = arrayIsSame(ans[count], userAns);
        const className = bool ? 'f0018' : 'f0019';
        choiceEl[count][datas.index].select('text').removeClass('f000').addClass(className);

        const preventTouchRect = bool && g.rect(0, 0, 800, 500).attr({ opacity: '0' });

        const fb = new feedback({
            canvas: choiceG[count],
            el: this,
            bool: bool,
            gap: [0, 0],
            scale: 1,
            addAction: false,
            onRemove: function () {
                choiceEl[count][datas.index].select('text').removeClass(className).addClass('f000');
                if (bool) {
                    //정답 시
                    backT.textGroup[count].attr('opacity', 1);
                    backT.focusGroup[count].attr({ opacity: 0, pointerEvents: 'none' });
                    preventTouchRect.remove();
                    choiceG[count].remove();
                    choiceEl[count].forEach(el => {
                        el.attr({ pointerEvents: 'none' });
                    });
                    count++;
                    if (count < ans.length) {
                        userAns = [];
                        start();
                    } else {
                        last();
                    }
                } else {
                    //오답시
                    fb.addUserAction();
                    choiceEl[count].forEach((el, k) => {
                        if (k === datas.index) el.attr({ opacity: 0.4 });
                    });
                    userAns = [];
                }
            }
        });
    }

    function last() {
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
};

export default KM000048;
