import Snap from 'sol-common/snap';
import { Howler } from 'howler';
import { wordSplit, pathWord, jamoList, replaceWord } from './K_word';
import { loadImages, loadImage, loadVoice, hint, loadSound } from 'sol-common';
import { loadBtnSound } from './com_sound';
import { loadHelpImg, loadAddIcon, loadSpeakerIcon } from './com_image';
import { K_richTextAuto } from './K_text';

import ok from '../assets/images/ok.svg';
import pressOk from '../assets/images/pressOk.svg';
import unPressOk from '../assets/images/unPressOk.svg';
import next from '../assets/images/next.svg';
import pressNext from '../assets/images/pressNext.svg';
import unPressNext from '../assets/images/unPressNext.svg';
import undoImage from '../assets/images/undoImage.svg';
import resetImage from '../assets/images/resetImage.svg';
import undoImage2 from '../assets/images/undoImage2.svg';
import resetImage2 from '../assets/images/resetImage2.svg';
import speaker from '../assets/images/speaker.svg';
import { classMatchingColor, numberDefault } from './com_util';
import { SOL, makeShadow } from 'sol-common/util';
import { createElement } from './K_backgroundShape';
// tts 버튼
export const tts = function ({
    canvas,
    x,
    y,
    text,
    locale = 'ko-KR',
    img = { src: speaker, key: 'speaker', type: 'svg' },
    howlerStop = true,
    startCallback,
    endCallback
}) {
    const g = canvas.g();
    const loaderG = g.g();
    const speakerImg = loadImage(img).use().appendTo(g).addClass('cp');
    let voice;
    g.click(async function () {
        if (startCallback) startCallback();
        speakerImg.attr({
            visibility: 'hidden'
        });
        for (let i = 0; i < 3; i++) {
            const circle = loaderG.circle(i * 15, 15, 5).addClass('speaker-color');
            setTimeout(circle.addClass.bind(circle), 100 * i, 'blink');
        }
        if (!voice){ 
            const newT = replaceWord(text.replace(/\$.+?\{(.+?)\}/g, '$1'),jamoList);
            voice = await loadVoice(newT, locale);
            g.data('voice',voice);
        }
        loaderG.clear();
        speakerImg.attr({
            visibility: 'visible'
        });
        if(howlerStop)  Howler.stop();
        voice.play();
        if (endCallback) voice.once('end', endCallback);
    });
    g.transform('t' + [x, y]);
    return g;
};

// 눌리지 않는 버튼
export const unPressMakeButton = function ({
    el,
    isButton,
    x,
    y,
    width,
    height,
    btnFillClassNum = '14',
    btnStrokeClassNum = '117',
    btnOpacity = 1,
    btnStrokeWidth = 1,
    btnR = 10,
    index,
    shadowClassNum,
    shadowDx,
    shadowDy,
    shadowBlur,
    shadowOpacity,
    // pressSound = true,
    isHint,
    callback
}) {
    const g = el.parent().g();
    g.data('val', index);
    const bbox = el.getBBox();
    let newX = isButton ? x : bbox.x;
    let newY = isButton ? y : bbox.y;
    let newWidth = isButton ? width : bbox.w;
    let newHeight = isButton ? height : bbox.h;

    //그룹 잡기 위한 박스
    el.rect(newX + newWidth / 2, newY + newHeight / 2, newWidth, newHeight, btnR, btnR)
        .addClass('f04 sno')
        .attr({
            opacity: 0
        })
        .center()
        .prependTo(el);
    //실제 박스
    if (!isButton) btnOpacity = 0;
    const box = el
        .rect(newX + newWidth / 2, newY + newHeight / 2, newWidth, newHeight, btnR, btnR)
        .addClass('f' + btnFillClassNum + ' s' + btnStrokeClassNum)
        .attr({
            opacity: btnOpacity,
            strokeWidth: btnStrokeWidth
        })
        .center();
    box.prependTo(el);

    if (shadowClassNum) {
        const btnShadow = makeShadow({
            dx: numberDefault(shadowDx, 3),
            dy: numberDefault(shadowDy, 3),
            blur: numberDefault(shadowBlur, 2),
            color: classMatchingColor(shadowClassNum),
            opacity: shadowOpacity || 0.3,
            g: SOL.SVG
        });
        el.attr('filter', btnShadow);
    }

    el.touchOrClick(function () {
        // if(pressSound) loadBtnSound(0).play();
        if (hintEl) hintEl.removeHint();
        callback(g.data('val'), g);
    });
    let hintEl;
    if (isHint) {
        const btnBBox = box.getTBox();
        hintEl = new hint({
            canvas: el.parent(),
            scale: 1,
            type: 0,
            XY: [btnBBox.x2 - 50, btnBBox.y2 - 50]
        });
    }
    return g;
};

