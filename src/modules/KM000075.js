import Snap from 'sol-common/snap';
import mina from 'sol-common/snap/mina';
import { loadSound, image } from 'sol-common';
import {
    directionText,
    createElement,
    tempGuideLine,
    stepChoice,
    loadMazeImg,
    reading,
    com_pageConvert
} from '../component';
import { SOL } from 'sol-common/util';
// 학습만화 모듈
const KM000075 = async function ({ canvas = SOL.SVG, direction, elements, scroll, callback, question, sound }) {
    // const KM000075 = async function ({ canvas = SOL.SVG, direction, elements, lastFeedback, callback, choice, animation }) {
    tempGuideLine(canvas.g()); // 좌표선 삭제
    const g = canvas.g();
    const ttsG = g.g();
    const backG = g.g();
    const scrollG = g.g();
    const tempG = g.g();

    const g1 = g.g(); //문제
    const subG = g1.g();
    const animateG = subG.g();
    let moveImg;
    const choiceG = subG.g();

    let ttsObj, qTTsObj;
    let isfirst = true; // 210909
    let questionStart = true;
    const convertVisible = (question && question.visible) || false; // 210909
    let animate;
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
            console.log('end call');
        }
    });

    let convertModal;

    // question 지시문
    if (question.direction)
        qTTsObj = directionText({ canvas: g1, howlerStop: false, ttsStartCallback: howlerStop, ...question.direction });

    // directionText({ canvas: ttsG, ...direction });

    //배경 존재 시 설정
    if (question.elements) {
        question.elements.forEach(el => {
            if (!Array.isArray(el)) el = [el];
            el.forEach(el2 => {
                createElement({
                    type: el2.type,
                    canvas: g1,
                    meta: el2.meta
                });
            });
        });
    }

    let choiceEl = [];
    let choiceQ = [];
    let choiceStep = [];
    let qCount = 0;
    if (question.choice) {
        question.choice.forEach((arr, j) => {
            const choiceGroup = choiceG.g();
            choiceQ[j] = choiceGroup.g().attr('opacity', 0);
            arr.question.elements.forEach(el2 => {
                createElement({
                    type: el2.type,
                    canvas: choiceQ[j],
                    meta: el2.meta
                });
            });

            choiceEl.push([]);
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
                ans: arr.ansIndex,
                hintCount: arr.hintCount,
                btnShadowClassNum: '0006',
                btnRxy: 5,
                // howlerStop: false,
                // standardIndex: 10,
                // inactiveAttr: {
                //     classNum: '0028',
                //     shapeFillClassNum: 14,
                //     ...arr.inactiveAttr
                // },
                // modal: 'convert',
                choiceCallback: function (i) {
                    choiceEl[j].forEach(function (el, k) {
                        if (k !== i) el.remove();
                    });
                },
                callback: function () {
                    choiceQ[qCount].attr('opacity', 0);
                    qCount++;
                    animate[qCount].start();
                }
            });
            // choiceStep[j].show();
        });
    }

    if (question.animation) {
        const { animation } = question;
        const x = animation.mazeImage.x; //ani
        const y = animation.mazeImage.y;
        const imgScale = animation.mazeImage.scale; // 받을 메타
        const mainImg = loadMazeImg(animation.mazeImage.imgIndex);

        const pathStr = [];
        mainImg.use().transform(Snap.matrix(imgScale, 0, 0, imgScale, x, y)).attr({ opacity: '1' }).appendTo(animateG); //[400,275]
        mainImg.selectAll('.hiddenPath').forEach((pd, i) => {
            pathStr[i] = pd.attr('d');
        });

        const newPath = [];
        pathStr.forEach(function (el, i) {
            newPath[i] = Snap.path.map(el, Snap.matrix(imgScale, 0, 0, imgScale, x, y)).toString();
            // subG.path(newPath[i]).addClass('fno s04').attr('strokeWidth', 20);
        });
        //임시(삭제예정)
        newPath[4] = 'M521.55,441.3 C540,460 540,450 650,450';

        if (animation.elements) {
            animation.elements.forEach(el => {
                if (!Array.isArray(el)) el = [el];
                el.forEach(el2 => {
                    createElement({
                        type: el2.type,
                        canvas: animateG,
                        meta: el2.meta
                    });
                });
            });
        }

        moveImg = image({
            canvas: animateG,
            x: 0,
            y: 0,
            img: {
                url: animation.moveImage.url,
                scale: animation.moveImage.scale
                // ...info
            }
            // center: true
        }).attr({ opacity: '0' });

        animate = newPath.map(
            el =>
                new K_simpleAnimate2({
                    canvas: animateG,
                    pathStr: el,
                    pathAttr: animation.pathAttr,
                    moving: function (p2) {
                        const bbox = moveImg.getBBox();
                        moveImg
                            .transform('t' + [p2.x - bbox.w / 2, p2.y - bbox.h / 2])
                            .attr({ opacity: '1' })
                            .appendTo(animateG);
                    },
                    callback: anicall
                })
        );
    }

    convertModal = new com_pageConvert({
        g: tempG,
        appendG: g1,
        // visible: question.visible,
        visible: convertVisible, // 210909
        time: 800,
        guideLine: false, // 좌표선 삭제
        howlerStop: false,
        startCallback: function () {
            readingGroup.stop();
            howlerStop();
            start();
        }
    });

    //문제 시작 함수
    function start() {
        setTimeout(function () {
            if (questionStart) {
                questionStart = false;
                animate[0].start();
            }
        }, 300);
    }

    //마지막
    function last() {
        setTimeout(function () {
            ttsG.attr('pointerEvents', 'none');
            callback();
        }, 300);
    }

    //애니메이션 콜백
    function anicall() {
        if (qCount < choiceStep.length) {
            choiceQ[qCount].attr('opacity', 1);
            choiceStep[qCount].start();
        } else {
            last();
        }
    }

    //모든 지시문 tts만 초기화
    function howlerStop() {
        if (ttsObj.tts.data('voice')) ttsObj.tts.data('voice').stop();
        if (qTTsObj.tts.data('voice')) qTTsObj.tts.data('voice').stop();
    }
    function choiceAuto() {
        //스피커 누름
        isfirst = false; // 210909
        convertModal.start();
    }

    //시작
    if (convertVisible) choiceAuto();
    readingGroup.start();

    function K_simpleAnimate2({ canvas, pathStr, pathAttr, time, easing = mina.linear, moving, callback }) {
        pathAttr = {
            class: 'fno s' + pathAttr.stroke || 'fno s04',
            strokeWidth: pathAttr.strokeWidth || 10,
            strokeLinejoin: 'miter',
            strokeLinecap: 'butt', //butt, round, square
            pointerEvents: 'none',
            ...pathAttr
        };
        const g = canvas.addClass('K1-simple-anim').g();
        const totalLength = Snap.path.getTotalLength(pathStr);
        const myPath = g.path('').attr(pathAttr);
        const animateTime = typeof time === 'number' ? time : totalLength * 5;

        //start
        this.start = function () {
            canvas.attr('pointer-events', 'none');
            setTimeout(function () {
                Snap.animate(
                    0,
                    1,
                    function (val) {
                        const point = Snap.path.getPointAtLength(pathStr, val * totalLength);
                        moving(point);
                        myPath.attr({
                            d: Snap.path.getSubpath(pathStr, 0, val * totalLength),
                            strokeWidth: pathAttr.strokeWidth
                            // opacity: 0.5
                        });
                    },
                    animateTime,
                    easing,
                    function () {
                        callback();
                    }
                );
            }, 300);
        };
        return this;
    }
};

export default KM000075;
