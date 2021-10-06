import {
    hint,
    loadSound,
    image,
} from 'sol-common/components'

import {
    // K_partAnimate,
    pathWord,
    simpleHandWrite,
    unPressMakeButton,
    createElement,
    // makeOk,
    tempGuideLine,
    directionText,
} from '../component';

import {Howler} from 'howler';

// 애니메이션 + write 모듈
const KM000013 = async function ({
    canvas,
    direction,
    elements,
    imageButton,
    animateValue,
    handWriteValue,
    callback,

}) {
    tempGuideLine(canvas) // 좌표선 삭제
    const g = canvas.g();
    const backG = g.g();
    const stepOneG = g.g();
    const stepTwoG = g.g().attr('visibility','hidden');

    const ttsG = g.g();
    const imgBtnG=g.g();
    const animateG = stepOneG.g();
    const imgVoice = await loadSound(imageButton.sound.url);
    const fbVoice = await loadSound(handWriteValue.sound.url);

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
    
    if(imageButton.imageInfo){
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
    new unPressMakeButton({
        'el': imgBtnG,
        'isButton':imageButton.isButton,
        'x': imageButton.x,
        'y': imageButton.y,
        'width': imageButton.width, 
        'height': imageButton.height,
        'shadowClassNum':imageButton.shadowClassNum,
        'shadowDx':imageButton.shadowDx,
        'shadowDy':imageButton.shadowDy,
        'shadowBlur':imageButton.shadowBlur,
        'shadowOpacity':imageButton.shadowOpacity,
        'btnFillClassNum' : imageButton.btnFillClassNum,
        'btnStrokeClassNum' : imageButton.btnStrokeClassNum,
        'btnOpacity': imageButton.btnOpacity,
        'btnStrokeWidth': imageButton.btnStrokeWidth,
        'btnR': imageButton.btnR,
        'callback' : async function () {
            console.log(imgVoice);
            Howler.stop();
            imgVoice.play()
            imgVoice.once('end', function () {})                
        }
    })

    // //animate
    // animateValue={ 'scale':1.2, ...animateValue}
    // animateValue.background={"width":350,"height":300,"fillClassNum":"14","strokeClassNum":"no", "opacity":0, "r":10, ...animateValue.background}
    // const animate = new K_partAnimate({
    //     'canvas': animateG,
    //     'cx': animateValue.cx,
    //     'cy': animateValue.cy,
    //     'scale':animateValue.scale,
    //     'text':animateValue.text,
    //     'animateIndex': animateValue.animateIndex,
    //     'bgInfo':animateValue.background,
    //     // 'pathAttr':{'strokeWidth':10},
    //     'callback': function () {
    //         console.log('다음 버튼 나타나기');
    //         nextBtn.start();
    //     }
    // })
    // //다음 버튼
    // const nextBtn = new makeOk({
    //     'canvas': stepOneG,
    //     'type': (animateValue.okButton && animateValue.okButton.type) || 1,
    //     'cx': animateValue.okButton && animateValue.okButton.cx || 755,
    //     'cy': animateValue.okButton && animateValue.okButton.cy || 430,
    //     'scale':animateValue.okButton && animateValue.okButton.scale || 1,
    //     'visibility': false,
    //     'event': false,
    //     'callback':  function(){
    //         // Howler.stop();
    //         console.log('핸드라이트 보이기');
    //         stepOneG.remove()
    //         stepTwoG.attr('visibility','visible');
    //         hw.start();
    //     }
    // });



    //handWrite
    const fakeRectG = stepTwoG.g();
    const handWriteG = stepTwoG.g();
    fakeRectG.rect(handWriteValue.cx,handWriteValue.cy,handWriteValue.width,handWriteValue.height,handWriteValue.rXY,handWriteValue.rXY)
        .addClass('f'+ (handWriteValue.boxFillClassNum || '14') + ' s'+(handWriteValue.boxStrokeClassNum || '01'))
        .center();

    pathWord({
        'canvas':handWriteG,
        'cx': handWriteValue.cx,
        'cy': handWriteValue.cy,
        'textScale':handWriteValue.scale,
        'text': handWriteValue.text,
    });
    const hwEl=handWriteG.selectAll('.path')[handWriteValue.handWriteIndex];
    hwEl.attr('opacity',0.2);
    const hwBBox=hwEl.getTBox();
    const hwOkButton = {
        "type": 0,
        ...handWriteValue.okButton
    };
    const hwUndoButton = {
        'x':handWriteValue.cx+handWriteValue.width/2 + 10,
        'y':handWriteValue.cy+handWriteValue.height/2 - 30 * 2 -10,
        'scale':1,
        ...handWriteValue.undoButton
    };
    const hwResetButton = {
        'x':handWriteValue.cx+handWriteValue.width/2 + 10,
        'y':handWriteValue.cy+handWriteValue.height/2 - 30,
        'scale': 1,
        ...handWriteValue.resetButton
    };
    const hw=new simpleHandWrite({
        'canvas': handWriteG,
        'x': hwBBox.x-5,
        'y': hwBBox.y-5,
        'width': hwBBox.w+10,
        'height': hwBBox.h+10,
        'rXY':0,
        'drawClassNum':handWriteValue.drawClassNum,
        'drawStrokeWidth':handWriteValue.drawStrokeWidth,
        'boxFillClassNum':'14',
        'boxStrokeClassNum':'01',
        'boxOpacity':0,
        'boxStrokeWidth' : handWriteValue.boxStrokeWidth,
        'shadowDx': handWriteValue.shadowDx,
        'shadowDy': handWriteValue.shadowDy,
        'shadowBlur': handWriteValue.shadowBlur,
        'shadowOpacity': handWriteValue.shadowOpacity,
        'shadowClassNum': handWriteValue.shadowClassNum,
        'direction': handWriteValue.direction || false,
        'directionInfo':handWriteValue.directionInfo,
        'startPoint':handWriteValue.startPoint,
        'wordHint':handWriteValue.wordHint,
        'wordHintClassNum':handWriteValue.wordHintClassNum,
        'wordHintOpacity':handWriteValue.wordHintOpacity,
        'wordHintFs':handWriteValue.wordHintFs,
        'dotLine':handWriteValue.dotLine,
        'dotLineClassNum':handWriteValue.dotLineClassNum,
        'dotLineStrokeWidth':handWriteValue.dotLineStrokeWidth,
        'dotLineOpacity':handWriteValue.dotLineOpacity,    
        'okButton':hwOkButton,
        'undoButton':hwUndoButton,
        'resetButton':hwResetButton,
        'answer':handWriteValue.answer,
        callback : function(){
            ttsG.attr('pointerEvents','none');
            imgBtnG.attr('pointerEvents','none');
            Howler.stop();
            fbVoice.play();
            fbVoice.on('end', callback) //종료
        }
    });



    // const hintEl = new hint({
    //     'canvas': g,
    //     'scale': 1,
    //     'type': 0,
    //     'XY': [hwBBox.cx-5, hwBBox.cy-5]
    // })

    //시작
    // animateG.pressEvent(function (bool) {
    //     if (!bool) {
    //         hintEl.removeHint();
    //         animate.start();
    //         imgBtnG.attr('pointerEvents','auto')
    //     }
    // })
}

export default KM000013;