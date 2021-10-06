import {
  createElement,
  directionText,
  com_pageConvert,
  reading,
  MultipleConnect,
  // tempGuideLine,
} from '../component';

// reading + match
const KM000061 = async function ({
  canvas,
  direction,
  elements,
  scroll,
  sound,
  question,
  guideLine,
  callback,
}) {
  // tempGuideLine(canvas); // 좌표선 삭제
  const g = canvas.g();
  const backG = g.g();
  const ttsG = g.g();
  const scrollG = g.g();
  const converG = g.g().attr('class', 'convert');
  const isVisibleModal = question.visible;
  let connect, ttsObj, qTTsObj, convertModal;

  // 지시문
  if (direction)
    ttsObj = directionText({
      canvas: ttsG,
      howlerStop: false,
      ttsStartCallback: function () {
        readingGroup.stop();
        howlerStop();
      },
      ...direction,
    });

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

  // 글읽기
  const readingGroup = new reading({
    canvas: scrollG,
    area: scroll.area,
    elements: scroll.elements,
    focusText: scroll.focusText,
    footNoteInfo: scroll.footNoteInfo,
    sound,
    firstGuide: !isVisibleModal,
    startCallback: function () {
      convertModal.start();
      howlerStop();
    },
    endCallback: function () {
      console.log('end reading');
    },
  });

  // 문제풀기
  if (question) {
    const connectionG = converG.g();
    const qG = converG.g();
    const { direction: qDirection, connectElement, visible } = question;
    const connectEl = [[], []];
    const dotOffsets = [[], []];
    const answers = [];

    // 지시문
    if (qDirection) {
      qTTsObj = directionText({
        canvas: qG,
        howlerStop: false,
        ttsStartCallback: howlerStop,
        ...qDirection,
      });
    }

    // //left 영역 생성
    connectElement.leftEl.forEach((el, t) => {
      const leftEl = connectionG.g();
      const isLeftOffset = el.connectDotOffsets;

      connectEl[0][t] = leftEl;
      dotOffsets[0][t] = isLeftOffset
        ? [el.connectDotOffsets.x, el.connectDotOffsets.y]
        : [0, 0];
      answers.push(el.connectAnsIndex);

      el.elements.forEach((shapeEl) => {
        createElement({
          type: shapeEl.type,
          canvas: leftEl,
          meta: shapeEl.meta,
        });
      });
    });

    // //right 영역 생성
    connectElement.rightEl.forEach((el, t) => {
      const rightEl = connectionG.g();
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

    connect = new MultipleConnect({
      canvas: connectionG,
      element: connectEl,
      type: 'v',
      ans: answers,
      option: {
        dotSize: connectElement.dotSize,
        dotOffsets: dotOffsets,
        strokeColor2: connectElement.lineClassNum, // 정답 시 선색
      },
      dotVisible: true,
      strokeDashArray: false,
      isLineColorFb: true,
      isFalseNoneTouch: false,
      isLineColorRemind: false,
      hintCount: connectElement.hintCount,
      handHint: connectElement.handHint,
      connectCallback: function (next) {
        next();
      },
      callback: function () {
        setTimeout(function () {
          if (callback) callback();
        }, 300);
      },
    });

    convertModal = new com_pageConvert({
      g: canvas,
      appendG: converG,
      visible,
      time: 800,
      howlerStop: false,
      startCallback: convertPage,
      endCallback: function () {
        howlerStop();
      },
      guideLine,
    });
  }

  start();

  function start() {
    if (isVisibleModal) {
      convertPage();
      convertModal.start();
    } else {
      readingGroup.start();
    }
  }

  function convertPage() {
    readingGroup.stop();
    howlerStop();
    connect.start();
  }

  //모든 지시문 tts만 초기화
  function howlerStop() {
    if (ttsObj.tts.data('voice')) ttsObj.tts.data('voice').stop();
    if (qTTsObj.tts.data('voice')) qTTsObj.tts.data('voice').stop();
  }
};

export default KM000061;
