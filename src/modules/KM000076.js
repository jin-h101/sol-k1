import {
  directionText,
  createElement,
  K_makeButton,
  K_richTextAuto,
  makeOk,
  com_makePopUp,
  // tempGuideLine,
} from '../component';

const KM000076 = async function ({
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
    const { cx: x, cy: y, text } = list;
    const { classNum, size, bold, dy } = choiceFont;
    const { width, height, r } = choiceBg;

    new K_makeButton({
      el: btnG,
      x,
      y,
      width: width,
      height: height,
      fillClassNum: choiceBg.fillClassNum,
      strokeClassNum: choiceBg.strokeClassNum,
      shadowClassNum: choiceBg.shadowClassNum,
      opacity: choiceBg.opacity,
      r: r,
      isMetaSize: true,
      endCallback: selectButton,
    });

    new K_richTextAuto({
      canvas: btnG,
      text,
      x,
      y,
      className: `ffng f${classNum}`,
      fontSize: size,
      isBold: bold,
      dy,
      center: true,
    });

    // 선택 시 표시
    btnG
      .rect(x - width / 2, y - height / 2, width, height, r)
      .addClass(`fno s${selectedStyle.strokeClassNum} selected`)
      .attr({ strokeWidth: selectedStyle.strokeWidth, opacity: 0 });
  });

  // 확인
  const okBtn = new makeOk({
    canvas: contentG,
    visibility: true,
    callback: showPopup,
  });

  // 팝업 콘텐츠
  popupInfo.elements.forEach((els, i) => {
    let elementG = null;
    popupElements = [...popupElements, []];
    els.forEach((el) => {
      elementG = createElement({
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
    (selectedCnt === 1 && okBtn.start()) || (!selectedCnt && okBtn.stop());

    btnG.selectAll('text').forEach((el) => {
      el.toggleClass(`f${choiceFont.classNum} f${selectedStyle.fontColor}`);
    });
  }

  function showPopup() {
    // 팝업
    const popupContentsIdx = selectedCnt <= 2 ? 0 : 1;
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

    popupElements[popupContentsIdx].forEach((el) => {
      el.attr('opacity', 1);
    });

    okBtn.kill();

    setTimeout(() => {
      closePopup();
      callback();
    }, popupInfo.timeout);
  }

  function closePopup() {
    popup.close();
  }
};

export default KM000076;
