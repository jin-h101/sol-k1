import {
    // tempGuideLine,
    createElement,
    simpleHandWrite,
    multiPointerControl,
    directionText
} from '../component';
// write
const KM000047 = async function ({
    canvas,
    direction,
    elements,
    handWriteValue,
    callback
}) {
    // tempGuideLine(canvas) // 좌표선 삭제
    const g = canvas.g();
    const backG = g.g();
    const ttsG = g.g();
    const handWriteG = g.g();

    if (direction) directionText({'canvas':ttsG, ...direction})

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

    const shw = new simpleHandWrite({
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
        'shadowDx': handWriteValue.shadowDx,
        'shadowDy': handWriteValue.shadowDy,
        'shadowBlur': handWriteValue.shadowBlur,
        'shadowOpacity': handWriteValue.shadowOpacity,
        'shadowClassNum': handWriteValue.shadowClassNum,
        'direction': handWriteValue.direction || true,
        'directionInfo': handWriteValue.directionInfo,
        'startPoint': handWriteValue.startPoint,
        'wordHint': handWriteValue.wordHint || false,
        'wordHintClassNum': handWriteValue.wordHintClassNum,
        'wordHintOpacity': handWriteValue.wordHintOpacity,
        'wordHintFs': handWriteValue.wordHintFs,
        'dotLine': handWriteValue.dotLine || false,
        'dotLineClassNum': handWriteValue.dotLineClassNum,
        'dotLineStrokeWidth': handWriteValue.dotLineStrokeWidth,
        'dotLineOpacity': handWriteValue.dotLineOpacity,
        'okButton': handWriteValue.okButton,
        'undoButton': handWriteValue.undoButton,
        'resetButton': handWriteValue.resetButton,
        'answer': handWriteValue.answer,
        callback: function () {
            multiPointerControl({'elements':[ttsG],'state':'none'});
            callback();
        }
    });

    shw.start();
}

export default KM000047;