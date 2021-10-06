import Snap from 'sol-common/snap'
import {
    createElement,
    // tempGuideLine,
    loadDragAndDropSound,
    simpleDrag,
    directionText,
} from '../component';
import { loadSound, hint } from 'sol-common';
import {
    Howler
} from 'howler';
import { feedback } from 'sol-common/util';

// 끝말 잇기
const KM000040 = async function ({
    canvas,
    direction,
    elements,
    imageButtons,
    wordChain,
    drag,
    callback
}) {
    // tempGuideLine(canvas) // 좌표선 삭제
    const g = canvas.g();
    const backG = g.g();
    const ttsG = g.g();
    const imgBtnG = g.g();
    const wordG = g.g();
    const focusT=[];
    let count = 0;
    const focusRect = [];
    const dragG = g.g();
    const hintG = g.g();
    const dragGroup = [];
    const dadSound = loadDragAndDropSound();
    let hintEl;


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
        }
        for (let t = 0; t < len; t++) {
            // 박스
            const rxy =el.boxR || 10;
            const boxEl=createElement({
                'type': el.boxType || 'rect',
                "canvas": rG,
                'meta':{
                    'cx': 0 + el.wordGap * t,
                    'cy': 0,
                    'width' : el.width,
                    'height' : el.height,
                    'rXY': rxy,
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
            // const color = isQuizT ? (el.focusClassNum || '0002') : (el.classNum || '000') //드래그 된 곳만 색상 넣고 싶을 때
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
                    const boxBbox = boxEl.getTBox();
                    const focusR = rG.rect(boxBbox.cx,boxBbox.cy,boxBbox.w,boxBbox.h,rxy,rxy)
                                    .addClass('fno s'+el.focusBoxClassNum)
                                    .center()
                                    .attr({
                                        'strokeWidth':el.focusBoxSW || 5,
                                        'opacity':0
                                    })
                    focusRect.push(focusR)
                }
                textEl.attr('opacity',0);
                focusT[isQuizT ? i : i-1].push(textEl);  
            }
        }
        subG.transform(Snap.matrix(1, 0, 0, 1, el.cx -el.width/2 * (len-1), el.cy));
    })

 
    //드래그 만들기
    if (drag && drag.element) {
        drag.element.forEach((dragEl, i) => {
            const currentDragG = dragG.g();
            dragEl.forEach(typeEl => {
                createElement({
                    "type": typeEl.type,
                    "canvas": currentDragG,
                    "meta": typeEl.meta
                });
            });
            dragGroup[i] = simpleDrag({
                'dragItem': currentDragG,
                'startCallback': async function () {
                    if (hintEl) hintEl.removeHint();
                    dragGroup[i].appendTo(dragG) // 현재 드래그 하는 엘리먼트를 엘리먼트 중에 가장 위로 보이도록 변경
                    Howler.stop();
                    imgBtnG.attr('pointerEvents', 'none');
                    await dadSound.drag.play(); // drag 소리
                },
                'moveCallback': function () {},
                'endCallback': async function () {
                    Howler.stop();
                    await dadSound.drop.play(); // drop 소리
                    const el = dragGroup[i];
                    const userIdx = i;
                    const dragBBox = el.getBBox(); //현재 드래그 한 것의 bbox
                    const dropBBox = makeGetBBox(drag.dragPosition, dragBBox, el, count, drag.hintCount); //drop할 위치들의 bbox 배열
                    const bool = Snap.path.isBBoxIntersect(dragBBox, dropBBox[count]); //단계별로 정답 체크방식
                    if(bool){
                        const {x,y,x2} = dropBBox[count]; // 현재 drop한 위치의 bbox
                        const ansArr = drag.ansIndex; //정답 배열(메타)
                        const bool = userIdx === ansArr[count]; // 정답 여부
                        el.attr('pointerEvents', 'none');
                        // 서서히 영역에 들어가기
                        await el.moveAnimate({x, y});
                        focusRect[count].attr('opacity',0);
                        // 피드백
                        const fbGap = [(drag.fbGap && drag.fbGap[count] && drag.fbGap[count].x) || 7, (drag.fbGap && drag.fbGap[count] && drag.fbGap[count].y) || 0];
                        feedback({
                            canvas: g,
                            el: [x2 + fbGap[0], y + fbGap[1]],
                            scale: 1,
                            bool: bool,
                            onRemove: async function () {
                                if (bool) { // 정답일 때 피드백
                                    drag.dragPosition[count] =undefined;
                                    focusT[count].forEach(tEl=> tEl.attr('opacity',1));
                                    if (count < ansArr.length - 1) { //drag가 덜 끝났을 때
                                        el.attr('pointerEvents', 'none').data('action',false);
                                        el.nonAniReset(); //원래 위치로 이동 시키기
                                            count++;
                                            dragGroup.forEach(el=>{el.data('action',true).attr('opacity',1)})
                                            imgBtnG.attr('pointerEvents', 'auto');
                                            setTimeout(act,500);
                                            // act(); 
                                    } else { //모든 drag가 끝났을 때
                                        dragGroup.forEach(dG => dG.attr('pointerEvents', 'none').data('action',false));
                                        ttsG.attr('pointerEvents', 'none');
                                        el.hidden();
                                        setTimeout(callback,300);
                                    }
                                } else { // 오답일 때 피드백
                                    focusRect[count].attr('opacity',1);
                                    await el.reset();
                                    imgBtnG.attr('pointerEvents', 'auto');
                                    // 틀린 것 비활성(drag할 영역이 한개 남았을 때만 사용)
                                    el.attr({
                                        'pointerEvents': 'none',
                                        'opacity': 0.5
                                    }).data('action',false);
                                }
                            }
                        });
                    } else { // 영역에 안들어 왔을 때 : false
                        await el.reset();
                        imgBtnG.attr('pointerEvents', 'auto');
                        act();
                    }
                },
            })
            dragGroup[i].attr('pointerEvents','none') 
                        .data('action',true); // 처음에 모두 비활성
        });
    }
    

    // 시작
    act();

    function makeGetBBox(xyArr, standardBBox, g) {
        const newBBoxArr = [];
        const isHint = count < drag.hintCount;
        console.log(xyArr);
        xyArr.forEach((el,i) => {
            if((el&&!isHint) || (el&&isHint&&i===count)){ //힌트가 아닐 때, 해당 인덱스가 힌트일 때만 영역 허용
                const fakeR = g.rect(el.cx, el.cy, standardBBox.w, standardBBox.h).addClass('f04 sno').center();
                newBBoxArr.push(fakeR.getBBox())
                fakeR.remove();
            }else  newBBoxArr.push(undefined);
        })
        return newBBoxArr;
    }

    function makeHint({count,drag,drop,ansArr}) {
        const dragBBox = drag[ansArr[count]].getBBox()
        const dropBBox = makeGetBBox(drop, dragBBox, hintG)[count];
        if (hintEl) hintEl.removeHint();
        hintEl = hint({
            canvas: hintG,
            type: 1,
            XY: [dragBBox.cx,dragBBox.cy],
            moveTo: [dropBBox.cx,dropBBox.cy],
            dragTime: Snap.len(dragBBox.cx, dragBBox.cy, dropBBox.cx, dropBBox.cy) * 5
        });
    }

    function act() {
        focusRect[count].attr('opacity',1)
        if (count < drag.hintCount) { // 힌트 존재 시
            makeHint({
                'count':count,
                'drag':dragGroup,
                'drop':drag.dragPosition,
                'ansArr':drag.ansIndex
            });
            dragGroup.forEach((el,a) => {
                if(a === drag.ansIndex[count] && el.attr('pointerEvents')==='none') el.attr('pointerEvents','auto');
            });
        } else { //힌트 없을 시
            dragGroup.forEach(el => {
                if(el.data('action') && el.attr('pointerEvents')==='none') el.attr('pointerEvents','auto');
            });
        }
    }
}

export default KM000040;
