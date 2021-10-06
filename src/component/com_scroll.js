import {
    loadSound, hint,
} from "sol-common";
import {
    loadBtnSound
} from "./com_sound";
import {
    loadSpeakerIcon,
    loadPauseIcon
} from './com_image';
import {
    createElement
} from "./K_backgroundShape";
import {
    K_richTextAuto
} from "./K_text";
import com_makeModal from "./com_makeModal";
import {
    com_makePopUp
} from "./com_makePopUp";
import {vocabularyAddButton} from "./K_button"

const touchFootNote = ({
    selectFootNote,
    g,
    startCallback,
    callback
}) => {
    const touchArea = [];
    selectFootNote.forEach((el, i) => {
        const bbox = el.getTBox();
        const touch = g.rect(bbox.x, bbox.y - el.data('gap'), bbox.w + el.data('gap'), bbox.h + el.data('gap'))
            .addClass('f02 sno')
            .data('index', i)
            .data('textContent', el.node.textContent)
            .touchOrClick(function () {
                if(startCallback) startCallback();
                loadBtnSound(0).play();
                callback(this.data('index'), this.data('textContent'));
            })
            .attr({
                'opacity': 0,
                'pointerEvents': 'none'
            });
        touch.start = function () {
            if (this.attr('pointerEvents') === 'none') this.attr('pointerEvents', 'auto');
        }
        touchArea.push(touch);
    })
    return touchArea;
}

const playActionBtn = function ({
    canvas,
    url,
    x,
    y,
    startCallback,
    pauseCallback,
    endCallback
}) {
    const voice = loadSound(url);
    let seek;
    let isFirst = true;
    const action = (el, type) => el.attr({
        'pointerEvents': type,
        'opacity': ['none', 'auto'].indexOf(type)
    })
    const playBtn = loadSpeakerIcon().use().transform('t' + [x, y]).appendTo(canvas).touchOrClick(playCall);
    const pauseBtn = loadPauseIcon().use().transform('t' + [x, y]).appendTo(canvas).touchOrClick(() => {
        pauseCall(false)
    });

    function playCall() {
        if(startCallback) startCallback();
        action(playBtn, 'none');
        action(pauseBtn, 'auto');
        voice.play();
        if(isFirst){
            isFirst=false;
            voice.once('end', () => {
                pauseCall(true)
            });
        }
    }

    function pauseCall(endBool) {
        if (!endBool){ 
            voice.pause()
        }else { 
            if(endCallback) endCallback();
        }
        action(pauseBtn, 'none');
        action(playBtn, 'auto');
        seek = voice.seek();
        if (pauseCallback) { 
            pauseCallback({
                'current': seek,
                'total': voice._duration
            });
        }
    }
    action(playBtn, 'none');
    action(pauseBtn, 'none');

    this.el = playBtn;
    this.active = function () {
        playBtn.attr({
            'pointerEvents': 'auto',
            'opacity': 1
        });
    }
    this.pause = function (endBool) {
        pauseCall(endBool);
    }
    this.currentSeek = function () {
        const currentSeek = voice.seek();
        return {
            'current': currentSeek,
            'total': voice._duration
        }
    }
    return this
}

