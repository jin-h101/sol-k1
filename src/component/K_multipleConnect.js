import { hint } from 'sol-common';
import Snap from 'sol-common/snap';
import { feedback } from 'sol-common/util';
import { arrayMakeNumbers, arrayRemove } from './com_array';
import { areaScale, areaToBBox, areaFromBBox } from './com_area';
import drawSegment from './K_drawSegment';

const isDecimal = (number) => {
  return number.toString().split('.').length === 2;
};
const getDecimalPlace = (number) => {
  return isDecimal(number) ? number.toString().split('.')[1].length : 0;
};
const fixDecimal = (decimal) => {
  if (getDecimalPlace(decimal) > 10) {
    decimal = Math.round(decimal * 1e10) / 1e10;
  }
  return decimal;
};

export const MultipleConnect = function ({
  canvas,
  element,
  type,
  ans,
  option,
  dotVisible = false, // 연결할 점이 보여질 지 여부
  strokeDashArray = true, // 연결 시 점선으로 보여질 지 여부
  isLineColorFb = false, // 연결 후 선 색이 변하면서 피드백을 부여할 지 여부
  isFalseNoneTouch = false, // 오답 시 다시 터치가 안되도록 할 것인지 여부
  isLineColorRemind = false, // 연결 후 선이 남아있을 것인지 여부
  hintCount,
  handHint,
  connectCallback,
  callback,
}) {
  const g = canvas.g();
  const bboxScale = (option && option.bboxScale) || 1.5;
  const dotOffsets = option && option.dotOffsets;
  const elInfo = _getElInfo(element, bboxScale);
  const strokeColor1 = (option && option.strokeColor) || '01';
  const strokeColor2 = (option && option.strokeColor2) || '04';
  const leftElsLen = element[0].length;
  const rightElsLen = element[1].length;
  const hintPoints = [];
  let ansLen = 0;
  let count = 0;
  let rest = arrayMakeNumbers([0, elInfo.bboxs.length - 1]);
  let pad, hintAns, hHint;

  if (ans) {
    ans.forEach(function (el) {
      if (el !== undefined) ansLen += 1;
    });
    hintAns = ans;
  } else {
    ansLen = Math.min(leftElsLen, rightElsLen);
    hintAns = arrayMakeNumbers([0, ansLen - 1]);
  }

  if (dotVisible) {
    elInfo.dotPoints.forEach((dot) => {
      g.circle(dot[0], dot[1], option.dotSize || 5).addClass('f01');
    });
  }

  function _makePad() {
    if (pad) {
      pad.remove();
      _makeHand();
    }

    pad = drawSegment({
      canvas: g,
      bboxs: hintCount
        ? [elInfo.bboxs[count], elInfo.bboxs[hintAns[count] + leftElsLen]]
        : elInfo.bboxs,
      dotPoints: hintCount
        ? [
            elInfo.dotPoints[count],
            elInfo.dotPoints[hintAns[count] + leftElsLen],
          ]
        : elInfo.dotPoints,
      strokeColor: [strokeColor1, strokeColor2],
      strokeWidth: option && option.strokeWidth,
      strokeDashArray: strokeDashArray,
      isLineColorRemind: isLineColorRemind,
      drawContinue: false,
      preventCheck: [
        arrayMakeNumbers([0, leftElsLen - 1]),
        arrayMakeNumbers([leftElsLen, leftElsLen + rightElsLen - 1]),
      ],
      startCallback: function () {
        if (hHint) hHint.removeHint();
      },
      endCallback: _ansCheck,
    });
  }

  function _ansCheck(dots, segments) {
    pad.attr({
      'pointer-events': 'none',
    });
    if (segments.length === 0) {
      _makePad();
      return;
    }

    const segmentTBox = segments[0].getTBox();
    const adjustedValues = {
      x: canvas.parent().hasClass('convert') ? -40 : 0,
      y: 0,
    };
    const fbx = segmentTBox.cx + adjustedValues.x;
    const fby = segmentTBox.cy + adjustedValues.y;
    const sortedDots = dots[0].sort();

    if (hintCount) sortedDots[1] = hintAns[count] + leftElsLen; //힌트일 때 인덱스 조정
    if (_checkAns(sortedDots)) {
      count += 1;
      if (isLineColorFb) segments[0].attr('class', 's' + strokeColor2);
      segments[0]
        .appendTo(g)
        .data('isAns', 'yes')
        .data('color', strokeColor2 || '04')
        .data('strokeWidth', (option && option.strokeWidth) || 4);

      sortedDots.forEach((dotIdx) => {
        elInfo.bboxs[dotIdx] = undefined;
        rest = arrayRemove(rest, dotIdx);
      });

      feedback({
        canvas,
        bool: true,
        el: [fbx, fby],
        onRemove: function () {
          //정답으로 연결 될 때마다 콜백
          if (connectCallback) connectCallback(next, sortedDots, segments[0]);
          // (모듈에서 필요한 작업 처리)
          else next();
        },
        howlerStop: false,
      });
    } else {
      if (isLineColorFb) segments[0].attr('class', 's' + '02');
      if (isLineColorRemind) segments[0].appendTo(g); // 선 고정 시킬 때 적용
      if (isFalseNoneTouch) {
        elInfo.bboxs[sortedDots[1]] = undefined;
        rest = arrayRemove(rest, sortedDots[1]);
      }

      const fb = feedback({
        canvas,
        bool: false,
        el: [fbx, fby],
        addAction: false,
        onRemove: function () {
          //오답일 때 콜백
          if (isFalseNoneTouch)
            element[1][sortedDots[1] - leftElsLen].attr('opacity', 0.4);
          setTimeout(function () {
            fb.addUserAction();
            _makePad(); //오답일 때 콜백 (모답 다시 생성)
          }, 300);
        },
        howlerStop: false,
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

    function _checkAns(sortedDots) {
      let [startingIdx, endingIdx] = sortedDots;
      hintCount && (startingIdx += count);
      const isAnswer = ans[startingIdx] + leftElsLen === endingIdx;
      return !ans ? true : isAnswer;
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

    const bboxsScaled = bboxs.map(function (el, i) {
      const scaleBbox = areaScale(areaFromBBox(el), bboxScale);
      const dotPoint = _getDotPoints(bboxs)[i];

      if (scaleBbox[0] >= dotPoint[0]) scaleBbox[0] = dotPoint[0] - 30;
      else if (scaleBbox[2] <= dotPoint[0]) scaleBbox[2] = dotPoint[0] + 30;
      if (scaleBbox[1] >= dotPoint[1]) scaleBbox[1] = dotPoint[1] - 30;
      else if (scaleBbox[3] <= dotPoint[1]) scaleBbox[3] = dotPoint[1] + 30;

      return areaToBBox(scaleBbox);
    });

    function _getDotPoints(bboxs) {
      const points = [];
      for (let i = 0; i < bboxs.length; i++) {
        if (type === 'r') {
          points[i] = [
            bboxs[i].cx + offsets[i][0],
            bboxs[i].cy + offsets[i][1],
          ];
        } else {
          if (i < el[0].length) {
            points[i] =
              type === 'h'
                ? [bboxs[i].cx + offsets[i][0], bboxs[i].y2 + offsets[i][1]]
                : [bboxs[i].x2 + offsets[i][0], bboxs[i].cy + offsets[i][1]];
          } else {
            points[i] =
              type === 'h'
                ? [bboxs[i].cx + offsets[i][0], bboxs[i].y + offsets[i][1]]
                : [bboxs[i].x + offsets[i][0], bboxs[i].cy + offsets[i][1]];
          }
        }
      }
      return points;
    }
    return {
      bboxs: bboxsScaled,
      dotPoints: _getDotPoints(bboxs),
    };
  }

  function _makeLineHint() {
    if (hintPoints.length > 0) return;
    for (let i = 0; i < hintCount; i++) {
      if (hintAns[i] !== undefined) {
        const x1 = fixDecimal(elInfo.dotPoints[i][0]);
        const y1 = fixDecimal(elInfo.dotPoints[i][1]);
        const x2 = fixDecimal(elInfo.dotPoints[hintAns[i] + leftElsLen][0]);
        const y2 = fixDecimal(elInfo.dotPoints[hintAns[i] + leftElsLen][1]);
        const strokeWidth = (option && option.strokeWidth) || 4;
        g.path('M' + [x1, y1] + 'L' + [x2, y2])
          .addClass('s01')
          .attr({
            'stroke-width': strokeWidth,
            'stroke-dasharray': strokeWidth + ' ' + strokeWidth * 2,
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            'pointer-events': 'none',
            opacity: 0.2,
          });
        hintPoints.push([
          [x1, y1],
          [x2, y2],
        ]);
      }
    }
  }

  function _makeHand() {
    const curHintPoints = hintPoints[count];
    if (hHint) hHint.removeHint();
    if (handHint && curHintPoints) {
      hHint = hint({
        canvas: g,
        type: 1,
        XY: curHintPoints[0],
        moveTo: curHintPoints[1],
        dragTime:
          Snap.len(
            curHintPoints[0][0],
            curHintPoints[0][1],
            curHintPoints[1][0],
            curHintPoints[1][1]
          ) * 5,
      });
    }
  }

  this.g = g;
  this.show = function () {
    _makeLineHint();
  };
  this.start = function () {
    _makePad();
    _makeLineHint();
    _makeHand();
  };
};
