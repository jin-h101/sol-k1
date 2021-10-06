import {
  directionText,
  createElement,
  K_record,
  makeOk,
  // tempGuideLine,
} from '../component';
import { Howler } from 'howler';

// (reading) + speak
const KM000066 = async function ({
  canvas,
  direction,
  elements,
  record,
  callback,
}) {
  // tempGuideLine(canvas); // 좌표선 삭제
  const g = canvas.g();
  const backG = g.g();
  const ttsG = g.g();
  const contentG = g.g();

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

  // 녹음하기
  const myRecord = new K_record({
    canvas: contentG,
    record,
    recordStartCallback: () => {
      okBtn.stop();
      Howler.stop();
      ttsG.attr('pointer-events', 'none');
    },
    recordEndCallback: () => {
      okBtn.start();
      ttsG.attr('pointer-events', 'auto');
    },
    listenStartCallback: () => {
      okBtn.stop();
      Howler.stop();
      ttsG.attr('pointer-events', 'none');
    },
    listenEndCallback: () => {
      okBtn.start();
      ttsG.attr('pointer-events', 'auto');
    },
  });

  // 확인
  const okBtn = new makeOk({
    canvas: contentG,
    visibility: true,
    callback,
  });

  myRecord.start();
};

export default KM000066;
