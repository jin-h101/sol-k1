import {
    // tempGuideLine,
    createElement,
    oneConnect,
    directionText,
    // makeOk,
} from '../component';

// connect 모듈(1 대 1)
const KM000026 = function ({
    canvas,
    direction,
    connect,
    // okButton,
    callback,

}) {
    // tempGuideLine(canvas) // 좌표선 삭제

    const g = canvas.g();
    const ttsG = g.g();
    const connectG = g.g();
    // const okBtnG = g.g();

    //지시문
    if (direction) directionText({'canvas':g, 'textG':ttsG, ...direction});



    const gArray = [];
    const connetEl = [];
    const info = [];
    const answer = [];
    const realConnectEl = [];
    const realInfo = [];
    const connectFunction = [];
    const lineHint = [];
    const handHint = [];
    let count = 0;

    //메타에 맞게 connect 엘리먼트 만들기
    connect.forEach((totlaEl, i) => {
        connetEl.push([]);
        info.push([]);
        if (i !== connect.length - 1) { // 첫번째는 무조건 연결이므로 인덱스가 안맞음
            gArray[i] = connectG.g().attr('opacity', 0);
            answer.push([]);
            realConnectEl.push([
                [],
                []
            ]);
            realInfo.push([
                [],
                []
            ]);
        }
        totlaEl.element.forEach((oneConnectEl, j) => {
            connetEl[i][j] = gArray[i === 0 ? i : i - 1].g();
            oneConnectEl.createElement.forEach((shapeEl) => {
                createElement({
                    "type": shapeEl.type,
                    "canvas": connetEl[i][j],
                    "meta": shapeEl.meta
                })
            })
            info[i][j] = oneConnectEl;
            if (oneConnectEl.isAns) {
                answer[i - 1].push(j);
                connetEl[i][j].data('isAns', 'yes');
            } else if (i === 0) {
                connetEl[i][j].data('isAns', 'yes');
            } else if (i !== 0) {
                connetEl[i][j].data('isAns', 'no');
            }
        })
    })

    //connect 함수에 넣기 편하도록 변경
    connetEl.forEach((els, i) => {
        els.forEach((el, j) => {
            // 왼쪽
            if (i !== connetEl.length - 1 && (i === 0 || answer[i - 1].indexOf(j) !== -1)) {
                realConnectEl[i][0].push(el);
                realInfo[i][0].push(info[i][j]);
            }
            // 오른쪽
            if (i !== 0) { 
                realConnectEl[i - 1][1].push(el);
                realInfo[i - 1][1].push(info[i][j]);
            }
        })
    })

    //실제 connect 생성
    realConnectEl.forEach((el, i) => {
        console.log('i',i);
        const dotOffsets = [
            [],
            []
        ];
        const dotSize = connect[i+1].dotSize || 5
        const lineClassNum = connect[i+1].lineClassNum || '04'
        realInfo[i].forEach((infoArr, j) => {
            infoArr.forEach(sol => {
                const fit = (i!==0 && j===0)? -1:1;
                dotOffsets[j].push(sol.connectDotOffsets ? [sol.connectDotOffsets.x * fit, sol.connectDotOffsets.y] : [0, 0]);
            });
        })
        lineHint[i] = [connect[i].lineHint];
        handHint[i] = connect[i].handHint;
        console.log(lineHint,handHint);
        connectFunction[i] = new oneConnect({
            'canvas': gArray[i],
            'type': 'v',
            'element': el,
            'ans': answer[i],
            'option': {
                'dotSize' : dotSize,
                'dotOffsets': dotOffsets,
                'strokeColor2': lineClassNum // 정답 시 선색
            },
            'dotVisible': true,
            "strokeDashArray": false,
            "isLineColorFb": true,
            "isFalseNoneTouch": true,
            "isLineColorRemind": false,
            'lineHint': lineHint[i],
            'handHint': handHint[i],
            'connectCallback': async function (nextFunction) {
                // 끝난 그룹 비활성화 처리 
                // (마지막 비활성화 처리 안되고 바로 마지막화면 나오기 위해서는 이부분 next 상단에 넣으면 됨)
                gArray[count].children().forEach((g) => {
                    if (g.data('isAns') === 'no') {
                        //선택불가 회색처리 피드백
                        // const shapeEl = g.selectAll('rect')[0] || g.selectAll('circle')[0] || undefined
                        // const rClass = (shapeEl && shapeEl.attr('class')) || undefined;
                        // if(rClass) shapeEl.removeClass(rClass).addClass('f0025 sno')
                        g.attr('opacity', 0.4);
                    }
                    g.selectAll('circle').forEach((cir) => {
                        if (cir.data('isAns') === 'no') {
                            cir.attr('opacity', 0)
                        }
                    })
                })
                setTimeout(nextFunction, 300);
            },
            'callback': next,
        });
    });

    // //ok 버튼
    // const okBtn = new makeOk({
    //     'canvas': okBtnG,
    //     'type': okButton.type,
    //     'cx': okButton.cx,
    //     'cy': okButton.cy,
    //     'scale':okButton.scale,
    //     'visibility': false,
    //     'event': false,
    //     'callback': callback
    // });

    //처음 시작
    gArray[count].attr('opacity', 1)
    connectFunction[count].start();


    //다음 진행 함수
    function next() {
        if (count < connectFunction.length - 1) { //연결이 남았을 때
            count++
            gArray[count].attr('opacity', 1)
            connectFunction[count].start();
        } else { // 연결 최종 종료 시
            callback();
            // connectG.selectAll('g').forEach(el => {
            //     if (el.data('isAns') === 'no') el.attr('opacity', 0)
            //     else if (el.data('isAns') === 'yes') el.transform('t' + [0, 250 - el.getTBox().cy]);
            // });
            // connectG.selectAll('circle').forEach(el => {
            //     if (el.data('isAns') === 'yes') el.transform('t' + [0, 250 - el.getTBox().cy]);
            // });
            // connectG.selectAll('line').forEach(el => {
            //     if (el.data('isAns') === 'yes') {
            //         const bbox = el.getTBox();
            //         el.attr('opacity', 0);
            //         el.paper.line(bbox.x, 250, bbox.x2, 250)
            //             .addClass('fno s' + el.data('color'))
            //             .attr('strokeWidth', el.data('strokeWidth'));
            //     }
            // });
            // okBtn.start();
        }

    }
}

export default KM000026;