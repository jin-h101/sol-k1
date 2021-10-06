import Snap from 'sol-common/snap';
import { loadDragAndDropSound } from './com_sound';
import { areaToBBox } from './com_area';
import { handImageIcon, handImageIcon2 } from './com_image';

const dragAnimate = {
    onPath: ({
        path,
        duration = 3000,
        element,
        local = '',
        dragEnd
    }) => {
        const startPt = Snap.path.getPointAtLength(path, 0);
        return new Promise(resolve => {
            Snap.animate(
                0,
                1,
                val => {
                    const {
                        x,
                        y
                    } = Snap.path.getPointAtLength(path, val * Snap.path.getTotalLength(path));
                    const transform = local + 't' + [x - startPt.x, y - startPt.y];
                    element.transform(transform);
                },
                duration,
                undefined,
                () => {
                    if(dragEnd) dragEnd();
                    // flipCard.onFlipEnd?.();
                    resolve();
                }
            );
        });
    },
};

export const Ordering = function ({
    type = "v",
    items,
    dx = 0,
    dy = 0,
    dragArea,
    startCallback,
    moveCallback,
    endCallback
}) {
    let newItems = [];
    let position = [];
    const dadSound = loadDragAndDropSound();
    
    items.forEach((el, i) => {
        newItems[i] = el;
        position[i] = el.getBBox();
        newItems[i].data('originalIndex', i);
        newItems[i].data('ind', i);
        newItems[i].data('position', {
            "cx": position[i].cx,
            "cy": position[i].cy
        });
    });
    const areaBB = areaToBBox(dragArea || [position[0].x - 10, position[0].y - 10, position[position.length - 1].x2 + 10, position[position.length - 1].y2 + 10]); 
    const dragStart = element => {        
        const {localMatrix  } = element.transform(); 
        const local ='t' +  [localMatrix.e + dx, localMatrix.f + dy];
        element.data('originTransform', local);
    }

    const dragMove = (elemenet, dx, dy) => {
        const origin = elemenet.data('originTransform') || '';
        
        const snapInvMatrix = elemenet.transform().diffMatrix.invert();
        dx = snapInvMatrix.x(dx, dy);
        dy = snapInvMatrix.y(dx, dy);
        elemenet.transform(origin + 't' + [dx , dy]);
    };

    const dragEnd = (element) => {
        const {localMatrix, totalMatrix } = element.transform(); 
        const local ='t' +  [localMatrix.e + totalMatrix.e, localMatrix.f + totalMatrix.f]        
        element.data('originTransform', local);
    }

    async function start() {
        makeTopEl(this);
        dragStart(this);
        dadSound.drag.play(); // drag 소리
        if (startCallback) startCallback();

    }
    async function move(dx, dy) {
        dragMove(this, dx, dy);
        if (moveCallback) moveCallback();
    }
    async function end() {
        await dragEnd(this);
        await check(this);
        if (endCallback) endCallback();

    }

    const check = element => {
        const ind = element.data('ind');
        const dragBBox = element.getBBox();
        const bool = Snap.path.isPointInsideBBox(areaBB, dragBBox.cx, dragBBox.cy);
        if (bool) { // 영역에 들어와 있으면
            dadSound.drop.play();
            element.data('position', {
                "cx": dragBBox.cx,
                "cy": dragBBox.cy
            });
            // 순서 체크 (type)
            if (type === 'v') { // 세로
                newItems.sort((a, b) => {
                    if (a.data('position').cy > b.data('position').cy) return 1;
                    else return -1;
                });
            } else {
                newItems.sort((a, b) => {
                    if (a.data('position').cx > b.data('position').cx) return 1;
                    else return -1;
                });
                
            }
            newItems.forEach((el, i) => {
                el.data('ind', i).data('position', {
                    "cx": position[i].cx,
                    "cy": position[i].cy
                });
                moveAnimate({
                    element: el,
                    point: {
                        "x": position[i].x,
                        "y": position[i].y
                    }
                });
            });
        } else { // 영역에 들어와 있지 않으면 
            // 원래 자리로
            moveAnimate({
                element,
                point: {
                    "x": position[ind].x,
                    "y": position[ind].y
                }
            })
        }

    }

    const animate = async ({ element, pathStr }) => {
        const { local } = element.transform();
        element.attr({
            pointerEvents: 'none'
        });
        await dragAnimate.onPath({
            path: pathStr,
            duration: 300,
            element: element,
            local,
        });
        element.attr({
            pointerEvents: 'auto'
        });
    };

    const moveAnimate = async ({ element, point }) => {
        const { x, y } = element.getBBox();
        const pathStr = 'M' + [x, y] + 'L' + [point.x, point.y];
        await animate({ element, pathStr });
    };

    const makeTopEl = element => {
        newItems.forEach((el, i) => { 
            if (element.data('ind') !== i) element.before(el);
        });
    }

    const orderingStart = () => {
        newItems.forEach(el => {
            el.addClass('cp').attr({
                'pointerEvents': 'auto'
            });
            el.drag(move, start, end);
        });
    }

    const orderingStop = () => {
        newItems.forEach(el => {
            el.removeClass('cp').attr({
                'pointerEvents': 'none'
            });
            el.undrag();
        });
    }

    return { start: orderingStart, stop: orderingStop, item: newItems};
}

