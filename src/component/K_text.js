import { tts } from "../component";
import { footNoteImg } from "./com_image";

export const splitByOption = (textArr,opt) => {
    let optionArray = [];
    for (let i = 0; i < textArr.length; i++) {
        optionArray = optionArray.concat(_sliceOption([textArr[i]]));
    }
    return _remove(optionArray, '');

    function _sliceOption(textArray) {
        const option = opt || '$option';
        let lastText = textArray[textArray.length - 1];
        const start = lastText.indexOf(option);
        if (start === -1) return textArray;

        const end = lastText.indexOf('}', start + 1) + 1;

        textArray.pop();
        textArray = textArray.concat([lastText.substring(0, start), lastText.slice(start, end), lastText.substring(end)]);
        return _sliceOption(textArray, option);
    }

    function _remove(a, b) {
        const myArray = [];
        a.forEach(function (el) {
            if (el !== b) {
                myArray.push(el);
            }
        });
        return myArray;
    }
}

const getWordByOption = (sentences, options, index) => {
    const words = [];
    const attrs = [];
    const underlines = [];
    const boxs = [];
    const highlights = [];
    const newLines = [];
    const footnotes = [];
    const manuscriptPapers = [];
    let attrIndex = index;

    for (var i = 0; i < sentences.length; i++) {
        if (sentences[i].indexOf('option') !== -1) {
            words.push(sentences[i].slice(sentences[i].indexOf('{') + 1, sentences[i].length - 1));
            const option = options && options[attrIndex];
            // const color = (option?.color) || {};
            // const underline = (option && option.underline) || undefined;
            // const box = (option && option.box) || undefined;
            // const highlight = (option && option.highlight) || undefined;
            // const footnote = (option && option.footnote) || undefined;
            // const manuscriptPaper = option?.manuscriptPaper;
            attrs.push(option?.color || {});
            underlines.push(option?.underline);
            boxs.push(option?.box);
            highlights.push(option?.highlight);
            footnotes.push(option?.footnote);
            manuscriptPapers.push(option?.manuscriptPaper);
            attrIndex += 1;
        } else {
            words.push(sentences[i]);
            attrs.push({});
            underlines.push(undefined);
            boxs.push(undefined);
            highlights.push(undefined);
            footnotes.push(undefined);
            manuscriptPapers.push(undefined);
        }
        newLines.push(false);
    }
    return {
        words: words,
        attrs: attrs,
        underlines: underlines,
        boxs: boxs,
        highlights: highlights,
        newLines: newLines,
        footnotes:footnotes,
        manuscriptPapers:manuscriptPapers,
        attrIndex: attrIndex
    };
}

const ptToMm = (pt) => {
    return pt * 0.3528;
};

const signGap = ({
    word, 
    size,
    wordGroup,
    rectScale = 1.2
}) => {
    let wordTranslate = 0;
    const w = word[0];
    const wordW = wordGroup.getBBox().w;
    let gap = size - wordW/rectScale;
    let wordGap = 0
    if(w ==='.') wordTranslate = size/7 - wordGap;
    else if(w ==='‚') wordTranslate = size/7 - wordGap;
    else if(w ==='?') wordGap = size/8, wordTranslate = size/2 - wordGap;
    else if(w ==='!') wordGap = size/rectScale/10, wordTranslate = size/2 - wordGap;
    else if(w=== '\u00A0') gap = gap / rectScale + size/(rectScale*10) + size/10;
    else gap = gap / rectScale + size/(rectScale*10);

    return {wordTranslate, gap};
}

