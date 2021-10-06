import Snap from 'sol-common/snap'
import {
    image,
} from 'sol-common/components'

import {
    K_richTextAuto,
    popUpHandWrite,
    oneWordCombine,
    createElement,
    makeOk,
    directionText
    // tempGuideLine,
} from '../component';

// 애니메이션 + trace 모듈(낱자)
const KM000015 = async function ({
    canvas,
    direction,
    elements,
    images,
    tableInfo,
    popUpInfo,
    okButton,
    callback
}) {
    const handWriteValue=popUpInfo.handWriteValue;
    tableInfo.questionIndex=tableInfo.questionIndex.sort();
    // tempGuideLine(canvas) // 좌표선 삭제
    const g = canvas.g();
    const backG = g.g();
    const ttsG = g.g();
    const contentsG=g.g();
    const popUpG = g.g();
    const quiz=[];
    let count=0;
   
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
            const gg = contentsG.g();
            image({
                'canvas': contentsG,
                'x': img.x, 
                'y': img.y,
                'img': img,
            });
            if(img.rotate) gg.transform('r'+img.rotate)
        });
    }

    const lastOK = new makeOk({
        'canvas': contentsG,
        'type': okButton.type,
        'cx': okButton.cx,
        'cy': okButton.cy,
        'scale':okButton.scale,
        'visibility': false,
        'event': false,
        'callback': callback
    });
    const listCount=Math.ceil(tableInfo.row.text.length/tableInfo.row.maxCount);
    const lineClassNum = (tableInfo.lineClassNum || '01');
    for (let z = 0; z < tableInfo.row.text.length + listCount; z++) {
        for (let r = 0; r < 2; r++) {
            const isUserAnsVisible=false; // 정답 시 학습자가 쓴 path로 보여줄지 여부
            const c = z % (tableInfo.row.maxCount+1);
            const ga = Math.floor(z / (tableInfo.row.maxCount+1)) //gap

            const x=tableInfo.x + r*tableInfo.width + ga * (tableInfo.row.tableGap + tableInfo.width*2);
            const y=tableInfo.y + c*tableInfo.height;
            const w=tableInfo.width;
            const h=tableInfo.height;
            let className;
            let word;
            if(r===0 && c===0){ //교차 부분
                className= 'f'+(tableInfo.crossClsssNum ||'066') + ' s'+ lineClassNum;
            } else if(r===0 && c!==0) { //행 부분
                className= 'f'+tableInfo.row.tableClassNum + ' s'+ lineClassNum;
                word= tableInfo.row.text[z-ga-1];
            } else if(r===1 && c===0) { //열 부분
                className='f'+tableInfo.col.tableClassNum + ' s'+ lineClassNum;
                word=tableInfo.col.text;
            } else { //내용 부분
                className='f14 s01';
                if(tableInfo.questionIndex.indexOf(z-ga-1)===-1){ //채워진 내용 부분
                    word= oneWordCombine([tableInfo.row.text[z-ga-1],tableInfo.col.text]);
                }else{ //문제 부분
                    const index=tableInfo.questionIndex.indexOf(z-ga-1);
                    // equationValue.scaleAndOffset = equationValue.wordInfo[index] || {"scale":0.8, "offset":{"x":0,"y":0}}
                    quiz[index]=new popUpHandWrite({
                        'canvas': popUpG,
                        'popUpSize':popUpInfo.size,
                        'popUpFillColor' : popUpInfo.fillClassNum,
                        'popUpStrokeColor':popUpInfo.strokeClassNum,
                        'touchBBox':{
                            'x':x,
                            'y':y,
                            'w':w,
                            'h':h,
                            // 'penXY':tableInfo.pencilXY
                        },
                        'wordArr':[tableInfo.row.text[z-ga-1],tableInfo.col.text],
                        'equationValue':popUpInfo.equationValue,
                        'handWriteValue':handWriteValue,
                        'soundFeedback':tableInfo.sound[index],
                        'midCallback':function() {
                            ttsG.attr('pointerEvents','none');
                        },
                        'callback':function(ans,pathArr){
                            //피드백
                            console.log(this);
                            quiz[count].g.attr('opacity',0)
                            const bbox=quiz[count].g.getTBox();
                            if(isUserAnsVisible){// 학습자가 쓴 path
                                contentsG.path(pathArr)
                                        .transform(Snap.matrix(w/handWriteValue.width,0,0,h/handWriteValue.height,x - (handWriteValue.x * w/handWriteValue.width), y - (handWriteValue.y * h/handWriteValue.height)))
                                        .addClass('fno s'+ (handWriteValue.drawClassNum || '001'))
                                        .attr({'strokeWidth':10,'strokeLinecap': 'round', 'strokeLinejoin': 'round'});
                            }else{// 모범답안 생성
                                new K_richTextAuto({
                                    'canvas': contentsG,
                                    'text': ans,
                                    'x': bbox.cx,
                                    'y': bbox.cy,
                                    'className': 'ffng f02', //선택
                                    'fontSize': tableInfo.fontSize || h*0.5, //선택
                                    'dy': 45, //선택
                                    'isBold':false,
                                    'options' : undefined,
                                    'center':true
                                });
                            }
                            
                            
                            count++;
                            setTimeout(function(){
                                ttsG.attr('pointerEvents','auto');
                                if(count<quiz.length){
                                    quiz[count].start()
                                }else{
                                    lastOK.start();
                                }
                            },300);
                        }
                    });
                }
            }
            contentsG.rect(x,y,w,h, 0,0).addClass(className);
            if(word){
                console.log('ffng f'+ (tableInfo.textClassNum || '0003'));
                new K_richTextAuto({
                    'canvas': contentsG,
                    'text': word,
                    'x': x+w/2,
                    'y': y+h/2,
                    'className': 'ffng f'+ (tableInfo.textClassNum || '0003'), //선택
                    'fontSize': tableInfo.fontSize || h*0.5, //선택
                    'dy': 45, //선택
                    'isBold':tableInfo.bold || false,
                    'options' : undefined,
                    'center':true
                });
            }
        }
    }

    quiz[count].start(); //처음 시작
}

export default KM000015;
