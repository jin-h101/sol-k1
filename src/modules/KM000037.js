import {
    oneConnect,
    createElement,
    directionText,
    // tempGuideLine
} from '../component';
import { Howler } from 'howler';
import { loadSound } from 'sol-common';

// 끝말 잇기
const KM000037 = async function ({
    canvas,
    direction,
    elements,
    connectElement,
    lastFeedback,
    callback
}) {
    // tempGuideLine(canvas) // 좌표선 삭제
    const g = canvas.g();
    const firstG = g.g();
    const secondG = g.g().attr('visibility','hidden');
    const ttsG = g.g();
    const backG = firstG.g();
    const connectG = firstG.g();
    const connetEl = [
        [],
        []
    ];
    const dotOffsets = [
        [],
        []
    ];
    let voice 
    if(lastFeedback && lastFeedback.soundInfo) voice = await loadSound(lastFeedback.soundInfo.url);

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

    //left 영역 생성
    connetEl[0][0] = connectG.g();
    const isLoffset = connectElement.leftEl.connectDotOffsets;
    dotOffsets[0][0] = isLoffset ? [connectElement.leftEl.connectDotOffsets.x, connectElement.leftEl.connectDotOffsets.y] : [0, 0];
    connectElement.leftEl.elements.forEach(el=>{
        createElement({
            "type": el.type,
            "canvas": connetEl[0][0],
            "meta": el.meta
        })
    });

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

    if(lastFeedback){
        lastFeedback.elements.forEach(el => {
            createElement({
                "type": el.type,
                "canvas": secondG,
                "meta": el.meta
            });
        });
    }

    const connect = new oneConnect({
        'canvas': connectG,
        'type': 'v',
        'element': connetEl,
        'ans': [connectElement.leftEl.connectAnsIndex],
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
        callback: function () {
            console.log('end');
            ttsG.attr('pointerEvents','none')
            firstG.attr('visibility','hidden');
            secondG.attr('visibility','visible');
            if(voice){
                Howler.stop();
                voice.play()
                voice.once('end', callback)    
            }else{
                callback();
            }
        },
    });

//처음 시작
connect.start();
  
}

export default KM000037;
