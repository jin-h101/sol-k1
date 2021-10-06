import {
  directionText,
  createElement,
  makeOk,
  loadBtnSound,
  // tempGuideLine,
} from '../component';
import { alignGroup } from 'sol-common/util';

// Toggle Image - 별 선택 평가
const KM000046 = async function ({
  canvas,
  direction,
  elements,
  okButton,
  toggleImages,
  callback,
}) {
  // tempGuideLine(canvas);
  const g = canvas.g();
  const backG = g.g();
  const ttsG = g.g();
  const toggleG = g.g();

  // 확인 버튼
  const ok = new makeOk({
    canvas: g,
    type: okButton.type,
    visibility: true,
    callback: callback,
  });

  // 지시문
  if (direction) directionText({ canvas: ttsG, ...direction });

  //배경 설정
  if (elements) {
    elements.forEach(({ type, meta }) => {
      createElement({
        type: type,
        canvas: backG,
        meta: meta,
      });
    });
  }

  // 토글 이미지
  if (toggleImages) {
    K_toggleImage({ toggleG, toggleImages, actionCallback });
  }

  function K_toggleImage({ toggleG, toggleImages, actionCallback }) {
    const { urls, cx, cy, scale, offset, count } = toggleImages;
    const imgGroups = [];

    for (let i = 0; i < count; i++) {
      const imgGroup = toggleG
        .g()
        .transform('t' + [offset.x * i, offset.y * i]);

      imgGroup.data('idx', i).data('status', false).pressEvent(toggle);
      imgGroups[i] = imgGroup;

      for (const [key, url] of Object.entries(urls)) {
        createElement({
          type: 'image',
          canvas: imgGroup,
          meta: { cx, cy, url, scale },
        })
          .attr('opacity', key === 'active' ? 0 : 1)
          .addClass('toggleImg');
      }

      alignGroup({ g: toggleG, x: cx, y: cy });
    }

    function toggle(bool) {
      if (!bool) {
        const target = this;
        const status = target.data('status');
        let score = 0;

        target.data('status', !status);
        target.selectAll('.toggleImg').forEach((el) => {
          el.attr('opacity', 1 - el.attr('opacity'));
        });
        loadBtnSound(Number(status)).play();

        imgGroups.forEach((el) => {
          el.data('status') && score++;
        });

        actionCallback({ score });
      }
    }
  }

  function actionCallback({ score }) {
    score ? ok.start() : ok.stop();
  }
};

export default KM000046;
