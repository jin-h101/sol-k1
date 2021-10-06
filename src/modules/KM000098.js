import Snap from 'sol-common/snap'
import {
    tts, rect, makeWriteAnimation,
} from 'sol-common/components'

import {
    replaceWord,
    jamoList,
    K_richTextAuto,
    tempGuideLine,
    K_ok,
    wordMatchPath,
    pathList,
    pathReverse,
} from '../component';


// 애니메이션 + trace 모듈(낱자)
const KM000098 = async function ({
    canvas,
    info
}) {

    tempGuideLine(canvas) // 좌표선 삭제
    // const gg=canvas.g();
    // info.forEach((fff,i) => {
    //     new K_richTextAuto({
    //         'canvas': gg,
    //         'text': fff.text,
    //         'x': fff.cx,
    //         'y': fff.cy,
    //         'className': 'ffnp f'+ ('91'),
    //         'fontSize': fff.fontSize,
    //         'dy': 27,
    //         'lineCenter': true,
    //         'letterSpacing': i //추후 수정
    //     });
    // });
    const g=canvas.g();
    const text = '갑'
    const pathT=wordMatchPath(text,pathList);
    const scale = 3;
    console.log(pathT);
    let testA = [];
    let testB = [];
    pathT.pathImg.forEach((pathD,i) => {
        // testA=testA.concat(pathD)

        const css=['f04 sno','f02 sno','f03 sno'][i]
        console.log(pathD,css);
        pathD.forEach((pD)=>{
            g.path(pD).addClass(css).transform(Snap.matrix(scale,0,0,scale,100,100));
        })
    });

    pathT.path.forEach((pathD,i) => {
        // testB=testB.concat(pathD)
        const css=['fno s04','fno s02','fno s03'][i]
        pathD.forEach(pD=>{
            g.path(pD).addClass(css).transform(Snap.matrix(scale,0,0,scale,500,100)).attr('strokeWidth',13);
            // g.path(pD).addClass('fno s01').transform(Snap.matrix(scale,0,0,scale,500,100))
        })
        pathD.forEach(pD=>{
            g.path(pD).addClass('fno s01').transform(Snap.matrix(scale,0,0,scale,100,100));
        })
    });
    console.log(testA.length);
    console.log(testB.length);
    // makeWriteAnimation({
    //     fillPaths:testA, strokePaths:testB, canvas:g, speed:0.01, x:200, y:100, scale:1
    // })
}

export default KM000098;
