import {
  directionText,
  createElement,
  com_pageConvert,
  reading,
  makeSoundButton,
  K_record,
  makeOk,
  // tempGuideLine,
} from '../component';

// reading + speak
const KM000071 = async function ({
  canvas,
  direction,
  elements,
  sound,
  scroll,
  question,
  soundButton,
  record,
  callback,
}) {
  // tempGuideLine(canvas); // 좌표선 삭제
  const g = canvas.g();
  const backG = g.g();
  const ttsG = g.g();
  const hasReading = !!question;
  let recordObj = record;
  let contentG,
    soundG,
    qTtsG,
    voice,
    readingGroup,
    convertModal,
    ttsObj,
    qTTsObj;

  // 지시문
  if (direction) {
    ttsObj = directionText({
      canvas: ttsG,
      howlerStop: false,
      ttsStartCallback: () => {
        readingGroup && readingGroup.stop();
        howlerStop();
      },
      ...direction,
    });
  }

  //배경 존재 시 설정
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

  // 글읽기가 존재하는 경우
  if (hasReading) {
    const scrollG = g.g();
    const converG = g.g().attr('class', 'convert');
    const qBackG = converG.g();
    const { direction, elements, soundButton: soundObj, record } = question;

    qTtsG = converG.g();
    contentG = converG.g();
    soundButton = soundObj;
    recordObj = record;

    // 글읽기
    readingGroup = new reading({
      canvas: scrollG,
      area: scroll.area,
      elements: scroll.elements,
      focusText: scroll.focusText,
      footNoteInfo: scroll.footNoteInfo,
      sound,
      firstGuide: true,
      startCallback: () => {
        convertModal.start();
        howlerStop();
      },
      endCallback: () => console.log('end reading'),
    });

    // 지시문
    if (direction) {
      qTTsObj = directionText({
        canvas: qTtsG,
        howlerStop: false,
        ttsStartCallback: howlerStop,
        ...direction,
      });
    }

    // 배경
    if (elements) {
      elements.forEach((el) => {
        if (el) {
          createElement({
            type: el.type,
            canvas: qBackG,
            meta: el.meta,
          });
        }
      });
    }

    // 모달
    convertModal = new com_pageConvert({
      g: canvas,
      appendG: converG,
      time: 800,
      howlerStop: false,
      startCallback: () => {
        readingGroup.stop();
        howlerStop();
      },
      endCallback: () => {
        const { record, listen } = myRecord.getState();
        howlerStop();
        record === 'active' && listen === 'nonActive' // 초기
          ? myRecord.initIcon()
          : record === 'hidden' // 녹음 중
          ? myRecord.stop()
          : myRecord.pause(); // 듣는 중
      },
      // guideLine: true,
    });

    readingGroup.start();
  } else {
    contentG = g.g();
  }

  // 사운드 요소
  if (soundButton) {
    const { elements, sound } = soundButton;
    const soundObj = makeSoundButton({
      g: contentG,
      elements,
      sound,
      isStopHowler: false,
      startCallback: (mySound) => {
        voice = mySound;
        howlerStop();
      },
    });
    soundG = soundObj.g;
    voice = soundObj.sound;
  }

  // 녹음하기
  const myRecord = new K_record({
    canvas: contentG,
    record: recordObj,
    recordStartCallback: () => {
      okBtn.stop();
      howlerStop();
      ttsG.attr('pointer-events', 'none');
      qTtsG?.attr('pointer-events', 'none');
      soundG?.attr('pointer-events', 'none');
    },
    recordEndCallback: () => {
      okBtn.start();
      ttsG.attr('pointer-events', 'auto');
      qTtsG?.attr('pointer-events', 'auto');
      soundG?.attr('pointer-events', 'auto');
    },
    listenStartCallback: () => {
      okBtn.stop();
      howlerStop();
      ttsG.attr('pointer-events', 'none');
      qTtsG?.attr('pointer-events', 'none');
      soundG?.attr('pointer-events', 'none');
    },
    listenEndCallback: () => {
      okBtn.start();
      ttsG.attr('pointer-events', 'auto');
      qTtsG?.attr('pointer-events', 'auto');
      soundG?.attr('pointer-events', 'auto');
    },
  });

  // 확인
  const okBtn = new makeOk({
    canvas: contentG,
    visibility: true,
    callback,
  });

  //모든 지시문 tts만 초기화
  function howlerStop() {
    if (ttsObj?.tts.data('voice')) ttsObj.tts.data('voice').stop();
    if (qTTsObj?.tts.data('voice')) qTTsObj.tts.data('voice').stop();
    voice?.stop();
  }

  myRecord.start();
};

export default KM000071;
