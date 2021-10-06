import Snap from 'sol-common/snap'
import {
    image,
    loadSound
} from 'sol-common/components'

import {
    K_richTextAuto,
    oneConnect,
    K_makeBackground,
    createElement,
    loadSpeakerIcon,
    directionText,
    // tempGuideLine
} from '../component';


// connect 모듈 (1대1)
const KM000007 = function ({
    canvas,
    direction,
    elements,
    soundInfo,
    connectElement,
    fbSpeaker,
    callback,

}) {
    // tempGuideLine(canvas);
    connectElement = {
        "dotSize": 3,
        'lineHint': false,
        'handHint': false,
        'lineClassNum': '04',
        ...connectElement
    };
    const g = canvas.g();
    const backG = g.g();
    const ttsG = g.g();
    const connectG = g.g();
    const fbG=g.g();
    let ttsEl;
    const icon = loadSpeakerIcon();
    const voice = loadSound(soundInfo.url);
    const el = [
        [],
        []
    ];
    const dotOffsets = [
        [],
        []
    ];
    // const button = [];
    const connectAns = [];
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

    //connect element 생성
    //left element
    const speakerImg = [];
    const leftEl = connectElement.left;
    el[0][0] = connectG.g();
    dotOffsets[0][0] = leftEl.connectDotOffsets ? [leftEl.connectDotOffsets.x, leftEl.connectDotOffsets.y] : [0, 0];
    // 배경
    const leftG = el[0][0].g();
    if(leftEl.background){
        new K_makeBackground({
            'group': leftG,
            'el': leftEl
        });
    }
    
    //이미지 존재 시 생성
    if (leftEl.imageInfo) {
        leftEl.imageInfo.forEach(imgMeta => {
            const gg = leftG.g();
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
    //일반 텍스트로 자음,모음 출력
    if (leftEl.textInfo) {
        leftEl.textInfo.forEach(txt => {
            new K_richTextAuto({
                'canvas': leftG,
                'text': txt.text,
                'x': txt.cx,
                'y': txt.cy,
                'className': 'ffng  f' + (txt.classNum || '91'), //선택
                'fontSize': txt.fontSize || 60, //선택
                'dy': txt.dy || 45, //선택
                'isBold': txt.bold || false,
                'options': txt.options,
                'center': true
            });
        })
    }
    const bbox = leftG.getTBox();
    const fbSpeakerX = (fbSpeaker && fbSpeaker.x) || bbox.x + 30;
    const fbSpeakerY = (fbSpeaker && fbSpeaker.y) || bbox.y + 30;
    const fbSpeakerS = (fbSpeaker && fbSpeaker.scale) || 1;
    speakerImg[0] = icon.use()
        .transform(Snap.matrix(fbSpeakerS,0,0,fbSpeakerS,fbSpeakerX, fbSpeakerY))
        .center()
        .appendTo(fbG)
        .attr('opacity', 0);
    connectAns.push(leftEl.connectAnsIndex);

    //right element
    connectElement.right.forEach((connectEl, i) => {
        console.log(connectEl);
        el[1][i] = connectG.g();
        dotOffsets[1][i] = connectEl.connectDotOffsets ? [connectEl.connectDotOffsets.x, connectEl.connectDotOffsets.y] : [0, 0];
        // const group = el[1][i].g();
        //배경
        if(connectEl.background){
            new K_makeBackground({
                'group': el[1][i],
                'el': connectEl
            });
        }
        if (connectEl.textInfo) {
            new K_richTextAuto({
                'canvas': el[1][i],
                'text': connectEl.textInfo.text,
                'x': connectEl.textInfo.cx,
                'y': connectEl.textInfo.cy,
                'className': 'ffng  f' + (connectEl.textInfo.classNum || '91'), //선택
                'fontSize': connectEl.textInfo.fontSize || 60, //선택
                'dy': connectEl.textInfo.dy || 45, //선택
                'isBold': connectEl.textInfo.bold || false,
                'options': connectEl.textInfo.options,
                'center': true
            });
        }
    })
    //연결하기
    const connect = new oneConnect({
        'canvas': connectG,
        'type': 'v',
        'element': el,
        'ans': connectAns,
        'option': {
            'dotSize': connectElement.dotSize,
            'dotOffsets': dotOffsets,
            'strokeColor2': connectElement.lineClassNum // 정답 시 선색
        },
        'dotVisible': true,
        "strokeDashArray": false,
        "isLineColorFb": false,
        "isFalseNoneTouch": false,
        "isLineColorRemind": false,
        'lineHint': [connectElement.lineHint],
        'handHint': connectElement.handHint,
        'connectCallback': async function (nextFunction, dots) {
            const sortDots = dots.sort();
            ttsEl.tts.attr('pointerEvents', 'none');
            speakerImg[sortDots[0]].attr('opacity', 1)
            voice.play();
            voice.on('end', function () {
                speakerImg[sortDots[0]].attr('opacity', 0)
                nextFunction();
            })
        },
        callback: function () {
            // console.log('end');
            setTimeout(function () {
                if (callback) callback();
            }, 300)
        },
    });
    connect.start()

}

export default KM000007;