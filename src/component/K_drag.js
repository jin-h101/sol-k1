import Snap from 'sol-common/snap';
import { loadDragAndDropSound } from './com_sound';
import { Howler } from 'howler';
import { hint } from 'sol-common';
import { feedback } from 'sol-common/util';


const dragAnimate = {
    drawPath: ({ line, duration }) => {
        const totalLength = line.getTotalLength();
        const pathStr = line.attr('d');
        return new Promise(resolve => {
            Snap.animate(
                0,
                1,
                val => {
                    const subPath = Snap.path.getSubpath(pathStr, 0, val * totalLength);
                    line.attr({ d: subPath });
                },
                duration,
                undefined,
                resolve
            );
        });
    },
    onPath: ({ path, duration = 3000, element, local = '' }) => {
        const startPt = Snap.path.getPointAtLength(path, 0);
        
        return new Promise(resolve => {
            Snap.animate(
                0,
                1,
                val => {
                    const { x, y } = Snap.path.getPointAtLength(path, val * Snap.path.getTotalLength(path));
                    const transform = local + 't' + [x - startPt.x, y - startPt.y];
                    element.transform(transform);
                },
                duration,
                undefined,
                resolve
            );
        });
    },
    blink: ({ interval = 0.5, duration = 500, element, opacity = 1 }) => {
        element.attr({ pointerEvents: 'none' });
        return new Promise(resolve => {
            Snap.animate(
                0,
                1,
                val => {
                    element.attr({ opacity: val });
                },
                duration,
                val => {
                    if (val < interval) return (-(1 / interval) * val + 1) * opacity;
                    else return (1 / (1 - interval)) * (val - interval) * opacity;
                },
                resolve
            );
        });
    },
    flip: ({ front, back, duration }) => {
        const { cx } = front.getBBox();
        return new Promise(resolve => {
            Snap.animate(0, 1, val => front.transform(Snap.matrix(1 - val, 0, 0, 1, val * cx, 0)), duration, undefined, resolve);
        });
    }
};



export const simpleDrag = function({ dragItem, draggingItem, startCallback, moveCallback, endCallback , index = undefined}) {
    dragItem.addClass('cp');
    draggingItem && draggingItem.attr({ opacity: '0', pointerEvents: 'none' });

    const originPoint = dragItem.getBBox();
    const dragStart = element => element.data('originTransform', element.transform().local);
    const dragMove = (elemenet, dx, dy) => {
        const origin = elemenet.data('originTransform') || '';
        const snapInvMatrix = elemenet.transform().diffMatrix.invert();
        dx = snapInvMatrix.x(dx, dy);
        dy = snapInvMatrix.y(dx, dy);
        elemenet.transform(origin + 't' + [dx, dy]);
    };
    const dragEnd = element => element.data('originTransform', element.transform().local);

    const start = () => {
        dragStart(dragItem);
        if (draggingItem) {
            dragStart(draggingItem);
            setDragState(false);
        }
        if (startCallback) startCallback(dragItem,index);
    };
    const move = (dx, dy) => {
        dragMove(dragItem, dx, dy);
        if (draggingItem) {
            dragMove(draggingItem, dx, dy);
            setDragState(false);
        }
        if (moveCallback) moveCallback(dragItem,index);
    };
    const end = () => {
        dragEnd(dragItem);
        if (draggingItem) {
            dragEnd(draggingItem);
            setDragState(true);
        }
        if (endCallback) endCallback(dragItem,index);
    };

    const setDragState = bool => {
        dragItem.attr({ opacity: Number(bool) });
        draggingItem.attr({ opacity: Number(!bool) });
    };

    const animate = async ({ pathStr }) => {
        const { local } = dragItem.transform();
        dragItem.attr({ pointerEvents: 'none' });
        if (draggingItem) {
            dragAnimate.onPath({ path: pathStr, duration: 300, element: dragItem, local });
            await dragAnimate.onPath({ path: pathStr, duration: 300, element: draggingItem, local });
        } else {
            await dragAnimate.onPath({ path: pathStr, duration: 300, element: dragItem, local });
        }
        dragItem.attr({ pointerEvents: 'auto' });
    };

    // dragItem.moveAnimate = async point => {
    //     const { x, y } = dragItem.getBBox();
    //     const pathStr = 'M' + [x, y] + 'L' + [point.x, point.y];
    //     await animate({ pathStr });
    // };

    dragItem.moveAnimate = async point => {
        // const { x, y } = dragItem.getBBox();
        // const pathStr = 'M' + [x, y] + 'L' + [point.x, point.y];
        const itemBB = dragItem.getBBox();
        let pathStr;
        if (point.x && point.y) {
            pathStr = 'M' + [itemBB.x, itemBB.y] + 'L' + [point.x, point.y];
        } else if (point.cx && point.cy) {
            pathStr = 'M' + [itemBB.cx, itemBB.cy] + 'L' + [point.cx, point.cy];
        }
        await animate({ pathStr });

    };

    dragItem.reset = async () => {
        const { x, y } = dragItem.getBBox();
        const pathStr = 'M' + [x, y] + 'L' + [originPoint.x, originPoint.y];
        await animate({ pathStr });
    };
    dragItem.nonAniReset = () => {
         dragItem.transform('t'+[0, 0])
    }
    dragItem.hidden = () => dragItem.attr({ opacity: '0', pointerEvents: 'none' });
    dragItem.drag(move, start, end);

    return dragItem;
}


