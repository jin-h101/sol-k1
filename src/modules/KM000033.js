import {
    image,
    loadSound,
    flip,
} from 'sol-common/components'

import {
    // tempGuideLine,
    createElement,
    unPressMakeButton,
    simpleHandWrite,
    directionText
} from '../component';
import {
    Howler
} from 'howler';
// write
const KM000033 = async function ({
    canvas,
    direction,
    elements,
    imageButtons,
    puzzle,
    callback
}) {
    // tempGuideLine(canvas) // 좌표선 삭제
    const g = canvas.g();
    const backG = g.g();
    const ttsG = g.g();
    const imgBtnG = g.g();
    const quizG = g.g();
    const handWriteG = g.g();
    let count = 0;
    const removeEl =[];
    const flipEl= [];
    const hw = [];

    if (imageButtons) {
        for (let z = 0; z < imageButtons.length; z++) {
            if (imageButtons[z].soundInfo) {
                imageButtons[z].voice = loadSound(imageButtons[z].soundInfo.url)
            }
        }
    }

    // 지시문
    if (direction) directionText({'canvas':ttsG, ...direction});

    //배경 존재 시 설정
    if (elements) {
        elements.forEach(el => {
            createElement({
                "type": el.type,
                "canvas": backG,
                "meta": el.meta
            });
        })
    }


    if (imageButtons) {
        imageButtons.forEach((imgButton) => { //이미지 버튼 마다
            const ibG = imgBtnG.g();
            imgButton.imageInfo.forEach(imgEl => {
                const gg = ibG.g();
                if(imgEl.isSpeakerIcon)removeEl.push(gg)
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
            new unPressMakeButton({
                'el': ibG,
                'isButton': imgButton.isButton,
                'x': imgButton.x,
                'y': imgButton.y,
                'width': imgButton.width,
                'height': imgButton.height,
                'shadowClassNum':imgButton.shadowClassNum,
                'shadowDx':imgButton.shadowDx,
                'shadowDy':imgButton.shadowDy,
                'shadowBlur':imgButton.shadowBlur,
                'shadowOpacity':imgButton.shadowOpacity,
                'btnFillClassNum': imgButton.btnFillClassNum,
                'btnStrokeClassNum': imgButton.btnStrokeClassNum,
                'btnOpacity': imgButton.btnOpacity,
                'btnStrokeWidth': imgButton.btnStrokeWidth,
                'btnR': imgButton.btnR,
                'callback': async function () {
                    Howler.stop();
                    imgButton.voice.play()
                    imgButton.voice.once('end', function () {})
                }
            })
        })
    }


    puzzle.forEach((el) => {
        console.log(el.handWriteValue);
        const qG = quizG.g();
        const shapeG = qG.g();
        const wordG = qG.g();
        createElement({
            "type": el.type,
            "canvas": shapeG,
            "meta": el.meta
        });
        if (el.innerWord) {
            if(el.flipElement){
                createElement({
                    "type": el.flipElement.type,
                    "canvas": wordG,
                    "meta": {'cx':el.meta.cx,'cy':el.meta.cy, ...el.flipElement.meta}
                });
            }
            createElement({
                "type": 'text',
                "canvas": wordG,
                "meta": {
                    'x': el.meta.cx,
                    'y': el.meta.cy,
                    'text': el.innerWord,
                    'classNum': el.fontClassNum || (!el.handWriteValue ? '000' : '0002'),
                    'fontSize': el.fontSize || (el.meta && el.meta.height && el.meta.height * 0.6),
                    'bold': el.bold,
                    'center': true
                }
            });
           
            if (el.handWriteValue) {
                const hwElement = makeHW(handWriteG.g(), el.handWriteValue, el.innerWord);
                hwElement.g.attr('opacity',0);
                hw.push(hwElement);
            }

            if(el.flipElement){
                const f = flip({
                    canvas : g,
                    front : shapeG,
                    back : wordG,
                    duration : 500,
                    clickable : false,
                    onFlipping : function(){},
                    onFlipStart: function(){},
                    onFlipEnd: nextCheck
                })
                flipEl.push(f);
            }
        }
    });
    startF(count);


    function makeHW(group, info, ans) {
        const shw = new simpleHandWrite({
            'canvas': group,
            'x': info.x,
            'y': info.y,
            'width': info.width,
            'height': info.height,
            'rXY': info.rXY,
            'drawClassNum': info.drawClassNum,
            'drawStrokeWidth': info.drawStrokeWidth,
            'boxFillClassNum': info.boxFillClassNum,
            'boxStrokeClassNum': info.boxStrokeClassNum,
            'boxOpacity': info.boxOpacity,
            'shadowDx': info.shadowDx,
            'shadowDy': info.shadowDy,
            'shadowBlur': info.shadowBlur,
            'shadowOpacity': info.shadowOpacity,
            'shadowClassNum': info.shadowClassNum,
            'direction': info.direction || true,
            'directionInfo': info.directionInfo,
            'startPoint': info.startPoint,
            'wordHint': info.wordHint || false,
            'wordHintClassNum': info.wordHintClassNum,
            'wordHintOpacity': info.wordHintOpacity,
            'wordHintFs': info.wordHintFs,
            'dotLine': info.dotLine || false,
            'dotLineClassNum': info.dotLineClassNum,
            'dotLineStrokeWidth': info.dotLineStrokeWidth,
            'dotLineOpacity': info.dotLineOpacity,
            'okButton': info.okButton,
            'undoButton': info.undoButton,
            'resetButton': info.resetButton,
            'answer': ans,
            callback: function () {
                btnControl('none');
                hw[count].btnKill();
                removeEl.forEach(reEl => reEl.attr('opacity',0));
                flipEl[count].flip();
            }
        });
        return shw
    }

    function startF(c){
        hw[c].g.attr('opacity',1);
        hw[c].start();
    }

    function nextCheck(){
        if (count < hw.length - 1) {
            console.log(hw[count]);
            hw[count].g.clear();
            count++;
            btnControl('auto');
            removeEl.forEach(reEl => reEl.attr('opacity',1));
            startF(count);
        } else {
            setTimeout(callback, 300);
        }
    }
  
    function btnControl (type){
        ttsG.attr('pointerEvents',type);
        imgBtnG.attr('pointerEvents',type);
    }

}

export default KM000033;