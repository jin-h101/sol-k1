// import {
//     tempGuideLine,
//     sentenseBlank,
// } from '../component';

// // 애니메이션 + write 모듈
// const KM999999 = async function ({
//     canvas

// }) {
//     tempGuideLine(canvas) // 좌표선 삭제
//     const g = canvas.g();
//     const backG = g.g();

//     const t ='아빠 $shape{구두}$shape{가} \n$shape{큽니다.}'
//     const aaa = new sentenseBlank({
//         'canvas':backG,
//         'text':t,
//         'x': 80,
//         'y':250,
//         'dy':50,
//         'fontSize':30,
//         'classNum' : '000',
//         'textFocusNum' : '0002',
//         'focusNum' : '0001',
//         'option':[
//             {'type':'rect','blankI':[0,1],'meta':{'width':80,'height':80,'shapeFillClassNum':'14','shapeStrokeClassNum':'117','shapeStrokeWidth':1,'rXY':'5','shadowClassNum':'0006'}},
//             // {'type':'regularPolygon','blankI':[],'meta':{'length':50,'sideNum':5,'shapeFillClassNum':'14','shapeStrokeClassNum':'117','shapeStrokeWidth':1,'shadowClassNum':'0006','polygonOffset':{'x':0,'y':-5}}},
//             {'type':'circle','blankI':[],'meta':{'r':40,'shapeFillClassNum':'14','shapeStrokeClassNum':'117','shapeStrokeWidth':1,'shadowClassNum':'0006'}},
//             {'type':'rect','blankI':[0,2],'meta':{'width':80,'height':80,'shapeFillClassNum':'14','shapeStrokeClassNum':'117','shapeStrokeWidth':1,'rXY':'5','shadowClassNum':'0006'}}
//         ]
//     })

//     console.log(aaa.textGroup, aaa.focusGroup);
re;
//     let count = 0;
//     aaa.focusGroup.forEach(el => el.touchOrClick(next).attr('pointerEvents', 'none'))
//     setTimeout(function () {
//         aaa.focusGroup[count].attr({
//             'opacity': 1,
//             'pointerEvents': 'auto'
//         })
//     }, 500)

//     function next() {
//         this.untouchOrClick()
//         aaa.textGroup[count].attr('opacity', 1)
//         aaa.focusGroup[count].attr('opacity', 0)
//         if (count < 1) {
//             count++;
//             aaa.focusGroup[count].attr({
//                 'opacity': 1,
//                 'pointerEvents': 'auto'
//             })
//         }
//     }

//     return g;
// }

// export default KM999999;

import Snap from 'sol-common/snap';
import { image, loadSound } from 'sol-common/components';
import { feedback } from 'sol-common/util';

import {
    com_makeModal,
    com_pageConvert,
    K_richTextAuto,
    createElement,
    helpButton,
    loadCheckImg,
    directionText,
    multiPointerControl,
    loadPauseIcon,
    loadSpeakerIcon,
    com_makePopUp,
    loadBtnSound,
    arrayIsSame,
    tempGuideLine,
} from '../component';

