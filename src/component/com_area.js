import { SOL } from "sol-common/util";

export const areaToRect = (area, g) => {
    let paper = SOL.SVG;
    if (g) paper = g;
    const areaRect = paper.rect(area[0], area[1], area[2] - area[0], area[3] - area[1]);
    if (!g) {
        areaRect.addClass('fno s02').attr({
            'stroke-width': 3
        });
    }
    return areaRect;
}

export const areaToBBox = (area) => {
    return {
        x: area[0],
        y: area[1],
        x2: area[2],
        y2: area[3],
        cx: (area[0] + area[2]) / 2,
        cy: (area[1] + area[3]) / 2,
        width: area[2] - area[0],
        w: area[2] - area[0],
        height: area[3] - area[1],
        h: area[3] - area[1]
    };
}

export const areaFromBBox = (bbox) => {
    return [bbox.x, bbox.y, bbox.x2, bbox.y2];
}

export const areaScale = (area, scaleX, scaleY) => {
    const width = area[2] - area[0];
    const height = area[3] - area[1];
    const moveX = (width * scaleX - width) / 2;
    const moveY = (height * (scaleY || scaleX) - height) / 2;
    return [area[0] - moveX, area[1] - moveY, area[2] + moveX, area[3] + moveY];
}

export const areaMove = (area, moveX, moveY) => {
    return [area[0] + moveX, area[1] + moveY, area[2] + moveX, area[3] + moveY];
}

export const areaSplit = (area, splitX, splitY) => {
    const width = (area[2] - area[0]) / splitX;
    const height = (area[3] - area[1]) / splitY;
    const xArray = [];
    const yArray = [];
    const splitArea = [];
    for (let i = 0; i < splitX + 1; i++) {
        xArray[i] = area[0] + i * width;
    }
    for (let j = 0; j < splitY + 1; j++) {
        yArray[j] = area[1] + j * height;
    }
    for (let k = 0; k < yArray.length - 1; k++) {
        for (let l = 0; l < xArray.length - 1; l++) {
            splitArea[k * (xArray.length - 1) + l] = [xArray[l], yArray[k], xArray[l + 1], yArray[k + 1]];
        }
    }
    return splitArea;
}