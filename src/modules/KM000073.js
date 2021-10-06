import {
    createElement,
    directionText,
    // tempGuideLine,
    com_makeModal,
    multiPointerControl,
} from '../component';
import { feedback } from 'sol-common/util';
import { hint } from 'sol-common';

const KM000073 = async function ({
    canvas,
    direction,
    elements,
    scroll,
    callback
}) {
    // tempGuideLine(canvas);
    console.log('start');
    const g = canvas.g();
    const backG = g.g();
    const ttsG = g.g();
    const scrollG = g.g();
    const ansArr = [];
    const {ansText,hintInfo,fbInfo} = scroll?.choice;
    let choiceEl;
    let count = 0;
    let hintEl;

    // 지시문
    if (direction) {
        directionText({
            canvas: ttsG,
            ...direction
        });
    }
       
    //배경 존재 시 설정
    if (elements) {
        elements.forEach(el => {
            createElement({
                type: el.type,
                canvas: backG,
                meta: el.meta
            });
        });
    }

    if(scroll){
        const {area,elements} = scroll;
        const scrollArea = { x:20, y:80, x2:780, y2:480, rXY:40, yGap:50, fillClassNum:'0012',strokeClassNum:'no', fillOpacity:1, ...area}
        const {x,y,x2,y2,rXY,yGap,fillClassNum,strokeClassNum,fillOpacity} = scrollArea;
        if(elements){
            elements.forEach(el => {
                createElement({
                    type: el.type,
                    canvas: scrollG,
                    meta: el.meta
                });
            });
        }
        //div 생성
        new com_makeModal({
            'x': x,
            'y': y,
            'width': x2 - x,
            'height': y2 - y,
            'yGap': yGap,
            'appendG': scrollG
        }); // div 새로 만들 때
        //외곽 영역 생성
        canvas.rect(x, y, x2 - x, y2 - y, rXY, rXY)
                .addClass('f'+ fillClassNum+' s'+ strokeClassNum)
                .attr('fillOpacity', fillOpacity);

        choiceEl = scrollG.selectAll('.manuscriptPaper');
        if(choiceEl.length>0 && ansText){
            choiceEl.forEach((el,i) => {
                const t =el.data('word').node.textContent;
                if(t===ansText) ansArr.push(i);
                el.data(
                    'datas', { 'index':i, 'clickEnd':false, 'text': t, 'bbox': el.getBBox()}
                ).touchOrClick(actionCallback)
                 .attr('pointerEvents','none');
            })
        }
    }      

    //처음 시작
    start(choiceEl, count);

    //시작 함수
    function start(element, n) {
        element.forEach((el, k) => {
            if (n < hintInfo?.count) {
                //힌트 있을 때
                if (ansArr[n] === k) {
                    const {bbox} = el.data('datas');
                    el.attr('pointerEvents','auto'); //엘리먼트 활성
                    hintEl = hint({
                        canvas: scrollG,
                        XY: [bbox.cx, bbox.cy - 5],
                        scale: (hintInfo?.scale || 0.8)
                    }); //힌트 생성
                }
            } else {
                //힌트가 없거나 끝났을 때
                if(!el.data('datas').clickEnd) el.attr('pointerEvents','auto');
            }
        });
    }
    
    function actionCallback(){
        if (hintEl) hintEl.removeHint();
        const element=this;
        const {index, bbox} = element.data('datas');
        const bool = ansArr.indexOf(index) !== -1;
        const fbGap = (fbInfo?.gap || [5, 0]);
        element.data('datas').clickEnd = true; //클릭이 끝남을 나타냄
        pause(choiceEl);
        const fb = new feedback({
            'canvas': scrollG,
            'el':[bbox.x2 + fbGap[0], bbox.y + fbGap[1]],
            'bool': bool,
            'scale': fbInfo?.scale || 0.8,
            'addAction':false,
            'onRemove':function(){
                if(bool){
                    element.data('word').attr('visibility', 'visible');
                    count++;
                    if(ansArr.length === count){
                        console.log('end');
                        callback();
                    }else{
                        start(choiceEl, count);
                    }
                }else{
                    element.attr('opacity',0.5);
                    fb.addUserAction();
                    reStart(choiceEl);
                }
            }
        });
    }

    function pause(el) {
        multiPointerControl({'elements':el,'state':'none'});
    }
    function reStart(el) {
        el.forEach(e => {
            if(!e.data('datas').clickEnd) e.attr('pointerEvents','auto');
        });
    }
};
export default KM000073;