const exChangeOptionsForm = (options, font, fs)=>{
    let changeFormOptions=[];
    if(options) {
        options.forEach((opt,i)=>{
            let cs;
            if(opt.type==='color' && opt.classNum)  cs='f'+opt.classNum;
            else if(opt.type==='underline' && opt.classNum) cs='f'+opt.classNum+' s'+opt.classNum;
            else if(opt.type==='box' && opt.classNum) cs='f' + (opt.fillClassNum || 14) + ' s'+opt.classNum;
            else if(opt.type==='highlight' && opt.classNum) cs='f'+opt.classNum;
            else if(opt.type==='footnote') cs='f'+(opt.classNum || '000'); //각주 색 (각주를 text로 할 경우 주석 풀기)
            else if(opt.type==='manuscriptPaper' && opt.classNum) cs= 'f' + (opt.fillClassNum || 14) + ' s'+opt.classNum;

            changeFormOptions[i]={
                [opt.type]:{
                    'class': (opt.type==='color'? font+ ' ' + cs: cs), //' fs' + fs + 
                    'isBold': opt.bold || false 
                }
            }
            // (각주를 text로 할 경우 주석 풀기)
            // if(opt.type==='footnote'){
                // changeFormOptions[i].footnote.textClass = 'f' + (opt.textClassNum || '91'); //각주에 해당하는 그려진 텍스트 색
                //changeFormOptions[i].footnote.footnoteSize = opt.pointSize || 10; //각주 사이즈  
            // }
            if(opt.type==='box' && opt.boxText){ //박스 안에 텍스트를 넣고 싶을 때
                 changeFormOptions[i].box.boxText = opt.boxText;
                 changeFormOptions[i].box.fontSize = opt.fontSize;
                 changeFormOptions[i].box.boxTextClass = opt.boxTextClass || '91'; // 박스 안에 텍스트 색
            }else if(opt.fontSize){
                changeFormOptions[i][[opt.type]].fontSize = opt.fontSize;
            }
        })
    }else {
        changeFormOptions=undefined
    }
    // console.log(changeFormOptions);
    return changeFormOptions;
};

const makeFontWeight = function(arr){
    let prove = false;
    arr.forEach(el=>{
        if (el){ 
            if(!prove || Number.isInteger(el)){
                prove = el;
            }
        }
    })
    if(typeof prove==='boolean'){
        if(prove) prove = 700;
        else prove = 400;
    }
    return prove;
}

export const getYForMiddle = (midY, cl, fs) => {
    const font = cl.slice(0,4);
    let offset;
    // console.log(font);
    switch (font) {
        case 'ffnm':
        case 'ffmc':
        case 'ffdg':
            offset = fs / 8;
            break;
        case 'ffgt':
            offset = fs / 6;
            break;
        default:
            offset = fs / 5;
            break;
    }
    return midY + (fs / 2) - offset;
};

