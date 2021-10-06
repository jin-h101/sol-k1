// newModule choice + write 모듈
import {
    createElement,
    directionText,
    tempGuideLine,
    simpleHandWrite,
    sentenseSplitChoice,
} from '../component';
const KM000096 = async function ({
    canvas,
    direction,
    elements,
    wordChoose,
    handWriteValue,
    callback
}) {
    tempGuideLine(canvas);
    console.log('start');
    const g = canvas.g();
    const backG = g.g();
    const ttsG = g.g();
    const chooseG = g.g();
    const handWriteG = g.g();

    // 지시문
    if (direction)
        directionText({
            canvas: ttsG,
            ...direction
        });

    //배경 존재 시 설정
    if (elements) {
        elements.forEach(el => {
            createElement({
                type: el.type,
                canvas: backG,
                meta: el.meta
            });
        });
    }


    const hw = new simpleHandWrite({
        'canvas': handWriteG,
        'x': handWriteValue.x,
        'y': handWriteValue.y,
        'width': handWriteValue.width,
        'height': handWriteValue.height,
        'rXY': handWriteValue.rXY,
        'drawClassNum': handWriteValue.drawClassNum,
        'drawStrokeWidth': handWriteValue.drawStrokeWidth,
        'boxFillClassNum': handWriteValue.boxFillClassNum,
        'boxStrokeClassNum': handWriteValue.boxStrokeClassNum,
        'boxOpacity': handWriteValue.boxOpacity,
        'shadowDx': handWriteValue.shadowDx,
        'shadowDy': handWriteValue.shadowDy,
        'shadowBlur': handWriteValue.shadowBlur,
        'shadowOpacity': handWriteValue.shadowOpacity,
        'shadowClassNum': handWriteValue.shadowClassNum,
        'direction': handWriteValue.direction || true,
        'directionInfo': handWriteValue.directionInfo,
        'startPoint': handWriteValue.startPoint,
        'wordHint': handWriteValue.wordHint || false,
        'wordHintClassNum': handWriteValue.wordHintClassNum,
        'wordHintOpacity': handWriteValue.wordHintOpacity,
        'wordHintFs': handWriteValue.wordHintFs || 120,
        'dotLine': handWriteValue.dotLine || false,
        'dotLineClassNum': handWriteValue.dotLineClassNum,
        'dotLineStrokeWidth': handWriteValue.dotLineStrokeWidth,
        'dotLineOpacity': handWriteValue.dotLineOpacity,
        'okButton': handWriteValue.okButton,
        'undoButton': handWriteValue.undoButton,
        'resetButton': handWriteValue.resetButton,
        'answer': handWriteValue.answer,
        callback: function () {
           console.log('종료');
           callback();
        }
    });
    if(handWriteValue.wordHint) hw.g.select('.wordHint').attr('opacity',0);

    const choice = new sentenseSplitChoice({
        canvas : chooseG,
        sentense : wordChoose.text,
        x : wordChoose.x,
        y : wordChoose.y,
        classNum : wordChoose.classNum,
        fontSize : wordChoose.fontSize,
        hoverClassNum : wordChoose.underlineClassNum,
        fbClassNum : wordChoose.fbClassNum,
        isHint : wordChoose.isHint,
        ansIndex : wordChoose.ansIndex,
        callback : function(){
            console.log('next go');
            hwStart();
        }
    });
    

    //시작
    choice.start();


    function hwStart(){
        if(handWriteValue.wordHint) {
            const hintText = hw.g.select('.wordHint');
            hintText.attr('opacity', hintText.data('opacity'));
        }
        hw.start();
    }
};
export default KM000096;





// 길찾기
// const x = 20; //ani
// const y =100;
// const imgScale =0.95 // 받을 메타
// const mainImg=loadImage({
//     'src': testPath, // 받을 메타
//     'key': 'testPath',
//     'type': 'svg'
// })
// const pathStr =[];
// mainImg.use().transform(Snap.matrix(imgScale,0,0,imgScale,x,y)).appendTo(g); //[400,275]
// mainImg.selectAll('.hiddenPath').forEach((pd,i)=>{
//     pathStr[i]=pd.attr('d')
// })

