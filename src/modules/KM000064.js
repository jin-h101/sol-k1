import {
    com_pageConvert,
    createElement,
    directionText,
    // tempGuideLine,
    reading,
    stepChoice
} from '../component';

//지문 읽기(스크롤), 선택지choice 모듈
const KM000064 = async function ({
    canvas,
    direction,
    elements,
    scroll,
    sound,
    question,
    callback,

    guideLine = false // 좌표선 삭제
}) {
    // tempGuideLine(canvas);
    console.log('start');
    const g = canvas.g();
    const backG = g.g();
    const ttsG = g.g();
    const scrollG = g.g();
    const converG = g.g().attr('class', 'convert');
    let ttsObj, qTTsObj;
    const choiceStep = [];
    let qCount = 0;

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
            if (isfirst) choiceAuto(); // 210909
            howlerStop();
        },
        endCallback: function () {
            console.log('end call');
        }
    });

    //문항 부분
    const choiceEl = [];
    let convertModal;
    //정답 메타가 입력되었을 때만 실행
    if (question) {
        const qG = converG.g();
        const choiceG = converG.g();
        //문제부분
        if (question.direction) {
            qTTsObj = directionText({
                canvas: qG,
                y: 40,
                howlerStop: false,
                ttsStartCallback: howlerStop,
                ...question.direction
            });
        }

        if (question.elements) {
            question.elements.forEach(el => {
                createElement({
                    type: el.type,
                    canvas: qG,
                    meta: el.meta
                });
            });
        }
        //보기부분
        if (question.choice) {
            question.choice.forEach((arr, j) => {
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
                    ans: arr.answer,
                    hintCount: arr.hintCount,
                    btnShadowClassNum: classNum,
                    fbOpacity: arr.fbOpacity || 0.6,
                    btnRxy: rXY,
                    howlerStop: false,
                    inactiveAttr: {
                        classNum: '0028',
                        shapeFillClassNum: '14',
                        ...arr.inactiveAttr
                    },
                    callback: function () {
                        if (qCount < choiceStep.length - 1) {
                            qCount++;
                            choiceStep[qCount].start();
                        } else {
                            console.log('종료');
                            scrollG.attr('opacity', 0); // 마지막에 convert modal이 먼저 지워지는 문제 해결
                            callback();
                        }
                    }
                });
            });
        }
        convertModal = new com_pageConvert({
            g: canvas,
            appendG: converG,
            visible: convertVisible, // 210909
            time: 800,
            guideLine: guideLine, // 좌표선 삭제
            howlerStop: false,
            startCallback: function () {
                readingGroup.stop();
                howlerStop();
            },
            endCallback: function () {
                howlerStop();
            }
        });
    }

    //시작
    start();

    function start() {
        // 210909
        if (convertVisible) choiceAuto();
        readingGroup.start();
    }

    function choiceAuto() {
        // 210909
        isfirst = false;
        convertModal.start();
        choiceStep.forEach(el => el.show());
        choiceStep[qCount].start();
    }

    //모든 지시문 tts만 초기화
    function howlerStop() {
        if (ttsObj.tts.data('voice')) ttsObj.tts.data('voice').stop();
        if (qTTsObj.tts.data('voice')) qTTsObj.tts.data('voice').stop();
    }
};

export default KM000064;
