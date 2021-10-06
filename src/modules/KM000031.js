import {
    createElement,
    // tempGuideLine,
    loadBtnSound,
    simpleHandWrite,
    directionText
} from '../component';
import {
    hint
} from 'sol-common';
import {
    feedback
} from 'sol-common/util';

// drag
const KM000031 = async function ({
    canvas,
    direction,
    isHint = false,
    background,
    clickButton,
    handWriteValue,
    // stepOne,
    // stepTwo,
    callback
}) {
    // tempGuideLine(canvas) // 좌표선 삭제

    const g = canvas.g();
    const ttsG = g.g();
    const stepOneG = g.g();
    const backOneG = stepOneG.g();
    const actionG = stepOneG.g();

    // const stepTwoG = g.g().attr('visibility','hidden');
    // const backTwoG = stepTwoG.g();
    // const handWriteG = stepTwoG.g();

    const click = [];
    const appear = [];
    const hw = [];
    let myHint;
    let clickCount = 0;
    let hwCount = 0;
    let focusEl;
    const btnSound = loadBtnSound(0);

    // 지시문
    if (direction) directionText({'canvas':ttsG, ...direction});

    if (isHint) {
        if (background) {
            background.forEach(el => {
                createElement({
                    "type": el.type,
                    "canvas": backOneG,
                    "meta": el.meta
                });
            })
        }
        if (clickButton) {
            clickButton.forEach((el, i) => {
                click[i] = actionG.g()
                    .touchOrClick(clickNext)
                    .attr('pointerEvents', 'none');
                if (el.touchEl) {
                    createElement({
                        "type": el.touchEl.type,
                        "canvas": click[i],
                        "meta": el.touchEl.meta
                    });
                }
                if (el.visibleEl) {
                    appear[i] = createElement({
                        "type": el.visibleEl.type,
                        "canvas": click[i],
                        "meta": el.visibleEl.meta
                    });
                    appear[i].attr('opacity', 0);
                }
            })
        }
        act();
    } else {
        if (background) {
            background.forEach(el => {
                createElement({
                    "type": el.type,
                    "canvas": backOneG,
                    "meta": el.meta
                });
            })
        }
        //두번째 단계 핸드라이트
        if (handWriteValue) {
            handWriteValue.forEach((el, j) => {
                const meta = el.element;
                hw[j] = new simpleHandWrite({
                    'canvas': actionG,
                    'x': meta.x,
                    'y': meta.y,
                    'width': meta.width,
                    'height': meta.height,
                    'rXY': meta.rXY,
                    'drawClassNum': meta.drawClassNum,
                    'drawStrokeWidth': meta.drawStrokeWidth,
                    'boxFillClassNum': meta.boxFillClassNum,
                    'boxStrokeClassNum': meta.boxStrokeClassNum,
                    'boxOpacity': meta.boxOpacity,
                    'boxStrokeWidth': meta.boxStrokeWidth,
                    'shadowDx': meta.shadowDx,
                    'shadowDy': meta.shadowDy,
                    'shadowBlur': meta.shadowBlur,
                    'shadowOpacity': meta.shadowOpacity,
                    'shadowClassNum': meta.shadowClassNum,
                    'direction': meta.direction,
                    'directionInfo': meta.directionInfo,
                    'startPoint': meta.startPoint,
                    'wordHint': meta.wordHint,
                    'wordHintClassNum': meta.wordHintClassNum,
                    'wordHintOpacity': meta.wordHintOpacity,
                    'wordHintFs': meta.wordHintFs,
                    'dotLine': meta.dotLine,
                    'dotLineClassNum': meta.dotLineClassNum,
                    'dotLineStrokeWidth': meta.dotLineStrokeWidth,
                    'dotLineOpacity': meta.dotLineOpacity,
                    'okButton': meta.okButton,
                    'undoButton': meta.undoButton,
                    'resetButton': meta.resetButton,
                    'answer': meta.ans,
                    'callback': function () {
                        hw[hwCount].btnKill();
                        if (hwCount < hw.length - 1) {
                            hwCount++;
                            hwAct(); //핸드라이트 작동 함수
                        } else {
                            // console.log('끝');
                            callback();
                        }
                    }
                });
            });
        }
        hwAct();
    }
    // //첫번째 단계 배경 존재 시 설정
    // if (stepOne.background) {
    //     stepOne.background.forEach(el => {
    //         createElement({
    //             "type": el.type,
    //             "canvas": backOneG,
    //             "meta": el.meta
    //         });
    //     })
    // }

    // //첫번째 단계 클릭 힌트 부분
    // if (stepOne.clickButton){
    //     stepOne.clickButton.forEach((el,i) => {
    //         click[i]=clickG.g()
    //                         .touchOrClick(clickNext)
    //                         .attr('pointerEvents','none');
    //         if(el.touchEl){
    //             createElement({
    //                 "type": el.touchEl.type,
    //                 "canvas": click[i],
    //                 "meta": el.touchEl.meta
    //             });
    //         }
    //         if(el.visibleEl){
    //             appear[i]=createElement({
    //                 "type": el.visibleEl.type,
    //                 "canvas": click[i],
    //                 "meta": el.visibleEl.meta
    //             });
    //             appear[i].attr('opacity',0);
    //         }   
    //     })
    // }

    //  //두번째 단계 배경 존재 시 설정
    //  if (stepTwo.background) {
    //     stepTwo.background.forEach(el => {
    //         createElement({
    //             "type": el.type,
    //             "canvas": backTwoG,
    //             "meta": el.meta
    //         });
    //     })
    // }
    // //두번째 단계 핸드라이트
    // if (stepTwo.handWriteValue){
    //     stepTwo.handWriteValue.forEach((el,j)=> {
    //         const meta = el.element;
    //         hw[j]=new simpleHandWrite({
    //             'canvas':handWriteG,
    //             'x': meta.x,
    //             'y': meta.y,
    //             'width':meta.width,
    //             'height':meta.height,
    //             'rXY': meta.rXY,
    //             'drawClassNum': meta.drawClassNum,
    //             'drawStrokeWidth':meta.drawStrokeWidth,
    //             'boxFillClassNum':meta.boxFillClassNum,
    //             'boxStrokeClassNum': meta.boxStrokeClassNum,
    //             'boxOpacity': meta.boxOpacity,
    //             'shadowDx' : meta.shadowDx,
    //             'shadowDy': meta.shadowDy,
    //             'shadowBlur': meta.shadowBlur,
    //             'shadowOpacity': meta.shadowOpacity,
    //             'shadowClassNum' : meta.shadowClassNum,
    //             'direction':meta.direction,
    //             'directionInfo':meta.directionInfo,
    //             'startPoint':meta.startPoint,
    //             'wordHint':meta.wordHint,
    //             'wordHintClassNum':meta.wordHintClassNum,
    //             'wordHintOpacity':meta.wordHintOpacity,
    //             'wordHintFs':meta.wordHintFs,
    //             'dotLine':meta.dotLine,
    //             'dotLineClassNum':meta.dotLineClassNum,
    //             'dotLineStrokeWidth':meta.dotLineStrokeWidth,
    //             'dotLineOpacity':meta.dotLineOpacity,
    //             'okButton':meta.okButton,
    //             'undoButton':meta.undoButton,
    //             'resetButton':meta.resetButton,
    //             'answer':meta.ans,
    //             'callback':function(){
    //                 hw[hwCount].btnKill();
    //                 if(hwCount<hw.length-1){
    //                     hwCount++;
    //                     hwAct(); //핸드라이트 작동 함수
    //                 }else {
    //                     // console.log('끝');
    //                     callback();
    //                 }
    //             }
    //         });
    //     });
    // }

    //처음 시작
    // act();


    //핸드라이트 실행 함수
    function hwAct() {
        if (focusEl) focusEl.clear();
        const hwMeta = handWriteValue[hwCount].element;
        //focus 만들기
        focusEl = focus({
            'canvas': actionG,
            'metas': {
                "type": "rect",
                "meta": {
                    "cx": hwMeta.x + hwMeta.width / 2,
                    "cy": hwMeta.y + hwMeta.height / 2,
                    "width": hwMeta.width,
                    "height": hwMeta.height,
                    "rXY": hwMeta.rXY || 10
                }
            },
            'focusColor': handWriteValue[hwCount].focusNum,
            'strokeWidth': handWriteValue[hwCount].focusStrokeWidth
        })
        //핸드라이트 시작
        hw[hwCount].start();
    }


    //터치 실행 함수
    function act() {
        //focus 존재 시 초기화
        if (focusEl) focusEl.clear();
        // 힌트 생성
        const bbox = click[clickCount].getTBox();
        myHint = hint({
            'canvas': actionG,
            'type': 0,
            'XY': [bbox.cx, bbox.cy]
        })
        //focus 만들기
        focusEl = focus({
            'canvas': actionG,
            'metas': clickButton[clickCount].touchEl,
            'focusColor': clickButton[clickCount].focusNum,
            'strokeWidth': clickButton[clickCount].focusStrokeWidth
        })
        // 터치 활성
        click[clickCount].attr('pointerEvents', 'auto');

    }


    //focus 만들기 함수
    function focus({
        canvas,
        metas,
        focusColor = '0001',
        strokeWidth = 5
    }) {
        const e = createElement({
            "type": metas.type,
            "canvas": canvas,
            "meta": {
                ...metas.meta,
                'shapeFillClassNum': 'no',
                'shapeStrokeClassNum': focusColor,
                'shapeStrokeWidth': strokeWidth
            }
        });
        return e;
    }


    // 클릭 완료 시 다음 행동 판단 함수
    function clickNext() {
        if (myHint) myHint.removeHint();
        this.untouchOrClick();
        btnSound.play() // 버튼 소리
        btnSound.once('end', function () {
            appear[clickCount].attr('opacity', 1);
            feedback({
                'canvas': actionG,
                'el': click[clickCount],
                'bool': true,
                'onRemove': function () {
                    setTimeout(function () {
                        if (clickCount < click.length - 1) {
                            clickCount++;
                            act();
                        } else {
                            callback();
                            // stepOneG.remove(); //step one 지우기
                            // stepTwoG.attr('visibility','visible'); //step two 보이고 시작
                            // hwAct(); //핸드라이트 시작함수
                        }
                    }, 300);
                }
            })
        })
    }

}

export default KM000031;