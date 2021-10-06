import Snap from 'sol-common/snap';

//path 뒤집기
export const pathReverse = (pathStr) => {
    const pathArr = Snap.path.toCubic(Snap.path.toAbsolute(pathStr));
    const reversedPathArr = [];
    let reversedPath = '';
    for (let i = 0; i < pathArr.length; i++) {
        const term = pathArr[i][0];
        if (term === "C") {
            reversedPathArr.push(pathArr[i][5] + ',' + pathArr[i][6] + ' C' + pathArr[i][3] + ',' + pathArr[i][4] + ' ' + pathArr[i][1] + ',' + pathArr[i][2] + ' ' + reversedPath);
        } else if (term === "M") {
            reversedPathArr.push(pathArr[i][1] + ',' + pathArr[i][2] + ' M' + reversedPath);
        }
    }
    reversedPathArr.reverse();
    reversedPathArr.forEach(function (el) {
        reversedPath += el;
    });
    if (reversedPath.charAt(reversedPath.length - 1) === 'M') {
        reversedPath = reversedPath.substring(0, reversedPath.length - 1);
    }
    return 'M' + reversedPath;
}

// 격자선
export const tempGuideLine = (g) => {
    g.rect(0, 0, 800, 500).addClass('fno s04')
    //세로
    for (let t = 0; t < 80; t++) {
        let c = 'fno s111'
        if (t % 10 === 0) c = 'fno s01'
        g.line(0 + t * 10, 0, 0 + t * 10, 500).addClass(c).attr('opacity', 0.5)
    }
    //가로
    for (let z = 0; z < 50; z++) {
        let cc = 'fno s111'
        if (z % 10 === 0) cc = 'fno s01'
        g.line(0, 0 + z * 10, 800, 0 + z * 10).addClass(cc).attr('opacity', 0.5)
    }
}

// 부드러운 path
export const pathSmooth = (p,gap) => {
    if (Array.isArray(p) && Array.isArray(p[0])) {
        return _pointsToSmoothPath(p);
    }
    var pathLen = Snap.path.getTotalLength(p);
    if (pathLen === 0) return p;
    var len = gap || 40;
    var count = Math.floor(pathLen / len);
    var points = [];
    for (var i = 0; i < count + 1; i++) {
        var pt = Snap.path.getPointAtLength(p, (i < count ? i * len : pathLen));
        points[i] = [pt.x, pt.y];
    }
    return _pointsToSmoothPath(points);

    function _pointsToSmoothPath(points) {
        var smoothPath = '';
        for (var k = 0; k < points.length; k++) {
            if (k === 0) {
                smoothPath = 'M' + points[k];
            } else if (k > 1) {
                smoothPath = smoothPath + _bezierCommand(points[k - 1], k - 1, points);
            }
            if (k !== 0 && k === points.length - 1) {
                smoothPath = smoothPath + _bezierCommand(points[k], k, points);
            }
        }
        return smoothPath;
    }

    function _lineInfo(pointA, pointB) {
        var lengthX = pointB[0] - pointA[0];
        var lengthY = pointB[1] - pointA[1];
        return {
            length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
            angle: Math.atan2(lengthY, lengthX)
        };
    }

    function _controlPoint(current, previous, next, reverse) {
        var p = previous || current;
        var n = next || current;
        var smoothing = 0.2;
        var o = _lineInfo(p, n);
        var angle = o.angle + (reverse ? Math.PI : 0);
        var length = o.length * smoothing;
        var x = current[0] + Math.cos(angle) * length;
        var y = current[1] + Math.sin(angle) * length;
        return [x, y];
    }

    function _bezierCommand(point, i, a) {
        return 'C' + _controlPoint(a[i - 1], a[i - 2], point) + ' ' + _controlPoint(point, a[i - 1], a[i + 1], true) + ' ' + [point[0], point[1]];
    }
}


//rect를 path로 전환
export const rectChangePath = (x, y, w, h, rx, ry) => {
    var width = w;
    var height = h;
    var a = ['', '', '', ''];
    var offsetX = 0;
    if (rx) {
        var roundx = (rx <= w / 2 ? rx : w / 2);
        var roundy = (rx <= h / 2 ? rx : h / 2);
        width = w - roundx * 2;
        height = h - roundy * 2;
        offsetX = roundx;
        if (ry) {
            roundy = (ry <= h / 2 ? ry : h / 2);
            height = h - roundy * 2;
        }
        a = [
            'a' + [roundx, roundy] + ' 0 0 1 ' + [roundx, roundy],
            'a' + [roundx, roundy] + ' 0 0 1 ' + [-roundx, roundy],
            'a' + [roundx, roundy] + ' 0 0 1 ' + [-roundx, -roundy],
            'a' + [roundx, roundy] + ' 0 0 1 ' + [roundx, -roundy],
        ];
    }
    return 'M' + [x + offsetX, y] +
        'h' + width + a[0] +
        'v' + height + a[1] +
        'h' + (-width) + a[2] +
        'v' + (-height) + a[3] +
        'z';
}

// 재 생성 path
export const transformPath = ({
    pathStr,scale,x,y
}) => {
    const pathArr=Snap.path.map(pathStr, Snap.matrix(scale, 0, 0, scale, x, y))
    let newPathStr='';
    pathArr.forEach(pd=>{
        pd.forEach((d,i)=>{
            newPathStr = newPathStr + d + (i%2===1 ? ',':' ')
        })
        newPathStr = newPathStr + ' '
    })
    return newPathStr
}

export const classMatchingColor = (cl) => {
    let color;
    switch (cl){
        case '0006':
            color='#5BD240';
            break;
        case '0007':
            color='#9AE07D';
            break;
        case '0008':
            color='#CCCCCC';
            break;
        default:
            color=cl;
            break;
    }
    return color;
}

// 숫자 값일 때 0도 값으로 넣어주기 위해 만든 함수 
export const numberDefault = (val,defaultVal) => (Number.isInteger(val) ? val : defaultVal)

export const getSVGPoint = event => {
    const svg = document.querySelector('#frame2d');
    const pt = svg.createSVGPoint();
    pt.x = event.clientX;
    pt.y = event.clientY;
    return pt.matrixTransform(svg.getScreenCTM().inverse());
};

export const multiPointerControl = ({elements,state}) => elements.forEach(el=>el.attr('pointerEvents',state));

// 숫자가 소수인지 확인
const isDecimal = (number) => {
    return number.toString().split('.').length === 2;
}
//소수 몇 자리인지 구하기
const getDecimalPlace = (number) => {
    return isDecimal(number) ? number.toString().split('.')[1].length : 0;
}
//fix Deciaml
const fixDecimal = (decimal) => {
    if (getDecimalPlace(decimal) > 10) decimal = (Math.round(decimal * 1e10)) / 1e10;
    return decimal;
}
//좌표 구하기
export const getCoordinate = (length, angle) => {
    return [fixDecimal(length * Snap.cos(angle)), fixDecimal(length * Snap.sin(angle))];
}

// export const makeGap = ({modalType}) => {
//     let gap;
//     switch (modalType){
//         case 'convert':
//             gap = 40;
//             break;
//         case 'none':
//             gap = 0;
//             break;
//         default:
//             gap = 0;
//             break;
//     }
//     return gap;
// }
