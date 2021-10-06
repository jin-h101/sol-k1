import Snap from 'sol-common/snap'
import {
    image,
    loadSound
} from 'sol-common/components'

import {
    oneConnect,
    // tempGuideLine,
    wordMatchPath,
    pathList,
    K_makeBackground,
    blankPathWord,
    createElement,
    loadSpeakerIcon,
    directionText
} from '../component';

import {
    Howler
} from 'howler';

// connect 모듈 (1대1)
const KM000019 = function ({
    canvas,
    direction,
    elements,
    connectElement,
    soundInfo,
    fbSpeaker,
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
    const btnSpeakerSize = Math.min(connectElement.leftEl.background.width, connectElement.leftEl.background.height) / 5 // 너비 및 높이의 최소값의 1/5
    const btnGap = {"x":10, "y":20};
    const speakerX = (fbSpeaker&&fbSpeaker.x) || (connectElement.leftEl.background.cx - connectElement.leftEl.background.width/2 + btnSpeakerSize / 2 + btnGap.x);
    const speakerY = (fbSpeaker&&fbSpeaker.y) || (connectElement.leftEl.background.cy - connectElement.leftEl.background.width/2 + btnSpeakerSize / 2 + btnGap.y);
    const speakerS = (fbSpeaker&&fbSpeaker.scale) || (1 * btnSpeakerSize / 30) // 공통에 스피커 이미지 사이즈가 30
    const speakerImg = icon.use()
      .transform(Snap.matrix(speakerS, 0, 0, speakerS, speakerX, speakerY))
      .center()
      .appendTo(g)
      .attr('opacity',0);

    connetEl[0][0] = connectG.g();
    const isLoffset = connectElement.leftEl.connectDotOffsets;
    dotOffsets[0][0] = isLoffset ? [connectElement.leftEl.connectDotOffsets.x, connectElement.leftEl.connectDotOffsets.y] : [0, 0];
    //배경 생성
    new K_makeBackground({
        'group':connetEl[0][0],
        'el':connectElement.leftEl
    });
    // 사각형 존재 시
    if(connectElement.leftEl.rectInfo){
        connectElement.leftEl.rectInfo.forEach(rMeta => {
            connetEl[0][0].rect(rMeta.x, rMeta.y, rMeta.width, rMeta.height, (rMeta.r || 0), (rMeta.r || 0))
                            .addClass('f'+ (rMeta.fillClassNum || '021') + ' s'+(rMeta.strokeClassNum || 'no'))
                            .attr({
                                'opacity': rMeta.opacity || 1,
                                'strokeWidth':rMeta.strokeWidth || 1
                            })
        });
    }
    //이미지 존재 시 생성
    if(connectElement.leftEl.imageInfo){
        connectElement.leftEl.imageInfo.forEach(imgMeta => {
            const gg = connetEl[0][0].g();
            image({
                'canvas': gg,
                'x': imgMeta.cx,
                'y': imgMeta.cy,
                'img': imgMeta.img,
                'center': true
            });
            if(imgMeta.img && imgMeta.img.rotate) gg.transform('r'+imgMeta.img.rotate)
        });
    }
    //텍스트 존재 시
    if(connectElement.leftEl.textInfo){
        fbEl=blankPathWord({
            'canvas' :connetEl[0][0],
            'pathScale' : connectElement.leftEl.textInfo.scale,
            'pathClassNum' : connectElement.leftEl.textInfo.classNum,
            ...connectElement.leftEl.textInfo,
        })
    }

    //right 영역 생성
    connectElement.rightEl.forEach((el,t)=>{
        connetEl[1][t] = connectG.g();
        const isRoffset = el.connectDotOffsets
        dotOffsets[1][t] = isRoffset ? [el.connectDotOffsets.x, el.connectDotOffsets.y] : [0, 0]

        new K_makeBackground({
            'group':connetEl[1][t],
            'el':el
        });
        const elementG=connetEl[1][t].g();
        const pathArr=wordMatchPath(el.textInfo.text,pathList).pathImg;
        const pathScale = el.textInfo.scale || 1
        const pathClassNum = el.textInfo.classNum || '001'

        pathArr.forEach((pathD)=>{
            pathD.forEach(pD=>{
                elementG.path(pD).addClass('f' + pathClassNum +' sno')
            })
        })
        elementG.transform(Snap.matrix(pathScale, 0, 0, pathScale, el.textInfo.cx, el.textInfo.cy))
                .center()
    })


    //연결하기
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

export default KM000019;