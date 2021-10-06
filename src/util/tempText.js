// export const tempRichText = ({ //추후 공통으로 업데이트
//     canvas,
//     text,
//     x,
//     y,
//     fontSize = 18,
//     dy = 35,
//     className = 'f001',
//     font = 'ffng',
//     center = false,
//     cutLength = 800,
//     highlightColor = '02',
//     underlineColor = '02',
//     blankColor = '01'
// }) => {
//     const g = canvas.g();
//     const textArr = text.split('\n');
//     const option = ['$blank', '$highlight', '$underline'];
//     const sentencesArr = [];
//     const tempSentences = [];
//     let sentences = [];
//     const attr = {
//         fontSize: fontSize
//     };
//     let yChangeCount = 0;

//     textArr.forEach((element, i) => {
//         sentencesArr.push([]);
//         tempSentences[i] = element.replace(/\s/g, '\u00A0');
//         sentencesArr[i].push(tempSentences[i]);
//     });
//     //자동 줄바꿈 된 text 생성 (0,0) 기준
//     sentencesArr.forEach(arr => (sentences = sentences.concat(arr)));
//     sentences.forEach((text, i) => {
//         if (i !== 0) yChangeCount++;
//         const subG = g.g();
//         let bbox;
//         let boxGap = 0;
//         const splitT = text.split('\u00A0');
//         if (splitT[0] === "" && splitT[1]) {
//             splitT[1] = '\u00A0' + splitT[1];
//             splitT.shift();
//         }
//         let textArr = [];
//         let opt = [];
//         let optionCount = [0, 0];
//         console.log('splitT',splitT);
//         for (let k = 0; k < splitT.length; k++) {
//             optionCount = [optionCount[0] + charCount(splitT[k], '{'), optionCount[1] + charCount(splitT[k], '}')]; //괄호 시작 끝 숫자 체크
//             let splitOptionStart = splitT[k].split(/\$(.*?)\{/g); //앞부분 체크
//                 // if(splitOptionStart[0]==='') splitOptionStart.shift();
//                 console.log(splitOptionStart,'splitOptionStart');
//                 if(k!==0) splitOptionStart[0]=' '+splitOptionStart[0];
//                 splitOptionStart=remove(splitOptionStart, '');
//                 console.log( 'remove',splitOptionStart);
//             splitOptionStart.forEach((el, z) => {
//                 if (el === 'highlight' || el === 'underline' || el === 'blank') {
//                     opt.push('$' + el);
//                 } else {
//                     if (el.indexOf('}') !== -1) { //뒷부분 닫히는지 체크
//                         let splitOpionEnd = el.split(/\}/g);
//                         // if(splitOpionEnd[splitOpionEnd.length-1]==='') splitOpionEnd.pop();
                       
