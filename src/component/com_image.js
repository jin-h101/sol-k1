import Snap from 'sol-common/snap';
import { loadImages, loadImage } from 'sol-common';

import speedUp from '../assets/images/speedUp.svg';
import speedDown from '../assets/images/speedDown.svg';

import innerSpeaker from '../assets/images/innerSpeaker.svg';

import pencil from '../assets/images/pencil.svg';
import pencil_line from '../assets/images/pencil_line.svg';
import guidePen from '../assets/images/guidePen.svg';
import guidePen_up from '../assets/images/guidePen_up.svg';

import arrow from '../assets/images/arrow.svg';
import plus from '../assets/images/plus.svg';

import ladder from '../assets/images/ladder.svg';

import maze from '../assets/images/maze.svg';

import help from '../assets/images/help.svg';
import pressHelp from '../assets/images/pressHelp.svg';

import check from '../assets/images/check.svg';
//drag화살표
import arrowDrag from '../assets/images/arrowDrag.svg';
import arrowDrag2 from '../assets/images/arrowDrag2.svg';
import arrowDrag3 from '../assets/images/arrowDrag3.svg';

import add1 from '../assets/images/add1.svg';
import add2 from '../assets/images/add2.svg';
import cancel from '../assets/images/cancel.svg';
import pause from '../assets/images/pause.svg';

import footNoteMark from '../assets/images/testFootNoteMark.svg';

// 녹음하기
import record_type1 from '../assets/images/record/record_type1.svg';
import pressRecord_type1 from '../assets/images/record/pressRecord_type1.svg';
import unPressRecord_type1 from '../assets/images/record/unPressRecord_type1.svg';

import record_type2 from '../assets/images/record/record_type2.svg';
import pressRecord_type2 from '../assets/images/record/pressRecord_type2.svg';
import unPressRecord_type2 from '../assets/images/record/unPressRecord_type2.svg';

// 들어보기
import listen_type1 from '../assets/images/record/listen_type1.svg';
import pressListen_type1 from '../assets/images/record/pressListen_type1.svg';
import unPressListen_type1 from '../assets/images/record/unPressListen_type1.svg';

import listen_type2 from '../assets/images/record/listen_type2.svg';
import pressListen_type2 from '../assets/images/record/pressListen_type2.svg';
import unPressListen_type2 from '../assets/images/record/unPressListen_type2.svg';

// 멈추기
import pause_type1 from '../assets/images/record/pause_type1.svg';
import pressPause_type1 from '../assets/images/record/pressPause_type1.svg';
import unPressPause_type1 from '../assets/images/record/unPressPause_type1.svg';

import pause_type2 from '../assets/images/record/pause_type2.svg';
import pressPause_type2 from '../assets/images/record/pressPause_type2.svg';
import unPressPause_type2 from '../assets/images/record/unPressPause_type2.svg';

// 끝내기
import stop_type1 from '../assets/images/record/stop_type1.svg';
import pressStop_type1 from '../assets/images/record/pressStop_type1.svg';
import unPressStop_type1 from '../assets/images/record/unPressStop_type1.svg';

import stop_type2 from '../assets/images/record/stop_type2.svg';
import pressStop_type2 from '../assets/images/record/pressStop_type2.svg';
import unPressStop_type2 from '../assets/images/record/unPressStop_type2.svg';

export const loadAddIcon = () =>
    loadImages([
        {
            src: add1,
            key: 'add1',
            type: 'svg'
        },
        {
            src: add2,
            key: 'add2',
            type: 'svg'
        }
    ]);

export const loadCancelIcon = () =>
    loadImage({
        src: cancel,
        key: 'cancel',
        type: 'svg'
    });

export const loadPauseIcon = () =>
    loadImage({
        src: pause,
        key: 'pause',
        type: 'svg'
    });

