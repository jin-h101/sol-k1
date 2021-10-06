import { image } from 'sol-common';
import { K_richTextAuto } from './K_text';
import { makeShadow, SOL, alignGroup } from 'sol-common/util';
import { classMatchingColor, numberDefault, getCoordinate } from './com_util';

export const makeRegularPolygon = function ({
    canvas,
    cx,
    cy,
    length,
    sideNum,
    polygonOffset = { x: 0, y: 0 },
    shapeStrokeWidth = 1,
    shapeOpacity = 1,
    shapeFillClassNum = '14',
    shapeStrokeClassNum = '117'
}) {
    const g = canvas.g();
    let figure;
    const angles = [];
    const sides = [];
    const coordinates = [];
    let angleSum = 0;
    const info = {};
    for (var l = 0; l < sideNum; l++) {
        sides[l] = length;
        angles[l] = Math.round((180 * (sideNum - 2)) / sideNum);
    }

    coordinates.push([0, 0], [sides[0], 0]);
    for (var i = 1; i < sides.length - 1; i++) {
        angleSum = angleSum + 180 - angles[i];
        var nextCoordinate = getCoordinate(sides[i], angleSum);
        coordinates.push([coordinates[i][0] + nextCoordinate[0], coordinates[i][1] - nextCoordinate[1]]);
    }

    var pathStr = 'M' + coordinates[0][0] + ',' + coordinates[0][1];
    for (var j = 1; j < coordinates.length; j++) {
        pathStr += ' L' + coordinates[j][0] + ',' + coordinates[j][1];
    }
    pathStr += 'Z';

    figure = g
        .path(pathStr)
        .addClass('f' + shapeFillClassNum + ' s' + shapeStrokeClassNum)
        .attr({
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            opacity: shapeOpacity,
            'stroke-width': shapeStrokeWidth
        });
    alignGroup({
        g: g,
        x: cx + polygonOffset.x,
        y: cy + polygonOffset.y
    });
    info.figure = figure;
    info.path = pathStr;
    info.sides = sides;
    info.angles = angles;
    info.coordinates = coordinates;

    return g.data('info', info);
};

//배경(rect 일 때)
const backgroundRect = function (g, info) {
    const className = 'f' + (info.shapeFillClassNum || '0001') + ' s' + (info.shapeStrokeClassNum || 'no');
    const strokeWidth = info.shapeStrokeWidth || 4;
    if (info.shadowRect && info.shadowRect.fillClassNum) {
        const { offsetTop = 0, offsetBottom = 3, offsetLeft = 0, offsetRight = 3 } = info.shadowRect;
        g
        .rect(
            info.cx + (offsetRight / 2) - (offsetLeft / 2),
            info.cy + (offsetBottom / 2) - (offsetTop / 2),
            (info.width || 160 * info.textScale) + offsetRight + offsetLeft,
            (info.height || 160 * info.textScale) + offsetBottom + offsetTop,
            info.rXY || 0,
            info.rXY || 0
        )
        .addClass(`f${info.shadowRect.fillClassNum}`).center();
    }

    const rt = g
        .rect(
            info.cx,
            info.cy,
            info.width || 160 * info.textScale,
            info.height || 160 * info.textScale,
            info.rXY || 0,
            info.rXY || 0
        )
        .addClass(className)
        .attr({
            opacity: info.shapeOpacity === undefined ? 1 : info.shapeOpacity,
            strokeWidth: strokeWidth
        })
        .center();
    if (info.shapeIsDashArray) {
        const dashArrayVal = strokeWidth / 3 + ',' + (strokeWidth * 5) / 3;
        rt.attr({
            strokeDasharray: info.strokeDasharray || dashArrayVal,
            strokeLinecap: 'round'
        });
    }
    g.rXY = info.rXY || 0;
    return g;
};

//배경(circle 일 때)
const backgroundCircle = function (g, info) {
    let opacity = info.shapeOpacity || info.shapeOpacity === 0 ? info.shapeOpacity : 1;
    if (info.isNoBack) opacity = 0; // 배경 없을 때
    const className = 'f' + (info.shapeFillClassNum || '0001') + ' s' + (info.shapeStrokeClassNum || 'no');
    const strokeWidth = info.shapeStrokeWidth || 1;
    const cir = g
        .circle(info.cx, info.cy, info.r || 80 * info.textScale)
        .addClass(className)
        .attr({
            opacity: opacity,
            strokeWidth: strokeWidth
        })
        .center();
    if (info.shapeIsDashArray || info.strokeDasharray) {
        const dashArrayVal = strokeWidth / 3 + ',' + (strokeWidth * 5) / 3;
        cir.attr({
            strokeDasharray: info.strokeDasharray || dashArrayVal,
            strokeLinecap: 'round'
        });
    }
    g.rXY = info.r / 2;
    return g;
};

