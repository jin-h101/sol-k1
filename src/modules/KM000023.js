import {
    image,
} from 'sol-common/components'
import {
    feedback
} from 'sol-common/util';

import {
    K_makeButton,
    K_richTextAuto,
    // tempGuideLine,
    wordSplit,
    pathWord,
    wordMatchPath,
    pathList,
    createElement,
    directionText
} from '../component';

// choice 모듈(같은 단어 고르기)
const KM000023 = function ({
    canvas,
    direction,
    elements,
    images,
    texts,
    choice,
    callback,

}) {
//    tempGuideLine(canvas);
    const g = canvas.g();
    const backG=g.g();
    const ttsG = g.g();
    const choiceG=g.g();
 
    let imgBtn;
    const choiceEl=[];
    let answer=[];
    let ansCount=0;

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

   //이미지 있을 때 그리기
   if(images){
        images.forEach(img => {
            const gg = backG.g();
            image({
                'canvas': gg,
                'x': img.x, 
                'y': img.y,
                'img': img,
            });
            if(img.rotate) gg.transform('r'+img.rotate)
        });
    }

    //텍스트 있을 때 그리기
    if(texts){
        texts.forEach(text=>{
            new K_richTextAuto({
                'canvas': backG,
                'text': text.text,
                'x': text.x,
                'y': text.y,
                'className': 'ffng  f' + (text.classNum || '91'), //선택
                'fontSize': text.fontSize || 60, //선택
                'dy': text.dy || 45, //선택
                'isBold':text.bold || false,
                'options' : text.options
            });
        })
    }           
const matchingIndex=[];
const beforeClass=[];
    //선택 버튼
    choice.element.forEach((el,i) => {
        choiceEl[i] = choiceG.g();
        beforeClass[i]=el.wordInfo.classNum || '001'
        matchingIndex.push([]);
        const x = el.btnInfo.x || 0;
        const y = el.btnInfo.y || 0;
        const width=  el.btnInfo.width || 140;
        const height = el.btnInfo.height || 80;
        const cx = x + width/2;
        const cy = y + height/2;
        const r = el.btnInfo.r || 10;
        const textS = el.wordInfo.textScale || 0.5;
        if(el.wordInfo){
            pathWord({ //글자 패스 그리기 함수
                'canvas':choiceEl[i],
                'cx': x + width/2,
                'cy': y + height/2,
                'textScale':textS,
                'text': el.wordInfo.word,
                'className':beforeClass[i]
            });
            let wordLenCount=0;
            for (let t = 0; t < el.wordInfo.word.length; t++) {
                const isIndex = wordSplit(el.wordInfo.word[t]).arr.indexOf(choice.searchWord)
                wordMatchPath(el.wordInfo.word[t], pathList).pathImg.forEach((len,p)=>{
                    len.forEach(len2=>{
                        if(p===isIndex){
                            matchingIndex[i].push(wordLenCount)
                        }
                        // console.log(len2,'        ',wordSplit(el.wordInfo.word[t]).arr[p], p===isIndex);
                        wordLenCount=wordLenCount + 1
                    })
                })
            }
        }

        new K_makeButton({
            'el': choiceEl[i],
            'x': cx,
            'y': cy,
            'width': width,
            'height': height,
            'fillClassNum' : el.btnInfo.fillClassNum,
            'strokeClassNum' : el.btnInfo.strokeClassNum,
            'shadowClassNum' : el.btnInfo.shadowClassNum,
            'r': r,
            'index':i,
            'isMetaSize':true,
            'endCallback':actionCallback
        });
        if(el.isAns) answer.push(i);    
    });

    function pause(el){
        // el.forEach(e => e.attr('pointerEvents','none'));
        el.forEach(e => e.stop());
    }

    function reStart(el){
        el.forEach(e => {
            // if(!e.data('clickEnd')) e.attr('pointerEvents','auto')
            if(!e.data('clickEnd')) e.reStart();
        });
    }

    function actionCallback(index,group){
        const bool=answer.indexOf(index)!==-1;
        const element=choiceEl[index];
        const fbIndexArr = matchingIndex[index];
        const basicClass = beforeClass[index];
        const bbox=element.getTBox();
        //o,x 피드백
        const className = bool ? 'fno s0018' : 'fno s0019';
        const r = group.data('rXY');
        const box = element.rect(bbox.x,bbox.y,bbox.w,bbox.h,r,r).addClass(className).attr({
            'strokeWidth':5
        }); // 네모 피드백
        element.data('clickEnd',true); //클릭이 끝남을 나타냄
        pause(choiceEl);
        const fb = new feedback({
            canvas: g,
            el: [bbox.x2, bbox.y],
            bool: bool,
            gap: [0, 0],
            scale: 1,
            addAction:false,
            onRemove: function () {
                element.parent().attr('pointerEvents','none');
                if(bool){
                    element.selectAll('path').forEach((el,i)=>{
                        if(fbIndexArr.indexOf(i)!==-1){
                            el.removeClass(basicClass).addClass('f0018 sno');
                        }
                    })
                    ansCount++;
                    if(ansCount>=answer.length){ 
                        if(imgBtn) imgBtn.attr('pointerEvents','none')
                        setTimeout(callback,300);
                    }else reStart(choiceEl);
                }else{
                    box.attr('opacity',0);
                    element.attr('opacity', 0.4);
                    fb.addUserAction();
                    setTimeout(function () {
                        reStart(choiceEl);
                    }, 300);
                }
            }   
        })
    }
}

export default KM000023;