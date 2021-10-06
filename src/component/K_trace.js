import Snap from 'sol-common/snap'
import {
    rect
} from 'sol-common/components'

import {
    K_dragElement
} from '../component';
import { pathWord } from './K_word';
import { dragElementImg } from './com_image';


export const simpleTrace = function ({
    canvas,
    shadowHint = true,
    bgInfo,
    pathStr,
    matrix=Snap.matrix(1, 0, 0, 1, 0, 0),
    visible,
    pathAttr,
    strokeNoCutIndex,
    callback
}) {
    pathAttr = {
        'class': 'fno s03',
        'strokeWidth': 13,
        'strokeLinejoin': 'miter',
        // 'strokeLinejoin': 'round', 
        'strokeLinecap': 'butt',
        'pointerEvents': 'none',
        ...pathAttr,
    };

    const g = canvas.g().attr('visibility', visible ? 'visible' : 'hidden');
    const backG=g.g();
    const elG=g.g();
    const subG = elG.g();
    const basicClass = 'f'+(bgInfo.fillClassNum.basic || '117') + ' s'+(bgInfo.strokeClassNum.basic || '01')
    const startClass = 'f'+(bgInfo.fillClassNum.start || '14') + ' s'+(bgInfo.strokeClassNum.start || '01')

    const traceBackground = new rect({
        'x': matrix.e,
        'y':matrix.f,
        'width': bgInfo.width || 300,
        'height': bgInfo.height || 300,
        'rx': 20,
        'ry': 20,
        'className': basicClass,
        'opacity': (bgInfo.opacity || bgInfo.opacity===0) ? bgInfo.opacity : 1,
        'center': true,
        'canvas': backG
    });
    const pathG = elG.g();
    const dragEl = pathG.g();
    const traceArr = [];
    dragElementImg()[0].use().transform('t0,0 s0.7 r90').appendTo(dragEl);
    const showWordG = subG.g();
    const endShowG=[];
    // 아래 깔린 테두리
    pathStr.forEach(function (path) {
        showWordG.path(path).addClass(pathAttr.class).attr({
            'strokeWidth': pathAttr.strokeWidth,
            'strokeLinejoin': pathAttr.strokeLinejoin,
            'strokeLinecap': pathAttr.strokeLinecap,
            'opacity': 1
        });
    })
    // 위에 깔린 흰 부분
    pathStr.forEach(function (path, i) {
        const ll = Snap.path.getTotalLength(path);
        const newP = strokeNoCutIndex.indexOf(i)!==-1 ? path : Snap.path.getSubpath(path,1.3,ll-1.3); // 1.3 = 13px기준 자를 길이
        endShowG[i]=subG.g();
        showWordG.path(Snap.path.map(newP, Snap.matrix(1, 0, 0, 1, 0, 0))).addClass('fno s14').attr({
            'strokeWidth': pathAttr.strokeWidth * 0.8,
            'strokeLinejoin': pathAttr.strokeLinejoin,
            'strokeLinecap': pathAttr.strokeLinecap,
            'opacity': 1
        });
        traceArr[i] = new K_dragElement({
            "el": dragEl,
            "pathStr": path,
            "pathAttr": pathAttr,
            "rotate": true,
            "callback": function (bool,endPath) {
                if (bool) {
                    if (i < traceArr.length - 1) {
                        traceArr[i + 1].start()
                    } else {
                        showWordG.attr('opacity', 0)
                        dragEl.remove();
                        if(shadowHint) endShowG.forEach(el=>el.appendTo(pathG)); //다시 원래 그룹으로 조정
                        pathG.addClass('blink');
                        setTimeout(function () {
                            pathG.removeClass('blink');
                            callback();
                        }, 1000);
                    }
                }
            }
        })
    });
    //마지막 전체 그룹 위치 조정
    elG.transform(Snap.matrix(matrix.a, matrix.b, matrix.c, matrix.d, 0, 0));
    const showWordBbox=showWordG.getTBox();
    elG.transform(elG.transform().local+' t'+[(matrix.e-showWordBbox.cx)/matrix.a,(matrix.f-showWordBbox.cy)/matrix.a])


    this.g = g;
    this.bbox=g.getTBox();

    this.start = function () {
        if (g.attr('visibility') === 'hidden') g.attr('visibility', 'visible')
        traceBackground.selectAll('rect')[0].removeClass(basicClass).addClass(startClass)
        // if(shadowHint) showArrowG[0].attr('opacity', 1)
        traceArr[0].start();
    }
    this.remove = function () {
        g.remove();
    }

    return this;
}






