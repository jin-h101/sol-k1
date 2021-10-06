import {
  directionText,
  createElement,
  makeOk,
  // tempGuideLine,
} from '../component';
import { loadSound } from 'sol-common';

// 초기 독서 Check
const KM000072 = async function ({
  canvas,
  direction,
  elements,
  nextButton,
  okButton,
  animations,
  callback,
}) {
  // tempGuideLine(canvas); // 좌표선 삭제
  const g = canvas.g();
  const backG = g.g();
  const ttsG = g.g();
  const contentsG = g.g();
  const animationG = contentsG.g().attr('opacity', 0);

  // 지시문
  if (direction) directionText({ canvas: ttsG, ...direction });

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

  // 다음 버튼
  const btnNext = new makeOk({
    canvas: contentsG,
    type: nextButton.type,
    visibility: nextButton.visibility,
    event: nextButton.event,
    callback: () => ani.start(),
  });

  // 확인 버튼
  const btnCheck = new makeOk({
    canvas: contentsG,
    type: okButton.type,
    event: okButton.event,
    callback,
  });

  // 애니메이션 요소
  const { background, frameElements, effects, checkElements, delayCheck } =
    animations;
  const ani = new Animation();
  const textArr = [];
  let frames = [];

  background.forEach(({ type, meta }) => {
    createElement({
      type,
      canvas: animationG,
      meta,
    });
  });
  const frameG = animationG.g();
  const lastG = contentsG.g().attr('opacity', 0);

  // 애니메이션이 적용 될 요소
  frameElements.forEach(({ type, meta, text }) => {
    const { visibility = true } = meta;
    createElement({
      type,
      canvas: frameG,
      meta,
    }).attr('opacity', visibility ? 1 : 0);
    textArr.push(text);
  });
  frames = frameG.children();

  // 애니메이션 종료 후 마지막에 보여 줄 요소
  checkElements.forEach(({ type, meta }) => {
    const element = createElement({
      type,
      canvas: lastG,
      meta,
    });
    if (type === 'regularPolygon') {
      element.transform(
        `t${meta.cx - meta.length / 2},${meta.cy + meta.length / 2}r90`
      );
    }
  });

  function Animation() {
    this.frameIdx = 0;

    this.start = function () {
      backG.attr('opacity', 0);
      animationG.attr('opacity', 1);
      btnNext.kill();
      this.next();
    };

    this.next = function () {
      if (this.frameIdx < effects.length) {
        effects[this.frameIdx].forEach((effect, i) => {
          const {
            targetIndex,
            attributes,
            classNum,
            timeout,
            sound: soundUrl,
            soundDelay,
          } = effect;

          frames[targetIndex].animate(attributes, timeout, () => {
            if (i === effects[this.frameIdx].length - 1) {
              this.frameIdx++;
              this.next();
            }
          });

          if (classNum) {
            setTimeout(() => {
              frames[targetIndex].select('text').addClass(`f${classNum}`);
            }, timeout);
          }

          if (soundUrl) {
            const soundEffect = loadSound(soundUrl);
            if (soundDelay) {
              setTimeout(() => {
                soundEffect.play();
              }, soundDelay);
            } else {
              soundEffect.play();
            }
          }
        });
      } else {
        this.stop();
      }
    };

    this.stop = function () {
      setTimeout(() => {
        showCheckElements();
      }, delayCheck);
    };

    function showCheckElements() {
      animationG.attr('opacity', 0);
      lastG.attr('opacity', 1);
      setTimeout(() => {
        btnCheck.start();
      }, okButton.delay);
    }
  }
};

export default KM000072;