// 일반 버튼 만들기
export const K_makeButton = function ({
    el,
    x,
    y,
    width,
    height,
    fillClassNum = '14',
    strokeClassNum = '117',
    shadowClassNum = '0006',
    shadowOpacity = 0.3,
    opacity = 1,
    isMetaSize = false, //메타에 들어온 사이즈대로 버튼을 생성할지 여부
    r = 10,
    d = 3,
    index = 0,
    pressEffect = true,
    firstCallback,
    endCallback
}) {
    const g = el.parent().g();
    const touchG = el.parent().g();
    const bbox = el.getBBox();
    const newX = x ? x : bbox.cx;
    const newY = y ? y : bbox.cy;
    const newWidth = isMetaSize ? width : width + 20;
    const newHeight = isMetaSize ? height : height + 20;

    el.rect(newX, newY, newWidth, newHeight, r, r)
        .addClass('f' + fillClassNum + ' s' + strokeClassNum)
        .attr({
            'opacity': opacity
        })
        .center()
        .data('btn',true)
        .prependTo(el);

    //fake rect
    el.rect(newX, newY, newWidth, newHeight, r, r)
        .addClass('f' + (fillClassNum === 'no' ? 'no' : '14') + ' sno')
        .attr({
            'opacity': 1
        })
        .center()
        .data('btn',true)
        .prependTo(el);

    const local = el.transform().local;
    const shadow = g
        .rect(newX + d, newY + d, newWidth, newHeight, r, r)
        .addClass('f' + shadowClassNum + ' kBtnShadow')
        .attr({
            'opacity': shadowOpacity,
            'pointer-events': 'none'
        })
        .data('opacity', shadowOpacity)
        .center();
    el.appendTo(g);

    const totalBBox = g.getTBox();

    touchG
        .rect(totalBBox.cx, totalBBox.cy, totalBBox.w, totalBBox.h, r, r)
        .addClass('f02 sno')
        .attr('opacity', 0)
        .center();

    g.data('val', index);
    g.data('rXY', r);
    el.shadow = shadow;
    el.stop = function () {
        touchG.attr('pointerEvents', 'none');
    };
    el.reStart = function () {
        // console.log('auto');
        touchG.attr('pointerEvents', 'auto');
    };
    touchG.pressEvent(function (bool) {
        if (bool) {
            if (firstCallback) firstCallback();
            if (pressEffect) {
                el.attr('transform', local + 't' + [d, d]); //이동하는 엘리먼트
                shadow.attr('visibility', 'hidden');
            }
        } else {
            if (pressEffect) el.attr('transform', local); //이동하는 엘리먼트
            if (endCallback) endCallback(g.data('val'), g);
        }
    });

    return g;
};

// 이전 버튼
export const makeUndoButton = function ({ g, xy, scale, data, pressCallback, pressSound = true, callback }) {
    const undoImages = loadImages([
        {
            src: undoImage,
            key: 'undoImage',
            type: 'svg'
        },
        {
            src: undoImage2,
            key: 'undoPress',
            type: 'svg'
        }
    ]);
    //undo 버튼
    const pressUndoBtn = undoImages[1]
        .use()
        .transform('t' + xy + ' s' + scale)
        .appendTo(g)
        .attr({
            pointerEvents: 'none',
            opacity: 0
        });
    const undoBtn = undoImages[0]
        .use()
        .transform('t' + xy + ' s' + scale)
        .appendTo(g)
        .attr('pointerEvents', 'none')
        .pressEvent(function (bool) {
            if (bool) {
                console.log('누르기');
                if (pressSound) loadBtnSound(0).play();
                this.attr('opacity', 0);
                pressUndoBtn.attr('opacity', 1);
                if (pressCallback) pressCallback();
            } else {
                console.log('undo');
                this.attr('opacity', 1);
                pressUndoBtn.attr('opacity', 0);
                callback(data);
            }
        });
    return undoBtn;
};

