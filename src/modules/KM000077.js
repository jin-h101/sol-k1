import {
  directionText,
  createElement,
  K_makeButton,
  K_richTextAuto,
  makeOk,
  com_makePopUp,
  // tempGuideLine,
} from '../component';

const KM000077 = async function ({
  canvas,
  direction,
  elements,
  choice,
  popupInfo,
  callback,
}) {
  // tempGuideLine(canvas); // 좌표선 삭제
  const g = canvas.g();
  const backG = g.g();
  const ttsG = g.g();
  const contentG = g.g();
  const choiceG = contentG.g();
  const popupContentG = g.g().toDefs();
  const {
    background: choiceBg,
    font: choiceFont,
    list: choiceList,
    selectedStyle,
  } = choice;
  let popup = null;
  let popupElements = [];
  let selectedCnt = 0;

  // 지시문
  if (direction) directionText({ canvas: ttsG, ...direction });

  //배경
  if (elements) {
    elements.forEach((el) => {
      if (el) {
        createElement({
          type: el.type,
          canvas: backG,
          meta: el.meta,
        });
      }
    });
  }

  // 선택지
  choiceList.forEach((list) => {
    const btnG = choiceG.g();
    const { x, y, text } = list;
    const { classNum, size, left, bold } = choiceFont;
    const { width, height, r } = choiceBg;
    const cx = x + width / 2;

    new K_makeButton({
      el: btnG,
      x: cx,
      y,
      width: width,
      height: height,
      fillClassNum: choiceBg.fillClassNum,
      strokeClassNum: choiceBg.strokeClassNum,
      shadowClassNum: choiceBg.shadowClassNum,
      opacity: choiceBg.opacity,
      r,
      isMetaSize: true,
      endCallback: selectButton,
    });

    new K_richTextAuto({
      canvas: btnG,
      text,
      x: x + left,
      y,
      className: `ffng f${classNum}`,
      fontSize: size,
      isBold: bold,
    });

    // 선택 시 표시
    btnG
      .rect(x, y - height / 2, width, height, r)
      .addClass(`fno s${selectedStyle.strokeClassNum} selected`)
      .attr({ strokeWidth: selectedStyle.strokeWidth, opacity: 0 });
  });

  // 확인
  new makeOk({
    canvas: contentG,
    visibility: true,
    event: true,
    callback: showPopup,
  });

  // 팝업 콘텐츠
  popupInfo.elements.forEach((els, i) => {
    popupElements = [...popupElements, []];
    els.forEach((el) => {
      const elementG = createElement({
        type: el.type,
        canvas: popupContentG,
        meta: { ...el.meta, lineCenter: true },
      }).attr('opacity', 0);

      popupElements[i].push(elementG);
    });
  });

  function selectButton(i, btnG) {
    const choiceMark = btnG.select('.selected');
    const shadow = btnG.select('.kBtnShadow');
    const isActive = !+choiceMark.attr('opacity');

    choiceMark.attr({ opacity: isActive ? 1 : 0 }).toggleClass('active');
    shadow.attr({ visibility: isActive ? 'hidden' : 'visible' });

    selectedCnt = choiceG.selectAll('.active').length;
  }

  function showPopup() {
    // 팝업
    const popupContentsIdx = selectedCnt < 2 ? 1 : selectedCnt < 5 ? 2 : 3;
    const cntTextGroup = popupElements[0][0];
    const cntTextEl = cntTextGroup.select('text');

    popup = com_makePopUp({
      canvas: contentG,
      popUpSize: {
        cx: popupInfo.cx,
        cy: popupInfo.cy,
        width: popupInfo.width,
        height: popupInfo.height,
        rXY: popupInfo.rXY,
      },
      closeButton: false,
    });

    popupContentG.use().appendTo(popup.g);
    cntTextEl.attr('text', cntTextEl.attr('text').replace('0', selectedCnt));
    cntTextGroup.attr('opacity', 1);
    popupElements[popupContentsIdx].forEach((el) => {
      el.attr('opacity', 1);
    });

    setTimeout(() => {
      closePopup();
      callback();
    }, popupInfo.timeout);
  }

  function closePopup() {
    popup.close();
  }
};

export default KM000077;
