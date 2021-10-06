import Snap from 'sol-common/snap'
import {
    image
} from 'sol-common/components'
import {
    feedback, SOL
} from 'sol-common/util';

import {
    com_makeModal,
    com_pageConvert,
    K_richTextAuto,
    createElement,
    loadSpeedIcon,
    helpButton,
    loadCheckImg,
    directionText,
    multiPointerControl,
    arrayIsSame,
} from '../component';

//지문(스크롤), 선택지choice 모듈(단순 선택)
const KM000003 = function ({
    canvas = SOL.SVG,
    direction,
    elements,
    speedIcon,
    scrollArea,
    scrollText,
    scrollImage,
    scrollTextFocus,
    choiceVisible = false,
    choiceText,
    choiceWord,
    choiceAns,
    hintButton,
    callback,

    guideLine=false // 좌표선 삭제
}) {
    
    console.log('start');
    const g = canvas.g();
    const backG = g.g();
    const spBtnG=g.g();
    const ttsG = g.g();
    const scrollG = g.g();
    const converG = g.g().attr('class', 'convert');
    const answer = Array.isArray(choiceAns) ? choiceAns : [choiceAns];
    const userAns = [];
    scrollArea = {
        'x': 20,
        'y': 80,
        'x2': 730,
        'y2': 500,
        'rXY':20,
        ...scrollArea
    }
    scrollTextFocus = {
        "isFocus": false,
        "time": 1000,
        "term": 50,
        ...scrollTextFocus
    }

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

    //본문 부분
    const focusRects = [];
    const focusText = [];
    const clipPathArr = [];

    //지문 포커스 속도 전환 버튼
    let sp = 10; //기준 10, 기본 50초
    let animate;
    if (scrollTextFocus.isFocus) {
        const spIcon = loadSpeedIcon();
        const s = (speedIcon && speedIcon.scale) || 1.2;
        const cirS = 10 * s;
        const gap = (speedIcon && speedIcon.gap) || 45;
        spBtnG.circle(0, 0, cirS).addClass('f120');
        const speed=spBtnG.text(0, 0, (sp/2).toString()).addClass('ffcr f121').attr('fontSize', cirS * 3/2).center();
        spIcon[0].use().transform(Snap.matrix(s, 0, 0, s, 0 + gap, 0)).center().appendTo(spBtnG).attr('class','btn').touchOrClick(function () {
            if (sp <= 38) {
                sp = sp + 2 //소수로 들어가게 될 경우 이런식으로 수정 Number((sp + 2).toFixed(1))
                speed.node.textContent = (sp/2).toString();
                animate.speed(sp);
                console.log('up!!', sp);
            }
        })
        spIcon[1].use().transform(Snap.matrix(s, 0, 0, s, 0 - gap, 0)).center().appendTo(spBtnG).attr('class','btn').touchOrClick(function () {
            if (sp > 2) {
                sp = sp - 2 //소수로 들어가게 될 경우 이런식으로 수정 Number((sp - 2).toFixed(1))
                speed.node.textContent = (sp/2).toString();
                animate.speed(sp);
                console.log('down!!', sp);
            }
        })
        const speedBtnBBox = spBtnG.getBBox();
        const cx = (speedIcon && speedIcon.cx) || 760 - speedBtnBBox.w/2;
        const cy = (speedIcon && speedIcon.cy) || 40;
        spBtnG.transform('t'+[cx,cy]);
    }

    if (scrollArea) { //scroll 값이 있을때만 영역표시 됨
        const info = {
            'x': scrollArea.x,
            'y': scrollArea.y,
            'width': scrollArea.x2 - scrollArea.x,
            'height': scrollArea.y2 - scrollArea.y
        }
        const restG = scrollG.g();
        const rectG = scrollG.g();
        if (scrollImage) { //image 내부에 존재시
            scrollImage.forEach(el => {
                const gg = restG.g();
                const border= backG.g();
                image({
                    'canvas': gg,
                    'x': el.x,
                    'y': el.y,
                    'img': el,
                });
                if(el.rotate) gg.transform('r'+el.rotate);
                if(el.border) {
                    const imgBBox = gg.getTBox();
                    const s = el.scale || 1;
                    border.rect(imgBBox.cx,imgBBox.cy,imgBBox.w,imgBBox.h, (el.rx * s || 0), (el.ry * s || 0)).addClass('fno s'+el.border.classNum || '0002').attr('strokeWidth',el.border.borderWidth || 1).center()
                }
            });
            scrollText.forEach((el) => {
                if (el.isCartoon) {
                    const textLength=(!el.textLength || el.textLength===0) ? (info.width - el.x) : el.textLength
                    new K_richTextAuto({
                        'canvas': restG,
                        'text': el.text,
                        'x': el.x,
                        'y': el.y,
                        'className': 'ffcr f' + (el.classNum||'91'),
                        'fontSize': el.fontSize || 17,
                        'dy': el.dy || 20,
                        'textLength':textLength,
                        'isBold':el.bold || false,
                        'options' : el.options,
                        'letterSpacing':0 // 추후 수정
                    });
                }
            });
        }
        if (scrollText) { //text 내부에 존재시
            scrollText.forEach((el) => {
                if (!el.isCartoon) {
                    const textLength=(!el.textLength || el.textLength===0) ? (info.width - el.x) : el.textLength
                    const textLine = new K_richTextAuto({
                        'canvas': scrollG,
                        'text': el.text,
                        'x': el.x,
                        'y': el.y,
                        'className': 'ffng f' + (el.classNum || '91'),
                        'fontSize': el.fontSize || 18,
                        'dy': el.dy || 40,
                        'isBold':el.bold || false,
                        'textLength':textLength,
                        'options' : el.options
                    });
                    textLine.selectAll('.textLineGroup').forEach((element) => {
                        if(scrollTextFocus.isFocus) element.attr('opacity',0.2)
                        focusText.push(element);
                        const bbox = element.getTBox();
                        const focusR = rectG.rect(bbox.x, bbox.y - 3, 0, bbox.h + 6).addClass('f119')
                        const clipPathG = rectG.clipPath();
                        clipPathArr.push(clipPathG.rect(bbox.x-bbox.e, bbox.y, 0, bbox.h)); //시작점 조정(matrix 이동한 만큼 더해준다)
                        const clipText=element.clone().attr({
                            clipPath: clipPathG,
                            opacity:0
                        })
                        focusRects.push({
                            'focus': focusR,
                            'bbox': bbox,
                            'clipText':clipText,
                        });
                    });
                }
            });
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
        canvas.rect(info.x, info.y, info.width, info.height, scrollArea.rXY,  scrollArea.rXY).addClass('f'+ (scrollArea.fillClassNum || '0012')+' s'+ scrollArea.strokeClassNum ||'no').attr('fillOpacity', 1);
    }

    //문항 부분
    const choiceEl = [];
    const checkImg = loadCheckImg();
    let convertModal;
    const beforeClass = 'f14 s01';
    //정답 메타가 입력되었을 때만 실행
    if (choiceAns !== undefined) {
        //문제부분
        console.log(choiceText);
        directionText({'canvas':converG,'y':40, ...choiceText});
        //보기부분
        const wordT = [];
        const choiceG = converG.g();
        choiceWord.forEach((el, i) => {
            choiceEl[i] = choiceG.g().data('index', i).data('clickEnd',false).touchOrClick(choiceCheck).attr({
                'pointer-events': 'none'
            })
            const wordSize = el.fontSize || 15;
            const gap= wordSize*2/3;
            const boxSize = wordSize + gap;
            const box=choiceEl[i].rect(0+boxSize/2, 0, boxSize, boxSize, boxSize/2, boxSize/2).addClass(beforeClass).center();
            // .attr({
            //     'fillOpacity': 0
            // });
            const boxBBox=box.getTBox();
            wordT[i] = new K_richTextAuto({
                'canvas': choiceEl[i],
                'text': el.word,
                'x': boxBBox.x2 + gap,
                'y': boxBBox.cy,
                'className': 'ffng f' + (el.classNum || '000'),
                'fontSize': wordSize,
                'dy': el.dy || 40,
                'options' : el.options
            });
            choiceEl[i].transform('t'+[(el.x || choiceText.x), el.y])
        });
        //힌트생성
        new helpButton({
            'canvas': converG,
            'btnXY':[(hintButton.button.x || choiceText.x), hintButton.button.y],
            'fontSize':hintButton.hintText.fontSize || 14,
            'hintMessage': hintButton.hintText.text,
            'className' : 'ffng f'+( hintButton.hintText.classNum|| '91'),
            'backgroundClass':'f'+(hintButton.hintText.bgFillClass || '116')+' s'+(hintButton.hintText.bgStrokeClass || 'no'),
            'event': true
        });
        convertModal = new com_pageConvert({
            g: canvas,
            appendG: converG,
            visible: choiceVisible,
            time: 800,
            guideLine:guideLine // 좌표선 삭제
        });
    }

    if (scrollTextFocus.isFocus) focusAuto(focusRects, 0, focusText);
    //시작
    // if (choiceVisible) start(); // (추후 원래 상태 복구) 연구원 확인을 위해서 임시로 주석처리
    start(); // (추후 원래 상태 복구) 연구원 확인을 위해서 임시로 생성 -> 추후 삭제

    function start() {
        multiPointerControl({'elements':choiceEl,'state':'auto'});
        convertModal.start();
    }

    //focus 실행 함수
    function focusAuto(r, n, t) {
        const rect = r[n].focus;
        const time = scrollTextFocus.time * r[n].bbox.w / 5;
        rect.attr('opacity', 1); //focus rect 보이기
        r[n].clipText.attr('opacity',1) // 마스크 text 색 변경
        animate=Snap.animate(0, 1, function (val) {
            if((r[n].bbox.w) * val<0) console.warn( (r[n].bbox.w) * val,val); // 추후 삭제(버그)
            clipPathArr[n].attr({
                'width': (r[n].bbox.w) * val<0 ? 0 : (r[n].bbox.w) * val //음수 나오는 것 방지 버그 잡기 완료
            }) //클립패스 너비 늘려서 텍스트 진하게 만들기
            rect.attr({
                'width': (r[n].bbox.w) * val<0 ? 0 : (r[n].bbox.w) * val //음수 나오는 것 방지 버그 잡기 완료
            }) // focus rect 이동
        }, time, undefined, function () {
            rect.attr('opacity', 0);
            t[n].attr('opacity', 0);
            if (r[n + 1]) {
                setTimeout(function () {
                    focusAuto(r, n + 1, t)
                }, scrollTextFocus.term);
            } else {
                // console.log('focus 끝');
                spBtnG.selectAll('.btn').forEach(el=>el.untouchOrClick()); //버튼 비활성(이미지 오면 selectAll에 조금 변경)
                // start(); // (추후 원래 상태 복구) 연구원 확인을 위해서 임시로 주석처리
            }
        });
        animate.speed(sp);
    }
    //choice 정답체크 함수
    function choiceCheck() {
        const userIdx = this.data('index');
        const convertGap = 40;
        this.attr({
            'pointer-events': 'none',
        });
        const bool = answer.indexOf(userIdx) !== -1;
        const checkBox = this.selectAll('rect')[0];
        const bbox = checkBox.getTBox();
        const fb = new feedback({
            'canvas': converG,
            'el':[bbox.x2 - convertGap,bbox.y],
            'bool': bool,
            'gap': [0, 0],
            'scale': 0.8,
            'addAction':false,
            'onRemove':function(){}
        });
        const className = bool ? 'f14 s0018' : 'f01 s0019'
        checkBox.removeClass(beforeClass).addClass(className).attr('strokeWidth',3);
        if (bool) { //정답 시
            userAns.push(userIdx);
            userAns.sort();
            const checkImgBbox = checkImg.getBBox();
            const s = Math.min((bbox.w)/(checkImgBbox.w) , (bbox.h)/(checkImgBbox.h)) * 0.8
            checkImg.use().appendTo(converG).transform(Snap.matrix(s,0,0,s,bbox.cx - convertGap,bbox.cy)).center();
            if (arrayIsSame(userAns, answer) && callback) setTimeout(function () {
                // console.log('모두 정답');
                multiPointerControl({'elements':choiceEl,'state':'none'});
                callback();
            }, 500);
        } else { //오답 시
            checkBox.attr({
                'fillOpacity': 0.5
            });
            setTimeout(function(){
                checkBox.removeClass(className).addClass('f01 sno');
                fb.addUserAction();
            },300)
        }
    }
}

export default KM000003;