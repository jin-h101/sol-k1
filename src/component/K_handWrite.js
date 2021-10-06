import Snap from 'sol-common/snap'
import {
    feedback,
    recognizeHandWrite,
    makeShadow,
    SOL,
} from "sol-common/util";
import {
    loadSound,
    hint,
} from "sol-common";

import K_pathGetString from "./K_pathGetString";
import {
    oneWordCombine,
} from "./K_word";

import {
    Howler
} from 'howler';
import {
    pathSmooth, classMatchingColor, numberDefault,
    // tempGuideLine
} from './com_util';
import {
    makeUndoButton,
    makeResetButton,
    makeOk
} from './K_button';
import {
    loadBtnSound
} from './com_sound';
import {
    loadPencilIcon
} from './com_image';
import { createElement } from './K_backgroundShape';

export const simpleHandWrite = function ({
    canvas,
    x,
    y,
    width,
    height,
    rXY = 20,
    drawClassNum = '0005',
    drawStrokeWidth = 10,
    boxFillClassNum = '111',
    boxStrokeClassNum = '01',
    boxOpacity = 1,
    boxStrokeWidth = 1,
    shadowDx = 3,
    shadowDy = 3,
    shadowBlur = 2,
    shadowOpacity = 0.3,
    shadowClassNum,
    direction = false,
    directionInfo,
    startPoint = false,
    wordHint = false,
    wordHintClassNum,
    wordHintOpacity,
    wordHintFs,
    wordHintShow = false,
    dotLine,
    dotLineClassNum,
    dotLineStrokeWidth,
    dotLineOpacity,
    okButton,
    undoButton,
    resetButton,
    answer,
    callback
}) {
    // tempGuideLine(canvas)
    const scale = 1
    okButton = {
        "type": 0,
        'cx': 755,
        'cy': 430,
        ...okButton
    };
    undoButton = {
        'x': x + width + 10 * scale,
        'y': y + height - (30 * 2 + 10) * scale,
        'scale': scale,
        ...undoButton
    };
    resetButton = {
        'x': x + width + 10 * scale,
        'y': y + height - 30 * scale,
        'scale': scale,
        ...resetButton
    };
    const backAttr = {
        'cx': x + width / 2,
        'cy': y + height / 2,
        'width': width,
        'height': height,
        'class': 'f' + boxFillClassNum + ' s' + boxStrokeClassNum,
        'opacity': boxOpacity,
        'strokeWidth':boxStrokeWidth,
        'r': rXY,
    };
    const pathAttr = {
        'class': 'fno s' + drawClassNum,
        'strokeWidth': drawStrokeWidth,
        'strokeLinecap': 'round',
        'strokeLinejoin': 'round',
    };
    const btnG = canvas.g().attr('opacity', 0);
    const g = canvas.g();
    const dotG = g.g();
    const directG = g.g();
    //배경 영역
    const background = canvas.g().rect(backAttr.cx-backAttr.width/2, backAttr.cy-backAttr.height/2, backAttr.width, backAttr.height, backAttr.r, backAttr.r).addClass(backAttr.class).attr({
        'opacity': backAttr.opacity,
        'strokeWidth': backAttr.strokeWidth,
    }).prependTo(canvas);
    if(shadowClassNum){
        const btnShadow = makeShadow({
            'dx': numberDefault(shadowDx, 3),
            'dy': numberDefault(shadowDy, 3),
            'blur': numberDefault(shadowBlur, 2),
            'color': classMatchingColor(shadowClassNum),
            'opacity': shadowOpacity || 0.3,
            'g': SOL.SVG
        });
        background.attr('filter', btnShadow);
    }
    
    let penImg;
    let wordHintEl;

    if (dotLine) {
        const className = 'fno s' + (dotLineClassNum || '01') //옵션
        const strokeWidth = dotLineStrokeWidth || 1.5 //옵션
        const opacity = dotLineOpacity || 0.4 //옵션
        dotG.line(width / 2, 0, width / 2, 0 + height).addClass(className).attr({
            'strokeWidth': strokeWidth,
            'strokeDasharray': '5 5',
            'opacity': opacity
        })
        dotG.line(0, height / 2, 0 + width, height / 2).addClass(className).attr({
            'strokeWidth': strokeWidth,
            'strokeDasharray': '5 5',
            'opacity': opacity
        })
    }
    if (direction) {
        const cx = (directionInfo && directionInfo.gapX) || (0 + width) / 2;
        const cy = (directionInfo && directionInfo.gapY) || (0 + 25);
        const t = (directionInfo && directionInfo.t) || '이곳에 또박또박 써 보세요.'
        const fs = (directionInfo && directionInfo.fs) || 15;
        const clssName = 'ffng f' + (directionInfo && directionInfo.classNum || '01');
        if (dotLine) { // 문구가 가려지는 것 방지
            const fakeRcolor = (boxFillClassNum && boxFillClassNum !== 'no') ? boxFillClassNum : 'bg'
            directG.rect(cx, cy, width - 10, fs + 2).addClass('f' + fakeRcolor + ' sno').center()
        }
        directG.text(cx, cy, t).addClass(clssName).attr({ // 자동 위치변환 y :(y + fs * 3 / 2)
            'fontSize': fs,
            'opacity': 0.5,
            'fontWeight': 'bold'
        }).center();
    }
    if (wordHint) {
        const cx = width / 2
        const cy = height / 2
        const className = 'ffng f' + (wordHintClassNum || '91') //옵션
        const opacity = wordHintOpacity || 0.3 //옵션
        const fs = wordHintFs || (height * 0.7) //옵션
        wordHintEl = g.text(cx, cy, answer).addClass(className + ' wordHint').attr({
            'opacity': 0,
            'fontSize': fs
        }).center().data('opacity',opacity);
    }
    if (startPoint) {
        const penIcons = loadPencilIcon();
        const isUpIcon = startPoint.type && startPoint.type === 1;
        const icon = isUpIcon ? penIcons[2] : penIcons[3];
        penImg = icon.use()
            .transform('t' + [startPoint.x, startPoint.y])
            .appendTo(canvas)
            .attr('opacity', 0);
    }

    g.transform('t' + [x, y]);


    let pathArr = [];
    let visiblePath = [];
    let handWriteML

    //ok버튼
    const okBtnG = btnG.g();
    const ok = new makeOk({
        'canvas': okBtnG,
        'type': 0,
        'cx': okButton.cx,
        'cy': okButton.cy,
        'scale': okButton.scale,
        'visibility': true,
        'event': false,
        'callback': check //정답체크
    })

    //undo 버튼
    const undoBtn = makeUndoButton({
        'g': btnG,
        'xy': [undoButton.x, undoButton.y],
        'scale': undoButton.scale,
        'pressCallback': function () {},
        'callback': function () {
            // path 정보 끝에서 한 개만 삭제
            pathArr.pop();
            visiblePath[visiblePath.length - 1].remove();
            visiblePath.pop();
            if (pathArr.length === 0) {
                btnAction('none');
                if (startPoint) penImg.attr('opacity', 1);
                if (direction) directG.attr('opacity', 1)
            } //path가 없으면 버튼 비활성
            makePad(pathArr, visiblePath); //패드 재 생성
        }
    })

    //reset 버튼
    const resetBtn = makeResetButton({
        'g': btnG,
        'xy': [resetButton.x, resetButton.y],
        'scale': resetButton.scale,
        'pressCallback': function () {},
        'callback': function () {
            reset(); //path 정보 초기화
            btnAction('none'); //버튼 비활성
            makePad(pathArr, visiblePath); //패드 재 생성
        }
    })


    //시작
    this.g = canvas;
    this.okBtn = ok;
    this.start = function () {
        btnG.attr('opacity', 1)
        okBtnG.attr('opacity', 1); //210914
        if (wordHint) wordHintEl.attr('opacity', wordHintEl.data('opacity'));
        if (startPoint) penImg.attr('opacity', 1);
        makePad(pathArr, visiblePath);
    }
    this.show = function () {
        btnG.attr('opacity', 1);
        okBtnG.attr('opacity', 0); //210914
        if (wordHint && wordHintShow) wordHintEl.attr('opacity', wordHintEl.data('opacity'));
        if (startPoint) penImg.attr('opacity', 1)
    }
    this.btnKill = function (){
        btnG.remove();
    }

    function makePad(pathStr, visibleP) {
        if (handWriteML) handWriteML.remove(); //패드 존재 시 삭제
        //새로운 패드 생성
        handWriteML = new K_pathGetString({
            'area': [x, y, x + width, y + height],
            'pathAttr': pathAttr,
            startCheck: function (e) {
                if (startPoint) penImg.attr('opacity', 0)
                if (direction) directG.attr('opacity', 0)

            },
            callback: function (path, pathG) {
                // console.log('hw', path);
                //현재 path 정보 (21.06.30 수정)
                const newPathG = canvas.path(pathSmooth(path, 10)).attr(pathAttr)
                visibleP.push(newPathG) // 보여지는 path
                //기존
                // pathG.appendTo(canvas); // path 위치 옮기기
                // visibleP.push(pathG)
                pathStr.push(path[0]); // 정답체크에 쓰일 원본 path
                btnAction('auto') //버튼 활성
                makePad(pathStr, visibleP); //패드 재 생성
            }
        });
    }

    function reset() {
        pathArr = [];
        visiblePath.forEach(el => el.remove())
        visiblePath = [];
        if (startPoint) penImg.attr('opacity', 1)
        if (direction) directG.attr('opacity', 1)
    }

    function btnAction(type) {
        if (type === 'auto') {
            ok.start();
        } else if (type === 'none') {
            setTimeout(ok.stop,300);
        }
        undoBtn.attr('pointerEvents', type);
        resetBtn.attr('pointerEvents', type);
    }

    async function check() {
        handWriteML.attr('pointerEvents', 'none'); //pad 비활성
        btnAction('none'); //버튼 비활성
        const result = await recognizeHandWrite(pathArr || '', 'ko_KR');
        console.warn('직접 쓴 결과 :',result, ' / ',' 정답 :', answer);
        const bool = result === answer;
        feedback({
            canvas: canvas,
            el: background,
            bool: bool,
            scale: 1,
            onRemove: function () {
                if (bool) {
                    visiblePath.forEach(el => el.attr('pointerEvents', 'none'))
                    handWriteML.remove() // pad 삭제
                    btnG.attr('pointerEvents', 'none')
                    callback(pathArr)
                } else {
                    reset(); //path 정보 초기화
                    makePad(pathArr, visiblePath); //패드 재 생성
                }
            }
        });
    }

    return this;
}