//리셋 버튼
export const makeResetButton = function ({ g, xy, scale, data, pressCallback, pressSound = true, callback }) {
    const resetImages = loadImages([
        {
            src: resetImage,
            key: 'resetImage',
            type: 'svg'
        },
        {
            src: resetImage2,
            key: 'resetPress',
            type: 'svg'
        }
    ]);
    //undo 버튼
    const pressResetBtn = resetImages[1]
        .use()
        .transform('t' + xy + ' s' + scale)
        .appendTo(g)
        .attr({
            pointerEvents: 'none',
            opacity: 0
        });
    const resetBtn = resetImages[0]
        .use()
        .transform('t' + xy + ' s' + scale)
        .appendTo(g)
        .attr('pointerEvents', 'none')
        .pressEvent(function (bool) {
            if (bool) {
                console.log('누르기');
                if (pressSound) loadBtnSound(0).play();
                this.attr('opacity', 0);
                pressResetBtn.attr('opacity', 1);
                if (pressCallback) pressCallback();
            } else {
                console.log('reset');
                this.attr('opacity', 1);
                pressResetBtn.attr('opacity', 0);
                callback(data);
            }
        });
    return resetBtn;
};

// 확인, 다음 버튼
export const makeOk = function ({
    canvas,
    type = 0,
    cx = 755,
    cy = 430,
    scale = 1,
    visibility = false,
    event = false,
    pressCallback,
    pressSound = true,
    howlerStop = true,
    startCallback,
    callback
}) {
    const g = canvas.g();
    let btnImages;
    const useBtnImage = [];
    switch (type) {
        case 0:
            btnImages = loadImages([
                {
                    src: ok,
                    key: 'ok',
                    type: 'svg'
                },
                {
                    src: pressOk,
                    key: 'pressOk',
                    type: 'svg'
                },
                {
                    src: unPressOk,
                    key: 'unPressOk',
                    type: 'svg'
                }
            ]);
            break;
        case 1:
            btnImages = loadImages([
                {
                    src: next,
                    key: 'next',
                    type: 'svg'
                },
                {
                    src: pressNext,
                    key: 'pressNext',
                    type: 'svg'
                },
                {
                    src: unPressNext,
                    key: 'unPressNext',
                    type: 'svg'
                }
            ]);
            break;
    }

    for (let a = 0; a < btnImages.length; a++) {
        useBtnImage[a] = btnImages[a]
            .use()
            .transform(Snap.matrix(scale, 0, 0, scale, cx, cy))
            .center()
            .appendTo(g)
            .attr({
                pointerEvents: 'none',
                opacity: 0
            });
    }

    useBtnImage[0].pressEvent(function (bool) {
        if (bool) {
            console.log('누르기', this);
            if (startCallback) startCallback();
            if (pressSound) {
                if(howlerStop) Howler.stop();
                loadBtnSound(0).play();
            }
            this.attr({'opacity': 0});
            useBtnImage[1].attr('opacity', 1);
            if (pressCallback) pressCallback();
        } else {
            this.attr({'opacity': 1, 'pointerEvents':'none'});
            useBtnImage[1].attr('opacity', 0);
            callback();
        }
    });

    if (visibility && !event) useBtnImage[2].attr('opacity', 1);
    else if (visibility && event) useBtnImage[0].attr({ opacity: 1, pointerEvents: 'auto' });

    this.start = function () {
        if (useBtnImage[2].attr('opacity') === '1') useBtnImage[2].attr('opacity', 0);
        if (useBtnImage[0].attr('opacity') === '0') useBtnImage[0].attr('opacity', 1);
        if (useBtnImage[0].attr('pointerEvents') !== 'auto') useBtnImage[0].attr('pointerEvents', 'auto');
    };
    this.stop = function () {
        if (useBtnImage[0].attr('opacity') === '1') useBtnImage[0].attr('opacity', 0);
        if (useBtnImage[2].attr('opacity') === '0') useBtnImage[2].attr('opacity', 1);
        if (useBtnImage[0].attr('pointerEvents') !== 'none') useBtnImage[0].attr('pointerEvents', 'none');
    };
    this.kill = function () {
        if (useBtnImage[0].attr('pointerEvents') !== 'none') useBtnImage[0].attr('pointerEvents', 'none');
        g.remove();
    };
    this.unClick = function () {
        if (useBtnImage[0].attr('pointerEvents') !== 'none') useBtnImage[0].attr('pointerEvents', 'none');
    };

    return this;
};

