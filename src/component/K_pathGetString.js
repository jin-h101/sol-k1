import {
    SOL
} from "sol-common/util";
import Snap from 'sol-common/snap'
// import {
//     getPointAtEvent
// } from 'sol-common/util';

import {
    areaToBBox
} from "./com_area";
import { rectChangePath, getSVGPoint } from "./com_util";

const K_pathGetString = function ({
    area = [0, 0, 800, 500],
    rXY = 20,
    pathAttr = {
        'class': 'fno s01',
        'stroke-width': 5,
        'pointer-events': 'none'
    },
    startCheck,
    moveCheck,
    callback
}) {
    const g = SOL.SVG.g();
    const elG = g.g();
    const pathG = g.g();
    // let svgEl;
    let n = 0;
    let board;
    let myPathStr = [];
    let myPath = [];
    let areaBBox;
    let isStart = false;
    const isRectArea = Array.isArray(area);
    let rectPath;
    if (isRectArea && rXY===0) {
        board = elG.rect(area[0], area[1], area[2] - area[0], area[3] - area[1], rXY, rXY).addClass('f14 sno').attr({
            'opacity': 0
        });
        areaBBox = areaToBBox(area);
    } else {
        rectPath = isRectArea ? rectChangePath(area[0], area[1], area[2] - area[0], area[3] - area[1], rXY, rXY) : area
        board = elG.path(rectPath).addClass('f14 sno').attr({
            'opacity': 0
        });
    }
    // if (Array.isArray(area)) {
    //     board = elG.rect(area[0], area[1], area[2] - area[0], area[3] - area[1], rXY, rXY).addClass('f14 sno').attr({
    //         'opacity': 0
    //     });
    //     areaBBox = areaToBBox(area);
    // } else {
    //     board = elG.path(area).addClass('f14 sno').attr({
    //         'opacity':0
    //     });
    // }

    function start(x, y, e) {
        isStart = true;
        // if (_isMobile) e = x;
        e.preventDefault();
        if (startCheck) {
            startCheck(e);
        }
        myPathStr[n] = '';
        myPath[n] = pathG.path('').attr(pathAttr).addClass('penCp');
        console.log('start');
        drawPath('M', e);
        drawPath('L', e); //점만 찍었을 경우 표시가 되도록 수정 2018.12.18 Daniel
    }

    function move(x, y, dx, dy, e) {
        if (!isStart) return;
        // if (_isMobile) e = x;
        e.preventDefault();
        if (moveCheck) {
            moveCheck(e);
        }
        // console.log('move');
        drawPath('L', e);
    }

    function end() {
        if (!isStart) return;
        n += 1;
        // console.log('end',myPathStr,myPathStr.length);
        if (callback) {
            callback(myPathStr,pathG);
        }
        isStart = false;
    }

    function drawPath(status, e) {
        const {x,y} = getSVGPoint(e);
        if (isPointInside(x, y)) {
            myPathStr[n] = myPathStr[n] + status + x + ',' + y;
            if (myPathStr[n].charAt(0) !== 'M'){ 
                console.warn('M', myPathStr[n], '-----' , 'M'+myPathStr[n].slice(1)+myPathStr[n]); // 버그 경과 보기 위한 로그
                // return; 
                myPathStr[n]='M'+myPathStr[n].slice(1)+myPathStr[n]
            }// 패스 시작이 L 인 경우 앞에 M 만들어 주기 21.07.21 jin
            myPath[n].attr({
                'd': myPathStr[n]
            });
        }
        // const point = getPointAtEvent(e, svgEl);
        // if (isPointInside(point.x, point.y)) {
        //     myPathStr[n] = myPathStr[n] + status + point.x + ',' + point.y;
        //     if (myPathStr[n].charAt(0) !== 'M'){ 
        //         console.warn('M', myPathStr[n], '-----' , 'M'+myPathStr[n].slice(1)+myPathStr[n]); // 버그 경과 보기 위한 로그
        //         // return; 
        //         myPathStr[n]='M'+myPathStr[n].slice(1)+myPathStr[n]
        //     }// 패스 시작이 L 인 경우 앞에 M 만들어 주기 21.07.21 jin
        //     myPath[n].attr({
        //         'd': myPathStr[n]
        //     });
        // }
    }

    function isPointInside(x, y) {
        if (areaBBox) {
            return Snap.path.isPointInsideBBox(areaBBox, x, y);
        } else {
            return Snap.path.isPointInside(rectPath, x, y);
        }
    }

    board.addClass('penCp').drag(move, start, end);

    return g;
};

export default K_pathGetString;