export const nTimesHandWrite = function ({
    canvas,
    text,
    handWriteInfo,
    okButton,
    callback
}) {
    const totalG = canvas.g();
    const btnG = totalG.g().attr('opacity', 0);
    const g = totalG.g().attr('opacity', 0);
    const background=[];

    const basicValue = [];
    const pathArr = [];
    const visiblePath = [];
    const handWriteML = [];
    const penImg = [];
    const startPoint = [];
    const pathAttr = []
    const undoBtn = [];
    const resetBtn = [];
    let makeHwCount = 0; //실제 핸드라이트의 인덱스를 잡기 위한 숫자
    let hwCount = 0; // 핸드라이트 진행 시 현재 count
    const answer = [];
    const direction = [];
    const directG = [];
    //ok버튼
    const ok = new makeOk({
        'canvas': btnG,
        'type': 0,
        'cx': okButton.cx,
        'cy': okButton.cy,
        'scale': okButton.scale,
        'visibility': true,
        'event': false,
        'callback': check //정답체크
    })

    handWriteInfo.forEach((handWrite, i) => {
        if (!handWrite.isHandWrite) {
            handWrite.wordHint = true;
            handWrite.wordHintOpacity = 1;
        }
        const subG = g.g();
        const dotG = subG.g();
        directG[i] = subG.g();
        const backAttr = {
            'cx': handWrite.x + handWrite.width / 2,
            'cy': handWrite.y + handWrite.height / 2,
            'width': handWrite.width,
            'height': handWrite.height,
            'class': 'f' + (handWrite.boxFillClassNum || '111') + ' s' + (handWrite.boxStrokeClassNum || '01'),
            'opacity': handWrite.boxOpacity || 0.3,
            'strokeWidth':handWrite.boxStrokeWidth || 1,
            'r': handWrite.rXY || 20,
            ...handWrite.backAttr
        }

        const wordHint = handWrite.wordHint;

        //배경 영역
        background[i] = subG.rect(backAttr.cx - backAttr.width/2, backAttr.cy - backAttr.height/2, backAttr.width, backAttr.height, backAttr.r, backAttr.r).addClass(backAttr.class).attr({
            'opacity': backAttr.opacity,
            'strokeWidth': backAttr.strokeWidth,
        }).prependTo(canvas);
        if(handWrite.shadowClassNum){
            const btnShadow = makeShadow({
                'dx': numberDefault(handWrite.shadowDx, 3),
                'dy': numberDefault(handWrite.shadowDy, 3),
                'blur': numberDefault(handWrite.shadowBlur, 2),
                'color': classMatchingColor(handWrite.shadowClassNum),
                'opacity': handWrite.shadowOpacity || 0.3,
                'g': SOL.SVG
            });
            background[i].attr('filter', btnShadow);
        }
        //글자 힌트
        if (wordHint) {
            const cx = handWrite.isHandWrite ? backAttr.width / 2 : backAttr.cx
            const cy = handWrite.isHandWrite ? backAttr.height / 2 : backAttr.cy
            const className = 'ffng f' + (handWrite.wordHintClassNum || '91') //옵션
            const opacity = handWrite.wordHintOpacity || 0.3 //옵션
            const fs = handWrite.wordHintFs || (basicValue[i].height * 0.7) //옵션
            subG.text(cx, cy, text[i]).addClass(className).attr({
                'opacity': opacity,
                'fontSize': fs
            }).center()
        }

        if (handWrite.isHandWrite) {
            const subBtnG = btnG.g();
            const undoS = (handWrite.undoButton && handWrite.undoButton.scale) || 1
            const resetS = (handWrite.resetButton && handWrite.resetButton.scale) || 1
            answer[makeHwCount] = text[i];
            basicValue[makeHwCount] = {
                'x': handWrite.x,
                'y': handWrite.y,
                'width': handWrite.width,
                'height': handWrite.height,
                'rXY': handWrite.rXY || 20,
            }
            startPoint.push(handWrite.startPoint);

            direction[i] = handWrite.direction;
            const directionInfo = {
                'fs': 15,
                'className': 'ffng f0017',
                ...handWrite.directionInfo
            };
            const dotLine = handWrite.dotLine;
            const undoButton = {
                'x': handWrite.x + handWrite.width - 30 * undoS * 2,
                'y': handWrite.y + handWrite.height + 10 * undoS,
                'scale': undoS,
                ...handWrite.undoButton //옵션
            };
            const resetButton = {
                'x': handWrite.x + handWrite.width - 30 * resetS,
                'y': handWrite.y + handWrite.height + 10 * resetS,
                'scale': resetS,
                ...handWrite.resetButton //옵션
            }
            pathAttr[makeHwCount] = {
                'class': 'fno s' + (handWrite.drawClassNum || '0005'),
                'strokeWidth': handWrite.drawStrokeWidth || 10,
                'strokeLinecap': 'round',
                'strokeLinejoin': 'round'
            }
            pathArr.push([]);
            visiblePath.push([]);
            // 안내문
            if (direction[i]) {
                const cx = directionInfo.gapX || (0 + basicValue[makeHwCount].width) / 2;
                const cy = directionInfo.gapY || (0 + 25);
                const t = directionInfo.t || '이곳에 또박또박 써 보세요.'
                const fs = directionInfo.fs;
                if (dotLine) { // 문구가 가려지는 것 방지
                    const fakeRcolor = (handWrite.boxFillClassNum && handWrite.boxFillClassNum !== 'no') ? handWrite.boxFillClassNum : 'bg'
                    directG[i].rect(cx, cy, handWrite.width - 10, fs).addClass('f' + fakeRcolor + ' sno').center()
                }
                directG[i].text(cx, cy, t).addClass(directionInfo.className).attr({
                    'fontSize': fs,
                    'opacity': 0.5,
                    'fontWeight': 'bold'
                }).center();
            }
            //보조선
            if (dotLine) {
                const className = 'fno s' + (handWrite.dotLineClassNum || '01') //옵션
                const strokeWidth = handWrite.dotLineStrokeWidth || 1.5 //옵션
                const opacity = handWrite.dotLineOpacity || 0.4 //옵션
                dotG.line(basicValue[makeHwCount].width / 2, 0, basicValue[makeHwCount].width / 2, 0 + basicValue[makeHwCount].height).addClass(className).attr({
                    'strokeWidth': strokeWidth,
                    'strokeDasharray': '5 5',
                    'opacity': opacity
                })
                dotG.line(0, basicValue[makeHwCount].height / 2, 0 + basicValue[makeHwCount].width, basicValue[makeHwCount].height / 2).addClass(className).attr({
                    'strokeWidth': strokeWidth,
                    'strokeDasharray': '5 5',
                    'opacity': opacity
                })
            }
            //쓰기 시작 지점 표시
            if (startPoint[makeHwCount]) {
                const penIcons = loadPencilIcon();
                const isUpIcon = startPoint[makeHwCount].type && startPoint[makeHwCount].type === 1;
                const icon = isUpIcon ? penIcons[2] : penIcons[3];
                penImg[makeHwCount] = icon.use()
                    .transform('t' + [startPoint[makeHwCount].x, startPoint[makeHwCount].y])
                    .appendTo(canvas)
                    .attr('opacity', 0);
            }

            subG.transform('t' + [basicValue[makeHwCount].x, basicValue[makeHwCount].y]); // 외부적인 요소들 정렬

            //undo 버튼
            undoBtn[makeHwCount] = makeUndoButton({
                'g': subBtnG,
                'xy': [undoButton.x, undoButton.y],
                'scale': undoButton.scale,
                'data': makeHwCount,
                'pressCallback': function () {},
                'callback': function (index) {
                    console.log('undo', index);
                    undoAction(index);
                }
            })

            //reset 버튼
            resetBtn[makeHwCount] = makeResetButton({
                'g': subBtnG,
                'xy': [resetButton.x, resetButton.y],
                'scale': resetButton.scale,
                'data': makeHwCount,
                'pressCallback': function () {},
                'callback': function (index) {
                    console.log('reset', index);
                    resetAction(index); //path 정보 초기화
                    makePad(index); //패드 재 생성
                }
            })
            makeHwCount++;
        }
    });




    //쓰이는 함수들 .... ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function undoAction(index) {
        console.log(pathArr, visiblePath);
        //path 정보 끝에서 한 개만 삭제
        pathArr[index].pop();
        visiblePath[index][visiblePath[index].length - 1].remove();
        visiblePath[index].pop();

        if (pathArr[index].length === 0) {
            btnAction('none', index);
            if (startPoint[index]) penImg[index].attr('opacity', 1);
            if (direction[index]) directG[index].attr('opacity', 1)
        } //path가 없으면 버튼 비활성
        makePad(index); //패드 재 생성
    }

    function resetAction(index) {
        console.log(pathArr, visiblePath);
        pathArr[index] = [];
        visiblePath[index].forEach(el => el.remove())
        visiblePath[index] = [];
        btnAction('none', index); //버튼 비활성
        if (startPoint[index]) penImg[index].attr('opacity', 1)
        if (direction[index]) directG[index].attr('opacity', 1)
    }

    function btnAction(type, i) {
            undoBtn[i].attr('pointerEvents', type);
            resetBtn[i].attr('pointerEvents', type);
            if(pathArr[hwCount].length!==0) ok.start()
            else ok.stop()
    }

    function makePad(i) {
        if (handWriteML[i]) handWriteML[i].remove(); //패드 존재 시 삭제
        //새로운 패드 생성
        handWriteML[i] = new K_pathGetString({
            'area': [
                basicValue[i].x,
                basicValue[i].y,
                basicValue[i].x + basicValue[i].width,
                basicValue[i].y + basicValue[i].height
            ],
            'rXY': basicValue[i].rXY,
            'pathAttr': pathAttr[i],
            startCheck: function (e) {
                if (startPoint[i]) penImg[i].attr('opacity', 0)
                if (direction[i]) directG[i].attr('opacity', 0)
            },
            callback: function (path, pathG) {
                const newPathG = totalG.path(pathSmooth(path, 10)).attr(pathAttr[i])
                visiblePath[i].push(newPathG) // 보여지는 path
                // pathG.appendTo(totalG);
                // visiblePath[i].push(pathG)
                pathArr[i].push(path[0]); // 정답체크에 쓰일 원본 path

                btnAction('auto', i) //버튼 활성
                makePad(i); //패드 재 생성
            }
        });
    }

    async function check() {
        handWriteML[hwCount].attr('pointerEvents', 'none');
        btnAction('none',hwCount);
        ok.stop();
        const result = await recognizeHandWrite(pathArr[hwCount] || '', 'ko_KR');
        const bool = result === answer[hwCount];
        feedback({
            canvas: canvas,
            el: background[hwCount],
            bool: bool,
            scale: 1,
            onRemove: function () {
                if (bool) {
                    visiblePath[hwCount].forEach(e => {
                        e.attr('pointerEvents', 'none')
                    });
                    handWriteML[hwCount].remove();
                    console.log('정답');
                    if(hwCount < pathArr.length-1){
                        hwCount++;
                        start()
                    }else{
                        callback(pathArr)
                    }
                    
                } else {
                    console.log('오답시 ', hwCount);
                    resetAction(hwCount); //path 정보 초기화
                    makePad(hwCount); //패드 재 생성
                }
            }
        });
        // handWriteML.forEach(el => el.attr('pointerEvents', 'none')); //pad 비활성
        // btnAction('none', 'all'); //버튼 비활성
        // const boolArr = []
        // for (let a = 0; a < pathArr.length; a++) {
        //     const result = await recognizeHandWrite(pathArr[a] || '', 'ko_KR');
        //     console.log('user 답 : ', result, '실제 답 : ', answer[a]);
        //     boolArr[a] = result === answer[a]
        // }
        // feedback({
        //     canvas: canvas,
        //     el: background,
        //     bool: boolArr.every(el => el),
        //     scale: 1,
        //     onRemove: function () {
        //         if (boolArr.every(el => el)) {
        //             visiblePath.forEach(el => {
        //                 el.forEach(e => {
        //                     e.attr('pointerEvents', 'none')
        //                 });
        //             });
        //             handWriteML.forEach(hw => {
        //                 hw.remove() // pad 삭제
        //             })
        //             btnG.attr('pointerEvents', 'none')
        //             console.log('둘다 정답');
        //             callback(pathArr)
        //         } else {
        //             boolArr.forEach((bool, i) => {
        //                 if (bool) {
        //                     console.log('혼자 정답이다 ', i);
        //                 } else {
        //                     console.log('오답시 ', i);
        //                     resetAction(i); //path 정보 초기화
        //                     makePad(i); //패드 재 생성
        //                 }
        //             })
        //         }
        //     }
        // });
    }
    function start(){
        show();
        makePad(hwCount);
    }

    // 보여주기 함수
    function show() {
        g.attr('opacity', 1)
        btnG.attr('opacity', 1)
        if (startPoint.length !== 0) {
            for (let y = 0; y < startPoint.length; y++) {
                if (startPoint[y]) penImg[y].attr('opacity', 1)
            }
        }
    }



    //시작
    this.start = function () {
        start();
        // show();
        // pathArr.forEach((e, i) => makePad(i));
    }

    this.show = function () {
        show();
    }

    this.remove = function () {
        totalG.remove();
    }

    return this;
}


