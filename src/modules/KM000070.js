import {
    directionText,
    createElement,
    // tempGuideLine,
    loadBtnSound,
    K_record,
    makeOk
} from '../component';
import { SOL } from 'sol-common/util';
import { Howler } from 'howler';


const KM000070 = async function ({ canvas = SOL.SVG, callback, ...p }) {
    // tempGuideLine(canvas); // 좌표선 삭제
    const g = canvas.g();
    const backG = g.g(); // elements 그리는 그룹
    const ttsG = g.g(); // 지시문 그룹
  
    const contentG = g.g().attr('visibility', 'hidden');
    const btnSound = loadBtnSound(0);


    // 지시문
    if (p.direction) directionText({ canvas: ttsG, ...p.direction });

    //배경 존재 시 설정
    if (p.elements) {
        p.elements.forEach(el => {
            if (el) {
                createElement({
                    type: el.type,
                    canvas: backG,
                    meta: el.meta
                });
            }
        });
    }

    // 선택하기
    const choiceG = g.g();
    const choiceEl = [];
    if (p.choice) {
        if (p.choice.elements) {
            p.choice.elements.forEach((el, i) => {
                choiceEl[i] = choiceG.g();
                if (el) {
                    el.forEach(el2 => {
                        if (el2) {
                            createElement({
                                type: el2.type,
                                canvas: choiceEl[i],
                                meta: el2.meta
                            });
                        }
                    });
                    choiceEl[i].addClass('cp').click(function () {
                            btnSound.play();
                            this.attr('pointer-events', 'none');
                            onClick(i);
                    });
                }
            });
        }

    }
    const onClick = (ind) => {
        choiceEl.forEach((el, i) => {
            if (ind !== i) el.remove();
        });
        const bb = choiceEl[ind].getBBox();
        const { cx = 400, cy = 200, scale = 1, moveTime = 500 } = p.choice.moveTo || {};
        choiceEl[ind].animate({
            transform: 't' + [cx - bb.cx, cy - bb.cy] + 's' + scale
        }, moveTime, function() {
            setTimeout(function () {
                contentG.attr('visibility', 'visible');
                myRecord.start();
            }, 300);
        });

    }
    
    
    const myRecord = new K_record({
        canvas: contentG,
        record: p.record,
        recordStartCallback: function () {
            okBtn.stop();
            Howler.stop();
            ttsG.attr('pointer-events', 'none');
        },
        recordEndCallback: function () {
            okBtn.start();
        },
        listenStartCallback: function () {
            okBtn.stop();
            Howler.stop();
            ttsG.attr('pointer-events', 'none');
        },
        listenEndCallback: function () {
            okBtn.start();
        },
    });

    // ok 버튼
    const okBtn = new makeOk({
        canvas: contentG,
        visibility: true,
        // event: true,
        callback: callback
    });
    
};

export default KM000070;