// subG.path(Snap.path.map(pathStr[0], Snap.matrix(imgScale, 0, 0, imgScale, x,y)).toString()).addClass('fno s02')
// subG.path(Snap.path.map(pathStr[1], Snap.matrix(imgScale, 0, 0, imgScale, x,y)).toString()).addClass('fno s04')
// subG.path(Snap.path.map(pathStr[2], Snap.matrix(imgScale, 0, 0, imgScale, x,y)).toString()).addClass('fno s27')
// subG.path(Snap.path.map(pathStr[3], Snap.matrix(imgScale, 0, 0, imgScale, x,y)).toString()).addClass('fno s03')



// newModule 지문 읽기(스크롤), 선택지choice 모듈
// import {
//     com_pageConvert,
//     createElement,
//     directionText,
//     // tempGuideLine,
//     reading,
//     stepChoice
// } from '../component';
// const KM000096 = async function ({
//     canvas,
//     direction,
//     elements,
//     scroll,
//     sound,
//     question,
//     callback,

//     guideLine = true // 좌표선 삭제
// }) {
//     // tempGuideLine(canvas);
//     console.log('start');
//     const g = canvas.g();
//     const backG = g.g();
//     const ttsG = g.g();
//     const scrollG = g.g();
//     const converG = g.g().attr('class', 'convert');
//     let ttsObj, qTTsObj;
//     const choiceStep = [];
//     let qCount = 0;

//     // 지시문
//     if (direction)
//         ttsObj = directionText({
//             canvas: ttsG,
//             howlerStop: false,
//             ttsStartCallback: function () {
//                 readingGroup.stop();
//                 howlerStop();
//             },
//             ...direction
//         });

//     //배경 존재 시 설정
//     if (elements) {
//         elements.forEach(el => {
//             createElement({
//                 type: el.type,
//                 canvas: backG,
//                 meta: el.meta
//             });
//         });
//     }

//     const readingGroup = new reading({
//         canvas: scrollG,
//         area: scroll.area,
//         elements: scroll.elements,
//         focusText: scroll.focusText,
//         footNoteInfo: scroll.footNoteInfo,
//         sound: sound,
//         firstGuide: true,
//         startCallback: function () {
//             choiceAuto();
//             howlerStop();
//         },
//         endCallback: function () {
//             console.log('end call');
//         }
//     });

//     //문항 부분
//     const choiceEl = [];
//     let convertModal;
//     const questionBox = [];
//     //정답 메타가 입력되었을 때만 실행
//     if (question) {
//         const qG = converG.g();
//         const stepG = converG.g();
//         const choiceG = converG.g();
//         //문제부분
//         if (question.direction) {
//             qTTsObj = directionText({
//                 canvas: qG,
//                 y: 40,
//                 howlerStop: false,
//                 ttsStartCallback: howlerStop,
//                 ...question.direction
//             });
//         }

//         if (question.elements) {
//             question.elements.forEach(el => {
//                 createElement({
//                     type: el.type,
//                     canvas: qG,
//                     meta: el.meta
//                 });
//             });
//         }
//         if (question.stepElements) {
//             question.stepElements.forEach((stepEl, i) => {
//                 const subG = stepG.g().data('index', i);
//                 let isfirst = 0;
//                 stepEl.forEach(el => {
//                     const elementG = createElement({
//                         type: el.type,
//                         canvas: subG,
//                         meta: el.meta
//                     });
//                     if (el.isQ && isfirst === 0) questionBox.push(elementG), isfirst++;
//                 });
//             });
//         }
//         //보기부분
//         if (question.choice) {
//             question.choice.forEach((arr, j) => {
//                 const choiceGroup = choiceG.g();
//                 choiceEl.push([]);
//                 const { classNum, rXY } = arr.shadow;
//                 arr.elements.forEach((el, i) => {
//                     choiceEl[j][i] = choiceGroup.g();
//                     el.forEach(e => {
//                         createElement({
//                             type: e.type,
//                             canvas: choiceEl[j][i],
//                             meta: { ...e.meta, shadowClassNum: undefined }
//                         });
//                     });
//                 });
//                 choiceStep[j] = new stepChoice({
//                     canvas: choiceGroup,
//                     choiceEl: choiceEl[j],
//                     ans: arr.answer,
//                     hintCount:arr.hintCount,
//                     btnShadowClassNum : classNum,
//                     fbOpacity: arr.fbOpacity || 0.6,
//                     btnRxy : rXY,
//                     howlerStop:false,
//                     inactiveAttr: {
//                         "classNum": "0028",
//                         "shapeFillClassNum": 14,
//                         ...arr.inactiveAttr
//                     },
//                     callback: function () {
//                         if(qCount<choiceStep.length-1){
//                             qCount++;
//                             choiceStep[qCount].start();
//                         }else{
//                             console.log('종료');
//                         // scrollG.attr('opacity', 0); // 마지막에 convert modal이 먼저 지워지는 문제 해결
//                         // callback();
//                         }
//                     }
//                 });
//             });
//         }
//         convertModal = new com_pageConvert({
//             g: canvas,
//             appendG: converG,
//             visible: question.visible,
//             time: 800,
//             guideLine: guideLine, // 좌표선 삭제
//             howlerStop: false,
//             startCallback: function () {
//                 readingGroup.stop();
//                 howlerStop();
//             }
//         });
//     }