//배경(image 일 때)
const backgroundImage = function (g, info) {
    const url = info.ImgUrl || info.imgUrl;
    const scale = info.ImgScale || info.imgScale || 1;
    image({
        canvas: g,
        x: info.cx,
        y: info.cy,
        img: {
            url: url,
            scale: scale,
            ...info
        },
        center: true
    });
    if (info.rotate) g.transform('r' + info.rotate);
    if (info.shapeOpacity) {
        g.attr({
            opacity: info.shapeOpacity
        });
    }
    g.rXY = (info.rx || 0) * scale;
    return g;
};

const makeSimpleText = (g, info) => {
    const fixX = info.x || info.cx;
    const fixY = info.y || info.cy;
    const isCenter = info.center || (info.cx && info.cy);
    const font = info.fontType || 'ffng';
    new K_richTextAuto({
        canvas: g,
        text: info.text,
        x: fixX,
        y: fixY,
        className: font + ' f' + (info.classNum || '000'), //선택
        fontSize: info.fontSize || 20, //선택
        dy: info.dy || 45, //선택
        textLength: info.textLength || (800 - fixX), //선택
        isBold: info.bold || false,
        center: isCenter,
        lineCenter: info.lineCenter || false,
        options: info.options
    });
    return g;
};
const backgroundLine = (g, info) => {
    const className = 'fno s' + (info.shapeStrokeClassNum || '0002');
    const strokeWidth = info.shapeStrokeWidth || 4;
    const li = g
        .line(info.x, info.y, info.x2, info.y2)
        .addClass(className)
        .attr({
            opacity: info.shapeOpacity || 1,
            strokeWidth: strokeWidth
        });
    if (info.shapeIsDashArray || info.strokeDasharray) {
        const dashArrayVal = strokeWidth / 3 + ',' + (strokeWidth * 5) / 3;
        li.attr({
            strokeDasharray: info.strokeDasharray || dashArrayVal
        });
    }
    return g;
};

export const K_makeBackground = function ({ group, el, isNoBackground = false }) {
    const cx = el.background.cx || el.cx || 0;
    const cy = el.background.cy || el.cy || 0;
    const isBackgroundObject = el.background && el.background.type; //메타에 backgruond 관련 메타가 있는지
    const backGroundCondition =
        isBackgroundObject &&
        (el.background.type === 'rect' || el.background.type === 'circle' || el.background.type === 'image'); //3가지 배경 유형인지
    let shape;
    if (backGroundCondition) {
        //배경 존재 시
        const type = el.background.type || 'none';
        const backInfo = {
            cx: cx,
            cy: cy,
            textScale: el.scale,
            ...el.background
        };
        if (type === 'rect') shape = backgroundRect(group.g(), backInfo);
        else if (type === 'circle') shape = backgroundCircle(group.g(), backInfo);
        else if (type === 'image') shape = backgroundImage(group, backInfo);
        if (shape && backInfo.shadowClassNum) {
            const btnShadow = makeShadow({
                dx: numberDefault(backInfo.shadowDx, 3),
                dy: numberDefault(backInfo.shadowDy, 3),
                blur: numberDefault(backInfo.shadowBlur, 2),
                color: classMatchingColor(backInfo.shadowClassNum),
                opacity: backInfo.shadowOpacity || 0.3,
                g: SOL.SVG
            });
            shape.attr('filter', btnShadow);
        }
    } else if (isNoBackground) {
        // 배경 없을 시 (흰 동그라미 깔림)
        backgroundCircle(group.g(), {
            x: cx,
            y: cy,
            textScale: el.scale,
            isNoBack: isNoBackground,
            shapeFillClassNum: '14',
            shapeStrokeClassNum: 'no'
        });
    }

    return group;
};

