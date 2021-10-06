import {
    loadSound,
} from 'sol-common/components'

import {
    createElement,
    makeOk,
    // tempGuideLine,
    unPressMakeButton,
    directionText,
    multiPointerControl,
} from '../component';

import {
    Howler
} from 'howler';
import { SOL } from 'sol-common/util';


// 자모음 개념, 버튼(음성설명)
const KM000004 = async function ({
    canvas = SOL.SVG,
    direction,
    background,
    listenButton,
    okButton,
    callback,

}) {
    // tempGuideLine(canvas);
    const g = canvas.g();
    const backG = g.g();
    const ttsG = g.g();
    const buttonG = g.g();
    const voice = await loadSound(listenButton.sound.url);

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
    //버튼
    if(listenButton && listenButton.element){
        listenButton.element.forEach(el=>{
            createElement({
                "type": el.type,
                "canvas": buttonG,
                "meta": (el.type==='text' ? {'bold':true, 'center':true, 'lineCenter':true, ...el.meta} : el.meta)
            });
        })
    }
    
    new unPressMakeButton({
        'el': buttonG,
        'isButton': true,
        'x': listenButton.cx - listenButton.width/2,
        'y': listenButton.cy - listenButton.height/2,
        'width': listenButton.width,
        'height': listenButton.height,
        'btnR': listenButton.btnR || 10,
        'shadowClassNum':listenButton.shadowClassNum,
        'shadowDx':listenButton.shadowDx,
        'shadowDy':listenButton.shadowDy,
        'shadowBlur':listenButton.shadowBlur,
        'shadowOpacity':listenButton.shadowOpacity,
        'isHint':true,
        'callback':function () {
            multiPointerControl({'elements':[ttsG,buttonG],'state':'none'});
            Howler.stop();
            voice.play()
            voice.once('end', function () {
                multiPointerControl({'elements':[ttsG,buttonG],'state':'auto'});
                if (!firstClick) {
                    firstClick = true;
                    ok.start();
                }
            })
        }
    })

    //ok 버튼
    let firstClick = false;

    const ok = new makeOk({
        'canvas': g,
        'type': okButton.type,
        'cx': okButton.cx,
        'cy': okButton.cy,
        'scale':okButton.scale,
        'visibility': true,
        'callback':  function () {
            Howler.stop();
            callback();
        }
    });
}

export default KM000004;