//     //시작
//     if(!question.visible) { 
//         start();
//     }else {
//         choiceAuto();
//     }

//     function start() {
//         readingGroup.start();
//     }
//     function choiceAuto (){
//         convertModal.start();
//         choiceStep.forEach(el=>el.show());
//         choiceStep[qCount].start();
//     }

//     //모든 지시문 tts만 초기화
//     function howlerStop() {
//         if (ttsObj.tts.data('voice')) ttsObj.tts.data('voice').stop();
//         if (qTTsObj.tts.data('voice')) qTTsObj.tts.data('voice').stop();
//     }
// };
// export default KM000096;



// newModule 내부 scroll + choice test (소영과장님 모듈_049)
// import { directionText, com_makeModal, createElement, tempGuideLine, stepChoice } from '../component';

// // 학습만화 모듈
// const KM000096 = function ({ canvas, direction, elements, scrollArea, scrollElements, callback, choice }) {
//     // tempGuideLine(canvas); // 좌표선 삭제

//     const g = canvas.g();
//     const ttsG = g.g();
//     const scrollG = g.g();
//     // const backG = scrollArea ? scrollG.g() : g.g();
//     const choiceG = []; //초이스 그룹 2개
//     const choiceGroup = [];
//     let answer = [];
//     let count = 0;
//     let order = 0;
//     let info;
//     const questionBox = [];
//     // 지시문
//     if (direction) directionText({ canvas: ttsG, ...direction });
//     if (scrollArea) {
//         scrollArea = {
//             x: 40,
//             y: 80,
//             x2: 760,
//             y2: 300,
//             ...scrollArea
//         };
//     }
// let isfirst=0;
// let qCount =0;
//     if (scrollElements) {
//         scrollElements.forEach((el, id) => {
//             questionBox[id] = scrollG.g();
//             if (!Array.isArray(el)) el = [el];
//             el.forEach(el2 => {
//                 const elementG =createElement({
//                     type: el2.type,
//                     canvas: questionBox[id],
//                     meta: el2.meta
//                 });
//                 // if (el2.isQ) questionBox[id].data('isQ', 'aa');
//                 if (el.isQ && isfirst === 0) questionBox.push(elementG), isfirst++;
//             });
//         });
//     }

//     //배경 존재 시 설정
//     if (elements) {
//         elements.forEach((el, id) => {
//             // questionBox[id] = scrollG.g();
//             if (!Array.isArray(el)) el = [el];
//             el.forEach(el2 => {
//                 createElement({
//                     type: el2.type,
//                     canvas: scrollG,
//                     meta: el2.meta
//                 });
//                 // if (el2.isQ) questionBox[id].data('isQ', 'aa');
//             });
//         });
//     }
//     console.log(questionBox);

//     // let removeID = [];
//     // questionBox.forEach((el, i) => {
//     //     if (el.data('isQ')) removeID.push(i);
//     // });

//     if (scrollArea) {
//         info = {
//             x: scrollArea.x,
//             y: scrollArea.y,
//             width: scrollArea.x2 - scrollArea.x,
//             height: scrollArea.y2 - scrollArea.y
//         };
//         //div 생성
//         new com_makeModal({
//             x: info.x,
//             y: info.y,
//             width: info.width,
//             height: info.height,
//             zIndex: 10,
//             appendG: scrollG
//         }); // div 새로 만들 때

//         //외곽 영역 생성
//         g.rect(info.x, info.y, info.width, info.height, 20, 20)
//             .addClass('f' + (scrollArea.fillClassNum || '0012') + ' s' + scrollArea.strokeClassNum || 'no')
//             .attr('fillOpacity', 1);
//     }