export const helpButton = function ({
    canvas,
    btnXY,
    btnSize = 1,
    fontSize = 14,
    hintMessage,
    className = 'ffng f91',
    bold=false,
    backgroundClass = 'f14 sno',
    backgroundOpacity = 1,
    messageGap = [0, 0],
    event = false,
    howlerStop = true,
    pressSound = true,
    startCallback,
    type = 'b'
}) {
    const g = canvas.g();
    const textG = g.g().attr('opacity', '0');
    const iconG = g.g();
    const helpImgs = loadHelpImg();
    const dy = fontSize + 10;

    const pressImg = helpImgs[1]
        .use()
        .transform(Snap.matrix(btnSize, 0, 0, btnSize, btnXY[0], btnXY[1]))
        .appendTo(iconG)
        .attr('opacity', 0);
    const touchBtn = helpImgs[0]
        .use()
        .transform(Snap.matrix(btnSize, 0, 0, btnSize, btnXY[0], btnXY[1]))
        .appendTo(iconG)
        .attr('pointerEvents', 'none');

    const t = new K_richTextAuto({
        canvas: textG,
        text: hintMessage,
        x: 0,
        y: 0,
        className: className,
        fontSize: fontSize,
        dy: dy,
        isBold:bold
    });
    const textBbox = t.getBBox();
    textG
        .rect(textBbox.cx, textBbox.cy, textBbox.w + 10, textBbox.h + 10)
        .addClass(backgroundClass)
        .attr({
            opacity: backgroundOpacity
        })
        .center()
        .prependTo(t);
    const bbox = iconG.getTBox();
    let xy;
    if(type==='b') xy = [bbox.x + 5 + messageGap[0], bbox.y2 + dy + messageGap[1]]
    else if (type === 'r') xy = [bbox.x2 + 15 + messageGap[0], bbox.cy + messageGap[1]]
    textG.transform('t' + xy);

    touchBtn.pressEvent(function (bool) {
        if (bool) {
            console.log('누르기');
            if(startCallback) startCallback();
            if(pressSound) {
                if(howlerStop) Howler.stop();
                loadBtnSound(Number(textG.attr('opacity') !== '0' )).play();
            }
            this.attr('opacity', 0);
            pressImg.attr('opacity', 1);
        } else {
            console.log('끝');
            if (textG.attr('opacity') === '0') {
                textG.attr('opacity', '1');
            } else {
                textG.attr('opacity', '0');
            }
            pressImg.attr('opacity', 0);
            this.attr('opacity', 1);
        }
    });

    if (event) touchBtn.attr('pointerEvents', 'auto');

    this.start = function () {
        if (!event) touchBtn.attr('pointerEvents', 'auto');
    };
    return this;
};