export const makeSpeechBubble = function (g, info) {
    const {
        width = 200,
        height = 150,
        rXY = 20,
        shapeStrokeWidth = 1,
        shapeOpacity = 1,
        shapeFillClassNum = '14',
        shapeStrokeClassNum = '0008',
        type = 'b'
    } = info;
    const { edgeX = type === 'b' || type === 't' ? 10 : 20, edgeY = type === 'b' || type === 't' ? 15 : 12 } = info;
    let pathStr;
    switch (type) {
        case 'b':
            pathStr = `M0, ${rXY} Q0, 0 ${rXY}, 0 L${width - rXY}, 0 Q${width}, 0 ${width}, ${rXY} 
                    L${width}, ${height - rXY} Q${width}, ${height} ${width - rXY}, ${height}
                    L${width / 2 + edgeX}, ${height} L${width / 2}, ${height + edgeY} L${width / 2 - edgeX}, ${height} 
                    L${rXY}, ${height} Q0, ${height} 0, ${height - rXY}z`;
            break;
        case 't':
            pathStr = `M0, ${rXY + edgeY} Q0, ${edgeY} ${rXY}, ${edgeY} L${width / 2 - edgeX}, ${edgeY} L${
                width / 2
            }, 0 L${width / 2 + edgeX}, ${edgeY}
                    L${width - rXY}, ${edgeY} Q${width}, ${edgeY} ${width}, ${rXY + edgeY}
                    L${width}, ${height - rXY} Q${width}, ${height} ${width - rXY}, ${height}
                    L${rXY}, ${height} Q0, ${height} 0, ${height - rXY}z`;
            break;
        case 'r':
            pathStr = `M0, ${rXY} Q0, 0 ${rXY}, 0 L${width - rXY}, 0 Q${width}, 0 ${width}, ${rXY} 
                    L${width}, ${height / 2 - edgeY} L${width + edgeX}, ${height / 2} L${width}, ${height / 2 + edgeY}
                    L${width}, ${height - rXY} Q${width}, ${height} ${width - rXY}, ${height}
                    L${rXY}, ${height} Q0, ${height} 0, ${height - rXY}z`;
            break;
        case 'l':
            pathStr = `M${edgeX}, ${rXY} Q${edgeX}, 0 ${rXY + edgeX}, 0 L${width + edgeX - rXY}, 0 Q${
                width + edgeX
            }, 0 ${width + edgeX}, ${rXY} 
                    L${width + edgeX}, ${height - rXY} Q${width + edgeX}, ${height} ${width + edgeX - rXY}, ${height}
                    L${rXY + edgeX}, ${height} Q${edgeX}, ${height} ${edgeX}, ${height - rXY}
                    L${edgeX}, ${height / 2 + edgeY} L0, ${height / 2} L${edgeX}, ${height / 2 - edgeY}z`;
            break;
        default:
            break;
    }

    const rt = g
        .path(pathStr)
        .addClass(`f${shapeFillClassNum} s${shapeStrokeClassNum}`)
        .attr({
            opacity: shapeOpacity,
            strokeWidth: shapeStrokeWidth
        })
        .transform('t' + [info.cx || 0, info.cy || 0])
        .center();
    if (info.shapeIsDashArray) {
        const dashArrayVal = shapeStrokeWidth / 3 + ',' + (shapeStrokeWidth * 5) / 3;
        rt.attr({
            strokeDasharray: info.strokeDasharray || dashArrayVal,
            strokeLinecap: 'round'
        });
    }

    return g;
};

export const createElement = function ({ type, canvas, meta }) {
    const g = canvas.g();
    let shape;
    switch (type) {
        case 'none':
            break;
        case 'rect':
            shape = backgroundRect(g, meta);
            break;
        case 'circle':
            shape = backgroundCircle(g, meta);
            break;
        case 'image':
            shape = backgroundImage(g, meta);
            break;
        case 'text':
            shape = makeSimpleText(g, meta);
            break;
        case 'line':
            shape = backgroundLine(g, meta);
            break;
        case 'regularPolygon':
            shape = makeRegularPolygon({ canvas: g, polygonOffset: { x: 0, y: 0 }, ...meta });
            break;
        case 'speechBubble':
            shape = makeSpeechBubble(g, meta);
            break;
        default:
            break;
    }

    if (shape && meta.shadowClassNum) {
        const btnShadow = makeShadow({
            dx: numberDefault(meta.shadowDx, 3),
            dy: numberDefault(meta.shadowDy, 3),
            blur: numberDefault(meta.shadowBlur, 2),
            color: classMatchingColor(meta.shadowClassNum),
            opacity: meta.shadowOpacity || 0.3,
            g: SOL.SVG
        });
        shape.attr('filter', btnShadow);
        shape._shadow = btnShadow;
    }
    return shape;
};