export const loadSpeedIcon = () =>
    loadImages([
        {
            src: speedUp,
            key: 'speedUp',
            type: 'svg'
        },
        {
            src: speedDown,
            key: 'speedDown',
            type: 'svg'
        }
    ]);

export const loadSpeakerIcon = () =>
    loadImage({
        src: innerSpeaker,
        key: 'innerSpeaker',
        type: 'svg'
    });

export const loadPencilIcon = () =>
    loadImages([
        {
            src: pencil,
            key: 'pencil',
            type: 'svg'
        },
        {
            src: pencil_line,
            key: 'pencil_line',
            type: 'svg'
        },
        {
            src: guidePen_up,
            key: 'guidePen_up',
            type: 'svg'
        },
        {
            src: guidePen,
            key: 'guidePen',
            type: 'svg'
        }
    ]);

export const loadSignIcon = () => {
    const sign = loadImages([
        {
            src: arrow,
            key: 'arrow',
            type: 'svg'
        },
        {
            src: plus,
            key: 'plus',
            type: 'svg'
        }
    ]);
    return {
        arrow: sign[0],
        plus: sign[1]
    };
};

export const loadLadderImg = index => {
    let ladderImg;
    switch (index) {
        case 0:
            ladderImg = loadImage({ src: ladder, key: 'ladder', type: 'svg' });
            break;
    }
    return ladderImg;
};

export const loadMazeImg = index => {
    let mazeImg;
    switch (index) {
        case 0:
            mazeImg = loadImage({ src: maze, key: 'maze', type: 'svg' });
            break;
    }
    return mazeImg;
};

export const loadHelpImg = () =>
    loadImages([
        {
            src: help,
            key: 'help',
            type: 'svg'
        },
        {
            src: pressHelp,
            key: 'pressHelp',
            type: 'svg'
        }
    ]);

export const loadCheckImg = () => loadImage({ src: check, key: 'check', type: 'svg' });

export const penCountImage = function ({
    canvas,
    isBackground = true,
    type = 0,
    count,
    cx = type === 0 ? 710 : 710,
    cy = type === 0 ? 165 : 90,
    gap = 30,
    scale = 1
}) {
    console.log(cx, cy, gap, scale);
    const g = canvas.g();
    const backG = g.g();
    const penG = g.g();
    const iconImages = loadPencilIcon();
    for (let z = 0; z < count; z++) {
        const gg = penG.g().attr('class', 'penIcon');
        const xy = type === 1 ? [0 + gap * z, 0] : [0, 0 + gap * z];
        iconImages[0].use().transform(Snap.matrix(scale, 0, 0, scale, xy[0], xy[1])).appendTo(gg).attr('opacity', 0);
        iconImages[1].use().transform(Snap.matrix(scale, 0, 0, scale, xy[0], xy[1])).appendTo(gg);
    }
    penG.transform('t' + [cx, cy]).center();
    if (isBackground) {
        const bbox = penG.getTBox();
        backG
            .rect(bbox.cx, bbox.cy, bbox.w + 20, bbox.h + 20, 10, 10)
            .addClass('f0014 sno')
            .center();
        const fakeInfo =
            type === 1
                ? [bbox.x - 10, bbox.cy + 10, bbox.w + 20, bbox.h / 2]
                : [bbox.x - 10, bbox.y - 10, bbox.w / 2, bbox.h + 20];
        backG.rect(fakeInfo[0], fakeInfo[1], fakeInfo[2], fakeInfo[3]).addClass('f0014 sno');
    }
    return g;
};

