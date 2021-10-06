import Snap from 'sol-common/snap';

import {
    createElement,
    loadDragAndDropSound,
    unPressMakeButton,
    simpleDrag,
    directionText
    // tempGuideLine
} from '../component';
import {
    Howler
} from 'howler';
import {
    feedback
} from 'sol-common/util';
import { hint, image, loadSound } from 'sol-common';

// drag
const KM000034 = async function ({
    canvas,
    direction,
    element,
    imageButtons,
    drag,
    callback
}) {
    // tempGuideLine(canvas) // 좌표선 삭제
    const g = canvas.g();
    const backG = g.g();
    const ttsG = g.g();
    const imgBtnG = g.g();
    const dragG = g.g();
    const hintG = g.g();
    const dragGroup = [];
    const dadSound = loadDragAndDropSound();
    let count = 0;
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
    console.log(element);
    if (element) {
       element.forEach(el => {
            createElement({
                "type": el.type,
                "canvas": backG,
                "meta": el.meta
            });
        })
    }

    if (imageButtons) {
        imageButtons.forEach((imgButton) => { //이미지 버튼 마다
            const ibG = imgBtnG.g();
            imgButton.imageInfo.forEach(imgEl => {
                const gg = ibG.g();
                new image({
                    'canvas': gg,
                    'x': imgEl.cx,
                    'y': imgEl.cy,
                    'img': {
                        'scale': 1,
                        ...imgEl.img
                    },
                    'center': true
                });
                if(imgEl.img && imgEl.img.rotate) gg.transform('r'+imgEl.img.rotate)
            });
            new unPressMakeButton({
                'el': ibG,
                'isButton': imgButton.isButton,
                'x': imgButton.x,
                'y': imgButton.y,
                'width': imgButton.width,
                'height': imgButton.height,
                'shadowClassNum':imgButton.shadowClassNum,
                'shadowDx':imgButton.shadowDx,
                'shadowDy':imgButton.shadowDy,
                'shadowBlur':imgButton.shadowBlur,
                'shadowOpacity':imgButton.shadowOpacity,
                'btnFillClassNum': imgButton.btnFillClassNum,
                'btnStrokeClassNum': imgButton.btnStrokeClassNum,
                'btnOpacity': imgButton.btnOpacity,
                'btnStrokeWidth': imgButton.btnStrokeWidth,
                'btnR': imgButton.btnR,
                'callback': async function () {
                    Howler.stop();
                    imgButton.voice.play()
                    imgButton.voice.once('end', function () {})
                }
            })
        })
    }

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
            dragGroup[i] = new simpleDrag({
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
                    let n;
                    if (dropBBox.some((el, j) => {
                            n = j; // drag 인덱스
                            return Snap.path.isBBoxIntersect(dragBBox, el) // 영역에 들어 왔을 때 : true
                        })) { 
                        const {x,y,x2} = dropBBox[n]; // 현재 drop한 위치의 bbox
                        const ansArr = drag.ansIndex; //정답 배열(메타)
                        const bool = userIdx === ansArr[n]; // 정답 여부
                        el.attr('pointerEvents', 'none');
                        // 서서히 영역에 들어가기
                        await el.moveAnimate({x,y});
                        let fbBox;
                        if(bool){
                            fbBox = g.rect(x,y,dragBBox.w,dragBBox.h,0,0).addClass('fno s0018').attr({
                                'strokeWidth':5
                            }); // 네모 피드백
                        }
                        // 피드백
                        const fbGap = [(drag.fbGap && drag.fbGap[n] && drag.fbGap[n].x) || 7, (drag.fbGap && drag.fbGap[n] && drag.fbGap[n].y) || 0];
                        feedback({
                            canvas: g,
                            el: [x2 + fbGap[0], y + fbGap[1]],
                            scale: 1,
                            bool: bool,
                            onRemove: async function () {
                                if (bool) { // 정답일 때 피드백
                                    drag.dragPosition[n] =undefined;
                                    el.appendTo(imgBtnG);
                                    if (count < ansArr.length - 1) { //drag가 덜 끝났을 때
                                        el.attr('pointerEvents', 'none').data('action',false);
                                        count++;
                                        fbBox.attr('opacity',0); // 덜 끝났을 때 정답 피드백 표시 없애주기
                                        act();
                                    } else { //모든 drag가 끝났을 때
                                        dragGroup.forEach(dG => dG.attr('pointerEvents', 'none').data('action',false));
                                        ttsG.attr('pointerEvents', 'none');
                                        callback();
                                    }
                                } else { // 오답일 때 피드백
                                    await el.reset();
                                    imgBtnG.attr('pointerEvents', 'auto');
                                    // 틀린 것 비활성(drag할 영역이 한개 남았을 때만 사용)
                                    if (ansArr.length - count === 1){ 
                                        el.attr({
                                            'pointerEvents': 'none',
                                            'opacity': 0.5
                                        }).data('action',false).appendTo(imgBtnG);
                                    }
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

    //처음 시작
    act();

    function makeGetBBox(xyArr, standardBBox, g) {
        const newBBoxArr = [];
        const isHint = count < drag.hintCount;
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

export default KM000034;