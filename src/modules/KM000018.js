import {
    K_richTextAuto,
    // tempGuideLine,
    oneWordSplit,
    simpleHandWrite,
    createElement,
    directionText,
} from '../component';
import { loadSound } from 'sol-common';
import {Howler} from 'howler';

// write
const KM000018 = async function ({
    canvas,
    direction,
    elements,
    word,
    equationValue,
    handWriteValue,
    soundInfo,
    callback
}) {

    // tempGuideLine(canvas) // 좌표선 삭제
    const g = canvas.g();
    const backG = g.g();
    const ttsG = g.g();
    const equationG = g.g();
    const eqBox = [];
    const handWriteG = g.g();
    const imgVoice = await loadSound(soundInfo.url);

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

    //box 배경
    const rXY = equationValue.backGround.rXY || 0;
    backG.rect(equationValue.cx, equationValue.cy, equationValue.backGround.width, equationValue.backGround.height,rXY,rXY)
        .addClass('f' + equationValue.backGround.fillClassNum + ' s' + equationValue.backGround.strokeClassNum)
        .attr('opacity', equationValue.backGround.opacity)
        .center();
    //식
    const equationT = oneWordSplit(word).wordArr;
    const boxFillColor = equationValue.boxFillColor || '14';
    const boxStrokeColor = equationValue.boxStrokeColor || '061';
    const boxFocusStrokeColor = equationValue.boxFocusStrokeColor || "04";
    const boxOpacity = equationValue.boxOpacity || 0.5;
    const boxStrokeWidth = equationValue.boxStrokeWidth || 3;
    const textFontSize = equationValue.textFontSize || equationValue.boxHeight * 0.7;
    const sign = ['+', '+', '='];
    const signClassNum = equationValue.signClassNum || '01';
    const signSize = equationValue.signSize || equationValue.boxHeight * 0.5;

    equationT.push(word);
    for (let t = 0; t < 4; t++) {
        eqBox[t] = equationG.g();
        const x = 0 + equationValue.boxWidth * t + equationValue.gap * t
        const y = 0
        const cx = x + equationValue.boxWidth / 2;
        const cy = y + equationValue.boxHeight / 2;
        const offset = equationValue.textOffsets && equationValue.textOffsets[t] ? equationValue.textOffsets[t] : {
            "x": 0,
            "y": 0
        }
        //box
        eqBox[t].rect(x, y, equationValue.boxWidth, equationValue.boxHeight)
            .addClass('f' + boxFillColor + ' s' + boxStrokeColor)
            .attr({
                'strokeOpacity': boxOpacity,
                'strokeWidth': boxStrokeWidth
            });
        //text
        const textWord = new K_richTextAuto({
            'canvas': eqBox[t],
            'text': equationT[t],
            'x': cx + offset.x,
            'y': cy + offset.y,
            'className': 'ffng f' + equationValue.textClassNum, //선택
            'fontSize': textFontSize, //선택
            'opacity': t === 3 ? 0 : 1,
            'dy': equationValue.textDy || 45, //선택
            'isBold': equationValue.textBold || false,
            'options': equationValue.textOptions,
            'center': true
        });
        //기호                            
        if (t < 3) {
            equationG.text(cx + (equationValue.boxWidth + equationValue.gap) / 2, cy, sign[t])
                .addClass('ffng f' + signClassNum)
                .attr({
                    'fontSize': signSize
                })
                .center();
        }
        if (t === 3) {
            const dashArrayVal = boxStrokeWidth / 3 + ',' + boxStrokeWidth * 5 / 3
            console.log(textWord);
            // textWord.attr('opacity',0);
            eqBox[t].selectAll('rect')[0]
                .removeClass('s' + boxStrokeColor)
                .addClass('s' + boxFocusStrokeColor)
                .attr({
                    'strokeOpacity': 1,
                    'strokeWidth': boxStrokeWidth,
                    'strokeDasharray': dashArrayVal,
                    'strokeLinecap': 'round'
                })
            eqBox[t].text(cx + offset.x, cy + offset.y, '?')
                .addClass('ffng f' + equationValue.textClassNum)
                .attr({
                    'fontSize': textFontSize
                })
                .center();
        }
    }
    //식 그룹 정렬 
    equationG.transform('t' + [equationValue.cx, equationValue.cy]).center();


    //handWrite
    const hw = new simpleHandWrite({
        'canvas': handWriteG,
        'x': handWriteValue.x,
        'y': handWriteValue.y,
        'width': handWriteValue.width,
        'height': handWriteValue.height,
        'rXY': handWriteValue.rXY,
        'drawClassNum': handWriteValue.drawClassNum,
        'drawStrokeWidth': handWriteValue.drawStrokeWidth,
        'boxFillClassNum': handWriteValue.boxFillClassNum,
        'boxStrokeClassNum': handWriteValue.boxStrokeClassNum,
        'boxOpacity': handWriteValue.boxOpacity,
        'boxStrokeWidth' : handWriteValue.boxStrokeWidth,
        'shadowDx': handWriteValue.shadowDx,
        'shadowDy': handWriteValue.shadowDy,
        'shadowBlur': handWriteValue.shadowBlur,
        'shadowOpacity': handWriteValue.shadowOpacity,
        'shadowClassNum': handWriteValue.shadowClassNum,
        'direction': handWriteValue.direction || false,
        'directionInfo': handWriteValue.directionInfo,
        'startPoint': handWriteValue.startPoint,
        'wordHint': handWriteValue.wordHint || false,
        'wordHintClassNum': handWriteValue.wordHintClassNum,
        'wordHintOpacity': handWriteValue.wordHintOpacity,
        'wordHintFs' : handWriteValue.wordHintFs,
        'dotLine': handWriteValue.dotLine || false,
        'dotLineClassNum': handWriteValue.dotLineClassNum,
        'dotLineStrokeWidth': handWriteValue.dotLineStrokeWidth,
        'dotLineOpacity': handWriteValue.dotLineOpacity,
        'okButton': handWriteValue.okButton,
        'undoButton': handWriteValue.undoButton,
        'resetButton': handWriteValue.resetButton,
        'answer': word,
        callback: function () {
            const boxEl = eqBox[3];
            boxEl.selectAll('rect')[0].attr('strokeDasharray', undefined);
            boxEl.selectAll('text').forEach((t, index) => {
                t.attr('opacity', 1 - index)
            });
            ttsG.attr('pointerEvents','none');
            Howler.stop();
            imgVoice.play();
            imgVoice.once('end', callback);
        }
    });
    hw.start();

}

export default KM000018;