//                         // console.log( 'remove2',remove(splitOpionEnd, ''));
//                         splitOpionEnd=remove(splitOpionEnd, '');
//                         console.log('remove2',splitOpionEnd);
//                         splitOpionEnd.forEach((el2, y) => {
//                             opt.forEach((opt) => {
//                                 el2 = opt + el2
//                             })
//                             console.log('w', el2 ,'!');
//                             textArr.push(el2)
//                             // textArr.push(el2 + (y === splitOpionEnd.length - 1 ? '\u00A0' : ''))
//                             // if (y !== splitOpionEnd.length - 1) opt.pop();
//                             opt.pop();
//                         })
//                     } else {
//                         opt.forEach((opt) => {
//                             el = opt + el
//                         })
//                         console.log('el', el,'!');
//                         textArr.push(el);
//                         // textArr.push(el + (z === splitOptionStart.length - 1 ? '\u00A0' : ''));
//                     }
//                 }
//             })
//         }
//         console.log(textArr);
//         textArr.forEach((txt, j) => {
//             let infomation = {
//                 text: txt,
//                 x: j === 0 ? x : bbox.x2 + boxGap,
//                 y: y + yChangeCount * dy,
//                 fontColor: className,
//                 fontSize: fontSize
//             };
//             const margin = infomation.fontSize * 0.05;
//             const isHighlight = txt.indexOf('$highlight') !== -1;
//             const isUnderLine = txt.indexOf('$underline') !== -1;
//             const isBlank = txt.indexOf('$blank') !== -1;
//             if (isHighlight) {
//                 if (highlightColor && Array.isArray(highlightColor)) {
//                     infomation.fontColor = 'f' + highlightColor[0];
//                     highlightColor.shift();
//                 } else {
//                     infomation.fontColor = 'f' + highlightColor;
//                 }
//             }
//             if (isHighlight || isUnderLine || isBlank) infomation = optionCheck(infomation, option);
//             const currentX2 = infomation.x + _getWordWidth(infomation.text, subG, attr) - x;
//             let splitInfo = [infomation.text];
//             if (currentX2 > cutLength) {
//                 const widths = _newSplitWidth(currentX2, cutLength);
//                 splitInfo = _getSplitInfo(infomation.text, widths, x, infomation.x);
//                 yChangeCount++;
//             }
//             splitInfo.forEach(function (el, i) {
//                 infomation.text = el;
//                 if (i !== 0) {
//                     infomation.x = x;
//                     infomation.y = y + yChangeCount * dy
//                 if (infomation.text === '\u00A0') infomation.text = '';
//                 }
//                 // console.log(infomation);
//                 if (infomation.x < x) infomation.x = x;
//                 const t = subG
//                     .text(infomation.x, infomation.y, infomation.text)
//                     .addClass(infomation.fontColor + ' ' + font)
//                     .attr({
//                         fontSize: infomation.fontSize
//                     });
//                 bbox = t.getTBox();
//                 if (isUnderLine) {
//                     const underlineC = underlineColor;
//                     subG.line(bbox.x, bbox.y2 + margin, bbox.x2, bbox.y2 + margin)
//                         .addClass('s' + underlineC)
//                         .attr({
//                             'stroke-width': fontSize * 0.05
//                         });
//                 }
//                 if (isBlank) {
//                     t.attr('opacity', 0.5);
//                     boxGap = margin * 30;
//                     subG.rect(bbox.x, bbox.y - boxGap / 4, bbox.w + boxGap, bbox.h + boxGap / 2)
//                         .addClass('f14 s' + blankColor)
//                         .attr({
//                             'stroke-width': fontSize * 0.05
//                         })
//                         .data('text', infomation.text);
//                     boxGap = boxGap + margin;
//                 } else {
//                     boxGap = 0;
//                 }
//             });
//         });
//         if (center) subG.anchor('center');
//     });

//   function remove(a, b, onlyOne) {
//         var myArray = [];
//         if (onlyOne) {
//             myArray = ESLS.ARRAY.copy(a);
//             var index = myArray.indexOf(b);
//             if (index !== -1) myArray.splice(myArray.indexOf(b), 1);
//         } else {
//             a.forEach(function (el, i) {
//                 if (el !== b) {
//                     myArray.push(el);
//                 }
//             });
//         }
//         return myArray;
//     }
//     //특정 문자열 개수 판단 함수
//     function charCount(text, searchChar) {
//         let count = 0;
//         let pos = text.indexOf(searchChar); //pos는 0의 값을 가집니다.

//         while (pos !== -1) {
//             count++;
//             pos = text.indexOf(searchChar, pos + 1); // 첫 번째 a 이후의 인덱스부터 a를 찾습니다.
//         }
//         return count;
//     }
//     //옵션 체크 함수
//     function optionCheck(info, option) {
//         let word = info.text;
//         for (let t = 0; t < option.length; t++) {
//             word = word.replace(option[t], '');
//             info.text = word;
//         }
//         return info;
//     }

//     //너비 계산 하는 함수
//     function _getWordWidth(words, group, attr) {
//         const text = group.text(0, 0, words).addClass(attr.fontColor).attr({
//             fontSize: attr.fontSize
//         });
//         const wordWidth = text.getBBox().w;
//         text.remove();
//         return wordWidth;
//     }

//     //기존 text 설정한 너비에 맞춰서 몇번 자를지 구하는 함수
//     function _newSplitWidth(wordWidth, textLength) {
//         let widths = [];
//         if (wordWidth > textLength) {
//             const limit = Math.round(wordWidth / textLength);
//             const widthArr = [];
//             for (let j = 1; j < limit + 1; j++) {
//                 widthArr.push(textLength);
//             }
//             widths = widthArr;
//         }
//         return widths;
//     }

//     //text 너비에 맞게 분리
//     function _getSplitInfo(word, lengthArr, startX, currentX) {
//         let oldWord = '';
//         let oldIndex = 0;
//         const splitWord = [];
//         let count = 0;
//         for (let i = 1; i < word.length + 1; i++) {
//             const subWord = word.substring(oldIndex, i);
//             const width = currentX + _getWordWidth(subWord, g, attr) - startX;
//             const length = lengthArr[count];
//             if (width > length) {
//                 splitWord.push(oldWord);
//                 count += 1;
//                 oldIndex = i - 1;
//             }
//             oldWord = subWord;
//         }
//         splitWord.push(word.substring(oldIndex));
//         return splitWord;
//     }

//     return g;
// };