import {
    image
} from 'sol-common/components'
import {
    feedback, SOL
} from 'sol-common/util';


import {
    K_richTextAuto,
    createElement,
    directionText,
    arrayIsSame
} from '../component';

//choice 모듈(단순 초이스)
const KM000005 = function ({
    canvas = SOL.SVG,
    direction,
    backGround,
    choiceElement,
    callback,

}) {
    const g = canvas.g();
    const backG = g.g();
    const ttsG = g.g();
    const choiceG = g.g();
    const choiceEl = [];
    const answer = [];
    const userAns = [];

    // 지시문
    if (direction) directionText({'canvas':ttsG, ...direction});

    //배경 존재 시 설정
    if (backGround && backGround.element) {
        backGround.element.forEach(el => {
            createElement({
                "type": el.type,
                "canvas": backG,
                "meta": el.meta
            });
        })
    }

    const fbXY = [];
    choiceElement.forEach((el, i) => {
        choiceEl[i] = choiceG.g();
        if (el.isAns) answer.push(i);
        const imgX = el.backImage.cx || el.text.cx
        const imgY = el.backImage.cy || el.text.cy
        //지우개 (여기 이미지는 텍스트와 같이 rotate 되어야 하므로 예외!)
        const img = image({
            'canvas': choiceEl[i],
            'x': imgX,
            'y': imgY,
            'img': {
                "scale": 1,
                ...el.backImage
            },
            'center': true
        })
        const imgBBox = img.getBBox();
        //글자
        new K_richTextAuto({
            'canvas': choiceEl[i],
            'text': el.text.text,
            'x': el.text.cx,
            'y': el.text.cy,
            'className': 'ffng f' + (el.text.classNum || '91'), //선택
            'fontSize': el.text.fontSize || Math.min(imgBBox.w, imgBBox.h) * 0.7, //선택
            'dy': el.text.dy || 45, //선택
            'isBold': el.text.bold || false,
            'options': el.text.options,
            'center': true,
        });
        //위치 이동
        const rValue = el.rotate || 0
        choiceEl[i].transform('r' + rValue)
            .data('index', i)
            .data('clickEnd', false)
            .pressEvent(choiceCheck);
        //피드백 위치 설정을 위한 작업
        fbXY.push(rotate(imgBBox.cx, imgBBox.cy, imgBBox.cx, imgBBox.y, (rValue) * (-1)))
    });



    function rotate(cx, cy, x, y, angle) {
        var radians = (Math.PI / 180) * angle,
            cos = Math.cos(radians),
            sin = Math.sin(radians),
            nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
            ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
        return [nx, ny];
    }

    function choiceCheck(press) {
        if (!press) {
            const element = this;
            const group = element.parent();
            const userIdx = element.data('index');
            const fbBBox = element.getTBox();
            element.data('clickEnd', true); //클릭이 끝남을 나타냄
            pause(choiceEl);
            const bool = answer.indexOf(userIdx) !== -1;
            const fb = new feedback({
                canvas: group,
                el: fbXY[userIdx],
                bool: bool,
                gap: [0, 0],
                scale: 0.9,
                addAction: false,
                onRemove: function () {
                    if (bool) {
                        const r = choiceElement[userIdx].fbSize || Math.max(fbBBox.w, fbBBox.h) / 2
                        group.circle(fbBBox.cx, fbBBox.cy, r).addClass('fno s' + (choiceElement[userIdx].fbColor || '0018')).attr('strokeWidth', choiceElement[userIdx].fbStrokeWidth || 5);
                        userAns.push(userIdx);
                        userAns.sort();
                        if (arrayIsSame(userAns, answer)) {
                            setTimeout(function () {
                                console.log('모두 정답');
                                callback();
                            }, 500);
                        } else reStart(choiceEl);
                    } else {
                        element.attr('opacity', 0.4);
                        fb.addUserAction();
                        setTimeout(function () {
                            reStart(choiceEl);
                        }, 300);
                        
                    }
                }
            });
        }
    }

    function pause(el) {
        el.forEach(e => e.attr('pointerEvents', 'none'));
    }

    function reStart(el) {
        el.forEach(e => {
            if (!e.data('clickEnd')) e.attr('pointerEvents', 'auto')
        });
    }
}

export default KM000005;