//     if (choice) {
//         choice.forEach((arr, j) => {
//             const choiceStep = g.g();
//             choiceGroup[j] = [];
//             arr.elements.forEach((choiceEl, i) => {
//                 choiceGroup[j][i] = choiceStep.g();
//                 choiceEl.forEach(el => {
//                     createElement({
//                         type: el.type,
//                         canvas: choiceGroup[j][i],
//                         meta: {
//                             ...el.meta
//                         }
//                     });
//                 });
//             });
//             answer[j] = Array.isArray(arr.ansIndex) ? arr.ansIndex : [arr.ansIndex];
//             console.log(answer[j]);
//             choiceG[j]=new stepChoice({
//                 canvas: choiceStep,
//                 choiceEl : choiceGroup[j],
//                 ans: answer[j],
//                 hintCount:arr.hintCount,
//                 standardIndex :10,
//                 // btnShadowClassNum : classNum,
//                 // btnRxy : rXY,
//                 choiceCallback:function(idx){
//                     if (questionBox[qCount]) {
//                         const bbox = questionBox[qCount].getTBox();
//                         questionBox[qCount].attr('opacity', 0);
//                         choice[qCount].elements[idx].forEach(e => {
//                             createElement({
//                                 type: e.type,
//                                 canvas: choiceGroup[qCount][idx],
//                                 meta: {
//                                     ...e.meta,
//                                     shadowClassNum: undefined,
//                                     cx: bbox.cx,
//                                     cy: bbox.cy
//                                 }
//                             });
//                         });
//                         qCount++;
//                     }
//                 },
//                 callback : function(modal){
//                     console.log('end',answer[j]);
//                      next(modal);
//                 }
//             })
//         });
//     }
//     //시작
//     start();

//     function start() {
//         // questionBox[removeID[order]].select('rect').removeClass('s0014').addClass('s0002');
//         choiceG[order].start();
//     }

//     function next(modal) {
//         console.log(modal);
//         // questionBox[removeID[order]].select('rect').remove(); //물음표 박스 삭제
//         // questionBox[removeID[order]].select('text').remove(); //물음표 박스 삭제
//         setTimeout(function () {
//             if (order < answer.length - 1) {
//                 order++;
//                 count = 0;
//                 modal.div.remove();
//                 start();
//             } else {
//                 // callback();
//             }
//         }, 300);
//     }
// };

// export default KM000096;


// newModule 이전
// import { tts, replaceWord, jamoList, K_richTextAuto, createElement, tempGuideLine, K_makeButton } from "../component";
// import { loadSound, hint } from "sol-common";
// import { Howler } from "howler";
// import { feedback } from "sol-common/util";

// // 끝말 잇기
// const KM000096 = async function ({ canvas, direction, elements, imageButtons, choice, lastFeedback, callback }) {
//     tempGuideLine(canvas); // 좌표선 삭제
//     const g = canvas.g();
//     const firstG = g.g();
//     const secondG = g.g().attr("visibility", "hidden");
//     const ttsG = g.g();
//     const backG = firstG.g();
//     const choiceG = firstG.g();
//     const choiceGroup = [];
//     const imgBtnG = g.g();
//     let ans = [];
//     let count = 0;
//     let hintEl;
//     if (imageButtons) {
//         for (let z = 0; z < imageButtons.length; z++) {
//             if (imageButtons[z].soundInfo) {
//                 imageButtons[z].voice = loadSound(imageButtons[z].soundInfo.url);
//             }
//         }
//     }

//     if (direction) {
//         // 지시문
//         new tts({
//             canvas: ttsG,
//             x: direction.speakerX || direction.x - 40,
//             y: direction.speakerY || direction.y - 23,
//             text: replaceWord(direction.text, jamoList)
//         });

//         new K_richTextAuto({
//             canvas: ttsG,
//             text: direction.text,
//             x: direction.x || 80,
//             y: direction.y || 45,
//             className: "ffng f" + (direction.classNum || "000"), //선택
//             fontSize: direction.fontSize || 25, //선택
//             dy: direction.dy || 40, //선택
//             isBold: direction.bold || false,
//             textLength: direction.textLength || 790 - direction.x,
//             options: direction.options
//         });
//     }

//     //배경 존재 시 설정
//     if (elements) {
//         elements.forEach(el => {
//             createElement({
//                 type: el.type,
//                 canvas: backG,
//                 meta: el.meta
//             });
//         });
//     }