export const popUpHandWrite = function ({
    canvas,
    popUpSize,
    popUpFillColor = '0031',
    popUpStrokeColor = 'no',
    touchBBox,
    touchBoxVisible = true,
    wordArr,
    equationValue,
    handWriteValue,
    soundFeedback,
    midCallback,
    isHint = true,
    callback
}) {
    const voice = soundFeedback ? loadSound(soundFeedback.url) : undefined;
    const g = canvas.g().attr('visibility', 'hidden');
    const touchG = canvas.g().attr({
        'visibility': 'hidden',
        'pointerEvents': 'none',
    })
    const whiteBackG = g.g();
    const blockG = canvas.g().attr({'opacity':0.5,'visibility': 'hidden'});
    const mainG = canvas.g().attr('visibility', 'hidden');
    const grayBackG = mainG.g();
    const contentsG = mainG.g();
    let myHint;
    popUpSize = {
        'x': 75,
        'y': 94,
        'w': (popUpSize && popUpSize.width) || 650,
        'h': (popUpSize && popUpSize.height) || 366,
        'rXY': 10,
        ...popUpSize
    }
    const touchR = (touchBBox.r || 0)
    const touchRect = touchG.rect(touchBBox.x, touchBBox.y, touchBBox.w, touchBBox.h, touchR, touchR).addClass('f14 s02').attr({
        'strokeWidth': 3
    })
    blockG.rect(0,0,800,500).addClass('f01 sno');
    const whiteRect = whiteBackG.rect(popUpSize.x, popUpSize.y, popUpSize.w, popUpSize.h, popUpSize.w/2, popUpSize.h/2).addClass('f14 sno'); //처음에 원처럼 만들기

    if (!touchBoxVisible) {
        touchRect.attr('opacity', 0);
        whiteRect.attr('opacity', 0)
    }

    grayBackG.rect(popUpSize.x, popUpSize.y, popUpSize.w, popUpSize.h, popUpSize.rXY, popUpSize.rXY).addClass('f' + popUpFillColor + ' s' + popUpStrokeColor).attr({
        'opacity': 1
    })
    const ans = oneWordCombine(wordArr);
    // const wordPathImage = wordMatchPath(ans, pathList).pathImg;
    //식 만들기
    if(equationValue.imageInfo){
        createElement({
            "type": 'image',
            "canvas": contentsG,
            "meta": {
                'scale':1, 
                ...equationValue.imageInfo
            }
        });
    }
    if(equationValue.wordInfo){
        equationValue.wordInfo.forEach((meta,t)=>{
            const wordG = contentsG.g()
            // const wordScale = meta.scale || 1
            const color = meta.classNum || '0003';
            // if (wordPathImage.length <= 2) { // -> 임시로 패스 없는경우 텍스트로 찍도록 수정
                wordG.text(meta.cx, meta.cy, wordArr[t]).addClass('ffng f'+color).attr({
                    'fontSize': meta.fontSize || 65,
                    'fontWeight': meta.bold || meta.bold===undefined ? 'bold' : 'normal'
                }).center();
            // } else if (wordPathImage.length === 3) {
            //     wordPathImage.forEach((pathD, p) => {
            //         const sG = wordG.g();
            //         pathD.forEach(pD => {
            //             if ((t === 0 && p < 2) || (t === 1 && p === 2)){
            //                 sG.path(pD).addClass('f'+color+' sno');
            //             }
            //         })
            //     });
            //     const bbox = wordG.getBBox();
            //     wordG.transform(Snap.matrix(wordScale,0,0,wordScale, - bbox.cx + + meta.cx,  - bbox.cy + meta.cy));
            // }
        })
    }

    const hw = new simpleHandWrite({
        'canvas': contentsG,
        'x': handWriteValue.x,
        'y': handWriteValue.y,
        'width': handWriteValue.width,
        'height': handWriteValue.height,
        'rXY': handWriteValue.rXY || 10,
        'drawClassNum': handWriteValue.drawClassNum || '0005',
        'drawStrokeWidth': handWriteValue.drawStrokeWidth,
        'boxFillClassNum': handWriteValue.boxFillClassNum || '0039',
        'boxStrokeClassNum': handWriteValue.boxStrokeClassNum || 'no',
        'boxOpacity': handWriteValue.boxOpacity || 1,
        'boxStrokeWidth': handWriteValue.boxStrokeWidth,
        'shadowDx': handWriteValue.shadowDx,
        'shadowDy': handWriteValue.shadowDy,
        'shadowBlur': handWriteValue.shadowBlur,
        'shadowOpacity': handWriteValue.shadowOpacity,
        'shadowClassNum': handWriteValue.shadowClassNum,
        'direction': handWriteValue.direction || true,
        'directionInfo': handWriteValue.directionInfo,
        'startPoint': handWriteValue.startPoint,
        'wordHint': handWriteValue.wordHint,
        'wordHintClassNum': handWriteValue.wordHintClassNum,
        'wordHintOpacity': handWriteValue.wordHintOpacity,
        'wordHintFs': handWriteValue.wordHintFs,
        'dotLine': handWriteValue.dotLine || true,
        'dotLineClassNum': handWriteValue.dotLineClassNum,
        'dotLineStrokeWidth': handWriteValue.dotLineStrokeWidth,
        'dotLineOpacity': handWriteValue.dotLineOpacity,
        'okButton': {
            'cx':662,
            'cy':392,
            ...handWriteValue.okButton
        },
        'undoButton': {
            'x': handWriteValue.x + handWriteValue.width + 20,
            'y': handWriteValue.y + 5,
            ...handWriteValue.undoButton
        },
        'resetButton': {
            'x': handWriteValue.x + handWriteValue.width + 20,
            'y': handWriteValue.y + 5 + (30 + 10),
            ...handWriteValue.resetButton
        },
        'answer': ans,
        callback: function (pathArr) {
            const pathData = pathArr;
            if (midCallback) midCallback();
            Howler.stop();
            if (voice) {
                voice.play();
                voice.once('end', function () {
                    writeEnd(pathData);
                });
            } else {
                writeEnd(pathData);
            }
        }
    });
    hw.show();
    g.transform(Snap.matrix(touchBBox.w / popUpSize.w, 0, 0, touchBBox.h / popUpSize.h, touchBBox.x- (popUpSize.x * touchBBox.w / popUpSize.w), touchBBox.y - (popUpSize.y * touchBBox.h / popUpSize.h)));

    function writeEnd(pathData) {
        console.log('end');
        whiteRect.removeClass('f14 sno').addClass('f14 s01')
        blockG.attr('visibility', 'hidden')
        mainG.attr('visibility', 'hidden')
        g.animate({
            'transform': Snap.matrix(touchBBox.w / popUpSize.w, 0, 0, touchBBox.h / popUpSize.h, touchBBox.x - (popUpSize.x * touchBBox.w / popUpSize.w), touchBBox.y - (popUpSize.y * touchBBox.h / popUpSize.h))
        }, 500, function () {
            whiteRect.removeClass('f14 s01').addClass('fno sno')
            callback(ans, pathData);
        })
    }



    touchG.touchOrClick(function () {
        if (myHint) myHint.removeHint();
        loadBtnSound(0).play();
        this.untouchOrClick();
        this.attr({
            'opacity': 0
        });
        if (!touchBoxVisible) whiteRect.attr('opacity', 1);
        whiteRect.removeClass('f14 sno').addClass('f14 s01').attr({
            'strokeWidth': 1
        })
        whiteRect.attr('rx',0);
        whiteRect.attr('ry',0);
        g.animate({
            'transform': g.transform.local + Snap.matrix(touchBBox.w / touchBBox.w, 0, 0, touchBBox.h / touchBBox.h, 0, 0)
        }, 500, function () {
            whiteRect.removeClass('f14 s01').addClass('f14 sno')
            blockG.attr('visibility', 'visible')
            mainG.attr('visibility', 'visible')
            hw.start();
        })
    })

    function makeHint(g, xy) {
        const h = new hint({
            'canvas': g,
            'scale': 1,
            'type': 0,
            'XY': xy
        });
        return h
    }
    this.g = g;
    this.start = function () {
        g.attr({
            'visibility': 'visible'
        });
        touchG.attr({
            'pointerEvents': 'auto',
            'visibility': 'visible'
        })
        if (isHint) myHint = makeHint(touchG, [touchG.getTBox().cx, touchG.getTBox().cy]);
    }

    return this;
}




