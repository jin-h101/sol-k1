import {
    rect
} from 'sol-common/components'
import Snap from 'sol-common/snap'
import mina from 'sol-common/snap/mina'

import { pathWord } from './K_word'
import { handImageIcon } from './com_image'

export const K_simpleAnimate = function ({
    canvas,
    bgInfo,
    shadowHint = true,
    matrix = Snap.matrix(1, 0, 0, 1, 0, 0),
    pathStr,
    pathAttr,
    isInnerGuide=false,
    guide,
    guideNumberOffset,
    guideAttr,
    guideInfo,
    strokeNoCutIndex,
    time,
    hand = true,
    easing = mina.linear,
    callback = function () {},
}) {
    const guideColor='0011';
    pathAttr = {
        'class': 'fno s04',
        'strokeWidth': 13,
        'strokeLinejoin': 'miter',
        // 'strokeLinejoin': 'round', 
        'strokeLinecap': 'butt', //butt, round, square
        'pointerEvents': 'none',
        ... pathAttr
    }
    guideAttr = {
        'class':'fno s'+guideColor,
        'strokeWidth': 1,
        'strokeDasharray': '0.1, 2',
        "strokeLinecap":"round",
        'opacity': shadowHint ? 1 : 0,
        ...guideAttr
    }
    const g = canvas.g();
    const backG = g.g();
    const subG = g.g();
    const showHintG = subG.g();
    const colorG = showHintG.g();
    const whiteG =showHintG.g();
    const guideHintG = subG.g();
    const animateActG = subG.g();
    const arrowG = [];
    const fixSize =  (pathAttr.strokeWidth-3) * 0.4
    const edge = g.polygon(0, 0, -fixSize, fixSize/2, 0, fixSize).addClass('sno f'+guideColor).toDefs();
    const scaleApplyPath = Snap.path.map(pathStr, Snap.matrix(1, 0, 0, 1, 0, 0));
    const len = Snap.path.getTotalLength(scaleApplyPath);
     
    //배경정보 있을 때 배경 생성 (배경 위치는 엘리먼트와 별개로 이동 but 보여지는 것은 같게 보임)
    if (bgInfo) {
        new rect({
            'x': matrix.e,
            'y': matrix.f,
            'width': bgInfo.width,
            'height': bgInfo.height,
            'className': 'f' + (bgInfo.fillClassNum || '117') + ' s' + (bgInfo.strokeClassNum || 'no'),
            'opacity': (bgInfo.opacity || bgInfo.opacity===0) ? bgInfo.opacity : 1,
            'center': true,
            'canvas': backG
        });
    }
    // showHint 만들기 (아래 깔린 테두리)
    pathStr.forEach((path) => {
        colorG.path(path).addClass(pathAttr.class).attr({
            'strokeWidth': pathAttr.strokeWidth,
            'strokeLinejoin': pathAttr.strokeLinejoin,
            'strokeLinecap': pathAttr.strokeLinecap,
        });
    })
    //showHint 만들기 (위에 깔린 흰 부분)
    pathStr.forEach((path,i) => {
        const ll = Snap.path.getTotalLength(path);
        const newP = strokeNoCutIndex.indexOf(i)!==-1 ? path : Snap.path.getSubpath(path,pathAttr.strokeWidth/10,ll-pathAttr.strokeWidth/10); // 1.3 = 13px기준 자를 길이
        // console.log({'s':Snap.path.getPointAtLength(Snap.path.map(newP, Snap.matrix(1, 0, 0, 1, 0, 0)), 1),
        // 'totalLen':Snap.path.getTotalLength(Snap.path.map(newP, Snap.matrix(1, 0, 0, 1, 0, 0))),
        // 'e':Snap.path.getPointAtLength(Snap.path.map(newP, Snap.matrix(1, 0, 0, 1, 0, 0)), Snap.path.getTotalLength(Snap.path.map(newP, Snap.matrix(1, 0, 0, 1, 0, 0)))-1)});
        whiteG.path(Snap.path.map(newP, Snap.matrix(1, 0, 0, 1, 0, 0))).addClass('fno s14').attr({
            'strokeWidth': pathAttr.strokeWidth * 0.8,
            'strokeLinejoin': pathAttr.strokeLinejoin,
            'strokeLinecap': pathAttr.strokeLinecap,
        });
        if (guide[i].length !== 0) {
            const guidePathSacle = (!isInnerGuide && guideInfo && guideInfo.scale) //* scale || scale
            arrowG[i] = guideHintG.g().attr('opacity', 1);
            guide[i].forEach((guidePath, j) => {
                const offset = (guideInfo && guideInfo.offset && guideInfo.offset[j]) ? guideInfo.offset[j] : {'x':0,'y':0}
                const newP = Snap.path.map(guidePath, Snap.matrix(guidePathSacle, 0, 0, guidePathSacle, offset.x, offset.y));
                arrowG[i].path(newP).attr(guideAttr); //show 힌트
                if (j === 0) {
                    const numberingG = arrowG[i].g();
                    numberingG.circle(newP[0][1], newP[0][2],  fixSize*0.8).addClass('f'+guideColor+' sno');
                    numberingG.text(newP[0][1], newP[0][2], (i + 1).toString()).attr({
                        'class': 'orderNum',
                        'fontSize': fixSize*0.9,
                        'fontWeight':'bold'
                    }).addClass('ffng f14 sno').center(); //엘리먼트
                    if(guideNumberOffset && guideNumberOffset[i]) numberingG.transform('t'+[guideNumberOffset[i][0]/matrix.a, guideNumberOffset[i][1]/matrix.d]);
                }
                    const edgePoint = Snap.path.getPointAtLength(newP, Snap.path.getTotalLength(newP) - 1); //1 * 3 / 2)
                    edge.use().transform('t' + (edgePoint.x + fixSize/2) + ',' + (edgePoint.y - fixSize/2) + 'r' + (edgePoint.alpha) + 's' + 0.9 + '').appendTo(arrowG[i])  //3 / 2               
            })
        }
    })
    subG.transform(Snap.matrix(matrix.a, matrix.b, matrix.c, matrix.d, 0, 0));
    const showWordBbox=showHintG.getTBox();
    subG.transform(subG.transform().local+' t'+[(matrix.e-showWordBbox.cx)/matrix.a,(matrix.f-showWordBbox.cy)/matrix.a])

    const handG = canvas.g();
    let myPath = animateActG.path('').attr(pathAttr);
    const animateTime = time ? time : len * 10;
    let handImg;
    let point;
    let t = 0;
    if (hand) {
        point = Snap.path.getPointAtLength(scaleApplyPath, 0);
        handImg = handImageIcon({'canvas':handG}).use().transform('t' + [point.x, point.y]).appendTo(animateActG).attr({
                'pointerEvents': 'none',
                'opacity': 0
            });
        t = 300;
    }

    this.g = canvas;
    this.animateEl = subG;
    //start
    this.start = function () {
        canvas.attr('pointer-events', 'none')
        if (hand) handImg.attr('opacity', 1);
        setTimeout(function () {
            Snap.animate(0, len, function (val) {
                if (hand) {
                    point = Snap.path.getPointAtLength(scaleApplyPath, val);
                    handImg.transform('t' + [point.x, point.y]);
                }
                myPath.attr({
                    'd': Snap.path.getSubpath(scaleApplyPath, 0, val),
                    'strokeWidth': pathAttr.strokeWidth,
                });
                if(val === len) whiteG.attr('opacity',0); //버그 방지를 위해 보여지는 방법 수정
            }, animateTime, easing, function () {
                myPath.attr('opacity',0); //버그 방지를 위해 보여지는 방법 수정
                if (hand) handImg.remove();
                callback();
            });
        }, t);
    }
    return this;
}


