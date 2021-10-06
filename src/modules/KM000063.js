import {
    directionText,
    createElement,
    makeSoundButton,
    // tempGuideLine,
    loadBtnSound,
    K_record,
    fadeOut,
    fadeIn,
    makeOk
} from '../component';
import { SOL } from 'sol-common/util';
import Snap from 'sol-common/snap';
import { hint } from 'sol-common';
import { Howler } from 'howler';

const animateOnPath = ({ path, scale = 1, duration = 3000, element }) => {
    const startPt = Snap.path.getPointAtLength(path, 0);

    return new Promise(resolve => {
        Snap.animate(
            0,
            1,
            val => {
                const { x, y } = Snap.path.getPointAtLength(path, val * Snap.path.getTotalLength(path));
                const transform = 't' + [x - startPt.x, y - startPt.y] + 's' + (1 - val * (1 - scale));
                element.transform(transform);
            },
            duration,
            undefined,
            resolve
        );
    });
};

const KM000063 = async function ({ canvas = SOL.SVG, callback, ...p }) {
    // tempGuideLine(canvas); // 좌표선 삭제
    const g = canvas.g();
    const backG = g.g(); // elements 그리는 그룹
    const ttsG = g.g(); // 지시문 그룹
    const secondG = g.g().attr('opacity', '0'); // 두 번째 화면
    const firstG = g.g(); // 첫 번째 화면
    const contentG = g.g().attr('visibility', 'hidden');

    // 지시문
    if (p.direction) directionText({ canvas: ttsG, ...p.direction });

    //배경 존재 시 설정
    if (p.elements) {
        p.elements.forEach(el => {
            if (el) {
                createElement({
                    type: el.type,
                    canvas: backG,
                    meta: el.meta
                });
            }
        });
    }

    // 첫 번째 화면 그리기
    if (p.firstContent) {
        const touchSnd = loadBtnSound(0);
        let hintEl;
        if (p.firstContent.elements) {
            const elG = firstG.g().addClass('cp');
            p.firstContent.elements.forEach(el => {
                if (el) {
                    createElement({
                        type: el.type,
                        canvas: elG,
                        meta: el.meta
                    });
                }
            });
            // 클릭하면
            elG.click(() => {
                if (hintEl) hintEl.removeHint();
                // 버튼 소리 클릭
                touchSnd.play();
                if (p.secondContent) {
                    // 다음 페이지
                    fadeOut({
                        element: firstG,
                        duration: 500,
                        callback: function () {
                            firstG.remove();
                            fadeIn({
                                element: secondG,
                                duration: 500,
                                callback: function () {
                                    // 움직이기
                                    const { cx, cy } = secondG.getBBox();
                                    const pathStr =
                                        'M' +
                                        [cx, cy] +
                                        'L' +
                                        [p.secondContent.moveTo?.cx ?? 400, p.secondContent.moveTo?.cy ?? 175];
                                    setTimeout(async () => {
                                        await animateOnPath({
                                            path: pathStr,
                                            scale: p.secondContent.moveTo?.scale ?? 0.6,
                                            duration: 500,
                                            element: secondG
                                        });
                                        // content start
                                        contentG.attr('visibility', 'visible');
                                        myRecord.start();
                                    }, p.secondContent.moveTo?.delayTime ?? 300);
                                }
                            });
                        }
                    });
                }
            });
            // 힌트
            if (p.firstContent.hint) {
                hintEl = hint({
                    canvas: firstG,
                    XY: [p.firstContent.hint?.x ?? 470, p.firstContent.hint?.y ?? 300]
                });
            }
        }
    }

    // 두 번째 화면
    if (p.secondContent) {
        if (p.secondContent.elements) {
            p.secondContent.elements.forEach(el => {
                if (el) {
                    createElement({
                        type: el.type,
                        canvas: secondG,
                        meta: el.meta
                    });
                }
            });
        }
    }

    let sndG;
    if (p.soundButton) {
        sndG = makeSoundButton({
            g: contentG,
            elements: p.soundButton.elements,
            sound: p.soundButton.sound
        }).g;
    }

    const myRecord = new K_record({
        canvas: contentG,
        record: p.record,
        recordStartCallback: function () {
            okBtn.stop();
            Howler.stop();
            ttsG.attr('pointer-events', 'none');
            if (sndG) sndG.attr('pointer-events', 'none');
        },
        recordEndCallback: function () {
            okBtn.start();
        },
        listenStartCallback: function () {
            okBtn.stop();
            Howler.stop();
            ttsG.attr('pointer-events', 'none');
            if (sndG) sndG.attr('pointer-events', 'none');
        },
        listenEndCallback: function () {
            okBtn.start();
        },
    });

    // ok 버튼
    const okBtn = new makeOk({
        canvas: contentG,
        visibility: true,
        // event: true,
        callback: callback
    });
};

export default KM000063;
