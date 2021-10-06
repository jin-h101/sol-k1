import Snap from 'sol-common/snap'
import {
    image,
    loadSound,
    loadImages,
} from 'sol-common/components'
import {
    pathList,
    wordMatchPath,
    // tempGuideLine,
    unPressMakeButton,
    createElement,
    makeOk,
    directionText
} from '../component';

import upPuzzle from '../assets/images/upPuzzle.svg'
import downPuzzle from '../assets/images/downPuzzle.svg'


import {
    Howler
} from 'howler';


const KM000021 = async function ({
    canvas,
    direction,
    elements,
    stepOne,
    stepTwo,
    stepThree,
    stepFour,
    callback,

}) {
    // tempGuideLine(canvas);

    const g = canvas.g();
    const backG = g.g();
    const ttsG = g.g();
    stepOne.imageButton.voice = loadSound(stepOne.imageButton.soundInfo.url);
    stepThree.imageButton.voice = loadSound(stepThree.imageButton.soundInfo.url);
    const voice= [stepOne.imageButton.voice,stepThree.imageButton.voice];
    let count = 0;
    const stepG = [];
   
    //그룹 생성
    for (let s = 0; s < 4; s++) {
        stepG[s] = g.g()
            .attr({
                'opacity': 0,
                'pointerEvents': 'none'
            });
    }

    // 지시문
    if (direction) directionText({'canvas':ttsG, ...direction});

    //배경 존재 시 설정
    if(elements){
        elements.forEach(el=>{
            createElement({
                "type": el.type,
                "canvas": backG,
                "meta": el.meta
            });
        })
    }

    //stepOne
    const firstBtnG = stepG[0].g();
    makeOkBtn(stepG[0], stepOne, nextCheck); // ok버튼
    if(stepOne.imageButton.textBackground) makeBackground(stepOne.imageButton.textBackground,firstBtnG);
    if(stepOne.imageButton.imageInfo) makeImgEl(stepOne.imageButton.imageInfo, firstBtnG); //버튼 안 이미지
    if(stepOne.imageButton.textInfo) makeTextEl(stepOne.imageButton.textInfo, firstBtnG);
    makeTotalButton(firstBtnG, stepOne.imageButton); //전체 버튼화


    //stepTwo
    const upP = loadImages([{
        'src': upPuzzle,
        'key': 'upPuzzle',
        'type': 'svg',
        'scale': stepTwo.puzzleScale || 1
    }, {
        'src': downPuzzle,
        'key': 'downPuzzle',
        'type': 'svg',
        'scale': stepTwo.puzzleScale || 1
    }])
    const stepTwoSubG = [];
    upP.forEach((el, i) => {
        stepTwoSubG[i] = stepG[1].g()
        const imgG = stepTwoSubG[i].g()
        const pathG = stepTwoSubG[i].g()
        const clonePuzzleImg = el.clone();
        const x = stepTwo.standardX;
        const y = stepTwo.standardY + i * (80 * stepTwo.puzzleScale + stepTwo.gapY);
        const fillClassNum = stepTwo.element[i].background.fillClassNum || '03';
        const strokeClassNum = stepTwo.element[i].background.strokeClassNum || 'no';
        clonePuzzleImg.selectAll('path')[0]
            .attr({
                'class': 'f' + fillClassNum + ' s' + strokeClassNum,
                'strokeWidth': 1
            });
        clonePuzzleImg.use().appendTo(imgG);
        const element = imgG.transform(Snap.matrix(stepTwo.puzzleScale, 0, 0, stepTwo.puzzleScale, x, y));
        const bbox = element.getTBox();

        const textI = stepTwo.element[i].textInfo;
        const pathData = wordMatchPath(textI.text, pathList).pathImg
        pathData.forEach((pathD) => {
            let classNum = textI.classNum || '001';
            pathD.forEach(pD => {
                pathG.path(pD).addClass('f' + classNum + ' sno');
            })
        });
        pathG.transform(Snap.matrix(textI.scale, 0, 0, textI.scale, bbox.cx + textI.offset.x, bbox.cy + textI.offset.y)).center();
    });


    //stepThree
    const secondBtnG = stepG[2].g();
    makeOkBtn(stepG[2], stepThree, nextCheck); // ok버튼
    if(stepThree.imageButton.textBackground) makeBackground(stepThree.imageButton.textBackground,secondBtnG);
    if(stepThree.imageButton.imageInfo) makeImgEl(stepThree.imageButton.imageInfo, secondBtnG); //버튼 안 이미지
    if(stepThree.imageButton.textInfo) makeTextEl(stepThree.imageButton.textInfo, secondBtnG);
    makeTotalButton(secondBtnG, stepThree.imageButton); //전체 버튼화


    //stepFour
    const scaleUpArr = []
    stepFour.item.forEach((el, i) => {
        console.log(el);
        scaleUpArr[i] = stepG[3].g();
        if(el.textBackground) makeBackground(el.textBackground,scaleUpArr[i]);
        if(el.imageInfo) makeImgEl([el.imageInfo], scaleUpArr[i]); //버튼 안 이미지
        if(el.textInfo) makeTextEl(el.textInfo, scaleUpArr[i]); 
    })


    // //처음 시작
    stepG[count].attr({
        'opacity': 1,
        'pointerEvents': 'auto'
    });



    // 다음 단계 체크 함수
    function nextCheck() {
        stepG[count].attr({
            'opacity': 0,
            'pointerEvents': 'none'
        });
        if (count === 3) {
            console.log('완전 끝');
        } else {
            count++;
            if (count === 1 || count === 3) {
                stepG[count].attr({
                    'opacity': 1
                });
                animateF(count, nextCheck) //애니메이션 효과 실행 함수
            } else if (count === 2) {
                stepG[count].attr('opacity', 1);
                ttsG.attr('pointerEvents','none');
                stepThree.okEl.stop();
                Howler.stop();
                voice[1].play()
                voice[1].once('end', function () {
                    stepG[count].attr('pointerEvents', 'auto')
                    ttsG.attr('pointerEvents','auto');
                    stepThree.okEl.start();
                })
            }
        }
    }

    // 에니메이션이 있을 때, 애니메이션 효과 실행 함수
    function animateF(type, next) {
        setTimeout(function () {
            if (type === 1) {
                stepTwoSubG.last.animate({
                    'transform': 't' + [0, -stepTwo.gapY]
                }, 1000, function(){
                    setTimeout(next,300);
                });
            } else if (type === 3) {
                bigF(scaleUpArr,0,function(){
                    bigF(scaleUpArr,1,function(){
                        setTimeout(callback,300);
                    }); //끝
                })
            }
        }, 1000);

        function bigF(els,index,endCallback) {
            ttsG.attr('pointerEvents','none');
            Howler.stop();
            voice[index].play()
            els[index].animate({
                'transform': 't0,0 s' + stepFour.item[0].growBigSize
            }, 500, function () {
                voice[index].once('end', function () {
                    ttsG.attr('pointerEvents','auto');
                    els[index].animate({
                        'transform': 't0,0 s1'
                    }, 500, endCallback)
                })
            });
        }
    }

    // ok 버튼 생성 함수
    function makeOkBtn(group, meta, stepCallback) {
        const okBtn = new makeOk({
            'canvas': group,
            'type': meta.okButton.type,
            'x': meta.okButton.cx,
            'y': meta.okButton.cy,
            'scale':meta.okButton.scale,
            'visibility': true,
            'event': true,
            'callback': function () {
                Howler.stop();
                stepCallback();
            }
        });
        meta.okEl = okBtn;
    }

    // 이미지 음원 버튼 생성 함수
    function makeTotalButton(g, meta) {
        new unPressMakeButton({
            'el': g,
            'isButton':meta.isButton,
            'x': meta.x,
            'y': meta.y,
            'width': meta.width, 
            'height': meta.height,
            'shadowClassNum':meta.shadowClassNum,
            'shadowDx':meta.shadowDx,
            'shadowDy':meta.shadowDy,
            'shadowBlur':meta.shadowBlur,
            'shadowOpacity':meta.shadowOpacity,
            'btnFillClassNum' : meta.btnFillClassNum,
            'btnStrokeClassNum' : meta.btnStrokeClassNum,
            'btnOpacity': meta.btnOpacity,
            'btnStrokeWidth': meta.btnStrokeWidth,
            'btnR': meta.btnR,
            'callback' : async function () {
                ttsG.attr('pointerEvents','none');
                Howler.stop();
                meta.voice.play()
                meta.voice.once('end', function () {
                    ttsG.attr('pointerEvents','auto');
                })          
            }
        })
    }

    // 배경 rect 생성 함수
    function makeBackground(meta, g){
        const bg=g.g();
        const r = meta.r || 0;
        const fillClassNum = meta.fillClassNum || '14';
        const strokeClassNum = meta.strokeClassNum || '14';
        bg.rect(meta.cx, meta.cy, meta.width, meta.height, r, r)
            .addClass('f' + fillClassNum + ' s' + strokeClassNum)
            .attr('strokeWidth', meta.strokeWidth || 1)
            .center();
        
        return bg;
    }

    // 텍스트 생성 함수
    function makeTextEl(meta, g) {
        const pathG = g.g()
        const pathData = wordMatchPath(meta.text, pathList).pathImg
        pathData.forEach((pathD, i) => {
            let classNum = meta.classNum || '001';
            if (i === meta.focusIndex) classNum = meta.focusClass || '02';
            pathD.forEach(pD => {
                pathG.path(pD).addClass('f' + classNum + ' sno');
            })
        });
        pathG.transform(Snap.matrix((meta.scale || 0.5), 0, 0, (meta.scale || 0.5), meta.cx, meta.cy)).center();
        return pathG;
    }

    //이미지 생성 함수
    function makeImgEl(meta, g) {
        const imgG = g.g();
        meta.forEach(imgEl => {
            const gg = imgG.g();
            new image({
                'canvas': gg,
                'x': imgEl.cx,
                'y': imgEl.cy,
                'img': {
                    'scale': 1,
                    ...imgEl.img
                },
                'center': true
            });
            if(imgEl.img && imgEl.img.rotate) gg.transform('r'+imgEl.img.rotate)
        });
        return imgG
    }
}

export default KM000021;