export const noOrder_nTimesHandWrite = function ({
    canvas,
    text,
    handWriteInfo,
    okButton,
    callback
}) {
    const totalG = canvas.g();
    const btnG = totalG.g().attr('opacity', 0);
    const g = totalG.g().attr('opacity', 0);
    let background;

    const basicValue = [];
    const pathArr = [];
    const visiblePath = [];
    const handWriteML = [];
    const penImg = [];
    const startPoint = [];
    const pathAttr = []
    const undoBtn = [];
    const resetBtn = [];
    let makeHwCount = 0; //실제 핸드라이트 되는 카운트
    const answer = [];
    const direction = [];
    const directG = [];
    //ok버튼
    const ok = new makeOk({
        'canvas': btnG,
        'type': 0,
        'cx': okButton.cx,
        'cy': okButton.cy,
        'scale': okButton.scale,
        'visibility': true,
        'event': false,
        'callback': check //정답체크
    })

    handWriteInfo.forEach((handWrite, i) => {
        if (!handWrite.isHandWrite) {
            handWrite.wordHint = true;
            handWrite.wordHintOpacity = 1;
        }
        const subG = g.g();
        const dotG = subG.g();
        directG[i] = subG.g();
        const backAttr = {
            'cx': handWrite.x + handWrite.width / 2,
            'cy': handWrite.y + handWrite.height / 2,
            'width': handWrite.width,
            'height': handWrite.height,
            'class': 'f' + (handWrite.boxFillClassNum || '111') + ' s' + (handWrite.boxStrokeClassNum || '01'),
            'opacity': handWrite.boxOpacity || 0.3,
            'strokeWidth': handWrite.strokeWidth || 1,
            'r': handWrite.rXY || 20,
            ...handWrite.backAttr
        }

        const wordHint = handWrite.wordHint;

        //배경 영역
        background = subG.rect(backAttr.cx - backAttr.width/2, backAttr.cy - backAttr.height/2, backAttr.width, backAttr.height, backAttr.r, backAttr.r).addClass(backAttr.class).attr({
            'opacity': backAttr.opacity,
            'strokeWidth': backAttr.strokeWidth,
        }).prependTo(canvas);
        if(handWrite.shadowClassNum){
            const btnShadow = makeShadow({
                'dx': numberDefault(handWrite.shadowDx, 3),
                'dy': numberDefault(handWrite.shadowDy, 3),
                'blur': numberDefault(handWrite.shadowBlur, 2),
                'color': classMatchingColor(handWrite.shadowClassNum),
                'opacity': handWrite.shadowOpacity || 0.3,
                'g': SOL.SVG
            });
            background.attr('filter', btnShadow);
        }
        //글자 힌트
        if (wordHint) {
            const cx = handWrite.isHandWrite ? backAttr.width / 2 : backAttr.cx
            const cy = handWrite.isHandWrite ? backAttr.height / 2 : backAttr.cy
            const className = 'ffng f' + (handWrite.wordHintClassNum || '91') //옵션
            const opacity = handWrite.wordHintOpacity || 0.3 //옵션
            const fs = handWrite.wordHintFs || (basicValue[i].height * 0.7) //옵션
            subG.text(cx, cy, text[i]).addClass(className).attr({
                'opacity': opacity,
                'fontSize': fs
            }).center()
        }

        if (handWrite.isHandWrite) {
            const subBtnG = btnG.g();
            const undoS = (handWrite.undoButton && handWrite.undoButton.scale) || 1
            const resetS = (handWrite.resetButton && handWrite.resetButton.scale) || 1
            answer[makeHwCount] = text[i];
            basicValue[makeHwCount] = {
                'x': handWrite.x,
                'y': handWrite.y,
                'width': handWrite.width,
                'height': handWrite.height,
                'rXY': handWrite.rXY || 20,
            }
            startPoint.push(handWrite.startPoint);

            direction[i] = handWrite.direction;
            const directionInfo = {
                'fs': 15,
                'className': 'ffng f0017',
                ...handWrite.directionInfo
            };
            const dotLine = handWrite.dotLine;
            const undoButton = {
                'x': handWrite.x + handWrite.width - 30 * undoS * 2,
                'y': handWrite.y + handWrite.height + 10 * undoS,
                'scale': undoS,
                ...handWrite.undoButton //옵션
            };
            const resetButton = {
                'x': handWrite.x + handWrite.width - 30 * resetS,
                'y': handWrite.y + handWrite.height + 10 * resetS,
                'scale': resetS,
                ...handWrite.resetButton //옵션
            }
            pathAttr[makeHwCount] = {
                'class': 'fno s' + handWrite.drawClassNum || '001',
                'strokeWidth': handWrite.drawStrokeWidth || 10,
                'strokeLinecap': 'round',
                'strokeLinejoin': 'round'
            }
            pathArr.push([]);
            visiblePath.push([]);
            // 안내문
            if (direction[i]) {
                const cx = directionInfo.gapX || (0 + basicValue[makeHwCount].width) / 2;
                const cy = directionInfo.gapY || (0 + 25);
                const t = directionInfo.t || '이곳에 또박또박 써 보세요.'
                const fs = directionInfo.fs;
                if (dotLine) { // 문구가 가려지는 것 방지
                    const fakeRcolor = (handWrite.boxFillClassNum && handWrite.boxFillClassNum !== 'no') ? handWrite.boxFillClassNum : 'bg'
                    directG[i].rect(cx, cy, handWrite.width - 10, fs).addClass('f' + fakeRcolor + ' sno').center()
                }
                directG[i].text(cx, cy, t).addClass(directionInfo.className).attr({
                    'fontSize': fs,
                    'opacity': 0.5,
                    'fontWeight': 'bold'
                }).center();
            }
            //보조선
            if (dotLine) {
                const className = 'fno s' + (handWrite.dotLineClassNum || '01') //옵션
                const strokeWidth = handWrite.dotLineStrokeWidth || 1.5 //옵션
                const opacity = handWrite.dotLineOpacity || 0.4 //옵션
                dotG.line(basicValue[makeHwCount].width / 2, 0, basicValue[makeHwCount].width / 2, 0 + basicValue[makeHwCount].height).addClass(className).attr({
                    'strokeWidth': strokeWidth,
                    'strokeDasharray': '5 5',
                    'opacity': opacity
                })
                dotG.line(0, basicValue[makeHwCount].height / 2, 0 + basicValue[makeHwCount].width, basicValue[makeHwCount].height / 2).addClass(className).attr({
                    'strokeWidth': strokeWidth,
                    'strokeDasharray': '5 5',
                    'opacity': opacity
                })
            }
            //쓰기 시작 지점 표시
            if (startPoint[makeHwCount]) {
                const penIcons = loadPencilIcon();
                const isUpIcon = startPoint[makeHwCount].type && startPoint[makeHwCount].type === 1;
                const icon = isUpIcon ? penIcons[2] : penIcons[3];
                penImg[makeHwCount] = icon.use()
                    .transform('t' + [startPoint[makeHwCount].x, startPoint[makeHwCount].y])
                    .appendTo(canvas)
                    .attr('opacity', 0);
            }

            subG.transform('t' + [basicValue[makeHwCount].x, basicValue[makeHwCount].y]); // 외부적인 요소들 정렬

            //undo 버튼
            undoBtn[makeHwCount] = makeUndoButton({
                'g': subBtnG,
                'xy': [undoButton.x, undoButton.y],
                'scale': undoButton.scale,
                'data': makeHwCount,
                'pressCallback': function () {},
                'callback': function (index) {
                    console.log('undo', index);
                    undoAction(index);
                }
            })

            //reset 버튼
            resetBtn[makeHwCount] = makeResetButton({
                'g': subBtnG,
                'xy': [resetButton.x, resetButton.y],
                'scale': resetButton.scale,
                'data': makeHwCount,
                'pressCallback': function () {},
                'callback': function (index) {
                    console.log('reset', index);
                    resetAction(index); //path 정보 초기화
                    makePad(index); //패드 재 생성
                }
            })
            makeHwCount++;
        }
    });




    //쓰이는 함수들 .... ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function undoAction(index) {
        console.log(pathArr, visiblePath);
        //path 정보 끝에서 한 개만 삭제
        pathArr[index].pop();
        visiblePath[index][visiblePath[index].length - 1].remove();
        visiblePath[index].pop();

        if (pathArr[index].length === 0) {
            btnAction('none', index);
            if (startPoint[index]) penImg[index].attr('opacity', 1);
            if (direction[index]) directG[index].attr('opacity', 1)
        } //path가 없으면 버튼 비활성
        makePad(index); //패드 재 생성
    }

    function resetAction(index) {
        console.log(pathArr, visiblePath);
        pathArr[index] = [];
        visiblePath[index].forEach(el => el.remove())
        visiblePath[index] = [];
        btnAction('none', index); //버튼 비활성
        if (startPoint[index]) penImg[index].attr('opacity', 1)
        if (direction[index]) directG[index].attr('opacity', 1)
    }

    function btnAction(type, i) {
        if (i === 'all') {
            undoBtn.forEach(el => {
                el.attr('pointerEvents', type);
            })
            resetBtn.forEach(el => {
                el.attr('pointerEvents', type);
            })
            ok.stop();
        } else {
            undoBtn[i].attr('pointerEvents', type);
            resetBtn[i].attr('pointerEvents', type);
            if (pathArr.every(el => el.length !== 0)) {
                ok.start();
            } else {
                ok.stop();
            }
        }
    }

    function makePad(i) {
        if (handWriteML[i]) handWriteML[i].remove(); //패드 존재 시 삭제
        //새로운 패드 생성
        handWriteML[i] = new K_pathGetString({
            'area': [
                basicValue[i].x,
                basicValue[i].y,
                basicValue[i].x + basicValue[i].width,
                basicValue[i].y + basicValue[i].height
            ],
            'rXY': basicValue[i].rXY,
            'pathAttr': pathAttr[i],
            startCheck: function (e) {
                if (startPoint[i]) penImg[i].attr('opacity', 0)
                if (direction[i]) directG[i].attr('opacity', 0)
            },
            callback: function (path, pathG) {
                const newPathG = totalG.path(pathSmooth(path, 10)).attr(pathAttr[i])
                visiblePath[i].push(newPathG) // 보여지는 path
                // pathG.appendTo(totalG);
                // visiblePath[i].push(pathG)
                pathArr[i].push(path[0]); // 정답체크에 쓰일 원본 path

                btnAction('auto', i) //버튼 활성
                makePad(i); //패드 재 생성
            }
        });
    }

    async function check() {
        handWriteML.forEach(el => el.attr('pointerEvents', 'none')); //pad 비활성
        btnAction('none', 'all'); //버튼 비활성
        const boolArr = []
        for (let a = 0; a < pathArr.length; a++) {
            const result = await recognizeHandWrite(pathArr[a] || '', 'ko_KR');
            console.log('user 답 : ', result, '실제 답 : ', answer[a]);
            boolArr[a] = result === answer[a]
        }
        feedback({
            canvas: canvas,
            el: background,
            bool: boolArr.every(el => el),
            scale: 1,
            onRemove: function () {
                if (boolArr.every(el => el)) {
                    visiblePath.forEach(el => {
                        el.forEach(e => {
                            e.attr('pointerEvents', 'none')
                        });
                    });
                    handWriteML.forEach(hw => {
                        hw.remove() // pad 삭제
                    })
                    btnG.attr('pointerEvents', 'none')
                    console.log('둘다 정답');
                    callback(pathArr)
                } else {
                    boolArr.forEach((bool, i) => {
                        if (bool) {
                            console.log('혼자 정답이다 ', i);
                        } else {
                            console.log('오답시 ', i);
                            resetAction(i); //path 정보 초기화
                            makePad(i); //패드 재 생성
                        }
                    })
                }
            }
        });
    }

    // 보여주기 함수
    function show() {
        g.attr('opacity', 1)
        btnG.attr('opacity', 1)
        if (startPoint.length !== 0) {
            for (let y = 0; y < startPoint.length; y++) {
                if (startPoint[y]) penImg[y].attr('opacity', 1)
            }
        }
    }



    //시작
    this.start = function () {
        show();
        pathArr.forEach((e, i) => makePad(i));
    }

    this.show = function () {
        show();
    }

    this.remove = function () {
        totalG.remove();
    }

    return this;
}


