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
} from "./com_array";
import {
    areaScale,
    areaToBBox,
    areaFromBBox
} from "./com_area";
import drawSegment from "./K_drawSegment";

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
const fbYGap = 12;

export const oneConnect = function ({
    canvas,
    element,
    type,
    ans,
    option,
    dotVisible = false,  // 연결할 점이 보여질 지 여부
    strokeDashArray=true, // 연결 시 점선으로 보여질 지 여부
    isLineColorFb = false, // 연결 후 선 색이 변하면서 피드백을 부여할 지 여부
    isFalseNoneTouch = false, // 오답 시 다시 터치가 안되도록 할 것인지 여부
    isLineColorRemind = false, // 연결 후 선이 남아있을 것인지 여부
    lineHint,
    handHint,
    connectCallback,
    callback
}) {
    const g = canvas.g();
    const bboxScale = (option && option.bboxScale || 1.5);
    const dotOffsets = option && option.dotOffsets;
    const elInfo = _getElInfo(element, bboxScale);
    let count = 0;
    let pad;
    let hHint;
    const hintXY = [];
    let isHint;
    const strokeColor1 = (option && option.strokeColor || '01');
    const strokeColor2 = (option && option.strokeColor2 || '04');
    let ansLen = 0;
    let hintAns;
    let rest = arrayMakeNumbers([0, elInfo.bboxs.length - 1]);
    if (ans) {
        ans.forEach(function (el) {
            if (el !== undefined) ansLen += 1;
        });
        hintAns = ans;
    } else {
        ansLen = Math.min(element[0].length, element[1].length);
        hintAns = arrayMakeNumbers([0, ansLen - 1]);
    }
    if (dotVisible) {
        const leftLen= element[0].length;
        elInfo.dotPoints.forEach((dot,z) => {
            g.circle(dot[0], dot[1], (option.dotSize  || 5))
                .addClass('f01')
                .data('isAns', z>=leftLen && ans.indexOf(z-leftLen)===-1 ?'no':'yes');
        });
    }

    function _makePad() {
        if (pad) {
            pad.remove();
        }
        console.log((lineHint&&lineHint[count]),handHint);
        isHint = (lineHint&&lineHint[count]); // handHint는 lineHint일 때만 나타나므로 따로 처리안함
        console.log(isHint,hintAns[count],element[0].length, hintAns[count]+ element[0].length);
        pad = drawSegment({
          canvas: g,
          bboxs: isHint
            ? [
                elInfo.bboxs[count],
                elInfo.bboxs[hintAns[count] + element[0].length],
              ]
            : elInfo.bboxs,
          dotPoints: isHint
            ? [
                elInfo.dotPoints[count],
                elInfo.dotPoints[hintAns[count] + element[0].length],
              ]
            : elInfo.dotPoints,
          strokeColor: [strokeColor1, strokeColor2],
          strokeWidth: option && option.strokeWidth,
          strokeDashArray: strokeDashArray,
          isLineColorRemind: isLineColorRemind,
          drawContinue: false,
          preventCheck: [
            arrayMakeNumbers([0, element[0].length - 1]),
            arrayMakeNumbers([
              element[0].length,
              element[0].length + element[1].length - 1,
            ]),
          ],
          startCallback: function () {
            if (hHint) hHint.removeHint();
          },
          endCallback: _ansCheck,
        });
        if (count === 0) _makeHand();
    }

    function _ansCheck(dots, segments) {
        pad.attr({
            'pointer-events': 'none'
        });
        if (segments.length === 0) {
            _makePad();
            return;
        }
        const segmentTBox = segments[0].getTBox();
        const fbx = segmentTBox.cx;
        const fby = segmentTBox.cy - fbYGap;
        // console.log(dots[0],dots,elInfo);
        const sortDot = dots[0].sort();
        if(isHint) sortDot[1]=hintAns[count]+ element[0].length; //힌트일 때 인덱스 조정
        if (_checkAns(sortDot)) {
            count += 1;
            if (isLineColorFb) segments[0].attr('class', 's' + strokeColor2);
            segments[0].appendTo(g)
                        .data('isAns','yes')
                        .data('color',strokeColor2 || '04')
                        .data('strokeWidth', (option && option.strokeWidth) || 4);
            sortDot.forEach(function (el) {
                elInfo.bboxs[el] = undefined;
                rest = arrayRemove(rest, el);
            });
            feedback({
                'bool': true,
                'el': [fbx, fby],
                'onRemove':function(){ //정답으로 연결 될 때마다 콜백
                   if(connectCallback) connectCallback(next,sortDot, segments[0])  // (모듈에서 필요한 작업 처리)          
                   else next()
                }
            });
        } else { //오답 시
                if(isLineColorFb) segments[0].attr('class', 's' + '02') // 오답 시 빨간 선으로 전환
                if(isLineColorRemind) segments[0].appendTo(g); // 선 고정 시킬 때 적용
                if(isFalseNoneTouch){
                    elInfo.bboxs[sortDot[1]] = undefined;
                    rest = arrayRemove(rest, sortDot[1]);
                }
            const fb=feedback({
                'bool': false,
                'el': [fbx, fby],
                'addAction':false,
                'onRemove':function(){
                    if (isFalseNoneTouch) element[1][sortDot[1] - element[0].length].attr('opacity', 0.4);
                    setTimeout(function(){
                        fb.addUserAction();
                        _makePad(); //오답일 때 콜백 (모답 다시 생성)
                    },300);
                    
                }
            });
        }

        function next(){
            if (count === ansLen) {
                pad.remove();
                callback(rest);
            }else{
                _makePad();
            }
        }

        function _checkAns(dots) {
            if (!ans) return true;
            const answer = arrayCopy(dots);
            if (answer[0] > answer[1]) answer.reverse();
            answer[1] = answer[1] - element[0].length;
            return ans[answer[0]] === answer[1];
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

        const bboxsScaled = bboxs.map(function (el,i) {
            const scaleBbox=areaScale(areaFromBBox(el), bboxScale);
            const dotPoint= _getDotPoints(bboxs)[i]
            if (scaleBbox[0] >= dotPoint[0]) scaleBbox[0] = dotPoint[0] -30
            else if (scaleBbox[2] <= dotPoint[0]) scaleBbox[2] = dotPoint[0] +30
            if (scaleBbox[1] >= dotPoint[1]) scaleBbox[1] = dotPoint[1] -30
            else if (scaleBbox[3] <= dotPoint[1]) scaleBbox[3] = dotPoint[1] +30
            
            // console.log('after',scaleBbox);

            return areaToBBox(scaleBbox);
        });

        // const bboxsScaled = bboxs.map(function (el,i) {
        //     return areaToBBox(areaScale(areaFromBBox(el), bboxScale));
        // });
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
            if (lineHint && lineHint[i] && hintAns[i] !== undefined) {
                const x1 = fixDecimal(elInfo.dotPoints[i][0]);
                const y1 = fixDecimal(elInfo.dotPoints[i][1]);
                const x2 = fixDecimal(elInfo.dotPoints[hintAns[i] + element[0].length][0]);
                const y2 = fixDecimal(elInfo.dotPoints[hintAns[i] + element[0].length][1]);
                const strokeWidth = (option && option.strokeWidth || 4);
                g.path('M' + [x1, y1] + 'L' + [x2, y2]).addClass('s01').attr({
                    'stroke-width': strokeWidth,
                    'stroke-dasharray': strokeWidth + ' ' + (strokeWidth * 2),
                    'stroke-linecap': 'round',
                    'stroke-linejoin': 'round',
                    'pointer-events': 'none',
                    'opacity': 0.2
                });
                hintXY.push([x1, y1], [x2, y2]);
            }
        }
    }

    function _makeHand() {
        if (hHint) hHint.removeHint();
        if (handHint && hintXY[0]) {
            hHint = hint({
                canvas: g,
                type: 1,
                XY: hintXY[0],
                moveTo: hintXY[1],
                dragTime: Snap.len(hintXY[0][0], hintXY[0][1], hintXY[1][0], hintXY[1][1]) * 5
            });
        }
    }

    this.g = g;
    this.show = function () {
        _makeLineHint();
    };
    this.start = function () {
        _makeLineHint();
        _makeHand();
        _makePad();
    };
}