export const reading = function ({
    canvas,
    area,
    elements,
    focusText,
    footNoteInfo,
    sound,
    firstGuide = true,
    startCallback,
    endCallback
}) {
    const backG = canvas.g();
    const scrollG = canvas.g();
    const popUpG = canvas.g();
    const info = {
        'width': area.x2 - area.x,
        'height': area.y2 - area.y,
        ...area
    }
    const restG = scrollG.g();
    const rectG = scrollG.g();
    let footNoteArr = [];
    const hiddenG = [];
    const focusRects = [];
    let touchArr = [];
    let playBtn;
    let currentTime = 0;
    let low = 0;
    let setTimeFunction;
    let firstHint;

    if (elements) {
        elements.forEach(el => {
            createElement({
                "type": el.type,
                "canvas": restG,
                "meta": el.meta
            });
        })
    }

    if (focusText) {
        focusText.forEach((el) => {
            const textLength = (!el.textLength || el.textLength === 0) ? (info.width - el.x) : el.textLength
            const textLine = new K_richTextAuto({
                'canvas': scrollG,
                'text': el.text,
                'x': el.x,
                'y': el.y,
                'className': 'ffng f' + (el.classNum || '91'),
                'fontSize': el.fontSize || 18,
                'dy': el.dy || 40,
                'isBold': el.bold || false,
                'center': el.center || false,
                'textLength': textLength,
                'options': el.options
            });
            const allFootnotes = textLine.selectAll('.footnote')
            allFootnotes.forEach(el => footNoteArr.push(el))
            textLine.selectAll('.textLineGroup').forEach((element) => {
                const bbox = element.getTBox();
                const yGap = 3
                const focusR = rectG.rect(bbox.x, bbox.y - yGap, bbox.w, bbox.h + yGap * 2).addClass('f119').attr('opacity', 0)
                focusRects.push(focusR);
            });
        });
    }

    //팝업부분 내부 생성
    if (footNoteInfo) {
        footNoteInfo.forEach((fN, t) => {
            hiddenG[t] = popUpG.g().toDefs();
            fN.elements.forEach(el => {
                createElement({
                    "type": el.type,
                    "canvas": hiddenG[t],
                    "meta": el.meta
                });
            });
        });
        touchArr = touchArr.concat(
            touchFootNote({ //각주 부분 버튼화 하는 함수
                'selectFootNote': footNoteArr,
                'g': scrollG,
                'startCallback':function(){
                    if(startCallback) startCallback();
                },
                'callback': function (idx,word) {
                    popUpModal.div.style.zIndex = 10;
                    acitonStop();
                    makePopUp({
                        backImg:footNoteInfo[idx].bgImage, 
                        popUpSize:footNoteInfo[idx].popUpSize,
                        hiddenG:hiddenG[idx], 
                        word:word
                    })
                }
            }));
    }
    //div 생성
    new com_makeModal({
        'x': info.x,
        'y': info.y,
        'width': info.width,
        'height': info.height,
        'appendG': scrollG
    }); // div 새로 만들 때
    //외곽 영역 생성
    backG.rect(info.x, info.y, info.width, info.height, 20, 20).addClass('f' + (info.fillClassNum || '0012') + ' s' + info.strokeClassNum || 'no').attr('fillOpacity', 1);

    //팝업부분 새로운 모달
    const popUpModal = new com_makeModal({
        'x': 0,
        'y': 0,
        'width': 800,
        'height': 500,
        'yGap': 500,
        'zIndex': -1,
        'overflow': 'none',
        'appendG': popUpG
    });

    //팝업 그려지는 함수 (버튼 누를 시에 활성) 
    const makePopUp = async ({backImg, popUpSize, hiddenG, word}) => {
        let bbox;
        if(backImg){
            bbox = getImgWidth(backImg,canvas);
        }else if(popUpSize){
            bbox = popUpSize
        }
        const addBtn = new vocabularyAddButton({
            canvas : hiddenG,
            x : bbox.x2 - 50,
            y : bbox.y + 80,
            btnScale : 1,
            howlerStop : false,
            callback : function(){
                console.log('단어 추가 : ' + word);
            }
        })
        addBtn.start();
        const g = popUpModal.svg.g()
        const popUp = com_makePopUp({
            canvas: g,
            popUpSize: {
                cx: bbox.cx,
                cy: bbox.cy
            },
            closeButton: {
                "x": bbox.x2 - 50,
                "y": bbox.y + 30,
                "onClick": function () {
                    popUpModal.div.style.zIndex = -1;
                    g.remove(); // 모달 지우기
                }
            },
            bgImage: backImg
        });
        hiddenG.use().appendTo(popUp.g);
        await popUp.show();
    }

    if (sound) {
        const x = area && area.x2 ? area.x2 - 30 : 700;
        // 음원 듣기 버튼
        playBtn = new playActionBtn({
            'canvas': backG,
            'url': sound.url,
            'x': x,
            'y': 30,
            'startCallback': function () {
                if(firstHint) firstHint.removeHint();
                if(firstHint) touchArr.forEach((el) => el.start());
                if(startCallback) startCallback();
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
            'endCallback':function () {
                if(endCallback) endCallback();
            }
        });
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
            const newSeek = playBtn.currentSeek().current.toFixed(1);
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
        if(playBtn) {
            playBtn.pause(false);
            clearTimeout(setTimeFunction);
            currentTime = playBtn.currentSeek().current.toFixed(1);
        }
    }

    function getImgWidth(el,g) {
        const tempImg = createElement({
            "type": "image",
            "canvas": g,
            "meta": {'cx':400,'cy':250, ...el}
        });
        const tmepImgBBox = tempImg.getTBox();
        tempImg.remove();
        return tmepImgBBox;
    }

    this.start = function () {
        if(playBtn) playBtn.active();
        if(playBtn && firstGuide){
            const bbox =playBtn.el.getTBox();
            firstHint = hint({
                "canvas":canvas,
                "scale": 0.8,
                "XY":[bbox.cx, bbox.cy-5]
            }); //힌트 생성
        }else{
            touchArr.forEach((el) => el.start());
        }
        
    }
    this.stop = function () {
        acitonStop();
    }

    return this;
}