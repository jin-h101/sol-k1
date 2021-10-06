import {
    image,
    loadSound,
} from 'sol-common/components'

import {
    K_richTextAuto,
    namumgodicGap,
    // tempGuideLine,
    nTimesHandWrite,
    unPressMakeButton,
    createElement,
    penCountImage,
    directionText
} from '../component';

import {
    Howler
} from 'howler';


const KM000024 = async function ({
    canvas,
    direction,
    elements,
    imageButton,
    handWriteValue,
    callback,

}) {
    // tempGuideLine(canvas);

    const g = canvas.g();
    const backG = g.g();
    const ttsG = g.g();
    const imgBtnG = g.g();
    const textG = imgBtnG.g();
    const markG = g.g();
    const handWriteG = g.g();
    const imgVoice = await loadSound(imageButton.soundInfo.url);
    const handWriteVoice = await loadSound(handWriteValue.soundInfo.url);
    const handWrite = [];
    let count = 0;
    
    // 1. 지시문
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

    // 2. 이미지 버튼 만들기
    if (imageButton.imageInfo) {
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

    for (let z = 0; z < imageButton.textInfo.text.length; z++) {
        const fs = imageButton.textInfo.fontSize || 20
        const classColor = imageButton.textInfo.focusClass && imageButton.textInfo.focusIndex=== z 
                            ? imageButton.textInfo.focusClass 
                            : (imageButton.textInfo.classNum ||'91');
        new K_richTextAuto({
            'canvas': textG,
            'text': imageButton.textInfo.text[z],
            'x': 0 + z * namumgodicGap(fs),
            'y': 0,
            'className': 'ffng f' + classColor, //선택
            'fontSize': fs, //선택
            'dy': imageButton.textInfo.dy || 45, //선택
            'isBold': imageButton.textInfo.bold || false,
            'options': imageButton.textInfo.options
        });
    }
    textG.transform('t' + [imageButton.textInfo.cx, imageButton.textInfo.cy]).center();

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

    // 3. 멀티 핸드라이트 만들기
    const okButton = {
        'x': 400, // 옵션 값
        'y': 450, // 옵션 값
        ...handWriteValue.okButton,
        'type': 0, // 고정 값
    }
    const penGroup = penCountImage({
        'canvas':markG,
        'type':1,
        'count': handWriteValue.repeat,
        'cx' : handWriteValue.repeatIconInfo && handWriteValue.repeatIconInfo.cx,
        'cy' : handWriteValue.repeatIconInfo && handWriteValue.repeatIconInfo.cy,
        'gap': handWriteValue.repeatIconInfo && handWriteValue.repeatIconInfo.gap,
        'scale': handWriteValue.repeatIconInfo && handWriteValue.repeatIconInfo.scale
    })
    for (let q = 0; q < handWriteValue.repeat; q++) {
        //멀티 핸드라이트
        handWrite[q] = new nTimesHandWrite({
            'canvas': handWriteG,
            'text': handWriteValue.handWriteText,
            'handWriteInfo': handWriteValue.handWrite,
            'okButton': okButton,
            'callback': next
        });
    }
    //처음 시작
    handWrite[count].start();


    //다음 핸드라이트 판단 함수
    function next() {
        ttsG.attr('pointerEvents','none');
        imgBtnG.attr('pointerEvents','none');
        Howler.stop();
        handWriteVoice.play();
        handWriteVoice.once('end', function(){
            penGroup.selectAll('.penIcon')[count].children().forEach((el, i) => {
                el.attr('opacity', 1 - i)
            })
            setTimeout(function () {
                if (count < handWriteValue.repeat - 1) {
                    handWrite[count].remove();
                    count++;
                    ttsG.attr('pointerEvents','auto');
                    imgBtnG.attr('pointerEvents','auto');
                    handWrite[count].start();
                } else {
                    callback();//종료
                }
            }, 400)
        })
     
    }
}

export default KM000024;