export const multiConnect = function ({
    canvas,
    element,
    type,
    ans,
    option,
    lineHint,
    handHint,
    connectCallback,
    callback,
    dotVisible = false, // 연결할 점이 보여질 지 여부
    hintAndPreventChance = false, // 힌트시 다른 부분을 모두 막을 지 여부
    strokeDashArray = true, // 연결 시 점선으로 보여질 지 여부
    isLineColorFb = false, // 연결 후 선 색이 변하면서 피드백을 부여할 지 여부
    isFalseNoneTouch = false, // 오답 시 다시 터치가 안되도록 할 것인지 여부
    isLineColorRemind = false, // 연결 후 선이 남아있을 것인지 여부
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
            g.circle(dot[0], dot[1], (option.dotSize  || 5)).addClass('f01');
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

    function _ansCheck(dots, segments) { // 힌트 시에는 bbox를 drawSegment에 보내는 것이 다르므로 인덱스 믿으면 안됨
        // console.log(dots,segments);
        pad.attr({
            'pointer-events': 'none'
        });
        if (segments.length === 0) {
            _makePad();
            return;
        }
        const segmentTBox = segments[0].getTBox();
        const fbx = segmentTBox.cx;
        const fby = segmentTBox.cy - 0; //fbYGap
        const sortDot = dots[0].sort();
        if(hintAndPreventChance && hintIndex[count]) sortDot[1]=hintIndex[count][1] + element[0].length; //힌트일 때 인덱스 조정
        
        if (_checkAns(sortDot)) {
            count += 1;
            if (isLineColorFb) segments[0].attr('class', 's' + strokeColor2);
            segments[0].appendTo(g);
            sortDot.forEach(function (el, z) {
                if (!ans || isRestCheck(rest, el, z)) {
                    // const i = !hintAndPreventChance || !hintIndex[count] ? el : hintIndex[count - 1][1] + element[0].length;
                    const i = hintAndPreventChance && hintIndex[count] ? hintIndex[count - 1][1] + element[0].length : el;
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
                if(isLineColorFb) segments[0].attr('class', 's' + '02')
                if(isLineColorRemind) segments[0].appendTo(g); // 선 고정 시킬 때 적용
                if(isFalseNoneTouch){
                    elInfo.bboxs[sortDot[1]] = undefined;
                    rest = arrayRemove(rest, sortDot[1]);
                }
            const fb=feedback({
                'bool': false,
                'el': [fbx, fby],
                'addAction':false,
                'onRemove': function () { //오답일 때 콜백 
                    if (isFalseNoneTouch) element[1][sortDot[1] - element[0].length].attr('opacity', 0.4);
                    setTimeout(function(){
                        fb.addUserAction();
                        _makePad(); //오답일 때 콜백 (모답 다시 생성)
                    },300);
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
            const hintState = hintAndPreventChance && hintIndex[count];
            const noHintAndIndexFix = (ans[answer[0]] && ans[answer[0]].indexOf(answer[1]) !== -1);
            return hintState || noHintAndIndexFix
        }
    }

    function _getElInfo(el, bboxScale) {
        const bboxs = [];
        const offsets = [];
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < el[i].length; j++) {
                bboxs.push(el[i][j].getBBox());
                const moveXY = dotOffsets ? [dotOffsets[i][j].x,dotOffsets[i][j].y] : [0, 0];
                offsets.push(moveXY);
            }
        }

        const bboxsScaled = bboxs.map(function (el,i) {
            const scaleBbox=areaScale(areaFromBBox(el), bboxScale);
            const dotPoint= _getDotPoints(bboxs)[i]
            if (scaleBbox[0] >= dotPoint[0]) scaleBbox[0] = dotPoint[0] -30
            else if (scaleBbox[2] <= dotPoint[0]) scaleBbox[2] = dotPoint[0] +30
            if (scaleBbox[1] >= dotPoint[1]) scaleBbox[1] = dotPoint[1] -30
            else if (scaleBbox[3] <= dotPoint[1]) scaleBbox[3] = dotPoint[1] +30
                    // console.log('after',scaleBbox);
            return areaToBBox(scaleBbox);
        });

        // const bboxsScaled = bboxs.map(function (el,i) {
        //     return areaToBBox(areaScale(areaFromBBox(el), bboxScale));
        // });

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