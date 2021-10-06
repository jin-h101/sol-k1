import Snap from 'sol-common/snap';
import mina from 'sol-common/snap/mina';
import { image } from 'sol-common';
import { directionText, createElement, tempGuideLine, stepChoice, loadMazeImg } from '../component';
// import { getClosestPathLength } from 'sol-common/util';

// 학습만화 모듈
const KM000068 = async function ({ canvas, direction, elements, lastFeedback, callback, choice, animation }) {
    // tempGuideLine(canvas.g()); // 좌표선 삭제
    const g = canvas.g();
    const ttsG = g.g();
    const backG = g.g();

    const subG = backG.g();
    const animateG = g.g();
    const choiceG = g.g();
    const secondG = g.g().attr('visibility', 'hidden');

    // 지시문
    if (direction) directionText({ canvas: ttsG, ...direction });

    //배경 존재 시 설정
    if (elements) {
        elements.forEach(el => {
            if (!Array.isArray(el)) el = [el];
            el.forEach(el2 => {
                createElement({
                    type: el2.type,
                    canvas: backG,
                    meta: el2.meta
                });
            });
        });
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

    let choiceEl = [];
    let choiceStep = [];
    let qCount = 0;
    if (choice) {
        choice.forEach((arr, j) => {
            const choiceGroup = choiceG.g();
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
                btnShadowClassNum: 'no', //'0006',
                btnRxy: 5,
                // howlerStop: false,
                // standardIndex: 10,
                inactiveAttr: {
                    classNum: '0028',
                    shapeFillClassNum: 14,
                    ...arr.inactiveAttr
                },
                // modal: 'convert',
                choiceCallback: function (i) {
                    choiceEl[j].forEach(function (el, k) {
                        if (k !== i) el.remove();
                    });
                },
                callback: function () {
                    qCount++;
                    animate[qCount].start();
                }
            });
            // choiceStep[j].show();
        });
    }

    function last() {
        setTimeout(function () {
            ttsG.attr('pointerEvents', 'none');
            // secondG.attr('visibility', 'visible');
            callback();
        }, 300);
    }

    const x = animation.mazeImage.x; //ani
    const y = animation.mazeImage.y;
    const imgScale = animation.mazeImage.scale; // 받을 메타
    const mainImg = loadMazeImg(animation.mazeImage.imgIndex);

    const pathStr = [];
    mainImg.use().transform(Snap.matrix(imgScale, 0, 0, imgScale, x, y)).attr({ opacity: '1' }).appendTo(subG); //[400,275]
    mainImg.selectAll('.hiddenPath').forEach((pd, i) => {
        pathStr[i] = pd.attr('d');
    });
    // subG.path(Snap.path.map(pathStr[0], Snap.matrix(imgScale, 0, 0, imgScale, x, y)).toString()).addClass('fno s02');
    // subG.path(Snap.path.map(pathStr[1], Snap.matrix(imgScale, 0, 0, imgScale, x, y)).toString()).addClass('fno s04');
    // subG.path(Snap.path.map(pathStr[2], Snap.matrix(imgScale, 0, 0, imgScale, x, y)).toString()).addClass('fno s27');
    // subG.path(Snap.path.map(pathStr[3], Snap.matrix(imgScale, 0, 0, imgScale, x, y)).toString()).addClass('fno s03');

    const newPath = [];
    pathStr.forEach(function (el, i) {
        newPath[i] = Snap.path.map(el, Snap.matrix(imgScale, 0, 0, imgScale, x, y)).toString();
        // subG.path(newPath[i]).addClass('fno s04').attr('strokeWidth', 20);
    });

    // const originPath =
    //     'M25.8-66.4c57,7.3,136.9-13.5,177.9-33.5c38.4-18.7,86.5-35.9,101.1-4.3c15.2,32.8-11.4,47.8-65.6,47.8c-42.4-0.1-76.5,15.2-87.8,44.6C138.5,21.4,122.4,27.9,49.4,6.3C-22.6-15-103.5,2.4-59.9,55c2.9,3.5,5.2,11.7-6.7,12s-73.5-9.7-76.2,33.3s72,51,130.5,28s120-34.5,146.9-8c24.7,24.4,11,56.3-20.1,62c-16.1,3-17,14.9-10,22.3c84.5,89.4,175.6-94.7,249.2,28.2';

    // const totalPath = Snap.path.map(originPath, Snap.matrix(1, 0, 0, 1, 200, 200)).toString();
    // const testPath = g.path(totalPath).attr({ stroke: 'blue', fill: 'none' });
    // const meta = [
    //     { x: 350, y: 200 },
    //     { x: 300, y: 300 }
    // ];
    // g.path(subPath).attr({ stroke: 'red', fill: 'none' });
    // const len = getClosestPathLength(testPath, { x: 350, y: 200 });

    // let startPoint = 0;
    // meta.forEach((el, i) => {
    //     const closetLen = getClosestPathLength(testPath, el);
    //     const subPath = Snap.path.getSubpath(totalPath, startPoint, closetLen);
    //     g.path(subPath).attr({ fill: 'none', stroke: ['red', 'green'][i] });
    //     console.log(subPath);
    //     startPoint = closetLen;
    // });
    // console.log(len);

    const moveImg = image({
        canvas: animateG,
        x: -10,
        y: -10,
        img: {
            url: animation.moveImage.url,
            scale: animation.moveImage.scale
            // ...info
        },
        center: true
    }).attr({ opacity: '0' });

    const animate = newPath.map(
        el =>
            new K_simpleAnimate2({
                canvas: animateG,
                pathStr: el,
                pathAttr: animation.pathAttr,
                moving: function (p2) {
                    moveImg
                        .transform('t' + [p2.x, p2.y])
                        .attr({ opacity: '1' })
                        .appendTo(animateG);
                },
                callback: _call
            })
    );

    animate[0].start();

    function _call() {
        if (qCount < choiceStep.length) {
            choiceStep[qCount].start();
        } else {
            last();
        }
    }

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

export default KM000068;