export const textRender = function ({
    canvas,
    x,
    y,
    sentence,
    dy = 0,
    attr,
    fontSize,
    textLength, //(배열일 때는 행마다 적용)
    stretch, //(배열일 때는 행마다 적용)
    options,
    lineCenter,
    letterSpacing=0,
    isBold
}) {
    const g = canvas.g();
    const lines = sentence.split('\n');
    const standardAttr = attr;
    const sentences = [];
    const boldFw = 700;
    let attrIndex = 0;

    for (let i = 0; i < lines.length; i++) {
        sentences[i] = [lines[i].replace(/\s/g, '\u00A0')];
        sentences[i] = splitByOption(sentences[i]);
        let startX = x;
        const startY = y + i * dy;
        const subG=g.g().attr('class','textLineGroup');
        const sentenceObj = getWordByOption(sentences[i], options, attrIndex);
        attrIndex = sentenceObj.attrIndex;
        const wordBBoxs = _getWordBBoxs(sentenceObj.words, sentenceObj, startY);
        const wordWidths = wordBBoxs.map(function (el) {
            return el.w;
        });
        const widthSum = wordWidths.reduce(function (a, b) {
            return a + b;
        }, 0);
        const currentTextLength = textLength ? (Array.isArray(textLength) ? (textLength[i] ? textLength[i] : undefined) : textLength) : undefined;
        const currentStretch = stretch ? (Array.isArray(stretch) ? (stretch[i] ? stretch[i] : undefined) : stretch) : undefined;
        const isTextLength = (currentTextLength && (i !== lines.length - 1 || lines.length === 1)) || (textLength && Array.isArray(textLength) && textLength[i]);

        // textLength를 우선 적용하고 없을 때 stretch 적용
        const widthRatio = isTextLength ? (currentTextLength / widthSum) : (currentStretch ? currentStretch / 100 : 1);
        for (let j = 0; j < sentenceObj.words.length; j++) {
            const newFS = sentenceObj.attrs[j].fontSize || (sentenceObj.underlines[j]?.fontSize) || (sentenceObj.highlights[j]?.fontSize) || (sentenceObj.boxs[j]?.fontSize) || (sentenceObj.footnotes[j]?.fontSize) || (sentenceObj.manuscriptPapers[j]?.fontSize) || fontSize
            const newFW = makeFontWeight([isBold , sentenceObj.attrs[j].isBold , (sentenceObj.underlines[j]?.isBold) ,  (sentenceObj.highlights[j]?.isBold) , (sentenceObj.boxs[j]?.isBold), (sentenceObj.footnotes[j]?.isBold), (sentenceObj.manuscriptPapers[j]?.isBold)])
            // const newFS = sentenceObj.attrs[j].fontSize || (sentenceObj.underlines[j]&&sentenceObj.underlines[j].fontSize) || (sentenceObj.highlights[j]&&sentenceObj.highlights[j].fontSize) || (sentenceObj.boxs[j]&&sentenceObj.boxs[j].fontSize) || (sentenceObj.footnotes[j]&&sentenceObj.footnotes[j].fontSize) || fontSize
            // const newFW = makeFontWeight([isBold , sentenceObj.attrs[j].isBold , (sentenceObj.underlines[j]&&sentenceObj.underlines[j].isBold) ,  (sentenceObj.highlights[j]&&sentenceObj.highlights[j].isBold) , (sentenceObj.boxs[j]&&sentenceObj.boxs[j].isBold), (sentenceObj.footnotes[j]&&sentenceObj.footnotes[j].isBold)])
            const newY = getYForMiddle(startY, (standardAttr.class ||sentenceObj.attrs[j].class), newFS);
            const word = subG.text(startX, newY, sentenceObj.words[j]).attr({ //21.07.22 startY -> newY
                ...standardAttr,
                ...sentenceObj.attrs[j],
                'fontSize': newFS,
                'fontWeight': newFW,
                'letterSpacing':letterSpacing
            });
            const wordLen = wordWidths[j] * widthRatio;
            if (isTextLength) {
                word.attr({
                    'textLength': wordLen,
                    'lengthAdjust': 'spacing'
                });
            } else if (stretch) {
                word.attr({
                    'textLength': wordLen,
                    'lengthAdjust': 'spacingAndGlyphs'
                });
            }

            if (sentenceObj.underlines[j]) {
                const strokeWidth = 1.5;
                const lineY = wordBBoxs[j].y2 + strokeWidth;
                if (sentenceObj.underlines[j].class) {
                    subG.line(startX, lineY, startX + wordLen, lineY).addClass(sentenceObj.underlines[j].class).attr({
                        'strokeWidth': strokeWidth 
                    });
                }
            }

            if (sentenceObj.boxs[j]) {
                if (sentenceObj.boxs[j].class) {
                    word.attr({
                        'visibility': 'hidden'
                    });
                    const boxWidth = 1.5;
                    subG.rect(startX, wordBBoxs[j].y, wordLen, wordBBoxs[j].h).addClass(sentenceObj.boxs[j].class).attr({
                        'stroke-width': boxWidth
                    });
                } 
                if(sentenceObj.boxs[j].boxText) {
                    subG.text(startX+wordLen/2, wordBBoxs[j].y + wordBBoxs[j].h/2,sentenceObj.boxs[j].boxText).addClass('ffng f'+sentenceObj.boxs[j].boxTextClass).attr({
                        'fontSize': sentenceObj.boxs[j].fontSize || wordBBoxs[j].h,
                        'fontWeight': sentenceObj.boxs[j].isBold ? boldFw : 'normal'
                    }).center()
                }
            }

            if (sentenceObj.highlights[j]?.class) {
                    subG.rect(startX, wordBBoxs[j].y, wordLen, wordBBoxs[j].h).addClass(sentenceObj.highlights[j].class).after(word);       
            }
            
            if (sentenceObj.footnotes[j]?.class) {
                    word.removeClass(word.attr('class')).addClass('ffng ' + sentenceObj.footnotes[j].class + ' footnote').data('gap',10);
                    footNoteImg().use().transform('t'+[startX+wordLen+1, wordBBoxs[j].y-1]).center().appendTo(g);
                    //각주를 text로 할 경우
                    // word.removeClass(word.attr('class')).addClass('ffng ' + sentenceObj.footnotes[j].textClass + ' footnote');
                    // subG.text(startX+wordLen-1, wordBBoxs[j].y+1,'*').addClass('ffng '+sentenceObj.footnotes[j].class + ' footnote').attr({
                    //     'fontSize': sentenceObj.footnotes[j].footnoteSize,
                    //     'fontWeight': sentenceObj.footnotes[j].isBold ? boldFw : 'normal'
                    // }).anchor('bottom');     
            }

            if(sentenceObj.manuscriptPapers[j]){
                const rectG=subG.g().addClass('manuscriptPaper').data('word',word);
                const rScale = 1.2;
                const wh = newFS * rScale;
                const rxy =newFS / 10;
                const boxStrokeWidth = 1.5;
                const {wordTranslate,gap} = signGap({"word":sentenceObj.words[j], "size":wh, "wordGroup":word, "rectScale":rScale});
                word.transform('t'+[wordTranslate,0]).attr('visibility', 'hidden'); //원고지에 들어갈 단어 위치 조정
                startX = startX + wh / 10; // 원고지 생성 앞에 띄울 간격
                rectG.rect(startX, wordBBoxs[j].y, wh, wh, rxy, rxy).addClass(sentenceObj.manuscriptPapers[j].class).attr({
                    'strokeWidth': boxStrokeWidth
                });
                rectG.line(startX, wordBBoxs[j].y + wh/2, startX + wh, wordBBoxs[j].y + wh/2).addClass(sentenceObj.manuscriptPapers[j].class).attr({
                    'strokeWidth': boxStrokeWidth,
                    'strokeDasharray': '2 1'
                })
                rectG.line(startX + wh/2, wordBBoxs[j].y, startX + wh/2, wordBBoxs[j].y + wh).addClass(sentenceObj.manuscriptPapers[j].class).attr({
                    'strokeWidth': boxStrokeWidth,
                    'strokeDasharray': '2 1'
                })
                word.before(rectG); // 원고지 위로 단어 옮기기
                startX = startX + gap // 원고지 생성 뒤에 띄울 간격
            }

            startX = startX + wordLen;
        }
        if(lineCenter) subG.anchor('center');
    }

    function _getWordBBoxs(words, opt, startY) {
        const bboxs = [];
        for (let i = 0; i < words.length; i++) {
            const newFS = opt.attrs[i].fontSize || (opt.underlines[i]?.fontSize) || (opt.highlights[i]?.fontSize) || (opt.boxs[i]?.fontSize) || (opt.footnotes[i]?.fontSize) || (opt.manuscriptPapers[i]?.fontSize) || fontSize
            const newFW = makeFontWeight([isBold, opt.attrs[i].isBold , (opt.underlines[i]?.isBold),  (opt.highlights[i]?.isBold) ,(opt.boxs[i]?.isBold), (opt.footnotes[i]?.isBold), (opt.manuscriptPapers[i]?.isBold)])
            // const newFS = opt.attrs[i].fontSize || (opt.underlines[i]&&opt.underlines[i].fontSize) || (opt.highlights[i]&&opt.highlights[i].fontSize) || (opt.boxs[i]&&opt.boxs[i].fontSize) || fontSize
            // const newFW = makeFontWeight([isBold, opt.attrs[i].isBold , (opt.underlines[i]&&opt.underlines[i].isBold),  (opt.highlights[i]&&opt.highlights[i].isBold) ,(opt.boxs[i]&&opt.boxs[i].isBold)])
            const newY = getYForMiddle(startY,(standardAttr.class || opt.attrs[i].class), newFS);
            const text = g.text(1000, newY, words[i]).attr({  //21.07.22 startY -> newY
                ...standardAttr,
                ...opt.attrs[i],
                'fontSize': newFS,
                'fontWeight': newFW,
                'letterSpacing':letterSpacing
            });
            bboxs[i] = text.getBBox();
            text.remove();
        }
        return bboxs;
    }

    return g;
};

