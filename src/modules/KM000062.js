import {
    createElement,
    // tempGuideLine,
    directionText,
    wordUnitDrag,
} from '../component';

// 끝말 잇기
const KM000062 = async function ({
    canvas,
    direction,
    elements,
    drag,
    callback
}) {
    // tempGuideLine(canvas) // 좌표선 삭제
    const g = canvas.g();
    const backG = g.g();
    const ttsG = g.g();
    const dropG = g.g();
    const dragG = g.g();
    const fbG = g.g();
    const dragElement = [];
    const dropBoxElement = [];
    const focusShape = [];
    const activeClass = 's67';

    let totalT = {'text':''}
    let dragAction;

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

    //드래그 만들기
    if(drag){
        if (drag.elements) {
            drag.elements.forEach((dragEl, i) => {
                dragElement[i] = dragG.g();
                dragEl.forEach(typeEl => {
                    createElement({
                        "type": typeEl.type,
                        "canvas": dragElement[i],
                        "meta": typeEl.meta
                    });
                    if(typeEl.type === 'text' && typeEl.isQ) dragElement[i].data('word',typeEl.meta.text)
                });
                const bbox = dragElement[i].getTBox();
                dragElement[i].rect(bbox.cx,bbox.cy,bbox.w,bbox.h).addClass('f04 sno').attr('opacity',0).center();
            });
        }
        if(drag.drop){
            drag.drop.forEach((el,i) => {
                const subG = dropG.g();
                const {type, meta} = el.dropBox;
                const dropPosition = createElement({
                    "type": (type==='rect' || type==='circle') ? type : "rect",
                    "canvas": subG,
                    "meta": {"shapeFillClassNum":"14","shapeStrokeClassNum":"117", ...meta}
                });
                const bbox = dropPosition.getTBox()
                if(el.answer){
                    const idx = el.answer.index;
                    const textInfo = el.answer.textInfo
                    const isQ = idx >= 0
                    if(isQ) textInfo.text = dragElement[idx].data('word');
                    totalT.text = totalT.text.concat(textInfo.text);
                    if(!totalT.fontSize) totalT.fontSize = textInfo.fontSize; // 마지막 피드백 폰트색과 사이즈 변경 메타 받을 때 여기 수정
                    if(!totalT.classNum) totalT.classNum = textInfo.classNum; // 마지막 피드백 폰트색과 사이즈 변경 메타 받을 때 여기 수정
                    const shape = createElement({
                        "type": "text",
                        "canvas": subG,
                        "meta": { "cx": bbox.cx, "cy":bbox.cy, ...textInfo}
                    }).attr('opacity',isQ ? 0 : 1);
                    if(isQ) {
                        dropPosition.children()[0].data('beforeClass','s' + (meta.shapeStrokeClassNum || '117'))
                        focusShape.push(dropPosition.children()[0]);
                        dropBoxElement.push(
                            {'bbox' : bbox, 'g':subG, 'ansIndex':idx, 'visibleT':shape}
                        )
                    }
                }
            })
        }
        const isStepAction = drag.isStepAction || false; // 단계별로 진행할 것인지 여부
        dragAction = new wordUnitDrag({
            'canvas' : g,
            'dragElement':dragElement,
            'dropElement' : dropBoxElement,
            'hintCount': 0, //test
            'isStepAction': isStepAction,
            'startCallback':function(step) {
                if(isStepAction) focusShape[step].removeClass(focusShape[step].data('beforeClass')).addClass(activeClass); // focus 활성

            },
            'dragCallback':function(step,currentAreaIndex){
                dropBoxElement[currentAreaIndex].g.attr('opacity',0); // box 감추기
                if(isStepAction) {
                    focusShape[step].removeClass(activeClass).addClass(focusShape[step].data('beforeClass')); // focus 비활성
                }
                
            },
            'endCallback':function(){
                const bbox = dropG.getTBox();
                dropG.attr('opacity',0);
                createElement({
                    "type": "text",
                    "canvas": fbG,
                    "meta": { "cx": bbox.cx, "cy":bbox.cy, ...totalT}
                })
                console.log('종료');
                setTimeout(callback,300)
            },
        })
    }
    
    //시작
    dragAction.start();

}

export default KM000062;