export const OrderingHint = function({
    type = "v",
    canvas,
    items,
    hintIndex = [0, 1],
    callback
}) {
    const g = canvas.g();
    let hintItems = [];
    let position = [];
    let hand;
    let myTimer = [];
    const dadSound = loadDragAndDropSound();

    items.forEach((el, i) => {
        hintItems[i] = el;
        position[i] = el.getBBox();
        hintItems[i].data('originalIndex', i);
        hintItems[i].data('originalTransform', el.transform().localMatrix);
        hintItems[i].data('position', {
            "cx": position[i].cx,
            "cy": position[i].cy
        });
    });
    hintItems.forEach((el, i) => { 
        if (el.data('originalIndex') !== hintIndex[0]) hintItems[hintIndex[0]].before(el);
    });

    const handImg1 = handImageIcon({
        canvas: g,
        scale : 0.4,
        strokeColor : '#E24481'
    });
    const handImg2 = handImageIcon2({
        canvas: g,
        scale : 0.4,
        strokeColor : '#E24481'
    });


    const handDrag = async () => {
        const movePt = type === "v" ? [position[hintIndex[1]].cx, position[hintIndex[1]].y2] : [position[hintIndex[1]].x2, position[hintIndex[1]].cy];
        const pathStr = 'M' + [position[hintIndex[0]].cx, position[hintIndex[0]].cy] + 'L' + movePt;
        hintItems[hintIndex[0]].data('position', {
            "cx": movePt[0],
            "cy": movePt[1]
        });
        await dragAnimate.onPath({
            path: pathStr,
            duration: 300,
            element: hintItems[hintIndex[0]],
        });
        const handBB = hand.getBBox();
        myTimer[2] = setTimeout(function() {
            if (hand) hand.remove();
            hand = handImg1.use().transform('t' + [handBB.x, handBB.y]).appendTo(hintItems[hintIndex[0]]);
            myTimer[3] = setTimeout(function() {
                if (hand) hand.remove();
                handDrop();
            }, 200);
        }, 300);
    }

    const handDrop = async () => {
        const dragItem = hintItems.splice(hintIndex[0], 1)[0];
        await hintItems.splice(hintIndex[1], 0, dragItem);
        dadSound.drop.play(); // drag 소리
        hintItems.forEach((el, i) => {
            const movePath = 'M' + [el.data('position').cx, el.data('position').cy] + 'L' + [position[i].cx, position[i].cy];
            dragAnimate.onPath({
                path: movePath,
                duration: 300,
                element: el,
                local: el.data('originalIndex') === hintIndex[0] ? dragItem.transform().local : '',
                dragEnd: function() {
                    if (i === 0 && callback) callback();
                }
            });
        });
    }

    const start = () => {
        const handXY = type === "v" ? [position[hintIndex[0]].x2 - 20, position[hintIndex[0]].cy] : [position[hintIndex[0]].x2 - 20, position[hintIndex[0]].y2 - 20];
        hand = handImg1.use().transform('t' + handXY).appendTo(hintItems[hintIndex[0]]);
        myTimer[0] = setTimeout(async function() {
            dadSound.drag.play(); // drag 소리
            await hand.remove();
            hand = handImg2.use().transform('t' + handXY).appendTo(hintItems[hintIndex[0]]);
            myTimer[1] = setTimeout(handDrag, 300);
        }, 500);
        
    }
    const stop = () => {
        if(hand) hand.remove();
        myTimer.forEach(el => {
            if(el) clearTimeout(el);
        });
    }

    const reset = () => {
        hintItems.sort((a, b) => {
            if (a.data('originalIndex') > b.data('originalIndex')) return 1;
            else return -1;
        });
        hintItems.forEach((el, i) => {
            el.transform(el.data('originalTransform'));
            el.data('position', {
                "cx": position[i].cx,
                "cy": position[i].cy
            });
        });
    }

    return {start, stop, reset, hintItems }
}