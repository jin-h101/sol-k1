import {
    rect,
    ellipse,
    arrow
} from 'sol-common/components'

import {
    // tts,
    K_richTextAuto,
    createElement,
    makeOk,
    directionText,
    multiPointerControl
} from '../component';
import { SOL } from 'sol-common/util';

//학습 개요 모듈(rect,circle,arrow, ...)
const KM000002 = function ({
    canvas = SOL.SVG,
    direction,
    elements,
    rectInfo,
    ellipseInfo,
    arrowInfo,
    contentText,
    okButton,
    callback,

}) {

    okButton = {
        'cx': 400,
        'cy': 450,
        'type': 0,
        ...okButton
    };
    const g = canvas.g();
    const backG = g.g();
    const ttsG = g.g();
    const textG = g.g();

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

    if(rectInfo){
        rectInfo.forEach(el=>new rect({
            'x': el.x,
            'y': el.y,
            'width': el.width,
            'height': el.height,
            'rx': el.rx || 30,
            'ry': el.ry || 30,
            'className': 'f'+(el.fillClassNum || '111')+' s'+(el.strokeClassNum || 'no'),
            'opacity': el.opacity || 0.3,
            'canvas': backG
        }))
    }
    

    if(ellipseInfo){
        ellipseInfo.forEach(el => new ellipse({
            "x": el.x,
            "y": el.y,
            "rx": el.rx || 50,
            "ry": el.ry || 30,
            'className': 'f'+(el.fillClassNum || '111')+' s'+(el.strokeClassNum || 'no'),
            'opacity': el.opacity || 0.3,
            "canvas": backG
        }))
    }

    if(arrowInfo){
        arrowInfo.forEach(el => new arrow({
            "pointX": el.x,
            "pointY": el.y,
            "length": el.len,
            "width": el.width || 3,
            "d": el.d || 0,
            "r": el.r || 0,
            "classNumber": el.classNum || "112",
            'canvas': backG
        }))
    }

    contentText.forEach((el) => {
        new K_richTextAuto({
            'canvas': textG,
            'text': el.text,
            'x': el.x,
            'y': el.y,
            'className': 'ffng f'+ (el.classNum || '0004'),
            'fontSize': el.fontSize || 18,
            'dy': el.dy || 35,
            'textLength':el.textLength || undefined,
            'options' : el.options,
            'isBold': el.bold || false,
        });
    });

    new makeOk({
        'canvas': g,
        'type': okButton.type,
        'cx': okButton.cx,
        'cy': okButton.cy,
        'scale':okButton.scale,
        'visibility': true,
        'event': true,
        'callback': function() {
            multiPointerControl({'elements':[ttsG],'state':'none'});
            setTimeout(callback,500);
        }
    });
}

export default KM000002;