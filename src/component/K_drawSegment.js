import Snap from 'sol-common/snap'
import {getPointAtEvent} from 'sol-common/util';

import {areaScale,areaToRect} from "./com_area";
const drawSegment = function ({
    canvas,
    bboxs,
    dotPoints,
    strokeColor=['01', '04'],
    strokeWidth=4,
    strokeDashArray=true,
    isLineColorRemind=false,
    startCallback,
    drawContinue,
    connectCallback,
    endCallback,
    preventCheck
}){
    const g = canvas.g();
    let startDot;
    let endDot;
    if (!dotPoints) {
        dotPoints = bboxs.map(function (el) {
            return (el ? [el.cx, el.cy] : undefined);
        });
    }
    const touchArea = getTouchArea(bboxs, 1.2);
    const connectedDots = [];
    const segments = [];
    let dotCount = 0;
    let curConnect = false;
    const pad = areaToRect(touchArea, g).addClass('f04').attr({
        opacity: 0
    }).addClass('cp').drag(move, start, end);
    const segment = g.line(0, 0, 0, 0).addClass('s' + strokeColor[0]).attr({
        'stroke-width': strokeWidth,
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-dasharray': strokeDashArray? strokeWidth + ' ' + (strokeWidth * 2): 'none',
        'pointer-events': 'none',
        'visibility': 'hidden'
    });
    let isContentInPoint = false; //21.01.14 jin

    function start(x, y, e) {
        isContentInPoint = true; //21.01.14 jin
        document.getElementById('frame2d').addEventListener('mouseleave',end); //21.02.17 jin 콘텐츠 밖으로 마우스 커서가 나갈 때 end 호출
        if (startCallback) startCallback();
        const pt = getPointAtEvent(e);
        const xy = [pt.x, pt.y];

        for (let i = 0; i < bboxs.length; i++) {
            if (bboxs[i] && Snap.path.isPointInsideBBox(bboxs[i], xy[0], xy[1])) {
                startDot = i;
                endDot = i;
                dotCount = 1;
                curConnect = false;
                changeSegment();
                break;
            }
        }
    }

    function move(x, y, dx, dy, e) {
        if (isContentInPoint) { //21.01.14 jin   	
            const pt = getPointAtEvent(e);
            const xy = [pt.x, pt.y];
            const i = insideBBoxCheck(xy);
            if (i !== undefined && startDot !== i && !isConnected(startDot, i) && preventCh(startDot, i)) {
                if (dotCount === 0) {
                    startDot = i;
                    endDot = i;
                    dotCount = 1;
                    curConnect = false;
                    changeSegment();
                } else {
                    endDot = i;
                    curConnect = true;
                    changeSegment();
                    segment.attr({
                        'class': 's' + strokeColor[isLineColorRemind?0:1],
                        'stroke-dasharray': 'none'
                    });
                    if (drawContinue) {
                        connectedDots.push([startDot, endDot]);
                        segments.push(segment.clone());
                        startDot = i;
                        changeSegment();
                        if (connectCallback) connectCallback([startDot, endDot], segments[segments.length - 1]);
                    }
                }
            } else {
                curConnect = false;
                segment.attr({
                    'class': 's' + strokeColor[0],
                    'stroke-dasharray': strokeDashArray ? strokeWidth + ' ' + (strokeWidth * 2) : 'none',
                });
                changeSegment(xy);
            }
        }
    }

    function insideBBoxCheck(xy) {
        for (let i = 0; i < bboxs.length; i++) {
            if (bboxs[i] && Snap.path.isPointInsideBBox(bboxs[i], xy[0], xy[1])) {
                return i;
            }
        }
        return undefined;
    }

    function end() {
        if (isContentInPoint) { //21.01.14 jin
            document.getElementById('frame2d').removeEventListener('mouseleave',end); //21.02.17 jin
            if (!drawContinue && curConnect) {
                connectedDots.push([startDot, endDot]);
                segments.push(segment.clone());
            }
            if (endCallback) endCallback(connectedDots, segments);

            startDot = undefined;
            endDot = undefined;
            dotCount = 0;
            curConnect = false;

            changeSegment();
            isContentInPoint = false; //21.01.14 jin
        }
    }

    function preventCh(sD, index) {
        if (!preventCheck) return true;
        if (preventCheck === 'oneWay' && connectedDots.length > 0) {
            for (let j = 0; j < connectedDots.length; j++) {
                for (let k = 0; k < 2; k++) {
                    if (connectedDots[j][k] === index) {
                        return false;
                    }
                }
            }
            return true;
        }
        for (let i = 0; i < preventCheck.length; i++) {
            // 기존 왼쪽 선택 요소가 1개인 경우
            if (
                preventCheck[0].length <= 1 &&
                preventCheck[i].indexOf(sD) !== -1 &&
                preventCheck[i].indexOf(index) !== -1
            ) {
                return false;
            } else if (
                // 왼쪽 선택 요소가 2개 이상인 경우
                (sD < index &&
                preventCheck[i].includes(sD) &&
                preventCheck[i].includes(index + preventCheck[0].length)) ||
                (sD > index &&
                preventCheck[i].includes(sD + preventCheck[0].length) &&
                preventCheck[i].includes(index))
            ) {
                return false;
            }
        }
        return true;
    }

    function changeSegment(eP) {
        if (startDot === undefined) {
            segment.attr({
                'x1': 0,
                'y1': 0,
                'x2': 0,
                'y2': 0,
                'visibility': 'hidden'
            });
            return;
        }
        let x2;
        let y2;
        if (eP) {
            x2 = eP[0];
            y2 = eP[1];
        } else {
            x2 = dotPoints[endDot][0];
            y2 = dotPoints[endDot][1];
        }
        segment.attr({
            'x1': dotPoints[startDot][0],
            'y1': dotPoints[startDot][1],
            'x2': x2,
            'y2': y2,
            'visibility': 'inherit'
        });
    }

    function isConnected(sD, eD) {
        for (let i = 0; i < connectedDots.length; i++) {
            if ((connectedDots[i][0] === sD && connectedDots[i][1] === eD) || (connectedDots[i][0] === eD && connectedDots[i][1] === sD)) {
                return true;
            }
        }
        return false;
    }

    function getTouchArea(bboxs, scale) {
        let minX = 800;
        let maxX = 0;
        let minY = 500;
        let maxY = 0;
        for (let i = 0; i < bboxs.length; i++) {
            if (bboxs[i]) {
                minX = Math.min(minX, bboxs[i].x);
                maxX = Math.max(maxX, bboxs[i].x2);
                minY = Math.min(minY, bboxs[i].y);
                maxY = Math.max(maxY, bboxs[i].y2);
            }
        }
        return areaScale([minX, minY, maxX, maxY], scale);
    }
    return g;
}

export default drawSegment;