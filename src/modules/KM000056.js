import {
  createElement,
  directionText,
  oneConnect,
  // tempGuideLine,
} from '../component';

const KM000056 = async function ({
  canvas,
  direction,
  elements,
  connectElement,
  callback,
}) {
  // tempGuideLine(canvas); // 좌표선 삭제
  const g = canvas.g();
  const firstG = g.g();
  const ttsG = g.g();
  const backG = firstG.g();
  const connectG = firstG.g();
  const connectEl = [[], []];
  const dotOffsets = [[], []];

  // 지시문
  if (direction) directionText({ canvas: ttsG, ...direction });

  //배경 존재 시 설정
  if (elements) {
    elements.forEach((el) => {
      createElement({
        type: el.type,
        canvas: backG,
        meta: el.meta,
      });
    });
  }

  //left 영역 생성
  const leftEl = connectG.g();
  const isLeftOffset = connectElement.leftEl.connectDotOffsets;

  connectEl[0][0] = leftEl;
  dotOffsets[0][0] = isLeftOffset
    ? [
        connectElement.leftEl.connectDotOffsets.x,
        connectElement.leftEl.connectDotOffsets.y,
      ]
    : [0, 0];
  connectElement.leftEl.elements.forEach((el) => {
    createElement({
      type: el.type,
      canvas: leftEl,
      meta: el.meta,
    });
  });

  //right 영역 생성
  connectElement.rightEl.forEach((el, t) => {
    const rightEl = connectG.g();
    const isRightOffset = el.connectDotOffsets;

    connectEl[1][t] = rightEl;
    dotOffsets[1][t] = isRightOffset
      ? [el.connectDotOffsets.x, el.connectDotOffsets.y]
      : [0, 0];

    el.element.forEach((shapeEl) => {
      createElement({
        type: shapeEl.type,
        canvas: rightEl,
        meta: shapeEl.meta,
      });
    });
  });

  const connect = new oneConnect({
    canvas: connectG,
    element: connectEl,
    type: 'v',
    ans: [connectElement.leftEl.connectAnsIndex],
    option: {
      dotSize: connectElement.dotSize,
      dotOffsets: dotOffsets,
      strokeColor2: connectElement.lineClassNum, // 정답 시 선색
    },
    dotVisible: true,
    strokeDashArray: false,
    isLineColorFb: true,
    isFalseNoneTouch: true,
    isLineColorRemind: false,
    lineHint: [connectElement.lineHint],
    handHint: connectElement.handHint,
    connectCallback: function (next) {
      next();
    },
    callback,
  });

  connect.start();
};

export default KM000056;