export const copyDrag = function({ dragItem, startCallback, moveCallback, endCallback }) {
    let draggingItem;
    dragItem.addClass('cp');
    const originPoint = dragItem.getBBox();
    const dragStart = element => {
        element.data('originTransform', element.transform().local);
    }
    const dragMove = (elemenet, dx, dy) => {
        const origin = elemenet.data('originTransform') || '';
        const snapInvMatrix = elemenet.transform().diffMatrix.invert();
        dx = snapInvMatrix.x(dx, dy);
        dy = snapInvMatrix.y(dx, dy);
        elemenet.transform(origin + 't' + [dx, dy]);
    };
    const dragEnd = element => {
        element.data('originTransform', element.transform().local);
    }

    const start = () => {
        if (draggingItem) draggingItem.remove();
        draggingItem = dragItem.clone().addClass('cp');
        dragItem.draggingItem = draggingItem;
        dragStart(draggingItem);
        // dragStart(dragItem);
        if (startCallback) startCallback();
    };
    const move = (dx, dy) => {
        dragMove(draggingItem, dx, dy);
        if (moveCallback) moveCallback();
    };
    const end = () => {
        dragEnd(draggingItem);
        if (endCallback) endCallback();
    };


    const animate = async ({ pathStr }) => {
        const { local } = draggingItem.transform();
        draggingItem.attr({ pointerEvents: 'none' });
        if (draggingItem) {
            dragAnimate.onPath({ path: pathStr, duration: 300, element: draggingItem, local });
            await dragAnimate.onPath({ path: pathStr, duration: 300, element: draggingItem, local });
        } else {
            await dragAnimate.onPath({ path: pathStr, duration: 300, element: draggingItem, local });
        }
        draggingItem.attr({ pointerEvents: 'auto' });
    };

    dragItem.moveAnimate = async point => {
        const itemBB = draggingItem.getBBox();
        let pathStr;
        if (point.x && point.y) {
            pathStr = 'M' + [itemBB.x, itemBB.y] + 'L' + [point.x, point.y];
        } else if (point.cx && point.cy) {
            pathStr = 'M' + [itemBB.cx, itemBB.cy] + 'L' + [point.cx, point.cy];
        }
        await animate({ pathStr });
    };
    dragItem.reset = async () => {
        const { x, y } = draggingItem.getBBox();
        const pathStr = 'M' + [x, y] + 'L' + [originPoint.x, originPoint.y];
        await animate({ pathStr });
        if (draggingItem) draggingItem.remove();
    };
  
    dragItem.drag(move, start, end);
    
    return dragItem;
}