export const wordChainPopUpHandWrite = function ({
    canvas,
    popUpSize,
    popUpFillColor = '0031',
    popUpStrokeColor = 'no',
    touchBBox,
    touchBoxVisible = true,
    ans,
    imageButton,
    oneWord,
    handWriteValue,
    // soundFeedback,
    midCallback,
    isHint = true,
    callback
}) {
    // const voice = soundFeedback ? loadSound(soundFeedback.url) : undefined;
    const g = canvas.g().attr('visibility', 'hidden');
    const touchG = canvas.g().attr({
        'visibility': 'hidden',
        'pointerEvents': 'none',
    })
    const whiteBackG = g.g();
    const blockG = canvas.g().attr({'opacity':0.5,'visibility': 'hidden'});
    const mainG = canvas.g().attr('visibility', 'hidden');
    const grayBackG = mainG.g();
    const contentsG = mainG.g();
    let imgBtnG;
    let myHint;
    let fbWord;
    popUpSize = {
        'x': 75,
        'y': 94,
        'w': (popUpSize && popUpSize.width) || 650,
        'h': (popUpSize && popUpSize.height) || 366,
        'rXY': 10,
        ...popUpSize
    }
    const touchR = (touchBBox.r || 0)
    const touchBoxColor = (touchBBox.color || '02')
    const touchBoxSW = (touchBBox.strokeWidth || 3)
    const touchRect = touchG.rect(touchBBox.x, touchBBox.y, touchBBox.w, touchBBox.h, touchR, touchR).addClass('f14 s'+touchBoxColor).attr({
        'strokeWidth': touchBoxSW
    })
    blockG.rect(0,0,800,500).addClass('f01 sno');
    const whiteRect = whiteBackG.rect(popUpSize.x, popUpSize.y, popUpSize.w, popUpSize.h, popUpSize.w/2, popUpSize.h/2).addClass('f14 sno'); //처음에 원처럼 만들기

    if (!touchBoxVisible) {
        touchRect.attr('opacity', 0);
        whiteRect.attr('opacity', 0)
    }

    grayBackG.rect(popUpSize.x, popUpSize.y, popUpSize.w, popUpSize.h, popUpSize.rXY, popUpSize.rXY).addClass('f' + popUpFillColor + ' s' + popUpStrokeColor).attr({
        'opacity': 1
    })


    //이미지 버튼
    if(imageButton){
        imgBtnG = contentsG.g();
        imageButton.element.forEach(imgEl => {
            const gg = imgBtnG.g();
            createElement({
                "type": imgEl.type,
                "canvas": gg,
                "meta": imgEl.meta
            });
            if(imgEl.img && imgEl.img.rotate) gg.transform('r'+imgEl.img.rotate)
        });
        createElement({
            "type": 'rect',
            "canvas": imgBtnG,
            "meta": {...contentsG.getTBox(),'shapeFillClassNum':'14','shapeOpacity':0}
        });
        imgBtnG.touchOrClick(function(){
            Howler.stop();
            imageButton.voice.play()
            imageButton.voice.once('end', function () {})
        })
    }

    //텍스트 부분
    if(oneWord){
        const wordG =contentsG.g();
        const len =oneWord.text.length;
        oneWord.width = (oneWord.boxWidth || (oneWord.fontSize || 80) * 1.2);
        oneWord.height = (oneWord.boxHeight || (oneWord.fontSize || 80) * 1.2);
        oneWord.wordGap = oneWord.width + (oneWord.boxGap || 0);
        for (let t = 0; t < len; t++) {
            // 박스
            createElement({
                'type':'rect',
                "canvas": wordG,
                'meta':{
                    'cx': 0 + oneWord.wordGap * t,
                    'cy': 0,
                    'width' : oneWord.width,
                    'height' : oneWord.height,
                    'rXY': oneWord.boxR || 10,
                    'shapeFillClassNum': oneWord.boxFillClassNum || '14',
                    'shapeStrokeClassNum':oneWord.boxStrokeClassNum || 'no',
                    'shapeStrokeWidth': oneWord.boxStrokeWidth || 1,
                    'shapeOpacity': oneWord.boxOpacity,
                    'shadowDx': oneWord.boxShadowDx,
                    'shadowDy': oneWord.boxShadowDy,
                    'shadowBlur': oneWord.boxShadowBlur,
                    'shadowClassNum':oneWord.boxShadowClassNum,
                    'shadowOpacity': oneWord.boxShadowOpacity,
                }
            })
            //텍스트
            const isFocusT = t===len-1;
            const textEl=createElement({
                'type':'text',
                "canvas": wordG,
                "meta":{
                    'cx': 0 + oneWord.wordGap * t,
                    'cy': 0,
                    'text' : oneWord.text[t],
                    'classNum' : isFocusT ? (oneWord.focusClassNum || '0002') : (oneWord.classNum || '000'),
                    'fontSize': oneWord.fontSize || 55,
                    'bold': oneWord.bold !==undefined ? oneWord.bold : true,
                    'lineCenter':true
                }
            });
            if(isFocusT) fbWord = textEl.attr('opacity',0);
        }
        wordG.transform(Snap.matrix(1, 0, 0, 1, oneWord.cx -oneWord.width/2 * (len-1), oneWord.cy));
    }


    const hw = new simpleHandWrite({
        'canvas': contentsG,
        'x': handWriteValue.x,
        'y': handWriteValue.y,
        'width': handWriteValue.width,
        'height': handWriteValue.height,
        'rXY': handWriteValue.rXY || 10,
        'drawClassNum': handWriteValue.drawClassNum || '0005',
        'drawStrokeWidth': handWriteValue.drawStrokeWidth,
        'boxFillClassNum': handWriteValue.boxFillClassNum || '0039',
        'boxStrokeClassNum': handWriteValue.boxStrokeClassNum || 'no',
        'boxOpacity': handWriteValue.boxOpacity || 1,
        'boxStrokeWidth': handWriteValue.boxStrokeWidth,
        'shadowDx': handWriteValue.shadowDx,
        'shadowDy': handWriteValue.shadowDy,
        'shadowBlur': handWriteValue.shadowBlur,
        'shadowOpacity': handWriteValue.shadowOpacity,
        'shadowClassNum': handWriteValue.shadowClassNum,
        'direction': handWriteValue.direction || true,
        'directionInfo': handWriteValue.directionInfo,
        'startPoint': handWriteValue.startPoint,
        'wordHint': handWriteValue.wordHint,
        'wordHintClassNum': handWriteValue.wordHintClassNum,
        'wordHintOpacity': handWriteValue.wordHintOpacity,
        'wordHintFs': handWriteValue.wordHintFs,
        'dotLine': handWriteValue.dotLine || true,
        'dotLineClassNum': handWriteValue.dotLineClassNum,
        'dotLineStrokeWidth': handWriteValue.dotLineStrokeWidth,
        'dotLineOpacity': handWriteValue.dotLineOpacity,
        'okButton': {
            'cx':662,
            'cy':392,
            ...handWriteValue.okButton
        },
        'undoButton': {
            'x': handWriteValue.x + handWriteValue.width + 20,
            'y': handWriteValue.y + 5,
            ...handWriteValue.undoButton
        },
        'resetButton': {
            'x': handWriteValue.x + handWriteValue.width + 20,
            'y': handWriteValue.y + 5 + (30 + 10),
            ...handWriteValue.resetButton
        },
        'answer': ans,
        callback: function (pathArr) {
            const pathData = pathArr;
            if (midCallback) midCallback();
            Howler.stop();
            imgBtnG.attr('pointerEvents','none')
            // if (voice) {
            //     voice.play();
            //     voice.once('end', function () {
            //         writeEnd(pathData);
            //     });
            // } else {
                fbWord.attr('opacity',1);
                setTimeout(function(){
                    writeEnd(pathData);
                },300)
            // }
        }
    });
    hw.show();
    g.transform(Snap.matrix(touchBBox.w / popUpSize.w, 0, 0, touchBBox.h / popUpSize.h, touchBBox.x- (popUpSize.x * touchBBox.w / popUpSize.w), touchBBox.y - (popUpSize.y * touchBBox.h / popUpSize.h)));

    function writeEnd(pathData) {
        whiteRect.removeClass('f14 sno').addClass('f14 s01')
        blockG.attr('visibility', 'hidden')
        mainG.attr('visibility', 'hidden')
        g.animate({
            'transform': Snap.matrix(touchBBox.w / popUpSize.w, 0, 0, touchBBox.h / popUpSize.h, touchBBox.x - (popUpSize.x * touchBBox.w / popUpSize.w), touchBBox.y - (popUpSize.y * touchBBox.h / popUpSize.h))
        }, 500, function () {
            whiteRect.removeClass('f14 s01').addClass('fno sno')
            callback(ans, pathData);
        })
    }



    touchG.touchOrClick(function () {
        if (myHint) myHint.removeHint();
        loadBtnSound(0).play();
        this.untouchOrClick();
        this.attr({
            'opacity': 0
        });
        if (!touchBoxVisible) whiteRect.attr('opacity', 1);
        whiteRect.removeClass('f14 sno').addClass('f14 s01').attr({
            'strokeWidth': 1
        })
        whiteRect.attr('rx',0);
        whiteRect.attr('ry',0);
        g.animate({
            'transform': g.transform.local + Snap.matrix(touchBBox.w / touchBBox.w, 0, 0, touchBBox.h / touchBBox.h, 0, 0)
        }, 500, function () {
            whiteRect.removeClass('f14 s01').addClass('f14 sno')
            blockG.attr('visibility', 'visible')
            mainG.attr('visibility', 'visible')
            hw.start();
        })
    })

    function makeHint(g, xy) {
        const h = new hint({
            'canvas': g,
            'scale': 1,
            'type': 0,
            'XY': xy
        });
        return h
    }
    this.g = g;
    this.start = function () {
        g.attr({
            'visibility': 'visible'
        });
        touchG.attr({
            'pointerEvents': 'auto',
            'visibility': 'visible'
        })
        if (isHint) myHint = makeHint(touchG, [touchG.getTBox().cx, touchG.getTBox().cy]);
    }

    return this;
}