export const handImageIcon = function ({ canvas, scale = 0.4, strokeColor = '#E24481' }) {
    const handImg = [
        'M63.1,46.1l-0.6-1.4l-0.1-0.2c-0.8-1.5-1.2-3-1.3-4.6c-0.1-4.5-0.8-8-2.3-11.1c-1.7-3.5-3.5-7.2-5.6-11c-1.7-3.2-4.7-5.1-8.1-5.1c-1.1,0-2.1,0.2-3.2,0.5c-2.5-1-5.5-0.8-8,0.6c-0.9-0.3-1.8-0.4-2.7-0.4c-1.2,0-2.3,0.2-3.2,0.6c-3.5-4.2-8.7-9.1-11-11c-1.8-1.8-4.2-2.8-6.8-2.8c-2.6,0-5,1-6.8,2.8c-3.8,3.7-3.9,9.9-0.2,13.8c2.9,2.9,7.5,8.6,10,13.5c-1.7,0.9-3,2.4-3.8,4.1c-1.2,2.5-1.2,5.3,0,8c1.2,2.7,3.9,4.8,6,5.8c2.4,1.2,4.8,2.8,7.3,4.6c2.5,1.7,5,3.5,7.7,4.9c0.6,0.3,0.7,0.5,0.7,0.7l1.5,2.9l0.1,0.2c1.1,1.7,3.1,2.6,6.1,2.6l0,0c3.6,0,8.3-1.3,12.5-3.4C58.2,57.2,65.4,51.3,63.1,46.1z',
        'M60.1,47.4l-0.6-1.4c-1.1-1.9-1.6-3.9-1.7-6.2c0-3.3-0.5-6.7-2-9.7c-1.8-3.7-3.6-7.3-5.5-10.9c-1.7-3.2-4.8-4.2-8.1-2.8c-0.3,0.1-0.7,0.2-1,0c-1.9-1.2-4.5-1-6.4,0.5c-0.2,0.2-0.7,0.3-1,0.1c-3.6-1.5-6.1,0.6-6.1,0.6l-1.3-0.6C23.2,12.7,17,7,14.9,5.4c0,0,0,0,0,0c-2.5-2.6-6.6-2.6-9.2-0.1c-2.6,2.5-2.6,6.6-0.1,9.2c2.7,2.7,9.9,11.2,12,17.7c-0.4,0.1-0.7,0.1-1.1,0.2c-3.2,0.8-6.1,4.3-4.2,8.6c0.8,1.8,2.9,3.4,4.5,4.2c5.1,2.5,10,6.9,15.1,9.5c1,0.5,1.8,1.2,2.3,2.3l1.4,2.6c1.2,1.9,7.7,1.3,14.4-2C56.5,54.3,61.1,49.8,60.1,47.4z',
        'M45.1,19.8c-0.3,0-0.7-0.2-0.9-0.5c-1.6-2.2-3.3-3.1-3.3-3.1c-0.6-0.3-0.9-1.1-0.6-1.7c0.3-0.6,1-0.8,1.6-0.5c0.1,0,2.3,1.1,4.3,3.8c0.4,0.6,0.3,1.3-0.3,1.7C45.7,19.7,45.4,19.8,45.1,19.8z',
        'M38.6,21.9c-0.3,0-0.7-0.2-0.9-0.5c-2.6-3.7-4.1-4.5-4.1-4.5l0,0c-0.7,0-1.3-0.5-1.3-1.2s0.5-1.1,1.2-1.1c0.9,0,2.8,0.5,6.2,5.4c0.4,0.6,0.3,1.3-0.3,1.7C39.2,21.9,38.9,22,38.6,21.9z',
        'M31.4,27.7c-0.5-0.1-0.9-0.5-1.1-1c-1.9-9.7-8.8-15.3-8.9-15.3c-0.5-0.4-0.6-1.2-0.2-1.8c0.4-0.5,0.8-0.5,1.4,0c0.3,0.2,8.1,6.1,10.1,16.7c0.1,0.7-0.3,1.3-1,1.5C31.7,27.7,31.6,27.7,31.4,27.7z',
        'M17.1,39.6c-0.5-0.1-0.9-0.6-0.9-1.2c-0.3-8.5-4.8-12.4-4.8-12.4c-0.5-0.5-2.5-3.1-2-3.6c0.5-0.5,1.8-0.2,2.9,1.1c0.2,0.2,6.1,5.4,6.4,14.8c0,0.7-0.5,1.3-1.2,1.3C17.4,39.7,17.2,39.7,17.1,39.6z'
    ];
    var gg = canvas
        .g()
        .toDefs()
        .transform('s' + scale);
    handImg.forEach(function (el, i) {
        gg.path(el).attr({
            fill: i === 1 ? '#FFFFFF' : strokeColor
        });
    });
    return gg;
};

