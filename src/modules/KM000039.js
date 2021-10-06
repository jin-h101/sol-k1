import {
    createElement,
    directionText
    // tempGuideLine // 이후 지우기
} from '../component';
import { loadSound, hint } from 'sol-common';
import { Howler } from 'howler';
import { feedback } from 'sol-common/util';

// 끝말 잇기
const KM000039 = async function ({ canvas, direction, elements, circleImage, choice, callback }) {
    // tempGuideLine(canvas); // 좌표선 삭제
    const g = canvas.g();
    const ttsG = g.g();
    const backG = g.g();
    const choiceG = g.g();

    const choiceGroup = [];
    let ans = [];
    let count = 0;
    let hintEl;
    let voice;

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

    if (circleImage) {
        const imgG = g.g();
        const clickG = g.g().before(imgG);
        // loadSound
        if (circleImage.soundInfo) {
            circleImage.voice = loadSound(circleImage.soundInfo.url);
        }
        // 그리기
        circleImage.element.forEach((el, i) => {
            const isFocus = i === circleImage.focusIndex || i === Number(circleImage.focusIndex);
            //이미지 버튼 마다
            el.forEach(el2 => {
                createElement({
                    type: el2.type,
                    canvas: isFocus ? clickG : imgG,
                    meta: el2.meta
                });
            });
        });

        const getArcStr = ({ startX, startY, endX, endY, originX, originY, r }) => {
            const str = `M${startX} ${startY} A${r} ${r}, 0, 0, 1, ${endX} ${endY} L${originX} ${originY} z`;
            return str;
        };

        if (circleImage.clickPath && circleImage.clickPath.meta) {
            const arcStr = getArcStr(circleImage.clickPath.meta);
            const clickEl = clickG.path(arcStr).attr({
                fill: 'white',
                fillOpacity: 0,
                stroke: circleImage.clickPath.check ? 'red' : 'none',
                strokeWidth: circleImage.clickPath.check ? circleImage.clickPath.meta.strokeWidth || 1 : 0
            });

            if (circleImage.clickPath.meta.strokeColor) {
                clickEl.addClass('s' + circleImage.clickPath.meta.strokeColor);
            }


            clickEl.touchOrClick(function () {
                Howler.stop();
                circleImage.voice.play();
                circleImage.voice.once('end', function () {});
            });
        }
    }

    if (choice) {
        choice.elements.forEach((choiceEl, i) => {
            choiceGroup[i] = choiceG.g().attr('pointerEvents', 'none');
            let rxy = 10;
            choiceEl.forEach(el => {
                if (el.meta.rXY || el.meta.rXY === 0) rxy = el.meta.rXY;
                createElement({
                    type: el.type,
                    canvas: choiceGroup[i],
                    meta: el.meta
                });
            });
            const groupBbox = choiceGroup[i].getTBox();
            choiceGroup[i].rect(groupBbox.x, groupBbox.y, groupBbox.w, groupBbox.h).addClass('f14 sno').attr('opacity', 0);
            choiceGroup[i].data('index', i).data('clickEnd', false).data('fbInfo', { rXY: rxy }).touchOrClick(actionCallback);
        });
        ans = Array.isArray(choice.ansIndex) ? choice.ansIndex : [choice.ansIndex];
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
                    el.attr('pointerEvents', 'auto'); //엘리먼트 활성
                    hintEl = hint({
                        canvas: g,
                        XY: [bbox.cx, bbox.cy]
                    }); //힌트 생성
                }
            } else {
                //힌트가 없거나 끝났을 때
                if (!el.data('clickEnd')) el.attr('pointerEvents', 'auto');
            }
        });
    }

    function pause() {
      choiceGroup.forEach(el => el.attr('pointerEvents', 'none'));
    }

    //choice callback
    function actionCallback() {
        const element = this;
        element.untouchOrClick();
        if (hintEl) hintEl.removeHint();
        element.data('clickEnd', true); //클릭이 끝남을 나타냄
        const userIdx = element.data('index'); //학습자가 누른 인덱스
        const fbI = element.data('fbInfo');
        const elBBox = element.getTBox();
        const bool = ans.indexOf(userIdx) !== -1;
        //o,x 피드백
        const className = bool ? 'fno s0018' : 'fno s0019';
        const box = g.rect(elBBox.x, elBBox.y, elBBox.w, elBBox.h, fbI.rXY, fbI.rXY).addClass(className).attr({
            strokeWidth: 5
        }); // 네모 피드백
        const fb = new feedback({
            canvas: g,
            el: [Math.min(elBBox.x2 + 10, 750), elBBox.y],
            bool: bool,
            gap: [0, 0],
            scale: 1,
            addAction: false,
            onRemove: function () {
                if (bool) {
                    //정답 시
                    count++;
                    pause();
                    setTimeout(function () {
                        if (ans.length === count) {
                            next();
                        } else {
                            start(choiceGroup, count);
                        }
                    }, 300); // 다음 상태 진행
                } else {
                    //오답 시
                    pause();
                    box.attr('opacity', 0);
                    element.attr('opacity', 0.4);
                    fb.addUserAction(); // 틀린 횟수 카운팅
                    setTimeout(function () {
                        start(choiceGroup, count);
                    }, 300);
                }
            }
        });
    }

    function next() {
        ttsG.attr('pointerEvents', 'none');
        g.attr('visibility', 'hidden');

        if (voice) {
            Howler.stop();
            voice.play();
            voice.once('end', callback);
        } else {
            callback();
        }
    }
};

export default KM000039;