export const K_partAnimate = function ({
    canvas,
    cx,
    cy,
    scale,
    text,
    animateIndex,
    bgInfo,
    shadowHint = true,
    pathAttr,
    guideAttr,
    callback = function () {},
}) {
    pathAttr = {
        'class': 'fno s04',
        // 'strokeWidth': 13,
        'strokeWidth': 8,
        'strokeLinejoin': 'miter', 
        'strokeLinecap': 'butt', //butt, round, square
        'pointerEvents': 'none',
        ... pathAttr
    }
    const g = canvas.g();

    //배경정보 있을 때 배경 생성
    if(bgInfo){
        g.rect(0,0,bgInfo.width,bgInfo.height, (bgInfo.r || 0), (bgInfo.r || 0))
         .addClass('f'+(bgInfo.fillClassNum || '117')+' s'+(bgInfo.strokeClassNum || 'no'))
         .attr('opacity', bgInfo.opacity)
         .center();
    }
    const pathInfomation=pathWord({
        'canvas':g,
        'cx': 0,
        'cy': 0,
        'textScale':scale,
        'text':text
    });
    const pathStr=pathInfomation.totalPath[animateIndex];
    const guideStr=[];
    pathInfomation.guidePath[animateIndex].forEach(gp=>guideStr.push([gp]))
    g.selectAll('.path')[animateIndex].attr('opacity',0);
    // const bbox=g.selectAll('.path')[animateIndex].getTBox()
    const bbox=g.selectAll('.linePath')[animateIndex].getTBox();
    const animate = new K_simpleAnimate({
        'canvas': g,
        'pathStr':pathStr,
        'guide':guideStr,
        'isInnerGuide':false,
        'matrix': Snap.matrix(scale, 0, 0, scale, bbox.x+bbox.w/2, bbox.y+bbox.h/2),
        'strokeNoCutIndex':[], //임시 방편 -> 수정해야됨 210817
        'pathAttr': pathAttr,
        'guideAttr':guideAttr,
        'shadowHint':shadowHint,
        'callback': function () {
            console.log('animate-end');
            callback();
        }
    })
    // 전체 위치 조정
    g.transform('t'+[cx,cy]);

    //start
    this.start = function () {
        canvas.attr('pointer-events', 'none');
        animate.start();
    }
    return this;
}