export const tempTrace = function ({
    canvas,
    shadowHint = true,
    cx,
    cy,
    scale,
    text,
    traceIndex,
    bgInfo,
    visible,
    pathAttr ,
    callback
}) {
    pathAttr = {
        'class': 'fno s001',
        'strokeWidth': 15 * scale,
        // 'strokeLinejoin': 'round',
        // 'strokeLinecap': 'round',
        'pointerEvents': 'none'
    }

    const g = canvas.g().attr('visibility', visible ? 'visible' : 'hidden');
    const backG=g.g();
    const elG = g.g()
    const subG = elG.g();
    const basicClass = 'f'+(bgInfo.fillClassNum.basic || '117') + ' s'+(bgInfo.strokeClassNum.basic || '01')
    const startClass = 'f'+(bgInfo.fillClassNum.start || '14') + ' s'+(bgInfo.strokeClassNum.start || '01')

    const traceBackground = new rect({
        'x': 0,
        'y': 0,
        'width': bgInfo.width || 300,
        'height': bgInfo.height || 300,
        'rx': 20,
        'ry': 20,
        'className': basicClass,
        'opacity': 1,
        'center': true,
        'canvas': backG
    });

    const pathInfomation=pathWord({
        'canvas':backG,
        'cx': 0,
        'cy': 0,
        'textScale':scale,
        'text':text
    });
    backG.selectAll('.path')[traceIndex].attr('opacity',0.2);
    const pathStr=pathInfomation.totalPath[traceIndex];
    const pathG = elG.g();
    const dragEl = pathG.g();
    const traceArr = [];
    const edge = elG.polygon(0, 0, -8, 4, 0, 8).addClass('sno f02').toDefs();
    dragEl.circle(0, 0, pathAttr.strokeWidth/2).addClass('f02');
    dragEl.text(0, 0, '1').attr({
        'class': 'orderNum',
        'fontSize':pathAttr.strokeWidth-4
    }).addClass('ffng f14 s14').center();
    // const showWordG = subG.g();
    const showArrowG = [];
    const endShowG=[];

    // console.log(pathInfomation.totalPath,showWordBbox);
    pathStr.forEach(function (path, i) {
        const firstPath=pathStr[0];
        const yGap=firstPath.split(' ')[0].split(',')[1]/2 * scale; //기본 패스의 높이의 절반에 스케일을 곱한 값
       console.log(Snap.path.map(path, Snap.matrix(scale, 0, 0, scale,0,0))[0][2]/2,yGap);
        // showArrowG[i] = pathInfomation.g.g().attr('opacity', 0)
        showArrowG[i] = subG.g().attr('opacity', 0)
        // endShowG[i]=pathG.g().attr('class','aaa');
        endShowG[i]= subG.g();
        // const newPathStr = path;
        const newGuideP=Snap.path.map(path, Snap.matrix(scale, 0, 0, scale, 0, 0))
        // const newGuideP=Snap.path.map(path, Snap.matrix(scale, 0, 0, scale, showWordBbox.x, showWordBbox.y-yGap))
        const edgePoint = Snap.path.getPointAtLength(newGuideP, Snap.path.getTotalLength(newGuideP) - (2 * scale));//1 * 3 / 2 *scale
        showArrowG[i].path(newGuideP).addClass('fno s02').attr({
            'strokeWidth': 2,
            'strokeDasharray': '8 3'
        });
        edge.use().transform('t' + (edgePoint.x + 4) + ',' + (edgePoint.y - 4) + 'r' + (edgePoint.alpha) + 's' + 3/2 + '').appendTo(showArrowG[i]) //3/2
        
        traceArr[i] = new K_dragElement({
            "el": dragEl,
            "pathStr": path,
            "pathAttr": pathAttr,
            "rotate": false,
            "matrix":Snap.matrix(scale, 0, 0, scale, 0, 0),
            // "matrix":Snap.matrix(scale, 0, 0, scale, showWordBbox.x, showWordBbox.y-yGap),
            "callback": function (bool,endPath) {
                if (bool) {
                    showArrowG[i].attr('opacity', 0)
                    if (i < traceArr.length - 1) {
                        dragEl.selectAll('.orderNum')[0].node.textContent = (i + 2).toString()
                        console.log(endPath);
                        if(shadowHint) showArrowG[i + 1].attr('opacity', 1), endPath.appendTo(endShowG[i]); //화살표 힌트 있을 때 그룹 조정
                        // if(shadowHint) showArrowG[i + 1].attr('opacity', 1), endPath.appendTo(endShowG[i]); //화살표 힌트 있을 때 그룹 조정
                        traceArr[i + 1].start()
                    } else {
                        pathInfomation.g.attr('opacity', 0)
                        dragEl.remove();
                        if(shadowHint) endShowG.forEach(el=>el.appendTo(pathG)); //다시 원래 그룹으로 조정
                        pathG.addClass('blink');
                        setTimeout(function () {
                            pathG.removeClass('blink');
                            callback();
                        }, 1000);
                    }
                }
            }
        })
    });
    // 전체 위치 조정
    backG.transform('t'+[cx,cy]);
    const showWordBbox = pathInfomation.g.getTBox();
    elG.transform('t'+[(cx-showWordBbox.w/2),(cy-showWordBbox.h/2)])
    console.log(cx,cy,[showWordBbox.w,showWordBbox.h]);
    // elG.transform(elG.transform().local+' t'+[(cx-showWordBbox.w)/scale,(cy-showWordBbox.h)/scale])

    //마지막 전체 그룹 위치 조정
    // elG.transform(Snap.matrix(matrix.a, matrix.b, matrix.c, matrix.d, 0, 0));
    // const showWordBbox=showWordG.getTBox();
    // elG.transform(elG.transform().local+' t'+[(matrix.e-showWordBbox.cx)/matrix.a,(matrix.f-showWordBbox.cy)/matrix.a])


    this.g = g;
    this.bbox=g.getTBox();

    this.start = function () {
        if (g.attr('visibility') === 'hidden') g.attr('visibility', 'visible')
        traceBackground.selectAll('rect')[0].removeClass(basicClass).addClass(startClass)
        if(shadowHint) showArrowG[0].attr('opacity', 1)
        traceArr[0].start();
    }
    this.remove = function () {
        g.remove();
    }

    return this;
}