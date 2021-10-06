//KM000008 백업

import Snap from 'sol-common/snap'

import {
    pathList,
    wordMatchPath,
    pathReverse
} from '../component';

import {
    Howler
} from 'howler';

// write 모듈(자,모음)
const KM000008 = async function ({
    canvas,
    direction

}) {
    console.log(pathReverse("M71.5,77c0-1.3,0-15.5,0-15.5H15"));

    const g = canvas.g();
    const ttsG = g.g();
  
    const text = 'ㄱ'
    const pathT=wordMatchPath(text,pathList);

    pathT.pathImg.forEach(e=>{
        g.path(e).addClass('f03 sno').transform(Snap.matrix(2,0,0,2,300,150));
    })
    console.log(pathT);
    pathT.path.forEach(e=>{
        g.path(e).addClass('fno s14').attr({
            'strokeWidth':5,
            'strokeLinecap':'square'
        }).transform(Snap.matrix(2,0,0,2,300,150));
    })

    pathT.path.forEach(e=>{
        g.path(e).addClass('fno s04').attr({
            'strokeWidth':5,
            'strokeLinecap':'square'
        }).transform(Snap.matrix(2.2,0,0,2.2,500,150));
        g.path(e).addClass('fno s14').attr({
            'strokeWidth':5,
            'strokeLinecap':'square'
        }).transform(Snap.matrix(2,0,0,2,500,150));
    })

}
export default KM000008;