// 단어 버튼
export const wordButton = function ({
    g,
    text,
    searchWord,
    startX,
    startY,
    textS,
    center,
    btnType,
    btnWidth,
    btnHeight,
    btnGapX,
    btnGapY,
    btnFillClassNum,
    btnStrokeClassNum,
    btnStrokeWidth,
    btnOpacity = 1,
    shadowDx,
    shadowDy,
    shadowBlur,
    shadowClassNum,
    shadowOpacity,
    d,
    rXY,
    r,
    btnImgUrl,
    btnImgScale = 1,
    btnImgRotate = 0,
    classNum = '0003',
    callback
}) {
    const info = {};
    const element = [];
    let ansCount = 0;
    let width = 0;
    let height = 0;
    for (let a = 0; a < text.length; a++) {
        const word = text[a];
        const splitWordInfo = wordSplit(word);
        const searchWordIndex = splitWordInfo.arr.indexOf(searchWord);
        const isAns = searchWordIndex !== -1;
        const x = startX + (width + btnGapX + d) * a;
        const y = startY + btnGapY * a;
        const elG = g.g().attr('pointerEvents', 'none');
        const pathG = elG.g();
        const className = 'f' + classNum + ' sno';
        const shape = createElement({
            type: btnType,
            canvas: pathG,
            meta: {
                cx: x + (btnType === 'circle' ? r : 0),
                cy: y + (btnType === 'circle' ? r : 0),
                width: btnWidth,
                height: btnHeight,
                rXY: rXY,
                r: r,
                shapeFillClassNum: btnFillClassNum,
                shapeStrokeClassNum: btnStrokeClassNum,
                shapeStrokeWidth: btnStrokeWidth,
                shapeOpacity: btnOpacity,
                shadowDx: shadowDx,
                shadowDy: shadowDy,
                shadowBlur: shadowBlur,
                shadowClassNum: shadowClassNum,
                shadowOpacity: shadowOpacity,
                ImgUrl: btnImgUrl,
                ImgScale: btnImgScale
            }
        });
        const myBBox = shape.getTBox();
        width = myBBox.w;
        height = myBBox.h;
        const shapeEl = btnType === 'image' ? shape.children()[0].children()[0] : shape.children()[0];
        const s = btnType === 'image' ? btnImgScale : 1;
        shapeEl.transform(shapeEl.transform().local + ' t' + [width / (2 * s), height / (2 * s)] + ' r' + btnImgRotate);

        pathWord({
            //글자 패스 그리기 함수
            canvas: pathG,
            cx: x + width / 2,
            cy: y + height / 2,
            textScale: textS,
            text: word,
            className: className
        });
        elG.data('data', {
            roundV: btnType === 'rect' ? rXY : btnType === 'image' ? 0 : undefined,
            isAns: isAns,
            fbGroup: pathG,
            clickEnd: false,
            centerXY: [x + width / 2, y + height / 2],
            beforeClass: className,
            changePathIndex: searchWordIndex
        }).touchOrClick(callback);
        element.push(elG);
        if (isAns) ansCount++;
    }
    if (center) g.center();

    info.el = element;
    info.ansCount = ansCount;

    return info;
};

// 확인, 다음 버튼
export const makeHelp = function ({
    canvas,
    cx = 755,
    cy = 380,
    scale = 1,
    visibility = false,
    event = false,
    pressCallback,
    pressSound = true,
    howlerStop = true,
    callback
}) {
    const g = canvas.g();
    const useBtnImage = [];
    const btnImages = loadHelpImg();

    for (let a = 0; a < btnImages.length; a++) {
        useBtnImage[a] = btnImages[a]
            .use()
            .transform(Snap.matrix(scale, 0, 0, scale, cx, cy))
            .center()
            .appendTo(g)
            .attr({
                pointerEvents: 'none',
                opacity: 0
            });
    }
    useBtnImage[0].pressEvent(function (bool) {
            if (bool) {
                console.log('누르기', this);
                if (pressSound) {
                    if(howlerStop) Howler.stop();
                    loadBtnSound(0).play();
                }
                this.attr('opacity', 0);
                useBtnImage[1].attr('opacity', 1);
                if (pressCallback) pressCallback();
            } else {
                this.attr({'opacity': 1, 'pointerEvents':'none'});
                useBtnImage[1].attr('opacity', 0);
                callback();
            }
        });

    if (visibility && event) useBtnImage[0].attr({ opacity: 1, pointerEvents: 'auto' });

    this.start = function () {
        if (useBtnImage[0].attr('opacity') === '0') useBtnImage[0].attr('opacity', 1);
        if (useBtnImage[0].attr('pointerEvents') !== 'auto') useBtnImage[0].attr('pointerEvents', 'auto');
    };
    this.stop = function () {
        // if (useBtnImage[0].attr('opacity') === '1') useBtnImage[0].attr('opacity', 0);
        if (useBtnImage[0].attr('pointerEvents') !== 'none') useBtnImage[0].attr('pointerEvents', 'none');
    };
    this.kill = function () {
        if (useBtnImage[0].attr('pointerEvents') !== 'none') useBtnImage[0].attr('pointerEvents', 'none');
        g.remove();
    };

    return this;
};


