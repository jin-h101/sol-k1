import {
    rect
} from 'sol-common/components'
import {
    K_dragElement
} from '../component';
import Snap from 'sol-common/snap'
import { pathWord } from '../component/K_word';


const K_traceCopy = function ({
    canvas,
    shadowHint = true,
    cx,
    cy,
    scale,
    text,
    traceIndex,
    bgInfo,
    // pathStr,
    // matrix=Snap.matrix(1, 0, 0, 1, 0, 0),
    visible,
    pathAttr ,
    callback
}) {
    pathAttr = {
        'class': 'fno s001',
        'strokeWidth': 15 * scale,
        'strokeLinejoin': 'round',
        'strokeLinecap': 'round',
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
        const yGap=firstPath.split(' ')[0].split(',')[1]/2 * scale; //?????? ????????? ????????? ????????? ???????????? ?????? ???
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
                        if(shadowHint) showArrowG[i + 1].attr('opacity', 1), endPath.appendTo(endShowG[i]); //????????? ?????? ?????? ??? ?????? ??????
                        // if(shadowHint) showArrowG[i + 1].attr('opacity', 1), endPath.appendTo(endShowG[i]); //????????? ?????? ?????? ??? ?????? ??????
                        traceArr[i + 1].start()
                    } else {
                        pathInfomation.g.attr('opacity', 0)
                        dragEl.remove();
                        if(shadowHint) endShowG.forEach(el=>el.appendTo(pathG)); //?????? ?????? ???????????? ??????
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
    // ?????? ?????? ??????
    backG.transform('t'+[cx,cy]);
    const showWordBbox = pathInfomation.g.getTBox();
    elG.transform('t'+[(cx-showWordBbox.w/2),(cy-showWordBbox.h/2)])
    console.log(cx,cy,[showWordBbox.w,showWordBbox.h]);
    // elG.transform(elG.transform().local+' t'+[(cx-showWordBbox.w)/scale,(cy-showWordBbox.h)/scale])

    //????????? ?????? ?????? ?????? ??????
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

export default K_traceCopy;