export const wordUnitDrag = function({
    canvas,
    dragElement,
    dropElement,
    hintCount,
    lastHidden = true,
    isStepAction = false,
    startCallback,
    dragCallback,
    endCallback
}){
    let count = 0;
    const hintG = canvas.g();
    const dragGroup = [];
    const dadSound = loadDragAndDropSound();
    let hintEl;

    const startCall = async function (element,index) {
        if (hintEl) hintEl.removeHint();
        dragGroup[index].appendTo(element.parent()) // ?????? ????????? ?????? ??????????????? ???????????? ?????? ?????? ?????? ???????????? ??????
        Howler.stop();
        await dadSound.drag.play(); // drag ??????
    }
    const lastHiddenGroup = [];
    const prove = ({dragEl,dropEl, isStep,currentCount}) => {
        const dragBBox = dragEl.getBBox(); //?????? ????????? ??? ?????? bbox
        let isInside = false, dropAreaIndex, currentDropBBox;
        dropEl.forEach((d,i) => {
            const bbox = d.bbox;
            const isNonStepProve = (!isStep && Snap.path.isBBoxIntersect(dragBBox, bbox));
            const isStepProve = (isStep && i === currentCount && Snap.path.isBBoxIntersect(dragBBox, bbox));
            if(isNonStepProve || isStepProve) {
                isInside = true;
                dropAreaIndex = i;
                currentDropBBox = bbox;
            }
        })
        return {
            'isInside':isInside,
            'areaIndex': dropAreaIndex,
            'currentDropBBox' : currentDropBBox
        }
    }

    const endCall = async function (element,index) {
        Howler.stop();
        await dadSound.drop.play(); // drop ??????
        const currentElement = dragGroup[index];  
        const pv = prove({
            'dragEl':currentElement,
            'dropEl': dropElement,
            'isStep': isStepAction,
            'currentCount': count
        })
             console.log(pv);
        if(pv.isInside) {  // ?????? ????????? ?????? ?????? ?????? ?????????
            const {cx, cy} = pv.currentDropBBox
            const bool = dropElement[pv.areaIndex].ansIndex === index; // ?????? ??????
            element.attr('pointerEvents', 'none');
            // ????????? ????????? ????????????
            await element.moveAnimate({cx, cy});
            feedback({
                canvas: canvas,
                el : currentElement,
                scale: 1,
                bool: bool,
                onRemove: async function () {
                    if (bool) { // ????????? ??? ?????????
                        dropElement[pv.areaIndex].bbox = undefined;
                        lastHiddenGroup.push(element);
                        if (count < dropElement.length - 1) { //drag??? ??? ????????? ???
                            element.attr('pointerEvents', 'none').data('action',false);
                            // dragEl.nonAniReset(); //?????? ????????? ?????? ?????????(??? ?????? ?????? ????????? ?????? ?????? ???)
                            if(dragCallback) dragCallback(count,pv.areaIndex);
                            count++;
                            dragGroup.forEach((el,a) => {
                                if(a!==index) el.data('action',true).attr('opacity',1);
                            })
                            act(true);
                        } else { //?????? drag??? ????????? ???
                            dragGroup.forEach(dG => dG.attr('pointerEvents', 'none').data('action',false));
                            if(lastHidden) lastHiddenGroup.forEach(el => el.hidden());
                            if(endCallback) endCallback();
                        }
                    } else { // ????????? ??? ?????????
                        await element.reset();
                        // ?????? ??? ?????????(drag??? ????????? ?????? ????????? ?????? ??????)
                        if(isStepAction || (count === dropElement.length - 1)){
                            element.attr({
                                'pointerEvents': 'none',
                                'opacity': 0.5
                            }).data('action',false);
                        }
                    }
                }
            });
        } else { // ????????? ????????? ?????? ??? : false
            await element.reset();
            act(false);
        }
    }

    const makeHint = ({count,drag,drop,ansIndex}) => {
        const dragBBox = drag[ansIndex].getBBox()
        const dropBBox = drop[count].bbox;
        if (hintEl) hintEl.removeHint();
        hintEl = hint({
            canvas: hintG,
            type: 1,
            XY: [dragBBox.cx,dragBBox.cy],
            moveTo: [dropBBox.cx,dropBBox.cy],
            dragTime: Snap.len(dragBBox.cx, dragBBox.cy, dropBBox.cx, dropBBox.cy) * 5
        });
    }

    const act = (firstBool) => {
        if(startCallback && firstBool) startCallback(count);
        if (count < hintCount) { // ?????? ?????? ???
            const ans = dropElement[count].ansIndex;
            makeHint({
                'count':count,
                'drag':dragGroup,
                'drop':dropElement,
                'ansIndex': ans
            });
            dragGroup.forEach((el,a) => {
                if(a === ans && el.attr('pointerEvents')==='none') el.attr('pointerEvents','auto');
            });
        } else { //?????? ?????? ???
            dragGroup.forEach(el => {
                if(el.data('action') && el.attr('pointerEvents')==='none') el.attr('pointerEvents','auto');
            });
        }
    }


    dragElement.forEach((dragEl,i)=>{
        dragGroup[i] = simpleDrag({
            'dragItem': dragEl,
            'index': i,
            'startCallback': startCall,
            'endCallback': endCall
        }).attr('pointerEvents','none') 
            .data('action',true); // ????????? ?????? ?????????
    })

    
    this.start = function(){
        act(true);
    }

    return this;
}