import {
    createElement,
    // tempGuideLine,
    sentenseBlank,
    directionText,
    arrayIsSame,
    makeOk,
    reading,
    com_pageConvert
} from '../component';
import { loadSound, hint } from 'sol-common';
import { Howler } from 'howler';
import { feedback, SOL } from 'sol-common/util';

const KM000058 = async function ({
    canvas = SOL.SVG,
    direction,
    elements,
    sound,
    scroll,
    question,
    callback,
    guideLine
}) {
    // tempGuideLine(canvas); // 좌표선 삭제
    const g = canvas.g();
    const backG = g.g();
    const ttsG = g.g();
    const scrollG = g.g();

    const g1 = g.g(); //문제부분 그룹
    const backG1 = g1.g();
    const firstG = g1.g();
    const secondG = g1.g().attr('visibility', 'hidden');
    let ttsObj, qTTsObj;

    let isfirst = true; // 210909
    const convertVisible = (question && question.visible) || false; // 210909

    // 지시문
    if (direction)
        ttsObj = directionText({
            canvas: ttsG,
            howlerStop: false,
            ttsStartCallback: function () {
                readingGroup.stop();
                howlerStop();
            },
            ...direction
        });

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

    const readingGroup = new reading({
        canvas: scrollG,
        area: scroll.area,
        elements: scroll.elements,
        focusText: scroll.focusText,
        footNoteInfo: scroll.footNoteInfo,
        sound: sound,
        firstGuide: !convertVisible, // 210909
        startCallback: function () {
            // choiceAuto();
            // howlerStop();
            if (isfirst) choiceAuto(); // 210909
            howlerStop();
        },
        endCallback: function () {
            // console.log('end call');
        }
    });

    const choiceG = [];
    const choiceEl = [];
    const sentenseG = [];
    let ans = [];
    let userAns = [];
    let choiceOrder = 0; // 초이스 개수
    let hintEl;
    let sentenseEls = [];
    let voice;
    let convertModal;

    const { lastFeedback, sentenseBlanks, choice, choiceCommon = { elements: {}, bgRect: {} } } = question;
    if (lastFeedback && lastFeedback.soundInfo) voice = await loadSound(lastFeedback.soundInfo.url);

    if (question.direction)
        qTTsObj = directionText({
            canvas: backG1,
            howlerStop: false,
            ttsStartCallback: howlerStop,
            ...question.direction
        });
    //배경 존재 시 설정
    if (question.elements) {
        question.elements.forEach(el => {
            const { type, meta } = el;
            createElement({ type, canvas: backG1, meta });
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
    const convertGap = 40;
    convertModal = new com_pageConvert({
        g: canvas,
        appendG: g1,
        // visible: question.visible,
        visible: convertVisible, // 210909
        time: 800,
        guideLine: guideLine || false, // 좌표선 삭제
        howlerStop: false,
        startCallback: function () {
            readingGroup.stop();
            howlerStop();
        }
    });

    //시작 함수
    function start() {
        if (hintEl) hintEl.removeHint();
        sentenseG[choiceOrder].attr('visibility', 'visible');
        // console.log(sentenseEls[choiceOrder].focusGroup[0]);
        if (sentenseEls[choiceOrder].focusGroup[0] !== undefined) {
            hintEl = hint({
                canvas: firstG,
                XY: [
                    sentenseEls[choiceOrder].focusGroup[0].getTBox().cx - convertGap,
                    sentenseEls[choiceOrder].focusGroup[0].getTBox().cy
                ]
            }); //힌트 생성
            sentenseEls[choiceOrder].focusGroup[0].touchOrClick(next).attr('pointerEvents', 'auto');
        } else {
            //빈칸없는 텍스트일 때
            //다음 버튼
            new makeOk({
                canvas: sentenseG[choiceOrder],
                type: 1,
                cx: 700,
                cy: 430,
                scale: 1,
                visibility: true,
                event: true,
                callback: last
            });
        }
    }

    function next() {
        // console.log('next', choiceOrder, choice[choiceOrder].hintCount);
        //초이스 시작
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
                        XY: [bbox.cx - convertGap, bbox.cy]
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
            gap: [-convertGap, 0],
            scale: 1,
            howlerStop: false,
            // addAction: false,
            onRemove: function () {
                howlerStop();
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
                        userAns = [];
                        start();
                    }, 500);
                } else {
                    //오답시
                    // fb.addUserAction();
                    choiceEl[choiceOrder].forEach((el, k) => {
                        if (k === datas.index) el.attr({ opacity: 0.4 });
                    });
                    userAns = [];
                }
            }
        });
    }

    function last() {
        convertModal.stop();
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

    //모든 지시문 tts만 초기화
    function howlerStop() {
        if (ttsObj.tts.data('voice')) ttsObj.tts.data('voice').stop();
        if (qTTsObj.tts.data('voice')) qTTsObj.tts.data('voice').stop();
    }
    function choiceAuto() {
        isfirst = false; // 210909
        convertModal.start();
        start();
    }

    //시작
    if (convertVisible) choiceAuto();
    readingGroup.start();
};

export default KM000058;
