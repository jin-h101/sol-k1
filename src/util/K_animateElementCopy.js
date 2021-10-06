import {
    rect
} from 'sol-common/components'
import Snap from 'sol-common/snap'
import mina from 'sol-common/snap/mina'
import { pathWord } from './K_word'
const K_animateElementCopy = function ({
    canvas,
    cx,
    cy,
    scale,
    text,
    animateIndex,
    bgInfo,
    shadowHint = true,
    pathAttr,
    time = 2000,
    hand = true,
    easing = mina.linear,
    callback = function () {},

}) {
    pathAttr = {
        'class': 'fno s001',
        'strokeWidth': 15 * scale,
        'strokeLinejoin': 'round', //butt, round, square
        'strokeLinecap': 'round',
        'pointerEvents': 'none',
        ... pathAttr
    }
    const g = canvas.g();
    const handG = canvas.g();

    //배경정보 있을 때 배경 생성
    if(bgInfo){
        g.rect(0,0,bgInfo.width,bgInfo.height, (bgInfo.r || 0), (bgInfo.r || 0))
         .addClass('f'+(bgInfo.fillClassNum || '117')+' s'+(bgInfo.strokeClassNum || 'no'))
         .attr('opacity', bgInfo.opacity || 1)
         .center();

        //  new rect({
        //     'x': 0,
        //     'y': 0,
        //     'width': bgInfo.width,
        //     'height': bgInfo.height,
        //     'className': 'f'+(bgInfo.fillClassNum || '117')+' s'+(bgInfo.strokeClassNum || 'no'),
        //     'opacity': bgInfo.opacity || 1,
        //     'center': true,
        //     'canvas': g
        // });
    }
   
    const pathInfomation=pathWord({
        'canvas':g,
        'cx': 0,
        'cy': 0,
        'textScale':scale,
        'text':text
    });
    const pathStr=pathInfomation.totalPath[animateIndex];
    const guideStr=pathInfomation.guidePath[animateIndex];
    const pathG=pathInfomation.g;
    g.selectAll('.path')[animateIndex].attr('opacity',0.2);
    console.log(guideStr);
    guideStr.forEach(function (path) {
        const newGuideP=Snap.path.map(path, Snap.matrix(scale, 0, 0, scale, 0, 0))
        pathG.path(newGuideP).addClass('fno s02').attr({
            'strokeWidth': 2,
            'strokeDasharray': '8 3',
            'opacity': shadowHint ? 1 : 0
        });
    });

    //animation 만들기
    const newP=Snap.path.map(pathStr, Snap.matrix(scale, 0, 0, scale, 0, 0))
    console.log(newP);
    pathG.path(newP).addClass('fno sno').attr({
        'strokeWidth': pathAttr.strokeWidth,
        'strokeLinejoin': pathAttr.strokeLinejoin,
        'strokeLinecap': pathAttr.strokeLinecap,
    })

    const len = Snap.path.getTotalLength(newP);
    let myPath = pathG.path('').attr(pathAttr);
    const animateTime = time ? time : len * 5;
    let handImg;
    let point;
    let t = 0;
    if (hand) {
        point = Snap.path.getPointAtLength(newP, 0);
        handImg = makeHandImage(handG).use().transform('t' + [point.x, point.y]).appendTo(pathG).attr({
            'pointerEvents': 'none',
            'opacity': 0
        });
        t = 300;
    }

    // 전체 위치 조정
    g.transform('t'+[cx,cy]);

    //손가락 모양
    function makeHandImage(g) {
        const handImg = [
            'M63.1,46.1l-0.6-1.4l-0.1-0.2c-0.8-1.5-1.2-3-1.3-4.6c-0.1-4.5-0.8-8-2.3-11.1c-1.7-3.5-3.5-7.2-5.6-11c-1.7-3.2-4.7-5.1-8.1-5.1c-1.1,0-2.1,0.2-3.2,0.5c-2.5-1-5.5-0.8-8,0.6c-0.9-0.3-1.8-0.4-2.7-0.4c-1.2,0-2.3,0.2-3.2,0.6c-3.5-4.2-8.7-9.1-11-11c-1.8-1.8-4.2-2.8-6.8-2.8c-2.6,0-5,1-6.8,2.8c-3.8,3.7-3.9,9.9-0.2,13.8c2.9,2.9,7.5,8.6,10,13.5c-1.7,0.9-3,2.4-3.8,4.1c-1.2,2.5-1.2,5.3,0,8c1.2,2.7,3.9,4.8,6,5.8c2.4,1.2,4.8,2.8,7.3,4.6c2.5,1.7,5,3.5,7.7,4.9c0.6,0.3,0.7,0.5,0.7,0.7l1.5,2.9l0.1,0.2c1.1,1.7,3.1,2.6,6.1,2.6l0,0c3.6,0,8.3-1.3,12.5-3.4C58.2,57.2,65.4,51.3,63.1,46.1z',
            'M60.1,47.4l-0.6-1.4c-1.1-1.9-1.6-3.9-1.7-6.2c0-3.3-0.5-6.7-2-9.7c-1.8-3.7-3.6-7.3-5.5-10.9c-1.7-3.2-4.8-4.2-8.1-2.8c-0.3,0.1-0.7,0.2-1,0c-1.9-1.2-4.5-1-6.4,0.5c-0.2,0.2-0.7,0.3-1,0.1c-3.6-1.5-6.1,0.6-6.1,0.6l-1.3-0.6C23.2,12.7,17,7,14.9,5.4c0,0,0,0,0,0c-2.5-2.6-6.6-2.6-9.2-0.1c-2.6,2.5-2.6,6.6-0.1,9.2c2.7,2.7,9.9,11.2,12,17.7c-0.4,0.1-0.7,0.1-1.1,0.2c-3.2,0.8-6.1,4.3-4.2,8.6c0.8,1.8,2.9,3.4,4.5,4.2c5.1,2.5,10,6.9,15.1,9.5c1,0.5,1.8,1.2,2.3,2.3l1.4,2.6c1.2,1.9,7.7,1.3,14.4-2C56.5,54.3,61.1,49.8,60.1,47.4z',
            'M45.1,19.8c-0.3,0-0.7-0.2-0.9-0.5c-1.6-2.2-3.3-3.1-3.3-3.1c-0.6-0.3-0.9-1.1-0.6-1.7c0.3-0.6,1-0.8,1.6-0.5c0.1,0,2.3,1.1,4.3,3.8c0.4,0.6,0.3,1.3-0.3,1.7C45.7,19.7,45.4,19.8,45.1,19.8z',
            'M38.6,21.9c-0.3,0-0.7-0.2-0.9-0.5c-2.6-3.7-4.1-4.5-4.1-4.5l0,0c-0.7,0-1.3-0.5-1.3-1.2s0.5-1.1,1.2-1.1c0.9,0,2.8,0.5,6.2,5.4c0.4,0.6,0.3,1.3-0.3,1.7C39.2,21.9,38.9,22,38.6,21.9z',
            'M31.4,27.7c-0.5-0.1-0.9-0.5-1.1-1c-1.9-9.7-8.8-15.3-8.9-15.3c-0.5-0.4-0.6-1.2-0.2-1.8c0.4-0.5,0.8-0.5,1.4,0c0.3,0.2,8.1,6.1,10.1,16.7c0.1,0.7-0.3,1.3-1,1.5C31.7,27.7,31.6,27.7,31.4,27.7z',
            'M17.1,39.6c-0.5-0.1-0.9-0.6-0.9-1.2c-0.3-8.5-4.8-12.4-4.8-12.4c-0.5-0.5-2.5-3.1-2-3.6c0.5-0.5,1.8-0.2,2.9,1.1c0.2,0.2,6.1,5.4,6.4,14.8c0,0.7-0.5,1.3-1.2,1.3C17.4,39.7,17.2,39.7,17.1,39.6z'
        ]
        var gg = g.g().toDefs().transform('s0.4');
        handImg.forEach(function (el, i) {
            gg.path(el).attr({
                fill: i === 1 ? '#FFFFFF' : '#E24481'
            });
        });
        return gg;
    }


    //start
    this.start = function () {
        canvas.attr('pointer-events', 'none')
        if (hand) handImg.attr('opacity', 1);
        setTimeout(function () {
            Snap.animate(0, len, function (val) {
                if (hand) {
                    point = Snap.path.getPointAtLength(newP, val);
                    handImg.transform('t' + [point.x, point.y]);
                }
                myPath.attr({
                    'd': Snap.path.getSubpath(newP, 0, val)
                });
            }, animateTime, easing, function () {
                if (hand) handImg.remove();
                callback();
            });
        }, t);
    }
    return this;
}
export default K_animateElementCopy;