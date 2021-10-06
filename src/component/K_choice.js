import { hint } from "sol-common";
import { feedback } from "sol-common/util";
import { K_makeButton } from "./K_button";
import com_makeModal from "./com_makeModal";
import { K_richTextAuto } from "./K_text";
import { multiPointerControl } from "./com_util";

export const stepChoice = function({
    canvas,
    choiceEl,
    ans,
    hintCount,
    standardIndex,
    fbOpacity = 0.5,
    btnRxy = 10,
    btnShadowClassNum = '0006',
    choiceCallback,
    howlerStop = true,
    inactiveAttr,
    isLastChoiceGroup = false, // 210910
    fbStrokeWidth = 5,
    callback
}) {
    canvas.attr('visibility', 'hidden');
    ans = Array.isArray(ans) ? ans : [ans];
    const choice = [];
    let n = 0;
    let hintEl;
    let choiceDiv;
    choiceEl.forEach(function (el, i) {
        const bbox = el.getBBox();
        const shadowClassNum = Array.isArray(btnShadowClassNum) ? btnShadowClassNum[i] : btnShadowClassNum;
        const rxy = Array.isArray(btnRxy) ? btnRxy[i] : btnRxy;
        choice[i]=new K_makeButton({
            el: el,
            x: bbox.cx,
            y: bbox.cy,
            width: bbox.width,
            height: bbox.height,
            fillClassNum: 'no', //setClass.classNum,
            strokeClassNum: 'no', //setClass.strokeClassNum,
            shadowClassNum: shadowClassNum,
            pressEffect: true,
            r: rxy,
            index: i,
            isMetaSize: true,
            endCallback: _handler
        })
        el.data('rxy',rxy)
        el.stop();
    });
    if(standardIndex){
        //div 생성
        choiceDiv = new com_makeModal({
            x: 0,
            y: 0,
            width: 800,
            height: 500,
            zIndex: 0,
            appendG: canvas
        }); // div 새로 만들 때
    }

    

    function _hintShow(index) {
        if (hintCount) {
            if (typeof hintCount === 'number' && n >= hintCount) return;
            const {cx,cy} = choiceEl[index].getBBox();
            hintEl = hint({
                canvas: canvas,
                XY: [cx, cy-5]
            }); //힌트 생성
            _disable(index);
        }
    }

    function _handler(index, element) {
        if (hintEl) hintEl.removeHint();
        choiceEl[index].data('clickEnd', true); //클릭이 끝남을 나타냄
        const {x,y,w,h,x2} = choiceEl[index].getBBox();
        const bool = ans.indexOf(index) !== -1;
        const className = bool ? 'fno s0018' : 'fno s0019';
        const rxy = choiceEl[index].data('rxy');
        _disable();
        if(standardIndex) choiceDiv.div.style.zIndex = standardIndex+1;
        //o,x 피드백
        const box = canvas.rect(x, y, w, h, rxy, rxy).addClass(className).attr({
            strokeWidth: fbStrokeWidth
        }); // 네모 피드백 
        const fb = new feedback({
            canvas: canvas,
            el: [x2,y],
            bool: bool,
            gap: [0, 0],
            scale: 1,
            addAction: false,
            howlerStop: howlerStop,
            onRemove: function () {
                if (bool) {
                    n += 1;
                    setTimeout(function () {
                        if(standardIndex) choiceDiv.div.style.zIndex = standardIndex-1;
                        if(choiceCallback) choiceCallback(index);
                        if (n < ans.length) {
                            _enable();
                            _hintShow(ans[n]);
                        }else{
                            shadowControl ('hidden',true);
                            callback(choiceDiv);
                        }
                    }, 300);
                } else {
                    fb.addUserAction();
                    box.attr('opacity', 0);
                    element.attr({
                        opacity: fbOpacity
                    });
                    setTimeout(_enable, 300);
                }
            }
        });
    }

    function _disable(except) {
        choiceEl.forEach(function (el, i) {
            if (i !== except) {
                el.stop();
            }
        });
    }

    function _enable() {
        choiceEl.forEach(function (el) {
            if (!el.data('clickEnd')) {
                el.reStart();
            }
        });
    }

    // 그림자 control
    function shadowControl (type,isEnd) {
        if(type === 'visible') {
            canvas.selectAll('.kBtnShadow').forEach(btnShadow => btnShadow.attr('opacity', btnShadow.data('opacity'))); //버튼 그림자 활성
        }else if (type === 'hidden') {
            canvas.selectAll('.kBtnShadow').forEach(btnShadow => btnShadow.attr('opacity',0)); //버튼 그림자 비활성
            choiceEl.forEach((el) => {
                if(isEnd && !el.data('clickEnd') && !isLastChoiceGroup) el.attr('opacity',fbOpacity); // 210910
            })
        }
    }
    
    // 활성,비활성에 맞도록 rect와 text 클래스 data화 하기
    function activeCheck(element,attr){
        if(attr) {
            element.forEach(el => {
                el.selectAll('rect').forEach(e => {
                    if(!e.data('btn')){  
                        const totalClass = e.attr('class');
                        const originClass = totalClass.substr(totalClass.indexOf('f'),totalClass.indexOf(' '))
                        const inactiveClass = 'f' + (attr.shapeFillClassNum || '14')
                        e.data('originClass',originClass).data('inactiveClass',inactiveClass)
                    }
                })
                el.selectAll('text').forEach(e => {
                    const totalClass = e.attr('class');
                    const originClass = totalClass.substr(totalClass.indexOf(' '),totalClass.length-1)
                    const inactiveClass = 'f' + (attr.classNum || '0028')
                    e.data('originClass',originClass).data('inactiveClass',inactiveClass)
                })
            })
        }
    }

    // 활성, 비활성 control
    function activeControl (element,type){
        element.forEach(el => {
            el.selectAll('rect').forEach(e => {
                if(!e.data('btn')){
                    const classArr = [e.data('originClass'),e.data('inactiveClass')]
                    e.removeClass(classArr[type]).addClass(classArr[1-type])
                }
            })
            el.selectAll('text').forEach(e => {
                const classArr = [e.data('originClass'),e.data('inactiveClass')] 
                e.removeClass(classArr[type]).addClass(classArr[1-type])
            })
        })
    }

    this.show = function () {
        canvas.attr('visibility', 'visible');
        shadowControl ('hidden',false);
        if(inactiveAttr){
            activeCheck(choiceEl,inactiveAttr);
            activeControl(choiceEl,0);
        }
    };

    this.start = function () {
        canvas.attr('visibility', 'visible');
        shadowControl ('visible');
        if(inactiveAttr){
            activeControl (choiceEl,1);
        }
        if(standardIndex) choiceDiv.div.style.zIndex = standardIndex-1;
        _enable();
        _hintShow(ans[0]);
    };

    return this
}



