import Snap from 'sol-common/snap'
import {
    createElement,
    // tempGuideLine,
    wordChainPopUpHandWrite,
    makeOk,
    directionText,
} from '../component';
import { loadSound } from 'sol-common';
import {
    Howler
} from 'howler';

// 끝말 잇기
const KM000035 = async function ({
    canvas,
    direction,
    elements,
    imageButtons,
    wordChain,
    popUpInfo,
    okButton,
    callback
}) {
    // tempGuideLine(canvas) // 좌표선 삭제
    const g = canvas.g();
    const backG = g.g();
    const ttsG = g.g();
    const imgBtnG = g.g();
    const wordG = g.g();
    const popUpG =g.g();
    const okG = g.g();
    const focusT=[];
    const hw =[];
    let count = 0;

    if (imageButtons) {
        for (let z = 0; z < imageButtons.length; z++) {
            if (imageButtons[z].soundInfo) {
                imageButtons[z].voice = loadSound(imageButtons[z].soundInfo.url)
            }
        }
    }
   
    // 지시문
    if (direction) directionText({'canvas':ttsG, ...direction});

    //ok버튼
    const ok = new makeOk({
        'canvas': okG,
        'type': 0,
        'cx': okButton && okButton.cx,
        'cy': okButton && okButton.cy,
        'scale': okButton && okButton.scale,
        'visibility': false,
        'event': false,
        'callback': callback //정답체크
    })

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
  
    if (imageButtons) { //이미지 버튼 이 모듈부터 다른 방식(createElement 사용)
        imageButtons.forEach((imgButton) => { //이미지 버튼 마다
            const ibG = imgBtnG.g();
            imgButton.element.forEach(imgEl =>{
                const gg = ibG.g();
                createElement({
                    "type": imgEl.type,
                    "canvas": gg,
                    "meta": imgEl.meta
                });
            });
            createElement({
                "type": 'rect',
                "canvas": ibG,
                "meta": {...ibG.getTBox(),'shapeFillClassNum':'14','shapeOpacity':0}
            });
            ibG.touchOrClick(function(){
                Howler.stop();
                imgButton.voice.play()
                imgButton.voice.once('end', function () {})
            })
        })
    }

    wordChain.forEach((el,i)=>{
        const subG = wordG.g();
        const rG =subG.g();
        const tG =subG.g();
        const wordLen = wordChain.length;
        const len = el.text.length;
        el.width = (el.boxWidth || (el.fontSize || 80) * 1.2);
        el.height = (el.boxHeight || (el.fontSize || 80) * 1.2);
        el.wordGap = el.width + (el.boxGap || 0);
        
        if(i!==wordLen-1){
            focusT.push([]);
            hw.push([]);
        }
        console.log('이전',el);
        for (let t = 0; t < len; t++) {
            // 박스
            createElement({
                'type':el.boxType || 'rect',
                "canvas": rG,
                'meta':{
                    'cx': 0 + el.wordGap * t,
                    'cy': 0,
                    'width' : el.width,
                    'height' : el.height,
                    'rXY': el.boxR || 10,
                    'r':el.boxCirR,
                    'shapeFillClassNum': el.boxFillClassNum || '14',
                    'shapeStrokeClassNum':el.boxStrokeClassNum || 'no',
                    'shapeStrokeWidth': el.boxStrokeWidth || 1,
                    'shapeOpacity': el.boxOpacity,
                    'ImgUrl':el.boxImgUrl,
                    'ImgScale':el.boxImgScale,
                    'shadowDx': el.boxShadowDx,
                    'shadowDy': el.boxShadowDy,
                    'shadowBlur': el.boxShadowBlur,
                    'shadowClassNum':el.boxShadowClassNum,
                    'shadowOpacity': el.boxShadowOpacity,
                }
            })
            
            const isQuizT = (i!==wordLen-1 && t===len-1);
            const isFocusT = isQuizT || (i!==0&&t===0);
            const color = isFocusT ? (el.focusClassNum || '0002') : (el.classNum || '000')
            //텍스트
            const textEl=createElement({
                'type':'text',
                "canvas": tG,
                "meta":{
                    'cx': 0 + el.wordGap * t,
                    'cy': 0,
                    'text' : el.text[t],
                    'classNum' : color,
                    'fontSize': el.fontSize || 55,
                    'bold': el.bold !==undefined ? el.bold : true,
                    'lineCenter':true
                }
            })

            if(isFocusT){
                if(isQuizT) {
                    imageButtons[i].element.forEach((e,a)=>{ //이미지 메타정보 변경하기
                        if(popUpInfo[i].imageButton && popUpInfo[i].imageButton[a]) e.meta = {...e.meta, ...popUpInfo[i].imageButton[a]}
                    });
                    if(popUpInfo[i].wordChain){
                        wordChain[i] = {...wordChain[i], ...popUpInfo[i].wordChain}
                    }
                    hw[i] =new wordChainPopUpHandWrite({
                        'canvas': popUpG,
                        'popUpSize': popUpInfo[i].size,
                        'popUpFillColor' : popUpInfo[i].fillClassNum,
                        'popUpStrokeColor': popUpInfo[i].strokeClassNum,
                        'touchBBox':{
                            'x': el.cx - el.width/2 * (len-1) + el.wordGap * t - el.width/2,
                            'y': el.cy - el.height/2,
                            'w': el.width,
                            'h': el.height,
                            'r':  el.boxR || 10,
                            'color' : el.focusBoxClassNum || '04',
                            'strokeWidth' : el.focusBoxSW || 5,
                        },
                        'isHint':popUpInfo[i].isHint || false,
                        'ans': el.text[t],
                        'imageButton':imageButtons[i],
                        'oneWord':wordChain[i],
                        'handWriteValue':popUpInfo[i].handWriteValue,
                        // 'soundFeedback':tableInfo.sound[index],
                        'callback':function(){
                            focusT[count].forEach(tEl=> tEl.attr('opacity',1));
                            if(count < hw.length-1){
                                count++;
                                hw[count].start();
                            }else{
                                ok.start();
                            }
                        }
                    })
                }
                textEl.attr('opacity',0);
                focusT[isQuizT ? i : i-1].push(textEl);  
            }
        }
        subG.transform(Snap.matrix(1, 0, 0, 1, el.cx -el.width/2 * (len-1), el.cy));
    })

    // 시작
    hw[0].start()
}

export default KM000035;
