import {
    hint,
} from 'sol-common/components'
import {
    // tempGuideLine,
    wordButton,
    createElement,
    numberDefault,
    directionText,
} from '../component';
import {
    feedback
} from 'sol-common/util';


// choice 모듈(같은 단어 고르기)
const KM000022 = function ({
    canvas,
    direction,
    background,
    choiceElement,
    callback
}) {
    // tempGuideLine(canvas);
    choiceElement = {
        "hintCount": 0,
        "isColorChangeFeedback": true,
        ...choiceElement,
    }
    const g = canvas.g();
    const backG = g.g();
    const ttsG = g.g();
    const choiceG = g.g();
    const choiceEl = []; //실제 클릭할 수 있는 choice 엘리먼트
    let hintEl;
    let ansCount = 0;
    let count = 0;

    // 지시문
    if (direction) directionText({'canvas':ttsG, ...direction});

    //배경 존재 시 설정
    if (background) {
        background.forEach(el => {
            createElement({
                "type": el.type,
                "canvas": backG,
                "meta": el.meta
            });
        })
    }

    //텍스트
    choiceElement.textInfo.forEach((el, i) => {
        choiceEl[i] = new wordButton({
            'g': choiceG.g(),
            'text': el.text,
            'searchWord': el.searchWord,
            'classNum': el.classNum,
            'startX': el.x,
            'startY': el.y,
            'textS': el.scale || 1,
            'center': el.center,
            'btnType': el.btnType || 'rect',
            'btnWidth': el.btnWidth,
            'btnHeight': el.btnHeight,
            'btnGapX': el.btnGapX || 0,
            'btnGapY': el.btnGapY || 0,
            'btnFillClassNum': el.btnFillClassNum || '14',
            'btnStrokeClassNum': el.btnStrokeClassNum || '117',
            'btnStrokeWidth': el.btnStrokeWidth || 1,
            'btnOpacity': el.btnOpacity || 1,
            'rXY': el.btnRxy || 10,
            'r': el.btnR,
            'btnImgUrl': el.btnImgUrl,
            'btnImgScale': el.btnImgScale,
            'btnImgRotate': el.btnImgRotate,
            'shadowClassNum': el.shadowClassNum,
            'shadowDx': el.shadowDx,
            'shadowDy': el.shadowDy,
            'shadowBlur': el.shadowBlur,
            'shadowOpacity': el.shadowOpacity,
            'd': 3,
            'callback': actionCallback
        })
        ansCount = ansCount + choiceEl[i].ansCount;
    });


    //처음 시작
    start(choiceEl, count);

    //시작 함수
    function start(element, n) {
        let checkC = 0;
        element.forEach((elGroup) => {
            elGroup.el.forEach((e) => {
                const elData = e.data('data');
                if (n < choiceElement.hintCount) { //힌트 있을 때
                    if (!elData.clickEnd) {
                        if (n === checkC && elData.isAns) {
                            checkC++;
                            console.log('hit', elData, ansCount);
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
        const datas = element.data('data');
        datas.clickEnd = true; //클릭이 끝남을 나타냄
        const elBBox = element.getTBox();
        const bool = datas.isAns; //정답 여부
        //o,x 피드백
        const className = bool ? 'fno s0018' : 'fno s0019'
        const rXY = numberDefault(datas.roundV, elBBox.w / 2);
        const box = g.rect(elBBox.cx, elBBox.cy, elBBox.w, elBBox.h, rXY, rXY).addClass(className).attr({
            'strokeWidth': 5
        }).center();
        pause(choiceEl);
        const fb = new feedback({
            canvas: g,
            el: [elBBox.x2, elBBox.y],
            bool: bool,
            gap: [0, 0],
            scale: 1,
            addAction: false,
            onRemove: function () {
                const pathGroup = datas.fbGroup;
                if (bool) { //정답 시
                    //글자 색 변경
                    if (choiceElement.isColorChangeFeedback) {
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
                    box.attr('opacity', 0);
                    pathGroup.attr('opacity', 0.4)
                    fb.addUserAction();
                    setTimeout(function () {
                        start(choiceEl, count);
                    }, 300);
                }
            }
        });
    }

    function pause(elArray) {
        elArray.forEach(subEl=>subEl.el.forEach(e=>e.attr('pointerEvents','none')))
    }

}

export default KM000022;