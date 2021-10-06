import {
    createElement,
    K_makeButton,
    directionText
    // tempGuideLine
} from '../component';
import { loadSound, hint } from 'sol-common';
import { Howler } from 'howler';
import { feedback } from 'sol-common/util';

// 끝말 잇기
const KM000036 = async function ({ canvas, direction, elements, choice, lastFeedback, callback }) {
    // tempGuideLine(canvas) // 좌표선 삭제
    const g = canvas.g();
    const firstG = g.g();
    const secondG = g.g().attr('visibility', 'hidden');
    const ttsG = g.g();
    const backG = firstG.g();
    const choiceG = firstG.g();
    const choiceGroup = [];
    let ans = [];
    let count = 0;
    let hintEl;
    let voice;
    if (lastFeedback && lastFeedback.soundInfo) voice = await loadSound(lastFeedback.soundInfo.url);

    // 지시문
    if (direction) directionText({'canvas':ttsG, ...direction});

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

    if (choice) {
        choice.elements.forEach((choiceEl, i) => {
            choiceGroup[i] = choiceG.g();
            // .attr('pointerEvents','none');
            let rxy = 10;
            let shadowClass;
            choiceEl.forEach(el => {
                if (el.meta.rXY || el.meta.rXY === 0) console.log(el.meta.rXY), (rxy = el.meta.rXY);
                createElement({
                    type: el.type,
                    canvas: choiceGroup[i],
                    meta: { ...el.meta, shadowClassNum: undefined }
                });
                if (el.meta.shadowClassNum) shadowClass = el.meta.shadowClassNum;
            });
            const groupBbox = choiceGroup[i].getTBox();
            // choiceGroup[i].rect(groupBbox.x,groupBbox.y,groupBbox.w,groupBbox.h).addClass('f14 sno').attr('opacity',0)
            choiceGroup[i].data('index', i).data('clickEnd', false).data('fbInfo', { rXY: rxy });
            // .touchOrClick(actionCallback);
            new K_makeButton({
                el: choiceGroup[i],
                x: groupBbox.cx,
                y: groupBbox.cy,
                width: groupBbox.width,
                height: groupBbox.height,
                fillClassNum: '14',
                strokeClassNum: 'no',
                shadowClassNum: shadowClass || '0006',
                r: rxy,
                index: i,
                isMetaSize: true,
                endCallback: actionCallback
            });
            choiceGroup[i].stop();
        });
        ans = Array.isArray(choice.ansIndex) ? choice.ansIndex : [choice.ansIndex];
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

    //처음 시작
    start(choiceGroup, count);

    //시작 함수
    function start(element, n) {
        element.forEach((el, k) => {
            if (n < choice.hintCount) {
                //힌트 있을 때
                if (ans[n] === k) {
                    const bbox = el.getTBox();
                    // el.attr('pointerEvents','auto'); //엘리먼트 활성
                    el.reStart(); //엘리먼트 활성
                    hintEl = hint({
                        canvas: g,
                        XY: [bbox.cx, bbox.cy]
                    }); //힌트 생성
                }
            } else {
                //힌트가 없거나 끝났을 때
                //    if(!el.data('clickEnd')) el.attr('pointerEvents','auto');
                if (!el.data('clickEnd')) el.reStart();
            }
        });
    }

    //choice callback
    function actionCallback(index, group) {
        const element = choiceGroup[index];
        if (hintEl) hintEl.removeHint();
        const elBBox = element.getTBox();
        const bool = ans.indexOf(index) !== -1;
        //o,x 피드백
        const className = bool ? 'fno s0018' : 'fno s0019';
        const box = firstG
            .rect(elBBox.x, elBBox.y, elBBox.w, elBBox.h, group.data('rXY'), group.data('rXY'))
            .addClass(className)
            .attr({
                strokeWidth: 5
            }); // 네모 피드백
        element.data('clickEnd', true); //클릭이 끝남을 나타냄
        pause(choiceGroup);
        const fb = new feedback({
            canvas: firstG,
            el: [elBBox.x2 + 10, elBBox.y],
            bool: bool,
            gap: [0, 0],
            scale: 1,
            addAction: false,
            onRemove: function () {
                if (bool) {
                    //정답 시
                    count++;
                    setTimeout(function () {
                        if (ans.length === count) {
                            next();
                        } else {
                            start(choiceGroup, count);
                        }
                    }, 300); // 다음 상태 진행
                } else {
                    //오답 시
                    box.attr('opacity', 0);
                    element.attr('opacity', 0.4);
                    fb.addUserAction();
                    setTimeout(function () {
                        reStart(choiceGroup);
                    }, 300);
                }
            }
        });
    }


    function next() {
        ttsG.attr('pointerEvents', 'none');
        firstG.attr('visibility', 'hidden');
        secondG.attr('visibility', 'visible');
        if (voice) {
            Howler.stop();
            voice.play();
            voice.once('end', callback);
        } else {
            callback();
        }
    }

    function pause(el) {
        // el.forEach(e => e.attr('pointerEvents','none'));
        el.forEach(e => e.stop());
    }

    function reStart(el) {
        el.forEach(e => {
            // if(!e.data('clickEnd')) e.attr('pointerEvents','auto')
            if (!e.data('clickEnd')) e.reStart();
        });
    }
};

export default KM000036;