export const sentenseSplitChoice = function ({
    canvas,
    sentense,
    x,
    y,
    classNum = '000',
    fontSize = 40,
    hoverClassNum = '02',
    fbClassNum = '0002',
    isHint = false,
    ansIndex,
    callback
}){
    const g = canvas.g();
    const makeText = sentense.replace(/choose{/g, 'option{');
    const makeOptions = [];
    const choiceEl = [];
    let hintEl;
    for (let z = 0; z < makeText.match(/option/g).length; z++) {
        makeOptions[z] = {'type':'underline','classNum' : hoverClassNum}
    }
    const chooseT = K_richTextAuto({
        canvas : g,
        x : x,
        y : y,
        text : makeText,
        className : 'ffng f' + classNum,
        fontSize : fontSize,
        options : makeOptions
    });

    chooseT.selectAll('line').forEach((el,i) => {
        el.attr('opacity',0);
        const bbox = el.getBBox();
        const matchT = searchMatchingText (chooseT,bbox.x);
        choiceEl[i]=g.rect(bbox.x, bbox.y - fontSize - 3, bbox.w, fontSize)
                .addClass('f14 sno')
                .attr({
                    'opacity':0,
                    'pointerEvents':'none'
                })
                .hover(
                    ()=>el.attr('opacity',1),
                    ()=>el.attr('opacity',0)
                )
                .data('datas', {
                    'index' : i,
                    'line' : el,
                    'text' : matchT
                })
                .touchOrClick(clickAction);
    });

    

    function searchMatchingText (elGroup,currentX){
        let currentText;
        elGroup.selectAll('text').forEach(t => {
            if(t.getBBox().x === currentX) currentText = t;
        })
        currentText.data('beforeClass', 'f' + classNum); 
        return currentText;
    }

    function clickAction() {
        if(hintEl) hintEl.removeHint();
        const {index, line, text} = this.data('datas');
        this.untouchOrClick();
        line.attr('opacity',0); //line 안보이도록 처리
        this.unhover(); // 마우스 hover 이벤트 제거
        const bool = index === ansIndex;
        const fb = new feedback({
            canvas: g,
            el: this,
            bool: bool,
            gap: [0, 0],
            scale: 1,
            addAction: false,
            onRemove: function () {
                if(bool){ 
                    text.removeClass(text.data('beforeClass'))
                        .addClass('f' + fbClassNum)
                        .attr('fontWeight','bold');
                    multiPointerControl({elements:choiceEl,state:'none'});
                    choiceEl.forEach(el=>el.data('datas').text.attr('opacity',1));
                    callback();
                }else{
                    fb.addUserAction();
                    text.attr('opacity',0.5)
                }
            }
        });
    }

    this.start = function(){
        if(isHint){
            const pickEl = choiceEl[ansIndex];
            const bbox = pickEl.getBBox();
            hintEl=hint({
                canvas, 
                scale : 1, 
                type : 0, 
                XY : [bbox.cx, bbox.cy - 5]
            })
            pickEl.attr('pointerEvents','auto');
            pickEl.unhover();
        }else{
            multiPointerControl({elements:choiceEl,state:'auto'});
        }
    }

    return this;
}