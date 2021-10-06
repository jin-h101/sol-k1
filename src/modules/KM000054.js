import Snap from 'sol-common/snap';

import {
    createElement,
    loadDragAndDropSound,
    simpleDrag,
    directionText,
    getYForMiddle,
    splitByOption,
    // tempGuideLine,
    loadSpeakerIcon,
    makeOk
} from '../component';
import {
    Howler
} from 'howler';
import {
    alignGroup,
    feedback
} from 'sol-common/util';
import {
    hint,
    loadSound
} from 'sol-common';

const promiseWrapper = func => new Promise(func);

const makeSentenceWithBlank = ({ canvas, sentence }) => {
    const { cx =400, cy=250, text = '', fontSize = 30, classNum = "000", blankOption={}, questionMark = true, questionMarkOption={} } = sentence;
    const offset = blankOption.offset || 10;
    const g = canvas.g();
    const lines = text.split('\n');
    let sentences = [];
    let _txtX = 0;
    let _txtY = 0;
    let blank;

    const getWordByBlank = (sentences) => {
        const words = [];
        let blankIndex = 0;
        for (var i = 0; i < sentences.length; i++) {
            if (sentences[i].indexOf('blank') !== -1) { // 'blank'가 포함되어 있다면
                words.push(sentences[i].slice(sentences[i].indexOf('{') + 1, sentences[i].length - 1));
                blankIndex = i;
            } else {
                words.push(sentences[i]);
            }
        }
        return {words, blankIndex};
    }
    
    for (let i = 0; i < lines.length; i++) {
        sentences[i] = [lines[i].replace(/\s/g, '\u00A0')];
        sentences[i] = splitByOption(sentences[i], '$blank');
        sentences[i] = getWordByBlank(sentences[i]);
    }

    
    sentences.forEach((el) => { 
        el.words.forEach((el2, i) => { // 한 줄
            if (i === el.blankIndex) {
                const { fillClassNum ="14", strokeClassNum="01", strokeWidth = 1, rXY = 10, visible = true } = blankOption;
                blank = g.rect(_txtX, _txtY, blankOption.width || (el2.length * fontSize + 10), blankOption.height || fontSize * 1.5, rXY)
                              .addClass(`f${fillClassNum} s${strokeClassNum}`).attr({
                                  'strokeWidth': strokeWidth,
                                  'visibility': visible ? "visible" : 'hidden'
                              })
                              .anchor(undefined, 'middle');
                const _bl = blank.getBBox();
                _txtX =_bl.x2 + offset;
                if (questionMark) {
                    g.text(_bl.cx, getYForMiddle(_txtY, 'ffng', questionMarkOption.fontSize || fontSize), "?").addClass(`ffng f${questionMarkOption.classNum || classNum} ta-m`).attr({
                        'fontSize': questionMarkOption.fontSize || fontSize,
                        'fontWeight': questionMarkOption.bold ? "bold" : "normal"
                    });
                }
                if (blankOption.wordVisible) {
                    g.text(_bl.cx, getYForMiddle(_txtY, 'ffng', fontSize), el2).addClass(`ffng f${classNum} ta-m`).attr({
                        'fontSize': fontSize,
                        'fontWeight': sentence.bold ? "bold" : "normal"
                    });
                }
            } else {
                const _txt = g.text(_txtX, getYForMiddle(_txtY, 'ffng', fontSize), el2).addClass(`ffng f${classNum}`).attr({
                    'fontSize': fontSize, 
                    'fontWeight': sentence.bold ? "bold" : "normal"
                }).getBBox();
                _txtX =_txt.x2 + offset;
            }
        });
        _txtY = _txtY + sentence.dy || (fontSize + 10);
    });
    
    alignGroup({
        g: g,
        x: cx,
        y: cy
    });

    blank.data('transform', blank.transform().totalMatrix);

    return {g, blank};
}

