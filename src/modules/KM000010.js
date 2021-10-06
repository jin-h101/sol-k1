import {
    image,
    hint,
} from 'sol-common/components'
import { feedback } from 'sol-common/util';


import {
    wordSplit,
    K_richTextAuto,
    pathWord,
    K_makeBackground,
    // tempGuideLine,
    createElement,
    directionText
} from '../component';

// choice 모듈(자모음 고르기, 피드백 path 변환)
const KM000010 = function ({
    canvas,
    direction,
    elements,
    images,
    texts,
    choice,
    callback,

}) {
    // tempGuideLine(canvas);
    choice={
        isColorChangeFeedback:true,
        hintCount:0, 
        ...choice
    }

    const g = canvas.g();
    const backG = g.g();
    const ttsG = g.g();
    const subG=g.g();
    const choiceG=g.g();
    let count=0;
    let hintEl;
    const choiceEl=[];
    const answer = [];

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
            const gg = subG.g()
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
                'canvas': subG,
                'text': text.text,
                'x': text.x,
                'y': text.y,
                'className': 'ffng  f' + (text.classNum || '000'), //선택
                'fontSize': text.fontSize || 60, //선택
                'dy': text.dy || 45, //선택
                'isBold':text.bold || false,
                'options' : text.options,
                // 'center':true
            });
        })
    }

    //choiceEl 만들기
    const beforeClass='f000 sno'; // path 색깔
    choice.element.forEach((el,i)=>{
        choiceEl[i]=choiceG.g().attr('pointerEvents','none');

        //배경
        new K_makeBackground({
            'group':choiceEl[i],
            'el':el,
            'isNoBackground':true
        });     

        //path 글자
        const splitWordInfo=wordSplit(el.text);
        const searchWordIndex = splitWordInfo.arr.indexOf(choice.searchWord);
        const isAns = searchWordIndex !== -1;
        const textG=choiceEl[i].g();
        const tEl=pathWord({ //글자 패스 그리기 함수
            'canvas':textG,
            'cx': el.cx || 50,
            'cy': el.cy || 50,
            'textScale':el.scale,
            'text': el.text,
            'className':beforeClass
        });
        console.log(tEl);
        if(isAns) answer.push(i);
        choiceEl[i].data('index',i)
                   .data('clickEnd',false)
                   .data('changePathIndex',searchWordIndex) //엘리먼트에 포함된 path 중 색이 바뀔 인덱스
                   .data('fbEl',tEl.g)
                   .touchOrClick(actionCallback);
    });

    //처음 시작
    start(choiceEl,count);

    //시작 함수
    function start(element,n){
        element.forEach((el,k)=>{
            if(n<choice.hintCount){ //힌트 있을 때
                if(answer[n]===k){
                    el.attr('pointerEvents','auto'); //엘리먼트 활성
                    hintEl=hint({
                        "canvas":g,
                        "XY":[choice.element[k].cx,choice.element[k].cy]
                    }); //힌트 생성
                }
            }else{ //힌트가 없거나 끝났을 때
               if(!el.data('clickEnd')) el.attr('pointerEvents','auto');
            }
        });
    }

    //엘리먼트 클릭 시 실행 되는 함수
    function actionCallback(){
        const element=this;
        if(hintEl)hintEl.removeHint();
        this.untouchOrClick();
        const userIdx=element.data('index'); //학습자가 누른 인덱스
        const elBBox=element.data('fbEl').getTBox();
        const bool = answer.indexOf(userIdx) !== -1;
        element.data('clickEnd',true); //클릭이 끝남을 나타냄
        pause(choiceEl);
        //o,x 피드백
        const fb=new feedback({
            canvas: g,
            el:[elBBox.x2+10,elBBox.y],
            bool: bool,
            gap: [0, 0],
            scale:1,
            addAction:false,
            onRemove:function(){
                if(bool){  //정답 시
                    //동그라미 피드백
                    g.circle(elBBox.cx,elBBox.cy, choice.fbSize || (Math.max(elBBox.w,elBBox.h)*1.5)/2).addClass('fno s0018').attr({
                        'strokeWidth':choice.fbStrokeWidth || 3
                    });
                    //글자 색 변경
                    if (choice.isColorChangeFeedback){
                        element.selectAll('.path')[element.data('changePathIndex')]
                               .removeClass(beforeClass)
                               .addClass('f0018 sno');
                    }
                    count++;
                    // 다음 상태 진행
                    setTimeout(function(){
                        if(answer.length===count){ 
                            callback();
                        }else start(choiceEl,count);
                    },300);
                }else{ //오답시
                    element.attr('opacity', 0.4);
                    fb.addUserAction();
                    setTimeout(function(){
                        start(choiceEl,count);
                    },300);
                }
            }
        });
    }

    function pause(el){
        el.forEach(e => e.attr('pointerEvents','none'));
    }
}

export default KM000010;