//지문(스크롤), 선택지choice 모듈(단순 선택)
const KM000099 = async function ({
    canvas,
    direction,
    elements,
    scroll,
    sound,
    choiceVisible = false,
    choiceText,
    choiceWord,
    choiceAns,
    hintButton,
    callback,

    guideLine = false // 좌표선 삭제
}) {
    tempGuideLine(canvas);
    console.log('start');
    const g = canvas.g();
    const backG = g.g();
    const ttsG = g.g();
    const scrollG = g.g();
    const popUpG = g.g();
    const converG = g.g().attr('class', 'convert');
    const answer = Array.isArray(choiceAns) ? choiceAns : [choiceAns];
    const userAns = [];

    // 지시문
    if (direction)
        directionText({
            canvas: ttsG,
            ...direction
        });

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

    const touchFootNote = ({
        selectFootNote,
        g,
        callback
    }) => {
        const touchArea = [];
        let count =0;
        selectFootNote.forEach((el) => {
            const bbox = el.getTBox();
            const touch = g.rect(bbox.x, bbox.y - el.data('gap'), bbox.w + el.data('gap'), bbox.h + el.data('gap'))
                .addClass('f02 sno')
                .data('index', count)
                .touchOrClick(function(){
                    loadBtnSound(0).play();
                    callback(this.data('index'));
                })
                .attr({
                    'opacity': 0,
                    'pointerEvents': 'none'
                });
            touch.start = function () {
                if (this.attr('pointerEvents') === 'none') this.attr('pointerEvents', 'auto');
            }
            touchArea.push(touch);
            count++;
        })
        return touchArea;
    };

    const playActionBtn = ({ canvas, url, x, y, startCallback, pauseCallback }) => {
        const voice = loadSound(url);
        let seek;
        const active = (el, type) =>
            el.attr({
                pointerEvents: type,
                opacity: ['none', 'auto'].indexOf(type)
            });
        const playBtn = loadSpeakerIcon()
            .use()
            .transform('t' + [x, y])
            .appendTo(canvas)
            .touchOrClick(playCall);
        const pauseBtn = loadPauseIcon()
            .use()
            .transform('t' + [x, y])
            .appendTo(canvas)
            .touchOrClick(() => {
                pauseCall(false);
            });

        function playCall() {
            active(playBtn, 'none');
            active(pauseBtn, 'auto');
            voice.play();
            startCallback();
            voice.once('end', () => {
                pauseCall(true);
            });
        }

        function pauseCall(endBool) {
            if (!endBool) voice.pause();
            active(pauseBtn, 'none');
            active(playBtn, 'auto');
            seek = voice.seek();
            if (pauseCallback) pauseCallback({
                'current': seek,
                'total': voice._duration
            });
        }
        active(playBtn, 'none');
        active(pauseBtn, 'none');

        this.active = function () {
            playBtn.attr({
                pointerEvents: 'auto',
                opacity: 1
            });
        };
        (this.pause = function (endBool) {
            pauseCall(endBool);
        }),
            (this.currentSeek = function () {
                const currentSeek = voice.seek();
                return {
                    current: currentSeek,
                    total: voice._duration
                };
            });
        return this;
    };

    //본문 부분
    const hiddenG = [];
    const focusRects = [];
    let touchArr = [];
    let btn;
    let currentTime = 0;
    let low = 0;
    let setTimeFunction;
    if (scroll.area) {
        const info = {
            width: scroll.area.x2 - scroll.area.x,
            height: scroll.area.y2 - scroll.area.y,
            ...scroll.area
        };

        const restG = scrollG.g();
        const rectG = scrollG.g();
        if (scroll.elements) {
            scroll.elements.forEach(el => {
                createElement({
                    type: el.type,
                    canvas: restG,
                    meta: el.meta
                });
            });
        }
        if (scroll.footNoteInfo) {
            //팝업부분 생성
            scroll.footNoteInfo.forEach((fN, t) => {
                hiddenG[t] = popUpG.g().toDefs();
                fN.elements.forEach(el => {
                    createElement({
                        type: el.type,
                        canvas: hiddenG[t],
                        meta: el.meta
                    });
                });
            });
        }
        if (scroll.focusText) {
            scroll.focusText.forEach(el => {
                const textLength = !el.textLength || el.textLength === 0 ? info.width - el.x : el.textLength;
                const textLine = new K_richTextAuto({
                    canvas: scrollG,
                    text: el.text,
                    x: el.x,
                    y: el.y,
                    className: 'ffng f' + (el.classNum || '91'),
                    fontSize: el.fontSize || 18,
                    dy: el.dy || 40,
                    isBold: el.bold || false,
                    textLength: textLength,
                    options: el.options
                });
                const allFootnotes = textLine.selectAll('.footnote');
                touchArr = touchArr.concat(
                    touchFootNote({ //각주 부분 버튼화 하는 함수
                        'selectFootNote': allFootnotes,
                        'g': scrollG,
                        'callback': function (idx) {
                            popUpModal.div.style.zIndex = 10;
                            acitonStop();
                            makePopUp(scroll.footNoteInfo[idx].bgImage, hiddenG[idx])
                        }
                    }));
                textLine.selectAll('.textLineGroup').forEach((element) => {
                    const bbox = element.getTBox();
                    const yGap = 3
                    const focusR = rectG.rect(bbox.x, bbox.y - yGap, bbox.w, bbox.h + yGap * 2).addClass('f119').attr('opacity', 0)
                    focusRects.push(focusR);
                });
            });
        }

        //div 생성
        new com_makeModal({
            x: info.x,
            y: info.y,
            width: info.width,
            height: info.height,
            appendG: scrollG
        }); // div 새로 만들 때
        //외곽 영역 생성
        backG
            .rect(info.x, info.y, info.width, info.height, 20, 20)
            .addClass('f' + (info.fillClassNum || '0012') + ' s' + info.strokeClassNum || 'no')
            .attr('fillOpacity', 1);
    }


    if (sound) {
        // 음원 듣기 버튼
        btn = new playActionBtn({
            'canvas': backG,
            'url': sound.url,
            'x': 680,
            'y': 30,
            'startCallback': function () {
                focusAuto({
                    'rects': focusRects,
                    'n': low,
                    'currentT': currentTime,
                    'endTimes': sound.textEndTime
                })
            },
            'pauseCallback': function (seeks) {
                clearTimeout(setTimeFunction);
                currentTime = seeks.current.toFixed(1);
            },
        });
    }


    //문항 부분
    const choiceEl = [];
    const checkImg = loadCheckImg();
    let convertModal;
    const beforeClass = 'f14 s01';
    //정답 메타가 입력되었을 때만 실행
    if (choiceAns !== undefined) {
        //문제부분
        directionText({
            canvas: converG,
            y: 40,
            ...choiceText
        });
        //보기부분
        const wordT = [];
        const choiceG = converG.g();
        choiceWord.forEach((el, i) => {
            choiceEl[i] = choiceG.g().data('index', i).data('clickEnd', false).touchOrClick(choiceCheck).attr({
                'pointer-events': 'none'
            });
            const wordSize = el.fontSize || 15;
            const gap = (wordSize * 2) / 3;
            const boxSize = wordSize + gap;
            const box = choiceEl[i].rect(0 + boxSize / 2, 0, boxSize, boxSize, boxSize / 2, boxSize / 2).addClass(beforeClass).center();
            const boxBBox = box.getTBox();
            wordT[i] = new K_richTextAuto({
                canvas: choiceEl[i],
                text: el.word,
                x: boxBBox.x2 + gap,
                y: boxBBox.cy,
                className: 'ffng f' + (el.classNum || '000'),
                fontSize: wordSize,
                dy: el.dy || 40,
                options: el.options
            });
            choiceEl[i].transform('t' + [el.x || choiceText.x, el.y]);
        });
        //힌트생성
        new helpButton({
            canvas: converG,
            btnXY: [hintButton.button.x || choiceText.x, hintButton.button.y],
            fontSize: hintButton.hintText.fontSize || 14,
            hintMessage: hintButton.hintText.text,
            className: 'ffng f' + (hintButton.hintText.classNum || '91'),
            backgroundClass:
                'f' + (hintButton.hintText.bgFillClass || '116') + ' s' + (hintButton.hintText.bgStrokeClass || 'no'),
            event: true
        });
        convertModal = new com_pageConvert({
            g: canvas,
            appendG: converG,
            visible: choiceVisible,
            time: 800,
            guideLine: guideLine, // 좌표선 삭제
            startCallback: acitonStop
        });
        convertModal.svg.attr('pointer-events', 'none');
    }

    //팝업부분 새로운 모달
    const popUpModal = new com_makeModal({
        x: 0,
        y: 0,
        width: 800,
        height: 500,
        yGap: 500,
        zIndex: -1,
        overflow: 'none',
        appendG: popUpG
    });

    //팝업 그려지는 함수 (버튼 누를 시에 활성)
    const makePopUp = async (backImg, hiddenG) => {
        const tempImg = image({
            canvas: g,
            x: 400,
            y: 250,
            img: {
                ...backImg
            },
            center: true
        });
        const tmepImgBBox = tempImg.getTBox();
        tempImg.remove();
        const popUp = com_makePopUp({
            canvas: popUpModal.svg.g(),
            popUpSize: {
                cx: 400,
                cy: 250
            },
            closeButton: {
                x: tmepImgBBox.x2 - 50,
                y: tmepImgBBox.y + 30,
                onClick: function () {
                    popUpModal.div.style.zIndex = -1;
                }
            },
            bgImage: backImg
        });
        hiddenG.use().appendTo(popUp.g);
        await popUp.show();
    };

    //시작
    start();

    function start() {
        multiPointerControl({
            elements: [convertModal.svg, ...choiceEl],
            state: 'auto'
        });
        btn.active();
        touchArr.forEach((el) => el.start());
    }

    //focus 실행 함수
    function focusAuto({
        rects,
        n,
        currentT,
        endTimes
    }) {
        if (rects[n].attr('opacity') !== 1) rects[n].attr('opacity', 1);
        setTimeFunction = setTimeout(function () {
            rects[n].attr('opacity', 0);
            const newSeek = btn.currentSeek().current.toFixed(1);
            clearTimeout(setTimeFunction);
            if (rects[n + 1]) {
                low = n + 1;
                focusAuto({
                    'rects': rects,
                    'n': n + 1,
                    'currentT': newSeek,
                    'endTimes': endTimes
                })
            } else {
                low = 0;
            }
        }, (endTimes[n] - currentT) * 1000);
    }

    function acitonStop() {
        btn.pause();
        clearTimeout(setTimeFunction);
        currentTime = btn.currentSeek().current.toFixed(1);
    }

    //choice 정답체크 함수
    function choiceCheck() {
        const userIdx = this.data('index');
        const convertGap = 40;
        this.attr({
            'pointer-events': 'none'
        });
        const bool = answer.indexOf(userIdx) !== -1;
        const checkBox = this.selectAll('rect')[0];
        const bbox = checkBox.getTBox();
        const fb = new feedback({
            canvas: converG,
            el: [bbox.x2 - convertGap, bbox.y],
            bool: bool,
            gap: [0, 0],
            scale: 0.8,
            addAction: false,
            onRemove: function () {}
        });
        const className = bool ? 'f14 s0018' : 'f01 s0019';
        checkBox.removeClass(beforeClass).addClass(className).attr('strokeWidth', 3);
        if (bool) {
            //정답 시
            userAns.push(userIdx);
            userAns.sort();
            const checkImgBbox = checkImg.getBBox();
            const s = Math.min((bbox.w) / (checkImgBbox.w), (bbox.h) / (checkImgBbox.h)) * 0.8
            checkImg.use().appendTo(converG).transform(Snap.matrix(s, 0, 0, s, bbox.cx - convertGap, bbox.cy)).center();
            if (arrayIsSame(userAns, answer) && callback) setTimeout(function () {
                // console.log('모두 정답');
                multiPointerControl({
                    'elements': choiceEl,
                    'state': 'none'
                });
                callback();
            }, 500);
        } else { //오답 시
            checkBox.attr({
                fillOpacity: 0.5
            });
            setTimeout(function () {
                checkBox.removeClass(className).addClass('f01 sno');
                fb.addUserAction();
            }, 300);
        }
    }
}

export default KM000099;
