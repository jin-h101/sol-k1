import {
    com_pageConvert,
    createElement,
    directionText,
    makeOk,
    makeHelp,
    Ordering,
    OrderingHint,
    com_makePopUp,
    // tempGuideLine,
    reading,
    areaToRect,
} from '../component';
import {
    feedback
} from 'sol-common/util';
import { hint } from 'sol-common';

//지문 읽기(스크롤), 선택지choice 모듈
const KM000059 = async function ({
    canvas,
    direction,
    elements,
    scroll,
    sound,
    question,
    gap = 40,
    callback,
    // guideLine = true // 좌표선 삭제
}) {
    // tempGuideLine(canvas);
    const g = canvas.g();
    const backG = g.g();
    const ttsG = g.g();
    const scrollG = g.g();
    const converG = g.g().attr('class', 'convert');
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
        firstGuide: !convertVisible,
        startCallback: function () {
            if (isfirst) orderingAuto(); // 210909
            howlerStop();
        },
        endCallback: function () {
            console.log('end call');
        }
    });

    //문항 부분
    let convertModal;
    let firstHint;
    let isStart = false;
    //정답 메타가 입력되었을 때만 실행
    if (question) {
        const qG = converG.g();
        const btnG = converG.g();
        const orderG = converG.g();
        let ordering;
        let popUp;
        const hiddenG = g.g().toDefs();
        let orderHint;
        let hintEl = [];
        let orderCount = 0;

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
        // 순서
        if (question.order) {
            const dragEl = [];
              // 숫자 넘버링
            if (question.order.numbering) {
                question.order.numbering.forEach(el => {
                    el.forEach(el2 => {
                        createElement({
                            "type": el2.type,
                            "canvas": orderG,
                            "meta": el2.meta
                        });
                    });
                });
            }
               // 드래그 요소
            if (question.order.dragEl) {
                question.order.dragEl.forEach((el, i) => {
                    dragEl[i] = orderG.g();
                    el.elements.forEach(el2 => {
                        createElement({
                            "type": el2.type,
                            "canvas": dragEl[i],
                            "meta": el2.meta
                        });
                    });
                });
                
                ordering = new Ordering({
                    type: question.order.type,
                    items: dragEl,
                    dragArea: question.order.dragArea ? question.order.dragArea : undefined,
                    dx: gap
                });

                // if (question.order.dragArea) {
                //     areaToRect(question.order.dragArea, orderG).addClass('fno s0005')
                // }
            }
        }

        if (question.helpPopUp) {
            if (question.helpPopUp.elements) {
                question.helpPopUp.elements.forEach(el => {
                    createElement({
                        "type": el.type,
                        "canvas": hiddenG,
                        "meta": el.meta
                    });
                });
    
                if (question.helpPopUp.orderHint && question.helpPopUp.orderHint.hintEl) {
                    question.helpPopUp.orderHint.hintEl.forEach((el, i) => {
                        hintEl[i] = hiddenG.g();
                        el.forEach(el2 => {
                            createElement({
                                "type": el2.type,
                                "canvas": hintEl[i],
                                "meta": el2.meta
                            });
                        });
                    });
                    // orderHint
                    orderHint = new OrderingHint({
                        "type": question.helpPopUp.orderHint.type,
                        "canvas": hiddenG,
                        "items": hintEl,
                        "hintIndex": question.helpPopUp.orderHint.hintIndex,
                        "callback": function() {
                            if(popUp && popUp.closeButton) {
                                setTimeout(function() {
                                    popUp.closeButton.attr({'opacity': 1, 'pointerEvents': 'auto'});
                                }, 200);
                                
                            }
                        }
                    });
                }
            }
        }

        // 정답 체크
        const orderingCheck = () => {
            let checkBool = true;
            ordering.item.forEach((el, i) => {
                if (el.data('originalIndex') !== question.order.ans[i]) {
                    checkBool = false;
                    return;
                }
            });
            return checkBool;
        }
        // 확인 버튼 선택 시
        const okCall = () => {
            ok.unClick();
            help.stop();
            ordering.stop();
            const bool = orderingCheck(); // 정답 체크
            const bbox = orderG.getBBox();
            const fbXY = [Math.min(bbox.x2, 750), bbox.y];
            feedback({
                canvas: converG,
                el: fbXY,
                scale: 1,
                bool: bool,
                onRemove: async function () {
                    if (bool) { // 정답일 때 피드백
                        setTimeout(next, 500);
                        // next();
                    } else { // 오답일 때
                        orderCount = orderCount + 1;
                        if (orderCount < 3) {
                            ordering.start();
                            help.start();
                            ok.start();
                        }
                    }
                }
            });
        }

         // 도움말 선택 시
        const helpCall = async () => {
            help.stop();
            ok.stop();
            if (firstHint) firstHint.removeHint();
            if (!popUp) {
                popUp = new com_makePopUp({
                    canvas: converG,
                    popUpSize: question.helpPopUp.popUpSize,
                    closeButton : {
                        "x": question.helpPopUp.closeButton ? question.helpPopUp.closeButton.x : undefined,
                        "y": question.helpPopUp.closeButton ? question.helpPopUp.closeButton.y : undefined,
                        "onClick": async function() {
                            await orderHint.stop();
                            await orderHint.reset();
                            if (!isStart) { // 도움말 한번 봐야 시작
                                isStart = true;
                                ordering.start();
                            }
                            help.start();
                            ok.start();
                        }
                    }
                });
                hiddenG.use().appendTo(popUp.g);
            }
            popUp.closeButton.attr({'opacity': 0.5, 'pointerEvents': 'none'});
            await popUp.show();
            setTimeout(function() {
                orderHint.start();
            }, 400);
        }

        //ok버튼
        const ok = new makeOk({
            'canvas': btnG,
            'type': 0,
            'visibility': true,
            'event': false,
            'callback': okCall //정답체크
        });

        //도움말 버튼
        const help = new makeHelp({
            "cx": question.helpButton.cx,
            "cy": question.helpButton.cy,
            'canvas': btnG,
            'visibility': true,
            'event': true,
            'howlerStop': false,
            callback: helpCall
        });


        convertModal = new com_pageConvert({
            g: canvas,
            appendG: converG,
            visible: convertVisible, // 210909
            time: 800,
            // guideLine: guideLine, // 좌표선 삭제
            howlerStop: false,
            startCallback: function () {
                // 문제 시작
                readingGroup.stop();
                howlerStop();
                // 힌트 만들기
                if (!isStart) {
                   // 프레임 시작 : 힌트
                    firstHint = hint({
                        canvas: converG,
                        type: 0,
                        XY: [question.helpButton.cx ,question.helpButton.cy - 10],
                    });
                } else {
                    ordering.start();
                    ok.start();
                }
                help.start();
            },
            endCallback: function () {
                // 문제 종료, 리딩 시작
                // 힌트 제거
                if (firstHint) firstHint.removeHint();
                ok.unClick();
                help.stop();
                ordering.stop();

            }
        });
    }

    //시작
    start();

    function start() {
        if (convertVisible) orderingAuto();
        readingGroup.start();
        // orderingAuto();
    }
    function orderingAuto (){
        isfirst = false;
        convertModal.start();
    }
    function next() {
        howlerStop();
        callback();
    }

    //모든 지시문 tts만 초기화
    function howlerStop() {
        if (ttsObj.tts.data('voice')) ttsObj.tts.data('voice').stop();
        if (qTTsObj.tts.data('voice')) qTTsObj.tts.data('voice').stop();
    }
};

export default KM000059;
