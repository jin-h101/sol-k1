import { image, loadSound } from 'sol-common/components';
import { feedback } from 'sol-common/util';

import {
    K_makeButton,
    K_richTextAuto,
    unPressMakeButton,
    createElement,
    directionText
    // tempGuideLine
} from '../component';

import { Howler } from 'howler';

// choice 모듈(같은 단어 고르기)
const KM000012 = async function ({ canvas, direction, elements, imageButton, choiceElements, callback }) {
    // tempGuideLine(canvas) // 좌표선 삭제
    const g = canvas.g();
    const backG = g.g();
    const ttsG = g.g();
    const imgBtnG = g.g();
    const choiceG = g.g();

    let voice;
    if (imageButton && imageButton.wordInfo) voice = await loadSound(imageButton.soundInfo.url);
    const choiceEl = [];
    let answer = [];
    let ansCount = 0;

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

    // 이미지 버튼 존재 시
    if (imageButton) {
        if (imageButton.imageInfo) {
            imageButton.imageInfo.forEach(imgEl => {
                const gg = imgBtnG.g();
                new image({
                    canvas: gg,
                    x: imgEl.cx,
                    y: imgEl.cy,
                    img: {
                        scale: 1,
                        ...imgEl.img
                    },
                    center: true
                });
                if (imgEl.img && imgEl.img.rotate) gg.transform('r' + imgEl.img.rotate);
            });
        }

        if (imageButton.wordInfo) {
            new K_richTextAuto({
                canvas: imgBtnG,
                text: imageButton.wordInfo.word,
                x: imageButton.wordInfo.cx,
                y: imageButton.wordInfo.cy,
                className: 'ffng f' + (imageButton.wordInfo.classNum || '000'), //선택
                fontSize: imageButton.wordInfo.fontSize || 40, //선택
                dy: imageButton.wordInfo.dy || 45, //선택
                isBold: imageButton.wordInfo.bold || false,
                options: imageButton.wordInfo.options,
                center: true
            });
        }

        new unPressMakeButton({
            el: imgBtnG,
            isButton: imageButton.isButton,
            x: imageButton.x,
            y: imageButton.y,
            width: imageButton.width,
            height: imageButton.height,
            shadowClassNum: imageButton.shadowClassNum,
            shadowDx: imageButton.shadowDx,
            shadowDy: imageButton.shadowDy,
            shadowBlur: imageButton.shadowBlur,
            shadowOpacity: imageButton.shadowOpacity,
            btnFillClassNum: imageButton.btnFillClassNum,
            btnStrokeClassNum: imageButton.btnStrokeClassNum,
            btnOpacity: imageButton.btnOpacity,
            btnStrokeWidth: imageButton.btnStrokeWidth,
            btnR: imageButton.btnR,
            callback: async function () {
                console.log(voice);
                Howler.stop();
                voice.play();
                voice.once('end', function () {});
            }
        });
    }

    //선택 버튼
    choiceElements.forEach((el, i) => {
        // if(imageButton && imageButton.wordInfo && imageButton.wordInfo.word===el.word) autoAnswer.push(i); // 정답 부분 미입력 시 직접 찾기
        choiceEl[i] = choiceG.g().data('clickEnd', false);
        const x = el.btnInfo.x || 0;
        const y = el.btnInfo.y || 0;
        const width = el.btnInfo.width || 140;
        const height = el.btnInfo.height || 80;
        const cx = x + width / 2;
        const cy = y + height / 2;
        const r = el.btnInfo.r || 10;

        if (el.imageInfo) {
            console.log(el.imageInfo);
            el.imageInfo.forEach(imgEl => {
                const gg = choiceEl[i].g();
                new image({
                    canvas: gg,
                    x: imgEl.cx,
                    y: imgEl.cy,
                    img: {
                        scale: 1,
                        ...imgEl.img
                    },
                    center: true
                });
                if (imgEl.img && imgEl.img.rotate) gg.transform('r' + imgEl.img.rotate);
            });
        }

        if (el.wordInfo) {
            new K_richTextAuto({
                canvas: choiceEl[i],
                text: el.wordInfo.word,
                x: el.wordInfo.cx || cx,
                y: el.wordInfo.cy || cy,
                className: 'ffng f' + (el.wordInfo.classNum || '91'), //선택
                fontSize: el.wordInfo.fontSize || 40, //선택
                dy: el.wordInfo.dy || 45, //선택
                isBold: el.wordInfo.bold || false,
                options: el.wordInfo.options,
                center: true
            });
        }
        new K_makeButton({
            el: choiceEl[i],
            x: cx,
            y: cy,
            width: width,
            height: height,
            fillClassNum: el.btnInfo.fillClassNum,
            strokeClassNum: el.btnInfo.strokeClassNum,
            shadowClassNum: el.btnInfo.shadowClassNum,
            r: r,
            index: i,
            isMetaSize: true,
            endCallback: acitonCallback
        });
        if (el.isAns) answer.push(i);
    });

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

    function acitonCallback(index, group) {
        const bool = answer.indexOf(index) !== -1;
        const element = choiceEl[index];
        const bbox = element.getTBox();
        //o,x 피드백
        const className = bool ? 'fno s0018' : 'fno s0019';
        const r = group.data('rXY');
        const box = element.rect(bbox.x, bbox.y, bbox.w, bbox.h, r, r).addClass(className).attr({
            strokeWidth: 5
        }); // 네모 피드백
        element.data('clickEnd', true); //클릭이 끝남을 나타냄
        pause(choiceEl);
        const fb = new feedback({
            canvas: g,
            el: [bbox.x2, bbox.y],
            bool: bool,
            gap: [0, 0],
            scale: 1,
            addAction: false,
            onRemove: function () {
                if (bool) {
                    ansCount++;
                    if (ansCount >= answer.length) setTimeout(callback, 300);
                    else reStart(choiceEl);
                } else {
                    box.attr('opacity', 0);
                    element.attr('opacity', 0.4);
                    fb.addUserAction();
                    setTimeout(function () {
                        reStart(choiceEl);
                    }, 300);
                }
            }
        });
    }
};

export default KM000012;