export const vocabularyAddButton = function ({
    canvas,
    x,
    y,
    btnScale,
    visibility,
    event,
    howlerStop = true,
    pressSound = true,
    startCallback,
    callback
}){
    const g = canvas.g();
    const btnImg = loadAddIcon();
    const btns =[];
    for (let a = 0; a < btnImg.length; a++) {
        btns[a] = btnImg[a]
            .use()
            .transform(Snap.matrix(btnScale, 0, 0, btnScale, x, y))
            .appendTo(g)
            .attr({
                pointerEvents: 'none',
                opacity: 0
            });
    }
    btns[0].pressEvent(function(bool){
        if(bool){
            if(startCallback) startCallback();
            if (pressSound){ 
                if(howlerStop) Howler.stop();
                loadBtnSound(0).play();
            }
            this.attr('opacity', 0);
            btns[1].attr('opacity', 1);
        }else{
            this.attr({
                'opacity': 1, 
                // 'pointerEvents':'none'
            });
            btns[1].attr('opacity', 0);
            callback();
        }
    })

    if (visibility && event) btns[0].attr({ opacity: 1, pointerEvents: 'auto' });

    this.start = function () {
        if (btns[0].attr('opacity') === '0') btns[0].attr('opacity', 1);
        if (btns[0].attr('pointerEvents') !== 'auto') btns[0].attr('pointerEvents', 'auto');
    };
    this.stop = function () {
        if (btns[0].attr('pointerEvents') !== 'none') btns[0].attr('pointerEvents', 'none');
    };
    this.kill = function () {
        if (btns[0].attr('pointerEvents') !== 'none') btns[0].attr('pointerEvents', 'none');
        g.remove();
    };

    return this;
}


/*
makeSoundButton({
    g: g,
    elements: [],
    sound: {
        soundUrl: '',
        ttsText: '', // text, soundUrl 있으면 soundUrl 사용됨
        imgUrl: '', // 스피커 버튼 다른 이미지 사용할 때
        cx: 100,
        cy: 100,
        scale: 1
    },
    startCallback: function() {},
    endCallback: function() {},
});
*/
export const makeSoundButton = (soundButton) => {
    const {
        g,
        elements,
        sound,
        isStopHowler = true,
        startCallback,
        endCallback
    } = soundButton;

    const soundButtonG = g.g().addClass('cp');
    let mySound;

    // elements 그리기
    if (elements) {
        elements.forEach(el => {
            createElement({
                canvas: soundButtonG,
                type: el.type,
                meta: el.meta
            });
        });
    }
   
    // soundButton 그리기
    const _bb = soundButtonG.getBBox();
    const { cx = _bb.x, cy = _bb.y, scale = 1 } = sound;
    if (sound.imgUrl) {
        createElement({
            "canvas": soundButtonG,
            "type":'image',
            "meta": {
                cx,
                cy,
                "imgUrl": sound.imgUrl,
                scale
            }
        });
    } else {
        loadSpeakerIcon().use().transform('t' + [cx , cy] + 's' + scale).center().appendTo(soundButtonG);
    }

    const onClick = async () => {
        if (!mySound) {
            if (sound && sound.soundUrl) {
                mySound = await loadSound(sound.soundUrl);
            } else if (sound && sound.ttsText) {
                mySound = await loadVoice(sound.ttsText.replace(/\$.+?\{(.+?)\}/g, '$1'), 'ko-KR');
            }
        }
        if (startCallback) startCallback(mySound);
        isStopHowler && Howler.stop();
        if (mySound) {
            mySound.play();
            mySound.once('end', () => {
                if (endCallback) endCallback();
            });  
        }
    }
    soundButtonG.click(onClick);

    return {g: g, sound: mySound};
}