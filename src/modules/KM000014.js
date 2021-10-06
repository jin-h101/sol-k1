import Snap from 'sol-common/snap'
import {
    hint,
    loadSound,
    image,
} from 'sol-common/components'

import {
    K_richTextAuto,
    // tempGuideLine, // 삭제
    namumgodicGap,
    wordMatchPath,
    pathList,
    K_simpleAnimate,
    simpleTrace,
    unPressMakeButton,
    createElement,
    penCountImage,
    directionText,
} from '../component';

import {
    Howler
} from 'howler';

// 애니메이션 + trace 모듈(낱자)
const KM000014 = async function ({
    canvas,
    direction,
    elements,
    imageButton,
    animateValue,
    traceValue,
    callback,

}) {
    // tempGuideLine(canvas) // 좌표선 삭제
    const g = canvas.g();
    const backG = g.g();
    const stepOneG = g.g();

    const ttsG = g.g();
    const imgBtnG = g.g();
    const animateG = stepOneG.g();
    const markG = stepOneG.g();
    const traceG = stepOneG.g();

    const imgVoice = await loadSound(imageButton.sound.url);
    const traVoice = await loadSound(traceValue.sound.url);

    // 지시문
    if (direction) directionText({'canvas':ttsG, ...direction});

    //배경 존재 시 설정
    if(elements){
        elements.forEach(el=>{
            createElement({
                "type": el.type,
                "canvas": backG,
                "meta": el.meta
            });
        })
    }

    if (imageButton.imageInfo) {
        imageButton.imageInfo.forEach(imgEl => {
            const gg = imgBtnG.g();
            new image({
                'canvas': gg,
                'x': imgEl.cx,
                'y': imgEl.cy,
                'img': {
                    'scale': 1,
                    ...imgEl.img
                },
                'center': true
            });
            if(imgEl.img && imgEl.img.rotate) gg.transform('r'+imgEl.img.rotate)
        });
    }
    const textG = imgBtnG.g();
    for (let z = 0; z < imageButton.textInfo.text.length; z++) {
        const fs = imageButton.textInfo.fontSize || 20
        const classColor = imageButton.textInfo.focusClass && imageButton.textInfo.focusIndex === z 
                            ? imageButton.textInfo.focusClass 
                            : (imageButton.textInfo.classNum || '91')
        new K_richTextAuto({
            'canvas': textG,
            'text': imageButton.textInfo.text[z],
            'x': 0 + z * namumgodicGap(fs),
            'y': 0,
            'className': 'ffng f' + classColor, //선택
            'fontSize': fs, //선택
            'dy': imageButton.textInfo.dy || 45, //선택
            'isBold': imageButton.textInfo.bold || false,
            'options': imageButton.textInfo.options,
        });
    }
    textG.transform('t' + [imageButton.textInfo.cx, imageButton.textInfo.cy]).anchor('center');

    new unPressMakeButton({
        'el': imgBtnG,
        'isButton': imageButton.isButton,
        'x': imageButton.x,
        'y': imageButton.y,
        'width': imageButton.width,
        'height': imageButton.height,
        'shadowClassNum':imageButton.shadowClassNum,
        'shadowDx':imageButton.shadowDx,
        'shadowDy':imageButton.shadowDy,
        'shadowBlur':imageButton.shadowBlur,
        'shadowOpacity':imageButton.shadowOpacity,
        'btnFillClassNum': imageButton.btnFillClassNum,
        'btnStrokeClassNum': imageButton.btnStrokeClassNum,
        'btnOpacity': imageButton.btnOpacity,
        'btnStrokeWidth': imageButton.btnStrokeWidth,
        'btnR': imageButton.btnR,
        'callback': async function () {
            console.log(imgVoice);
            Howler.stop();
            imgVoice.play()
            imgVoice.once('end', function () {})
        }
    })



    //animate
    // const testW='조'
    // animateValue.text=testW // 패스 테스트용
    // traceValue.text=testW // 패스 테스트용
    // animateValue.scale=0.8
    const animateT = wordMatchPath(animateValue.text, pathList);
    const aniScale = (animateValue.scale || 1) * 1.8;
    let newAniPath = [];
    animateT.path.forEach(el => newAniPath = newAniPath.concat(el)); //순서 맞추기 위한 조정
    const isAniBack = animateValue.background && animateValue.background.width && animateValue.background.height;
    const aniBgInfo = {
        'width': undefined,
        'height': undefined,
        'fillClassNum': '117',
        'strokeClassNum': 'no',
        'opacity': 1,
        'exist': isAniBack,
        ...animateValue.background
    }

    const animate = new K_simpleAnimate({
        'canvas': animateG,
        'bgInfo': aniBgInfo,
        'pathStr': newAniPath,
        'guide': animateT.guide,
        'guideNumberOffset': animateT.guideNumberOffset,
        'matrix': Snap.matrix(aniScale, 0, 0, aniScale, animateValue.cx, animateValue.cy),
        'strokeNoCutIndex':animateT.strokeNoCutIndex,
        'callback': function () {
            trace[currentTraceCount].start();
        }
    })

    //trace
    const trace = [];
    const traceT = wordMatchPath(traceValue.text, pathList);
    const traScale = (traceValue.scale || 1) * 1.8;
    let newTraPath = [];
    traceT.path.forEach(el => newTraPath = newTraPath.concat(el));
    const isTraBack = traceValue.background && traceValue.background.width && traceValue.background.height;
    const traBgInfo = {
        "cx":traceValue.cx,
        "cy":traceValue.cy,
        'width': undefined,
        'height': undefined,
        'fillClassNum': {
            "basic": "117",
            "start": "14"
        },
        'strokeClassNum': {
            "basic": "01",
            "start": "01"
        },
        'opacity': 1,
        'exist': isTraBack,
        ...traceValue.background
    }
    let currentTraceCount = 0;
    const penRepeat = traceValue.repeat;
    const penGap = traceValue.repeatIconInfo && traceValue.repeatIconInfo.gap;
    const penS = traceValue.repeatIconInfo && traceValue.repeatIconInfo.scale;
    const penCx = traceValue.repeatIconInfo && traceValue.repeatIconInfo.cx || (traBgInfo.cx + traBgInfo.width/2 + 20); //거리 간격 10, 기본 스케일의 반 10
    const penCy = traceValue.repeatIconInfo && traceValue.repeatIconInfo.cy || (traBgInfo.cy - traBgInfo.height/2 + 20 + (penRepeat * 15)) //거리 간격 10, 기본 스케일의 반 10
    const penGroup=penCountImage({
        'canvas':markG,
        'type':0,
        'count': penRepeat,
        'cx' : penCx,
        'cy' : penCy,
        'gap': penGap,
        'scale': penS
    })// 반복횟수 연필 정보
    for (let z = 0; z < penRepeat; z++) {
        trace[z] = new simpleTrace({
            'canvas': traceG,
            'pathStr': newTraPath,
            'bgInfo': traBgInfo,
            'matrix': Snap.matrix(traScale, 0, 0, traScale, traceValue.cx, traceValue.cy),
            'strokeNoCutIndex':traceT.strokeNoCutIndex,
            'visible': z === 0,
            'callback': nextTrace
        });
    }

    //다음 trace 판단
    function nextTrace() {
        penGroup.selectAll('.penIcon')[currentTraceCount].children().forEach((el, i) => {
            el.attr('opacity', 1 - i)
        })
        Howler.stop();
        traVoice.play();
        traVoice.once('end', function () {
            if (currentTraceCount < penRepeat - 1) {
                trace[currentTraceCount].remove();
                currentTraceCount++;
                trace[currentTraceCount].start();
                
            } else {
                ttsG.attr('pointerEvents', 'none');
                imgBtnG.attr('pointerEvents', 'none');
                callback(); //종료
            }
        })
    }

    const hintEl = new hint({
        'canvas': g,
        'scale': 1,
        'type': 0,
        'XY': [animateG.getTBox().cx, animateG.getTBox().cy]
    })

    // //시작
    animateG.pressEvent(function (bool) {
        if (!bool) {
            hintEl.removeHint();
            animate.start();
            imgBtnG.attr('pointerEvents', 'auto')
        }
    })
}

export default KM000014;