export const K_richTextAuto = function ({
    canvas,
    x,
    y,
    className,
    opacity = 1,
    fontSize,
    dy,
    text,
    textLength,
    stretch,
    options,
    lastTextLength,
    letterSpacing=0,
    center=false,
    lineCenter=false,
    isBold=false
}) {
    const font = className.slice(0,4);
    options=exChangeOptionsForm(options,font,fontSize);
    const g = canvas.g();
    const lines = text.split('\n');
    const standardAttr ={
        'class' : className,
        'opacity': opacity
    }
    const sentences = [];
    let attrIndex = 0;
    let totLines = 0;
    let startY = y;
    for (let i = 0; i < lines.length; i++) {
        let SENTENCES = '';
        const OPTIONS = [];

        sentences[i] = [lines[i].replace(/\s/g, '\u00A0')];
        sentences[i] = splitByOption(sentences[i]);

        const sentenceObj = getWordByOption(sentences[i], options, attrIndex);
        attrIndex = sentenceObj.attrIndex;

        const wordWidths = _getWordWidths(sentenceObj.words, sentenceObj.attrs);          
        const widthSum = wordWidths.reduce(function (a, b) {
            return a + b;
        }, 0);

        if (widthSum > textLength) {
            const overInfo = _getOverInfo(wordWidths, textLength);              
            for (let k = overInfo.indexs.length - 1; k > -1; k--) {
                const oi = overInfo.indexs[k];
                const ow = overInfo.widths[k];                        
                const splitInfo = _getSplitInfo(sentenceObj.words[oi], sentenceObj.attrs[oi], ow);
                
                sentenceObj.words = _insertArr(sentenceObj.words, oi, splitInfo.words);
                sentenceObj.newLines = _insertArr(sentenceObj.newLines, oi, splitInfo.newLines);
                sentenceObj.attrs = _insertArr(sentenceObj.attrs, oi, _makeArr(sentenceObj.attrs[oi], splitInfo.words.length));
                sentenceObj.underlines = _insertArr(sentenceObj.underlines, oi, _makeArr(sentenceObj.underlines[oi], splitInfo.words.length));
                sentenceObj.boxs = _insertArr(sentenceObj.boxs, oi, _makeArr(sentenceObj.boxs[oi], splitInfo.words.length));
                sentenceObj.highlights = _insertArr(sentenceObj.highlights, oi, _makeArr(sentenceObj.highlights[oi], splitInfo.words.length));
                sentenceObj.footnotes = _insertArr(sentenceObj.footnotes, oi, _makeArr(sentenceObj.footnotes[oi], splitInfo.words.length));
                sentenceObj.manuscriptPapers = _insertArr(sentenceObj.manuscriptPapers, oi, _makeArr(sentenceObj.manuscriptPapers[oi], splitInfo.words.length));
            }
        }

        for (let n = 0; n < sentenceObj.words.length; n++) {
            let el = sentenceObj.words[n];
            let separator = '';
            const optionObj = {};
            if (sentenceObj.newLines[n] && el.charAt(0) === '\u00A0') {
                el = el.substring(1);
            }
            if (sentenceObj.newLines[n + 1]) {
                if (el.charAt(el.length - 1) === '\u00A0') {
                    el = el.substring(0, el.length - 1);
                }
                if (n !== sentenceObj.words.length - 1) separator = '\n';
            }
            SENTENCES = SENTENCES + '$option{' + el + '}' + separator;

            optionObj.color = sentenceObj.attrs[n];
            optionObj.underline = sentenceObj.underlines[n];
            optionObj.box = sentenceObj.boxs[n];
            optionObj.highlight = sentenceObj.highlights[n];
            optionObj.footnote = sentenceObj.footnotes[n];
            optionObj.manuscriptPaper = sentenceObj.manuscriptPapers[n];
            OPTIONS.push(optionObj);
        }

        const sentenceLen = SENTENCES.split('\n').length;
        let renderTextLength = (sentenceLen === 1 ? undefined : textLength);

        //마지막 줄에도 textLength 적용
        if (lastTextLength && i === lines.length - 1) renderTextLength = _makeTextLengthArray(sentenceLen);
        textRender({
            canvas: g,
            x: x,
            y: startY,
            dy: dy,
            sentence: SENTENCES,
            attr: standardAttr,
            fontSize:fontSize,
            textLength: renderTextLength,
            stretch: stretch,
            options: OPTIONS,
            lineCenter:lineCenter,
            letterSpacing:letterSpacing,
            isBold:isBold
        });

        startY = startY + _getHeight(SENTENCES);
    }
    
    if(center){ 
        const gBbox=g.getTBox()
        const transX = lineCenter? 0 : x - gBbox.cx;
        const transY = y - gBbox.cy;
        g.transform('t'+[transX,transY]).anchor('middle');
    }
    
    function _makeTextLengthArray(count) {
        const arr = [];
        for (let i = 0; i < count; i++) {
            arr.push(textLength);
        }
        return arr;
    }

    function _getHeight(sentences) {
        const curLines = sentences.split('\n').length;
        totLines += curLines;
        return curLines * dy;
    }

    function _getOverInfo(wordWidths, textLength) {
        let sum = 0;
        const indexs = [];
        const widths = [];
        for (let i = 0; i < wordWidths.length; i++) {
            sum = sum + wordWidths[i];
            if (sum > textLength) {
                const limit = Math.floor(sum / textLength);
                indexs.push(i);
                const widthArr = [];
                for (let j = 1; j < limit + 1; j++) {
                    sum = sum - textLength;
                    widthArr.push(j === 1 ? wordWidths[i] - sum : textLength);
                }
                widths.push(widthArr);
            }
        }
        return {
            indexs: indexs,
            widths: widths,
        };
    }

    function _getSplitInfo(word, attr, lengthArr) {             
        let oldWord = '';
        let oldIndex = 0;
        const splitWord = [];
        const newLines = [];
        let count = 0;
        for (let i = 1; i < word.length + 1; i++) {
            const subWord = word.substring(oldIndex, i);
            const newFW = makeFontWeight([isBold,attr.isBold])
            const text = g.text(1000, 1000, subWord).attr({ //.attr(standardAttr).attr(attr)
                ...standardAttr,
                ...attr,
                'fontSize':fontSize,
                'fontWeight': newFW,
                'letterSpacing':letterSpacing
        });
            const width = text.getBBox().w;
            text.remove();
            const length = lengthArr[count];

            if (width > length) {
                splitWord.push(oldWord);
                newLines.push(count !== 0);
                count += 1;
                oldIndex = i - 1;
            }
            oldWord = subWord;
        }
        splitWord.push(word.substring(oldIndex));
        newLines.push(true);

        if (splitWord[0] === '') {
            splitWord.shift();
            newLines.shift();
        }
        if (splitWord[splitWord.length - 1] === '') {
            splitWord.pop();
            newLines.pop();
        }

        return {
            words: splitWord,
            newLines: newLines
        };
    }

    function _makeArr(val, count) {
        const arr = [];
        for (let i = 0; i < count; i++) {
            arr.push(val);
        }
        return arr;
    }

    function _insertArr(arr, i, arr2) {
        const last = arr.slice(i + 1);
        return arr.slice(0, i).concat(arr2).concat(last);
    }

    function _getWordWidths(words, attrs) {
        const wordWidths = [];
        for (let i = 0; i < words.length; i++) {
            const newFW = makeFontWeight([isBold,attrs[i].isBold])
            const text = g.text(1000, 1000, words[i]).attr({ //.attr(standardAttr).attr(attrs[i])
                ...standardAttr,
                ...attrs[i],
                'fontSize':fontSize,
                'fontWeight': newFW,
                'letterSpacing':letterSpacing
        });
            wordWidths[i] = text.getBBox().w;
            text.remove();
        }
        return wordWidths;
    }
    return g.data('totLines', totLines);
};


export const directionText = ({
    canvas,
    ttsStartCallback,
    ttsEndCallback,
    howlerStop = true,
    textG,
    x = 80,
    y = 45,
    text,
    speakerX = 40,
    speakerY = 25,
    classNum = '000',
    fontSize = 25,
    dy = 40,
    bold = false,
    textLength,
    options
}) => {
    const speaker = tts({
        'canvas': canvas,
        'x': speakerX,
        'y': speakerY,
        'text': text,
        'howlerStop': howlerStop,
        'startCallback':ttsStartCallback,
        'endCallback':ttsEndCallback
    });

    const direction = K_richTextAuto({
        'canvas': textG || canvas,
        'text': text,
        'x': x,
        'y': y,
        'className': 'ffng f' + classNum, //선택
        'fontSize': fontSize, //선택
        'dy': dy, //선택
        'isBold': bold,
        'textLength':textLength || 790 - x,
        'options' : options
    });

    return {'tts':speaker, 'direction':direction};
}