//     if (imageButtons) {
//         imageButtons.forEach(imgButton => {
//             //이미지 버튼 마다
//             const ibG = imgBtnG.g();
//             imgButton.element.forEach(imgEl => {
//                 const gg = ibG.g();
//                 createElement({
//                     type: imgEl.type,
//                     canvas: gg,
//                     meta: imgEl.meta
//                 });
//             });
//             createElement({
//                 type: "rect",
//                 canvas: ibG,
//                 meta: { ...ibG.getTBox(), shapeFillClassNum: "14", shapeOpacity: 0 }
//             });
//             ibG.touchOrClick(function () {
//                 Howler.stop();
//                 imgButton.voice.play();
//                 imgButton.voice.once("end", function () {});
//             });
//         });
//     }

//     if (choice) {
//         choice.elements.forEach((choiceEl, i) => {
//             choiceGroup[i] = choiceG.g();
//             let shadowClass;
//             choiceEl.forEach(el => {
//                 const shape = createElement({
//                     type: el.type,
//                     canvas: choiceGroup[i],
//                     // meta: el.meta
//                     "meta": {...el.meta,'shadowClassNum':undefined}
//                 });
//                 if(el.meta.shadowClassNum) shadowClass=el.meta.shadowClassNum
//                 const bbox = shape.getTBox();
//                 new K_makeButton({
//                     el: choiceGroup[i],
//                     x: bbox.cx,
//                     y: bbox.cy,
//                     width: bbox.width,
//                     height: bbox.height,
//                     fillClassNum: "14",
//                     strokeClassNum: "no",
//                     shadowClassNum: shadowClass || "0006",
//                     pressEffect: true,
//                     r: shape.rXY,
//                     index: i,
//                     isMetaSize: true,
//                     reset: true,
//                     endCallback: actionCallback
//                 });
//                 choiceGroup[i].stop();
//             });
//         });

//         ans = Array.isArray(choice.ansIndex) ? choice.ansIndex : [choice.ansIndex];
//     }

//     if (lastFeedback) {
//         lastFeedback.elements.forEach(el => {
//             createElement({
//                 type: el.type,
//                 canvas: secondG,
//                 meta: el.meta
//             });
//         });
//     }

//     //처음 시작
//     start(choiceGroup, count);

//     //시작 함수
//     function start(element, n) {
//         element.forEach((el, k) => {
//             if (n < choice.hintCount) {
//                 //힌트 있을 때
//                 if (ans[n] === k) {
//                     const bbox = el.getTBox();
//                     // el.attr("pointerEvents", "auto"); //엘리먼트 활성
//                     el.reStart();
//                     hintEl = hint({
//                         canvas: g,
//                         XY: [bbox.cx, bbox.cy]
//                     }); //힌트 생성
//                 }
//             } else {
//                 //힌트가 없거나 끝났을 때
//                 // if (!el.data("clickEnd")) el.attr("pointerEvents", "auto");
//                 if (!el.data("clickEnd")) el.reStart();
//             }
//         });
//     }

//     //choice callback
//     function actionCallback(index, group) {
//         const element = choiceGroup[index];
//         if (hintEl) hintEl.removeHint();
//         element.data("clickEnd", true); //클릭이 끝남을 나타냄
//         const elBBox = element.getTBox();
//         const bool = ans.indexOf(index) !== -1;
//         // choiceGroup.forEach(e => e.attr("pointerEvents", "none"));
//         choiceGroup.forEach(e => e.stop());
//         //o,x 피드백
//         const className = bool ? "fno s0018" : "fno s0019";
//         const box = firstG
//             .rect(elBBox.x, elBBox.y, elBBox.w, elBBox.h, group.data("rXY"), group.data("rXY"))
//             .addClass(className)
//             .attr({
//                 strokeWidth: 5
//             }); // 네모 피드백
//         const fb = new feedback({
//             canvas: firstG,
//             el: element, //[elBBox.x2 + 10, elBBox.y],
//             bool: bool,
//             // gap: fbI.feedbackGap.length !== 0 ? fbI.feedbackGap : [0, 0],
//             scale: 1,
//             addAction: false,
//             onRemove: function () {
//                 if (bool) {
//                     //정답 시
//                     count++;
//                     setTimeout(function () {
//                         if (ans.length === count) {
//                             callback();
//                         } else {
//                             start(choiceGroup, count);
//                         }
//                     }, 300); // 다음 상태 진행
//                 } else {
//                     //오답 시
//                     box.attr("opacity", 0);
//                     element.attr("opacity", 0.4);
//                     fb.addUserAction();
//                     setTimeout(function () {
//                         start(choiceGroup, count);
//                     }, 300);
//                 }
//             }
//         });
//     }
// };

// export default KM000096;
