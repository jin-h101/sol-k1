import { createElement, tempGuideLine, makeOk, makeHelp, Ordering, com_makePopUp, directionText } from '../component';
import { feedback } from 'sol-common/util';

// 끝말 잇기
const KM000065 = async function ({
    canvas,
    direction,
    elements,
    order,
    helpPopUp,
    helpButton,
    tryCount = 3,
    callback
}) {
    // tempGuideLine(canvas); // 좌표선 삭제
    const g = canvas.g();
    const backG = g.g();
    const ttsG = g.g();
    const btnG = g.g();
    const orderG = g.g();
    let ordering;
    let popUp;
    let isFirst = true;
    const hiddenG = g.g().toDefs();
    let count = 0;

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

    if (order) {
        const dragEl = [];
        // 숫자 넘버링
        if (order.numbering) {
            order.numbering.forEach(el => {
                el.forEach(el2 => {
                    createElement({
                        type: el2.type,
                        canvas: orderG,
                        meta: el2.meta
                    });
                });
            });
        }

        // 드래그 요소
        if (order.dragEl) {
            order.dragEl.forEach((el, i) => {
                dragEl[i] = orderG.g();
                el.elements.forEach(el2 => {
                    createElement({
                        type: el2.type,
                        canvas: dragEl[i],
                        meta: el2.meta
                    });
                });
            });

            ordering = new Ordering({
                type: order.type,
                items: dragEl,
                dragArea: order.dragArea ? order.dragArea : undefined,
                endCallback: function () {
                    if (isFirst) {
                        ordering.item.forEach((el, i) => {
                            if (el.data('originalIndex') !== el.data('ind')) {
                                isFirst = false;
                                ok.start();
                                return;
                            }
                        });
                    }
                }
            });
        }
    }

    // 정답 체크
    function orderingCheck() {
        let checkBool = true;
        ordering.item.forEach((el, i) => {
            if (el.data('originalIndex') !== order.ans[i]) {
                checkBool = false;
                return;
            }
        });
        return checkBool;
    }

    // 확인 버튼 선택 시
    function okCall() {
        ok.unClick();
        help.stop();
        ordering.stop();
        const bool = orderingCheck(); // 정답 체크
        const bbox = orderG.getBBox();
        const fbXY = [Math.min(bbox.x2, 750), bbox.y];
        feedback({
            canvas: g,
            el: fbXY,
            scale: 1,
            bool: bool,
            onRemove: async function () {
                if (bool) {
                    // 정답일 때 피드백
                    callback();
                } else {
                    // 오답일 때
                    count = count + 1;
                    if (count < tryCount) {
                        ordering.start();
                        help.start();
                        ok.start();
                    }
                }
            }
        });
    }

    //ok버튼
    const ok = new makeOk({
        canvas: btnG,
        type: 0,
        visibility: true,
        event: false,
        callback: okCall //정답체크
    });

    if (helpPopUp) {
        if (helpPopUp.elements) {
            helpPopUp.elements.forEach(el => {
                createElement({
                    type: el.type,
                    canvas: hiddenG,
                    meta: el.meta
                });
            });
        }
    }

    // 도움말 선택 시
    const helpCall = async () => {
        help.stop();
        ok.stop();
        if (!popUp) {
            popUp = new com_makePopUp({
                canvas: g,
                popUpSize: helpPopUp.popUpSize,
                closeButton: {
                    x: helpPopUp.closeButton ? helpPopUp.closeButton.x : undefined,
                    y: helpPopUp.closeButton ? helpPopUp.closeButton.y : undefined,
                    onClick: async function () {
                        help.start();
                        if (!isFirst) ok.start();
                    }
                }
            });
            hiddenG.use().appendTo(popUp.g);
        }
        // popUp.closeButton.attr({ opacity: 0.5, pointerEvents: 'none' });
        await popUp.show();
    };

    //도움말 버튼
    const help = new makeHelp({
        cx: helpButton.cx,
        cy: helpButton.cy,
        canvas: btnG,
        visibility: true,
        event: true,
        callback: helpCall
    });

    //시작
    ordering.start();
    help.start();
};

export default KM000065;
