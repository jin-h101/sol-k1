import {
    hint
} from "sol-common";
import Snap from 'sol-common/snap'
import {
    feedback
} from "sol-common/util";
import {
    arrayMakeNumbers,
    arrayRemove,
    arrayCopy
} from "../component/com_array";
import {
    areaScale,
    areaToBBox,
    areaFromBBox
} from "../component/com_area";
import drawSegment from "../component/K_drawSegment";
import {
    Howler
} from 'howler';

const isDecimal = (number) => {
    return number.toString().split('.').length === 2;
}
const getDecimalPlace = (number) => {
    return isDecimal(number) ? number.toString().split('.')[1].length : 0;
}
const fixDecimal = (decimal) => {
    if (getDecimalPlace(decimal) > 10) {
        decimal = (Math.round(decimal * 1e10)) / 1e10;
    }
    return decimal;
}

export const K_multiConnect = function ({
    canvas,
    element,
    type,
    ans,
    option,
    lineHint,
    handHint,
    connectCallback,
    callback,
    dotVisible = false,
    hintAndPreventChance = false,
    strokeDashArray = true,
    isLineColorRemind = false,
}) {
    const g = canvas.g();
    const bboxScale = (option && option.bboxScale || 1.5);
    const dotOffsets = option && option.dotOffsets;
    const elInfo = _getElInfo(element, bboxScale);
    let count = 0;
    let pad;
    let hHint;
    const hintXY = [];
    const hintIndex = [];
    const strokeColor1 = (option && option.strokeColor || '01');
    const strokeColor2 = (option && option.strokeColor2 || '04');
    let ansLen = 0;
    let hintAns;
    let rest = arrayMakeNumbers([0, elInfo.bboxs.length - 1]);
    if (ans) {
        ans.forEach(function (el) {
            el.forEach((e) => {
                if (e !== undefined) ansLen += 1;
            })
        });
        hintAns = ans;
    }
    if (dotVisible) {
        elInfo.dotPoints.forEach(dot => {
            g.circle(dot[0], dot[1], 5).addClass('f01');
        });
    }

    function _makePad() {
        if (pad) {
            pad.remove();
            _makeHand();
        }
        const leftLen = element[0].length;
        pad = drawSegment({
            canvas: g,
            bboxs: hintAndPreventChance && hintIndex[count] ? [elInfo.bboxs[hintIndex[count][0]], elInfo.bboxs[hintIndex[count][1] + leftLen]] : elInfo.bboxs,
            dotPoints: hintAndPreventChance && hintIndex[count] ? [elInfo.dotPoints[hintIndex[count][0]], elInfo.dotPoints[hintIndex[count][1] + leftLen]] : elInfo.dotPoints,
            strokeColor: [strokeColor1, strokeColor2],
            strokeWidth: (option && option.strokeWidth),
            strokeDashArray: strokeDashArray,
            isLineColorRemind: isLineColorRemind,
            drawContinue: false,
            preventCheck: [arrayMakeNumbers([0, leftLen - 1]), arrayMakeNumbers([leftLen, leftLen + element[1].length - 1])],
            startCallback: function () {
                if (hHint) hHint.removeHint();
            },
            endCallback: _ansCheck,
        });
    }

    function isRestCheck(rest, el, index) {
        let bool = true;
        if (index === 0) {
            const currentElAns = ans[el];
            let count = 0;
            rest.forEach((e) => {
                const idx = e - element[0].length;
                if (idx >= 0 && currentElAns.indexOf(idx) !== -1) { //오른쪽 el과 ans 비교
                    // console.log(idx);
                    count++;
                }
            });
            if (count > 1) bool = false;
        }
        return bool;
    }

    function _ansCheck(dots, segments) {
        // console.log(segments);
        pad.attr({
            'pointer-events': 'none'
        });
        if (segments.length === 0) {
            _makePad();
            return;
        }
        const segmentTBox = segments[0].getTBox();
        const fbx = segmentTBox.cx;
        const fby = segmentTBox.cy;
        Howler.stop();
        const sortDot = dots[0].sort();
        if (_checkAns(sortDot)) {
            count += 1;
            if (isLineColorRemind) segments[0].attr('class', 's' + strokeColor2);
            segments[0].appendTo(g);
            sortDot.forEach(function (el, z) {
                if (!ans || isRestCheck(rest, el, z)) {
                    const i = !hintAndPreventChance || !hintIndex[count] ? el : hintIndex[count - 1][1] + element[0].length;
                    // console.log(i);
                    elInfo.bboxs[i] = undefined;
                    rest = arrayRemove(rest, i);
                }
            });
            feedback({
                'bool': true,
                'el': [fbx, fby],
                'onRemove': function () { //정답으로 연결 될 때마다 콜백
                    if (connectCallback) connectCallback(next, sortDot, segments[0]) // (모듈에서 필요한 작업 처리)          
                    else next()
                }
            });
        } else {
            if (isLineColorRemind) {
                segments[0].attr('class', 's' + '02')
                // .appendTo(g); // 선 고정 시킬 때 적용
                elInfo.bboxs[sortDot[1]] = undefined;
                rest = arrayRemove(rest, sortDot[1]);
            }
            feedback({
                'bool': false,
                'el': [fbx, fby],
                'onRemove': function () { //오답일 때 콜백 
                    if (isLineColorRemind) element[1][sortDot[1] - element[0].length].attr('opacity', 0.4);
                    _makePad();
                }
            });
        }

        function next() {
            if (count === ansLen) {
                pad.remove();
                callback(rest);
            } else {
                _makePad();
            }
        }

        function _checkAns(dots) {
            if (!ans) return true;
            const answer = arrayCopy(dots);
            if (answer[0] > answer[1]) answer.reverse();
            answer[1] = answer[1] - element[0].length;
            return (ans[answer[0]] && ans[answer[0]].indexOf(answer[1]) !== -1);
        }
    }

    function _getElInfo(el, bboxScale) {
        const bboxs = [];
        const offsets = [];
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < el[i].length; j++) {
                bboxs.push(el[i][j].getBBox());
                const moveXY = dotOffsets ? dotOffsets[i][j] : [0, 0];
                offsets.push(moveXY);
            }
        }

        const bboxsScaled = bboxs.map(function (el) {
            return areaToBBox(areaScale(areaFromBBox(el), bboxScale));
        });

        function _getDotPoints(bboxs) {
            const points = [];
            for (let i = 0; i < bboxs.length; i++) {
                if (type === 'r') {
                    points[i] = [bboxs[i].cx + offsets[i][0], bboxs[i].cy + offsets[i][1]];
                } else {
                    if (i < el[0].length) {
                        points[i] = type === 'h' ? [bboxs[i].cx + offsets[i][0], bboxs[i].y2 + offsets[i][1]] : [bboxs[i].x2 + offsets[i][0], bboxs[i].cy + offsets[i][1]];
                    } else {
                        points[i] = type === 'h' ? [bboxs[i].cx + offsets[i][0], bboxs[i].y + offsets[i][1]] : [bboxs[i].x + offsets[i][0], bboxs[i].cy + offsets[i][1]];
                    }
                }
            }
            return points;
        }
        return {
            bboxs: bboxsScaled,
            dotPoints: _getDotPoints(bboxs)
        };
    }

    function _makeLineHint() {
        if (hintXY.length > 0) return;
        for (let i = 0; i < element[0].length; i++) {
            if (lineHint) {
                for (let j = 0; j < lineHint[i]; j++) {
                    if (hintAns[i] !== undefined && (hintAns[i][j] || hintAns[i][j] === 0)) {
                        const x1 = fixDecimal(elInfo.dotPoints[i][0]);
                        const y1 = fixDecimal(elInfo.dotPoints[i][1]);
                        const x2 = fixDecimal(elInfo.dotPoints[hintAns[i][j] + element[0].length][0]);
                        const y2 = fixDecimal(elInfo.dotPoints[hintAns[i][j] + element[0].length][1]);
                        const strokeWidth = (option && option.strokeWidth || 4);
                        g.path('M' + [x1, y1] + 'L' + [x2, y2]).addClass('s01').attr({
                            'stroke-width': strokeWidth,
                            'stroke-dasharray': strokeWidth + ' ' + (strokeWidth * 2),
                            'stroke-linecap': 'round',
                            'stroke-linejoin': 'round',
                            'pointer-events': 'none',
                            'opacity': 0.2
                        });
                        hintIndex.push([i, hintAns[i][j]])
                        hintXY.push([
                            [x1, y1],
                            [x2, y2]
                        ]);
                    }
                }
            }
        }
    }

    function _makeHand() {
        if (hHint) hHint.removeHint();
        if (handHint && hintXY[count] && hintXY[count][0]) {
            hHint = hint({
                canvas: g,
                type: 1,
                XY: hintXY[count][0],
                moveTo: hintXY[count][1],
                dragTime: Snap.len(hintXY[count][0][0], hintXY[count][0][1], hintXY[count][1][0], hintXY[count][1][1]) * 5
            });
        }
    }

    this.g = g;
    this.show = function () {
        _makeLineHint();
    };
    this.start = function () {
        _makeLineHint();
        _makePad();
        _makeHand();
    };
}

export default K_multiConnect;