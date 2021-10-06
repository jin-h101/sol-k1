import { Howler } from 'howler';
import {
    com_makeModal,
    tempGuideLine
} from '.';
import { K_richTextAuto } from './K_text';
import { loadBtnSound } from './com_sound';
import { multiPointerControl } from './com_util';

const com_pageConvert = function ({
    g,
    appendG,
    visible = false,
    time = 1000,
    howlerStop = true,
    pressSound = true,
    startCallback,
    endCallback,
    guideLine //좌표선 삭제
}) {
    const canvas = g.g();
    const blockG = g.g();
    blockG.rect(800, 0, 800, 500).addClass('f14 sno');
    const subG = [canvas.g(), canvas.g()];
    const y = 80;
    const w = 40
    const h = 120
    const color = 'f108 sno';

    multiPointerControl({
        'elements': subG,
        'state': 'none'
    });
    // subG[1].attr({
    //     'pointer-events': 'none'
    // });

    const btnOneG = subG[0].g().data('index', 0);
    const q = subG[1].g().attr('class', 'convertSVG');
    const btnTwoG = subG[1].g().data('index', 1).attr('opacity', 0);
    const button = [btnOneG, btnTwoG];

    btnOneG.rect(-w / 2, y, w / 2, h).addClass(color)
    btnOneG.rect(-w, y, w, h, 5, 5).addClass(color)
    K_richTextAuto({
        'canvas': btnOneG,
        'text': '《',
        'x': -w / 2,
        'y': y + 30,
        'className': 'ffng f14',
        'fontSize': 25,
        'dy': 20,
        'lineCenter': true
    });
    K_richTextAuto({
        'canvas': btnOneG,
        'text': '문\n제\n풀\n기',
        'x': -w / 2,
        'y': y + 55,
        'className': 'ffng f14',
        'fontSize': 15,
        'dy': 18,
        'lineCenter': true
    });
    q.rect(0, 0, 800, 500).addClass('f0013 sno');

    if(guideLine) tempGuideLine(q) // 좌표선 삭제

    btnTwoG.rect(0, y, w / 2, h).addClass(color)
    btnTwoG.rect(0, y, w, h, 5, 5).addClass(color)
    K_richTextAuto({
        'canvas': btnTwoG,
        'text': '》',
        'x': w / 2,
        'y': y + 30,
        'className': 'ffng f14',
        'fontSize': 25,
        'dy': 20,
        'lineCenter': true
    });
    K_richTextAuto({
        'canvas': btnTwoG,
        'text': '글\n읽\n기',
        'x': w / 2,
        'y': y + 62,
        'className': 'ffng f14',
        'fontSize': 15,
        'dy': 18,
        'lineCenter': true
    });
    appendG.appendTo(q);

    button.forEach((btn) => btn.pressEvent((event)));

    const bbox = canvas.getTBox();
    const blockBbox = blockG.getTBox();
    const modal = new com_makeModal({
        'x': bbox.x,
        'y': bbox.y,
        'width': bbox.w + 40,
        'height': bbox.h,
        'appendG': canvas,
        'overflow': 'none',
        'isConvert': true
    }); // div 새로 만들 때
    modal.div.style.overflow = 'none';
    new com_makeModal({
        'x': blockBbox.x,
        'y': blockBbox.y,
        'width': blockBbox.w,
        'height': blockBbox.h,
        'appendG': blockG,
        'overflow': 'none'
    }); // div 새로 만들 때
    async function event(bool) {
        if (!bool) {
            // console.log('click End');
            const index = this.data('index');
            if(index===0 && startCallback) startCallback();
            else if(index === 1 && endCallback) endCallback();
            subG[index].attr({
                'pointer-events': 'none'
            });
            modal.div.style.animation = ['leftMove', 'rightMove'][index] + ' ' + (time / 1000) + 's forwards ease-out'
            await eventsChange(index);    
        }else{
            // console.log('click Start');
            if (pressSound){ 
                if(howlerStop) Howler.stop();
                loadBtnSound(this.data('index')).play();
            }
        }
    }
    function eventsChange(i) {
        setTimeout(() => {
            subG[1 - i].attr({
                'pointer-events': 'auto'
            });
            button[0].attr('opacity', i);
            button[1].attr('opacity', 1 - i);
        }, time);
    }
    if (visible) {
        subG.forEach((el, j) => el.attr('pointer-events', ['none', 'auto'][j]));
        button.forEach((el, k) => el.attr('opacity', k));
        modal.div.style.marginLeft = '0%'
    } else {
        modal.div.style.marginLeft = '100%'
    }

    modal.start = function(){
        subG[0].attr({
            'pointer-events': 'auto'
        });
    }
    modal.stop = function(){
        multiPointerControl({
            'elements': subG,
            'state': 'none'
        });
    }

    return modal;
};

export default com_pageConvert;