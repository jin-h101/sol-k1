import {
    image,
    loadSound,
} from 'sol-common/components'

import {
    simpleHandWrite,
    blankPathWord,
    createElement,
    // tempGuideLine,
    unPressMakeButton,
    blankWord,
    directionText,
    multiPointerControl
} from '../component';

import {
    Howler
} from 'howler';

// write 모듈(자,모음)
const KM000008 = async function ({
    canvas,
    direction,
    elements,
    imageButton,
    handWriteValue,
    fbInfo,
    callback,

}) {
    // tempGuideLine(canvas);

    const g = canvas.g();
    const backG = g.g();
    const ttsG = g.g();
    const backfbG = backG.g();
    const backhiddenG = backG.g();
    const imgBtnG = g.g();
    const imgG = imgBtnG.g();
    const elG = imgG.g();
    const hiddenG = imgG.g();
    const visibleG = imgG.g();
    const fbImgG = imgG.g();
    const textG = imgBtnG.g();
    const handWriteG = g.g();
    let fbEl;
    //음성 파일 로드
    const imgVoice = await loadSound(imageButton.soundInfo.url);
    const voice = await loadSound(handWriteValue.sound.url);
    
    // 지시문
    if (direction) directionText({'canvas':ttsG, ...direction});

    //배경 존재 시 설정
    if(elements){
        elements.forEach(el=>{
            const group = el.lastRemain ? backfbG : backhiddenG
            createElement({
                "type": el.type,
                "canvas": group,
                "meta": el.meta
            });
        })
    }

    // 그림 이미지
    if(imageButton){
        if(imageButton.createElement){
            imageButton.createElement.forEach(el=>{
                createElement({
                    "type": el.type,
                    "canvas": elG,
                    "meta": el.meta
                });
            })
        }

        if(imageButton.imageInfo){
            imageButton.imageInfo.forEach((el) => {
                const group = el.fbImg ? fbImgG : (el.lastRemain? visibleG: hiddenG)
                const gg = group.g();
                image({
                    'canvas': gg,
                    'x': el.cx,
                    'y': el.cy,
                    'img': el,
                    'center': true
                });
                if(el.rotate) gg.transform('r'+el.rotate)
            });
        }
        if(imageButton.textInfo){
            if(imageButton.textInfo.blankType === 'jamo'){
                fbEl=blankPathWord({
                    'canvas' :textG,
                    'pathScale' : imageButton.textInfo.scale,
                    'pathClassNum' : imageButton.textInfo.classNum,
                    ...imageButton.textInfo
                })
            }else if (imageButton.textInfo.blankType === 'word'){
                fbEl=blankWord({
                    'canvas' :textG,
                    ...imageButton.textInfo
                })
            }
            
        }
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

    //handWrite
    const hw=new simpleHandWrite({
        'canvas': handWriteG,
        'x': handWriteValue.x,
        'y': handWriteValue.y,
        'width': handWriteValue.width,
        'height': handWriteValue.height,
        'rXY': handWriteValue.rXY,
        'drawClassNum': handWriteValue.drawClassNum,
        'drawStrokeWidth': handWriteValue.drawStrokeWidth,
        'boxFillClassNum': handWriteValue.boxFillClassNum,
        'boxStrokeClassNum': handWriteValue.boxStrokeClassNum,
        'boxOpacity': handWriteValue.boxOpacity,
        'boxStrokeWidth' : handWriteValue.boxStrokeWidth,
        'shadowDx': handWriteValue.shadowDx,
        'shadowDy': handWriteValue.shadowDy,
        'shadowBlur': handWriteValue.shadowBlur,
        'shadowOpacity': handWriteValue.shadowOpacity,
        'shadowClassNum': handWriteValue.shadowClassNum, 
        'direction': handWriteValue.direction || true,
        'directionInfo': handWriteValue.directionInfo,
        'startPoint': handWriteValue.startPoint || false,
        'wordHint': handWriteValue.wordHint || false,
        'wordHintClassNum': handWriteValue.wordHintClassNum,
        'wordHintOpacity': handWriteValue.wordHintOpacity,
        'wordHintFs': handWriteValue.wordHintFs,
        'dotLine': handWriteValue.dotLine || false,
        'dotLineClassNum': handWriteValue.dotLineClassNum,
        'dotLineStrokeWidth': handWriteValue.dotLineStrokeWidth,
        'dotLineOpacity': handWriteValue.dotLineOpacity,
        'okButton': handWriteValue.okButton,
        'undoButton': handWriteValue.undoButton,
        'resetButton':handWriteValue.resetButton,
        'answer':handWriteValue.answer,
        callback : next
    });

    hw.start();
    
    //다음 단계 함수
    function next() {
        handWriteG.clear();
        multiPointerControl({'elements':[ttsG,imgBtnG],'state':'none'});
        hiddenG.attr('opacity',0);
        backhiddenG.attr('opacity',0);
        fbEl.boxG.attr('opacity',0);
        fbEl.hiddenEl.attr('opacity',1);
        const currentImagePoisition = fbImgG.getTBox()
        const currentTextPoisition = textG.getTBox()
        const newImgXY = [(fbInfo.image && fbInfo.image.cx || 250), (fbInfo.image && fbInfo.image.cy || 250)]
        const newTextXY = [(fbInfo.text && fbInfo.text.cx || 550), (fbInfo.text && fbInfo.text.cy || 250)]
        const newImgS = fbInfo.image && fbInfo.image.scale || 1.3;
        const newTextS = fbInfo.text && fbInfo.text.scale || 1.3;
        let gapC=0;
        textG.selectAll('.lastText').forEach((el,i)=>{
            if(i!==0){
                const gap = (fbInfo.text && fbInfo.text.gap && fbInfo.text.gap[i-1]) || 0;
                gapC = gapC + gap;
                console.log(gap,el.transform().local,newImgS);
                el.transform(el.transform().local + 't'+[gapC,0]);
            }
        })
        setTimeout(function () {
            //이미지 부분 애니메이션
            fbImgG.animate({
                'transform': 't' + [newImgXY[0] - currentImagePoisition.cx, newImgXY[1] - currentImagePoisition.cy] + ' s' + newImgS
            }, 300)
            //텍스트 부분 애니메이션
            textG.animate({
                'transform': 't' + [newTextXY[0] - currentTextPoisition.cx, newTextXY[1] - currentTextPoisition.cy] + ' s' + newTextS
            }, 300, async function () {
                // fbEl.boxG.attr('opacity', 0);
                for (let t = 0; t < 5; t++) { //해당 낱자 2번 깜박이게 하기
                    await wait(300);
                    fbEl.hiddenEl.attr('opacity', 1 - t%2)
                    if (t === 4) { //마지막 읽어주기
                        Howler.stop();
                        voice.play();
                        voice.on('end', callback) //종료
                    }
                }
            });
        }, 300)
    }
    async function wait(ms) {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        });
    }
}
export default KM000008;