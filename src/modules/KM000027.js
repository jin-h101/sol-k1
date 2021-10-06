import Snap from 'sol-common/snap'

import {
    K_richTextAuto,
    // tempGuideLine,
    createElement,
    K_dragElement,
    transformPath,
    popUpHandWrite,
    makeOk,
    loadLadderImg,
    // handImageIcon,
    dragElementImg,
    directionText
} from '../component';


// connect 모듈(1 대 다수)
const KM000027 = function ({
    canvas,
    direction,
    traceImgInfo,
    startPart,
    endPart,
    questionPart,
    okButton,
    callback,

}) {
    //trace And write
    // tempGuideLine(canvas) // 좌표선 삭제
    okButton = {
        'type':0,
        'cx':730,
        'cy':460,
        ...okButton
    }
    traceImgInfo = {
        "cx":400,
        "cy":250,
        "scale":1,
        "index":0,
        ...traceImgInfo
    }
    const ladderImg=loadLadderImg(traceImgInfo.index || 0);
    const g = canvas.g();
    const ttsG = g.g();
    const ladderG = g.g();
    const ladderImgG=ladderG.g();
    const extraG=ladderG.g();
    const penG=ladderG.g();
    const popUpG=g.g();
    const okBtnG = g.g();
    const isUserAnsVisible=false; // 정답 시 학습자가 쓴 path로 보여줄지 여부

    //지시문
    if (direction) directionText({'canvas':ttsG, ...direction});



    const useImg=ladderImg.use()
                            .transform(Snap.matrix(traceImgInfo.scale,0,0,traceImgInfo.scale,traceImgInfo.cx,traceImgInfo.cy))
                            .center()
                            .appendTo(ladderImgG);
    const ladderPathData=[];
    const bbox = useImg.getTBox();
    const matchingStrIndex = ladderImg.selectAll('metadata')[0].node.textContent.split(',');
    const conbineTextArr = [];
    ladderImg.selectAll('.hiddenPath').forEach(path=>{
        // console.log(path,path.attr('d'));
        ladderPathData.push(
            transformPath({
                'pathStr': path.attr('d'),
                'scale':bbox.a,
                'x': bbox.x,
                'y': bbox.y
            })
        );
    });
    
    //마지막 ok
    const lastOK = new makeOk({
        'canvas': okBtnG,
        'type': okButton.type,
        'cx': okButton.cx,
        'cy': okButton.cy,
        'scale':okButton.scale,
        'visibility': false,
        'event': false,
        'callback': callback
    });

    // 시작 부분 element
    const startGroup = [];
    startPart.forEach((els,i)=>{
        startGroup[i]=extraG.g()
        conbineTextArr.push([]);
        els.createElement.forEach(shapeEl=>{
            createElement({
                "type": shapeEl.type,
                "canvas": startGroup[i],
                "meta": shapeEl.meta
            });
            if(shapeEl.type === 'text') conbineTextArr[i].push(shapeEl.meta.text);
        })
    });

    // 끝 부분 element
    const endT = [];
    endPart.forEach((els,i)=>{
        els.createElement.forEach((shapeEl)=>{
            endT[i]=createElement({
                "type": shapeEl.type,
                "canvas": extraG,
                "meta": shapeEl.meta
            })
            if(shapeEl.type === 'text') conbineTextArr[i].push(shapeEl.meta.text);
        })
    });

    // 문제 부분 element
    const qBox = [];
    const handWrites=[];

    ladderImg.selectAll('.blank').forEach((path,i)=>{
       const transD = transformPath({
                        'pathStr': path.attr('d'),
                        'scale':bbox.a,
                        'x': bbox.x,
                        'y': bbox.y
                    })
        qBox[i] = extraG.path(transD)
                    .addClass('f'+'no'+' s'+'no')
                    .attr({
                        'strokeWidth' : 1
                    })
                    .data('beforeClass','no')
                    .data('beforeStrokeWidth',1)
    });
    



    for (let z = 0; z < questionPart.length; z++) {
        const index = Number(matchingStrIndex[z]);
        const box = qBox[index].getTBox();
        const popUp = questionPart[index].popUpInfo;
        handWrites[z]=new popUpHandWrite({
            'canvas': popUpG,
            'popUpSize': popUp.size,
            'popUpFillColor': popUp.fillClassNum,
            'popUpStrokeColor': popUp.strokeClassNum,
            'touchBBox': {
                'x': box.cx - box.width/2,
                'y': box.cy - box.height/2,
                'w': box.width,
                'h': box.height,
                'r': box.rXY,
            },
            'touchBoxVisible':false,
            'wordArr': conbineTextArr[z],
            'equationValue': popUp.equationValue,
            'handWriteValue': popUp.handWriteValue,
            'callback': function(ans,pathArr){
                next (ans,pathArr,popUp.handWriteValue);
            }
        });
        
    }


    const trace=[];
    let count =0;
    const pathClass = ['02','04','06'];
    const strokeWidth = 6;

    ladderPathData.forEach((pathEl,t) => {
        dragElementImg()[0].use().transform('t0,0 s1.5 r90').appendTo(penG);
        trace[t]=new K_dragElement({
            // "el": panGArr[t],
            "el": penG,
            "pathStr": pathEl,
            "pathAttr": {
                'class': 'fno s' + pathClass[t],
                'stroke-width': strokeWidth,
                'stroke-linejoin': 'round',
                'stroke-linecap': 'round',
                'pointer-events': 'none'
            },
            "rotate": true,
            "mousePointer":true,
            "callback": hwStart
        })
    })
    
    



    // 처음 시작 
    trace[count].start()

    function hwStart (bool){
        if (bool) {
            const index = Number(matchingStrIndex[count])
            const focusClass = '02';
            // panGArr[count].attr('visibility', 'hidden');
            qBox[index].removeClass('s' + qBox[index].data('beforeClass'))
            .addClass('s' + focusClass)
            .attr('strokeWidth',3)
            .data('focusClass',focusClass);
            handWrites[count].start();
        }
    }


    function next (ans,pathArr,hw){
        const index = Number(matchingStrIndex[count])
        const bbox =qBox[index].getTBox();
        qBox[index].removeClass('s' + qBox[index].data('focusClass'))
        .addClass('s' + qBox[index].data('beforeClass'))
        .attr('strokeWidth',qBox[index].data('beforeStrokeWidth'));
        endT[index].attr('opacity',0);
        if(isUserAnsVisible){// 학습자가 쓴 path
            extraG.path(pathArr)
                    .transform(Snap.matrix(bbox.w/hw.width,0,0,bbox.h/hw.height,bbox.x - (hw.x * bbox.w/hw.width), bbox.y - (hw.y * bbox.h/hw.height)))
                    .addClass('fno s'+ (hw.drawClassNum || '001'))
                    .attr({'strokeWidth':10,'strokeLinecap': 'round', 'strokeLinejoin': 'round'});
        }else{// 모범답안 생성
            new K_richTextAuto({
                'canvas': extraG,
                'text': ans,
                'x': bbox.cx,
                'y': bbox.cy,
                'className': 'ffng f02', //선택
                'fontSize': bbox.h*0.7, //선택
                'dy': 45, //선택
                'isBold':true,
                'options' : undefined,
                'center':true
            });
        }
        count++;
        setTimeout(function(){
            if(count<handWrites.length){
                trace[count].start()
            }else{
                penG.attr('opacity',0);
                lastOK.start();
            }
        },300);
    }
}

export default KM000027;