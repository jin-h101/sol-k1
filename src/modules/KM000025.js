import {
    multiConnect,
    K_richTextAuto,
    K_makeBackground,
    createElement,
    directionText,
    // tempGuideLine, 
} from '../component';

// connect 모듈(1 대 다수)
const KM000025 = function ({
    canvas,
    direction,
    elements,
    connect,
    callback,

}) {
    // tempGuideLine(canvas) // 좌표선 삭제
    
    connect = {
        "hintCount": 0,
        'dotSize':5,
        ...connect
    }
    const g = canvas.g();
    const backG = g.g();
    const ttsG = g.g();
    const connectG = g.g();

    //지시문
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
    if(multiEl.textInfo){
        multiEl.textInfo.forEach(txt=>{
            new K_richTextAuto({
                'canvas': connetEl[0][0].g(),
                'text': txt.text,
                'x': txt.cx,
                'y': txt.cy,
                'className': 'ffng  f' + (txt.classNum || '91'), //선택
                'fontSize': txt.fontSize || 60, //선택
                'dy': txt.dy || 45, //선택
                'isBold':txt.bold || false,
                'options' : txt.options,
                'center':true
            });
        })
    }
   

    //한개만 연결 할 엘리먼트(낱자)
    connect.element.oneEl.forEach((el, i) => {
        connetEl[1][i] = connectG.g();
        dotOffsets[1][i] = {"x":0,"y": 0, ...el.connectDotOffsets}
        //배경
        new K_makeBackground({
            'group':connetEl[1][i],
            'el':el
        });
        if(el.isAns) answer.push(i);
        if(el.textInfo){
            el.textInfo.forEach(txt=>{
                new K_richTextAuto({
                    'canvas': connetEl[1][i].g(),
                    'text': txt.text,
                    'x': txt.cx,
                    'y': txt.cy,
                    'className': 'ffng  f' + (txt.classNum || '91'), //선택
                    'fontSize': txt.fontSize || 60, //선택
                    'dy': txt.dy || 45, //선택
                    'isBold':txt.bold || false,
                    'options' : txt.options,
                    'center':true
                });
            })
        }
    });

    console.log('ans',answer);
    // //연결하기
    const connectFunction = new multiConnect({
        'canvas': connectG,
        'type': 'v',
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
        "isLineColorRemind": false,
        "hintAndPreventChance": true,
        'connectCallback': async function (nextFunction) {
            // const index=dots[1]-1;//multiEl이 하나이므로 -1
            // connetEl[1][index].selectAll('.path')[connetEl[1][index].data('changePathIndex')].removeClass(beforeClass).addClass('f02 sno')
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

export default KM000025;