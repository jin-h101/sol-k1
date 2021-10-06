import Snap from 'sol-common/snap'
import {
    createElement,
    // tempGuideLine,
    loadDragAndDropSound,
    copyDrag,
    directionText,
} from '../component';
import { hint } from 'sol-common';
import { Howler } from 'howler';
import { feedback } from 'sol-common/util';

// 끝말 잇기
const KM000044 = async function ({
    canvas,
    direction,
    elements,
    drag,
    lastFeedback,
    callback
}) {
    // tempGuideLine(canvas) // 좌표선 삭제

    const g = canvas.g();
    const backG = g.g();
    const ttsG = g.g();
    const removeG = g.g();
    const dragG = removeG.g();
    const dadSound = loadDragAndDropSound();
    const dragGroup = [];
    const hintG = g.g();
    let hintEl;
    let count = 0;
    // let voice;
    const areaG = [];
    const areaBB = [];
    const focusG = [];
    const feedbackG = g.g().attr({
        'opacity': 0
    });

    if (direction) directionText({'canvas':ttsG, ...direction});


    //배경 존재 시 설정
    if (elements) {
        elements.forEach(el => {
            createElement({
                "type": el.type,
                "canvas": backG,
                "meta": el.meta
            });
        });
    }

    if (drag) {
        const focusPoly = g.polygon(0, 0, 10, 8, 0, 16).addClass('f024').toDefs();
        drag.areaEl.forEach((el, i) => {
            areaG[i] = dragG.g();
            createElement({
                "type": "rect",
                "canvas": areaG[i],
                "meta": el
            });
            areaBB[i] = areaG[i].getBBox();
        });
        drag.areaEl.forEach((el, i) => {
            focusG[i] = dragG.g().attr({
                'visibility': 'hidden'
            });
            areaG[i].select('rect').clone().removeAllClass().addClass('fno s024').attr({
                'stroke-width': 4
            }).appendTo(focusG[i]);
            const bbox = focusG[i].getBBox();
            focusPoly.use().transform('t' + [bbox.x - 2, bbox.cy]).anchor('right', 'middle').appendTo(focusG[i]);
        });
        drag.element.forEach((el, i) => {
            const currentDragG = dragG.g();
            el.forEach(el2 => {
                createElement({
                    "type": el2.type,
                    "canvas": currentDragG,
                    "meta": el2.meta
                });
            });

            dragGroup[i] = new copyDrag({
                'dragItem': currentDragG,
                'startCallback': async function () {
                    if (hintEl) hintEl.removeHint(); // 힌트 없애기
                    dragGroup[i].appendTo(dragG) // 현재 드래그 하는 엘리먼트를 엘리먼트 중에 가장 위로 보이도록 변경
                    Howler.stop();
                    await dadSound.drag.play(); // drag 소리
                },
                'moveCallback': function () {},
                'endCallback': async function () {
                    Howler.stop();
                    await dadSound.drop.play(); // drop 소리
                    dragCallback(i); // i는 현재 드래그한 el의 index 
                }
            });
        });
    }

    if (lastFeedback) {
        // 물음표
        if (lastFeedback.removeEl) {
            lastFeedback.removeEl.forEach(el => {
                createElement({
                    "type": el.type,
                    "canvas": removeG,
                    "meta": el.meta
                });
            });
        }

        if (lastFeedback.element) {
            lastFeedback.element.forEach(el => {
                createElement({
                    "type": el.type,
                    "canvas": feedbackG,
                    "meta": el.meta
                });
            });
        }
       
    }


    async function dragCallback(ind) {
        const el = dragGroup[ind].draggingItem;
        const dragBBox = el.getBBox(); //현재 드래그 한 것의 bbox
        if (Snap.path.isPointInsideBBox(areaBB[count], dragBBox.cx, dragBBox.cy)) { // 영역에 들어 왔을 때
            // 정답 체크
            const bool = drag.ansIndex[count] === ind;
            if (bool) { // 정답일 때
                focusG[count].remove();
                // 서서히 영역에 들어가기
                await dragGroup[ind].moveAnimate({
                    cx: drag.dragPosition && drag.dragPosition[count] ? drag.dragPosition[count].cx : areaBB[count].cx,
                    cy: drag.dragPosition && drag.dragPosition[count] ? drag.dragPosition[count].cy : areaBB[count].cy
                });
                el.clone().appendTo(dragG).attr('pointerEvents', 'none');
                el.remove();
                const rectAttr = areaG[count].select('rect').attr();
                const coloredRect = areaG[count].select('rect').clone().removeAllClass().attr({
                    'width': 0,
                    'x': Number(rectAttr.x) + Number(rectAttr.width) / 2,
                }).addClass('f' + (drag.fillClassNum || 'no'));
                await coloredRect.animate({
                    'width': Number(rectAttr.width),
                    'x': Number(rectAttr.x),
                }, 300, function () {
                    // 피드백 테두리
                    const fbRect = areaG[count].select('rect').clone();
                    fbRect.removeAllClass().addClass('fno s0018').attr({
                        'stroke-width': 5
                    });
                    // 피드백 아이콘
                    feedback({
                        canvas: g,
                        el: [areaBB[count].x2 - 10, areaBB[count].y],
                        scale: 1,
                        bool: bool,
                        onRemove: async function () {
                            if (bool) { // 정답일 때 피드백
                                el.attr({
                                    'pointerEvents': 'none'
                                }).data('action', false).appendTo(dragG);
                                areaBB[count] = undefined;
                                if (count < drag.ansIndex.length - 1) { //drag가 덜 끝났을 때
                                    count++;
                                    act();
                                } else { //모든 drag가 끝났을 때
                                    dragGroup.forEach(dG => dG.attr('pointerEvents', 'none').data('action', false));
                                    dragGroup.forEach(el => el.appendTo(g));
                                    if (lastFeedback) {
                                        lastCall();
                                    } else {
                                        next(); //drag 끝나고 다음화면
                                    }
                                    
                                }
                            }
                        }
                    });
                    // 피드백 테두리 없애주기
                    setTimeout(function () {
                        fbRect.remove();
                    }, 300);
                });

            } else { // 오답일 때 제자리로 돌아감
                await dragGroup[ind].reset();
                act();
            }

        } else { // 영역 안에 들어오지 않았을 때
            await dragGroup[ind].reset();
            act();
        }
    }

    function makeHint({startBB, endBB}) {
        if (hintEl) hintEl.removeHint();
        hintEl = hint({
            canvas: hintG,
            type: 1,
            XY: [startBB.cx, startBB.cy],
            moveTo: [endBB.cx, endBB.cy],
            dragTime: Snap.len(startBB.cx, startBB.cy, endBB.cx, endBB.cy) * 5
        });
    }

    function act() {
        focusG[count].attr({
            'visibility': 'visible'
        });
        if (count < drag.hintCount) { // 힌트 존재 시
            makeHint({
                'startBB': dragGroup[count].getBBox(),
                'endBB':areaBB[count],
            });
            dragGroup.forEach((el, a) => {
                if (a === count) el.attr('pointerEvents', 'auto');
                else el.attr('pointerEvents', 'none');
            });

        } else { //힌트 없을 시
            dragGroup.forEach(el => {
                el.attr('pointerEvents', 'auto');
            });
        }
    }

    function lastCall() {
        removeG.animate({
            'opacity': 0
        }, 300, function() {
            removeG.remove();
            feedbackG.animate({
                'opacity': 1
            }, 300, function() {
                setTimeout(next, lastFeedback.holdTime || 300);
            });
        });
    }

    function next() {
        ttsG.attr('pointerEvents', 'none');
        g.attr('visibility', 'hidden');
        callback();
    }

    // 시작
    act();

}

export default KM000044;