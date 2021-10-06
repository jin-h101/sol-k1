import Snap from 'sol-common/snap';
import { image, loadSound, hint } from 'sol-common/components';

import {
    K_richTextAuto,
    // tempGuideLine,
    oneWordSplit,
    oneWordCombine,
    wordMatchPath,
    pathList,
    simpleHandWrite,
    unPressMakeButton,
    createElement,
    blankWord,
    directionText
} from '../component';

import { Howler } from 'howler';

// complex
const KM000016 = async function ({
    canvas,
    direction,
    elements,
    word,
    sound,
    stepOne,
    stepTwo,
    stepThree,
    stepFour,
    callback
}) {
    // tempGuideLine(canvas) // 좌표선 삭제
    const g = canvas.g();
    const backG = g.g();
    const ttsG = g.g();
    const stepOneG = g.g();
    const focusRectG = [];
    const handWriteG = [];
    const reHandWriteInfo = [
        {
            direction: false,
            startPoint: { x: 0, y: 0 },
            wordHint: true,
            dotLine: true,
            boxFillClassNum: '14',
            boxStrokeClassNum: '01',
            opacity: 1,
            ...stepTwo.handWriteValue
        },
        {
            direction: false,
            startPoint: false,
            wordHint: false,
            dotLine: true,
            boxFillClassNum: '14',
            boxStrokeClassNum: '01',
            opacity: 1,
            ...stepThree.handWriteValue
        },
        {
            direction: true,
            startPoint: false,
            wordHint: false,
            dotLine: false,
            boxFillClassNum: '14',
            boxStrokeClassNum: '01',
            opacity: 1,
            ...stepFour.handWriteValue
        }
    ];
    let handWriteCount = 0;
    let aniCount = 0;
    // let questionMark;
    // let hiddenT;
    // word 식 만들기위한 분류
    const splitWordArr = oneWordSplit(word).wordArr;
    let equationT;
    let fbEl;
    const imgVoice = await loadSound(sound.url);
    const imgBtnVoice = await loadSound(stepFour.imageButton.soundInfo.url);

    // 지시문
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

    //stepOne
    if (splitWordArr.length === 2) {
        equationT = [splitWordArr[0], splitWordArr[1], word];
    } else if (splitWordArr.length === 3) {
        equationT = [oneWordCombine([splitWordArr[0], splitWordArr[1]]), splitWordArr[2], word];
    }
    // box 생성
    // stepOneG.rect(stepOne.equationValue.cx, stepOne.equationValue.cy, stepOne.equationValue.boxWidth * 3 + stepOne.equationValue.gap * 5, stepOne.equationValue.boxHeight * (1.5)).addClass('f110 s061').attr('fillOpacity',0.4).center();
    const fillColor = stepOne.equationValue.boxFillClassNum || '14';
    const beforeClass = stepOne.equationValue.boxStrokeClassNum || '0008';
    const afterClass = stepOne.equationValue.focusClassNum || '0003';
    for (let t = 0; t < 3; t++) {
        focusRectG[t] = stepOneG.g();
        const cx =
            stepOne.equationValue.cx +
            stepOne.equationValue.boxWidth * (1 * t - 1) +
            stepOne.equationValue.gap * (1 * t - 1) * 2;
        const cy = stepOne.equationValue.cy;
        focusRectG[t]
            .rect(0, 0, stepOne.equationValue.boxWidth, stepOne.equationValue.boxHeight)
            .addClass('f' + fillColor + ' s' + beforeClass)
            .attr({
                strokeWidth: stepOne.equationValue.boxStrokeWidth || 3
            });
        if (t < 2) {
            const classNum = t === stepOne.focusIndex ? 'f02 sno' : 'f91 sno';
            new K_richTextAuto({
                canvas: focusRectG[t],
                text: equationT[t],
                x: 0 + stepOne.equationValue.boxWidth / 2,
                y: 0 + stepOne.equationValue.boxHeight / 2,
                className: 'ffng ' + classNum + ' focusEl', //선택
                opacity: 0,
                fontSize: stepOne.equationValue.boxHeight * 0.7, //선택
                dy: 45, //선택
                isBold: false,
                options: undefined,
                center: true
            });
        } else {
            const wordG = focusRectG[t].g();
            const pathArr = wordMatchPath(equationT[t], pathList).pathImg;
            pathArr.forEach((path, i) => {
                const classNum = i === pathArr.length - 1 ? 'f02 sno' : 'f91 sno';
                path.forEach(pD => {
                    wordG.path(pD).addClass(classNum);
                });
            });
            wordG
                .transform(
                    Snap.matrix(
                        (stepOne.equationValue.boxHeight / 100) * 0.7,
                        0,
                        0,
                        (stepOne.equationValue.boxHeight / 100) * 0.7,
                        stepOne.equationValue.boxWidth / 2,
                        stepOne.equationValue.boxHeight / 2
                    )
                )
                .center()
                .attr({
                    opacity: 0,
                    class: 'focusEl'
                });
        }
        focusRectG[t].transform('t' + [cx, cy]).center();
    }
    // +표시
    stepOneG
        .text(
            stepOne.equationValue.cx - stepOne.equationValue.boxWidth / 2 - stepOne.equationValue.gap,
            stepOne.equationValue.cy,
            '+'
        )
        .addClass('ffng f01')
        .attr({
            fontSize: stepOne.equationValue.boxHeight * 0.7
        })
        .center();
    // =표시
    stepOneG
        .text(
            stepOne.equationValue.cx + stepOne.equationValue.boxWidth / 2 + stepOne.equationValue.gap,
            stepOne.equationValue.cy,
            '='
        )
        .addClass('ffng f01')
        .attr({
            fontSize: stepOne.equationValue.boxHeight * 0.7
        })
        .center();

    //stepTwo ~ stepFour 생성
    for (let q = 0; q < 3; q++) {
        const stPoint = reHandWriteInfo[q].startPoint
            ? { type: 1, ...reHandWriteInfo[q].startPoint }
            : reHandWriteInfo[q].startPoint; //위로 연필 이미지
        handWriteG[q] = new simpleHandWrite({
            canvas: g.g(),
            x: reHandWriteInfo[q].x,
            y: reHandWriteInfo[q].y,
            width: reHandWriteInfo[q].width,
            height: reHandWriteInfo[q].height,
            rXY: reHandWriteInfo[q].rXY,
            drawClassNum: reHandWriteInfo[q].drawClassNum,
            drawStrokeWidth: reHandWriteInfo[q].drawStrokeWidth,
            boxFillClassNum: reHandWriteInfo[q].boxFillClassNum,
            boxStrokeClassNum: reHandWriteInfo[q].boxStrokeClassNum,
            boxOpacity: reHandWriteInfo[q].opacity,
            shadowDx: reHandWriteInfo[q].shadowDx,
            shadowDy: reHandWriteInfo[q].shadowDy,
            shadowBlur: reHandWriteInfo[q].shadowBlur,
            shadowOpacity: reHandWriteInfo[q].shadowOpacity,
            shadowClassNum: reHandWriteInfo[q].shadowClassNum,
            direction: reHandWriteInfo[q].direction,
            directionInfo: { fs: 14, classNum: '01', ...reHandWriteInfo[q].directionInfo },
            startPoint: stPoint,
            wordHint: reHandWriteInfo[q].wordHint,
            wordHintClassNum: reHandWriteInfo[q].wordHintClassNum,
            wordHintOpacity: reHandWriteInfo[q].wordHintOpacity,
            wordHintFs: reHandWriteInfo[q].wordHintFs,
            dotLine: reHandWriteInfo[q].dotLine,
            dotLineClassNum: reHandWriteInfo[q].dotLineClassNum,
            dotLineStrokeWidth: reHandWriteInfo[q].dotLineStrokeWidth,
            dotLineOpacity: reHandWriteInfo[q].dotLineOpacity,
            okButton: { type: 0, ...reHandWriteInfo[q].okButton },
            undoButton: reHandWriteInfo[q].undoButton,
            resetButton: reHandWriteInfo[q].resetButton,
            answer: word,
            callback: function () {
                handWriteCount++;
                if (handWriteCount < handWriteG.length) {
                    ttsG.attr('pointerEvents', 'none');
                    Howler.stop();
                    imgVoice.play();
                    imgVoice.once('end', function () {
                        handWriteG[handWriteCount - 1].g.remove();
                        handWriteG[handWriteCount].g.attr('visibility', 'visible');
                        if (handWriteCount === 2) imgBtnG.attr('pointerEvents', 'auto');
                        handWriteG[handWriteCount].start();
                    });
                } else {
                    console.log(fbEl);
                    ttsG.attr('pointerEvents', 'none');
                    imgBtnG.attr('pointerEvents', 'none');
                    Howler.stop();
                    imgVoice.play();
                    fbEl.hiddenEl.attr('opacity', 1);
                    fbEl.questionMark.attr('opacity', 0);
                    imgVoice.once('end', callback); //종료
                }
            }
        });
        handWriteG[q].g.attr('visibility', 'hidden');
    }

    //stepFour에 이미지 버튼 생성
    const imgBtnG = handWriteG[2].g.g().attr('pointerEvents', 'none');
    if (stepFour.imageButton.imageInfo) {
        stepFour.imageButton.imageInfo.forEach(imgEl => {
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
    if (stepFour.imageButton.textInfo) {
        const textG = imgBtnG.g();
        fbEl = blankWord({
            canvas: textG,
            blankR: stepFour.imageButton.textInfo.r,
            blankFillClassNum: stepFour.imageButton.textInfo.blankFillClassNum || '114',
            blankStrokeClassNum: stepFour.imageButton.textInfo.blankStrokeClassNum || '115',
            blankStrokeWidth: stepFour.imageButton.textInfo.blankStrokeWidth,
            blankQmarkClass: stepFour.imageButton.textInfo.classNum,
            focusClassNum: '000',
            ...stepFour.imageButton.textInfo
        });
    }

    new unPressMakeButton({
        el: imgBtnG,
        isButton: stepFour.imageButton.isButton,
        x: stepFour.imageButton.x,
        y: stepFour.imageButton.y,
        width: stepFour.imageButton.width,
        height: stepFour.imageButton.height,
        shadowClassNum: stepFour.imageButton.shadowClassNum,
        shadowDx: stepFour.imageButton.shadowDx,
        shadowDy: stepFour.imageButton.shadowDy,
        shadowBlur: stepFour.imageButton.shadowBlur,
        shadowOpacity: stepFour.imageButton.shadowOpacity,
        btnFillClassNum: stepFour.imageButton.btnFillClassNum,
        btnStrokeClassNum: stepFour.imageButton.btnStrokeClassNum,
        btnOpacity: stepFour.imageButton.btnOpacity,
        btnStrokeWidth: stepFour.imageButton.btnStrokeWidth,
        btnR: stepFour.imageButton.btnR,
        callback: async function () {
            console.log(imgBtnVoice);
            Howler.stop();
            imgBtnVoice.play();
            imgBtnVoice.once('end', function () {});
        }
    });

    //처음 시작
    appearAni(focusRectG[aniCount]);

    //stepOne 진행 함수
    function appearAni(el) {
        el.selectAll('rect')[0]
            .removeClass('s' + beforeClass)
            .addClass('s' + afterClass);
        el.selectAll('.focusEl')[0].attr({
            opacity: 1
        });
        aniCount++;
        if (aniCount < focusRectG.length) {
            setTimeout(function () {
                el.selectAll('rect')[0]
                    .removeClass('s' + afterClass)
                    .addClass('s' + beforeClass);
                appearAni(focusRectG[aniCount]);
            }, 1000);
        } else {
            //stepOne에서 음성 나오기 위한 터치 유도
            const touchHint = new hint({
                canvas: stepOneG,
                scale: 1,
                type: 0,
                XY: [
                    stepOne.equationValue.cx + stepOne.equationValue.boxWidth + stepOne.equationValue.gap * 2,
                    stepOne.equationValue.cy
                ]
            });
            stepOneG.touchOrClick(function () {
                ttsG.attr('pointerEvents', 'none');
                if (touchHint) touchHint.removeHint();
                this.untouchOrClick();
                Howler.stop();
                imgVoice.play();
                imgVoice.once('end', function () {
                    const bbox = stepOneG.getTBox();
                    stepOneG.animate(
                        {
                            transform:
                                't' +
                                [stepTwo.equationValue.cx - bbox.cx, stepTwo.equationValue.cy - bbox.cy] +
                                ' s' +
                                stepTwo.equationValue.scale
                        },
                        500,
                        function () {
                            handWriteG[handWriteCount].g.attr('visibility', 'visible');
                            handWriteG[handWriteCount].start();
                            ttsG.attr('pointerEvents', 'auto');
                        }
                    );
                });
            });
        }
    }
};

export default KM000016;