// drag
const KM000054 = async function ({
    canvas,
    direction ,
    elements,
    drag,
    puzzle,
    callback
}) {
    // tempGuideLine(canvas) // 좌표선 삭제
    const g = canvas.g();
    const ttsG = g.g();
    const firstG = g.g().attr('visibility', 'visible');  // 첫 번째 화면
    const secondG = g.g().attr('visibility', 'hidden'); // 두 번째 화면
    const backG = g.g();
    const dragG = firstG.g();
    const puzzleG = secondG.g();
    const dadSound = loadDragAndDropSound();
    let count = 0;
    let hintEl;
    let voice;
    let dragHole;
    const stepG = firstG.g().after(dragG);
    let dragCount = 0;
    const imageBtn = [];
    const btnG = secondG.g();
    let hintStart;
    const speakerIcon = loadSpeakerIcon();

    if (drag&& drag.step) {
        drag.step.forEach(el => {
            if (el.soundButton && el.soundButton.sound && el.soundButton.sound.soundUrl) {
                el.soundButton.sound.voice = loadSound(el.soundButton.sound.soundUrl);
            }
        });
    }

    if (puzzle && puzzle.eventEl) {
        puzzle.eventEl.forEach(el => {
            if (el.soundButton && el.soundButton.sound && el.soundButton.sound.soundUrl) {
                el.soundButton.sound.voice = loadSound(el.soundButton.sound.soundUrl);
            }
        });
    }

    // 지시문
    if (direction) directionText({
        'canvas': ttsG,
        ...direction
    });

    //배경 존재 시 설정
    if (elements) {
        elements.forEach(el => {
            if (el) {
                createElement({
                    "type": el.type,
                    "canvas": backG,
                    "meta": el.meta
                });
            }
        })
    }

    const dragEl = [];
    //드래그 만들기
    if (drag) {
        const dragElG = dragG.g();

        if (drag.dragEl) {
            // 드래그 요소 그리기
            drag.dragEl.elements.forEach((el, i) => {
                const currentDragG = dragElG.g();
                el.forEach(el2 => {
                    createElement({
                        "type": el2.type,
                        "canvas": currentDragG,
                        "meta": el2.meta
                    });
                });
                dragEl[i] = new simpleDrag({
                    'dragItem': currentDragG,
                    'startCallback': async function () {
                        if (hintEl) hintEl.removeHint();
                        dragEl[i].appendTo(dragG) // 현재 드래그 하는 엘리먼트를 엘리먼트 중에 가장 위로 보이도록 변경
                        Howler.stop();
                        // imgBtnG.attr('pointerEvents', 'none');
                        await dadSound.drag.play(); // drag 소리
                    },
                    'moveCallback': function () {},
                    'endCallback': async function () {
                        Howler.stop();
                        await dadSound.drop.play();
                        await dragCallback(i);
                    }
                });
            });

            // 배경 영역 그리기
            if (drag.dragEl.background) {
                const dragBackG = firstG.g().after(dragG);
                const _bbox = dragElG.getBBox();
                const { cx = _bbox.cx, cy = _bbox.cy, width= _bbox.w + 60, height = _bbox.h + 50, rXY = 10, shapeFillClassNum = "14" } = drag.dragEl.background.meta;
                    // createElement 이용
                    createElement({
                        "type": drag.dragEl.background.type,
                        "canvas": dragBackG,
                        "meta": {
                            ...drag.dragEl.background.meta, 
                            "cx": cx, 
                            "cy": cy,
                            "width": width,
                            "height": height,
                            "rXY": rXY,
                            "shapeFillClassNum": shapeFillClassNum
                        }
                    });
            }
        }


        const dragCallback = async (ind) => {
            const el = dragEl[ind]; // 현재 드래그 한 것
            const dragBBox = el.getBBox(); //현재 드래그 한 것의 bbox
            
            if (Snap.path.isPointInsideBBox(dragHole, dragBBox.cx, dragBBox.cy)) { // 영역 안에 들어오면
                const bool = drag.step[dragCount].ansIndex === ind;  // 정답 체크
                let fbRect;
                if (bool) { // 정답일 때
                    const pointXY = {
                        "cx" : drag.step[dragCount].dragPosition && drag.step[dragCount].dragPosition.cx ? drag.step[dragCount].dragPosition.cx : dragHole.cx,
                        "cy" : drag.step[dragCount].dragPosition && drag.step[dragCount].dragPosition.cy ? drag.step[dragCount].dragPosition.cy : dragHole.cy
                    }
                    // 서서히 영역에 들어가기
                    await el.moveAnimate(pointXY);
                     // 피드백 테두리
                    fbRect = dragG.rect(pointXY.cx, pointXY.cy, dragBBox.w, dragBBox.h, 10).addClass('fno s0018').attr({
                        'stroke-width': 4
                    }).center();
                } else {
                    // 피드백 테두리
                    fbRect = dragG.rect(dragBBox.x, dragBBox.y, dragBBox.w, dragBBox.h, 10).addClass('fno s0019').attr({
                        'stroke-width': 4
                    });
                }

                feedback({
                    canvas: firstG,
                    el: [Math.max(Math.min(dragBBox.x2 - 10, 720), 20), Math.max(Math.min(dragBBox.y, 470), 50)],
                    scale: 1,
                    bool: bool,
                    onRemove: async function () {
                        fbRect.remove();
                        if (bool) { // 정답일 때 피드백
                            dragCount = dragCount + 1;
                            if (drag.step[dragCount]) { // 드래그 아직 남았을 때
                                dragStart();
                            } else { // 드래그 끝났을 때
                                firstG.remove();
                                secondG.attr({
                                    'visibility': 'visible'
                                });
                                puzzleStart();
                            }
                        } else { // 오답일 때 제자리로 돌아감
                            await el.reset();
                            await el.attr({
                                'opacity': 0.4,
                                'pointerEvents': 'none'
                            });

                        }
                    }
                });
            } else { // 영역 안에 들어오지 않으면
                await el.reset();
                if (drag.step[dragCount].hint) {
                    makeHint({
                        'g': firstG,
                        'startPt':[hintStart.cx, hintStart.cy],
                        'endPt':[dragHole.cx, dragHole.cy]
                    });
                }
               
            }
        }
    }

    const card = [];
    if (puzzle) {
        const myPuzzle = [
            createElement({
                "canvas": puzzleG,
                "type": puzzle.puzzleInfo.style.beforeFlip.type,
                "meta": {
                    ...puzzle.puzzleInfo.style.beforeFlip.meta,
                    "cx": 0,
                    "cy": 0,
                }
            }).toDefs(),
            createElement({
                "canvas": puzzleG,
                "type": puzzle.puzzleInfo.style.afterFlip.type,
                "meta": {
                    ...puzzle.puzzleInfo.style.afterFlip.meta,
                    "cx": 0,
                    "cy": 0,
                }
            }).toDefs()
        ];

        // 퍼즐 그리기
        const { width, height } = myPuzzle[0].getBBox();
        let x = 0;
        let y = 0;
        puzzle.arrage.forEach((el, i) => {
            card[i] = [];
            if (el) {
                el.forEach((el2, j) => {
                    if (el2) {
                        card[i][j] = {
                            "front": puzzleG.g().attr({'opacity': 1}),
                            "back": puzzleG.g().attr({'opacity': 0})
                        }
                        myPuzzle[1].use().transform('t' + [x, y]).appendTo(card[i][j].back);
                        card[i][j]['back'].text(x, getYForMiddle(y, 'ffng', puzzle.puzzleInfo.text.fontSize || 30), el2).addClass(`ffng ta-m f${puzzle.puzzleInfo.text.basicClassNum || '14'}`).attr({
                            'fontSize': puzzle.puzzleInfo.text.fontSize || 30,
                            'fontWeight': puzzle.puzzleInfo.text.bold ? 'bold' : 'normal'
                        });
                        myPuzzle[0].use().transform('t' + [x, y]).appendTo(card[i][j].front);
                    } 
                    x = x + width;
                })
            }
           x= 0;
           y = y + height;
        });
        alignGroup({
            g: puzzleG,
            x: puzzle.puzzleInfo.position.cx,
            y: puzzle.puzzleInfo.position.cy,
        });

         // 사운드 버튼
        puzzle.eventEl.forEach((el, i) => {
            imageBtn[i] = btnG.g();
            el.soundButton.elements.forEach(el2 => {
                createElement({
                    "canvas": imageBtn[i],
                    "type": el2.type,
                    "meta": el2.meta
                });
            });
            if (el.soundButton.sound) {
                const _bb = imageBtn[i].getBBox();
                const { cx = _bb.x, cy = _bb.y, scale = el.soundButton.sound.imageUrl ? 1 : 0.8 } = el.soundButton.sound;
                if (el.soundButton.sound.imageUrl) {
                    createElement({
                        "canvas": imageBtn[i],
                        "type":'image',
                        "meta": {
                            cx,
                            cy,
                            "ImgUrl": el.soundButton.sound.imageUrl,
                            scale
                        }
                    });
                } else {
                    speakerIcon.use().transform('t' + [cx , cy] + 's' + scale).center().appendTo(imageBtn[i]);
                }
                imageBtn[i].data('flip', false).pressEvent(function(bool) {
                    if (bool) {
                        clickImg(i, el.soundButton.sound.voice);
                    }
                });
            }
            
        });
    }

    // 이미지 선택 시
    const clickImg = (ind, sound) => {
        if (hintEl) hintEl.removeHint();
        okBtn.stop();
        const puzzleIndArr = puzzle.eventEl[ind].puzzleIndex;
        const isFlip = imageBtn[ind].data('flip');
        const wordArr = [];
        imageBtn.forEach(el => el.attr({'pointerEvents': 'none'}));
        Howler.stop();
        puzzleIndArr.forEach((el, i) => {
            el.forEach((el2, j) => {
                if (el2) wordArr.push(card[i][j]['back'].selectAll('text')[0]);
            })
        });
        if (puzzle.puzzleInfo.text.pointClassNum) {
            wordArr.forEach(el => {
                el.removeClass(`f${puzzle.puzzleInfo.text.basicClassNum || '14'}`).addClass(`f${puzzle.puzzleInfo.text.pointClassNum}`);
            })
        }
        sound.play();
        sound.once('end', function () {
            if (imageBtn[ind].data('flip')) {
                imageBtn.forEach(el => el.attr({'pointerEvents': 'auto'}));
                if (count === imageBtn.length) okBtn.start();
                if (puzzle.puzzleInfo.text.pointClassNum) {
                    wordArr.forEach(el => {
                        el.removeClass(`f${puzzle.puzzleInfo.text.pointClassNum}`).addClass(`f${puzzle.puzzleInfo.text.basicClassNum || '14'}`);
                    })
                }
            }
        });
            
            puzzleIndArr.forEach((el, i) => {
                el.forEach((el2, j) => {
                    if (el2) {
                        const frontBB = card[i][j]['front'].getBBox();
                        const backBB = card[i][j]['back'].getBBox();
                 
                        if (!isFlip) {
                            promiseWrapper(resolve => {
                                {
                                    Snap.animate(
                                        0,
                                        1,
                                        val => {
                                            card[i][j]['back']
                                                .transform(Snap.matrix(-1 + 2 * val, 0, 0, 1, (1 - val) * frontBB.cx * 2, 0))
                                                .attr({ opacity: Number(val >= 0.5) });
                                            card[i][j]['front']
                                                .transform(Snap.matrix(1 - 2 * val, 0, 0, 1, 2 * backBB.cx * val, 0))
                                                .attr({ opacity: Number(!(val >= 0.5)) });
                                        },
                                        300,
                                        undefined,
                                        () => {
                                            imageBtn.forEach(el => el.attr({'pointerEvents': 'auto'}));
                                            imageBtn[ind].data('flip', true);
                                            resolve();
                                        }
                                    );
                               
                                }
                            });

                        }
                        
                    }
                });
            });
            if (!isFlip) {
                count = count + 1;
                if (count === imageBtn.length) {
                    okBtn.start();
                }
            }
            
    } // clickImg 함수 종료

    function makeHint({g, startPt, endPt}) {
        if (hintEl) hintEl.removeHint();
        hintEl = hint({
            canvas: g,
            type: 1,
            XY: startPt,
            moveTo: endPt,
            dragTime: Snap.len(startPt[0], startPt[1], endPt[0], endPt[1]) * 5
        });
    }

    function next() {
        ttsG.attr('pointerEvents','none')
        Howler.stop();
        callback();
    }

    const puzzleStart = () => {
        // 힌트
        if (hintEl) hintEl.removeHint();
        imageBtn.forEach((el, i) => el.attr({'pointerEvents': i === 0 ? 'auto' : 'none'}));
        const {cx, cy} = imageBtn[0].getBBox();
        hintEl = hint({
            canvas: secondG,
            XY: [cx, cy],
        });

    }
    
    const dragStart = () => {
        stepG.clear();
        if (drag && drag.step[dragCount]) {
            // 드래그 엘리먼트 
            dragEl.forEach(el => {
                el.attr({
                    'opacity': 1,
                    // 'pointerEvents': 'auto'
                }).nonAniReset();
            });      
            // 상단 soundbutton
            if (drag.step[dragCount].soundButton) {
                const sndG = stepG.g();
                const { elements = [], sound = undefined } = drag.step[dragCount].soundButton;
                elements.forEach(el => {
                    createElement({
                        "type": el.type,
                        "canvas": sndG,
                        "meta": el.meta
                    });
                });
                if (sound) {
                    const sndBB = sndG.getBBox();
                    const { cx = sndBB.x, cy = sndBB.y, scale = 1 } = sound;
                    if (sound.imageUrl) {
                        createElement({
                            "canvas": sndG,
                            "type":'image',
                            "meta": {
                                cx,
                                cy,
                                "ImgUrl": sound.imageUrl,
                                scale
                            }
                        });
                    } else {
                        speakerIcon.use().transform('t' + [cx , cy] + 's' + scale).center().appendTo(sndG);
                    }
               
                }

                sndG.pressEvent(function(bool) {
                    if (bool) {
                        Howler.stop();
                        sound.voice.play();
                        // sound.once('end', function () {});
                    }
                    
                });
            }


            // 하단 문장    
            const senT = makeSentenceWithBlank({
                canvas: stepG,
                sentence: drag.step[dragCount].sentence,
            });
            const dragHoleBB = senT.blank.getBBox();
            const dragHoleTrans = senT.blank.data('transform');
            dragHole = {
                ...dragHoleBB,
                "x": dragHoleBB.x + dragHoleTrans.e,
                "y": dragHoleTrans.f,
                "cx": dragHoleBB.x + dragHoleTrans.e + dragHoleBB.w/2,
                "cy":dragHoleTrans.f + dragHoleBB.h/2,
                'x2': dragHoleBB.x + dragHoleTrans.e + dragHoleBB.w,
                "y2": dragHoleTrans.f + dragHoleBB.h,
            }

            // 힌트 
            if (drag.step[dragCount].hint) { // 힌트 있을 때
                dragEl.forEach((el, i) => {
                    el.attr({
                        'pointerEvents': i === drag.step[dragCount].ansIndex ? 'auto' : 'none'
                    });
                });
                hintStart = dragEl[drag.step[dragCount].ansIndex].getBBox();
                makeHint({
                    'g': firstG,
                    'startPt':[hintStart.cx, hintStart.cy],
                    'endPt':[dragHole.cx, dragHole.cy]
                });
               
            } else { // 힌트 없을 때
                dragEl.forEach(el => {
                    el.attr({
                        'pointerEvents': 'auto'
                    });
                }); 
            }


        }
        
    }

    // ok 버튼
    const okBtn = new makeOk({
        canvas: secondG,
        visibility: true,
        // event: true,
        callback: next
    });

    // 시작
    dragStart();

}

export default KM000054;