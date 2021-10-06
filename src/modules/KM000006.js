import Snap from 'sol-common/snap'
import {
    hint,
    loadSound,
} from 'sol-common/components'

import {
    simpleTrace,
    wordMatchPath,
    pathList,
    K_simpleAnimate,
    createElement,
    penCountImage,
    directionText,
    // tempGuideLine
} from '../component';

import {
    Howler
} from 'howler';
import { SOL } from 'sol-common/util';

// 애니메이션 + trace 모듈
const KM000006 = function ({
    canvas = SOL.SVG,
    direction,
    background,
    animateValue,
    traceValue,
    callback,

}) {
    // tempGuideLine(canvas) // 좌표선 삭제
    const g = canvas.g();
    const backG = g.g();
    const ttsG = g.g();
    const animateG = g.g();
    const traceG = g.g();
    const markG = g.g();
    const penG=markG.g();

    // 지시문
    if (direction) directionText({'canvas':ttsG, ...direction});

    //배경 존재 시 설정
    if(background && background.element){
        background.element.forEach(el=>{
            createElement({
                "type": el.type,
                "canvas": backG,
                "meta": el.meta
            });
        })
    }

    //animate
    // const testW='테스트ㄱ'
    // const testW='ㄱ'
    // animateValue.text=testW // 패스 테스트용
    // animateValue.guideInfo={'scale':1,'offset':[{'x':0,'y':0}]} // 테스트용

    const animateT = wordMatchPath(animateValue.text, pathList);
    const aniScale = (animateValue.scale || 1) * 3; //기본이 3배
    const aniPathAttr = {
        "class": 'fno s' + (animateValue.pathAttr && animateValue.pathAttr.classNum || '04'),
        "strokeWidth": (animateValue.pathAttr && animateValue.pathAttr.strokeWidth) || 13
    }
    const guideAttr = {
        "class": 'fno s' + (animateValue.guideAttr && animateValue.guideAttr.classNum || '03')
    }

    let newAniPath = [];
    animateT.path.forEach(el => newAniPath = newAniPath.concat(el));
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
        'pathAttr': aniPathAttr,
        'guide': animateT.guide,
        'guideAttr': guideAttr,
        'guideInfo': animateValue.guideInfo,
        'matrix': Snap.matrix(aniScale, 0, 0, aniScale, animateValue.cx, animateValue.cy),
        'strokeNoCutIndex':animateT.strokeNoCutIndex,
        'callback': function () {
            // console.log('animate-end');
            trace[currentTraceCount].start();
        }
    })
    //trace
    // traceValue.text=testW // 패스 테스트용
    const voice = loadSound(traceValue.sound.url);
    const trace = [];
    const traceT = wordMatchPath(traceValue.text, pathList);
    let newTraPath = [];
    traceT.path.forEach(el => newTraPath = newTraPath.concat(el));
    const traScale = (traceValue.scale || 1) * 3; //기본이 3배
    const isTraBack = traceValue.background && traceValue.background.width && traceValue.background.height;
    const traBgInfo = {
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
    const penGroup=penCountImage({
        'canvas':penG,
        'type':0,
        'count': traceValue.repeat,
        'cx' : traceValue.repeatIconInfo && traceValue.repeatIconInfo.cx,
        'cy' : traceValue.repeatIconInfo && traceValue.repeatIconInfo.cy,
        'gap': traceValue.repeatIconInfo && traceValue.repeatIconInfo.gap,
        'scale': traceValue.repeatIconInfo && traceValue.repeatIconInfo.scale
    })
    for (let z = 0; z < traceValue.repeat; z++) {
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
        ttsG.attr('pointerEvents', 'none');
        Howler.stop();
        voice.play();
        voice.once('end', function(){
            if (currentTraceCount < traceValue.repeat - 1) {
                trace[currentTraceCount].remove();
                currentTraceCount++;
                trace[currentTraceCount].start();
                ttsG.attr('pointerEvents', 'auto');
                // console.log('trace-end');
            } else {
                callback()//종료
            }
        }) 
    }

    const hintEl = new hint({
        'canvas': g,
        'scale': 1,
        'type': 0,
        'XY': [animateValue.cx, animateValue.cy - 5]
    })

    //시작
    animateG.pressEvent(function (bool) {
        if (!bool) {
            hintEl.removeHint();
            animate.start();
        }
    })
}

export default KM000006;