import {
    multiConnect,
    wordSplit,
    K_richTextAuto,
    pathWord,
    K_makeBackground,
    createElement,
    directionText, 
} from '../component';

// connect 모듈(1 대 다수)
const KM000009 = function ({
    canvas,
    direction,
    elements,
    connect,
    callback,

}) {
    
    connect = {
        "hintCount": 0,
        'dotSize':5,
        ...connect
    }
    const g = canvas.g();
    const backG = g.g();
    const ttsG = g.g();
    const connectG = g.g();

    if (direction) directionText({'canvas':g, 'textG':ttsG, ...direction});


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

    //connect element 생성
    const connetEl = [
        [],
        []
    ];
    const dotOffsets = [
        [],
        []
    ];
    const answer = [];

    //여러개 연결 할 엘리먼트(자음, 모음)
    const multiEl = connect.element.multiEl;
    connetEl[0][0] = connectG.g();
    dotOffsets[0][0] = {"x":0,"y": 0, ...multiEl.connectDotOffsets}
    // 배경
    new K_makeBackground({
        'group':connetEl[0][0],
        'el':multiEl
    });
    //일반 텍스트로 자음,모음 출력
    new K_richTextAuto({
        'canvas': connetEl[0][0].g(),
        'text': multiEl.text,
        'x':  multiEl.cx,
        'y': multiEl.cy,
        'className': 'ffng  f' + (multiEl.classNum || '91'), //선택
        'fontSize': multiEl.fontSize || 60, //선택
        'dy': multiEl.dy || 45, //선택
        'isBold':multiEl.bold || false,
        'options' : multiEl.options,
        'center':true
    });

    //한개만 연결 할 엘리먼트(낱자)
    const beforeClass='f14 sno'; // path 색깔
    connect.element.oneEl.forEach((el, i) => {
        const splitWordInfo=wordSplit(el.text);
        const searchWordIndex = splitWordInfo.arr.indexOf(multiEl.text);
        const isAns = searchWordIndex !== -1;
        if (isAns) answer.push(i);

        connetEl[1][i] = connectG.g()
                                .data('changePathIndex',searchWordIndex);
        dotOffsets[1][i] = {"x":0,"y": 0, ...el.connectDotOffsets}
        //배경
        new K_makeBackground({
            'group':connetEl[1][i],
            'el':el
        });
        pathWord({ //글자 패스 그리기 함수
            'canvas':connetEl[1][i].g(),
            'cx': el.cx + (el.textGapX || 0),
            'cy': el.cy + (el.textGapY || 0),
            'textScale':el.scale,
            'text': el.text,
            'className':beforeClass
        });
    });

    console.log('ans',answer);

    //연결하기
    const connectFunction = new multiConnect({
        'canvas': connectG,
        'type': 'h',
        'element': connetEl,
        'ans': [answer],
        'lineHint': [connect.hintCount], //힌트 개수 배열로
        'option': {
            'dotSize': connect.dotSize,
            'dotOffsets': dotOffsets,
            'strokeColor2':connect.lineClassNum || '04' // 정답 시 선색
        },
        'handHint': true,
        "dotVisible": true,
        "strokeDashArray": false,
        "isLineColorFb":true,
        "isFalseNoneTouch":true,
        "isLineColorRemind": true,
        "hintAndPreventChance": true,
        'connectCallback': async function (nextFunction, dots) {
            const index=dots[1]-1;//multiEl이 하나이므로 -1
            connetEl[1][index].selectAll('.path')[connetEl[1][index].data('changePathIndex')].removeClass(beforeClass).addClass('f0018 sno')
            nextFunction();
        },
        callback: function () {
            setTimeout(function () {
                if (callback) callback();
            }, 300)
        },
    });
    connectFunction.start()
}

export default KM000009;