export const handImageIcon2 = function ({ canvas, scale = 0.4, strokeColor = '#E24481' }) {
    const handImg = [
        'M67.4,39.1l-0.6-1.4l-0.1-0.2c-0.8-1.5-1.2-3-1.2-4.6c-0.1-4.4-0.8-8-2.3-11.1c-1.6-3.3-3.5-7.2-5.5-10.9c-1.7-3.2-4.7-5.1-8.1-5.1c-1.1,0-2.1,0.2-3.2,0.5c-2.5-1-5.5-0.8-7.9,0.6c-0.9-0.3-1.8-0.4-2.7-0.4c-1.3,0-2.4,0.3-3.2,0.6c-4-3.9-11.2-5.6-16.9-6.3l-0.2,0C9.9,0.1,2.4,2.3,0.7,8.2C-0.1,10.8,0,13,1.1,14.8c1.6,2.7,4.5,3.5,6.3,3.9L8,18.9c4,0.7,8.3,2.2,10.6,4c-2,0.9-3.6,2.5-4.6,4.4c-1.2,2.4-1.2,5.3,0,7.9c1.2,2.7,3.9,4.8,6,5.8c2.4,1.2,4.8,2.8,7.3,4.6c2.5,1.7,5,3.5,7.7,4.8c0.6,0.3,0.7,0.5,0.7,0.7l1.5,2.9l0.1,0.2c1.1,1.7,3.1,2.6,6.1,2.6c3.6,0,8.2-1.3,12.4-3.4C62.6,50.1,69.7,44.3,67.4,39.1z',
        'M64.5,40.5l-0.6-1.4c-1.1-1.9-1.6-3.9-1.7-6.1c0-3.3-0.5-6.6-2-9.7c-1.8-3.6-3.6-7.3-5.5-10.8c-1.7-3.2-4.8-4.1-8-2.8c-0.3,0.1-0.7,0.2-1,0c-1.9-1.2-4.4-1-6.4,0.5c-0.2,0.2-0.7,0.3-1,0.1c-3.6-1.5-6.1,0.6-6.1,0.6L31,10.4c-3.8-5.1-15.2-6.2-16-6.3c-4.3-0.6-10.1,1.1-11.3,5c-1.6,5.3,2.5,6,4.8,6.6c0.1,0,14.1,2.2,15,9.3c-0.9,0.2-1.7,0.3-2.4,0.4c-3.2,0.8-6,4.3-4.1,8.6c0.8,1.8,2.9,3.4,4.4,4.2c5.1,2.5,9.9,6.8,15,9.4c1,0.5,1.8,1.2,2.2,2.3l1.4,2.6c1.1,1.8,7.7,1.3,14.3-2C60.9,47.3,65.5,42.8,64.5,40.5z',
        'M49.5,13c-0.3,0-0.7-0.2-0.9-0.5c-1.6-2.1-3.3-3-3.3-3c-0.6-0.3-0.9-1.1-0.6-1.7c0.3-0.6,1-0.8,1.6-0.5c0.1,0,2.3,1.1,4.3,3.7c0.4,0.6,0.3,1.3-0.3,1.7C50.1,13,49.8,13,49.5,13z',
        'M43.1,15.1c-0.3,0-0.7-0.2-0.9-0.5c-2.6-3.7-4-4.5-4.1-4.5l0,0c-0.7,0-1.3-0.5-1.3-1.2c0-0.7,0.5-1.1,1.2-1.1c0.8,0,2.8,0.5,6.2,5.4c0.4,0.6,0.3,1.3-0.3,1.7C43.7,15.1,43.4,15.2,43.1,15.1z',
        'M37,19.5c-0.5,0-1-0.3-1.2-0.8c-3.1-9.3-12.2-13-12.2-13c-0.6-0.4-0.8-1.1-0.4-1.7c0.4-0.6,0.8-0.6,1.4-0.2c0.3,0.2,10.3,4,13.6,14.2c0.2,0.7-0.1,1.4-0.8,1.6C37.3,19.5,37.2,19.5,37,19.5z',
        'M27.6,29.5c-3.7-8.7-11-11.3-11.3-11.5l0.1,2.7c0.1,0,5.6,2,8.9,9.8c0.2,0.5,0.7,0.8,1.3,0.7c0.1,0,0.3,0,0.4-0.1C27.6,30.8,27.9,30.1,27.6,29.5z'
    ];
    var gg = canvas
        .g()
        .toDefs()
        .transform('s' + scale);
    handImg.forEach(function (el, i) {
        gg.path(el).attr({
            fill: i === 1 ? '#FFFFFF' : strokeColor
        });
    });
    return gg;
};

