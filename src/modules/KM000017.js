import Snap from 'sol-common/snap'

import {
    K_richTextAuto,
    // tempGuideLine,
    popUpHandWrite,
    oneWordCombine,
    createElement,
    makeOk,
    directionText
} from '../component';

// 애니메이션 + trace 모듈(낱자)
const KM000017 = async function ({
    canvas,
    direction,
    elements,
    shapeInfo,
    popUpInfo,
    okButton,
    callback,
}) {
    okButton = {
        'type': 0,
        'cx': 400,
        'cy': 450,
        ...okButton
    }
    // const equationValue = popUpInfo.equationValue;
    const handWriteValue = popUpInfo.handWriteValue;
   
    // tempGuideLine(canvas) // 좌표선 삭제
    const g = canvas.g();
    const backG = g.g();
    const ttsG = g.g();
    const shapeG = g.g();
    const popUpG = g.g();
    const quiz = [];
    let count = 0;

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

    const lastOK = new makeOk({
        'canvas': shapeG,
        'type': okButton.type,
        'cx': okButton.cx,
        'cy': okButton.cy,
        'scale':okButton.scale,
        'visibility': false,
        'event': false,
        'callback': callback
    });

    for (let z = 0; z < shapeInfo.row.text.length; z++) {
        const size = shapeInfo.size;
        const gap = size + shapeInfo.shapeGap;
        const rowN = z % (shapeInfo.row.maxCount);
        const colN = Math.floor(z / (shapeInfo.row.maxCount))
        const cx = shapeInfo.cx + (gap + size + shapeInfo.rowGap) * colN;
        const cy = shapeInfo.cy + shapeInfo.colGap * rowN;
        shapeG.line(cx, cy, cx + gap, cy).addClass('s' + shapeInfo.strkoClassNum).attr({
            'strokeWidth': 2,
            'strokeDasharray': '0.1, 3',
            "strokeLinecap": "round"
        })
        for (let q = 0; q < 2; q++) {
            const isUserAnsVisible = false; // 정답 시 학습자가 쓴 path로 보여줄지 여부
            const fillColor = q === 0 ? shapeInfo.fillClassNum : '14'
            const r = shapeInfo.type === 'circle' ? size / 2 : undefined
            shapeG.rect(cx + gap * q, cy, size, size, r, r).addClass('f' + fillColor + ' s' + shapeInfo.strkoClassNum).center();
            const index = shapeInfo.questionIndex.indexOf(z);
            if (q !== 1 || index === -1) {
                const word = q === 0 ? shapeInfo.row.text[z] : oneWordCombine([shapeInfo.row.text[z], shapeInfo.addText]);
                new K_richTextAuto({
                    'canvas': shapeG,
                    'text': word,
                    'x': cx + gap * q,
                    'y': cy,
                    'className': 'ffng f91 sno', //선택
                    'fontSize': size * 0.7, //선택
                    'dy': 45, //선택
                    'isBold': false,
                    'options': undefined,
                    'center': true
                });
            } else {
                const x = cx - size / 2 + gap
                const y = cy - size / 2
                const w = size
                const h = size
                // equationValue.scaleAndOffset = equationValue.wordInfo[index] || {
                //     "scale": 0.8,
                //     "offset": {
                //         "x": 0,
                //         "y": 0
                //     }
                // }
                quiz[index] = new popUpHandWrite({
                    'canvas': popUpG,
                    'popUpSize': popUpInfo.size,
                    'popUpFillColor': popUpInfo.fillClassNum,
                    'popUpStrokeColor': popUpInfo.strokeClassNum,
                    'touchBBox': {
                        'x': x,
                        'y': y,
                        'w': w,
                        'h': h,
                        'r': r,
                        // 'penXY': shapeInfo.pencilXY
                    },
                    'wordArr': [shapeInfo.row.text[z], shapeInfo.addText],
                    'equationValue': popUpInfo.equationValue,
                    'handWriteValue': handWriteValue,
                    'soundFeedback': shapeInfo.sound[index],
                    'midCallback': function () {
                        ttsG.attr('pointerEvents', 'none');
                    },
                    'callback': function (ans, pathArr) {
                        //피드백
                        quiz[count].g.attr('opacity', 0)
                        const bbox = quiz[count].g.getTBox();
                        if (isUserAnsVisible) { // 학습자가 쓴 path
                            shapeG.path(pathArr)
                                .transform(Snap.matrix(w / handWriteValue.width, 0, 0, h / handWriteValue.height, x - (handWriteValue.x * w / handWriteValue.width), y - (handWriteValue.y * h / handWriteValue.height)))
                                .addClass('fno s' + (handWriteValue.drawClassNum || '001'))
                                .attr({
                                    'strokeWidth': 10,
                                    'strokeLinecap': 'round',
                                    'strokeLinejoin': 'round'
                                });
                        } else { // 모범답안 생성
                            new K_richTextAuto({
                                'canvas': shapeG,
                                'text': ans,
                                'x': bbox.cx,
                                'y': bbox.cy,
                                'className': 'ffng f02', //선택
                                'fontSize': size * 0.7, //선택
                                'dy': 45, //선택
                                'isBold': false,
                                'options': undefined,
                                'center': true
                            });
                        }

                        count++;
                        setTimeout(function () {
                            ttsG.attr('pointerEvents', 'auto');
                            if (count < quiz.length) {
                                quiz[count].start()
                            } else {
                                lastOK.start();
                            }
                        }, 300);
                    }
                });
            }

        }
    }
    quiz[0].start();
}

export default KM000017;