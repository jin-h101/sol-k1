import {
    image,
    loadSound,
    hint,
} from 'sol-common/components'
import {
    feedback
} from 'sol-common/util';

import {
    createElement,
    wordButton,
    unPressMakeButton,
    directionText,
    // tempGuideLine
} from '../component';

import {
    Howler
} from 'howler';

// choice 모듈(자모음 고르기, 피드백 path 변환)
const KM000011 = async function ({
    canvas,
    direction,
    elements,
    imageButton,
    choice,
    callback,

}) {
    // tempGuideLine(canvas);
    choice = {
        x:50,
        y:50,
        btnWidth: 100,
        btnHeight: 100,
        textScale: 0.6,
        hintCount: 0,
        btnGapX: 0,
        btnGapY: 0,
        isColorChangeFeedback: true,
        ...choice
    }
    const g = canvas.g();
    const backG = g.g();
    const ttsG = g.g();
    const imgG = g.g();

    const choiceG = g.g();
    const choiceEl = []; //실제 클릭할 수 있는 choice 엘리먼트
    let count = 0;
    let hintEl;

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

    // 그림 이미지 버튼
    if (imageButton) {
        const arrImageButton = Array.isArray(imageButton) ? imageButton : [imageButton]
        arrImageButton.forEach((imageButton) => {
            let voice;
            voice = loadSound(imageButton.soundInfo.url);        
            const imgBtnG=imgG;
            if (imageButton.imageInfo) {
                console.log(imageButton.imageInfo);
                imageButton.imageInfo.forEach(imgEl => {
                    const gg = imgBtnG.g()
                    new image({
                        'canvas': gg,
                        'x': imgEl.cx,
                        'y': imgEl.cy,
                        'img': {
                            'scale': 1,
                            ...imgEl
                        },
                        'center': true
                    });
                    if(imgEl.rotate) gg.transform('r'+imgEl.rotate)
                });
            }

            //이미지 버튼
            new unPressMakeButton({
                'el': imgBtnG,
                'isButton':imageButton.isButton,
                'x': imageButton.x,
                'y': imageButton.y,
                'width': imageButton.width, 
                'height': imageButton.height,
                'shadowClassNum':imageButton.shadowClassNum,
                'shadowDx':imageButton.shadowDx,
                'shadowDy':imageButton.shadowDy,
                'shadowBlur':imageButton.shadowBlur,
                'shadowOpacity':imageButton.shadowOpacity,
                'btnFillClassNum' : imageButton.btnFillClassNum,
                'btnStrokeClassNum' : imageButton.btnStrokeClassNum,
                'btnOpacity': imageButton.btnOpacity,
                'btnStrokeWidth': imageButton.btnStrokeWidth,
                'btnR': imageButton.btnR,
                'callback' : async function () {
                    Howler.stop();
                    voice.play()
                    voice.once('end', function () {})
                }
            })
        })
    }

    choiceEl[0] = new wordButton({
        'g': choiceG.g(),
        'text': choice.text,
        'searchWord': choice.searchWord,
        'classNum': choice.classNum,
        'startX': choice.x,
        'startY': choice.y,
        'textS': choice.textScale,
        'center': choice.center,
        'btnType' : choice.btnType || 'rect',
        'btnWidth': choice.btnWidth,
        'btnHeight': choice.btnHeight,
        'btnGapX': choice.btnGapX || 0,
        'btnGapY': choice.btnGapY || 0,
        'btnFillClassNum': choice.btnFillClassNum || '14',
        'btnStrokeClassNum': choice.btnStrokeClassNum || '117',
        'btnStrokeWidth': choice.btnStrokeWidth || 1,
        'btnOpacity':choice.btnOpacity || 1,
        'rXY': choice.btnRxy || 10,
        'r' : choice.btnR,
        'btnImgUrl':choice.btnImgUrl,
        'btnImgScale':choice.btnImgScale,
        'btnImgRotate':choice.btnImgRotate,
        'shadowClassNum':choice.shadowClassNum,
        'shadowDx':choice.shadowDx,
        'shadowDy':choice.shadowDy,
        'shadowBlur':choice.shadowBlur,
        'shadowOpacity':choice.shadowOpacity,
        'd': 3,
        'callback': actionCallback
    })
    const ansCount =  choiceEl[0].ansCount;

    //처음 시작
    start(choiceEl, count);
    //시작 함수
    function start(element, n) {
        let checkC = 0;
        element.forEach((elGroup) => {
            elGroup.el.forEach((e) => {
                const elData = e.data('data');
                if (n < choice.hintCount) { //힌트 있을 때
                    if (!elData.clickEnd) {
                        if (n === checkC && elData.isAns) {
                            checkC++;
                            console.log('hit', elData, 0);
                            e.attr('pointerEvents', 'auto');
                            hintEl = hint({
                                "canvas": elData.fbGroup,
                                "XY": elData.centerXY
                            }); //힌트 생성
                        }
                    } else if (elData.isAns) checkC++;
                } else { //힌트가 없거나 끝났을 때
                    if (!elData.clickEnd) e.attr('pointerEvents', 'auto');
                }
            })
        })
    }

    //엘리먼트 클릭 시 실행 되는 함수
    function actionCallback() {
        const element = this;
        if (hintEl) hintEl.removeHint();
        this.untouchOrClick();
        element.data('clickEnd', true); //클릭이 끝남을 나타냄
        const datas = element.data('data');
        datas.clickEnd = true; //클릭이 끝남을 나타냄
        const elBBox = element.getTBox();
        const bool = datas.isAns; //정답 여부
        pause(choiceEl);
        //o,x 피드백
        const className = bool ? 'fno s0018' : 'fno s0019'
        const rXY = datas.roundV || elBBox.w/2;
        const box = g.rect(elBBox.cx, elBBox.cy,elBBox.w,elBBox.h,rXY,rXY).addClass(className).attr({
            'strokeWidth':10
        }).center();
        const fb = new feedback({
            canvas: g,
            el: [elBBox.cx, elBBox.y],
            bool: bool,
            gap: [0, 0],
            scale: 1,
            addAction: false,
            onRemove: function () {
                const pathGroup = datas.fbGroup;
                if (bool) { //정답 시
                    //글자 색 변경
                    if (choice.isColorChangeFeedback){ 
                        pathGroup.selectAll('.path')[datas.changePathIndex]
                            .removeClass(datas.beforeClass)
                            .addClass('f0018 sno');
                    }
                    count++;
                    // 다음 상태 진행
                    setTimeout(function () {
                        if (ansCount === count) callback();
                        else start(choiceEl, count);
                    }, 300);
                } else { //오답시
                    box.attr('opacity',0);
                    pathGroup.attr('opacity', 0.4);
                    fb.addUserAction();
                    setTimeout(function () {
                        start(choiceEl, count); // 힌트 시 무조건 정답처리 되므로 재시작 괜찮음
                    }, 300);
                }
            }
        });
    }

    function pause(elArray) {
        elArray.forEach(subEl=>subEl.el.forEach(e=>e.attr('pointerEvents','none')))
    }
}

export default KM000011;