export const dragElementImg = () =>
    loadImages([
        {
            src: arrowDrag,
            key: 'arrowDrag',
            type: 'svg'
        },
        {
            src: arrowDrag2,
            key: 'arrowDrag2',
            type: 'svg'
        },
        {
            src: arrowDrag3,
            key: 'arrowDrag3',
            type: 'svg'
        }
    ]);

export const footNoteImg = () => loadImage({ src: footNoteMark, key: 'footNoteMark', type: 'svg' });

export const loadrecordImg = (type = '1') => {
    const ladderImg = {};
    // 녹음하기
    ladderImg.record = loadImages([
        {
            src: type === '2' ? record_type2 : record_type1,
            key: `record_type${type}`,
            type: 'svg'
        },
        {
            src: type === '2' ? pressRecord_type2 : pressRecord_type1,
            key: `pressRecord_type${type}`,
            type: 'svg'
        },
        {
            src: type === '2' ? unPressRecord_type2 : unPressRecord_type1,
            key: `unPressRecord_type${type}`,
            type: 'svg'
        }
    ]);
    // 들어보기
    ladderImg.listen = loadImages([
        {
            src: type === '2' ? listen_type2 : listen_type1,
            key: `listen_type${type}`,
            type: 'svg'
        },
        {
            src: type === '2' ? pressListen_type2 : pressListen_type1,
            key: `pressListen_type${type}`,
            type: 'svg'
        },
        {
            src: type === '2' ? unPressListen_type2 : unPressListen_type1,
            key: `unPressListen_type${type}`,
            type: 'svg'
        }
    ]);
    // 멈추기
    ladderImg.pause = loadImages([
        {
            src: type === '2' ? pause_type2 : pause_type1,
            key: `pause_type${type}`,
            type: 'svg'
        },
        {
            src: type === '2' ? pressPause_type2 : pressPause_type1,
            key: `pressPause_type${type}`,
            type: 'svg'
        },
        {
            src: type === '2' ? unPressPause_type2 : unPressPause_type1,
            key: `unPressPause_type${type}`,
            type: 'svg'
        }
    ]);
    // 끝내기
    ladderImg.stop = loadImages([
        {
            src: type === '2' ? stop_type2 : stop_type1,
            key: `stop_type${type}`,
            type: 'svg'
        },
        {
            src: type === '2' ? pressStop_type2 : pressStop_type1,
            key: `pressStop_type${type}`,
            type: 'svg'
        },
        {
            src: type === '2' ? unPressStop_type2 : unPressStop_type1,
            key: `unPressStop_type${type}`,
            type: 'svg'
        }
    ]);

    return ladderImg;
};
