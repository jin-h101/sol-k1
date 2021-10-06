
import Snap from 'sol-common/snap'
import {
    image
} from 'sol-common/components'

import {
    com_makeModal,
    K_richTextAuto,
    createElement,
    makeOk,
    // tempGuideLine,
    loadSpeedIcon,
    directionText,
    multiPointerControl,
} from '../component';
import { SOL } from 'sol-common/util';

// 학습만화 모듈
const KM000001 = function ({
    canvas = SOL.SVG,
    direction,
    elements,
    speedIcon,
    scrollArea,
    scrollTextFocus,
    scrollText,
    scrollImage,
    okButton,
    callback,

}) {
    // tempGuideLine(canvas) // 좌표선 삭제
    scrollArea = {
        'x': 40,
        'y': 80,
        'x2': 760,
        'y2': 500,
        ...scrollArea
    }
    scrollTextFocus = {
        "isFocus": false,
        "time": 1000,
        "term": 50,
        ...scrollTextFocus
    }
    okButton = {
        'cx': 400,
        'cy': 1060,
        'type': 1,
        ...okButton
    }
    const g = canvas.g();
    const ttsG = g.g();
    const spBtnG = g.g();
    const scrollG = g.g();

    //본문 부분
    const focusRects = [];
    const clipPathArr = [];
    const focusText = [];

    // 지시문
    if (direction) directionText({'canvas':ttsG, ...direction});

    const info = {
        'x': scrollArea.x,
        'y': scrollArea.y,
        'width': scrollArea.x2 - scrollArea.x,
        'height': scrollArea.y2 - scrollArea.y
    }

    const backG = scrollG.g();
    const rectG = scrollG.g();
    //배경 존재 시 설정
    if (elements) {
        elements.forEach(el => {
            createElement({
                "type": el.type,
                "canvas": backG,
                "meta": el.meta
            });
        })
    }

    //지문 포커스 속도 전환 버튼
    let sp = 10; //기준 10, 기본 50초
    let animate;
    if (scrollTextFocus.isFocus) {
        const spIcon = loadSpeedIcon();
        const s = (speedIcon && speedIcon.scale) || 1.2;
        const cirS = 10 * s;
        const gap = (speedIcon && speedIcon.gap) || 45;
        spBtnG.circle(0, 0, cirS).addClass('f120');
        const speed = spBtnG.text(0, 0, (sp / 2).toString()).addClass('ffcr f121').attr('fontSize', cirS * 3/2).center();
        spIcon[0].use().transform(Snap.matrix(s, 0, 0, s, 0 + gap, 0)).center().appendTo(spBtnG).attr('class', 'btn').touchOrClick(function () {
            if (sp <= 38) {
                sp = sp + 2 //소수로 들어가게 될 경우 이런식으로 수정 Number((sp + 2).toFixed(1))
                speed.node.textContent = (sp / 2).toString();
                animate.speed(sp);
                console.log('up!!', sp);
            }
        })
        spIcon[1].use().transform(Snap.matrix(s, 0, 0, s, 0 - gap, 0)).center().appendTo(spBtnG).attr('class', 'btn').touchOrClick(function () {
            if (sp > 2) {
                sp = sp - 2 //소수로 들어가게 될 경우 이런식으로 수정 Number((sp - 2).toFixed(1))
                speed.node.textContent = (sp / 2).toString();
                animate.speed(sp);
                console.log('down!!', sp);
            }
        })
        const cx = (speedIcon && speedIcon.cx) || 760 - spBtnG.getBBox().w / 2;
        const cy = (speedIcon && speedIcon.cy) || 45;
        spBtnG.transform('t' + [cx, cy]);
    }

    if (scrollImage) { //image 내부에 존재시
        scrollImage.forEach(el => {
            const gg = backG.g();
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
    }

    if (scrollText) { //text 내부에 존재시
        scrollText.forEach((el) => {
            // const textLength=(!el.textLength || el.textLength===0) ? (info.width - el.x) : el.textLength
            const font = el.fontType || 'ffcr';
            const fontColor = 'f' + (el.classNum || '91');
            const textLine = new K_richTextAuto({
                'canvas': scrollG,
                'text': el.text,
                'x': el.cx,
                'y': el.cy,
                'className': font + ' ' + fontColor,
                'fontSize': el.fontSize || 17,
                'dy': el.dy || 27,
                'textLength': el.textLength || undefined,
                'options': el.options,
                'isBold': el.bold || false,
                'lineCenter': true,
                // 'letterSpacing': i //추후 수정
            });
            textLine.selectAll('.textLineGroup').forEach((element) => {
                if (scrollTextFocus.isFocus) element.attr('opacity', 0.2)
                focusText.push(element);
                const bbox = element.getTBox();
                const focusR = rectG.rect(bbox.x, bbox.y, 0, bbox.h).addClass('f119')
                const clipPathG = rectG.clipPath();
                clipPathArr.push(clipPathG.rect(bbox.x - bbox.e, bbox.y, 0, bbox.h).addClass('f03')); //시작점 조정(matrix 이동한 만큼 더해준다)
                const clipText = element.clone().attr({
                    clipPath: clipPathG,
                    opacity: 0
                })
                focusRects.push({
                    'focus': focusR,
                    'bbox': bbox,
                    'clipText': clipText,
                });

            });
        });
    }
    const ok = new makeOk({
        'canvas': scrollG,
        'type': okButton.type,
        'cx': okButton.cx,
        'cy': okButton.cy,
        'scale': okButton.scale,
        'visibility': true,
        'event': false,
        'callback': function() {
            multiPointerControl({'elements':[ttsG],'state':'none'});
            setTimeout(callback,500);
        }
    });

    //div 생성
    new com_makeModal({
        'x': info.x,
        'y': info.y,
        'width': info.width,
        'height': info.height,
        'appendG': scrollG
    }); // div 새로 만들 때

    //text에 focus 시작
    if (scrollText && scrollTextFocus.isFocus) focusAuto(focusRects, 0, focusText);

    //focus 실행 함수
    function focusAuto(r, n, t) {
        const rect = r[n].focus;
        const time = scrollTextFocus.time * r[n].bbox.w / 5;
        rect.attr('opacity', 1); //focus rect 보이기
        r[n].clipText.attr('opacity', 1) // 마스크 text 색 변경
        animate = Snap.animate(0, 1, function (val) {
            if ((r[n].bbox.w) * val < 0) console.warn((r[n].bbox.w) * val, val); // 추후 삭제(버그)
            clipPathArr[n].attr({
                'width': (r[n].bbox.w) * val < 0 ? 0 : (r[n].bbox.w) * val //음수 나오는 것 방지 버그 잡기 완료
                // 'width': (r[n].bbox.w) * val
            }) //클립패스 너비 늘려서 텍스트 진하게 만들기
            rect.attr({
                'width': (r[n].bbox.w) * val < 0 ? 0 : (r[n].bbox.w) * val //음수 나오는 것 방지 버그 잡기 완료
                // 'width': (r[n].bbox.w) * val
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
                spBtnG.selectAll('.btn').forEach(el => el.untouchOrClick()); //버튼 비활성(이미지 오면 selectAll에 조금 변경)
                ok.start();
            }
        });
        animate.speed(sp);
    }
}

export default KM000001;