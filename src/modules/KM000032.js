import Snap from 'sol-common/snap'
import {
    loadSound
} from 'sol-common/components'

import {
    oneConnect,
    // tempGuideLine,
    createElement,
    loadSpeakerIcon,
    blankWord,
    directionText
} from '../component';

import {
    Howler
} from 'howler';

// 낱자학습 도임_match
const KM000032 = function ({
    canvas,
    direction,
    elements,
    connectElement,
    soundInfo,
    fbSpeaker,
    fbTextGap,
    callback,
}) {
    // tempGuideLine(canvas);
    connectElement = {
        'dotSize':5,
        'lineHint': false,
        'handHint': false,
        'lineClassNum':'04',
        ...connectElement
    };
    const g = canvas.g();
    const backG = g.g();
    const ttsG = g.g();
    const connectG = g.g();
    const icon = loadSpeakerIcon();
    const connetEl = [
        [],
        []
    ];
    const dotOffsets = [
        [],
        []
    ];
    let ttsEl;

    //지시문
    if (direction) ttsEl = directionText({'canvas':g, 'textG':ttsG, ...direction});

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

    //left 영역 생성
    let fbEl;
    const voice = loadSound(soundInfo.url);
    connetEl[0][0] = connectG.g();
    const isLoffset = connectElement.leftEl.connectDotOffsets;
    dotOffsets[0][0] = isLoffset ? [connectElement.leftEl.connectDotOffsets.x, connectElement.leftEl.connectDotOffsets.y] : [0, 0];

    connectElement.leftEl.background.forEach(el=>{
        createElement({
            "type": el.type,
            "canvas": connetEl[0][0],
            "meta": el.meta
        })
    })
    fbEl=blankWord({
        'canvas' :connetEl[0][0],
        ...connectElement.leftEl.textInfo
    }) 
    const elBBox = connetEl[0][0].getTBox();
    const speakerX = (fbSpeaker&&fbSpeaker.x) || elBBox.x + 20;
    const speakerY = (fbSpeaker&&fbSpeaker.y) || elBBox.y + 20;
    const speakerS = (fbSpeaker&&fbSpeaker.scale) || 1 // 공통에 스피커 이미지 사이즈가 30
    const speakerImg = icon.use()
      .transform(Snap.matrix(speakerS, 0, 0, speakerS, speakerX, speakerY))
      .appendTo(g)
      .attr('opacity',0);
      

    //right 영역 생성
    connectElement.rightEl.forEach((el,t)=>{
        connetEl[1][t] = connectG.g();
        const isRoffset = el.connectDotOffsets
        dotOffsets[1][t] = isRoffset ? [el.connectDotOffsets.x, el.connectDotOffsets.y] : [0, 0]

        el.element.forEach(shapeEl=>{
            createElement({
                "type": shapeEl.type,
                "canvas": connetEl[1][t],
                "meta": shapeEl.meta
            })
        })
    })


    //연결하기 (단순 연결)
    const connectAns = [connectElement.leftEl.connectAnsIndex]
    const connect = new oneConnect({
        'canvas': connectG,
        'type': 'v',
        'element': connetEl,
        'ans': connectAns,
        'option': {
            'dotSize' : connectElement.dotSize,
            'dotOffsets': dotOffsets,
            'strokeColor2':connectElement.lineClassNum // 정답 시 선색
        },
        'dotVisible':true,
        "strokeDashArray": false,
        "isLineColorFb":true,
        "isFalseNoneTouch":true,
        "isLineColorRemind": false,
        'lineHint': [connectElement.lineHint],
        'handHint': connectElement.handHint,
        'connectCallback': async function (nextFunction) {
                fbEl.boxG.attr('opacity', 0);
                console.log(fbEl.wordArray);
                fbEl.wordArray.forEach((wordG,i)=>{
                    const gap = fbTextGap && fbTextGap[i] || [0,0]
                    wordG.transform(wordG.transform().local + 't' + gap);
                })
                fbEl.hiddenEl.attr('opacity', 1)
                ttsEl.tts.attr('pointerEvents','none');
                setTimeout(function(){
                    speakerImg.attr('opacity',1);
                    Howler.stop();
                    voice.play();
                    voice.once('end', function () {
                        speakerImg.attr('opacity',0);
                        nextFunction();
                    });
                },500);
        },
        callback: function () {
            console.log('end');
            setTimeout(function () {
                Howler.stop();
                if(callback) callback();
            }, 300)
        },
    });
    connect.start()
}

export default KM000032;