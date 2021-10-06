> ## createElement (기본적인 엘리먼트 생성 메타 형태)

    기본 이미지,rect,circle 등 제작 시 사용

-   ### 기본 포맷

    -   `[필수]`createElement : 기본적인 엘리먼트 배열
        -   `[필수]`type : 기본적인 엘리먼트 유형(rect, circle, text, image, line 각 유형마다 메타가 다릅니다.)
        -   `[필수]`meta : 메타
            -   `[필수]`cx : x값
            -   `[필수]`cy : y값
            -   `[필수]`x : x 시작값 (유형이 line 일 때)
            -   `[필수]`y : y 시작값 (유형이 line 일 때)
            -   `[필수]`x2 : x 끝값 (유형이 line 일 때)
            -   `[필수]`y2 : y 끝값 (유형이 line 일 때)
            -   `[필수]`width : 너비 (유형이 rect 일 때)
            -   `[필수]`height : 높이 (유형이 rect 일 때)
            -   `[옵션]`rXY : round 값 (유형이 rect 일 때) `(기본:0)`
            -   `[필수]`r : 반지름 값 (유형이 circle 일 때)
            -   `[옵션]`shapeFillClassNum : 모양 채우기 색 번호 (유형이 rect, circle 일 때) `(기본:'03')`
            -   `[옵션]`shapeStrokeClassNum : 모양 선 색 번호 (유형이 rect, circle, line 일 때) `(기본:'no')`
            -   `[옵션]`shapeStrokeWidth : 모양 선 두께 (유형이 rect, circle,line 일 때) `(기본:1)`
            -   `[옵션]`shapeOpacity : 모양 투명도 (유형이 rect, circle,line 일 때) `(기본:1)`
            -   `[옵션]`shapeIsDashArray : 모양의 선을 점선으로 만들지 여부 (유형이 rect, circle, line 일 때) `(기본 : false)`
            -   `[옵션]`strokeDasharray : 모양의 선을 점선으로 만들 값을 직접 입력 `(기본:'strokeWidth/3, strokeWidth/3')`
            -   `[필수]`text : 텍스트
            -   `[옵션]`classNum : 채우기 색 번호 (유형이 text 일 때) `(기본:'91')`
            -   `[옵션]`fontSize : 폰트 크기 (유형이 text 일 때) `(기본:20)`
            -   `[옵션]`dy : 줄간격 (유형이 text 일 때) `(기본:45)`
            -   `[옵션]`bold : 폰트 두꺼운 여부 (유형이 text 일 때) `(기본:false)`
            -   `[옵션]`center : 가운데 정렬 여부 (유형이 text 일 때) `(기본:false)`
            -   `[옵션]`options : 폰트에 부여할 옵션 (유형이 text 일 때) `(기본:없음)`
            -   `[필수]`ImgUrl : 이미지 경로 (유형이 image 일 때)
            -   `[옵션]`ImgScale : 이미지 크기 (유형이 image 일 때) `(기본:0.4)`
            -   `[옵션]`shadowClassNum : 엘리먼트에 그림자 효과를 부여할 때 그림자 색상 번호 (모든 유형 가능) `(기본:없음)`
            -   `[옵션]`shadowDx : 엘리먼트에 그림자 효과를 부여할 때 x(가로 길이) 정도 (모든 유형 가능) `(기본:3)`
            -   `[옵션]`shadowDy : 엘리먼트에 그림자 효과를 부여할 때 y(세로 길이) 정도 (모든 유형 가능) `(기본:3)`
            -   `[옵션]`shadowBlur : 엘리먼트에 그림자 효과를 부여할 때 그림자의 퍼짐 정도 (모든 유형 가능) `(기본:2)`
            -   `[옵션]`shadowOpacity : 엘리먼트에 그림자 효과를 부여할 때 그림자의 투명도 (모든 유형 가능) `(기본:0.3)`

    ```javascript

    ```

> ## KM000001

    prototype (학습 만화)

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000001",
        "direction": {
            "x": 70,
            "y": 50,
            "text": "text_index_0",
            "classNum": "001",
            "fontSize": 20,
            "dy": 45,
            "bold":true
        },
        "scrollArea": {
            "x": 10,
            "y": 70,
            "x2": 790,
            "y2": 500
        },
        "scrollTextFocus": {
            "isFocus": true,
            "time": 1000,
            "term": 50
        },
        "scrollText": [{
            "text": "text_index_1",
            "cx": 90,
            "cy": 115,
            "classNum": "001",
            "fontSize": 23,
            "dy": 30
        }, {
            "text": "text_index_2",
            "cx": 290,
            "cy": 125,
            "classNum": "001",
            "fontSize": 23,
            "dy": 27
        }, {
            "text": "text_index_3",
            "cx": 450,
            "cy": 115,
            "classNum": "001",
            "fontSize": 23,
            "dy": 27
        }, {
            "text": "text_index_4",
            "cx": 650,
            "cy": 110,
            "classNum": "001",
            "fontSize": 23,
            "dy": 27
        }, {
            "text": "text_index_5",
            "cx": 285,
            "cy": 445,
            "classNum": "001",
            "fontSize": 23,
            "dy": 27
        }, {
            "text": "text_index_6",
            "cx": 520,
            "cy": 440,
            "classNum": "001",
            "fontSize": 23,
            "dy": 27
        }, {
            "text": "text_index_7",
            "cx": 155,
            "cy": 750,
            "classNum": "001",
            "fontSize": 23,
            "dy": 27
        }, {
            "text": "text_index_8",
            "cx": 340,
            "cy": 765,
            "classNum": "001",
            "fontSize": 23,
            "dy": 27
        }, {
            "text": "text_index_9",
            "cx": 490,
            "cy": 760,
            "classNum": "001",
            "fontSize": 23,
            "dy": 27
        }, {
            "text": "text_index_10",
            "cx": 480,
            "cy": 920,
            "classNum": "001",
            "fontSize": 23,
            "dy": 27
        }],
        "scrollImage": [{
            "url": "image_index_0",
            "x": 10,
            "y": 70,
            "scale": 0.93
        }],
        "okButton": {
            "type": 1,
            "cx": 400,
            "cy": 1060
        }
    }
    ```

-   > ### `[필수]` questionType | _`string`_ | 모듈 설정

    ```javascript
    "questionType": "KM000001";
    ```

    <br />

-   > ### `[옵션]` direction | _`object`_ | 지시문 설정 `(기본:지시문 없음)`

    -   `[필수]`x : 텍스트 x 위치
    -   `[필수]`y : 텍스트 y 위치
    -   `[필수]`text : 텍스트 설정
    -   `[옵션]`classNum : 폰트 클래스 넘버 `(기본:'91')`
    -   `[옵션]`fontSize : 폰트 크기 `(기본:20)`
    -   `[옵션]`dy : 줄 간격 `(기본:45)`
    -   `[옵션]`bold : 폰트 두껍게 여부 `(기본:false)`

    ```javascript
    "direction": {
        "x": 70,
        "y": 50,
        "text": "text_index_0",
        "classNum": "91",
        "fontSize": 20,
        "dy": 45,
        "bold":true
    }
    ```

    <br />

-   > ### `[옵션]` scrollArea | _`object`_ | 스크롤 영역 `(기본:[0,0,800,500])`

    -   `[옵션]`x : 포커스 영역 시작점 x위치 `(기본:10)`
    -   `[옵션]`y : 포커스 영역 시작점 y위치 `(기본:70)`
    -   `[옵션]`x2 : 포커스 영역 끝점 x위치 `(기본:790)`
    -   `[옵션]`y2 : 포커스 영역 끝점 y위치 `(기본:500)`

    ```javascript
    "scrollArea": {
        "x": 10,
        "y": 70,
        "x2": 790,
        "y2": 500
    }
    ```

    <br />

-   > ### `[옵션]` scrollTextFocus | _`object`_ | 텍스트의 포커스 유무 `(기본:포커스 없음)`

    -   `[필수]`isFocus : 포커스 여부
    -   `[옵션]`time : 포커스가 나타나는 시간 `(기본:1000)`
    -   `[옵션]`term : 포커스 사이의 간격 시간 `(기본:50)`

    ```javascript
    "scrollTextFocus": {
        "isFocus": true,
        "time": 1000,
        "term": 50
    }
    ```

    <br />

-   > ### `[옵션]` scrollText | _`array`_ | 내부 텍스트 `(기본:텍스트 없음, 존재 시 배열에 수 만큼 추가)`

    -   `[필수]`text : 텍스트 설정
    -   `[필수]`cx : 텍스트 x 위치
    -   `[필수]`cy : 텍스트 y 위치
    -   `[옵션]`classNum : 폰트 클래스 넘버 `(기본:'91')`
    -   `[옵션]`fontSize : 폰트 크기 `(기본:23)`
    -   `[옵션]`dy : 줄 간격 `(기본:27)`

    ```javascript
    "scrollText": [{
        "text": "text_index_1",
        "cx": 90,
        "cy": 115,
        "classNum": "91",
        "fontSize": 23,
        "dy": 30
    }, ...]
    ```

    <br />

-   > ### `[옵션]` scrollImage | _`array`_ | 내부 이미지 `(기본:이미지 없음, 존재 시 배열에 수 만큼 추가)`

    -   `[필수]`url : 이미지 설정
    -   `[필수]`x : 이미지 x 위치
    -   `[필수]`y : 이미지 y 위치
    -   `[필수]`scale : 이미지 크기

    ```javascript
    "scrollImage": [{
        "url": "image_index_0",
        "x": 10,
        "y": 70,
        "scale": 0.93
    }, ...]
    ```

    <br />

-   > ### `[필수]` okButton | _`object`_ | 확인 버튼

    -   `[옵션]`type : 버튼 타입 `(기본:다음버튼)`
    -   `[옵션]`cx : 텍스트 x 위치 `(기본:400)`
    -   `[옵션]`cy : 텍스트 y 위치 `(기본:1060)`

    ```javascript
    "okButton": {
        "type": 1,
        "cx": 400,
        "cy": 1060
    }
    ```

    <br />

> ## KM000002

    prototype (학습 개요)

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000002",
        "direction": {
            "x": 70,
            "y": 50,
            "text": "text_index_0",
            "classNum": "001",
            "fontSize": 20,
            "dy": 45,
            "bold":true
        },
        "rectInfo": [{
            "x": 40,
            "y": 79,
            "width": 370,
            "height": 310,
            "rx": 30,
            "ry": 30,
            "fillClassNum": "111",
            "strokeClassNum": "no",
            "opacity": 0.3
        }],
        "ellipseInfo": [{
            "x": 605,
            "y": 169,
            "rx": 50,
            "ry": 30,
            "fillClassNum": "111",
            "strokeClassNum": "no",
            "opacity": 0.3
        }, {
            "x": 500,
            "y": 299,
            "rx": 50,
            "ry": 30,
            "fillClassNum": "111",
            "strokeClassNum": "no",
            "opacity": 0.3
        }, {
            "x": 710,
            "y": 299,
            "rx": 50,
            "ry": 30,
            "fillClassNum": "111",
            "strokeClassNum": "no",
            "opacity": 0.3
        }],
        "arrowInfo": [{
            "x": 690,
            "y": 269,
            "len": 90,
            "width": 3,
            "d": 0,
            "r": 235,
            "classNum": "112"
        }, {
            "x": 570,
            "y": 194,
            "len": 90,
            "width": 3,
            "d": 0,
            "r": 125,
            "classNum": "112"
        }, {
            "x": 555,
            "y": 299,
            "len": 100,
            "width": 3,
            "d": 0,
            "r": 0,
            "classNum": "112"
        }],
        "contentText": [{
            "text": "text_index_11",
            "x": 55,
            "y": 114,
            "classNum": "001",
            "fontSize": 18,
            "dy": 35
        }, {
            "text": "text_index_12",
            "x": 60,
            "y": 189,
            "classNum": "001",
            "fontSize": 18,
            "dy": 35,
            "options": [{
                "type": "color",
                "classNum": "001",
                "bold": true
            }]
        }, {
            "text": "text_index_13",
            "x": 60,
            "y": 259,
            "classNum": "001",
            "fontSize": 18,
            "dy": 35,
            "options": [{
                "type": "color",
                "classNum": "001",
                "bold": true
            }]
        }, {
            "text": "text_index_14",
            "x": 60,
            "y": 294,
            "classNum": "001",
            "fontSize": 18,
            "dy": 35,
            "options": [{
                "type": "color",
                "classNum": "001",
                "bold": true
            }]
        }, {
            "text": "text_index_15",
            "x": 588,
            "y": 176,
            "classNum": "001",
            "fontSize": 20,
            "dy": 35,
            "bold": true
        }, {
            "text": "text_index_16",
            "x": 483,
            "y": 306,
            "classNum": "001",
            "fontSize": 20,
            "dy": 35,
            "bold": true
        }, {
            "text": "text_index_17",
            "x": 695,
            "y": 306,
            "classNum": "001",
            "fontSize": 20,
            "dy": 35,
            "bold": true
        }],
        "okButton": {
            "type": 0,
            "cx": 400,
            "cy": 450
        }
    }
    ```

-   > ### `[필수]` questionType | _`string`_ | 모듈 설정

    ```javascript
    "questionType": "KM000002";
    ```

    <br />

-   > ### `[옵션]` direction | _`object`_ | 지시문 설정 `(기본:지시문 없음)`

    -   `[필수]`x : 텍스트 x 위치
    -   `[필수]`y : 텍스트 y 위치
    -   `[필수]`text : 텍스트 설정
    -   `[옵션]`classNum : 폰트 클래스 넘버 `(기본:'91')`
    -   `[옵션]`fontSize : 폰트 크기 `(기본:20)`
    -   `[옵션]`dy : 줄 간격 `(기본:45)`
    -   `[옵션]`bold : 폰트 두껍게 여부 `(기본:false)`

    ```javascript
    "direction": {
        "x": 70,
        "y": 50,
        "text": "text_index_0",
        "classNum": "91",
        "fontSize": 20,
        "dy": 45,
        "bold":true
    }
    ```

    <br />

-   > ### `[필수]` rectInfo | _`Array`_ | 내부 사각형 (사각형 수 만큼 추가)

    -   `[필수]`x : 사각형 x 위치
    -   `[필수]`y : 사각형 y 위치
    -   `[필수]`width : 사각형 너비
    -   `[필수]`height : 사각형 높이
    -   `[옵션]`rx : x 축의 반경 `(기본:30)`
    -   `[옵션]`ry : y 축의 반경 `(기본:30)`
    -   `[옵션]`fillClassNum : 채우기 색 넘버 `(기본:'111')`
    -   `[옵션]`strokeClassNum : 선 색 넘버 `(기본:'no')`
    -   `[옵션]`opacity : 투명도 `(기본:0.3)`

    ```javascript
    "rectInfo": [{
            "x": 40,
            "y": 79,
            "width": 370,
            "height": 310,
            "rx": 30,
            "ry": 30,
            "fillClassNum": "111",
            "strokeClassNum": "no",
            "opacity": 0.3
        }, ...]
    ```

      <br />

-   > ### `[필수]` ellipseInfo | _`Array`_ | 내부 타원 (타원 수 만큼 추가)

    -   `[필수]`x : 타원 x 위치
    -   `[필수]`y : 타원 y 위치
    -   `[옵션]`rx : x 축의 반경 `(기본:50)`
    -   `[옵션]`ry : y 축의 반경 `(기본:30)`
    -   `[옵션]`fillClassNum : 채우기 색 넘버 `(기본:'111')`
    -   `[옵션]`strokeClassNum : 선 색 넘버 `(기본:'no')`
    -   `[옵션]`opacity : 투명도 `(기본:0.3)`

    ```javascript
    "ellipseInfo": [{
        "x": 605,
        "y": 169,
        "rx": 50,
        "ry": 30,
        "fillClassNum": "111",
        "strokeClassNum": "no",
        "opacity": 0.3
    }, ...]
    ```

      <br />

-   > ### `[필수]` arrowInfo | _`Array`_ | 내부 화살표 (화살표 수 만큼 추가)

    -   `[필수]`x : 타원 x 위치
    -   `[필수]`y : 타원 y 위치
    -   `[필수]`len : 화살표 길이
    -   `[옵션]`width : 화살표 두께 `(기본:3)`
    -   `[옵션]`d : 곡률 `(기본:0)`
    -   `[옵션]`r : 회전 정도 `(기본:0)`
    -   `[옵션]`classNum : 색 넘버 `(기본:'112')`

    ```javascript
    "arrowInfo": [{
        "x": 690,
        "y": 269,
        "len": 90,
        "width": 3,
        "d": 0,
        "r": 235,
        "classNum": "112"
    }, ...]
    ```

      <br />

-   > ### `[필수]` contentText | _`Array`_ | 내부 텍스트 (텍스트 수 만큼 추가)

    -   `[필수]`text : 텍스트 설정
    -   `[필수]`x : 텍스트 x 위치
    -   `[필수]`y : 텍스트 y 위치
    -   `[옵션]`classNum : 폰트 클래스 `(기본:'91')`
    -   `[옵션]`fontSize : 폰트 크기 `(기본:18)`
    -   `[옵션]`dy : 줄 간격 `(기본:35)`
    -   `[옵션]`options : 텍스트 옵션 `(기본:없음)`
        -   `[필수]`type : 텍스트 옵션 타입
        -   `[옵션]`classNum : 색상 넘버 `(기본:없음)`
        -   `[옵션]`bold : 텍스트 bold 처리 `(기본:없음)`

    ```javascript
    "contentText": [{
        "text": "text_index_12",
        "x": 60,
        "y": 189,
        "classNum": "91",
        "fontSize": 18,
        "dy": 35,
        "options": [{
            "type": "color",
            "classNum": "91",
            "bold": true
        }]
    }, ...]
    ```

      <br />

-   > ### `[필수]` okButton | _`object`_ | 확인 버튼

    -   `[옵션]`type : 버튼 타입 `(기본:확인버튼)`
    -   `[옵션]`x : 텍스트 x 위치 `(기본:400)`
    -   `[옵션]`y : 텍스트 y 위치 `(기본:450)`

    ```javascript
    "okButton": {
        "type": 0,
        "cx": 400,
        "cy": 450
    }
    ```

    <br />

> ## KM000003

    prototype (지문, 선택형 문제)

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000003",
        "guideLine": true,
        "direction": {
            "x": 70,
            "y": 50,
            "text": "text_index_0",
            "classNum": "001",
            "fontSize": 20,
            "dy": 45,
            "textLength": 0,
            "bold":true
        },
        "scrollArea": {
            "x": 20,
            "y": 80,
            "x2": 730,
            "y2": 500
        },
        "scrollText": [{
            "text": "text_index_1",
            "x": 40,
            "y": 120,
            "classNum": "001",
            "fontSize": 18,
            "dy": 40,
            "textLength": 0,
            "options": [{
                "type": "color",
                "classNum": "02",
                "bold": false
            }, {
                "type": "underline",
                "classNum": "003",
                "bold": false
            }, {
                "type": "box",
                "classNum": "001"
            }, {
                "type": "highlight",
                "classNum": "03",
                "bold": false
            }]
        }, {
            "text": "text_index_2",
            "x": 40,
            "y": 400,
            "classNum": "001",
            "fontSize": 18,
            "dy": 40,
            "textLength": 400,
            "options": [{
                "type": "color",
                "classNum": "no"
            }, {
                "type": "underline",
                "classNum": "no"
            }, {
                "type": "box",
                "classNum": "no"
            }, {
                "type": "highlight",
                "classNum": "no"
            }]
        }, {
            "text": "text_index_16",
            "x": 480,
            "y": 408,
            "isCartoon": true,
            "classNum": "001",
            "fontSize": 20,
            "dy": 20,
            "textLength": 0,
            "options": [{
                "type": "color",
                "classNum": "no"
            }, {
                "type": "underline",
                "classNum": "no"
            }, {
                "type": "box",
                "classNum": "no"
            }, {
                "type": "highlight",
                "classNum": "no"
            }]
        }, {
            "text": "text_index_17",
            "x": 180,
            "y": 580,
            "isCartoon": true,
            "classNum": "001",
            "fontSize": 20,
            "dy": 20,
            "textLength": 0,
            "options": [{
                "type": "color",
                "classNum": "no"
            }, {
                "type": "underline",
                "classNum": "no"
            }, {
                "type": "box",
                "classNum": "no"
            }, {
                "type": "highlight",
                "classNum": "no"
            }]
        }],
        "scrollImage": [{
            "url": "image_index_0",
            "x": 445,
            "y": 353,
            "scale": 0.9
        }, {
            "url": "image_index_1",
            "x": 40,
            "y": 530,
            "scale": 0.9
        }],
        "scrollTextFocus": {
            "isFocus": true,
            "time": 1000,
            "term": 50
        },
        "choiceVisible": false,
        "choiceText": {
            "text": "text_index_3",
            "x": 120,
            "y": 60,
            "classNum": "001",
            "fontSize": 20,
            "dy": 45,
            "bold":true
        },
        "choiceWord": [{
            "word": "text_index_4",
            "x": 120,
            "y": 105,
            "classNum": "001",
            "fontSize": 15,
            "dy": 40
        }, {
            "word": "text_index_5",
            "x": 120,
            "y": 145,
            "classNum": "001",
            "fontSize": 15,
            "dy": 40
        }, {
            "word": "text_index_6",
            "x": 120,
            "y": 185,
            "classNum": "001",
            "fontSize": 15,
            "dy": 40
        }, {
            "word": "text_index_7",
            "x": 120,
            "y": 225,
            "classNum": "001",
            "fontSize": 15,
            "dy": 40
        }, {
            "word": "text_index_8",
            "x": 120,
            "y": 265,
            "classNum": "001",
            "fontSize": 15,
            "dy": 40
        }],
        "choiceAns": 4,
        "hintButton": {
            "button": {
                "x": 120,
                "y": 300
            },
            "hintText": {
                "text": "text_index_15",
                "fontSize": 14,
                "classNum": "001",
                "bgFillClass": "116",
                "bgStrokeClass": "no"
            }
        }
    }
    ```

-   > ### `[필수]` questionType | _`string`_ | 모듈 설정

    ```javascript
    "questionType": "KM000003";
    ```

    <br />

-   > ### `[옵션]` direction | _`object`_ | 지시문 설정 `(기본:지시문 없음)`

    -   `[필수]`x : 텍스트 x 위치
    -   `[필수]`y : 텍스트 y 위치
    -   `[필수]`text : 텍스트 설정
    -   `[옵션]`classNum : 폰트 클래스 넘버 `(기본:'91')`
    -   `[옵션]`fontSize : 폰트 크기 `(기본:20)`
    -   `[옵션]`dy : 줄 간격 `(기본:45)`
    -   `[옵션]`bold : 폰트 두껍게 여부 `(기본:false)`

    ```javascript
    "direction": {
        "x": 70,
        "y": 50,
        "text": "text_index_0",
        "classNum": "91",
        "fontSize": 20,
        "dy": 45,
        "textLength": 0,
        "bold":true
    }
    ```

    <br />

-   > ### `[옵션]` scrollArea | _`object`_ | 스크롤 영역 `(기본:[20,80,730,500])`

    -   `[옵션]`x : 포커스 영역 시작점 x위치 `(기본:20)`
    -   `[옵션]`y : 포커스 영역 시작점 y위치 `(기본:80)`
    -   `[옵션]`x2 : 포커스 영역 끝점 x위치 `(기본:730)`
    -   `[옵션]`y2 : 포커스 영역 끝점 y위치 `(기본:500)`

    ```javascript
    "scrollArea": {
        "x": 20,
        "y": 80,
        "x2": 730,
        "y2": 500
    }
    ```

    <br />

-   > ### `[옵션]` scrollText | _`array`_ | 내부 텍스트 `(기본:텍스트 없음, 존재 시 배열에 수 만큼 추가)`

    -   `[필수]`text : 텍스트 설정
    -   `[필수]`x : 텍스트 x 위치
    -   `[필수]`y : 텍스트 y 위치
    -   `[옵션]`classNum : 폰트 클래스 넘버 `(기본:'91')`
    -   `[옵션]`fontSize : 폰트 크기 `(기본:18)`
    -   `[옵션]`dy : 줄 간격 `(기본:40)`
    -   `[옵션]`textLength : 한 줄의 텍스트 길이 `(기본:스크롤 영역의 너비 - x)`
    -   `[옵션]`options : 텍스트 옵션 `(기본:false)`
        -   `[필수]`type : 텍스트 옵션 타입
        -   `[옵션]`classNum : 색상 넘버 `(기본:없음)`
        -   `[옵션]`bold : 텍스트 bold 처리 `(기본:없음)`
    -   `[옵션]`isCartoon : 이미지에 들어가는 텍스트 여부 `(기본:false)`

    ```javascript
    "scrollText": [{
        "text": "text_index_1",
        "x": 40,
        "y": 120,
        "classNum": "91",
        "fontSize": 18,
        "dy": 40,
        "textLength": 0,
        "options": [{
            "type": "color",
            "classNum": "02",
            "bold": false
        }, {
            "type": "underline",
            "classNum": "003",
            "bold": false
        }, {
            "type": "box",
            "classNum": "91"
        }, {
            "type": "highlight",
            "classNum": "03",
            "bold": false
        }]
    }, ...]
    ```

    <br />

-   > ### `[옵션]` scrollImage | _`array`_ | 내부 이미지 `(기본:이미지 없음, 존재 시 배열에 수 만큼 추가)`

    -   `[필수]`url : 이미지 설정
    -   `[필수]`x : 이미지 x 위치
    -   `[필수]`y : 이미지 y 위치
    -   `[필수]`scale : 이미지 크기

    ```javascript
    "scrollImage": [{
        "url": "image_index_0",
        "x": 445,
        "y": 353,
        "scale": 0.9
    }, ...]
    ```

    <br />

-   > ### `[옵션]` scrollTextFocus | _`object`_ | 텍스트의 포커스 유무 `(기본:포커스 없음)`

    -   `[필수]`isFocus : 포커스 여부
    -   `[옵션]`time : 포커스가 나타나는 시간 `(기본:1000)`
    -   `[옵션]`term : 포커스 사이의 간격 시간 `(기본:50)`

    ```javascript
    "scrollTextFocus": {
        "isFocus": true,
        "time": 1000,
        "term": 50
    }
    ```

    <br />

-   > ### `[옵션]` choiceVisible | _`boolean`_ | 문제가 먼저 보여질 지 여부 `(기본:false)`

    ```javascript
    "choiceVisible": false
    ```

    <br />

-   > ### `[필수]` choiceText | _`object`_ | 문제 부분 지시문

    -   `[필수]`text : 텍스트 설정
    -   `[필수]`x : 텍스트 x 위치
    -   `[필수]`y : 텍스트 y 위치
    -   `[옵션]`classNum : 폰트 클래스 넘버`(기본:'91')`
    -   `[옵션]`fontSize : 폰트 크기 `(기본:20)`
    -   `[옵션]`dy : 줄 간격 `(기본:45)`
    -   `[옵션]`bold : 폰트 두껍게 여부 `(기본:false)`

    ```javascript
    "choiceText": {
        "text": "text_index_3",
        "x": 120,
        "y": 60,
        "classNum": "91",
        "fontSize": 20,
        "dy": 45,
        "bold":true
    }
    ```

    <br />

-   > ### `[필수]` choiceWord | _`array`_ | 문제 부분 텍스트 선택지 (텍스트 수 만큼 추가)

    -   `[필수]`word : 텍스트 설정
    -   `[필수]`x : 텍스트 x 위치
    -   `[필수]`y : 텍스트 y 위치
    -   `[옵션]`classNum : 폰트 클래스 넘버 `(기본:'91')`
    -   `[옵션]`fontSize : 폰트 크기 `(기본:15)`
    -   `[옵션]`dy : 줄 간격 `(기본:40)`

    ```javascript
    "choiceWord": [{
        "word": "text_index_4",
        "x": 120,
        "y": 105,
        "classNum": "91",
        "fontSize": 15,
        "dy": 40
    }, ...]
    ```

    <br />

-   > ### `[필수]` choiceAns | _`number, array`_ | 정답 인덱스 (다중 정답일 때 배열)

    ```javascript
     "choiceAns": 4
    ```

    <br />

-   > ### `[필수]` hintButton | _`object`_ | 문제 부분 힌트 버튼

    -   `[필수]`button : 버튼에 대한 정보
        -   `[필수]`x : 버튼의 x 위치
        -   `[필수]`y : 버튼의 y 위치
    -   `[필수]`hintText : 버튼에 연결한 text
        -   `[필수]`text : 힌트로 나타날 텍스트
        -   `[옵션]`fontSize : 텍스트 사이즈 `(기본:14)`
        -   `[옵션]`classNum : 텍스트 클래스 넘버 `(기본:'91')`
        -   `[옵션]`bgFillClass : 힌트 버튼 배경 색 넘버 `(기본:'116')`
        -   `[옵션]`bgStrokeClass : 힌트 버튼 선 색 넘버 `(기본:'no')`

    ```javascript
    "hintButton": {
        "button": {
            "x": 120,
            "y": 300
        },
        "hintText": {
            "text": "text_index_15",
            "fontSize": 14,
            "classNum": "91",
            "bgFillClass": "116",
            "bgStrokeClass": "no"
        }
    }
    ```

    <br />

> ## KM000004

    prototype (낱자 개념)

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000004",
        "direction": {
            "x": 70,
            "y": 50,
            "text": "text_index_0",
            "classNum": "001",
            "fontSize": 20,
            "dy": 45,
            "bold":true
        },
        "keyWord": {
            "cx": 400,
            "cy": 150,
            "word": "text_index_1",
            "wordClassNum": "001",
            "scale": 1.5,
            "bgFillClassNum": "114",
            "bgStrokeClassNum": "115"
        },
        "listenButton": {
            "cx": 400,
            "cy": 325,
            "width": 600,
            "height": 130,
            "text": {
                "text": "text_index_2",
                "fontClassNum": "001",
                "fontSize": 24,
                "bold": true
            },
            "image": {
                "url": "image_index_1"
            },
            "sound": {
                "url": "sound_index_0"
            }
        },
        "okButton": {
            "type": 0,
            "cx": 400,
            "cy": 450
        }
    }
    ```

-   > ### `[필수]` questionType | _`string`_ | 모듈 설정

    ```javascript
    "questionType": "KM000004",
    ```

    <br />

-   > ### `[옵션]` direction | _`object`_ | 지시문 설정 `(기본:지시문 없음)`

    -   `[필수]`x : 텍스트 x 위치
    -   `[필수]`y : 텍스트 y 위치
    -   `[필수]`text : 텍스트 설정
    -   `[옵션]`classNum : 폰트 클래스 넘버`(기본:'91')`
    -   `[옵션]`fontSize : 폰트 크기 `(기본:20)`
    -   `[옵션]`dy : 줄 간격 `(기본:45)`
    -   `[옵션]`bold : 폰트 두껍게 여부 `(기본:false)`

    ```javascript
    "direction": {
        "x": 70,
        "y": 50,
        "text": "text_index_0",
        "classNum": "91",
        "fontSize": 20,
        "dy": 45,
        "bold":true
    }
    ```

    <br />

-   > ### `[필수]` keyWord | _`object`_ | 낱자 설정

    -   `[필수]`cx : 낱자 x위치
    -   `[필수]`cy : 낱자 y위치
    -   `[필수]`word : 낱자 텍스트 설정
    -   `[옵션]`wordClassNum : 낱자 색깔 `(기본:'001')`
    -   `[옵션]`scale : 낱자가 포함된 영역 크기 `(기본:1)`
    -   `[옵션]`bgFillClassNum : 배경 채우기 색상 넘버 `(기본:'114')`
    -   `[옵션]`bgStrokeClassNum : 배경 선 색상 넘버 `(기본:'115')`

    ```javascript
    "keyWord": {
        "cx": 400,
        "cy": 150,
        "word": "text_index_1",
        "wordClassNum": "001",
        "scale": 1.5,
        "bgFillClassNum": "114",
        "bgStrokeClassNum": "115"
    }
    ```

    <br />

-   > ### `[필수]` listenButton | _`object`_ | 낱자 듣기 버튼

    -   `[필수]`cx : 듣기 버튼 x 좌표
    -   `[필수]`cy : 듣기 버튼 y 좌표
    -   `[필수]`width : 듣기 버튼 너비
    -   `[필수]`height : 듣기 버튼 높이
    -   `[필수]`text : 버튼 안에 들어갈 설명 텍스트 정보
        -   `[필수]`text : 설명 텍스트
        -   `[옵션]`fontClassNum : 설명 텍스트 색상 `(기본:'91')`
        -   `[옵션]`fontSize : 설명 텍스트 크기 `(기본:23)`
        -   `[옵션]`bold : 설명 텍스트 두껍운 정도 여부 `(기본:false)`
    -   `[필수]`image : 낱자 읽기에 대한 이미지 정보
        -   `[필수]`url : 이미지 설정
    -   `[필수]`sound : 낱자에 대한 사운드 정보
        -   `[필수]`url : 사운드 설정

    ```javascript
    "listenButton": {
        "cx": 400,
        "cy": 325,
        "width": 600,
        "height": 130,
        "text": {
            "text": "text_index_2",
            "fontClassNum": "91",
            "fontSize": 24,
            "bold": true
        },
        "image": {
            "url": "image_index_1"
        },
        "sound": {
            "url": "sound_index_0"
        }
    }
    ```

    <br />

-   > ### `[필수]` okButton | _`object`_ | 확인 버튼

    -   `[옵션]`type : 버튼 타입 `(기본:확인버튼)`
    -   `[옵션]`cx : 텍스트 x 위치 `(기본:400)`
    -   `[옵션]`cy : 텍스트 y 위치 `(기본:450)`

    ```javascript
    "okButton": {
        "type": 0,
        "cx": 400,
        "cy": 450
    }
    ```

> ## KM000005

    prototype (choice)

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000005",
        "direction": {
            "x": 70,
            "y": 50,
            "text": "text_index_3",
            "classNum": "001",
            "fontSize": 20,
            "dy": 45,
            "bold":true
        },
        "backGround": {
            "exist": true,
            "x": 100,
            "y": 100,
            "width": 600,
            "hight": 300,
            "fillClassNum": "111",
            "strokeClassNum": "no",
            "center": false
        },
        "choiceElement": [{
            "backImage": {
                "url": "image_index_0",
                "scale": "0.4",
                "cx": 250,
                "cy": 170
            },
            "text": {
                "text": "text_index_1",
                "cx": 250,
                "cy": 170,
                "classNum": "001",
                "fontSize": 40
            },
            "rotate": -20,
            "isAns": true,
            "fbSize": 40,
            "fbStrokeWidth": 2
        }, {
            "backImage": {
                "url": "image_index_0",
                "scale": 0.4,
                "cx": 400,
                "cy": 160
            },
            "text": {
                "text": "text_index_1",
                "cx": 400,
                "cy": 160,
                "classNum": "001",
                "fontSize": 40
            },
            "rotate": 0,
            "isAns": true,
            "fbSize": 40,
            "fbStrokeWidth": 2
        }, {
            "backImage": {
                "url": "image_index_0",
                "scale": 0.4,
                "cx": 570,
                "cy": 170
            },
            "text": {
                "text": "text_index_4",
                "cx": 570,
                "cy": 170,
                "classNum": "001",
                "fontSize": 40
            },
            "rotate": 20,
            "isAns": false,
            "fbSize": 40,
            "fbStrokeWidth": 2
        }, {
            "backImage": {
                "url": "image_index_0",
                "scale": 0.4,
                "cx": 340,
                "cy": 240
            },
            "text": {
                "text": "text_index_4",
                "cx": 340,
                "cy": 240,
                "classNum": "001",
                "fontSize": 40
            },
            "rotate": -20,
            "isAns": false,
            "fbSize": 40,
            "fbStrokeWidth": 2
        }, {
            "backImage": {
                "url": "image_index_0",
                "scale": 0.4,
                "cx": 480,
                "cy": 240
            },
            "text": {
                "text": "text_index_4",
                "cx": 480,
                "cy": 240,
                "classNum": "001",
                "fontSize": 40
            },
            "rotate": 20,
            "isAns": false,
            "fbSize": 40,
            "fbStrokeWidth": 2
        }, {
            "backImage": {
                "url": "image_index_0",
                "scale": 0.4,
                "cx": 255,
                "cy": 320
            },
            "text": {
                "text": "text_index_4",
                "cx": 255,
                "cy": 320,
                "classNum": "001",
                "fontSize": 40
            },
            "rotate": 10,
            "isAns": false,
            "fbSize": 40,
            "fbStrokeWidth": 2
        }, {
            "backImage": {
                "url": "image_index_0",
                "scale": 0.4,
                "cx": 390,
                "cy": 330
            },
            "text": {
                "text": "text_index_1",
                "cx": 390,
                "cy": 330,
                "classNum": "001",
                "fontSize": 40
            },
            "rotate": 0,
            "isAns": true,
            "fbSize": 40,
            "fbStrokeWidth": 2
        }, {
            "backImage": {
                "url": "image_index_0",
                "scale": 0.4,
                "cx": 550,
                "cy": 310
            },
            "text": {
                "text": "text_index_1",
                "cx": 550,
                "cy": 310,
                "classNum": "001",
                "fontSize": 40
            },
            "rotate": -15,
            "isAns": true,
            "fbSize": 40,
            "fbStrokeWidth": 2
        }]
    }
    ```

-   > ### `[필수]` questionType | _`string`_ | 모듈 설정

    ```javascript
    "questionType": "KM000005";
    ```

    <br />

-   > ### `[옵션]` direction | _`object`_ | 지시문 설정 `(기본:지시문 없음)`

    -   `[필수]`x : 텍스트 x 위치
    -   `[필수]`y : 텍스트 y 위치
    -   `[필수]`text : 텍스트 설정
    -   `[옵션]`classNum : 폰트 클래스 넘버 `(기본:'91')`
    -   `[옵션]`fontSize : 폰트 크기 `(기본:20)`
    -   `[옵션]`dy : 줄 간격 `(기본:45)`
    -   `[옵션]`bold : 폰트 두껍게 여부 `(기본:false)`

    ```javascript
    "direction": {
        "x": 70,
        "y": 50,
        "text": "text_index_3",
        "classNum": "91",
        "fontSize": 20,
        "dy": 45,
        "bold":true
    }
    ```

    <br />

-   > ### `[옵션]` backGround | _`object`_ | 배경 `(기본:배경 없음)`

    -   `[필수]`exist : 배경 존재 여부
    -   `[필수]`x : 배경의 x 위치
    -   `[필수]`y : 배경의 y 위치
    -   `[필수]`width : 너비
    -   `[필수]`hight : 높이
    -   `[옵션]`fillClassNum : 채우기 색 클래스 넘버 `(기본:'111')`
    -   `[옵션]`strokeClassNum : 선 색 클래스 넘버 `(기본:'no')`
    -   `[옵션]`center : 좌표의 가운데에 위치할 지 여부 `(기본:false)`

    ```javascript
    "backGround": {
        "exist": true,
        "x": 100,
        "y": 100,
        "width": 600,
        "hight": 300,
        "fillClassNum": "111",
        "strokeClassNum": "no",
        "center": false
    }
    ```

      <br />

-   > ### `[필수]` choiceElement | _`array`_ | 고르기 엘리먼트 (엘리먼트 수 만큼 추가)

    -   `[필수]`backImage : 엘리먼트 이미지
        -   `[필수]`url : 이미지 인덱스
        -   `[옵션]`scale : 크기 `(기본:1)`
        -   `[필수]`cx : 배경 x 위치
        -   `[필수]`cy : 배경 y 위치
    -   `[필수]`text : 엘리먼트 텍스트 정보
        -   `[필수]`text : 텍스트
        -   `[필수]`cx : x 위치
        -   `[필수]`cy : y 위치
        -   `[필수]`classNum : 색상 넘버 `(기본:'001')`
        -   `[필수]`fontSize : 폰트 크기 `(기본:backImage의 너비와 높이 중 최소 값의 0.7배)`
    -   `[옵션]`rotate : 회전 정도 `(기본:0)`
    -   `[필수]`isAns : 정답 유무
    -   `[필수]`fbSize : 피드백 사이즈
    -   `[필수]`fbStrokeWidth : 피드백 선 두께

    ```javascript
    "choiceElement": [{
        "backImage": {
            "url": "image_index_0",
            "scale": "0.4",
            "cx": 250,
            "cy": 170
        },
        "text": {
            "text": "text_index_1",
            "cx": 250,
            "cy": 170,
            "classNum": "001",
            "fontSize": 40
        },
        "rotate": -20,
        "isAns": true,
        "fbSize": 40,
        "fbStrokeWidth": 2
    }, ...]
    ```

    <br />

> ## KM000006

    prototype (trace)

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000006",
        "direction": {
            "x": 70,
            "y": 50,
            "text": "text_index_5",
            "classNum": "001",
            "fontSize": 20,
            "dy": 45,
            "bold":true
        },
        "animateValue": {
            "text": "text_index_1",
            "cx": 225,
            "cy": 280,
            "scale": 0.9,
            "background": {
                "width": 300,
                "height": 300,
                "fillClassNum": "117",
                "strokeClassNum": "no",
                "opacity": 1
            }
        },
        "traceValue": {
            "text": "text_index_1",
            "cx": 575,
            "cy": 280,
            "scale": 1,
            "repeat": "4",
            "background": {
                "width": 300,
                "height": 300,
                "fillClassNum": {
                    "basic": "117",
                    "start": "14"
                },
                "strokeClassNum": {
                    "basic": "01",
                    "start": "01"
                },
                "opacity": 1
            },
            "sound": {
                "url": "sound_index_1"
            }
        }
    }
    ```

-   > ### `[필수]` questionType | _`string`_ | 모듈 설정

    ```javascript
    "questionType": "KM000006";
    ```

    <br />

-   > ### `[옵션]` direction | _`object`_ | 지시문 설정 `(기본:지시문 없음)`

    -   `[필수]`x : 텍스트 x 위치
    -   `[필수]`y : 텍스트 y 위치
    -   `[필수]`text : 텍스트 설정
    -   `[옵션]`classNum : 폰트 클래스 넘버`(기본:'91')`
    -   `[옵션]`fontSize : 폰트 크기 `(기본:20)`
    -   `[옵션]`dy : 줄 간격 `(기본:45)`
    -   `[옵션]`bold : 폰트 두껍게 여부 `(기본:false)`

    ```javascript
    "direction": {
        "x": 70,
        "y": 50,
        "text": "text_index_5",
        "classNum": "91",
        "fontSize": 20,
        "dy": 45,
        "bold":true
    }
    ```

    <br />

-   > ### `[필수]` animateValue | _`object`_ | 낱자 쓰기 애니메이션

    -   `[필수]`text : 낱자 텍스트
    -   `[필수]`cx : 낱자 x좌표
    -   `[필수]`cy : 낱자 y좌표
    -   `[옵션]`scale : 낱자 크기 `(기본:1)`
    -   `[옵션]`background : 배경 `(기본:false)`
        -   `[필수]`width : 너비
        -   `[필수]`height : 높이
        -   `[옵션]`fillClassNum : 채우기 클래스 넘버 `(기본:'117')`
        -   `[옵션]`strokeClassNum : 선 클래스 넘버 `(기본:'no')`
        -   `[옵션]`opacity : 배경 투명도 `(기본:1)`

    ```javascript
    "animateValue": {
        "text": "text_index_1",
        "cx": 225,
        "cy": 280,
        "scale": 0.9,
        "background": {
            "width": 300,
            "height": 300,
            "fillClassNum": "117",
            "strokeClassNum": "no",
            "opacity": 1
        }
    }
    ```

      <br />

-   > ### `[필수]` traceValue | _`object`_ | 낱자 따라 쓰기

    -   `[필수]`text : 낱자 텍스트
    -   `[필수]`cx : 낱자 x좌표
    -   `[필수]`cy : 낱자 y좌표
    -   `[옵션]`scale : 낱자 크기 `(기본:1)`
    -   `[필수]`repeat : 쓰기 횟수
    -   `[옵션]`background : 배경 `(기본:false)`
        -   `[필수]`width : 배경 너비
        -   `[필수]`height : 배경 높이
        -   `[옵션]`fillClassNum : 채우기 클래스 정보
            -   `[옵션]`basic : 초기 채우기 클래스 넘버 `(기본:'117')`
            -   `[옵션]`start : trace 시작 후 채우기 클래스 넘버 `(기본:'14')`
        -   `[옵션]`strokeClassNum : 선 클래스 정보
            -   `[옵션]`basic : 초기 선 클래스 넘버 `(기본:'01')`
            -   `[옵션]`start : trace 시작 후 선 클래스 넘버 `(기본:'01')`
        -   `[옵션]`opacity : 투명도 `(기본:1)`
    -   `[필수]`sound : 낱자에 대한 사운드
        -   `[필수]`url : 사운드 설정

    ```javascript
    "traceValue": {
        "text": "text_index_1",
        "cx": 575,
        "cy": 280,
        "scale": 1,
        "repeat": "4",
        "background": {
            "width": 300,
            "height": 300,
            "fillClassNum": {
                "basic": "117",
                "start": "14"
            },
            "strokeClassNum": {
                "basic": "01",
                "start": "01"
            },
            "opacity": 1
        },
        "sound": {
            "url": "sound_index_1"
        }
    }
    ```

    <br />

> ## KM000007

    match 유형

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000007",
        "direction": {
            "x": 70,
            "y": 50,
            "text": "text_index_0",
            "classNum": "001",
            "fontSize": 20,
            "dy": 45,
            "bold":true
        },
        "connectElement": {
            "left": [{
                "x": 70,
                "y": 170,
                "btnWidth": 260,
                "btnHeight": 160,
                "btnFillClassNum": "14",
                "btnStrokeClassNum": "117",
                "image": {
                    "url": "image_index_0",
                    "scale": 0.2
                },
                "connectAnsIndex": 1,
                "connectDotOffsets":{
                    "x":30,
                    "y":0
                }
            }],
            "right": [{
                "text": "text_index_1",
                "x": 610,
                "y": 125,
                "scale": 1,
                "boxWidth": 120,
                "boxHeight": 50,
                "boxFillClassNum": "111",
                "boxStrokeClassNum": "no",
                "boxOpacity": 0.3,
                "connectDotOffsets":{
                    "x":-30,
                    "y":0
                }
            }, {
                "text": "text_index_2",
                "x": 610,
                "y": 325,
                "scale": 1,
                "boxWidth": 120,
                "boxHeight": 50,
                "boxFillClassNum": "111",
                "boxStrokeClassNum": "no",
                "boxOpacity": 0.3,
                "connectDotOffsets":{
                    "x":-30,
                    "y":0
                }
            }],
            "lineClassNum":"04"
        }
    }
    ```

-   > ### `[필수]` questionType | _`string`_ | 모듈 설정

    ```javascript
    "questionType": "KM000007";
    ```

    <br />

-   > ### `[옵션]` direction | _`object`_ | 지시문 설정 `(기본:지시문 없음)`

    -   `[필수]`x : 텍스트 x 위치
    -   `[필수]`y : 텍스트 y 위치
    -   `[필수]`text : 텍스트 설정
    -   `[옵션]`classNum : 폰트 클래스 넘버 `(기본:'91')`
    -   `[옵션]`fontSize : 폰트 크기 `(기본:20)`
    -   `[옵션]`dy : 줄 간격 `(기본:45)`
    -   `[옵션]`bold : 폰트 두껍게 여부 `(기본:false)`

    ```javascript
     "direction": {
        "x": 70,
        "y": 50,
        "text": "text_index_0",
        "classNum": "91",
        "fontSize": 20,
        "dy": 45,
        "bold":true
    }
    ```

    <br />

-   > ### `[필수]` connectElement | _`object`_ | 연결하기 엘리먼트

    -   `[필수]`left : 왼쪽 엘리먼트
        -   `[필수]`x : x 위치
        -   `[필수]`y : y 위치
        -   `[필수]`btnWidth : 너비
        -   `[필수]`btnHeight : 높이
        -   `[옵션]`btnFillClassNum : 채우기 색 넘버 `(기본:'14')`
        -   `[옵션]`btnStrokeClassNum : 선 색 넘버 `(기본:'117')`
        -   `[필수]`image : 버튼에 들어갈 이미지
            -   `[필수]`url : 이미지 설정
            -   `[옵션]`scale : 이미지 크기 `(기본:1)`
        -   `[필수]`connectAnsIndex : 연결할 오른쪽 엘리먼트 인덱스
    -   `[필수]`right : 오른쪽 엘리먼트
        -   `[필수]`text : 텍스트 설정
        -   `[필수]`x : 텍스트 x 위치
        -   `[필수]`y : 텍스트 y 위치
        -   `[선택]`fontSize : 폰트 크기 `(기본:25)`
        -   `[선택]`fontClassNum : 폰트 색상 `(기본:91)`
        -   `[선택]`dy : 줄 간격 `(기본:40)`
        -   `[선택]`boxWidth : 박스 너비 `(기본: 120 * scale 값)`
        -   `[선택]`boxHeight : 박스 높이 `(기본:'50 * scale 값')`
        -   `[선택]`boxFillClassNum : 박스 클래스 넘버 `(기본:'111')`
        -   `[선택]`boxStrokeClassNum : 박스 클래스 넘버 `(기본:'no')`
        -   `[선택]`boxOpacity : 박스 투명도 `(기본:1)`

    ```javascript

    "connectElement": {
        "left": [{
            "x": 70,
            "y": 170,
            "btnWidth": 260,
            "btnHeight": 160,
            "btnFillClassNum": "14",
            "btnStrokeClassNum": "117",
            "image": {
                "url": "image_index_0",
                "scale": 0.2
            },
            "connectAnsIndex": 1
        }],
        "right": [{
            "text": "text_index_1",
            "x": 610,
            "y": 125,
            "fontSize": 25,
            "fontClassNum":"91",
            "dy":40,
            "boxWidth": 120,
            "boxHeight": 50,
            "boxFillClassNum": "111",
            "boxStrokeClassNum": "no",
            "boxOpacity": 0.3
        }, ...]
    ```

      <br />

> ## KM000008

    write 유형

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000008",
        "direction": {
            "x": 70,
            "y": 50,
            "text": "text_index_0",
            "classNum": "001",
            "fontSize": 20,
            "dy": 45,
            "bold":true
        },
        "imageButton": [{
            "url": "image_index_0",
            "cx": 250,
            "cy": "165",
            "scale": 0.22
        }, {
            "url": "image_index_1",
            "cx": 250,
            "cy": "165",
            "scale": 0.17
        }, {
            "url": "image_index_2",
            "cx": 340,
            "cy": "120",
            "scale": 0.8
        }],
        "textBox": {
            "cx": 250,
            "cy": 330,
            "textInfo": {
                "text": "text_index_2",
                "scale": "0.5",
                "blankIndex": 0,
                "blankOffset" :{
                    "x":0,
                    "y":0
                },
                "blankQmark" : false,
                "blankVisible" : false
            },
            "box": {
                "width": 220,
                "height": 110,
                "fillClassNum": "14",
                "strokeClassNum": "03",
                "opacity": 1,
                "strokeWidth": "5"
            }
        },
        "handWrite": {
            "writeBox": {
                "x": 400,
                "y": 85,
                "width": 250,
                "height": 300,
                "drawClassNum": "001",
                "boxFillClassNum": "111",
                "boxStrokeClassNum": "01",
                "boxOpacity": 0.3,
                "directionSize": 15,
                "directionClassNum": "01"
            },
            "okButton": {
                "type": 0,
                "cx": 400,
                "cy": 450
            },
            "answer": "text_index_1",
            "sound": {
                "url": "sound_index_0"
            }
        }
    }
    ```

-   > ### `[필수]` questionType | _`string`_ | 모듈 설정

    ```javascript
    "questionType": "KM000008";
    ```

    <br />

-   > ### `[옵션]` direction | _`object`_ | 지시문 설정 `(기본:지시문 없음)`

    -   `[필수]`x : 텍스트 x 위치
    -   `[필수]`y : 텍스트 y 위치
    -   `[필수]`text : 텍스트 설정
    -   `[옵션]`classNum : 폰트 클래스 넘버 `(기본:'91')`
    -   `[옵션]`fontSize : 폰트 크기 `(기본:20)`
    -   `[옵션]`dy : 줄 간격 `(기본:45)`
    -   `[옵션]`bold : 폰트 두껍게 여부 `(기본:false)`

    ```javascript
    "direction": {
        "x": 70,
        "y": 50,
        "text": "text_index_0",
        "classNum": "91",
        "fontSize": 20,
        "dy": 45,
        "bold":true
    }
    ```

    <br />

-   > ### `[필수]` imageButton | _`array`_ | 이미지 버튼

    -   `[필수]`url : 이미지 설정
    -   `[필수]`cx : 버튼의 x 위치
    -   `[필수]`cy : 버튼의 y 위치
    -   `[필수]`scale : 버튼 크기

    ```javascript

    "imageButton": [{
        "url": "image_index_0",
        "cx": 250,
        "cy": 165,
        "scale": 0.22
    }, ...],
    ```

      <br />

-   > ### `[필수]` textBox | _`object`_ | 태그

    -   `[필수]`cx : 텍스트 이미지의 cx
    -   `[필수]`cy : 텍스트 이미지의 cy
    -   `[필수]`textInfo : 글자 패스 정보
        -   `[필수]`text : 글자 패스에 매치 할 텍스트
        -   `[선택]`scale : 이미지 크기 `(기본:1)`
        -   `[필수]`blankIndex : 숨기는 낱자 인덱스(전체 글자에서 자음,모음 구분하여 계산),
        -   `[선택]`blankOffset : 빈칸 부분 조정 값
            -   `[선택]`x : x 값
            -   `[선택]`y : y 값
        -   `[선택]`blankQmark : 빈칸 안에 물음표 여부
        -   `[선택]`blankVisible : 빈칸이 보일 지 여부
    -   `[필수]`box : 박스 정보
        -   `[선택]`exist : 박스 존재 여부 `(기본:true)`
        -   `[선택]`width : 박스 너비 `(기본:220)`
        -   `[선택]`height : 박스 높이 `(기본:110)`
        -   `[선택]`fillClassNum : 박스 채우기 색 넘버 `(기본:'14')`
        -   `[선택]`strokeClassNum : 박스 선 색 넘버 `(기본:'03')`
        -   `[선택]`opacity : 박스 투명도 `(기본:1)`
        -   `[선택]`strokeWidth : 박스 선 굵기 `(기본:5)`

    ```javascript
    "textBox": {
        "cx": 250,
        "cy": 330,
        "textInfo": {
            "text": "text_index_2",
            "scale": "0.5",
            "blankIndex": 0,
            "blankOffset" :{
                "x":0,
                "y":0
            },
            "blankQmark" : false,
            "blankVisible" : false
        },
        "box": {
            "exist": true,
            "width": 220,
            "height": 110,
            "fillClassNum": "14",
            "strokeClassNum": "03",
            "opacity": 1,
            "strokeWidth": 5
        }
    }
    ```

      <br />

-   > ### `[필수]` handWrite | _`object`_ | 태그

    -   `[필수]`writeBox : handWrite 박스
        -   `[선택]`x : handWrite 박스 x `(기본:400)`
        -   `[선택]`y : handWrite 박스 y `(기본:70)`
        -   `[선택]`width : handWrite 박스 너비 `(기본:250)`
        -   `[선택]`height : handWrite 박스 높이 `(기본:280)`
        -   `[선택]`direction : handWrite 영역 안내 텍스트 `(기본:true)`
        -   `[선택]`drawClassNum : handWrite시 패스 두께 `(기본:10)`
        -   `[선택]`boxFillClassNum : handWrite 박스 채우기 색 넘버 `(기본:'111')`
        -   `[선택]`boxStrokeClassNum : handWrite 박스 선 색 넘버 `(기본:'01')`
        -   `[선택]`boxOpacity : handWrite 박스 안에 텍스트 `(기본:1)`
        -   `[선택]`directionSize : handWrite 영역 안내 텍스트 크기 `(기본:14)`
        -   `[선택]`directionClassNum : handWrite 영역 안내 텍스트 색 `(기본:'01')`
    -   `[필수]`okButton : ok버튼
        -   `[선택]`type: ok버튼 유형 `(기본: 확인 버튼)`
        -   `[선택]`cx : ok버튼 x 위치 `(기본:400)`
        -   `[선택]`cy : ok버튼 y 위치 `(기본:450)`
    -   `[필수]`answer : 정답
    -   `[필수]`sound : 낱자 사운드
        -   `[필수]`url : 사운드 설정

    ```javascript
    "handWrite": {
        "writeBox": {
            "x": 400,
            "y": 85,
            "width": 250,
            "height": 300,
            "direction":true,
            "drawClassNum": "001",
            "boxFillClassNum": "111",
            "boxStrokeClassNum": "01",
            "boxOpacity": 0.3,
            "directionSize": 15,
            "directionClassNum": "01"
        },
        "okButton": {
            "type": 0,
            "cx": 400,
            "cy": 450
        },
        "answer": "text_index_1",
        "sound": {
            "url": "sound_index_0"
        }
    }
    ```

      <br />

> ## KM000009

    match 유형

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000009",
        "direction": {
            "x": 70,
            "y": 50,
            "text": "text_index_0",
            "classNum": "001",
            "fontSize": 20,
            "dy": 45,
            "bold":true
        },
        "connect": {
            "hintCount": 1,
            "lineClassNum": "04",
            "element": {
                "multiEl": {
                    "text": "text_index_1",
                    "cx": 400,
                    "cy": 415,
                    "scale": 0.7,
                    "connectDotOffsets": {
                        "x":0,
                        "y": -180
                    },
                    "classNum": "001",
                    "background": {
                        "cx": 400,
                        "cy": 415,
                        "type": "image",
                        "ImgUrl": "image_index_0",
                        "ImgScale": 0.3,
                        "shapeFillClassNum": "03",
                        "shapeStrokeClassNum": "no",
                        "shapeOpacity": 1,
                        "shapeStrokeWidth": 1
                    }
                },
                "oneEl": [{
                    "text": "text_index_2",
                    "cx": 100,
                    "cy": 290,
                    "scale": 0.5,
                    "textGapX": 0,
                    "textGapY": 0,
                    "connectDotOffsets": {
                        "x": 70,
                        "y": 80
                    },
                    "background": {
                        "cx": 100,
                        "cy": 290,
                        "type": "image",
                        "ImgUrl": "image_index_1",
                        "ImgScale": 0.27,
                        "shapeFillClassNum": "03",
                        "shapeStrokeClassNum": "no",
                        "shapeOpacity": 1,
                        "shapeStrokeWidth": 1
                    }
                }, {
                    "text": "text_index_3",
                    "cx": 220,
                    "cy": 170,
                    "scale": 0.5,
                    "textGapX": 0,
                    "textGapY": 0,
                    "connectDotOffsets": {
                        "x": 40,
                        "y": 120
                    },
                    "background": {
                        "cx": 220,
                        "cy": 170,
                        "type": "image",
                        "ImgUrl": "image_index_2",
                        "ImgScale": 0.27,
                        "shapeFillClassNum": "03",
                        "shapeStrokeClassNum": "no",
                        "shapeOpacity": 1,
                        "shapeStrokeWidth": 1
                    }
                }, {
                    "text": "text_index_4",
                    "cx": 400,
                    "cy": 140,
                    "scale": 0.5,
                    "textGapX": 0,
                    "textGapY": 0,
                    "connectDotOffsets": {
                        "x": 0,
                        "y": 135
                    },
                    "background": {
                        "cx": 400,
                        "cy": 140,
                        "type": "image",
                        "ImgUrl": "image_index_3",
                        "ImgScale": 0.27,
                        "shapeFillClassNum": "03",
                        "shapeStrokeClassNum": "no",
                        "shapeOpacity": 1,
                        "shapeStrokeWidth": 1
                    }
                }, {
                    "text": "text_index_5",
                    "cx": 580,
                    "cy": 170,
                    "scale": 0.5,
                    "textGapX": 0,
                    "textGapY": 0,
                    "connectDotOffsets": {
                        "x": -40,
                        "y": 120
                    },
                    "background": {
                        "cx": 580,
                        "cy": 170,
                        "type": "image",
                        "ImgUrl": "image_index_4",
                        "ImgScale": 0.27,
                        "shapeFillClassNum": "03",
                        "shapeStrokeClassNum": "no",
                        "shapeOpacity": 1,
                        "shapeStrokeWidth": 1
                    }
                }, {
                    "text": "text_index_6",
                    "cx": 700,
                    "cy": 290,
                    "scale": 0.5,
                    "textGapX": 0,
                    "textGapY": 0,
                    "connectDotOffsets": {
                        "x": -70,
                        "y": 80
                    },
                    "background": {
                        "cx": 700,
                        "cy": 290,
                        "type": "image",
                        "ImgUrl": "image_index_5",
                        "ImgScale": 0.27,
                        "shapeFillClassNum": "03",
                        "shapeStrokeClassNum": "no",
                        "shapeOpacity": 1,
                        "shapeStrokeWidth": 1
                    }
                }]
            }
        }
    }
    ```

-   > ### `[필수]` questionType | _`string`_ | 모듈 설정

    ```javascript
    "questionType": "KM000009";
    ```

    <br />

-   > ### `[옵션]` direction | _`object`_ | 지시문 설정 `(기본:지시문 없음)`

    -   `[필수]`x : 텍스트 x 위치
    -   `[필수]`y : 텍스트 y 위치
    -   `[필수]`text : 텍스트 설정
    -   `[옵션]`classNum : 폰트 클래스 넘버 `(기본:'91')`
    -   `[옵션]`fontSize : 폰트 크기 `(기본:20)`
    -   `[옵션]`dy : 줄 간격 `(기본:45)`
    -   `[옵션]`bold : 폰트 두껍게 여부 `(기본:false)`

    ```javascript
    "direction": {
        "x": 70,
        "y": 50,
        "text": "text_index_0",
        "classNum": "91",
        "fontSize": 20,
        "dy": 45,
        "bold":true
    }
    ```

    <br />

-   > ### `[필수]` connect | _`object`_ | 연결 엘리먼트

    -   `[옵션]`hintCount : 힌트 수 `(기본: 0)`
    -   `[옵션]`lineClassNum : 정답 시 선 색 넘버`(기본: '04')`
    -   `[필수]`element : 연결 할 엘리먼트
        -   `[필수]`multiEl : 다중 연결 엘리먼트
            -   `[필수]`text : 엘리먼트 텍스트
            -   `[필수]`cx : x 위치
            -   `[필수]`cy : y 위치
            -   `[필수]`scale : 엘리먼트 크기
            -   `[옵션]`connectDotOffsets : 연결 점 조정 값의 x,y 배열
                -   `[옵션]`x : x 조정 값 `(기본:0)`
                -   `[옵션]`y : y 조정 값 `(기본:0)`
            -   `[옵션]`classNum : 텍스트 색 넘버 `(기본:'001')`
            -   `[옵션]`background : 배경
                -   `[필수]`cx : x 위치
                -   `[필수]`cy : y 위치
                -   `[옵션]`type : 배경 타입 `(기본:없음, rect,circle,image 중 선택)`
                -   `[옵션]`ImgUrl : 이미지 타입일 때 url `(기본:이미지 타입일 때만 적용)`
                -   `[옵션]`ImgScale : 이미지 타입일 때 크기 `(기본:이미지 타입일 때만 적용)`
                -   `[옵션]`shapeFillClassNum : 사각형,원 타입일 때 채우기 색 넘버 `(기본:'03', 사각형,원 타입일 때만 적용)`
                -   `[옵션]`shapeStrokeClassNum : 사각형,원 타입일 때 선 색 넘버 `(기본:'no', 사각형,원 타입일 때만 적용)`
                -   `[옵션]`shapeOpacity : 사각형,원 타입일 때 투명도 `(기본:1, 사각형,원 타입일 때만 적용)`
                -   `[옵션]`shapeStrokeWidth : 사각형,원 타입일 때 선 두께 `(기본:1, 사각형,원 타입일 때만 적용)`
        -   `[필수]`oneEl : 개별 엘리먼트
            -   `[필수]`text : 엘리먼트 텍스트
            -   `[필수]`cx : x 위치
            -   `[필수]`cy : y 위치
            -   `[필수]`scale : 엘리먼트 크기
            -   `[옵션]`connectDotOffsets : 연결 점 조정 값의 x,y 배열
                -   `[옵션]`x : x 조정 값 `(기본:0)`
                -   `[옵션]`y : y 조정 값 `(기본:0)`
            -   `[옵션]`background : 배경
                -   `[필수]`cx : x 위치
                -   `[필수]`cy : y 위치
                -   `[옵션]`type : 배경 타입 `(기본:없음, rect,circle,image 중 선택)`
                -   `[옵션]`ImgUrl : 이미지 타입일 때 url `(기본:이미지 타입일 때만 적용)`
                -   `[옵션]`ImgScale : 이미지 타입일 때 크기 `(기본:이미지 타입일 때만 적용)`
                -   `[옵션]`shapeFillClassNum : 사각형,원 타입일 때 채우기 색 넘버 `(기본:'03', 사각형,원 타입일 때만 적용)`
                -   `[옵션]`shapeStrokeClassNum : 사각형,원 타입일 때 선 색 넘버 `(기본:'no', 사각형,원 타입일 때만 적용)`
                -   `[옵션]`shapeOpacity : 사각형,원 타입일 때 투명도 `(기본:1, 사각형,원 타입일 때만 적용)`
                -   `[옵션]`shapeStrokeWidth : 사각형,원 타입일 때 선 두께 `(기본:1, 사각형,원 타입일 때만 적용)`

    ```javascript
    "connect": {
        "hintCount": 1,
        "lineClassNum": "04",
        "element": {
            "multiEl": {
                "text": "text_index_1",
                "cx": 400,
                "cy": 415,
                "scale": 0.7,
                "connectDotOffsets": {
                    "x": 0,
                    "y": -180
                },
                "classNum": "001",
                "background": {
                    "cx": 100,
                    "cy": 290,
                    "type": "image",
                    "ImgUrl": "image_index_0",
                    "ImgScale": 0.3,
                    "shapeFillClassNum": "03",
                    "shapeStrokeClassNum": "no",
                    "shapeOpacity": 1,
                    "shapeStrokeWidth": 1
                }
            },
            "oneEl": [{
                "text": "text_index_2",
                "cx": 100,
                "cy": 290,
                "scale": 0.5,
                "connectDotOffsets": {
                    "x": 70,
                    "y": 80
                },
                "background": {
                    "cx": 100,
                    "cy": 290,
                    "type": "image",
                    "ImgUrl": "image_index_1",
                    "ImgScale": 0.27,
                    "shapeFillClassNum": "03",
                    "shapeStrokeClassNum": "no",
                    "shapeOpacity": 1,
                    "shapeStrokeWidth": 1
                }
            }, ...]
        }
    }
    ```

    <br />

> ## KM000010

    choose 유형

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000010",
        "direction": {
            "x": 80,
            "y": 50,
            "text": "text_index_0",
            "classNum": "001",
            "fontSize": 20,
            "dy": 45,
            "bold":true
        },
        "images": [{
            "url": "image_index_0",
            "x": 30,
            "y": 240,
            "scale": 0.3
        }, {
            "url": "image_index_1",
            "x": 150,
            "y": 320,
            "scale": 0.25
        }],
        "texts": [{
            "x": 190,
            "y": 400,
            "text": "text_index_1",
            "classNum": "001",
            "fontSize": 60
        }],
        "choice": {
            "searchWord": "text_index_1",
            "hintCount": 1,
            "element": [{
                "text": "text_index_2",
                "cx": 300,
                "cy": 150,
                "scale": 0.6,
                "background": {
                    "cx": 300,
                    "cy": 150,
                    "type": "image",
                    "ImgUrl": "image_index_2",
                    "ImgScale": 0.3,
                    "shapeFillClassNum": "03",
                    "shapeStrokeClassNum": "no",
                    "shapeOpacity": 1,
                    "shapeStrokeWidth": 1
                }
            }, {
                "text": "text_index_3",
                "cx": 500,
                "cy": 180,
                "scale": 0.6,
                "background": {
                    "cx": 500,
                    "cy": 180,
                    "type": "image",
                    "ImgUrl": "image_index_3",
                    "ImgScale": 0.3,
                    "shapeFillClassNum": "03",
                    "shapeStrokeClassNum": "no",
                    "shapeOpacity": 1,
                    "shapeStrokeWidth": 1
                }
            }, {
                "text": "text_index_4",
                "cx": 690,
                "cy": 130,
                "scale": 0.6,
                "background": {
                    "cx": 690,
                    "cy": 130,
                    "type": "image",
                    "ImgUrl": "image_index_4",
                    "ImgScale": 0.3,
                    "shapeFillClassNum": "03",
                    "shapeStrokeClassNum": "no",
                    "shapeOpacity": 1,
                    "shapeStrokeWidth": 1
                }
            }, {
                "text": "text_index_5",
                "cx": 400,
                "cy": 360,
                "scale": 0.6,
                "background": {
                    "cx": 400,
                    "cy": 360,
                    "type": "image",
                    "ImgUrl": "image_index_5",
                    "ImgScale": 0.3,
                    "shapeFillClassNum": "03",
                    "shapeStrokeClassNum": "no",
                    "shapeOpacity": 1,
                    "shapeStrokeWidth": 1
                }
            }, {
                "text": "text_index_6",
                "cx": 610,
                "cy": 350,
                "scale": 0.6,
                "background": {
                    "cx": 610,
                    "cy": 350,
                    "type": "image",
                    "ImgUrl": "image_index_6",
                    "ImgScale": 0.3,
                    "shapeFillClassNum": "03",
                    "shapeStrokeClassNum": "no",
                    "shapeOpacity": 1,
                    "shapeStrokeWidth": 1
                }
            }]
        }
    }
    ```

-   > ### `[필수]` questionType | _`string`_ | 모듈 설정

    ```javascript
    "questionType": "KM000010";
    ```

    <br />

-   > ### `[옵션]` direction | _`object`_ | 지시문 설정 `(기본:지시문 없음)`

    -   `[필수]`x : 텍스트 x 위치
    -   `[필수]`y : 텍스트 y 위치
    -   `[필수]`text : 텍스트 설정
    -   `[옵션]`classNum : 폰트 클래스 넘버 `(기본:'91')`
    -   `[옵션]`fontSize : 폰트 크기 `(기본:20)`
    -   `[옵션]`dy : 줄 간격 `(기본:45)`
    -   `[옵션]`bold : 폰트 두껍게 여부 `(기본:false)`

    ```javascript
    "direction": {
        "x": 70,
        "y": 50,
        "text": "text_index_0",
        "classNum": "91",
        "fontSize": 20,
        "dy": 45,
        "bold":true
    }
    ```

    <br />

-   > ### `[옵션]` images | _`Array`_ | 이미지 설정 `(기본:이미지 없음)`

    -   `[필수]`url : 이미지 url
    -   `[필수]`x : 이미지 x 위치
    -   `[필수]`y : 이미지 y 위치
    -   `[필수]`scale : 이미지 크기

    ```javascript
    "images": [{
        "url": "image_index_0",
        "x": 30,
        "y": 240,
        "scale": 0.3
    }, ...]
    ```

    <br />

-   > ### `[옵션]` texts | _`Array`_ | 텍스트 설정 `(기본:텍스트 없음)`

    -   `[필수]`x : 텍스트 x 위치
    -   `[필수]`y : 텍스트 y 위치
    -   `[필수]`text : 텍스트
    -   `[필수]`classNum : 폰트 클래스 넘버 `(기본:'91')`
    -   `[필수]`fontSize : 폰트 크기 `(기본:60)`

    ```javascript
    "texts": [{
        "x": 190,
        "y": 400,
        "text": "text_index_1",
        "classNum": "91",
        "fontSize": 60
    }, ...]
    ```

    <br />

-   > ### `[필수]` choice | _'Object`_ | 고르기 엘리먼트 설정

    -   `[필수]`searchWord : 텍스트 x 위치
    -   `[필수]`hintCount : 텍스트 y 위치
    -   `[필수]`element : 텍스트
        -   `[필수]`text : 폰트 클래스 넘버 `(기본:'001')`
        -   `[필수]`cx : x 위치
        -   `[필수]`cy : y 위치
        -   `[필수]`scale : 엘리먼트 크기
        -   `[옵션]`background : 배경
            -   `[필수]`cx : x 위치
            -   `[필수]`cy : y 위치
            -   `[옵션]`type : 배경 타입 `(기본:없음, rect,circle,image 중 선택)`
            -   `[옵션]`ImgUrl : 이미지 타입일 때 url `(기본:이미지 타입일 때만 적용)`
            -   `[옵션]`ImgScale : 이미지 타입일 때 크기 `(기본:이미지 타입일 때만 적용)`
            -   `[옵션]`shapeFillClassNum : 사각형,원 타입일 때 채우기 색 넘버 `(기본:'03', 사각형,원 타입일 때만 적용)`
            -   `[옵션]`shapeStrokeClassNum : 사각형,원 타입일 때 선 색 넘버 `(기본:'no', 사각형,원 타입일 때만 적용)`
            -   `[옵션]`shapeOpacity : 사각형,원 타입일 때 투명도 `(기본:1, 사각형,원 타입일 때만 적용)`
            -   `[옵션]`shapeStrokeWidth : 사각형,원 타입일 때 선 두께 `(기본:1, 사각형,원 타입일 때만 적용)`

    ```javascript
    "choice": {
        "searchWord": "text_index_1",
        "hintCount": 1,
        "element": [{
            "text": "text_index_2",
            "cx": 300,
            "cy": 150,
            "scale": 0.6,
            "background": {
                "cx": 300,
                "cy": 150,
                "type": "image",
                "ImgUrl": "image_index_2",
                "ImgScale": 0.3,
                "shapeFillClassNum": "03",
                "shapeStrokeClassNum": "no",
                "shapeOpacity": 1,
                "shapeStrokeWidth": 1
            }
        }, ...]
    ```

    <br />

> ## KM000011

    choose 유형

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000011",
        "direction": {
            "x": 70,
            "y": 50,
            "text": "text_index_0",
            "classNum": "001",
            "fontSize": 30,
            "dy": 45,
            "bold":true
        },
        "background": {
            "images": [{
                "cx": 400,
                "cy": 280,
                "url": "image_index_0",
                "scale": 0.4,
                "center": true
            }]
        },
        "imageButton": {
            "imageInfo": [{
                "url": "image_index_1",
                "cx": 220,
                "cy": 300,
                "scale": 0.32
            }, {
                "url": "image_index_2",
                "cx": 350,
                "cy": 170,
                "scale": 1
            }],
            "soundInfo": {
                "url": "sound_index_0"
            }
        },
        "choice": {
            "searchWord": "text_index_1",
            "text": "text_index_2",
            "x": 480,
            "y": 230,
            "btnWidth": 100,
            "btnHeight": 110,
            "btnGapX": 0,
            "btnGapY": 0,
            "textScale": 0.7,
            "hintCount": 1,
            "fbSize": 35,
            "fbStrokeWidth": 3
        }
    }
    ```

-   > ### `[필수]` questionType | _`string`_ | 모듈 설정

    ```javascript
    "questionType": "KM000011";
    ```

    <br />

-   > ### `[옵션]` direction | _`object`_ | 지시문 설정 `(기본:지시문 없음)`

    -   `[필수]`x : 텍스트 x 위치
    -   `[필수]`y : 텍스트 y 위치
    -   `[필수]`text : 텍스트 설정
    -   `[옵션]`classNum : 폰트 클래스 넘버 `(기본:'91')`
    -   `[옵션]`fontSize : 폰트 크기 `(기본:20)`
    -   `[옵션]`dy : 줄 간격 `(기본:45)`
    -   `[옵션]`bold : 폰트 두껍게 여부 `(기본:false)`

    ```javascript
    "direction": {
        "x": 70,
        "y": 50,
        "text": "text_index_0",
        "classNum": "91",
        "fontSize": 20,
        "dy": 45,
        "bold":true
    }
    ```

    <br />

-   > ### `[옵션]` background | _`object`_ | 배경 설정 `(기본:배경 없음)`

    -   `[필수]`images : 이미지 배열
        -   `[필수]`cx : 이미지 x 위치
        -   `[필수]`cy : 이미지 y 위치
        -   `[필수]`url : 이미지 url
        -   `[필수]`scale : 이미지 크기

    ```javascript
    "background": {
        "images": [{
            "cx": 400,
            "cy": 280,
            "url": "image_index_0",
            "scale": 0.4
        }]
    }
    ```

    <br />

-   > ### `[필수]` imageButton | _`object`_ | 이미지 버튼

    -   `[필수]`imageInfo : 이미지 버튼 안에 이미지 배열
        -   `[필수]`url : 이미지 url
        -   `[필수]`cx : 이미지 x 위치
        -   `[필수]`cy : 이미지 y 위치
        -   `[필수]`scale : 이미지 크기
    -   `[필수]`soundInfo : 이미지 버튼 사운드
        -   `[필수]`url : 사운드 url

    ```javascript
    "imageButton": {
        "imageInfo": [{
            "url": "image_index_1",
            "cx": 220,
            "cy": 300,
            "scale": 0.32
        }, ...],
        "soundInfo": {
            "url": "sound_index_0"
        }
    }
    ```

    <br />

-   > ### `[필수]` choice | _`object`_ | 고르기 엘리먼트

    -   `[필수]`searchWord : 찾을 단어(낱자)
    -   `[필수]`text : 선택지 텍스트
    -   `[옵션]`x : 텍스트 x 위치 `(기본:50)`
    -   `[옵션]`y : 텍스트 y 위치 `(기본:50)`
    -   `[옵션]`btnWidth : 버튼 너비 `(기본:100)`
    -   `[옵션]`btnHeight : 버튼 높이 `(기본:100)`
    -   `[옵션]`btnGapX : 버튼 사이의 x 간격 `(기본:0)`
    -   `[옵션]`btnGapY : 버튼 사이의 y 간격 `(기본:0)`
    -   `[옵션]`textScale : 선택지 텍스트 크기 `(기본:0.6)`
    -   `[옵션]`hintCount : 힌트 수 `(기본:0)`

    ```javascript
    "choice": {
        "searchWord": "text_index_1",
        "text": "text_index_2",
        "x": 480,
        "y": 230,
        "btnWidth": 100,
        "btnHeight": 110,
        "btnGapX": 0,
        "btnGapY": 0,
        "textScale": 0.7,
        "hintCount": 1,
    }
    ```

    <br />

> ## KM000012

    choose 유형

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000012",
        "direction": {
            "x": 70,
            "y": 50,
            "text": "text_index_0",
            "classNum": "001",
            "fontSize": 20,
            "dy": 45,
            "bold":true
        },
        "imageButton": {
            "x": 250,
            "y": 100,
            "width": 300,
            "height": 140,
            "btnFillClassNum": "009",
            "btnStrokeClassNum": "009",
            "btnOpacity":1,
            "btnR": 10,
            "imageInfo": [{
                "cx": 320,
                "cy": 170,
                "img": {
                    "url": "image_index_0",
                    "scale": 0.15
                }
            }, {
                "cx": 535,
                "cy": 115,
                "img": {
                    "url": "image_index_1",
                    "scale": 1
                }
            }],
            "wordInfo": {
                "cx": 460,
                "cy": 170,
                "word": "text_index_1",
                "classNum": "001",
                "fontSize": 70
            }
        },
        "choiceElements": [{
            "btnInfo": {
                "x": 130,
                "y": 290,
                "width": 140,
                "height": 80,
                "fillClassNum": "14",
                "strokeClassNum": "117"
            },
            "wordInfo": {
                "word": "text_index_2",
                "fontSize": 40,
                "classNum": "001"
            },
            "isAns": false,
            "imageInfo": [{
                "cx": 320,
                "cy": 170,
                "img": {
                    "url": "image_index_0",
                    "scale": 0.15
                }
            }]
        }, {
            "btnInfo": {
                "x": 330,
                "y": 290,
                "width": 140,
                "height": 80,
                "fillClassNum": "14",
                "strokeClassNum": "117"
            },
            "wordInfo": {
                "word": "text_index_3",
                "fontSize": 40,
                "classNum": "001"
            },
            "isAns": false,
            "imageInfo": [{
                "cx": 320,
                "cy": 170,
                "img": {
                    "url": "image_index_0",
                    "scale": 0.15
                }
            }]
        }, {
            "btnInfo": {
                "x": 530,
                "y": 290,
                "width": 140,
                "height": 80,
                "fillClassNum": "14",
                "strokeClassNum": "117"
            },
            "wordInfo": {
                "word": "text_index_4",
                "fontSize": 40,
                "classNum": "001"
            },
            "isAns": false,
            "imageInfo": [{
                "cx": 320,
                "cy": 170,
                "img": {
                    "url": "image_index_0",
                    "scale": 0.15
                }
            }]
        }, {
            "btnInfo": {
                "x": 130,
                "y": 390,
                "width": 140,
                "height": 80,
                "fillClassNum": "14",
                "strokeClassNum": "117"
            },
            "wordInfo": {
                "word": "text_index_5",
                "fontSize": 40,
                "classNum": "001"
            },
            "isAns": false,
            "imageInfo": [{
                "cx": 320,
                "cy": 170,
                "img": {
                    "url": "image_index_0",
                    "scale": 0.15
                }
            }]
        }, {
            "btnInfo": {
                "x": 330,
                "y": 390,
                "width": 140,
                "height": 80,
                "fillClassNum": "14",
                "strokeClassNum": "117"
            },
            "wordInfo": {
                "word": "text_index_1",
                "fontSize": 40,
                "classNum": "001"
            },
            "isAns": true,
            "imageInfo": [{
                "cx": 320,
                "cy": 170,
                "img": {
                    "url": "image_index_0",
                    "scale": 0.15
                }
            }]
        }, {
            "btnInfo": {
                "x": 530,
                "y": 390,
                "width": 140,
                "height": 80,
                "fillClassNum": "14",
                "strokeClassNum": "117"
            },
            "wordInfo": {
                "word": "text_index_6",
                "fontSize": 40,
                "classNum": "001"
            },
            "isAns": false,
            "imageInfo": [{
                "cx": 320,
                "cy": 170,
                "img": {
                    "url": "image_index_0",
                    "scale": 0.15
                }
            }]
        }]
    }
    ```

-   > ### `[필수]` questionType | _`string`_ | 모듈 설정

    ```javascript
    "questionType": "KM000012";
    ```

    <br />

-   > ### `[옵션]` direction | _`object`_ | 지시문 설정 `(기본:지시문 없음)`

    -   `[필수]`x : 텍스트 x 위치
    -   `[필수]`y : 텍스트 y 위치
    -   `[필수]`text : 텍스트 설정
    -   `[옵션]`classNum : 폰트 클래스 넘버 `(기본:'91')`
    -   `[옵션]`fontSize : 폰트 크기 `(기본:20)`
    -   `[옵션]`dy : 줄 간격 `(기본:45)`
    -   `[옵션]`bold : 폰트 두껍게 여부 `(기본:false)`

    ```javascript
    "direction": {
        "x": 70,
        "y": 50,
        "text": "text_index_0",
        "classNum": "91",
        "fontSize": 20,
        "dy": 45,
        "bold":true
    }
    ```

    <br />

-   > ### `[옵션]` imageButton | _`object`_ | 이미지 버튼 `(기본:이미지 버튼 없음)`

    -   `[필수]`x : 이미지 버튼 x 위치
    -   `[필수]`y : 이미지 버튼 y 위치 `(기본:버튼에 포함된 그룹의 y 위치)`
    -   `[필수]`width : 이미지 버튼 너비 `(기본:버튼에 포함된 그룹의 너비)`
    -   `[필수]`height : 이미지 버튼 높이 `(기본:버튼에 포함된 그룹의 높이)`
    -   `[옵션]`btnFillClassNum : 이미지 버튼 채우기 색 넘버 `(기본:'14')`
    -   `[옵션]`btnStrokeClassNum : 이미지 버튼 선 색 넘버 `(기본:'117')`
    -   `[옵션]`btnOpacity : 이미지 버튼 투명도 `(기본:1)`
    -   `[옵션]`btnR : 이미지 버튼 x,y축의 반경(둥근 정도) `(기본:10)`
    -   `[옵션]`imageInfo : 이미지 배열 `(기본:없음)`
        -   `[필수]`cx : 이미지 x 위치
        -   `[필수]`cy : 이미지 y 위치
        -   `[필수]`img : 이미지 정보
            -   `[필수]`url : 이미지 url
            -   `[옵션]`scale : 이미지 크기 `(기본:1)`
    -   `[옵션]`wordInfo : 텍스트 정보 `(기본:없음)`
        -   `[필수]`cx : 텍스트 x 위치
        -   `[필수]`cy : 텍스트 y 위치
        -   `[필수]`word : 택스트
        -   `[필수]`classNum : 텍스트 색상 넘버 `(기본:'001')`
        -   `[옵션]`fontSize : 폰트 크기 `(기본:40)`

    ```javascript
    "imageButton": {
        "x": 250,
        "y": 100,
        "width": 300,
        "height": 140,
        "btnFillClassNum": "009",
        "btnStrokeClassNum": "009",
        "btnOpacity":1,
        "btnR": 10,
        "imageInfo": [{
            "cx": 320,
            "cy": 170,
            "img": {
                "url": "image_index_0",
                "scale": 0.15
            }
        }, ...],
        "wordInfo": {
            "cx": 460,
            "cy": 170,
            "word": "text_index_1",
            "classNum": "001",
            "fontSize": 70
        }
    }
    ```

    <br />

-   > ### `[필수]` choiceElements | _`Array`_ | 고르기 버튼 설정

    -   `[필수]`btnInfo : 버튼 정보
        -   `[옵션]`x : 버튼 x 위치 `(기본:0)`
        -   `[옵션]`y : 버튼 y 위치 `(기본:0)`
        -   `[옵션]`width : 버튼 너비 `(기본:140)`
        -   `[옵션]`height : 버튼 y 높이 `(기본:80)`
        -   `[옵션]`fillClassNum : 버튼 채우기 색 넘버 `(기본:'14')`
        -   `[옵션]`strokeClassNum : 버튼 선 색 넘버 `(기본:'117')`
        -   `[옵션]`r : 버튼 x,y축의 반경(둥근 정도) `(기본:10)`
    -   `[옵션]`wordInfo : 텍스트 정보 (필요 시 설정) `(기본:없음)`
        -   `[옵션]`word : 텍스트 `(기본:'001')`
        -   `[옵션]`fontSize : 폰트 크기 `(기본:40)`
        -   `[옵션]`classNum : 텍스트 색상 넘버 `(기본:'001')`
    -   `[필수]`isAns : 정답 여부
    -   `[옵션]`imageInfo : 이미지 배열 (필요 시 설정) `(기본:없음)`
        -   `[필수]`cx : 이미지 x 위치
        -   `[필수]`cy : 이미지 y 위치
        -   `[필수]`img : 이미지 정보
            -   `[필수]`url : 이미지 url
            -   `[옵션]`scale : 이미지 크기 `(기본:1)`

    ```javascript
    "choiceElements": [{
        "btnInfo": {
            "x": 130,
            "y": 290,
            "width": 140,
            "height": 80,
            "fillClassNum": "14",
            "strokeClassNum": "117",
            "r":10
        },
        "wordInfo": {
            "word": "text_index_2",
            "fontSize": 40,
            "classNum": "001"
        },
        "isAns": false,
        "imageInfo": [{
            "cx": 320,
            "cy": 170,
            "img": {
                "url": "image_index_0",
                "scale": 0.15
            }
        }, ...]
    }
    ```

    <br />

> ## KM000013

    write 유형

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000013",
        "direction": {
            "x": 70,
            "y": 50,
            "text": "text_index_0",
            "classNum": 91,
            "fontSize": 20,
            "dy": 45,
            "bold":true
        },
        "imageButton": {
            "x": 90,
            "y": 100,
            "width": 280,
            "height": 270,
            "btnFillClassNum": "14",
            "btnStrokeClassNum": "117",
            "btnOpacity":1,
            "imageInfo": [{
                "cx": 220,
                "cy": 250,
                "img": {
                    "url": "image_index_0",
                    "scale": 0.3
                }
            }, {
                "cx": 340,
                "cy": 130,
                "img": {
                    "url": "image_index_1",
                    "scale": 1
                }
            }],
            "sound": {
                "url": "sound_index_0"
            }
        },
        "animateValue": {
            "cx": 570,
            "cy": 235,
            "scale": 1.2,
            "text": "text_index_1",
            "animateIndex": 0,
            "background": {
                "width": 280,
                "height": 270,
                "fillClassNum": "14",
                "strokeClassNum": "01",
                "opacity": 1,
                "r": 10
            }
        },
        "handWriteValue": {
            "cx": 570,
            "cy": 235,
            "scale": 1.2,
            "text": "text_index_1",
            "handWriteIndex": 0,
            "drawClassNum": "001",
            "background": {
                "width": 280,
                "height": 270,
                "fillClassNum": "14",
                "strokeClassNum": "01",
                "opacity": 1,
                "r": 10
            },
            "okButton": {
                "cx": 400,
                "cy": 450
            },
            "answer": "text_index_2",
            "sound": {
                "url": "sound_index_0"
            },
            "startPoint": {
                "x": 460,
                "y": 150
            }
        }
    }
    ```

-   > ### `[필수]` questionType | _`string`_ | 모듈 설정

    ```javascript
    "questionType": "KM000013";
    ```

    <br />

-   > ### `[옵션]` direction | _`object`_ | 지시문 설정 `(기본:지시문 없음)`

    -   `[필수]`x : 텍스트 x 위치
    -   `[필수]`y : 텍스트 y 위치
    -   `[필수]`text : 텍스트 설정
    -   `[옵션]`classNum : 폰트 클래스 넘버 `(기본:'91')`
    -   `[옵션]`fontSize : 폰트 크기 `(기본:20)`
    -   `[옵션]`dy : 줄 간격 `(기본:45)`
    -   `[옵션]`bold : 폰트 두껍게 여부 `(기본:false)`

    ```javascript
    "direction": {
        "x": 70,
        "y": 50,
        "text": "text_index_0",
        "classNum": "91",
        "fontSize": 20,
        "dy": 45,
        "bold":true
    }
    ```

    <br />

-   > ### `[필수]` imageButton | _`object`_ | 이미지 버튼

    -   `[필수]`x : 이미지 버튼 x 위치
    -   `[필수]`y : 이미지 버튼 y 위치
    -   `[필수]`width : 이미지 버튼 너비
    -   `[필수]`height : 이미지 버튼 높이
    -   `[옵션]`btnFillClassNum : 이미지 버튼 채우기 색 넘버 `(기본:14)`
    -   `[옵션]`btnStrokeClassNum : 이미지 버튼 선 색 넘버 `(기본:117)`
    -   `[옵션]`btnOpacity : 이미지 버튼 투명도 `(기본:1)`
    -   `[옵션]`imageInfo : 이미지 배열 `(기본:없음)`
        -   `[필수]`cx : 이미지 x 위치
        -   `[필수]`cy : 이미지 y 위치
        -   `[필수]`img : 이미지 정보
            -   `[필수]`url : 이미지 url
            -   `[필수]`scale : 이미지 크기 `(기본:1)`
    -   `[필수]`sound : 사운드 정보
        -   `[필수]`url : 사운드 url

    ```javascript
    "imageButton": {
        "x": 90,
        "y": 100,
        "width": 280,
        "height": 270,
        "btnFillClassNum": "14",
        "btnStrokeClassNum": "117",
        "btnOpacity":1,
        "imageInfo": [{
            "cx": 220,
            "cy": 250,
            "img": {
                "url": "image_index_0",
                "scale": 0.3
            }
        }, ...],
        "sound": {
            "url": "sound_index_0"
        }
    }
    ```

    <br />

-   > ### `[필수]` animateValue | _`object`_ | 애니메이션 정보

    -   `[필수]`cx : 애니메이션 엘리먼트 x 위치
    -   `[필수]`cy : 애니메이션 엘리먼트 y 위치
    -   `[필수]`scale : 애니메이션 엘리먼트 크기
    -   `[필수]`text : 애니메이션 엘리먼트 텍스트
    -   `[필수]`animateIndex : 애니메이션 될 패스의 인덱스
    -   `[옵션]`background : 애니메이션 엘리먼트 배경 정보
        -   `[옵션]`width : 배경 너비 `(기본:350)`
        -   `[옵션]`height : 배경 높아 `(기본:300)`
        -   `[옵션]`fillClassNum : 배경 채우기 색 넘버 `(기본:'14')`
        -   `[옵션]`strokeClassNum : 배경 선 색 넘버 `(기본:'no')`
        -   `[옵션]`opacity : 배경 투명도 `(기본:0)`
        -   `[옵션]`r : 배경 x,y축의 반경(둥근 정도) `(기본:10)`

    ```javascript
    "animateValue": {
        "cx": 570,
        "cy": 235,
        "scale": 1.2,
        "text": "text_index_1",
        "animateIndex": 0,
        "background": {
            "width": 280,
            "height": 270,
            "fillClassNum": "14",
            "strokeClassNum": "01",
            "opacity": 1,
            "r": 10
        }
    }
    ```

    <br />

-   > ### `[필수]` handWriteValue | _`object`_ | 쓰기 정보

    -   `[필수]`cx : handWrite 엘리먼트 x 위치
    -   `[필수]`cy : handWrite 엘리먼트 y 위치
    -   `[필수]`scale : handWrite 엘리먼트 크기
    -   `[필수]`text : handWrite 엘리먼트 텍스트
    -   `[필수]`handWriteIndex : handWrite 인덱스
    -   `[필수]`drawClassNum : 패스의 색상 번호
    -   `[필수]`background : handWrite 엘리먼트 배경 정보
        -   `[필수]`width : 배경 너비
        -   `[필수]`height : 배경 높이
        -   `[옵션]`fillClassNum : 배경 채우기 색 넘버 `(기본:'14')`
        -   `[옵션]`strokeClassNum : 배경 선 색 넘버 `(기본:'01')`
        -   `[옵션]`opacity : 배경 투명도 `(기본:0)`
        -   `[옵션]`r : 배경 x,y축의 반경(둥근 정도) `(기본:20)`
    -   `[옵션]`okButton : okButton 정보
        -   `[옵션]`cx : okButton x 위치
        -   `[옵션]`cy : okButton y 위치
    -   `[옵션]`answer : 정답
    -   `[옵션]`sound : 사운드 정보
        -   `[옵션]`url : 사운드 url
    -   `[옵션]`startPoint : 연필 아이콘 위치(handwrite 시작 위치 아이콘)
        -   `[옵션]`x : x 위치
        -   `[옵션]`y : y 위치

    ```javascript
    "handWriteValue": {
        "cx": 570,
        "cy": 235,
        "scale": 1.2,
        "text": "text_index_1",
        "handWriteIndex": 0,
        "drawClassNum": "001",
        "background": {
            "width": 280,
            "height": 270,
            "fillClassNum": "14",
            "strokeClassNum": "01",
            "opacity": 1,
            "r": 10
        },
        "okButton": {
            "cx": 400,
            "cy": 450
        },
        "answer": "text_index_2",
        "sound": {
            "url": "sound_index_0"
        },
        "startPoint": {
            "x": 460,
            "y": 150
        }
    }
    ```

    <br />

> ## KM000014

    trace 유형

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000014",
        "direction": {
            "x": 70,
            "y": 50,
            "text": "text_index_0",
            "classNum": "91",
            "fontSize": 20,
            "dy": 45,
            "bold":true
        },
        "imageButton": {
            "x": 200,
            "y": 65,
            "width": 400,
            "height": 140,
            "btnFillClassNum": "009",
            "btnStrokeClassNum": "009",
            "btnOpacity" : 1,
            "textInfo": {
                "cx": 475,
                "cy": 200,
                "text": "text_index_1",
                "classNum": "91",
                "fontSize": 75,
                "focusIndex": 0,
                "focusClass": "02"
            },
            "imageInfo": [{
                "cx": 300,
                "cy": 120,
                "img": {
                    "url": "image_index_0",
                    "scale": 0.25
                }
            }, {
                "cx": 570,
                "cy": 90,
                "img": {
                    "url": "image_index_1",
                    "scale": 1
                }
            }],
            "sound": {
                "url": "sound_index_0"
            }
        },
        "animateValue": {
            "text": "text_index_2",
            "cx": 240,
            "cy": 345,
            "scale": 0.9,
            "background": {
                "width": 250,
                "height": 250,
                "fillClassNum": "117",
                "strokeClassNum": "no",
                "opacity": 1
            }
        },
        "traceValue": {
            "text": "text_index_2",
            "cx": 560,
            "cy": 345,
            "scale": 1,
            "repeat": 2,
            "background": {
                "width": 250,
                "height": 250,
                "fillClassNum": {
                    "basic": "117",
                    "start": "14"
                },
                "strokeClassNum": {
                    "basic": "01",
                    "start": "01"
                },
                "opacity": 1
            },
            "sound": {
                "url": "sound_index_0"
            }
        }
    }
    ```

-   > ### `[필수]` questionType | _`string`_ | 모듈 설정

    ```javascript
    "questionType": "KM000014";
    ```

    <br />

-   > ### `[옵션]` direction | _`object`_ | 지시문 설정 `(기본:지시문 없음)`

    -   `[필수]`x : 텍스트 x 위치
    -   `[필수]`y : 텍스트 y 위치
    -   `[필수]`text : 텍스트 설정
    -   `[옵션]`classNum : 폰트 클래스 넘버 `(기본:'91')`
    -   `[옵션]`fontSize : 폰트 크기 `(기본:20)`
    -   `[옵션]`dy : 줄 간격 `(기본:45)`
    -   `[옵션]`bold : 폰트 두껍게 여부 `(기본:false)`

    ```javascript
    "direction": {
        "x": 70,
        "y": 50,
        "text": "text_index_0",
        "classNum": "91",
        "fontSize": 20,
        "dy": 45,
        "bold":true
    }
    ```

    <br />

-   > ### `[필수]` imageButton | _`object`_ | 이미지 버튼

    -   `[필수]`x : 이미지 버튼 x 위치
    -   `[필수]`y : 이미지 버튼 y 위치
    -   `[필수]`width : 이미지 버튼 너비
    -   `[필수]`height : 이미지 버튼 높이
    -   `[옵션]`btnFillClassNum : 이미지 버튼 채우기 색 넘버 `(기본:'14')`
    -   `[옵션]`btnStrokeClassNum : 이미지 버튼 선 색 넘버 `(기본:'117')`
    -   `[옵션]`btnOpacity : 이미지 버튼 투명도 `(기본:'1')`
    -   `[필수]`textInfo : 텍스트 설정
        -   `[옵션]`cx : 텍스트 x 설정 `(기본:45)`

    ```javascript
    "imageButton": {
        "x": 200,
        "y": 65,
        "width": 400,
        "height": 120,
        "btnFillClassNum": "009",
        "btnStrokeClassNum": "009",
        "btnOpacity" : 1,
        "textInfo": {
            "cx": 475,
            "cy": 200,
            "text": "text_index_1",
            "classNum": "91",
            "fontSize": 75,
            "focusIndex": 0,
            "focusClass": "02"
        },
        "imageInfo": [{
            "cx": 300,
            "cy": 120,
            "img": {
                "url": "image_index_0",
                "scale": 0.2
            }
        }, {
            "cx": 570,
            "cy": 90,
            "img": {
                "url": "image_index_1",
                "scale": 1
            }
        }],
        "sound": {
            "url": "sound_index_0"
        }
    }
    ```

    <br />

> ## KM000015

    write

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000015",
        "direction": {
            "x": 70,
            "y": 50,
            "text": "지시문",
            "classNum": "91",
            "fontSize": 20,
            "dy": 45,
            "bold": true
        },
        "tableInfo": {
            "x": 180,
            "y": 100,
            "width": 80,
            "height": 70,
            "row": {
                "text": ["ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅅ"],
                "maxCount": 3,
                "tableGap": 50,
                "tableClassNum": "115"
            },
            "col": {
                "text": "ㅏ",
                "tableClassNum": "88"
            },
            "questionIndex": [1, 2],
            "sound": [{
                "url": "sound_index_0"
            }, {
                "url": "sound_index_0"
            }]
        },
        "popUpInfo": {
            "equationValue": {
                "x": 75,
                "y": 175,
                "width": 100,
                "height": 100,
                "gap": 200,
                "wordInfo": [{
                    "scale": [0.8,0.8]
                    "offset": [{
                        "x": 0,
                        "y": 0
                    },{
                        "x": 0,
                        "y": 0
                    }]
                },{
                    "scale": [0.8,0.8]
                    "offset": [{
                        "x": 0,
                        "y": 0
                    },{
                        "x": 0,
                        "y": 0
                    }]
                }]
            },
            "handWriteValue": {
                "x": 475,
                "y": 100,
                "width": 250,
                "height": 250,
                "drawClassNum": "001",
                "background": {
                    "fillClassNum": "14",
                    "strokeClassNum": "01"
                },
                "okButton": {
                    "type": 0,
                    "x": 400,
                    "y": 450
                }
            }
        },
        "images": [{
            "url": "이미지",
            "x": 35,
            "y": 260,
            "scale": 0.2
        }, {
            "url": "이미지",
            "x": 35,
            "y": 375,
            "scale": 0.2
        }],
        "okButton": {
            "type": 0,
            "cx": 400,
            "cy": 450
        }
    }
    ```

-   > ### questionType | _`string`_ | 모듈 설정

    ```javascript
    "questionType": "KM000015";
    ```

    <br />

-   > ### direction | _`object`_ | 지시문 설정

    -   `[필수]`x : x좌표
    -   `[필수]`y : y좌표
    -   `[필수]`text : 텍스트 설정
    -   `[옵션]`classNum : 색상 번호 `(기본:'91')`
    -   `[옵션]`fontSize : 폰트 크기 `(기본:20)`
    -   `[옵션]`dy : 줄 간격 `(기본:45)`
    -   `[옵션]`bold : 텍스트 진하게 여부 `(기본:false)`
    -   `[옵션]`options : 텍스트에 옵션 부여 `(기본:없음, color, underline, box, highlight)`

    ```javascript
    "direction": {
        "x": 70,
        "y": 50,
        "text": "text_index_0",
        "classNum": "91",
        "fontSize": 20,
        "dy": 45,
        "bold": true,
        "options": [{
            "type": "box",
            "classNum": "01",
            "boxText": "?",
            "boxTextClass": "91",
            "boxTextScale": 0.8,
            "bold": true
        }]
    }
    ```

    <br />

-   > ### tableInfo | _`object`_ | 첫 화면 표 정보

    -   `[필수]`x : x좌표
    -   `[필수]`y : y좌표
    -   `[필수]`width : 표 한칸 너비
    -   `[필수]`height : 표 한칸 높이
    -   `[필수]`row : 행 정보
        -   `[필수]`text : 표 전체 행에 들어갈 텍스트 배열 (자음)
        -   `[필수]`maxCount : 표 하나에 들어갈 행의 수 (한 줄에 자음 수)
        -   `[필수]`tableGap : 표 사이의 너비 간격
        -   `[필수]`tableClassNum : 표에서 행 부분의 채우기 색 번호 (자음이 있는 부분의 채우기 색)
    -   `[필수]`col : 열 정보
        -   `[필수]`text : 표 전체 열에 들어갈 텍스트(모음)
        -   `[필수]`tableClassNum : 표에서 열 부분의 채우기 색 번호 (모음이 있는 부분의 채우기 색)
    -   `[필수]`questionIndex : 행에 들어간 텍스트 중 빈칸이 될 부분의 인덱스 (빈칸이 될 자음의 인덱스)
    -   `[필수]`sound : 사운드 정보 배열 (빈칸의 수와 일치하게 들어가야 됨)
        -   `[필수]`url : 사운드 url

    ```javascript
    "tableInfo": {
        "x": 180,
        "y": 100,
        "width": 80,
        "height": 70,
        "row": {
            "text": ["text_index_1", "text_index_2", "text_index_3", "text_index_4", "text_index_5", "text_index_6", "text_index_7"],
            "maxCount": 3,
            "tableGap": 50,
            "tableClassNum": "115"
        },
        "col": {
            "text": "text_index_8",
            "tableClassNum": "88"
        },
        "questionIndex": [1, 2],
        "sound": [{
            "url": "sound_index_0"
        }, {
            "url": "sound_index_0"
        }]
    }
    ```

    <br />

-   > ### popUpInfo | _`object`_ | 팝업 화면 정보

    -   `[필수]`equationValue : 자,모음 식
        -   `[필수]`x : x 좌표
        -   `[필수]`y : y 좌표
        -   `[필수]`width : 너비
        -   `[필수]`height : 높이
        -   `[필수]`gap : 박스 간 간격
        -   `[필수]`plusScale : 덧셈 기호 크기
        -   `[필수]`arrowScale : 화살표 크기
        -   `[필수]`wordInfo : 자,모음 정보 (빈칸 하나에 대한 팝업 창 텍스트 정보)
            -   `[필수]`scale : 크기 배열 (첫번째 박스, 두번째 박스)
            -   `[필수]`offset : 조정 값 배열(첫번째 박스, 두번째 박스)
                -   `[필수]`x : x 좌표
                -   `[필수]`y : y 좌표
    -   `[필수]`handWriteValue : 핸드라이트 정보
        -   `[필수]`x : x 좌표
        -   `[필수]`y : y 좌표
        -   `[필수]`width : 핸드라이트 너비
        -   `[필수]`height : 핸드라이트 높이
        -   `[필수]`drawClassNum : 핸드라이트 선 색 번호
        -   `[필수]`background : 배경
            -   `[필수]`fillClassNum : 채우기 색 번호
            -   `[필수]`strokeClassNum : 선 색 번호
        -   `[필수]`okButton : 확인 버튼
            -   `[필수]`type : 버튼 유형
            -   `[필수]`cx : x 좌표
            -   `[필수]`cy : y 좌표

    ```javascript
    "popUpInfo": {
        "equationValue": {
            "x": 75,
            "y": 175,
            "width": 100,
            "height": 100,
            "gap": 200,
            "plusScale": 0.7,
            "arrowScale": 1,
            "wordInfo": [{
                "scale": [0.8,0.8]
                "offset": [{
                    "x": -5,
                    "y": -10
                },{
                    "x": -5,
                    "y": -10
                }]
            }, ...]
        },
        "handWriteValue": {
            "x": 475,
            "y": 100,
            "width": 250,
            "height": 250,
            "drawClassNum": "001",
            "background": {
                "fillClassNum": "14",
                "strokeClassNum": "01"
            },
            "okButton": {
                "type": 0,
                "cx": 400,
                "cy": 450
            }
        }
    }
    ```

    <br />

-   > ### images | _`Array`_ | 그 밖의 이미지 정보

    -   `[필수]`url : 이미지 url
    -   `[필수]`x : x 좌표
    -   `[필수]`y : y 좌표
    -   `[필수]`scale : 크기

    ```javascript
    "images": [{
        "url": "image_index_0",
        "x": 35,
        "y": 260,
        "scale": 0.2
    }, ...]
    ```

    <br />

-   > ### okButton | _`Array`_ | 확인 버튼

    -   `[필수]`type : 버튼 유형
    -   `[필수]`cx : x 좌표
    -   `[필수]`cy : y 좌표

    ```javascript
    "okButton": {
        "type": 0,
        "cx": 400,
        "cy": 450
    }
    ```

    <br />

> ## KM000016

    complex

-   ### 기본 포맷

        ```javascript
        {
        "questionType": "KM000016",
        "direction": {
            "x": 70,
            "y": 50,
            "text": "지시문",
            "classNum": "91",
            "fontSize": 20,
            "dy": 45,
            "bold": true
        },
        "word": "아",
        "stepOne": {
            "equationValue": {
                "cx": 400,
                "cy": 250,
                "boxWidth": 140,
                "boxHeight": 140,
                "gap": 60
            },
            "focusIndex": 1
        },
        "stepTwo": {
            "equationValue": {
                "cx": 400,
                "cy": 130,
                "scale": 0.55
            },
            "handWriteValue": {
                "x": 300,
                "y": 210,
                "width": 200,
                "height": 200,
                "drawClassNum": "001",
                "startPoint": {
                    "x": 365,
                    "y": 250
                },
                "okButton": {
                    "cx": 400,
                    "cy": 450
                }
            }
        },
        "stepThree": {
            "handWriteValue": {
                "x": 300,
                "y": 210,
                "width": 200,
                "height": 200,
                "drawClassNum": "001",
                "okButton": {
                    "cx": 400,
                    "cy": 450
                }
            }
        },
        "stepFour": {
            "imageButton": {
                "x": 170,
                "y": 200,
                "width": 200,
                "height": 200,
                "btnFillClassNum": 114,
                "btnStrokeClassNum": 114,
                "btnOpacity":1,
                "textInfo": {
                    "cx": 275,
                    "cy": 360,
                    "text": "아기",
                    "classNum": "91",
                    "fontSize": 50,
                    "blankIndex": 0,
                    "r": 10
                },
                "imageInfo": [{
                    "cx": 270,
                    "cy": 270,
                    "img": {
                        "url": "이미지",
                        "scale": 0.17
                    }
                }, {
                    "cx": 350,
                    "cy": 225,
                    "img": {
                        "url": "이미지",
                        "scale": 0.8
                    }
                }]
            },
            "handWriteValue": {
                "x": 430,
                "y": 200,
                "width": 200,
                "height": 200,
                "drawClassNum": "001",
                "okButton": {
                    "cx": 400,
                    "cy": 470
                }
            }
        },
        "sound": {
            "url": "사운드"
        }

    }

    ```

    ```

-   > ### questionType | _`string`_ | 모듈 설정

    ```javascript
    "questionType": "KM000016";
    ```

    <br />

-   > ### direction | _`object`_ | 지시문 설정

    -   `[필수]`x : x좌표
    -   `[필수]`y : y좌표
    -   `[필수]`text : 텍스트 설정
    -   `[옵션]`classNum : 색상 번호 `(기본:'91')`
    -   `[옵션]`fontSize : 폰트 크기 `(기본:20)`
    -   `[옵션]`dy : 줄 간격 `(기본:45)`
    -   `[옵션]`bold : 텍스트 진하게 여부 `(기본:false)`
    -   `[옵션]`options : 텍스트에 옵션 부여 `(기본:없음, color, underline, box, highlight)`

    ```javascript
    "direction": {
        "x": 70,
        "y": 50,
        "text": "text_index_0",
        "classNum": "91",
        "fontSize": 20,
        "dy": 45,
        "bold": true,
        "options": [{
            "type": "box",
            "classNum": "01",
            "boxText": "?",
            "boxTextClass": "91",
            "boxTextScale": 0.8,
            "bold": true
        }]
    }
    ```

    <br />

-   > ### word | _`string`_ | 짜임 글자

    ```javascript
    "word": "text_index_1";
    ```

    <br />

-   > ### stepOne | _`object`_ | 첫번째 단계

    -   `[필수]`equationValue : 자,모음 식
        -   `[필수]`cx : x 좌표
        -   `[필수]`cy : y 좌표
        -   `[필수]`boxWidth : 박스 너비
        -   `[필수]`boxHeight : 박스 높이
        -   `[필수]`gap : 박스와 기호 사이의 간격
    -   `[필수]`focusIndex : 자,모음 중 포커스 색깔을 줄 인덱스 (자음:0, 모음:1)

    ```javascript
    "stepOne": {
        "equationValue": {
            "cx": 400,
            "cy": 250,
            "boxWidth": 140,
            "boxHeight": 140,
            "gap": 60
        },
        "focusIndex": 1
    },
    ```

    <br />

-   > ### stepTwo | _`object`_ | 두번째 단계

    -   `[필수]`equationValue : 자,모음 식
        -   `[필수]`cx : 이동 할 x 좌표
        -   `[필수]`cy : 이동 할 y 좌표
        -   `[필수]`scale : 재 조정 될 크기(stepOne 기준 = 1)
    -   `[필수]`handWriteValue : 핸드라이트 정보
        -   `[필수]`x : x 좌표
        -   `[필수]`y : y 좌표
        -   `[필수]`width : 핸드라이트 너비
        -   `[필수]`height : 핸드라이트 너비
        -   `[필수]`drawClassNum : 핸드라이트 선 색 번호
        -   `[필수]`startPoint : 핸드드라이트 시작 시 연필 아이콘
            -   `[필수]`x : 연필 아이콘 x 좌표
            -   `[필수]`y : 연필 아이콘 y 좌표
        -   `[필수]`okButton : 확인 버튼
            -   `[필수]`cx : x 좌표
            -   `[필수]`cy : y 좌표

    ```javascript
    "stepTwo": {
        "equationValue": {
            "cx": 400,
            "cy": 130,
            "scale": 0.55
        },
        "handWriteValue": {
            "x": 300,
            "y": 210,
            "width": 200,
            "height": 200,
            "drawClassNum": "001",
            "startPoint": {
                "x": 365,
                "y": 250
            },
            "okButton": {
                "cx": 400,
                "cy": 450
            }
        }
    },
    ```

    <br />

-   > ### stepThree | _`object`_ | 세번째 단계

    -   `[필수]`handWriteValue : 핸드라이트 정보
        -   `[필수]`x : x 좌표
        -   `[필수]`y : y 좌표
        -   `[필수]`width : 핸드라이트 너비
        -   `[필수]`height : 핸드라이트 너비
        -   `[필수]`drawClassNum : 핸드라이트 선 색 번호
        -   `[필수]`okButton : 확인 버튼
            -   `[필수]`cx : x 좌표
            -   `[필수]`cy : y 좌표

    ```javascript
    "stepThree": {
        "handWriteValue": {
            "x": 300,
            "y": 210,
            "width": 200,
            "height": 200,
            "drawClassNum": "001",
            "okButton": {
                "cx": 400,
                "cy": 450
            }
        }
    }
    ```

    <br />

-   > ### stepFour | _`object`_ | 네번째 단계

    -   `[필수]`imageButton : 이미지 버튼 정보
        -   `[필수]`x : x 좌표
        -   `[필수]`y : y 좌표
        -   `[필수]`width : 이미지 버튼 너비
        -   `[필수]`height : 이미지 버튼 너비
        -   `[필수]`btnFillClassNum : 이미지 버튼 채우기 색 번호
        -   `[필수]`btnStrokeClassNum : 이미지 버튼 선 색 번호
        -   `[옵션]`btnOpacity : 이미지 버튼 투명도 `(기본:1)`
        -   `[필수]`textInfo : 텍스트 정보
            -   `[필수]`cx : x 좌표
            -   `[필수]`cy : y 좌표
            -   `[필수]`text : 텍스트
            -   `[필수]`classNum : 폰트 색상 번호
            -   `[필수]`fontSize : 폰트 크기
            -   `[필수]`blankIndex : 텍스트 중에서 박스가 될 위치 (글자 위치 기준)
            -   `[필수]`r : x,y축 반경 (둥근 정도)
        -   `[필수]`imageInfo : 이미지 정보
            -   `[필수]`cx : x 좌표
            -   `[필수]`cy : y 좌표
            -   `[필수]`img : 이미지
                -   `[필수]`url : 이미지 url
                -   `[필수]`scale : 이미지 크기
    -   `[필수]`handWriteValue : 핸드라이트 정보
        -   `[필수]`x : x 좌표
        -   `[필수]`y : y 좌표
        -   `[필수]`width : 핸드라이트 너비
        -   `[필수]`height : 핸드라이트 너비
        -   `[필수]`drawClassNum : 핸드라이트 선 색 번호
        -   `[필수]`okButton : 확인 버튼
            -   `[필수]`cx : x 좌표
            -   `[필수]`cy : y 좌표

    ```javascript
    "stepFour": {
        "imageButton": {
            "x": 170,
            "y": 200,
            "width": 200,
            "height": 200,
            "btnFillClassNum": 114,
            "btnStrokeClassNum": 114,
            "btnOpacity":1,
            "textInfo": {
                "cx": 275,
                "cy": 360,
                "text": "text_index_2",
                "classNum": "91",
                "fontSize": 50,
                "blankIndex": 0,
                "r": 10
            },
            "imageInfo": [{
                "cx": 270,
                "cy": 270,
                "img": {
                    "url": "image_index_0",
                    "scale": 0.17
                }
            }, ...]
        },
        "handWriteValue": {
            "x": 430,
            "y": 200,
            "width": 200,
            "height": 200,
            "drawClassNum": "001",
            "okButton": {
                "cx": 400,
                "cy": 470
            }
        }
    }
    ```

    <br />

> ## KM000017

    write

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000017",
        "direction": {
            "x": 70,
            "y": 50,
            "text": "text_index_0",
            "classNum": "91",
            "fontSize": 20,
            "dy": 45,
            "bold": true
        },
        "shapeInfo": {
            "type": "circle",
            "cx": 75,
            "cy": 150,
            "size": 70,
            "rowGap": 60,
            "colGap": 100,
            "row": {
                "text": ["text_index_1", "text_index_2", "text_index_3", "text_index_4", "text_index_5", "text_index_6", "text_index_7"],
                "maxCount": 3
            },
            "addText": "text_index_8",
            "shapeGap": 60,
            "fillClassNum": "009",
            "strkoClassNum": "013",
            "questionIndex": [5],
            "sound": [{
                "url": "sound_index_0"
            }]
        },
        "popUpInfo": {
            "equationValue": {
                "x": 75,
                "y": 175,
                "width": 100,
                "height": 100,
                "gap": 200,
                "plusScale": 0.7,
                "arrowScale": 1,
                "wordInfo": [{
                    "scale": 0.8,
                    "offset": {
                        "x": -5,
                        "y": -10
                    }
                }, {
                    "scale": 0.8,
                    "offset": {
                        "x": -5,
                        "y": -10
                    }
                }]
            },
            "handWriteValue": {
                "x": 475,
                "y": 100,
                "width": 250,
                "height": 250,
                "drawClassNum": "001",
                "background": {
                    "fillClassNum": "14",
                    "strokeClassNum": "01"
                },
                "okButton": {
                    "type": 0,
                    "cx": 400,
                    "cy": 450
                }
            }
        },
        "okButton": {
            "type": 0,
            "cx": 400,
            "cy": 450
        }
    }
    ```

-   > ### questionType | _`string`_ | 모듈 설정

    ```javascript
    "questionType": "KM000017";
    ```

    <br />

-   > ### direction | _`object`_ | 지시문 설정

    -   `[필수]`x : x좌표
    -   `[필수]`y : y좌표
    -   `[필수]`text : 텍스트 설정
    -   `[옵션]`classNum : 색상 번호 `(기본:'91')`
    -   `[옵션]`fontSize : 폰트 크기 `(기본:20)`
    -   `[옵션]`dy : 줄 간격 `(기본:45)`
    -   `[옵션]`bold : 텍스트 진하게 여부 `(기본:false)`
    -   `[옵션]`options : 텍스트에 옵션 부여 `(기본:없음, color, underline, box, highlight)`

    ```javascript
    "direction": {
        "x": 70,
        "y": 50,
        "text": "text_index_0",
        "classNum": "91",
        "fontSize": 20,
        "dy": 45,
        "bold": true,
        "options": [{
            "type": "box",
            "classNum": "01",
            "boxText": "?",
            "boxTextClass": "91",
            "boxTextScale": 0.8,
            "bold": true
        }]
    }
    ```

    <br />

-   > ### shapeInfo | _`object`_ | 첫화면 모양 정보

    -   `[필수]`type : 모양 유형 (circle, rect)
    -   `[필수]`cx : 모양 세트의 앞 부분 x 좌표
    -   `[필수]`cy : 모양 세트의 앞 부분 y 좌표
    -   `[필수]`size : 각각의 모양 사이즈
    -   `[필수]`rowGap : 모양 한 세트의 행 간격
    -   `[필수]`colGap : 모양 한 세트의 열 간격
    -   `[필수]`row : 행에 들어갈 텍스트 정보
        -   `[필수]`text : 각각의 행에 들어갈 텍스트 배열(가 ~ 사)
        -   `[필수]`maxCount : 한 열에 보여질 모양 세트 수
    -   `[필수]`addText : 행에 들어갈 텍스트와 합칠 텍스트
    -   `[필수]`shapeGap : 모양 한 세트 안에서 모양 간의 간격
    -   `[필수]`fillClassNum : 모양 채우기 색 번호
    -   `[필수]`strkoClassNum : 모양 선 색 번호
    -   `[필수]`questionIndex : 행에 들어갈 텍스트 배열 중 문제가 될 부분의 인덱스 (배열 형태)
    -   `[필수]`sound : 사운드 정보
        -   `[필수]`url : 사운드 url

    ```javascript
    "shapeInfo": {
        "type": "circle",
        "cx": 75,
        "cy": 150,
        "size": 70,
        "rowGap": 60,
        "colGap": 100,
        "row": {
            "text": ["text_index_1", "text_index_2", "text_index_3", "text_index_4", "text_index_5", "text_index_6", "text_index_7"],
            "maxCount": 3
        },
        "addText": "text_index_8",
        "shapeGap": 60,
        "fillClassNum": "009",
        "strkoClassNum": "013",
        "questionIndex": [5],
        "sound": [{
            "url": "sound_index_0"
        }]
    };
    ```

    <br />

-   > ### popUpInfo | _`object`_ | 팝업 화면 정보

    -   `[필수]`equationValue : 자,모음 식
        -   `[필수]`x : x 좌표
        -   `[필수]`y : y 좌표
        -   `[필수]`width : 너비
        -   `[필수]`height : 높이
        -   `[필수]`gap : 박스 간 간격
        -   `[필수]`plusScale : 덧셈 기호 크기
        -   `[필수]`arrowScale : 화살표 크기
        -   `[필수]`wordInfo : 자,모음 정보
            -   `[필수]`scale : 크기
            -   `[필수]`offset : 조정 값
                -   `[필수]`x : x 좌표
                -   `[필수]`y : y 좌표
            -   `[필수]`scale : 크기
            -   `[필수]`offset : 조정 값
                -   `[필수]`x : x 좌표
                -   `[필수]`y : y 좌표
    -   `[필수]`handWriteValue : 핸드라이트 정보
        -   `[필수]`x : x 좌표
        -   `[필수]`y : y 좌표
        -   `[필수]`width : 핸드라이트 너비
        -   `[필수]`height : 핸드라이트 높이
        -   `[필수]`drawClassNum : 핸드라이트 선 색 번호
        -   `[필수]`background : 배경
            -   `[필수]`fillClassNum : 채우기 색 번호
            -   `[필수]`strokeClassNum : 선 색 번호
        -   `[필수]`okButton : 확인 버튼
            -   `[필수]`type : 버튼 유형
            -   `[필수]`cx : x 좌표
            -   `[필수]`cy : y 좌표

    ```javascript
    "popUpInfo": {
        "equationValue": {
            "x": 75,
            "y": 175,
            "width": 100,
            "height": 100,
            "gap": 200,
            "plusScale": 0.7,
            "arrowScale": 1,
            "wordInfo": [{
                "scale": 0.8,
                "offset": {
                    "x": -5,
                    "y": -10
                }
            }, {
                "scale": 0.8,
                "offset": {
                    "x": -5,
                    "y": -10
                }
            }]
        },
        "handWriteValue": {
            "x": 475,
            "y": 100,
            "width": 250,
            "height": 250,
            "drawClassNum": "001",
            "background": {
                "fillClassNum": "14",
                "strokeClassNum": "01"
            },
            "okButton": {
                "type": 0,
                "cx": 400,
                "cy": 450
            }
        }
    }
    ```

    <br />

-   > ### okButton | _`object`_ | 마지막 확인 버튼

    -   `[필수]`type : 버튼 유형
    -   `[필수]`cx : x 좌표
    -   `[필수]`cy : y 좌표

    ```javascript
    "okButton": {
        "type": 0,
        "cx": 400,
        "cy": 450
    }
    ```

    <br />

> ## KM000018

    write

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000018",
        "direction": {
            "x": 70,
            "y": 50,
            "text": "지시문",
            "classNum": "91",
            "fontSize": 20,
            "dy": 45,
            "bold": true,
            "options": [{
                "type": "box",
                "classNum": "01",
                "boxText": "?",
                "boxTextClass": "91",
                "boxTextScale": 0.8,
                "bold": true
            }]
        },
        "word": "감",
        "equationValue": {
            "cx": 400,
            "cy": 140,
            "backGround": {
                "width": 600,
                "height": 120,
                "fillClassNum": "03",
                "strokeClassNum": "no",
                "opacity": 0.4
            },
            "boxWidth": 80,
            "boxHeight": 80,
            "gap": 60,
            "boxFillColor": "14",
            "boxStrokeColor": "061",
            "boxStrokeWidth": 3,
            "boxFocusStrokeColor": "04",
            "textClassNum": "001",
            "textFontSize": 55,
            "signSize": 40,
            "signClassNum": "01"
        },
        "handWriteValue": {
            "x": 300,
            "y": 220,
            "width": 200,
            "height": 200,
            "drawClassNum": "001",
            "drawStrokeWidth": 10,
            "boxFillClassNum": "14",
            "boxStrokeClassNum": "01",
            "boxOpacity": 1,
            "startPoint": {
                "type": 1,
                "x": 365,
                "y": 250
            },
            "okButton": {
                "cx": 400,
                "cy": 460
            }
        }
    }
    ```

-   > ### questionType | _`string`_ | 모듈 설정

    ```javascript
    "questionType": "KM000018";
    ```

    <br />

-   > ### direction | _`object`_ | 지시문 설정

    -   `[필수]`x : x좌표
    -   `[필수]`y : y좌표
    -   `[필수]`text : 텍스트 설정
    -   `[옵션]`classNum : 색상 번호 `(기본:'91')`
    -   `[옵션]`fontSize : 폰트 크기 `(기본:20)`
    -   `[옵션]`dy : 줄 간격 `(기본:45)`
    -   `[옵션]`bold : 텍스트 진하게 여부 `(기본:false)`
    -   `[옵션]`options : 텍스트에 옵션 부여 `(기본:없음, color, underline, box, highlight)`
        -   `[필수]`type : 옵션 타입
        -   `[필수]`classNum : 박스 선 색 번호
        -   `[필수]`boxText : 박스에 들어갈 텍스트
        -   `[필수]`boxTextClass : 박스에 들어갈 텍스트 색상 번호
        -   `[필수]`boxTextScale : 박스에 들어갈 텍스트 크기
        -   `[필수]`bold : 박스에 들어갈 텍스트 진하게

    ```javascript
    "direction": {
        "x": 70,
        "y": 50,
        "text": "text_index_0",
        "classNum": "91",
        "fontSize": 20,
        "dy": 45,
        "bold": true,
        "options": [{
            "type": "box",
            "classNum": "01",
            "boxText": "?",
            "boxTextClass": "91",
            "boxTextScale": 0.8,
            "bold": true
        }]
    }
    ```

    <br />

-   > ### word | _`string`_ | 조합되어 완성된 단어

    ```javascript
    "word": "text_index_1";
    ```

    <br />

-   > ### equationValue | _`object`_ | 글자 식

    -   `[필수]`cx : 식 전체 그룹 x좌표
    -   `[필수]`cy : 식 전체 그룹 y좌표
    -   `[필수]`backGround : 배경
        -   `[필수]`width : 너비
        -   `[필수]`height : 높이
        -   `[필수]`fillClassNum : 채우기 색 번호
        -   `[필수]`strokeClassNum : 선 색 번호
        -   `[필수]`opacity : 투명도
    -   `[필수]`boxWidth : 박스 너비
    -   `[필수]`boxHeight : 박스 높이
    -   `[필수]`gap : 박스들 사이의 간격
    -   `[옵션]`boxFillColor : 박스 채우기 색 번호 `(기본:'14')`
    -   `[옵션]`boxStrokeColor : 박스 선 색 번호 `(기본:'061')`
    -   `[옵션]`boxStrokeWidth : 박스 선 두께 `(기본:3)`
    -   `[옵션]`boxFocusStrokeColor : 박스 중 마지막(포커스) 부분의 선 색 번호 `(기본:'04')`
    -   `[필수]`textClassNum : 자,모음 색 번호
    -   `[옵션]`textFontSize : 자,모음 폰트 크기 `(기본: 박스 높이의 0.7배)`
    -   `[옵션]`signSize : 기호 크기 `(기본: 박스 높이의 0.5배)`
    -   `[옵션]`signClassNum : 기호 색 번호 `(기본: '01')`

    ```javascript
    "equationValue": {
        "cx": 400,
        "cy": 140,
        "backGround": {
            "width": 600,
            "height": 120,
            "fillClassNum": "03",
            "strokeClassNum": "no",
            "opacity": 0.4
        },
        "boxWidth": 80,
        "boxHeight": 80,
        "gap": 60,
        "boxFillColor": "14",
        "boxStrokeColor": "061",
        "boxStrokeWidth": 3,
        "boxFocusStrokeColor": "04",
        "textClassNum": "001",
        "textFontSize": 55,
        "signSize": 40,
        "signClassNum": "01"
    },
    ```

     <br />

-   > ### handWriteValue | _`object`_ | 핸드라이트 정보

    -   `[필수]`x : x값
    -   `[필수]`y : y값
    -   `[필수]`width : 너비
    -   `[필수]`height : 높이
    -   `[옵션]`drawClassNum : 그리기 색 번호 `(기본:'001')`
    -   `[필수]`drawStrokeWidth : 그리기 선 두께 `(기본:10)`
    -   `[옵션]`boxFillClassNum : 핸드라이트 박스 채우기 색 번호 `(기본:'14')`
    -   `[옵션]`boxStrokeClassNum : 핸드라이트 박스 선 색 번호 `(기본:'01')`
    -   `[옵션]`boxOpacity : 핸드라이트 박스 투명도 `(기본:1)`
    -   `[필수]`startPoint : 연필 아이콘의 위치
        -   `[필수]`type : 아이콘 타입 (0:아래로 향함, 1:위로 향함)
        -   `[필수]`x : x값
        -   `[필수]`y : y값
    -   `[필수]`okButton : 확인 버튼 정보
        -   `[필수]`cx : x값
        -   `[필수]`cy : y값

    ```javascript
    "handWriteValue": {
        "x": 300,
        "y": 220,
        "width": 200,
        "height": 200,
        "drawClassNum": "001",
        "drawStrokeWidth": 10,
        "boxFillClassNum": "14",
        "boxStrokeClassNum": "01",
        "boxOpacity": 1,
        "startPoint": {
            "type": 1,
            "x": 365,
            "y": 250
        },
        "okButton": {
            "cx": 400,
            "cy": 460
        }
    }
    ```

     <br />

> ## KM000019

    match

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000019",
        "direction": {
            "x": 70,
            "y": 50,
            "text": "지시문",
            "classNum": "91",
            "fontSize": 20,
            "dy": 45,
            "bold": true
        },
        "connectElement": {
            "leftEl": {
                "background": {
                    "type": "rect",
                    "cx": 205,
                    "cy": 250,
                    "ImgUrl": "이미지",
                    "ImgScale": 0.3,
                    "width": 290,
                    "height": 250,
                    "rXY": 10,
                    "shapeFillClassNum": "14",
                    "shapeStrokeClassNum": "04",
                    "shapeOpacity": 1,
                    "shapeStrokeWidth": 3
                },
                "rectInfo":[{
                    "x": 100,
                    "y": 320,
                    "width": 200,
                    "height": 80,
                    "r": 0,
                    "fillClassNum": "021",
                    "strokeClassNum": "no",
                    "opacity": 1,
                    "strokeWidth": 1
                }]
                "imageInfo": [{
                    "cx": 150,
                    "cy": 260,
                    "img": {
                        "url": "이미지",
                        "scale": 0.25
                    }
                }],
                "textInfo": {
                    "cx": 280,
                    "cy": 260,
                    "text": "문",
                    "classNum": "001",
                    "scale": 0.9,
                    "blankIndex": 2,
                    "blankWidth":65,
                    "blankHeight":30,
                    "blankR":3,
                    "blankFillClassNum":"14",
                    "blankStrokeClassNum":"01",
                    "blankStrokeWidth":1,
                    "blankOffset": {
                        "x": 0,
                        "y": 0
                    },
                    "blankQmark": true,
                    "blankQmarkSize":23,
                    "blankQmarkFontWeight":800,
                    "blankQmarkClass":"01",
                    "blankVisible": true
                },
                "connectAnsIndex": 0,
                "connectDotOffsets": {
                    "x": 30,
                    "y": 0
                }
            },
            "rightEl": [{
                "background": {
                    "type": "circle",
                    "cx": 690,
                    "cy": 130,
                    "r": 50,
                    "shapeFillClassNum": "14",
                    "shapeStrokeClassNum": "07",
                    "shapeOpacity": 1,
                    "shapeStrokeWidth": 3,
                    "shapeIsDashArray": true
                },
                "textInfo": {
                    "cx": 690,
                    "cy": 130,
                    "text": "ㄴ",
                    "classNum": "001",
                    "scale": 0.3
                },
                "connectDotOffsets": {
                    "x": -30,
                    "y": 0
                }
            }, {
                "background": {
                    "type": "circle",
                    "cx": 690,
                    "cy": 375,
                    "r": 50,
                    "shapeFillClassNum": "14",
                    "shapeStrokeClassNum": "07",
                    "shapeOpacity": 1,
                    "shapeStrokeWidth": 3,
                    "shapeIsDashArray": true
                },
                "textInfo": {
                    "cx": 690,
                    "cy": 375,
                    "text": "ㄹ",
                    "classNum": "001",
                    "scale": 0.3
                },
                "connectDotOffsets": {
                    "x": -30,
                    "y": 0
                }
            }],
            "lineClassNum": "04"
        },
        "soundInfo": {
            "url": "sound_index_0"
        },
        "fbSpeaker":{
            "x":95,
            "y":150,
            "scale":1
        }
    }
    ```

-   > ### questionType | _`string`_ | 모듈 설정

    ```javascript
    "questionType": "KM000019";
    ```

    <br />

-   > ### direction | _`object`_ | 지시문 설정

    -   `[필수]`x : x좌표
    -   `[필수]`y : y좌표
    -   `[필수]`text : 텍스트 설정
    -   `[옵션]`classNum : 색상 번호 `(기본:'91')`
    -   `[옵션]`fontSize : 폰트 크기 `(기본:20)`
    -   `[옵션]`dy : 줄 간격 `(기본:45)`
    -   `[옵션]`bold : 텍스트 진하게 여부 `(기본:false)`
    -   `[옵션]`options : 텍스트에 옵션 부여 `(기본:없음, color, underline, box, highlight)`

    ```javascript
    "direction": {
        "x": 70,
        "y": 50,
        "text": "text_index_0",
        "classNum": "91",
        "fontSize": 20,
        "dy": 45,
        "bold" : true,
        "options" : [{
            "type": "highlight",
            "classNum": "91",
            "bold": true,
            "fontSize": 40
        }]
    }
    ```

    <br />

-   > ### connectElement | _`object`_ | 연결하기 엘리먼트

    -   `[필수]`leftEl : 왼쪽 엘리먼트
        -   `[필수]`background : 배경 부분
            -   `[필수]`type : 배경 유형(이미지, rect, circle)
            -   `[필수]`cx : x값
            -   `[필수]`cy : y값
            -   `[옵션]`ImgUrl : 이미지 url (type이 image 일 때 필수)
            -   `[옵션]`ImgScale : 이미지 크기 (type이 image 일 때 필수)
            -   `[옵션]`width : 너비 (type이 rect 일 때 필수)
            -   `[옵션]`height : 높이 (type이 rect 일 때 필수)
            -   `[옵션]`rXY : (type이 rect 일 때 필수)
            -   `[옵션]`r : 반지름 (type이 circle 일 때 필수)
            -   `[옵션]`shapeFillClassNum : 채우기 색 번호 (type이 rect, circle 일 때 적용) `(기본:'03')`
            -   `[옵션]`shapeStrokeClassNum : 선 색 번호 (type이 rect, circle 일 때 적용) `(기본:'no')`
            -   `[옵션]`shapeOpacity : 투명도 (type이 rect, circle 일 때 적용) `(기본:1)`
            -   `[옵션]`shapeStrokeWidth : 선 두께 (type이 rect, circle 일 때 적용) `(기본:1)`
        -   `[필수]`rectInfo : 사각형 정보 배열
            -   `[필수]`x : x값
            -   `[필수]`y : y값
            -   `[필수]`width : 너비,
            -   `[필수]`height : 높이,
            -   `[옵션]`r : round 값, `(기본:0)`
            -   `[옵션]`fillClassNum : 사각형 채우기 색 번호 `(기본:'021')`,
            -   `[옵션]`strokeClassNum : 사각형 선 색 번호 `(기본:'no')`,
            -   `[옵션]`opacity : 사각형 투명도`(기본:1)`,
            -   `[옵션]`strokeWidth : 사각형 선 두께 `(기본:1)`
        -   `[필수]`imageInfo : 이미지 정보 배열
            -   `[필수]`cx : x값
            -   `[필수]`cy : y값
            -   `[필수]`img : 이미지
                -   `[필수]`url : 이미지 url
                -   `[옵션]`scale : 이미지 크기 `(기본:1)`
        -   `[필수]`textInfo : 텍스트 정보
            -   `[필수]`cx : x값
            -   `[필수]`cy : y값
            -   `[필수]`text : 텍스트
            -   `[옵션]`classNum : 폰트 색 번호 `(기본:'001')`
            -   `[옵션]`scale : 크기 `(기본:1)`
            -   `[필수]`blankIndex : 자,모음중에 빈칸으로 바뀔 인덱스
            -   `[옵션]`blankWidth : 빈칸 너비 `(기본:65)`
            -   `[옵션]`blankHeight : 빈칸 높이 `(기본:30)`
            -   `[옵션]`blankR : 빈칸 round `(기본:3)`
            -   `[옵션]`blankFillClassNum : 빈칸 채우기 색 번호 `(기본:'14')`
            -   `[옵션]`blankStrokeClassNum : 빈칸 선 색 번호 `(기본:'01')`
            -   `[옵션]`blankStrokeWidth : 빈칸 선 두께 `(기본:1)`
            -   `[옵션]`blankOffset : 빈칸 조정값 `(기본:{'x':0,'y':0})`
                -   `[필수]`x : x값
                -   `[필수]`y : y값
            -   `[옵션]`blankQmark : 빈칸 안에 물음표 마크 `(기본:true)`
            -   `[옵션]`blankQmarkSize : 빈칸 안에 물음표 크기 `(기본:23)`
            -   `[옵션]`blankQmarkFontWeight : 빈칸 안에 물음표 두께 `(기본:800, 700이 표준 텍스트 두께)`
            -   `[옵션]`blankQmarkClass : 빈칸 안에 물음표 색상 `(기본:'01')`
            -   `[옵션]`blankVisible : 빈칸이 보일 지 여부`(기본:true)`
        -   `[필수]`connectAnsIndex : 오른쪽 엘미언트에서 연결 할 정답 인덱스
        -   `[옵션]`connectDotOffsets : 연결 점 조정 값
            -   `[옵션]`x : x값 `(기본:0)`
            -   `[옵션]`y : y값 `(기본:0)`
    -   `[필수]`rightEl : 오른쪽 엘리먼트
        -   `[필수]`background : 배경 부분
            -   `[필수]`type : 배경 유형(이미지, rect, circle)
            -   `[필수]`cx : x값
            -   `[필수]`cy : y값
            -   `[옵션]`ImgUrl : 이미지 url (type이 image 일 때 필수)
            -   `[옵션]`ImgScale : 이미지 크기 (type이 image 일 때 필수)
            -   `[옵션]`width : 너비 (type이 rect 일 때 필수)
            -   `[옵션]`height : 높이 (type이 rect 일 때 필수)
            -   `[옵션]`rXY : round 값(type이 rect 일 때 필수)
            -   `[옵션]`r : 반지름 (type이 circle 일 때 필수)
            -   `[옵션]`shapeFillClassNum : 채우기 색 넘버 (type이 rect, circle 일 때 적용) `(기본:'03')`
            -   `[옵션]`shapeStrokeClassNum : 선 색 넘버 (type이 rect, circle 일 때 적용) `(기본:'no')`
            -   `[옵션]`shapeOpacity : 투명도 (type이 rect, circle 일 때 적용) `(기본:1)`
            -   `[옵션]`shapeStrokeWidth : 선 두께 (type이 rect, circle 일 때 적용) `(기본:1)`
        -   `[필수]`textInfo : 텍스트 정보
            -   `[필수]`cx : x값
            -   `[필수]`cy : y값
            -   `[필수]`text : 텍스트
            -   `[옵션]`classNum : 폰트 색 번호 `(기본:'001')`
            -   `[옵션]`scale : 크기 `(기본:1)`
        -   `[옵션]`connectDotOffsets : 연결 점 조정 값
            -   `[옵션]`x : x값 `(기본:0)`
            -   `[옵션]`y : y값 `(기본:0)`
    -   `[옵션]`lineClassNum : 연결 시 선 색 번호 `(기본:'04')`

    ```javascript
    "connectElement": {
        "leftEl": {
            "background": {
                "type": "rect",
                "cx": 205,
                "cy": 250,
                "ImgUrl": "image_index_0",
                "ImgScale": 0.3,
                "width": 290,
                "height": 250,
                "rXY": 10,
                "shapeFillClassNum": "14",
                "shapeStrokeClassNum": "04",
                "shapeOpacity": 1,
                "shapeStrokeWidth": 3
            },
            "rectInfo":[{
                "x": 100,
                "y": 320,
                "width": 200,
                "height": 80,
                "r": 0,
                "fillClassNum": "021",
                "strokeClassNum": "no",
                "opacity": 1,
                "strokeWidth": 1
            }, ...]
            "imageInfo": [{
                "cx": 150,
                "cy": 260,
                "img": {
                    "url": "image_index_1",
                    "scale": 0.25
                }
            }, ...],
            "textInfo": {
                "cx": 280,
                "cy": 260,
                "text": "text_index_1",
                "classNum": "001",
                "scale": 0.9,
                "blankIndex": 2,
                "blankWidth":65,
                "blankHeight":30,
                "blankR":3,
                "blankFillClassNum":"14",
                "blankStrokeClassNum":"01",
                "blankStrokeWidth":1,
                "blankOffset": {
                    "x": 0,
                    "y": 0
                },
                "blankQmark": true,
                "blankQmarkSize":23,
                "blankQmarkFontWeight":800,
                "blankQmarkClass":"01",
                "blankVisible": true
            },
            "connectAnsIndex": 0,
            "connectDotOffsets": {
                "x": 30,
                "y": 0
            }
        },
        "rightEl": [{
            "background": {
                "type": "circle",
                "cx": 690,
                "cy": 130,
                "r": 50,
                "shapeFillClassNum": "14",
                "shapeStrokeClassNum": "07",
                "shapeOpacity": 1,
                "shapeStrokeWidth": 3,
                "shapeIsDashArray": true
            },
            "textInfo": {
                "cx": 690,
                "cy": 130,
                "text": "text_index_2",
                "classNum": "001",
                "scale": 0.3
            },
            "connectDotOffsets": {
                "x": -30,
                "y": 0
            }
        }, ...],
        "lineClassNum": "04"
    },
    ```

    <br />

-   > ### soundInfo | _`object`_ | 사운드 설정

    -   `[필수]`url : 사운드 url

    ```javascript
    "soundInfo": {
        "url": "sound_index_0"
    }
    ```

    <br />

-   > ### fbSpeaker | _`object`_ | 음성 피드백으로 나오는 스피커 아이콘 정보

    -   `[옵션]`x : x 좌표 `(기본: 배경정보의 값을 이용하여 자동 계산)`
    -   `[옵션]`y : y 좌표 `(기본: 배경정보의 값을 이용하여 자동 계산)`
    -   `[옵션]`scale : 크기 `(기본: 1)`

    ```javascript
    "fbSpeaker":{
        "x":95,
        "y":150,
        "scale":1
    }
    ```

    <br />

> ## KM000020

    choice

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000020",
        "direction": {
            "x": 70,
            "y": 50,
            "text": "지시문",
            "classNum": "91",
            "fontSize": 20,
            "dy": 45,
            "bold": true,
            "speakerX": 30,
            "speakerY": 28
        },
        "rectInfo":[{
            "cx": 0,
            "cy": 0,
            "width": 0,
            "height": 0,
            "r":0,
            "fillClassNum":"14"
            "strokeClassNum":"04"
            "opacity":1
        }],
        "imageButton": {
            "isButton": true,
            "x": 100,
            "y": 90,
            "width": 600,
            "height": 230,
            "btnFillClassNum": "74",
            "btnStrokeClassNum": "no",
            "btnStrokeWidth": 1,
            "btnOpacity":1,
            "btnR": 10,
            "imageInfo": [{
                "cx": 300,
                "cy": 210,
                "img": {
                    "url": "이미지",
                    "scale": 0.18
                }
            }, {
                "cx": 130,
                "cy": 115,
                "img": {
                    "url": "이미지",
                    "scale": 1
                }
            }],
            "textInfo": {
                "cx": 570,
                "cy": 210,
                "text": "악어",
                "classNum": "001",
                "scale": 0.9,
                "blankIndex": 2,
                "blankOffset": {
                    "x": 0,
                    "y": 0
                },
                "blankWidth": 58,
                "blankHeight": 33,
                "blankR": 3,
                "blankFillClassNum": "14",
                "blankStrokeClassNum": "01",
                "blankStrokeWidth": 1,
                "blankQmarkSize": 27,
                "blankQmarkFontWeight": 800,
                "blankQmarkClass": "01",
                "blankQmark": true,
                "blankVisible": true
            },
            "soundInfo": {
                "url": "sound_index_0"
            }
        },
        "choiceElements": [{
            "btnInfo": {
                "x": 150,
                "y": 360,
                "width": 100,
                "height": 100,
                "fillClassNum": "14",
                "strokeClassNum": "117",
                "opacity":1,
                "r": 50
            },
            "wordInfo": {
                "word": "ㄱ",
                "fontSize": 50,
                "classNum": "001"
            },
            "isAns": true
        }, {
            "btnInfo": {
                "x": 350,
                "y": 360,
                "width": 100,
                "height": 100,
                "fillClassNum": "14",
                "strokeClassNum": "117",
                "opacity":1,
                "r": 50
            },
            "wordInfo": {
                "word": "ㅋ",
                "fontSize": 50,
                "classNum": "001"
            },
            "isAns": false
        }, {
            "btnInfo": {
                "x": 550,
                "y": 360,
                "width": 100,
                "height": 100,
                "fillClassNum": "14",
                "strokeClassNum": "117",
                "opacity":1,
                "r": 50
            },
            "wordInfo": {
                "word": "ㄲ",
                "fontSize": 50,
                "classNum": "001"
            },
            "isAns": false
        }]
    }
    ```

-   > ### questionType | _`string`_ | 모듈 설정

    ```javascript
    "questionType": "KM000020";
    ```

    <br />

-   > ### direction | _`object`_ | 지시문 설정

    -   `[필수]`x : x좌표
    -   `[필수]`y : y좌표
    -   `[필수]`text : 텍스트 설정
    -   `[옵션]`classNum : 색상 번호 `(기본:'91')`
    -   `[옵션]`fontSize : 폰트 크기 `(기본:20)`
    -   `[옵션]`dy : 줄 간격 `(기본:45)`
    -   `[옵션]`bold : 텍스트 진하게 여부 `(기본:false)`
    -   `[옵션]`options : 텍스트에 옵션 부여 `(기본:없음, color, underline, box, highlight)`
    -   `[옵션]`speakerX : 스피커 x좌표 `(기본: 지시문 x좌표 -40)`
    -   `[옵션]`speakerY : 스피커 y좌표 `(기본: 지시문 y좌표 -22)`

    ```javascript
    "direction": {
        "x": 70,
        "y": 50,
        "text": "text_index_0",
        "classNum": "91",
        "fontSize": 20,
        "dy": 45,
        "bold" : true,
        "options" : [{
            "type": "highlight",
            "classNum": "91",
            "bold": true,
            "fontSize": 40
        }],
        "speakerX": 30,
        "speakerY": 28
    }
    ```

    <br />

-   > ### rectInfo | _`Array`_ | 배경 사각형

    -   `[필수]`cx : x좌표
    -   `[필수]`cy : y좌표
    -   `[필수]`width : 너비
    -   `[필수]`height : 높이
    -   `[옵션]`r : 폰트 크기 `(기본:0)`
    -   `[옵션]`fillClassNum : 채우기 색 번호 `(기본:'14')`
    -   `[옵션]`strokeClassNum : 선 색 번호 `(기본:'04')`
    -   `[옵션]`strokeWidth : 선 두께`(기본:1)`
    -   `[옵션]`opacity : 투명도 `(기본:1)`

    ```javascript
    "rectInfo":[{
        "cx": 0,
        "cy": 0,
        "width": 0,
        "height": 0,
        "r":0,
        "fillClassNum":"14"
        "strokeClassNum":"04"
        'opacity':1
    }, ...],
    ```

    <br />

-   > ### imageButton | _`object`_ | 이미지 버튼

    -   `[필수]`isButton : 버튼(배경) 존재 유무
    -   `[필수]`x : x좌표
    -   `[필수]`y : y좌표
    -   `[필수]`width : 너비
    -   `[필수]`height : 높이
    -   `[옵션]`btnFillClassNum : 버튼 채우기 색 번호 `(기본:14)`
    -   `[옵션]`btnStrokeClassNum : 버튼 선 색 번호 `(기본:117)`
    -   `[옵션]`btnStrokeWidth : 버튼 선 두께 `(기본:1)`
    -   `[옵션]`btnOpacity : 버튼 투명도 `(기본:1)`
    -   `[옵션]`btnR : 버튼 round 값 `(기본:10)`
    -   `[필수]`imageInfo : 이미지 정보 `(기본:'없음')`
        -   `[필수]`cx : x좌표
        -   `[필수]`cy : y좌표
        -   `[필수]`img : 이미지
            -   `[필수]`url : 이미지 url
            -   `[옵션]`scale : 크기 `(기본:'1')`
    -   `[필수]`textInfo : 텍스트에 정보
        -   `[필수]`cx : x좌표
        -   `[필수]`cy : y좌표
        -   `[필수]`text : 텍스트
        -   `[옵션]`classNum : 텍스트 색상 번호 `(기본:'001')`
        -   `[옵션]`scale : 텍스트 크기 `(기본:1)`
        -   `[필수]`blankIndex : 자,모음중에 빈칸으로 바뀔 인덱스
        -   `[옵션]`blankWidth : 빈칸 너비 `(기본:58)`
        -   `[옵션]`blankHeight : 빈칸 높이 `(기본:33)`
        -   `[옵션]`blankR : 빈칸 round `(기본:3)`
        -   `[옵션]`blankFillClassNum : 빈칸 채우기 색 번호 `(기본:'14')`
        -   `[옵션]`blankStrokeClassNum : 빈칸 선 색 번호 `(기본:'01')`
        -   `[옵션]`blankStrokeWidth : 빈칸 선 두께 `(기본:1)`
        -   `[옵션]`blankOffset : 빈칸 조정값 `(기본:{'x':0,'y':0})`
            -   `[필수]`x : x값
            -   `[필수]`y : y값
        -   `[옵션]`blankQmark : 빈칸 안에 물음표 마크 `(기본:true)`
        -   `[옵션]`blankQmarkSize : 빈칸 안에 물음표 크기 `(기본:23)`
        -   `[옵션]`blankQmarkFontWeight : 빈칸 안에 물음표 두께 `(기본:800, 700이 표준 텍스트 두께)`
        -   `[옵션]`blankQmarkClass : 빈칸 안에 물음표 색상 `(기본:'01')`
        -   `[옵션]`blankVisible : 빈칸이 보일 지 여부`(기본:true)`
    -   `[옵션]`soundInfo : 사운드 정보
        -   `[옵션]`url : 사운드 url

    ```javascript
    "imageButton": {
        "isButton": true,
        "x": 100,
        "y": 90,
        "width": 600,
        "height": 230,
        "btnFillClassNum": "74",
        "btnStrokeClassNum": "no",
        "btnStrokeWidth": 1,
        "btnOpacity":1,
        "btnR": 10,
        "imageInfo": [{
            "cx": 300,
            "cy": 210,
            "img": {
                "url": "image_index_0",
                "scale": 0.18
            }
        }, ...],
        "textInfo": {
            "cx": 570,
            "cy": 210,
            "text": "text_index_1",
            "classNum": "001",
            "scale": 0.9,
            "blankIndex": 2,
            "blankOffset": {
                "x": 0,
                "y": 0
            },
            "blankWidth": 58,
            "blankHeight": 33,
            "blankR": 3,
            "blankFillClassNum": "14",
            "blankStrokeClassNum": "01",
            "blankStrokeWidth": 1,
            "blankQmarkSize": 27,
            "blankQmarkFontWeight": 800,
            "blankQmarkClass": "01",
            "blankQmark": true,
            "blankVisible": true
        },
        "soundInfo": {
            "url": "sound_index_0"
        }
    }
    ```

    <br />

-   > ### choiceElements | _`Array`_ | 선택 버튼

    -   `[필수]`btnInfo : 선택 버튼 정보
        -   `[필수]`x : x좌표
        -   `[필수]`y : y좌표
        -   `[필수]`width : 너비
        -   `[옵션]`height : 높이
        -   `[옵션]`fillClassNum : 채우기 색 번호 `(기본:14)`
        -   `[옵션]`strokeClassNum : 선 색 번호 `(기본:117)`
        -   `[옵션]`opacity : 투명도 `(기본:1)`
        -   `[옵션]`r : 버튼 round 값 `(기본:10, 너비와 높이가 같고 r이 그 값의 반일 때 : 원형)`
    -   `[필수]`wordInfo : 선택지 단어 정보 `(기본:'없음')`
        -   `[필수]`word : 단어
        -   `[옵션]`fontSize : 폰트 크기 `(기본:40)`
        -   `[옵션]`classNum : 단어 색상 `(기본:'91')`
    -   `[필수]`isAns : 정답 유무

    ```javascript
    "choiceElements": [{
        "btnInfo": {
            "x": 150,
            "y": 360,
            "width": 100,
            "height": 100,
            "fillClassNum": "14",
            "strokeClassNum": "117",
            "opacity":1,
            "r": 50
        },
        "wordInfo": {
            "word": "text_index_2",
            "fontSize": 50,
            "classNum": "001"
        },
        "isAns": true
    }, ...]
    ```

    <br />

-   > ### callbackEndTime | _`Number`_ | 종료 시 화면이 전환되는데 걸리는 시간

    ```javascript
    "callbackEndTime": 500,
    ```

    <br />

> ## KM000021

    check

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000021",
        "direction": {
            "x": 70,
            "y": 50,
            "text": "text_index_0",
            "classNum": "91",
            "fontSize": 20,
            "dy": 45,
            "bold": true,
            "speakerX": 30,
            "speakerY": 28
        },
        "stepOne": {
            "imageButton": {
                "isButton": true,
                "x": 100,
                "y": 120,
                "width": 600,
                "height": 250,
                "btnFillClassNum": "14",
                "btnStrokeClassNum": "01",
                "btnStrokeWidth": 1,
                "btnOpacity":1,
                "btnR": 10,
                "imageInfo": [{
                    "cx": 270,
                    "cy": 250,
                    "img": {
                        "url": "image_index_0",
                        "scale": 0.25
                    }
                }, {
                    "cx": 130,
                    "cy": 150,
                    "img": {
                        "url": "image_index_1",
                        "scale": 1
                    }
                }],
                "textInfo": {
                    "cx": 550,
                    "cy": 245,
                    "text": "text_index_1",
                    "classNum": "001",
                    "scale": 1
                },
                "textBackground": {
                    "cx": 550,
                    "cy": 245,
                    "width": 160,
                    "height": 160,
                    "r": 20,
                    "fillClassNum": "14",
                    "strokeClassNum": "05"
                },
                "soundInfo": {
                    "url": "sound_index_0"
                }
            },
            "okButton": {
                "type": 1,
                "cx": 400,
                "cy": 450
            }
        },
        "stepTwo": {
            "standardX": 330,
            "standardY": 80,
            "gapY": 100,
            "puzzleScale": 1.8,
            "element": [{
                "textInfo": {
                    "text": "text_index_1",
                    "offset": {
                        "x": 0,
                        "y": 0
                    },
                    "classNum": "001",
                    "scale": 0.7
                },
                "background": {
                    "fillClassNum": "90",
                    "strokeClassNum": "no"
                }
            }, {
                "textInfo": {
                    "text": "text_index_2",
                    "offset": {
                        "x": 0,
                        "y": 0
                    },
                    "classNum": "001",
                    "scale": 0.4
                },
                "background": {
                    "fillClassNum": "67",
                    "strokeClassNum": "no"
                }
            }]
        },
        "stepThree": {
            "imageButton": {
                "isButton": true,
                "x": 100,
                "y": 120,
                "width": 600,
                "height": 250,
                "btnFillClassNum": "14",
                "btnStrokeClassNum": "01",
                "btnStrokeWidth": 1,
                "btnOpacity":1,
                "btnR": 10,
                "imageInfo": [{
                    "cx": 250,
                    "cy": 250,
                    "img": {
                        "url": "image_index_2",
                        "scale": 0.3
                    }
                }, {
                    "cx": 130,
                    "cy": 150,
                    "img": {
                        "url": "image_index_1",
                        "scale": 1
                    }
                }],
                "textInfo": {
                    "cx": 550,
                    "cy": 245,
                    "text": "text_index_3",
                    "classNum": "001",
                    "scale": 1,
                    "focusIndex":2,
                    "focussClass":"02"
                },
                "textBackground": {
                    "cx": 550,
                    "cy": 245,
                    "width": 160,
                    "height": 160,
                    "r": 20,
                    "fillClassNum": 14,
                    "strokeClassNum": "05"
                },
                "soundInfo": {
                    "url": "sound_index_1"
                }
            },
            "okButton": {
                "type": 1,
                "cx": 400,
                "cy": 450
            }
        },
        "stepFour": {
            "item": [{
                "imageInfo": {
                    "cx": 200,
                    "cy": 150,
                    "img": {
                        "url": "image_index_0",
                        "scale":0.2
                    }
                },
                "textInfo": {
                    "cx": 200,
                    "cy": 350,
                    "text": "text_index_1",
                    "classNum": "001",
                    "scale": 0.8
                },"textBackground": {
                    "cx": 200,
                    "cy": 350,
                    "width": 128,
                    "height": 128,
                    "r": 16,
                    "fillClassNum": 14,
                    "strokeClassNum": "05"
                },
                "growBigSize": 1.3
            }, {
                "imageInfo": {
                    "cx": 600,
                    "cy": 150,
                    "img": {
                        "url": "image_index_2",
                        "scale":0.2
                    }
                },
                "textInfo": {
                    "cx": 600,
                    "cy": 350,
                    "text": "text_index_3",
                    "classNum": "001",
                    "scale": 0.8
                },"textBackground": {
                    "cx": 600,
                    "cy": 350,
                    "width": 128,
                    "height": 128,
                    "r": 16,
                    "fillClassNum": 14,
                    "strokeClassNum": "05"
                },
                "growBigSize": 1.3
            }]
        }
    }
    ```

-   > ### questionType | _`string`_ | 모듈 설정

    ```javascript
    "questionType": "KM000021";
    ```

    <br />

-   > ### direction | _`object`_ | 지시문 설정

    -   `[필수]`x : x좌표
    -   `[필수]`y : y좌표
    -   `[필수]`text : 텍스트 설정
    -   `[옵션]`classNum : 색상 번호 `(기본:'91')`
    -   `[옵션]`fontSize : 폰트 크기 `(기본:20)`
    -   `[옵션]`dy : 줄 간격 `(기본:45)`
    -   `[옵션]`bold : 텍스트 진하게 여부 `(기본:false)`
    -   `[옵션]`options : 텍스트에 옵션 부여 `(기본:없음, color, underline, box, highlight)`
    -   `[옵션]`speakerX : 스피커 x좌표 `(기본: 지시문 x좌표 -40)`
    -   `[옵션]`speakerY : 스피커 y좌표 `(기본: 지시문 y좌표 -22)`

    ```javascript
    "direction": {
        "x": 70,
        "y": 50,
        "text": "text_index_0",
        "classNum": "91",
        "fontSize": 20,
        "dy": 45,
        "bold" : true,
        "options" : [{
            "type": "color",
            "classNum": "91",
            "bold": true,
            "fontSize": 40
        }],
        "speakerX": 30,
        "speakerY": 28
    }
    ```

    <br />

-   > ### stepOne | _`object`_ | 첫번째 단계

    -   `[필수]`imageButton : 이미지 버튼
        -   `[필수]`isButton : 버튼(배경) 존재 유무
        -   `[필수]`x : x 좌표
        -   `[필수]`y : y 좌표
        -   `[필수]`width : 버튼 너비
        -   `[필수]`height : 버튼 높이
        -   `[옵션]`btnFillClassNum : 버튼 채우기 색 번호 `(기본:'14')`
        -   `[옵션]`btnStrokeClassNum : 버튼 선 색 번호 `(기본:'117')`
        -   `[옵션]`btnStrokeWidth : 버튼 선 두께 `(기본:1)`
        -   `[옵션]`btnOpacity : 버튼 투명도 `(기본:1)`
        -   `[옵션]`btnR : 버튼 round 값 `(기본:10)`
        -   `[필수]`imageInfo : 이미지 정보
            -   `[필수]`cx : x 좌표(중앙 배치)
            -   `[필수]`cy : y 좌표(중앙 배치)
            -   `[필수]`img : 이미지
                -   `[필수]`url : 이미지 경로
                -   `[옵션]`scale : 이미지 크기 `(기본:1)`
        -   `[필수]`textInfo : 텍스트 정보
            -   `[필수]`cx : x 좌표(중앙 배치)
            -   `[필수]`cy : y 좌표(중앙 배치)
            -   `[필수]`text : 텍스트
            -   `[옵션]`classNum : 텍스트 색 번호 `(기본:'001')`
            -   `[옵션]`scale : 텍스트 크기`(기본:0.5)`
        -   `[필수]`textBackground : 텍스트를 감싸고 있는 배경
            -   `[필수]`cx : x 좌표(중앙 배치)
            -   `[필수]`cy : y 좌표(중앙 배치)
            -   `[필수]`width : 너비
            -   `[필수]`height : 높이
            -   `[옵션]`r : round 값 `(기본:0)`
            -   `[옵션]`fillClassNum : 채우기 색 번호 `(기본:'14')`
            -   `[옵션]`strokeClassNum : 선 색 번호 `(기본:'14')`
        -   `[필수]`soundInfo : 사운드 정보
            -   `[필수]`url : 사운드 경로
    -   `[필수]`okButton : ok 버튼
        -   `[필수]`type : 버튼 유형
        -   `[필수]`cx : x 좌표(중앙 배치)
        -   `[필수]`cy : y 좌표(중앙 배치)

    ```javascript
    "stepOne": {
        "imageButton": {
            "isButton": true,
            "x": 100,
            "y": 120,
            "width": 600,
            "height": 250,
            "btnFillClassNum": "14",
            "btnStrokeClassNum": "01",
            "btnStrokeWidth": 1,
            "btnOpacity":1,
            "btnR": 10,
            "imageInfo": [{
                "cx": 270,
                "cy": 250,
                "img": {
                    "url": "image_index_0",
                    "scale": 0.25
                }
            }, {
                "cx": 130,
                "cy": 150,
                "img": {
                    "url": "image_index_1",
                    "scale": 1
                }
            }],
            "textInfo": {
                "cx": 550,
                "cy": 245,
                "text": "text_index_1",
                "classNum": "001",
                "scale": 1
            },
            "textBackground": {
                "cx": 550,
                "cy": 245,
                "width": 160,
                "height": 160,
                "r": 20,
                "fillClassNum": "14",
                "strokeClassNum": "05"
            },
            "soundInfo": {
                "url": "sound_index_0"
            }
        },
        "okButton": {
            "type": 1,
            "cx": 400,
            "cy": 450
        }
    }
    ```

      <br />

-   > ### stepTwo | _`object`_ | 두번째 단계

    -   `[필수]`standardX : 기준이 되는 조각의 x 좌표
    -   `[필수]`standardY : 기준이 되는 조각의 y 좌표
    -   `[필수]`gapY : 조각들 사이의 y 거리
    -   `[필수]`puzzleScale : 조각의 크기
    -   `[필수]`element : 조각 요소(2가지)
        -   `[필수]`textInfo : 첫번째 텍스트 정보
            -   `[필수]`text : 텍스트
            -   `[필수]`offset : 위치 조정 값
                -   `[필수]`x : x값
                -   `[필수]`y : y값
            -   `[필수]`classNum : 폰트 색상 번호
            -   `[필수]`scale : 폰트 크기
        -   `[필수]`background : 배경(조각 이미지)
            -   `[필수]`fillClassNum : 채우기 색 번호
            -   `[필수]`strokeClassNum : 선 색 번호
        -   `[필수]`textInfo : 두번째 텍스트 정보
            -   `[필수]`text : 텍스트
            -   `[필수]`offset : 위치 조정 값
                -   `[필수]`x : x값
                -   `[필수]`y : y값
            -   `[필수]`classNum : 폰트 색상 번호
            -   `[필수]`scale : 폰트 크기
        -   `[필수]`background : 배경(조각 이미지)
            -   `[필수]`fillClassNum : 채우기 색 번호
            -   `[필수]`strokeClassNum : 선 색 번호

    ```javascript
    "stepTwo": {
        "standardX": 330,
        "standardY": 80,
        "gapY": 100,
        "puzzleScale": 1.8,
        "element": [{
            "textInfo": {
                "text": "text_index_1",
                "offset": {
                    "x": 0,
                    "y": 0
                },
                "classNum": "001",
                "scale": 0.7
            },
            "background": {
                "fillClassNum": "90",
                "strokeClassNum": "no"
            }
        }, {
            "textInfo": {
                "text": "text_index_2",
                "offset": {
                    "x": 0,
                    "y": 0
                },
                "classNum": "001",
                "scale": 0.4
            },
            "background": {
                "fillClassNum": "67",
                "strokeClassNum": "no"
            }
        }]
    },
    ```

      <br />

-   > ### stepThree | _`object`_ | 세번째 단계

    -   `[필수]`imageButton : 이미지 버튼
        -   `[필수]`isButton : 버튼(배경) 존재 유무
        -   `[필수]`x : x 좌표
        -   `[필수]`y : y 좌표
        -   `[필수]`width : 버튼 너비
        -   `[필수]`height : 버튼 높이
        -   `[옵션]`btnFillClassNum : 버튼 채우기 색 번호 `(기본:'14')`
        -   `[옵션]`btnStrokeClassNum : 버튼 선 색 번호 `(기본:'117')`
        -   `[옵션]`btnStrokeWidth : 버튼 선 두께 `(기본:1)`
        -   `[옵션]`btnOpacity : 버튼 투명도 `(기본:1)`
        -   `[옵션]`btnR : 버튼 round 값 `(기본:10)`
        -   `[필수]`imageInfo : 이미지 정보
            -   `[필수]`cx : x 좌표(중앙 배치)
            -   `[필수]`cy : y 좌표(중앙 배치)
            -   `[필수]`img : 이미지
                -   `[필수]`url : 이미지 경로
                -   `[옵션]`scale : 이미지 크기 `(기본:1)`
        -   `[필수]`textInfo : 텍스트 정보
            -   `[필수]`cx : x 좌표(중앙 배치)
            -   `[필수]`cy : y 좌표(중앙 배치)
            -   `[필수]`text : 텍스트
            -   `[옵션]`classNum : 텍스트 색 번호 `(기본:'001')`
            -   `[옵션]`scale : 텍스트 크기`(기본:0.5)`
            -   `[옵션]`focusIndex : 텍스트 중 포커스 할(색을 바꿀) 인덱스`(기본:없음)`
            -   `[옵션]`focussClass : 포커스 색상 번호 `(기본:'02')`
        -   `[필수]`textBackground : 텍스트를 감싸고 있는 배경
            -   `[필수]`cx : x 좌표(중앙 배치)
            -   `[필수]`cy : y 좌표(중앙 배치)
            -   `[필수]`width : 너비
            -   `[필수]`height : 높이
            -   `[옵션]`r : round 값 `(기본:0)`
            -   `[옵션]`fillClassNum : 채우기 색 번호 `(기본:'14')`
            -   `[옵션]`strokeClassNum : 선 색 번호 `(기본:'14')`
        -   `[필수]`soundInfo : 사운드 정보
            -   `[필수]`url : 사운드 경로
    -   `[필수]`okButton : ok 버튼
        -   `[필수]`type : 버튼 유형
        -   `[필수]`cx : x 좌표(중앙 배치)
        -   `[필수]`cy : y 좌표(중앙 배치)

    ```javascript

    "stepThree": {
        "imageButton": {
            "isButton": true,
            "x": 100,
            "y": 120,
            "width": 600,
            "height": 250,
            "btnFillClassNum": "14",
            "btnStrokeClassNum": "01",
            "btnStrokeWidth": 1,
            "btnOpacity":1,
            "btnR": 10,
            "imageInfo": [{
                "cx": 250,
                "cy": 250,
                "img": {
                    "url": "image_index_2",
                    "scale": 0.3
                }
            }, {
                "cx": 130,
                "cy": 150,
                "img": {
                    "url": "image_index_1",
                    "scale": 1
                }
            }],
            "textInfo": {
                "cx": 550,
                "cy": 245,
                "text": "text_index_3",
                "classNum": "001",
                "scale": 1,
                "focusIndex":2,
                "focussClass":"02"
            },
            "textBackground": {
                "cx": 550,
                "cy": 245,
                "width": 160,
                "height": 160,
                "r": 20,
                "fillClassNum": 14,
                "strokeClassNum": "05"
            },
            "soundInfo": {
                "url": "sound_index_1"
            }
        },
        "okButton": {
            "type": 1,
            "cx": 400,
            "cy": 450
        }
    }
    ```

      <br />

-   > ### stepFour | _`object`_ | 네번째 단계

    -   `[필수]`item : 사이즈가 커질 엘리먼트
        -   `[필수]`imageInfo : 이미지 정보
            -   `[필수]`cx : x 좌표
            -   `[필수]`cy : y 좌표
            -   `[필수]`img : 이미지
                -   `[필수]`url : 이미지 경로
                -   `[옵션]`scale : 이미지 크기 `(기본:1)`
        -   `[옵션]`textInfo : 텍스트
            -   `[옵션]`cx : x 좌표
            -   `[필수]`cy : y 좌표
            -   `[필수]`text : 텍스트
            -   `[옵션]`classNum : 텍스트 색 번호 `(기본:'001')`
            -   `[옵션]`scale : 텍스트 크기`(기본:0.5)`
        -   `[필수]`textBackground : 텍스트를 감싸고 있는 배경
            -   `[필수]`cx : x 좌표(중앙 배치)
            -   `[필수]`cy : y 좌표(중앙 배치)
            -   `[필수]`width : 너비
            -   `[필수]`height : 높이
            -   `[옵션]`r : round 값 `(기본:0)`
            -   `[옵션]`fillClassNum : 채우기 색 번호 `(기본:'14')`
            -   `[옵션]`strokeClassNum : 선 색 번호 `(기본:'14')`
        -   `[필수]`growBigSize : 이미지,텍스트 그룹이 커질 사이즈(현재 기준 n배)

    ```javascript
    "stepFour": {
        "item": [{
            "imageInfo": {
                "cx": 200,
                "cy": 150,
                "img": {
                    "url": "image_index_0",
                    "scale":0.2
                }
            },
            "textInfo": {
                "cx": 200,
                "cy": 350,
                "text": "text_index_1",
                "classNum": "001",
                "scale": 0.8
            },"textBackground": {
                "cx": 200,
                "cy": 350,
                "width": 128,
                "height": 128,
                "r": 16,
                "fillClassNum": 14,
                "strokeClassNum": "05"
            },
            "growBigSize": 1.3
        }, {
            "imageInfo": {
                "cx": 600,
                "cy": 150,
                "img": {
                    "url": "image_index_2",
                    "scale":0.2
                }
            },
            "textInfo": {
                "cx": 600,
                "cy": 350,
                "text": "text_index_3",
                "classNum": "001",
                "scale": 0.8
            },"textBackground": {
                "cx": 600,
                "cy": 350,
                "width": 128,
                "height": 128,
                "r": 16,
                "fillClassNum": 14,
                "strokeClassNum": "05"
            },
            "growBigSize": 1.3
        }]
    }
    ```

      <br />

> ## KM000022

    choose

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000022",
        "direction": {
            "x": 70,
            "y": 50,
            "text": "지시문",
            "classNum": "91",
            "fontSize": 20,
            "dy": 45,
            "bold": true
            "speakerX": 30,
            "speakerY": 28
        },
        "choiceElement": {
            "hintCount": 0,
            "textInfo": [{
                "x": 110,
                "y": 110,
                "text": "가위",
                "searchWord": "ㄱ",
                "scale": 0.8,
                "classNum": "001",
                "btnWidth": 120,
                "btnHeight": 120,
                "btnGapX": 0,
                "btnGapY": 0,
                "center": false
            }, {
                "x": 450,
                "y": 110,
                "text": "가위",
                "searchWord": "ㄱ",
                "scale": 0.8,
                "classNum": "001",
                "btnWidth": 120,
                "btnHeight": 120,
                "btnGapX": 0,
                "btnGapY": 0,
                "center": false
            }, {
                "x": 110,
                "y": 320,
                "text": "가위",
                "searchWord": "ㄱ",
                "scale": 0.8,
                "classNum": "001",
                "btnWidth": 120,
                "btnHeight": 120,
                "btnGapX": 0,
                "btnGapY": 0,
                "center": false
            }, {
                "x": 450,
                "y": 320,
                "text": "가위",
                "searchWord": "ㄱ",
                "scale": 0.8,
                "classNum": "001",
                "btnWidth": 120,
                "btnHeight": 120,
                "btnGapX": 0,
                "btnGapY": 0,
                "center": false
            }],
            "backGround": [{
                "cx": 230,
                "cy": 170,
                "width": 315,
                "height": 180,
                "r": 20,
                "fillClassNum": "74",
                "strokeClassNum": "no"
            }, {
                "cx": 570,
                "cy": 170,
                "width": 315,
                "height": 180,
                "r": 20,
                "fillClassNum": "74",
                "strokeClassNum": "no"
            }, {
                "cx": 230,
                "cy": 380,
                "width": 315,
                "height": 180,
                "r": 20,
                "fillClassNum": "74",
                "strokeClassNum": "no"
            }, {
                "cx": 570,
                "cy": 380,
                "width": 315,
                "height": 180,
                "r": 20,
                "fillClassNum": "74",
                "strokeClassNum": "no"
            }]
        }
    }
    ```

-   > ### questionType | _`string`_ | 모듈 설정

    ```javascript
    "questionType": "KM000022";
    ```

    <br />

-   > ### direction | _`object`_ | 지시문 설정

    -   `[필수]`x : x좌표
    -   `[필수]`y : y좌표
    -   `[필수]`text : 텍스트 설정
    -   `[옵션]`classNum : 색상 번호 `(기본:'91')`
    -   `[옵션]`fontSize : 폰트 크기 `(기본:20)`
    -   `[옵션]`dy : 줄 간격 `(기본:45)`
    -   `[옵션]`bold : 텍스트 진하게 여부 `(기본:false)`
    -   `[옵션]`options : 텍스트에 옵션 부여 `(기본:없음, color, underline, box, highlight)`
    -   `[옵션]`speakerX : 스피커 x좌표 `(기본: 지시문 x좌표 -40)`
    -   `[옵션]`speakerY : 스피커 y좌표 `(기본: 지시문 y좌표 -22)`

    ```javascript
    "direction": {
        "x": 70,
        "y": 50,
        "text": "text_index_0",
        "classNum": "91",
        "fontSize": 20,
        "dy": 45,
        "bold" : true,
        "options" : [{
            "type": "box",
            "classNum": "91",
            "boxText": "?",
            "boxTextClass": "91",
            "boxTextScale": 1,
            "bold": true
        }],
        "speakerX": 30,
        "speakerY": 28
    }
    ```

    <br />

-   > ### choiceElement | _`object`_ | 선택 엘리먼트

    -   `[옵션]`hintCount : 힌트 수 `(기본:0)`
    -   `[필수]`textInfo : 텍스트 정보
        -   `[필수]`x : x좌표
        -   `[필수]`y : y좌표
        -   `[필수]`text : choice 엘리먼트가 될 텍스트
        -   `[필수]`searchWord : 텍스트에서 찾을 자음,모음
        -   `[필수]`scale : 텍스트 크기 `(기본:1)`
        -   `[필수]`classNum : 색상 번호
        -   `[필수]`btnWidth : 텍스트 외부에 버튼 너비
        -   `[필수]`btnHeight : 텍스트 외부에 버튼 높이
        -   `[옵션]`btnGapX : 글자 버튼 사이의 x간격 `(기본:0)`
        -   `[옵션]`btnGapY : 글자 버튼 사이의 y간격 `(기본:0)`
        -   `[옵션]`center : 좌표에 중앙정렬 여부 `(기본:없음)`
    -   `[옵션]`backGround : 배경(사각형) `(기본:없음)`
        -   `[필수]`cx : x좌표(중앙에 위치)
        -   `[필수]`cy : y좌표(중앙에 위치)
        -   `[필수]`width : 너비
        -   `[필수]`height : 높이
        -   `[필수]`r : 버튼 round 값 `(기본:0)`
        -   `[옵션]`fillClassNum : 채우기 색 번호 `(기본:'14')`
        -   `[옵션]`strokeClassNum : 선 색 번호 `(기본:'04')`

    ```javascript
    "choiceElement": {
        "hintCount": 0,
        "textInfo": [{
            "x": 110,
            "y": 110,
            "text": "text_index_1",
            "searchWord": "text_index_2",
            "scale": 0.8,
            "classNum": "001",
            "btnWidth": 120,
            "btnHeight": 120,
            "btnGapX": 0,
            "btnGapY": 0,
            "center": false
        }, ...],
        "backGround": [{
            "cx": 230,
            "cy": 170,
            "width": 315,
            "height": 180,
            "r": 20,
            "fillClassNum": "74",
            "strokeClassNum": "no"
        }, ...]
        }
    ```

    <br />

-   > ### images | _`Array`_ | 이미지 배열 설정

    -   `[필수]`url : 이미지 url
    -   `[필수]`x : x좌표
    -   `[필수]`y : y좌표
    -   `[옵션]`scale : 크기 `(기본:'1')`

    ```javascript
    "images": [{
        "url": "image_index_0",
        "x": 40,
        "y": 100,
        "scale": 0.23
    }, ...]
    ```

    <br />

    -   > ### texts | _`Array`_ | 텍스트 배열 설정

    -   `[필수]`x : x좌표
    -   `[필수]`y : y좌표
    -   `[필수]`text : 텍스트 설정
    -   `[옵션]`classNum : 색상 번호 `(기본:'91')`
    -   `[옵션]`fontSize : 폰트 크기 `(기본:60)`

    ```javascript
    "texts": [{
        "x": 80,
        "y": 175,
        "text": "text_index_1",
        "classNum": "001",
        "fontSize": 60
    }, ...]
    ```

    <br />

> ## KM000023

choose

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000023",
        "direction": {
            "x": 70,
            "y": 50,
            "text": "지시문",
            "classNum": "91",
            "fontSize": 20,
            "dy": 45,
            "bold": true,
            "speakerX":30,
            "speakerY":28
        },
        "images": [{
            "url": "이미지",
            "x": 180,
            "y": 70,
            "scale": 1
        }],
        "texts": [{
            "x": 370,
            "y": 440,
            "text": "ㄱ",
            "classNum": "001",
            "fontSize": 60
        }],
        "choice": {
            "searchWord": "ㄱ",
            "element": [{
                "btnInfo": {
                    "x": 330,
                    "y": 120,
                    "width": 140,
                    "height": 80,
                    "fillClassNum": "14",
                    "strokeClassNum": "117"
                },
                "wordInfo": {
                    "word": "가위",
                    "classNum": "001",
                    "textScale": 0.5
                },
                "isAns": true
            }, {
                "btnInfo": {
                    "x": 250,
                    "y": 210,
                    "width": 140,
                    "height": 80,
                    "fillClassNum": "14",
                    "strokeClassNum": "117"
                },
                "wordInfo": {
                    "word": "거미",
                    "classNum": "001",
                    "textScale": 0.5
                },
                "isAns": true
            }, {
                "btnInfo": {
                    "x": 410,
                    "y": 210,
                    "width": 170,
                    "height": 80,
                    "fillClassNum": "14",
                    "strokeClassNum": "117"
                },
                "wordInfo": {
                    "word": "가위가",
                    "classNum": "001",
                    "textScale": 0.5
                },
                "isAns": true
            }, {
                "btnInfo": {
                    "x": 330,
                    "y": 300,
                    "width": 140,
                    "height": 80,
                    "fillClassNum": "14",
                    "strokeClassNum": "117"
                },
                "wordInfo": {
                    "word": "문무",
                    "classNum": "001",
                    "textScale": 0.5
                },
                "isAns": false
            }]
        }
    }
    ```

-   > ### questionType | _`string`_ | 모듈 설정

    ```javascript
    "questionType": "KM000023";
    ```

-   > ### direction | _`object`_ | 지시문 설정

    -   `[필수]`x : x좌표
    -   `[필수]`y : y좌표
    -   `[필수]`text : 텍스트 설정
    -   `[옵션]`classNum : 색상 번호 `(기본:'91')`
    -   `[옵션]`fontSize : 폰트 크기 `(기본:20)`
    -   `[옵션]`dy : 줄 간격 `(기본:45)`
    -   `[옵션]`bold : 텍스트 진하게 여부 `(기본:false)`
    -   `[옵션]`options : 텍스트에 옵션 부여 `(기본:없음, color, underline, box, highlight)`
    -   `[옵션]`speakerX : 스피커 x좌표 `(기본: 지시문 x좌표 -40)`
    -   `[옵션]`speakerY : 스피커 y좌표 `(기본: 지시문 y좌표 -22)`

    ```javascript
    "direction": {
        "x": 70,
        "y": 50,
        "text": "text_index_0",
        "classNum": "91",
        "fontSize": 20,
        "dy": 45,
        "bold" : true,
        "options" : [{
            "type": "box",
            "classNum": "91",
            "boxText": "?",
            "boxTextClass": "91",
            "boxTextScale": 1,
            "bold": true
        }],
        "speakerX": 30,
        "speakerY": 28
    }
    ```

    <br />

-   > ### images | _`Array`_ | 이미지 배열

    -   `[필수]`url : 이미지 url
    -   `[필수]`x : x좌표
    -   `[필수]`y : y좌표
    -   `[옵션]`scale : 크기

    ```javascript
    "images": [{
        "url": "이미지",
        "x": 180,
        "y": 70,
        "scale": 1 `(기본:1)`
    }]
    ```

    <br />

-   > ### texts | _`Array`_ | 텍스트 배열

    -   `[필수]`x : x좌표
    -   `[필수]`y : y좌표
    -   `[필수]`text : 텍스트 설정
    -   `[옵션]`classNum : 색상 번호 `(기본:'91')`
    -   `[옵션]`fontSize : 폰트 크기 `(기본:60)`
    -   `[옵션]`dy : 줄 간격 `(기본:45)`
    -   `[옵션]`bold : 텍스트 진하게 여부 `(기본:false)`
    -   `[옵션]`options : 텍스트에 옵션 부여 `(기본:없음, color, underline, box, highlight)`

    ```javascript
    "texts": [{
        "x": 370,
        "y": 440,
        "text": "ㄱ",
        "classNum": "001",
        "fontSize": 60
    }]
    ```

    <br />

-   > ### choice | _`Array`_ | 선택지 배열

    -   `[필수]`searchWord : 찾을 자,모음 낱자
    -   `[필수]`element : 선택 요소 배열
        -   `[필수]`btnInfo : 버튼 정보
            -   `[필수]`x : x좌표
            -   `[필수]`y : y좌표
            -   `[필수]`width : 버튼 너비
            -   `[필수]`height : 버튼 높이
            -   `[옵션]`fillClassNum : 버튼 채우기 색상 번호 `(기본:'14')`
            -   `[옵션]`strokeClassNum : 버튼 선 색상 번호 `(기본:'117')`
        -   `[필수]`wordInfo : 버튼에 들어갈 단어 정보
            -   `[필수]`word : 단어
            -   `[옵션]`classNum : 단어 색상 정보 `(기본:'001')`
            -   `[옵션]`textScale : 단어 진하게 여부 `(기본:0.5)`
        -   `[필수]`isAns : 정답 유무

    ```javascript
    "choice": {
        "searchWord": "ㄱ",
        "element": [{
            "btnInfo": {
                "x": 330,
                "y": 120,
                "width": 140,
                "height": 80,
                "fillClassNum": "14",
                "strokeClassNum": "117"
            },
            "wordInfo": {
                "word": "가위",
                "classNum": "001",
                "textScale": 0.5
            },
            "isAns": true
        }, ...]
    }
    ```

    <br />

> ## KM000024

    write

-   ### 기본 포맷

        ```javascript
        {
        "questionType": "KM000025",
        "direction": {
            "x": 70,
            "y": 50,
            "text": "text_index_0",
            "classNum": 91,
            "fontSize": 20,
            "dy": 45,
            "bold": true,
            "speakerX": 30,
            "speakerY": 28
        },
        "connect": {
            "hintCount": 0,
            "lineClassNum": "04",
            "element": {
                "multiEl": {
                    "background": {
                        "cx": 200,
                        "cy": 250,
                        "type": "image",
                        "ImgUrl": "image_index_0",
                        "ImgScale": 0.15,
                        "width": 0,
                        "height": 0,
                        "rXY": 0,
                        "r": 0,
                        "shapeFillClassNum": "no",
                        "shapeStrokeClassNum": "no",
                        "shapeOpacity": 1,
                        "shapeStrokeWidth": 0
                    },
                    "textInfo": [{
                        "cx": 125,
                        "cy": 250,
                        "text": "text_index_1",
                        "classNum": "001",
                        "fontSize": 60
                    }, {
                        "cx": 275,
                        "cy": 250,
                        "text": "text_index_2",
                        "classNum": "001",
                        "fontSize": 60
                    }],
                    "connectDotOffsets": {
                        "x": 5,
                        "y": 0
                    }
                },
                "oneEl": [{
                    "background": {
                        "cx": 690,
                        "cy": 120,
                        "type": "circle",
                        "ImgUrl": "배경이 이미지 일 때, 주소를 넣으세요",
                        "ImgScale": 0,
                        "width": 0,
                        "height": 0,
                        "rXY": 0,
                        "r": 40,
                        "shapeFillClassNum": "14",
                        "shapeStrokeClassNum": "07",
                        "shapeOpacity": 1,
                        "shapeStrokeWidth": 3,
                        "shapeIsDashArray": true
                    },
                    "textInfo": [{
                        "cx": 690,
                        "cy": 120,
                        "text": "text_index_3",
                        "classNum": "001",
                        "fontSize": 50
                    }],
                    "connectDotOffsets": {
                        "x": -30,
                        "y": 0
                    },
                    "isAns": false
                }, {
                    "background": {
                        "cx": 690,
                        "cy": 220,
                        "type": "circle",
                        "ImgUrl": "배경이 이미지 일 때, 주소를 넣으세요",
                        "ImgScale": 0,
                        "width": 0,
                        "height": 0,
                        "rXY": 0,
                        "r": 40,
                        "shapeFillClassNum": "14",
                        "shapeStrokeClassNum": "07",
                        "shapeOpacity": 1,
                        "shapeStrokeWidth": 3,
                        "shapeIsDashArray": true
                    },
                    "textInfo": [{
                        "cx": 690,
                        "cy": 220,
                        "text": "text_index_4",
                        "classNum": "001",
                        "fontSize": 50
                    }],
                    "connectDotOffsets": {
                        "x": -30,
                        "y": 0
                    },
                    "isAns": true
                }, {
                    "background": {
                        "cx": 690,
                        "cy": 320,
                        "type": "circle",
                        "ImgUrl": "배경이 이미지 일 때, 주소를 넣으세요",
                        "ImgScale": 0,
                        "width": 0,
                        "height": 0,
                        "rXY": 0,
                        "r": 40,
                        "shapeFillClassNum": "14",
                        "shapeStrokeClassNum": "07",
                        "shapeOpacity": 1,
                        "shapeStrokeWidth": 3,
                        "shapeIsDashArray": true
                    },
                    "textInfo": [{
                        "cx": 690,
                        "cy": 320,
                        "text": "text_index_5",
                        "classNum": "001",
                        "fontSize": 50
                    }],
                    "connectDotOffsets": {
                        "x": -30,
                        "y": 0
                    },
                    "isAns": false
                }, {
                    "background": {
                        "cx": 690,
                        "cy": 420,
                        "type": "circle",
                        "ImgUrl": "배경이 이미지 일 때, 주소를 넣으세요",
                        "ImgScale": 0,
                        "width": 0,
                        "height": 0,
                        "rXY": 0,
                        "r": 40,
                        "shapeFillClassNum": "14",
                        "shapeStrokeClassNum": "07",
                        "shapeOpacity": 1,
                        "shapeStrokeWidth": 3,
                        "shapeIsDashArray": true
                    },
                    "textInfo": [{
                        "cx": 690,
                        "cy": 420,
                        "text": "text_index_6",
                        "classNum": "001",
                        "fontSize": 50
                    }],
                    "connectDotOffsets": {
                        "x": -30,
                        "y": 0
                    },
                    "isAns": false
                }]
            }
        }

    }

    ```

    ```

-   > ### questionType | _`string`_ | 모듈 설정

    ```javascript
    "questionType": "KM000025";
    ```

-   > ### direction | _`object`_ | 지시문 설정

    -   `[필수]`x : x좌표
    -   `[필수]`y : y좌표
    -   `[필수]`text : 텍스트 설정
    -   `[옵션]`classNum : 색상 번호 `(기본:'91')`
    -   `[옵션]`fontSize : 폰트 크기 `(기본:20)`
    -   `[옵션]`dy : 줄 간격 `(기본:45)`
    -   `[옵션]`bold : 텍스트 진하게 여부 `(기본:false)`
    -   `[옵션]`options : 텍스트에 옵션 부여 `(기본:없음, color, underline, box, highlight)`
    -   `[옵션]`speakerX : 스피커 x좌표 `(기본: 지시문 x좌표 -40)`
    -   `[옵션]`speakerY : 스피커 y좌표 `(기본: 지시문 y좌표 -22)`

    ```javascript
    "direction": {
        "x": 70,
        "y": 50,
        "text": "text_index_0",
        "classNum": "91",
        "fontSize": 20,
        "dy": 45,
        "bold" : true,
        "options" : [{
            "type": "box",
            "classNum": "91",
            "boxText": "?",
            "boxTextClass": "91",
            "boxTextScale": 1,
            "bold": true
        }],
        "speakerX": 30,
        "speakerY": 28
    }
    ```

    <br />

-   > ### imageButton | _`object`_ | 이미지 버튼

    -   `[필수]`isButton : 버튼(배경) 존재 유무
    -   `[필수]`x : x좌표
    -   `[필수]`y : y좌표
    -   `[필수]`width : 너비
    -   `[필수]`height : 높이
    -   `[옵션]`btnFillClassNum : 버튼 채우기 색 번호`(기본:'14')`
    -   `[옵션]`btnStrokeClassNum : 버튼 선 색 번호 `(기본:'117')`
    -   `[옵션]`btnStrokeWidth : 버튼 선 두께 `(기본:1)`
    -   `[옵션]`btnOpacity : 버튼 투명도 `(기본:1)`
    -   `[옵션]`btnR : 버튼 round 값 `(기본:10)`
    -   `[옵션]`imageInfo : 이미지 정보 `(기본:없음)`
        -   `[필수]`cx : x좌표
        -   `[필수]`cy : y좌표
        -   `[필수]`img : 이미지
            -   `[필수]`url : 이미지 url
            -   `[옵션]`scale : 크기 `(기본:'1')`
    -   `[필수]`textInfo : 텍스트 정보
        -   `[필수]`cx : x좌표
        -   `[필수]`cy : y좌표
        -   `[필수]`text : 텍스트
        -   `[옵션]`classNum : 텍스트 색상 번호 `(기본:91)`
        -   `[옵션]`fontSize : 폰트 크기 `(기본:20)`
        -   `[옵션]`focusIndex : 텍스트에서 포커스 할(색을 바꿀) 인덱스 `(기본:없음)`
        -   `[옵션]`focusClass : 변경 할 색상 번호 `(기본:없음)`
    -   `[옵션]`soundInfo : 사운드 정보
        -   `[필수]`url : 사운드 url

    ```javascript
    "imageButton": {
        "isButton": true,
        "x": 30,
        "y": 110,
        "width": 240,
        "height": 240,
        "btnFillClassNum": "114",
        "btnStrokeClassNum": "090",
        "btnStrokeWidth": 0.2,
        "btnOpacity",1,
        "btnR": 10,
        "imageInfo": [{
            "cx": 155,
            "cy": 195,
            "img": {
                "url": "이미지",
                "scale": 0.25
            }
        }, ...],
        "textInfo": {
            "cx": 150,
            "cy": 355,
            "text": "문어",
            "classNum": "001",
            "fontSize": 60,
            "focusIndex": "no",
            "focusClass": "03"
        },
        "soundInfo": {
            "url": "사운드"
        }
    }
    ```

    <br />

    -   > ### handWriteValue | _`object`_ | 핸드라이트 정보

    -   `[필수]`handWriteText : 핸드라이트 될 텍스트
    -   `[필수]`repeat : 핸드라이트 반복 횟수
    -   `[필수]`repeatIconInfo : 반복 횟수 아이콘 정보
        -   `[옵션]`cx : x좌표 `(기본:전체 핸드라이트 영역 x2에 맞춰 위치)`
        -   `[옵션]`cy : y좌표 `(기본:전체 핸드라이트 영역 y 위에 위치)`
        -   `[옵션]`scale : 아이콘 크기 `(기본:1)`
        -   `[필수]`gap : 아이콘 간 간격(2개 이상 시) `(기본:30)`
    -   `[필수]`handWrite : 핸드라이트 정보
        -   `[필수]`isHandWrite : 핸드라이트 존재 유무(핸드라이트 vs 글자)
        -   `[필수]`x : x좌표
        -   `[필수]`y : y좌표
        -   `[필수]`width : 너비
        -   `[필수]`height : 높이
        -   `[옵션]`rXY : 핸드라이트 박스 round 값 `(기본:20)`
        -   `[옵션]`drawClassNum : 핸드라이트 선 색 번호 `(기본:'001')`
        -   `[옵션]`drawStrokeWidth : 핸드라이트 선 두께 `(기본:10)`
        -   `[옵션]`boxFillClassNum : 핸드라이트 박스 채우기 색 번호 `(기본:'111')`
        -   `[필수]`boxStrokeClassNum : 핸드라이트 박스 선 색 번호 `(기본:'01')`
        -   `[필수]`boxOpacity : 핸드라이트 박스 투명도 `(기본:0.3)`
        -   `[필수]`wordHint : 글자 힌트가 보여질 지 여부 `(기본:없음, (단, 핸드라이트 유무가 없을 때는 true))`
        -   `[필수]`wordHintFs : 글자 힌트 폰트 크기 `(기본:핸드라이트 박스의 0.7배)`
        -   `[옵션]`wordHintClassNum : 글자 힌트 색상 번호 `(기본:'91')`
        -   `[옵션]`wordHintOpacity : 글자 힌트 투명도 `(기본:0.3, (단, 핸드라이트 유무가 없을 때는 1))`
        -   `[옵션]`undoButton : 이전 버튼 정보 `(기본:없음)`
            -   `[옵션]`x : x좌표 `(기본:현재 핸드라이트 하단 끝부분 기준으로 왼쪽으로 특정 비율만큼 떨어진 위치)`
            -   `[옵션]`y : y좌표 `(기본:현재 핸드라이트 하단 끝부분 기준으로 아래로 특정 비율만큼 떨어진 위치)`
            -   `[옵션]`scale : `(기본:0.8)`
        -   `[옵션]`resetButton : 휴지통 버튼 정보 `(기본:없음)`
            -   `[옵션]`x : x좌표 `(기본:현재 핸드라이트 하단 끝부분 기준으로 왼쪽으로 특정 비율만큼 떨어진 위치)`
            -   `[옵션]`y : y좌표 `(기본:현재 핸드라이트 하단 끝부분 기준으로 아래로 특정 비율만큼 떨어진 위치)`
            -   `[옵션]`scale : `(기본:0.8)`
    -   `[필수]`okButton : 확인 버튼 `(기본:없음)` - `[옵션]`cx : 사운드 정보 `(기본:400)` - `[옵션]`cx : 사운드 url `(기본:450)`
    -   `[필수]`soundInfo : 사운드 정보 - `[옵션]`url : 사운드 url

    ```javascript
    "handWriteValue": {
        "handWriteText": "문어",
        "repeat": 3,
        "repeatIconInfo": {
            "cx": 720,
            "cy": 80,
            "scale": 1,
            "gap": 30
        },
        "handWrite": [{
            "isHandWrite": true,
            "x": 290,
            "y": 110,
            "width": 240,
            "height": 240,
            "rXY": 20,
            "drawClassNum": "001",
            "drawStrokeWidth": 10,
            "boxFillClassNum": "14",
            "boxStrokeClassNum": "01",
            "boxOpacity": 1,
            "wordHint": true,
            "wordHintFs": 168,
            "wordHintClassNum": "91",
            "wordHintOpacity": 0.3,
            "undoButton": {
                "x": 434,
                "y": 358,
                "scale": 0.8
            },
            "resetButton": {
                "x": 482,
                "y": 358,
                "scale": 0.8
            }
        }, ...],
        "okButton": {
            "cx": 400,
            "cy": 460
        },
        "soundInfo": {
            "url": "sound_index_1"
        }
    }
    ```

    <br />

> ## KM000025

    match

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000025",
        "direction": {
            "x": 70,
            "y": 50,
            "text": "text_index_0",
            "classNum": 91,
            "fontSize": 20,
            "dy": 45,
            "bold": true,
            "speakerX": 30,
            "speakerY": 28
        },
        "connect": {
            "hintCount": 0,
            "lineClassNum": "04",
            "element": {
                "multiEl": {
                    "background": {
                        "cx": 200,
                        "cy": 250,
                        "type": "image",
                        "ImgUrl": "image_index_0",
                        "ImgScale": 0.15,
                        "width": 0,
                        "height": 0,
                        "rXY": 0,
                        "r": 0,
                        "shapeFillClassNum": "no",
                        "shapeStrokeClassNum": "no",
                        "shapeOpacity": 1,
                        "shapeStrokeWidth": 0
                    },
                    "textInfo": [{
                        "cx": 125,
                        "cy": 250,
                        "text": "text_index_1",
                        "classNum": "001",
                        "fontSize": 60
                    }, {
                        "cx": 275,
                        "cy": 250,
                        "text": "text_index_2",
                        "classNum": "001",
                        "fontSize": 60
                    }],
                    "connectDotOffsets": {
                        "x": 5,
                        "y": 0
                    }
                },
                "oneEl": [{
                    "background": {
                        "cx": 690,
                        "cy": 120,
                        "type": "circle",
                        "ImgUrl": "배경이 이미지 일 때, 주소를 넣으세요",
                        "ImgScale": 0,
                        "width": 0,
                        "height": 0,
                        "rXY": 0,
                        "r": 40,
                        "shapeFillClassNum": "14",
                        "shapeStrokeClassNum": "07",
                        "shapeOpacity": 1,
                        "shapeStrokeWidth": 3,
                        "shapeIsDashArray": true
                    },
                    "textInfo": [{
                        "cx": 690,
                        "cy": 120,
                        "text": "text_index_3",
                        "classNum": "001",
                        "fontSize": 50
                    }],
                    "connectDotOffsets": {
                        "x": -30,
                        "y": 0
                    },
                    "isAns": false
                }, {
                    "background": {
                        "cx": 690,
                        "cy": 220,
                        "type": "circle",
                        "ImgUrl": "배경이 이미지 일 때, 주소를 넣으세요",
                        "ImgScale": 0,
                        "width": 0,
                        "height": 0,
                        "rXY": 0,
                        "r": 40,
                        "shapeFillClassNum": "14",
                        "shapeStrokeClassNum": "07",
                        "shapeOpacity": 1,
                        "shapeStrokeWidth": 3,
                        "shapeIsDashArray": true
                    },
                    "textInfo": [{
                        "cx": 690,
                        "cy": 220,
                        "text": "text_index_4",
                        "classNum": "001",
                        "fontSize": 50
                    }],
                    "connectDotOffsets": {
                        "x": -30,
                        "y": 0
                    },
                    "isAns": true
                }, {
                    "background": {
                        "cx": 690,
                        "cy": 320,
                        "type": "circle",
                        "ImgUrl": "배경이 이미지 일 때, 주소를 넣으세요",
                        "ImgScale": 0,
                        "width": 0,
                        "height": 0,
                        "rXY": 0,
                        "r": 40,
                        "shapeFillClassNum": "14",
                        "shapeStrokeClassNum": "07",
                        "shapeOpacity": 1,
                        "shapeStrokeWidth": 3,
                        "shapeIsDashArray": true
                    },
                    "textInfo": [{
                        "cx": 690,
                        "cy": 320,
                        "text": "text_index_5",
                        "classNum": "001",
                        "fontSize": 50
                    }],
                    "connectDotOffsets": {
                        "x": -30,
                        "y": 0
                    },
                    "isAns": false
                }, {
                    "background": {
                        "cx": 690,
                        "cy": 420,
                        "type": "circle",
                        "ImgUrl": "배경이 이미지 일 때, 주소를 넣으세요",
                        "ImgScale": 0,
                        "width": 0,
                        "height": 0,
                        "rXY": 0,
                        "r": 40,
                        "shapeFillClassNum": "14",
                        "shapeStrokeClassNum": "07",
                        "shapeOpacity": 1,
                        "shapeStrokeWidth": 3,
                        "shapeIsDashArray": true
                    },
                    "textInfo": [{
                        "cx": 690,
                        "cy": 420,
                        "text": "text_index_6",
                        "classNum": "001",
                        "fontSize": 50
                    }],
                    "connectDotOffsets": {
                        "x": -30,
                        "y": 0
                    },
                    "isAns": false
                }]
            }
        }
    }
    ```

-   > ### questionType | _`string`_ | 모듈 설정

    ```javascript
    "questionType": "KM000025";
    ```

-   > ### direction | _`object`_ | 지시문 설정

    -   `[필수]`x : x좌표
    -   `[필수]`y : y좌표
    -   `[필수]`text : 텍스트 설정
    -   `[옵션]`classNum : 색상 번호 `(기본:'91')`
    -   `[옵션]`fontSize : 폰트 크기 `(기본:20)`
    -   `[옵션]`dy : 줄 간격 `(기본:45)`
    -   `[옵션]`bold : 텍스트 진하게 여부 `(기본:false)`
    -   `[옵션]`options : 텍스트에 옵션 부여 `(기본:없음, color, underline, box, highlight)`
    -   `[옵션]`speakerX : 스피커 x좌표 `(기본: 지시문 x좌표 -40)`
    -   `[옵션]`speakerY : 스피커 y좌표 `(기본: 지시문 y좌표 -22)`

    ```javascript
    "direction": {
        "x": 70,
        "y": 50,
        "text": "text_index_0",
        "classNum": "91",
        "fontSize": 20,
        "dy": 45,
        "bold" : true,
        "options" : [{
            "type": "box",
            "classNum": "91",
            "boxText": "?",
            "boxTextClass": "91",
            "boxTextScale": 1,
            "bold": true
        }],
        "speakerX": 30,
        "speakerY": 28
    }
    ```

    <br />

-   > ### connect | _`object`_ | 이미지 버튼

    -   `[필수]`hintCount : 힌트 수
    -   `[옵션]`lineClassNum : 연결 시 선 색 번호 `(기본:'04')`
    -   `[필수]`element : mactch 엘리먼트
        -   `[필수]`multiEl : 엘리먼트
            -   `[필수]`background : 배경 정보
                -   `[필수]`cx : x값
                -   `[필수]`cy : y값
                -   `[필수]`type : 배경 유형(이미지, rect, circle)
                -   `[옵션]`ImgUrl : 이미지 url (type이 image 일 때 필수)
                -   `[옵션]`ImgScale : 이미지 크기 (type이 image 일 때 필수)
                -   `[옵션]`width : 너비 (type이 rect 일 때 필수)
                -   `[옵션]`height : 높이 (type이 rect 일 때 필수)
                -   `[옵션]`rXY : round 값 (type이 rect 일 때 필수)
                -   `[옵션]`r : 반지름 (type이 circle 일 때 필수)
                -   `[옵션]`shapeFillClassNum : 채우기 색 넘버 (type이 rect, circle 일 때 적용) `(기본:'03')`
                -   `[옵션]`shapeStrokeClassNum : 선 색 넘버 (type이 rect, circle 일 때 적용) `(기본:'no')`
                -   `[옵션]`shapeOpacity : 투명도 (type이 rect, circle 일 때 적용) `(기본:1)`
                -   `[옵션]`shapeStrokeWidth : 선 두께 (type이 rect, circle 일 때 적용) `(기본:1)`
            -   `[필수]`textInfo : 텍스트 정보
                -   `[필수]`cx : x값
                -   `[필수]`cy : y값
                -   `[필수]`text : 텍스트
                -   `[옵션]`classNum : 텍스트 색상 번호 `(기본:91)`
                -   `[옵션]`fontSize : 폰트 크기 `(기본:20)`
            -   `[옵션]`connectDotOffsets : 연결 점 조정 값
                -   `[옵션]`x : x값 `(기본:0)`
                -   `[옵션]`y : y값 `(기본:0)`
        -   `[필수]`oneEl : 엘리먼트
            -   `[필수]`background : 배경 정보
                -   `[필수]`cx : x값
                -   `[필수]`cy : y값
                -   `[필수]`type : 배경 유형(이미지, rect, circle)
                -   `[옵션]`ImgUrl : 이미지 url (type이 image 일 때 필수)
                -   `[옵션]`ImgScale : 이미지 크기 (type이 image 일 때 필수)
                -   `[옵션]`width : 너비 (type이 rect 일 때 필수)
                -   `[옵션]`height : 높이 (type이 rect 일 때 필수)
                -   `[옵션]`rXY : round 값 (type이 rect 일 때 필수)
                -   `[옵션]`r : 반지름 (type이 circle 일 때 필수)
                -   `[옵션]`shapeFillClassNum : 채우기 색 넘버 (type이 rect, circle 일 때 적용) `(기본:'03')`
                -   `[옵션]`shapeStrokeClassNum : 선 색 넘버 (type이 rect, circle 일 때 적용) `(기본:'no')`
                -   `[옵션]`shapeOpacity : 투명도 (type이 rect, circle 일 때 적용) `(기본:1)`
                -   `[옵션]`shapeStrokeWidth : 선 두께 (type이 rect, circle 일 때 적용) `(기본:1)`
            -   `[필수]`textInfo : 텍스트 정보
                -   `[필수]`cx : x값
                -   `[필수]`cy : y값
                -   `[필수]`text : 텍스트
                -   `[옵션]`classNum : 텍스트 색상 번호 `(기본:91)`
                -   `[옵션]`fontSize : 폰트 크기 `(기본:20)`
            -   `[옵션]`connectDotOffsets : 연결 점 조정 값
                -   `[옵션]`x : x값 `(기본:0)`
                -   `[옵션]`y : y값 `(기본:0)`
            -   `[필수]`isAns : 정답 유무

    ```javascript
    "connect": {
        "hintCount": 0,
        "lineClassNum": "04",
        "element": {
            "multiEl": {
                "background": {
                    "cx": 200,
                    "cy": 250,
                    "type": "image",
                    "ImgUrl": "image_index_0",
                    "ImgScale": 0.15,
                    "width": 0,
                    "height": 0,
                    "rXY": 0,
                    "r": 0,
                    "shapeFillClassNum": "no",
                    "shapeStrokeClassNum": "no",
                    "shapeOpacity": 1,
                    "shapeStrokeWidth": 0
                },
                "textInfo": [{
                    "cx": 125,
                    "cy": 250,
                    "text": "text_index_1",
                    "classNum": "001",
                    "fontSize": 60
                }, ...],
                "connectDotOffsets": {
                    "x": 5,
                    "y": 0
                }
            },
            "oneEl": [{
                "background": {
                    "cx": 690,
                    "cy": 120,
                    "type": "circle",
                    "ImgUrl": "배경이 이미지 일 때, 주소를 넣으세요",
                    "ImgScale": 0,
                    "width": 0,
                    "height": 0,
                    "rXY": 0,
                    "r": 40,
                    "shapeFillClassNum": "14",
                    "shapeStrokeClassNum": "07",
                    "shapeOpacity": 1,
                    "shapeStrokeWidth": 3,
                    "shapeIsDashArray": true
                },
                "textInfo": [{
                    "cx": 690,
                    "cy": 120,
                    "text": "text_index_3",
                    "classNum": "001",
                    "fontSize": 50
                }, ...],
                "connectDotOffsets": {
                    "x": -30,
                    "y": 0
                },
                "isAns": false
            }, ...]
        }
    }
    ```

    <br />

> ## KM000026

    match

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000026",
        "direction": {
            "x": 70,
            "y": 50,
            "text": "text_index_0",
            "classNum": 91,
            "fontSize": 20,
            "dy": 45,
            "bold": true,
            "speakerX": 30,
            "speakerY": 28
        },
        "connect": [
            {
                "element": [
                    {
                        "createElement": [
                            {
                                "type": "circle",
                                "meta": {
                                    "x": 100,
                                    "y": 250,
                                    "r": 50,
                                    "shapeFillClassNum": "14",
                                    "shapeStrokeClassNum": "009",
                                    "shapeStrokeWidth": 3
                                }
                            },
                            {
                                "type": "text",
                                "meta": {
                                    "x": 100,
                                    "y": 250,
                                    "text": "text_index_1",
                                    "classNum": "001",
                                    "fontSize": 60,
                                    "dy": 45,
                                    "bold": false,
                                    "center": true,
                                    "options": null
                                }
                            }
                        ],
                        "connectDotOffsets": {
                            "x": 10,
                            "y": 0
                        }
                    }
                ]
            },
            {
                "element": [
                    {
                        "createElement": [
                            {
                                "type": "rect",
                                "meta": {
                                    "x": 300,
                                    "y": 130,
                                    "width": 100,
                                    "height": 60,
                                    "rXY": 10,
                                    "shapeFillClassNum": "021",
                                    "shapeStrokeClassNum": "no",
                                    "shapeStrokeWidth": 1
                                }
                            },
                            {
                                "type": "text",
                                "meta": {
                                    "x": 300,
                                    "y": 130,
                                    "text": "text_index_2",
                                    "classNum": "001",
                                    "fontSize": 28,
                                    "dy": 45,
                                    "bold": false,
                                    "center": true,
                                    "options": null
                                }
                            }
                        ],
                        "connectDotOffsets": {
                            "x": -10,
                            "y": 0
                        },
                        "isAns": false
                    },
                    {
                        "createElement": [
                            {
                                "type": "rect",
                                "meta": {
                                    "x": 300,
                                    "y": 250,
                                    "width": 100,
                                    "height": 60,
                                    "rXY": 10,
                                    "shapeFillClassNum": "021",
                                    "shapeStrokeClassNum": "no",
                                    "shapeStrokeWidth": 1
                                }
                            },
                            {
                                "type": "text",
                                "meta": {
                                    "x": 300,
                                    "y": 250,
                                    "text": "text_index_3",
                                    "classNum": "001",
                                    "fontSize": 28,
                                    "dy": 45,
                                    "bold": false,
                                    "center": true,
                                    "options": null
                                }
                            }
                        ],
                        "connectDotOffsets": {
                            "x": -10,
                            "y": 0
                        },
                        "isAns": true
                    },
                    {
                        "createElement": [
                            {
                                "type": "rect",
                                "meta": {
                                    "x": 300,
                                    "y": 370,
                                    "width": 100,
                                    "height": 60,
                                    "rXY": 10,
                                    "shapeFillClassNum": "021",
                                    "shapeStrokeClassNum": "no",
                                    "shapeStrokeWidth": 1
                                }
                            },
                            {
                                "type": "text",
                                "meta": {
                                    "x": 300,
                                    "y": 370,
                                    "text": "text_index_4",
                                    "classNum": "001",
                                    "fontSize": 28,
                                    "dy": 45,
                                    "bold": false,
                                    "center": true,
                                    "options": null
                                }
                            }
                        ],
                        "connectDotOffsets": {
                            "x": -10,
                            "y": 0
                        },
                        "isAns": false
                    }
                ],
                "dotSize": 3,
                "lineClassNum": "04"
            },
            {
                "element": [
                    {
                        "createElement": [
                            {
                                "type": "rect",
                                "meta": {
                                    "x": 500,
                                    "y": 130,
                                    "width": 100,
                                    "height": 60,
                                    "rXY": 10,
                                    "shapeFillClassNum": "007",
                                    "shapeStrokeClassNum": "no",
                                    "shapeStrokeWidth": 1
                                }
                            },
                            {
                                "type": "text",
                                "meta": {
                                    "x": 500,
                                    "y": 130,
                                    "text": "text_index_5",
                                    "classNum": "001",
                                    "fontSize": 28,
                                    "dy": 45,
                                    "bold": false,
                                    "center": true,
                                    "options": null
                                }
                            }
                        ],
                        "connectDotOffsets": {
                            "x": -10,
                            "y": 0
                        },
                        "isAns": false
                    },
                    {
                        "createElement": [
                            {
                                "type": "rect",
                                "meta": {
                                    "x": 500,
                                    "y": 250,
                                    "width": 100,
                                    "height": 60,
                                    "rXY": 10,
                                    "shapeFillClassNum": "007",
                                    "shapeStrokeClassNum": "no",
                                    "shapeStrokeWidth": 1
                                }
                            },
                            {
                                "type": "text",
                                "meta": {
                                    "x": 500,
                                    "y": 250,
                                    "text": "text_index_6",
                                    "classNum": "001",
                                    "fontSize": 28,
                                    "dy": 45,
                                    "bold": false,
                                    "center": true,
                                    "options": null
                                }
                            }
                        ],
                        "connectDotOffsets": {
                            "x": -10,
                            "y": 0
                        },
                        "isAns": false
                    },
                    {
                        "createElement": [
                            {
                                "type": "rect",
                                "meta": {
                                    "x": 500,
                                    "y": 370,
                                    "width": 100,
                                    "height": 60,
                                    "rXY": 10,
                                    "shapeFillClassNum": "007",
                                    "shapeStrokeClassNum": "no",
                                    "shapeStrokeWidth": 1
                                }
                            },
                            {
                                "type": "text",
                                "meta": {
                                    "x": 500,
                                    "y": 370,
                                    "text": "text_index_7",
                                    "classNum": "001",
                                    "fontSize": 28,
                                    "dy": 45,
                                    "bold": false,
                                    "center": true,
                                    "options": null
                                }
                            }
                        ],
                        "connectDotOffsets": {
                            "x": -10,
                            "y": 0
                        },
                        "isAns": true
                    }
                ],
                "dotSize": 3,
                "lineClassNum": "04"
            },
            {
                "element": [
                    {
                        "createElement": [
                            {
                                "type": "rect",
                                "meta": {
                                    "x": 700,
                                    "y": 130,
                                    "width": 100,
                                    "height": 60,
                                    "rXY": 10,
                                    "shapeFillClassNum": "096",
                                    "shapeStrokeClassNum": "no",
                                    "shapeStrokeWidth": 1
                                }
                            },
                            {
                                "type": "text",
                                "meta": {
                                    "x": 700,
                                    "y": 130,
                                    "text": "text_index_5",
                                    "classNum": "001",
                                    "fontSize": 28,
                                    "dy": 45,
                                    "bold": false,
                                    "center": true,
                                    "options": null
                                }
                            }
                        ],
                        "connectDotOffsets": {
                            "x": -10,
                            "y": 0
                        },
                        "isAns": false
                    },
                    {
                        "createElement": [
                            {
                                "type": "rect",
                                "meta": {
                                    "cx": 700,
                                    "cy": 250,
                                    "width": 100,
                                    "height": 60,
                                    "rXY": 10,
                                    "shapeFillClassNum": "096",
                                    "shapeStrokeClassNum": "no",
                                    "shapeStrokeWidth": 1
                                }
                            },
                            {
                                "type": "text",
                                "meta": {
                                    "cx": 700,
                                    "cy": 250,
                                    "text": "text_index_6",
                                    "classNum": "001",
                                    "fontSize": 28,
                                    "dy": 45,
                                    "bold": false,
                                    "center": true,
                                    "options": null
                                }
                            }
                        ],
                        "connectDotOffsets": {
                            "x": -10,
                            "y": 0
                        },
                        "isAns": false
                    },
                    {
                        "createElement": [
                            {
                                "type": "rect",
                                "meta": {
                                    "x": 700,
                                    "y": 370,
                                    "width": 100,
                                    "height": 60,
                                    "rXY": 10,
                                    "shapeFillClassNum": "096",
                                    "shapeStrokeClassNum": "no",
                                    "shapeStrokeWidth": 1
                                }
                            },
                            {
                                "type": "text",
                                "meta": {
                                    "x": 700,
                                    "y": 370,
                                    "text": "text_index_7",
                                    "classNum": "001",
                                    "fontSize": 28,
                                    "dy": 45,
                                    "bold": false,
                                    "center": true,
                                    "options": null
                                }
                            }
                        ],
                        "connectDotOffsets": {
                            "x": -10,
                            "y": 0
                        },
                        "isAns": true
                    }
                ],
                "dotSize": 3,
                "lineClassNum": "04"
            }
        ],
        "okButton": {
            "cx": 700,
            "cy": 450
        }
        }
    ```

-   > ### questionType | _`string`_ | 모듈 설정

    ```javascript
    "questionType": "KM000026";
    ```

-   > ### direction | _`object`_ | 지시문 설정

    -   `[필수]`x : x좌표
    -   `[필수]`y : y좌표
    -   `[필수]`text : 텍스트 설정
    -   `[옵션]`classNum : 색상 번호 `(기본:'91')`
    -   `[옵션]`fontSize : 폰트 크기 `(기본:20)`
    -   `[옵션]`dy : 줄 간격 `(기본:45)`
    -   `[옵션]`bold : 텍스트 진하게 여부 `(기본:false)`
    -   `[옵션]`options : 텍스트에 옵션 부여 `(기본:없음, color, underline, box, highlight)`
    -   `[옵션]`speakerX : 스피커 x좌표 `(기본: 지시문 x좌표 -40)`
    -   `[옵션]`speakerY : 스피커 y좌표 `(기본: 지시문 y좌표 -22)`

    ```javascript
    "direction": {
        "x": 70,
        "y": 50,
        "text": "text_index_0",
        "classNum": "91",
        "fontSize": 20,
        "dy": 45,
        "bold" : true,
        "options" : [{
            "type": "box",
            "classNum": "91",
            "boxText": "?",
            "boxTextClass": "91",
            "boxTextScale": 1,
            "bold": true
        }],
        "speakerX": 30,
        "speakerY": 28
    }
    ```

    <br />

-   > ### connect | _`object`_ | 연결하기 정보

    -   `[필수]`element : 엘리먼트(연결될 그룹의 엘리먼트) 배열
        -   `[필수]`createElement : 기본적인 엘리먼트 배열
            -   `[필수]`type : 기본적인 엘리먼트 유형(rect, circle, text, image, 등, 각 유형마다 메타가 다릅니다.)
            -   `[필수]`meta : 메타
                -   `[필수]`cx : x값
                -   `[필수]`cy : y값
                -   `[필수]`width : 너비 (유형이 rect 일 때)
                -   `[필수]`height : 높이 (유형이 rect 일 때)
                -   `[옵션]`rXY : round 값 (유형이 rect 일 때) `(기본:0)`
                -   `[필수]`r : 반지름 값 (유형이 circle 일 때)
                -   `[옵션]`shapeFillClassNum : 모양 채우기 색 번호 (유형이 rect, circle 일 때) `(기본:'03')`
                -   `[옵션]`shapeStrokeClassNum : 모양 선 색 번호 (유형이 rect, circle 일 때) `(기본:'no')`
                -   `[옵션]`shapeStrokeWidth : 모양 선 두께 (유형이 rect, circle 일 때) `(기본:1)`
                -   `[옵션]`shapeOpacity : 모양 투명도 (유형이 rect, circle 일 때) `(기본:1)`
                -   `[옵션]`shapeIsDashArray : 모양의 선을 점선으로 만들지 여부 (유형이 rect, circle 일 때) `(기본:'strokeWidth/3, strokeWidth/3')`
                -   `[옵션]`classNum : 채우기 색 번호 (유형이 text 일 때) `(기본:'91')`
                -   `[옵션]`fontSize : 폰트 크기 (유형이 text 일 때) `(기본:20)`
                -   `[옵션]`dy : 줄간격 (유형이 text 일 때) `(기본:45)`
                -   `[옵션]`bold : 폰트 두꺼운 여부 (유형이 text 일 때) `(기본:false)`
                -   `[옵션]`center : 가운데 정렬 여부 (유형이 text 일 때) `(기본:false)`
                -   `[옵션]`options : 폰트에 부여할 옵션 (유형이 text 일 때) `(기본:없음)`
                -   `[필수]`ImgUrl : 이미지 경로 (유형이 image 일 때)
                -   `[옵션]`ImgScale : 이미지 크기 (유형이 image 일 때) `(기본:0.4)`
            -   `[필수]`connectDotOffsets : 연결 점 조정 값
                -   `[옵션]`x : x값 `(기본:0)`
                -   `[옵션]`y : y값 `(기본:0)`
            -   `[필수]`isAns : 정답 유무
        -   `[옵션]`dotSize : 연결하는 점 크기 `(기본:5)`
        -   `[옵션]`lineClassNum : 연결된 선 색 번호 `(기본:'04')`

    ```javascript
    "connect" : {
        "element": [{
            "createElement": [{
                "type": "rect",
                "meta": {
                    "cx": 500,
                    "cy": 130,
                    "width": 100,
                    "height": 60,
                    "rXY": 10,
                    "shapeFillClassNum": "007",
                    "shapeStrokeClassNum": "no",
                    "shapeStrokeWidth": 1
                }
            }, ...],
            "connectDotOffsets": {
                "x": -10,
                "y": 0
            },
            "isAns": false
        }, ...],
        "dotSize": 3,
        "lineClassNum": "04"
    }, ...]
    ```

    <br />

-   > ### okButton | _`object`_ | 확인 버튼

    -   `[필수]`cx : x좌표
    -   `[필수]`cy : y좌표

    ```javascript
    "okButton": {
        "cx": 70,
        "cy": 50
    }
    ```

    <br />

> ## KM000027

    complex

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000027",
        "direction": {
            "x": 80,
            "y": 40,
            "text": "text_index_0",
            "classNum": "000",
            "fontSize": 25,
            "dy": 40,
            "bold": true,
            "speakerX": 40,
            "speakerY": 18
        },
        "traceImgInfo": { // 사다리 이미지
            "cx": 400,
            "cy": 263,
            "scale": 0.58,
            "index": 0 //현재 1개만 제작 되어 있으므로 index에 영향받지 않습니다.
        },
        "startPart": [{ // 연결 시작 지점 부분
            "createElement": [{ //그룹 1 엘리먼트 (이미지, text:'수')
                "type": "image",
                "meta": {
                    "cx": 245,
                    "cy": 120,
                    "imgUrl": "image_index_0", // 파란 동그라미 이미지
                    "imgScale": 0.15
                }
            }, {
                "type": "text",
                "meta": {
                    "cx": 245,
                    "cy": 120,
                    "text": "text_index_1", //수
                    "classNum": "001",
                    "fontSize": 28,
                    "dy": 45,
                    "bold": false,
                    "center": true,
                    "options": null
                }
            }]
        }, {
            "createElement": [{ //그룹 2 엘리먼트 (이미지, text:'이')
                "type": "image",
                "meta": {
                    "cx": 400,
                    "cy": 120,
                    "imgUrl": "image_index_1", // 주황 동그라미 이미지
                    "imgScale": 0.15
                }
            }, {
                "type": "text",
                "meta": {
                    "cx": 400,
                    "cy": 120,
                    "text": "text_index_2", //이
                    "classNum": "001",
                    "fontSize": 28,
                    "dy": 45,
                    "bold": false,
                    "center": true,
                    "options": null
                }
            }]
        }, {
            "createElement": [{ //그룹 3 엘리먼트 (이미지, text:'여')
                "type": "image",
                "meta": {
                    "cx": 555,
                    "cy": 120,
                    "imgUrl": "image_index_2", //분홍 동그라미
                    "imgScale": 0.15
                }
            }, {
                "type": "text",
                "meta": {
                    "cx": 555,
                    "cy": 120,
                    "text": "text_index_3", //여
                    "classNum": "001",
                    "fontSize": 28,
                    "dy": 45,
                    "bold": false,
                    "center": true,
                    "options": null
                }
            }]
        }],
        "endPart": [{ //연결 끝 지점 부분
            "createElement": [{ //그룹 1 엘리먼트 (이미지, text:'ㅍ')
                "type": "image",
                "meta": {
                    "cx": 245,
                    "cy": 405,
                    "imgUrl": "image_index_1", //왼쪽 주황색 동그라미 이미지
                    "imgScale": 0.15
                }
            }, {
                "type": "text",
                "meta": {
                    "cx": 245,
                    "cy": 405,
                    "text": "text_index_4", //ㅍ
                    "classNum": "001",
                    "fontSize": 28,
                    "dy": 45,
                    "bold": false,
                    "center": true,
                    "options": null
                }
            }]
        }, {
            "createElement": [{
                "type": "image",
                "meta": {
                    "cx": 400,
                    "cy": 405,
                    "imgUrl": "image_index_1", //가운데 주황색 동그라미 이미지
                    "imgScale": 0.15
                }
            }, {
                "type": "text",
                "meta": {
                    "cx": 400,
                    "cy": 405,
                    "text": "text_index_4", //ㅍ
                    "classNum": "001",
                    "fontSize": 28,
                    "dy": 45,
                    "bold": false,
                    "center": true,
                    "options": null
                }
            }]
        }, {
            "createElement": [{
                "type": "image",
                "meta": {
                    "cx": 555,
                    "cy": 405,
                    "imgUrl": "image_index_1",//오른쪽 주황색 동그라미 이미지
                    "imgScale": 0.15
                }
            }, {
                "type": "text",
                "meta": {
                    "cx": 555,
                    "cy": 405,
                    "text": "text_index_4", //ㅍ
                    "classNum": "001",
                    "fontSize": 28,
                    "dy": 45,
                    "bold": false,
                    "center": true,
                    "options": null
                }
            }]
        }],
        "questionPart": [{ //문제 부분
            "popUpInfo": { //팝업창 관련 정보
                "equationValue": { //팝업창에서 식 부분
                    "x": 75, //첫번째 사각형 시작 x 위치
                    "y": 205, //첫번째 사각형 시작 y 위치
                    "width": 100, //사각형 너비
                    "height": 100, //사각형 높이
                    "gap": 200, //사각형 사이 간격
                    "plusScale": 0.7, //더하기 기호 스케일
                    "arrowScale": 1, //화살표 기호 스케일
                    "wordInfo": [{ //사각형 안에 들어 갈 텍스트 패스 정보 (팝업 하나마다 배열안에 객체 하나씩 추가)
                        "scale": [0.8, 0.9], // 첫번째 팝업의 두 네모의 scale
                        "offset": [{ // 첫번째 팝업의 두 네모의 offset
                            "x": 0,
                            "y": 0
                        }, {
                            "x": -5,
                            "y": -10
                        }]
                    }, {
                        "scale": [0.8, 0.8], // 두번째 팝업의 두 네모의 scale
                        "offset": [{ // 두번째 팝업의 두 네모의 offset
                            "x": -5,
                            "y": -10
                        }, {
                            "x": -5,
                            "y": -10
                        }]
                    }]
                },
                "handWriteValue": { //팝업창에서 핸드라이트 부분
                    "x": 475, //핸드라이트 창 x위치
                    "y": 130, //핸드라이트 창 y위치
                    "width": 250,  //핸드라이트 창 너비
                    "height": 250, //핸드라이트 창 높이
                    "drawClassNum": "001", //핸드라이트 패스 색깔
                    "background": { //핸드라이트 창 채우기, 선색
                        "fillClassNum": "14",
                        "strokeClassNum": "01"
                    },
                    "okButton": { //ok버튼 정보
                        "type": 0,
                        "cx": 400,
                        "cy": 460
                    }
                },
                "penIcon": { // 팝업창 열리기 전 펜 아이콘 위치
                    "x": 285,
                    "y": 475
                },
                "size": { //팝업창 사이즈
                    "x": 0,
                    "y": 90,
                    "width": 800,
                    "height": 410
                }
            },
            "boxInfo": { // 팝업창 열리기 위해 눌러야 할 박스 정보
                "cx": 245,
                "cy": 460,
                "width": 80,
                "height": 50,
                "rXY": 0,
                "shapeFillClassNum": "06",
                "shapeStrokeClassNum": "01",
                "shapeStrokeWidth": 1,
                "qMark": true, // 물음표 마크 여부
                "qMarkSize": 28, // 물음표 마크 크기
                "qMarkClassNum": "001" // 물음표 마크 색깔
            }
        }, {
            "popUpInfo": {
                "equationValue": {
                    "x": 75,
                    "y": 205,
                    "width": 100,
                    "height": 100,
                    "gap": 200,
                    "plusScale": 0.7,
                    "arrowScale": 1,
                    "wordInfo": [{
                        "scale": [0.8, 0.9],
                        "offset": [{
                            "x": 0,
                            "y": 0
                        }, {
                            "x": -5,
                            "y": -10
                        }]
                    }, {
                        "scale": [0.8, 0.8],
                        "offset": [{
                            "x": -5,
                            "y": -10
                        }, {
                            "x": -5,
                            "y": -10
                        }]
                    }]
                },
                "handWriteValue": {
                    "x": 475,
                    "y": 130,
                    "width": 250,
                    "height": 250,
                    "drawClassNum": "001",
                    "background": {
                        "fillClassNum": "14",
                        "strokeClassNum": "01"
                    },
                    "okButton": {
                        "type": 0,
                        "cx": 400,
                        "cy": 450
                    }
                },
                "penIcon": {
                    "x": 440,
                    "y": 475
                },
                "size": {
                    "x": 0,
                    "y": 90,
                    "width": 800,
                    "height": 410
                }
            },
            "boxInfo": {
                "cx": 400,
                "cy": 460,
                "width": 80,
                "height": 50,
                "rXY": 0,
                "shapeFillClassNum": "04",
                "shapeStrokeClassNum": "01",
                "shapeStrokeWidth": 1,
                "qMark": true,
                "qMarkSize": 28,
                "qMarkClassNum": "001"
            }
        }, {
            "popUpInfo": {
                "equationValue": {
                    "x": 75,
                    "y": 205,
                    "width": 100,
                    "height": 100,
                    "gap": 200,
                    "plusScale": 0.7,
                    "arrowScale": 1,
                    "wordInfo": [{
                        "scale": [0.8, 0.9],
                        "offset": [{
                            "x": 0,
                            "y": 0
                        }, {
                            "x": -5,
                            "y": -10
                        }]
                    }, {
                        "scale": [0.8, 0.8],
                        "offset": [{
                            "x": -5,
                            "y": -10
                        }, {
                            "x": -5,
                            "y": -10
                        }]
                    }]
                },
                "handWriteValue": {
                    "x": 475,
                    "y": 130,
                    "width": 250,
                    "height": 250,
                    "drawClassNum": "001",
                    "background": {
                        "fillClassNum": "14",
                        "strokeClassNum": "01"
                    },
                    "okButton": {
                        "type": 0,
                        "cx": 400,
                        "cy": 460
                    }
                },
                "penIcon": {
                    "x": 595,
                    "y": 475
                },
                "size": {
                    "x": 0,
                    "y": 90,
                    "width": 800,
                    "height": 410
                }
            },
            "boxInfo": {
                "cx": 555,
                "cy": 460,
                "width": 80,
                "height": 50,
                "rXY": 0,
                "shapeFillClassNum": "05",
                "shapeStrokeClassNum": "01",
                "shapeStrokeWidth": 1,
                "qMark": true,
                "qMarkSize": 28,
                "qMarkClassNum": "001"
            }
        }]
    }
    ```

> ## KM000028

    write

-   ### 기본 포맷

    ```javascript
     {
        "questionType": "KM000028",
        "direction": { //지시문
            "x": 80,
            "y": 40,
            "text": "text_index_0",
            "classNum": "000",
            "fontSize": 25,
            "dy": 40,
            "bold": true,
            "speakerX": 40,
            "speakerY": 18
        },
        "imageButtons": [{ // 이미지 버튼
            "isButton": false, //버튼 보이게 할지 유무
            "x": 80,
            "y": 300,
            "width": 110,
            "height": 100,
            "btnFillClassNum": "021",
            "btnStrokeClassNum": "no",
            "btnOpacity": 1,
            "btnStrokeWidth": 0.2,
            "btnR": 10,
            "imageInfo": [{ //버튼 안에 들어 갈 이미지
                "cx": 140,
                "cy": 360,
                "img": {
                    "url": "image_index_0",
                    "scale": 0.1
                }
            }, {
                "cx": 95,
                "cy": 320,
                "img": {
                    "url": "image_index_2",
                    "scale": 0.8
                }
            }],
            "soundInfo": { //버튼을 눌렀을 때 나올 사운드
                "url": "sound_index_0"
            }
        }, {
            "isButton": false,
            "x": 280,
            "y": 100,
            "width": 110,
            "height": 100,
            "btnFillClassNum": "021",
            "btnStrokeClassNum": "no",
            "btnOpacity": 1,
            "btnStrokeWidth": 0.2,
            "btnR": 10,
            "imageInfo": [{
                "cx": 340,
                "cy": 160,
                "img": {
                    "url": "image_index_1",
                    "scale": 0.1
                }
            }, {
                "cx": 300,
                "cy": 115,
                "img": {
                    "url": "image_index_2",
                    "scale": 0.8
                }
            }],
            "soundInfo": {
                "url": "sound_index_1"
            }
        }],
        "puzzle": [{ //퍼즐 부분 이미지 (한 조각 당 하나의 객체로 이루어진 배열)
            "type": "rect", //퍼즐 모양 타입
            "meta": {
                "cx": 130,
                "cy": 150,
                "width": 100,
                "height": 100,
                "rXY": 5,
                "shapeFillClassNum": "14",
                "shapeStrokeClassNum": "0015",
                "shapeStrokeWidth": 1
            },
            "innerWord": "거", //모양안에 들어갈 단어
            "fontSize": 60, //모양안에 들어갈 단어 크기
            "fontClassNum": "0002", //모양안에 들어갈 단어 색상(쓰기의 답인 경우 색상 지정을 다르게)
            "handWriteValue": { // 핸드라이트
                "x": 420,
                "y": 100,
                "width": 250,
                "height": 300,
                "drawClassNum": "001",
                "drawStrokeWidth": 10,
                "boxFillClassNum": "14",
                "boxStrokeClassNum": "0015",
                "boxOpacity": 1,
                "okButton": {
                    "cx": 670,
                    "cy": 460
                },
                "undoButton": { // 이전 버튼
                    "x": 675,
                    "y": 305,
                    "scale": 0.8
                },
                "resetButton": { // 리셋 버튼
                    "x": 675,
                    "y": 355,
                    "scale": 0.8
                }
            }
        }, {
            "type": "rect",
            "meta": {
                "cx": 230,
                "cy": 150,
                "width": 100,
                "height": 100,
                "rXY": 5,
                "shapeFillClassNum": "14",
                "shapeStrokeClassNum": "0015",
                "shapeStrokeWidth": 1
            },
            "innerWord": "미",
            "fontSize": 60,
            "fontClassNum": "000",  //모양안에 들어갈 단어 색상(일반적인 경우 검정색)
            "handWriteValue": false
        }, {
            "type": "rect",
            "meta": {
                "cx": 130,
                "cy": 250,
                "width": 100,
                "height": 100,
                "rXY": 5,
                "shapeFillClassNum": "14",
                "shapeStrokeClassNum": "0015",
                "shapeStrokeWidth": 1
            },
            "innerWord": "울",
            "fontSize": 60,
            "fontClassNum": "000",
            "handWriteValue": false
        }]
    }
    ```

> ## KM000029

    drag

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000029",
        "direction": { // 지시문
            "x": 80,
            "y": 45,
            "text": "text_index_0",
            "classNum": "000",
            "fontSize": 25,
            "dy": 40,
            "bold": true,
            "speakerX": 40,
            "speakerY": 25
        },
        "imageButton": { //이미지 버튼
            "isButton": true, //이미지 버튼 보일지 여부
            "x": 80,
            "y": 275,
            "width": 640,
            "height": 180,
            "btnR": 10,
            "shadowClassNum": "0006", // 버튼에 그림자 색상(= 그림자 여부)
            "shadowDx": 0, // 버튼에 그림자 x축 이동 값
            "btnFillClassNum": "14",
            "btnStrokeClassNum": "no",
            "btnOpacity": 1,
            "btnStrokeWidth": 1,
            "element": [
            {
                "type": "image",
                "meta": {
                "cx": 260,
                "cy": 365,
                "ImgUrl": "image_index_0",
                "ImgScale": 0.7
                }
            },
            {
                "type": "image",
                "meta": {
                "cx": 550,
                "cy": 365,
                "ImgUrl": "image_index_1",
                "ImgScale": 1
                }
            },
            {
                "type": "image",
                "meta": {
                "cx": 465,
                "cy": 376,
                "ImgUrl": "image_index_2",
                "ImgScale": 1
                }
            },
            {
                "type": "text",
                "meta": {
                "cx": 560,
                "cy": 365,
                "text": "리",
                "classNum": "14",
                "fontSize": 50,
                "bold": true
                }
            },
            {
                "type": "image",
                "meta": {
                "cx": 110,
                "cy": 305,
                "ImgUrl": "image_index_4",
                "ImgScale": 1
                }
            }
            ],
            "soundInfo": {
            "url": "sound_index_0"
            }
        },
        "drag": {
            "hintCount": 0, // 드래그 시 힌트 수
            "dragPosition": [{ //드래그해서 넣을 영역의 cx,cy값 ( = 드래그가 놓여질 영역 이미지의 cx,cy 좌표라고 생각하시면 됩니다.)
                "cx": 465,
                "cy": 376
            }, ...],
            "ansIndex": [0, ...], // drag 엘리먼트 중 정답의 인덱스 (드래그 엘리먼트 중 꼭 존재하는 인덱스여야 되고, 해당 정답은 dragPosition와 순서가 동일하게 적용됩니다.)
            "element": [ //드래그 엘리먼트
                [ // 첫번 째 엘리먼트
                    {
                        "type": "image",
                        "meta": {
                            "cx": 175,
                            "cy": 160,
                            "ImgUrl": "image_index_3",
                            "ImgScale": 1
                        }
                    },
                    {
                        "type": "text",
                        "meta": {
                            "cx": 165,
                            "cy": 148,
                            "text": "오",
                            "classNum": "14",
                            "fontSize": 50,
                            "bold": true
                        }
                    }
                ],
                [ // 두번 째 엘리먼트
                    {
                        "type": "image",
                        "meta": {
                            "cx": 325,
                            "cy": 160,
                            "ImgUrl": "image_index_3",
                            "ImgScale": 1
                        }
                    },
                    {
                        "type": "text",
                        "meta": {
                            "cx": 315,
                            "cy": 148,
                            "text": "노",
                            "classNum": "14",
                            "fontSize": 50,
                            "bold": true
                        }
                    }
                ],
                [ // 세번 째 엘리먼트
                    {
                        "type": "image",
                        "meta": {
                            "cx": 475,
                            "cy": 160,
                            "ImgUrl": "image_index_3",
                            "ImgScale": 1
                        }
                    },
                    {
                        "type": "text",
                        "meta": {
                            "cx": 465,
                            "cy": 148,
                            "text": "가",
                            "classNum": "14",
                            "fontSize": 50,
                            "bold": true
                        }
                    }
                ],
                [ // 네번 째 엘리먼트
                    {
                        "type": "image",
                        "meta": {
                            "cx": 625,
                            "cy": 160,
                            "ImgUrl": "image_index_3",
                            "ImgScale": 1
                        }
                    },
                    {
                        "type": "text",
                        "meta": {
                            "cx": 615,
                            "cy": 148,
                            "text": "소",
                            "classNum": "14",
                            "fontSize": 50,
                            "bold": true
                        }
                    }
                ]
            ]
        }
    }
    ```

> ## KM000030

    drag

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000030",
        "direction": { // 지시문
            "x": 80,
            "y": 45,
            "text": "text_index_0",
            "classNum": "000",
            "fontSize": 25,
            "dy": 40,
            "bold": true,
            "speakerX": 40,
            "speakerY": 25
        },
        "background": { // drag 이외에 배경처럼 그려질 엘리먼트
            "element": [{
                "type": "rect",
                "meta": {
                    "cx": 400,
                    "cy": 350,
                    "width": 440,
                    "height": 210,
                    "rXY": 10,
                    "shapeFillClassNum": "14",
                    "shapeStrokeClassNum": "no",
                    "shapeStrokeWidth": 0,
                    "shapeOpacity": 1,
                    "shadowClassNum": "0006",
                    "shadowDx": 0
                }
            }, { //노랑색 이미지
                "type": "image",
                "meta": {
                    "cx": 352.5,
                    "cy": 302.5,
                    "ImgUrl": "image_index_0",
                    "ImgScale": 1
                }
            }, { //노랑색 이미지
                "type": "image",
                "meta": {
                    "cx": 447.5,
                    "cy": 302.5,
                    "ImgUrl": "image_index_0",
                    "ImgScale": 1
                }
            }, { // drag가 놓여질 회색 이미지
                "type": "image",
                "meta": {
                    "cx": 447.5,
                    "cy": 397.5,
                    "ImgUrl": "image_index_1",
                    "ImgScale": 1
                }
            }, {
                "type": "text",
                "meta": {
                    "cx": 352.5,
                    "cy": 302.5,
                    "text": "ㄱ",
                    "classNum": "0005",
                    "fontSize": 50,
                    "bold": true
                }
            }, {
                "type": "text",
                "meta": {
                    "cx": 452.5,
                    "cy": 302.5,
                    "text": "ㅏ",
                    "classNum": "0005",
                    "fontSize": 50,
                    "bold": true
                }
            }]
        },
        "drag": {
            "hintCount": 0, // 힌트 수
            "dragPosition": [{ //드래그해서 넣을 영역의 cx,cy값 ( = 드래그가 놓여질 영역 이미지의 cx,cy 좌표라고 생각하시면 됩니다.)
                "cx": 447.5,
                "cy": 397.5
            }, ...],
            "ansIndex": [0, ...], // drag 엘리먼트 중 정답의 인덱스 (드래그 엘리먼트 중 꼭 존재하는 인덱스여야 되고, 해당 정답은 dragPosition와 순서가 동일하게 적용됩니다.)
            "element": [
                [{ // 첫 번째 드래그 엘리먼트
                    "type": "image",
                    "meta": {
                        "cx": 127.5,
                        "cy": 160,
                        "ImgUrl": "image_index_0",
                        "ImgScale": 1
                    }
                }, {
                    "type": "text",
                    "meta": {
                        "cx": 127.5,
                        "cy": 160,
                        "text": "가",
                        "classNum": "14",
                        "fontSize": 50,
                        "bold": true
                    }
                }],
                [{ // 두 번째 드래그 엘리먼트
                    "type": "image",
                    "meta": {
                        "cx": 263.85,
                        "cy": 160,
                        "ImgUrl": "image_index_0",
                        "ImgScale": 1
                    }
                }, {
                    "type": "text",
                    "meta": {
                        "cx": 263.85,
                        "cy": 160,
                        "text": "다",
                        "classNum": "14",
                        "fontSize": 50,
                        "bold": true
                    }
                }],
                [{ // 세 번째 드래그 엘리먼트
                    "type": "image",
                    "meta": {
                        "cx": 400,
                        "cy": 160,
                        "ImgUrl": "image_index_0",
                        "ImgScale": 1
                    }
                }, {
                    "type": "text",
                    "meta": {
                        "cx": 400,
                        "cy": 160,
                        "text": "버",
                        "classNum": "14",
                        "fontSize": 50,
                        "bold": true
                    }
                }],
                [{ // 네 번째 드래그 엘리먼트
                    "type": "image",
                    "meta": {
                        "cx": 536.15,
                        "cy": 160,
                        "ImgUrl": "image_index_0",
                        "ImgScale": 1
                    }
                }, {
                    "type": "text",
                    "meta": {
                        "cx": 536.15,
                        "cy": 160,
                        "text": "어",
                        "classNum": "14",
                        "fontSize": 50,
                        "bold": true
                    }
                }],
                [{ // 다섯 번째 드래그 엘리먼트
                    "type": "image",
                    "meta": {
                        "cx": 672.3,
                        "cy": 160,
                        "ImgUrl": "image_index_0",
                        "ImgScale": 1
                    }
                }, {
                    "type": "text",
                    "meta": {
                        "cx": 672.3,
                        "cy": 160,
                        "text": "미",
                        "classNum": "14",
                        "fontSize": 50,
                        "bold": true
                    }
                }]
            ]
        }
    }
    ```

> ## KM000031

    complex (click + handWrite)

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000031",
        "direction": { // 지시문
            "x": 80,
            "y": 45,
            "text": "text_index_0",
            "classNum": "000",
            "fontSize": 25,
            "dy": 40,
            "bold": true,
            "speakerX": 40,
            "speakerY": 25
        },
        "isHint": true, //클릭 힌트 유무(click 유형일 때만 존재)
        "background": [{
            "type": "rect", //위쪽 rect
            "meta": {
                "cx": 400,
                "cy": 150,
                "width": 300,
                "height": 140,
                "rXY": 10,
                "shapeFillClassNum": "0001",
                "shapeStrokeClassNum": "no",
                "shapeStrokeWidth": 0,
                "shapeOpacity": 1
            }
        }, {
            "type": "line", //왼쪽 대각선
            "meta": {
                "x": 400,
                "y": 215,
                "x2": 250,
                "y2": 280,
                "shapeStrokeClassNum": "0001",
                "shapeStrokeWidth": 5,
                "shapeOpacity": 1
            }
        }, {
            "type": "line", //오른쪽 대각선
            "meta": {
                "x": 400,
                "y": 215,
                "x2": 550,
                "y2": 280,
                "shapeStrokeClassNum": "0001",
                "shapeStrokeWidth": 5,
                "shapeOpacity": 1
            }
        }, {
            "type": "text", //위쪽 text
            "meta": {
                "cx": 400,
                "cy": 150,
                "text": "대",
                "classNum": "14",
                "fontSize": 90,
                "bold": true
            }
        }],
        "clickButton": [{ // 클릭 버튼 (click 유형일 때만 존재)
            "touchEl": { //첫번째 클릭 엘리먼트
                "type": "rect", //왼쪽 클릭 rect
                "meta": {
                    "cx": 250,
                    "cy": 375,
                    "width": 200,
                    "height": 200,
                    "rXY": 10,
                    "shapeFillClassNum": "14",
                    "shapeStrokeClassNum": "0015",
                    "shapeStrokeWidth": 1,
                    "shapeOpacity": 1
                }
            },
            "visibleEl": { //왼쪽 클릭 시 보여질 text
                "type": "text",
                "meta": {
                    "cx": 250,
                    "cy": 375,
                    "text": "ㄷ",
                    "classNum": "000",
                    "fontSize": 100,
                    "bold": true
                }
            },
            "focusNum": "0001",
            "focusStrokeWidth": 5
        }, {
            "touchEl": { //두번째 클릭 엘리먼트
                "type": "rect", //오른쪽 클릭 rect
                "meta": {
                    "cx": 550,
                    "cy": 375,
                    "width": 200,
                    "height": 200,
                    "rXY": 10,
                    "shapeFillClassNum": "14",
                    "shapeStrokeClassNum": "0015",
                    "shapeStrokeWidth": 1,
                    "shapeOpacity": 1
                }
            },
            "visibleEl": { //오른쪽 클릭 시 보여질 text
                "type": "text",
                "meta": {
                    "cx": 550,
                    "cy": 375,
                    "text": "ㅐ",
                    "classNum": "000",
                    "fontSize": 100,
                    "bold": true
                }
            },
            "focusNum": "0001",
            "focusStrokeWidth": 5
        }]
    },{
        "questionType": "KM000031",
        "direction": { // 지시문
            "x": 80,
            "y": 45,
            "text": "text_index_0",
            "classNum": "000",
            "fontSize": 25,
            "dy": 40,
            "bold": true,
            "speakerX": 40,
            "speakerY": 25
        },
        "background": [{
            "type": "rect", //위쪽 rect
            "meta": {
                "cx": 400,
                "cy": 150,
                "width": 300,
                "height": 140,
                "rXY": 10,
                "shapeFillClassNum": "0001",
                "shapeStrokeClassNum": "no",
                "shapeStrokeWidth": 0,
                "shapeOpacity": 1
            }
        }, {
            "type": "line", //왼쪽 대각선
            "meta": {
                "x": 400,
                "y": 215,
                "x2": 250,
                "y2": 280,
                "shapeStrokeClassNum": "0001",
                "shapeStrokeWidth": 5,
                "shapeOpacity": 1
            }
        }, {
            "type": "line", //오른쪽 대각선
            "meta": {
                "x": 400,
                "y": 215,
                "x2": 550,
                "y2": 280,
                "shapeStrokeClassNum": "0001",
                "shapeStrokeWidth": 5,
                "shapeOpacity": 1
            }
        }, {
            "type": "text",  //위쪽 text
            "meta": {
                "cx": 400,
                "cy": 150,
                "text": "개",
                "classNum": "14",
                "fontSize": 90,
                "bold": true
            }
        }],
        "handWriteValue": [{ // handWrite (write 유형일 때만 존재)
            "element": { //첫번째(왼쪽) handWrite
                "x": 150,
                "y": 275,
                "width": 200,
                "height": 200,
                "rXY": 10,
                "ans": "ㄱ",
                "drawClassNum": "0005",
                "boxFillClassNum": "14",
                "boxStrokeClassNum": "0015",
                "okButton": {
                    "cx": 755,
                    "cy": 430
                }
            },
            "focusNum": "0001",
            "focusStrokeWidth": 5
        }, {
            "element": { //두번째(오른쪽) handWrite
                "x": 450,
                "y": 275,
                "width": 200,
                "height": 200,
                "rXY": 10,
                "ans": "ㅐ",
                "drawClassNum": "0005",
                "boxFillClassNum": "14",
                "boxStrokeClassNum": "0015",
                "okButton": {
                    "cx": 755,
                    "cy": 430
                }
            },
            "focusNum": "0001",
            "focusStrokeWidth": 5
        }]
    }
    ```

> ## KM000032

    connect(낱자 학습)

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000032",
        "direction": { //지시문
            "x": 80,
            "y": 45,
            "text": "text_index_0",
            "classNum": "000",
            "fontSize": 25,
            "dy": 45,
            "bold": true,
            "speakerX": 40,
            "speakerY": 25
        },
        "connectElement": {
            "leftEl": { //왼쪽 connect 엘리먼트
                "background": [{ //왼쪽 connect 엘리먼트에 들어갈 엘리먼트(배경)
                    "type": "image",
                    "meta": {
                        "cx": 205,
                        "cy": 250,
                        "url": "image_index_0",
                        "scale": 0.4
                    }
                }],
                "textInfo": { //왼쪽 connect 엘리먼트에 빈칸이 있는 단어 엘리먼트
                    "cx": 200,
                    "cy": 360,
                    "text": "가지", //text
                    "classNum": "001", //빈칸을 제외한 text 색상
                    "blankType": "word", //빈칸 타입(word인지 jamo인지)
                    "focusClassNum": "0002", //연결이 완료되었을 때 빈칸에 나타날 텍스트의 색상
                    "blankIndex": 0, //빈칸 인덱스
                    "blankWidth": 60, //빈칸 너비
                    "blankHeight": 60, //빈칸 높이
                    "blankR": 10, //빈칸의 round 값
                    "blankFillClassNum": "14", //빈칸의 채우기 색상
                    "blankStrokeClassNum": "0015", //빈칸의 선 색상
                    "blankStrokeWidth": 2, //빈칸의 선 두께
                    "blankOffset": { //빈칸의 offset(-면 반대 방향)
                        "x": 0,
                        "y": 0
                    },
                    "blankQmark": true, //빈칸 안에 물음표 여부
                    "blankVisible": true, //빈칸이 보여질지 여부
                    "blankQmarkSize": 40, //빈칸 안에 물음표 사이즈
                    "blankQmarkClass": "0002" //빈칸 안에 물음표 색상
                },
                "connectAnsIndex": 1, //연결 시 정답(1개만 있어야 됩니다.)
                "connectDotOffsets": { //왼쪽 connect 엘리먼트 offset 값
                    "x": 30,
                    "y": 0
                }
            },
            "rightEl": [{ //오른쪽 connect 엘리먼트
                "element": [{ //오른쪽 connect 엘리먼트에 들어갈 엘리먼트 ('나' 부분)
                    "type": "rect",
                    "meta": {
                        "cx": 690,
                        "cy": 130,
                        "width": 80,
                        "height": 80,
                        "rXY": 10,
                        "shapeFillClassNum": "14",
                        "shapeStrokeClassNum": "no",
                        "shapeOpacity": 1,
                        "shapeStrokeWidth": 0,
                        "shapeIsDashArray": false,
                        "shadowClassNum": "0006"
                    }
                }, {
                    "type": "text",
                    "meta": {
                        "cx": 690,
                        "cy": 130,
                        "text": "나",
                        "classNum": "001",
                        "fontSize": 50
                    }
                }],
                "connectDotOffsets": {
                    "x": -30,
                    "y": 0
                }
            }, {
                "element": [{ //오른쪽 connect 엘리먼트에 들어갈 엘리먼트 ('가' 부분)
                    "type": "rect",
                    "meta": {
                        "cx": 690,
                        "cy": 230,
                        "width": 80,
                        "height": 80,
                        "rXY": 10,
                        "shapeFillClassNum": "14",
                        "shapeStrokeClassNum": "no",
                        "shapeOpacity": 1,
                        "shapeStrokeWidth": 0,
                        "shapeIsDashArray": false,
                        "shadowClassNum": "0006"
                    }
                }, {
                    "type": "text",
                    "meta": {
                        "cx": 690,
                        "cy": 230,
                        "text": "가",
                        "classNum": "001",
                        "fontSize": 50
                    }
                }],
                "connectDotOffsets": {
                    "x": -30,
                    "y": 0
                }
            }, {
                "element": [{ //오른쪽 connect 엘리먼트에 들어갈 엘리먼트 ('너' 부분)
                    "type": "rect",
                    "meta": {
                        "cx": 690,
                        "cy": 330,
                        "width": 80,
                        "height": 80,
                        "rXY": 10,
                        "shapeFillClassNum": "14",
                        "shapeStrokeClassNum": "no",
                        "shapeOpacity": 1,
                        "shapeStrokeWidth": 0,
                        "shapeIsDashArray": false,
                        "shadowClassNum": "0006"
                    }
                }, {
                    "type": "text",
                    "meta": {
                        "cx": 690,
                        "cy": 330,
                        "text": "너",
                        "classNum": "001",
                        "fontSize": 50
                    }
                }],
                "connectDotOffsets": {
                    "x": -30,
                    "y": 0
                }
            }, {
                "element": [{ //오른쪽 connect 엘리먼트에 들어갈 엘리먼트 ('지' 부분)
                    "type": "rect",
                    "meta": {
                        "cx": 690,
                        "cy": 430,
                        "width": 80,
                        "height": 80,
                        "rXY": 10,
                        "shapeFillClassNum": "14",
                        "shapeStrokeClassNum": "no",
                        "shapeOpacity": 1,
                        "shapeStrokeWidth": 0,
                        "shapeIsDashArray": false,
                        "shadowClassNum": "0006"
                    }
                }, {
                    "type": "text",
                    "meta": {
                        "cx": 690,
                        "cy": 430,
                        "text": "지",
                        "classNum": "001",
                        "fontSize": 50
                    }
                }],
                "connectDotOffsets": {
                    "x": -30,
                    "y": 0
                }
            }],
            "lineClassNum": "04", //연결 시 connect 색상
            "lineHint": false, //line 힌트 여부
            "handHint": false //손가락 힌트 여부
        },
        "soundInfo": {  //연결 시 나올 사운드 정보
            "url": "sound_index_0"
        },
        "fbSpeaker": { //피드백 시 스피커 위치
            "x": 100,
            "y": 140,
            "scale": 1
        },
        "fbTextGap": [ //피드백 시 나타나는 텍스트의 gap(기본 위치 기준, 글자 수에 맞게 배열[x,y] 추가 필수)
            [5, 0],
            [0, 0]
        ]
    }
    ```

> ## KM000033

    write(낱자 학습)

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000033",
        "direction": { //지시문
            "x": 80,
            "y": 45,
            "text": "text_index_0",
            "classNum": "000",
            "fontSize": 25,
            "dy": 40,
            "bold": true,
            "speakerX": 40,
            "speakerY": 25
        },
        "imageButtons": [{ //이미지 버튼 1
            "isButton": false, //이미지 버튼으로 보여질 지 여부
            "x": 40,
            "y": 100,
            "width": 110,
            "height": 100,
            "btnFillClassNum": "021",
            "btnStrokeClassNum": "no",
            "btnOpacity": 1,
            "btnStrokeWidth": 0.2,
            "btnR": 10,
            "imageInfo": [{ // 이미지 버튼에 들어갈 첫번째 이미지(캥거루)
                "cx": 90,
                "cy": 160,
                "img": {
                    "url": "image_index_0",
                    "scale": 0.3
                }
            }, { // 이미지 버튼에 들어갈 두번째 이미지(스피커)
                "cx": 55,
                "cy": 120,
                "img": {
                    "url": "image_index_2",
                    "scale": 1
                },
                "isSpeakerIcon": true
            }],
            "soundInfo": {
                "url": "sound_index_0"
            }
        }, { //이미지 버튼 2
            "isButton": false, //이미지 버튼으로 보여질 지 여부
            "x": 235,
            "y": 310,
            "width": 110,
            "height": 100,
            "btnFillClassNum": "021",
            "btnStrokeClassNum": "no",
            "btnOpacity": 1,
            "btnStrokeWidth": 0.2,
            "btnR": 10,
            "imageInfo": [{ // 이미지 버튼에 들어갈 첫번째 이미지(거미)
                "cx": 295,
                "cy": 370,
                "img": {
                    "url": "image_index_1",
                    "scale": 0.18
                }
            }, { // 이미지 버튼에 들어갈 첫번째 이미지(스피커)
                "cx": 255,
                "cy": 325,
                "img": {
                    "url": "image_index_2",
                    "scale": 1
                },
                "isSpeakerIcon": true
            }],
            "soundInfo": {
                "url": "sound_index_1"
            }
        }],
        "puzzle": [{ //퍼즐 부분
            "type": "image", //'캥' 부분 퍼즐
            "meta": {
                "cx": 190,
                "cy": 150,
                "shadowClassNum": "#5BD240", //엘리먼트 그림자 색상
                "ImgUrl": "image_index_3",
                "ImgScale": 1
            },
            "innerWord": "캥",
            "fontSize": 60,
            "fontClassNum": "14"
        }, {
            "type": "image", //회색 빈칸 -> '거' 부분 퍼즐
            "meta": {
                "cx": 285,
                "cy": 150,
                "ImgUrl": "image_index_4",
                "ImgScale": 1
            },
            "innerWord": "거",
            "fontSize": 60,
            "fontClassNum": "0002",
            "handWriteValue": { //퍼즐 엘리먼트 중 문제부분(handWrite)으로 만들 경우 해당 객체 추가 필수
                "x": 470,
                "y": 100,
                "width": 250,
                "height": 300,
                "drawClassNum": "001",
                "drawStrokeWidth": 10,
                "boxFillClassNum": "14",
                "boxStrokeClassNum": "0015",
                "boxOpacity": 1,
                "okButton": {
                    "cx": 755,
                    "cy": 430
                },
                "undoButton": {
                    "x": 730,
                    "y": 105,
                    "scale": 1
                },
                "resetButton": {
                    "x": 730,
                    "y": 145,
                    "scale": 1
                }
            },
            "flipElement": { //퍼즐 엘리먼트 중 문제부분(flip되어 나타날 엘리먼트)으로 만들 경우 해당 객체 추가 필수
                "type": "image",
                "meta": {
                    "cx": 285,
                    "cy": 150,
                    "imgUrl": "image_index_3",
                    "imgScale": 1
                }
            }
        }, {
            "type": "image", //'루' 부분 퍼즐
            "meta": {
                "cx": 380,
                "cy": 150,
                "shadowClassNum": "#5BD240",  //엘리먼트 그림자 색상
                "ImgUrl": "image_index_3",
                "ImgScale": 1
            },
            "innerWord": "루",
            "fontSize": 60,
            "fontClassNum": "14",
            "handWriteValue": false
        }, {
            "type": "image", //'미' 부분 퍼즐
            "meta": {
                "cx": 285,
                "cy": 245,
                "shadowClassNum": "#5BD240",  //엘리먼트 그림자 색상
                "imgUrl": "image_index_3",
                "imgScale": 1
            },
            "innerWord": "미",
            "fontSize": 60,
            "fontClassNum": "14",
            "handWriteValue": false
        }]
    }
    ```

> ## KM000034

    drag(낱자 학습)

-   ### 기본 포맷
    ```javascript
    {
        "questionType": "KM000034",
        "direction": { //지시문
            "x": 80,
            "y": 45,
            "text": "text_index_0",
            "classNum": "000",
            "fontSize": 25,
            "dy": 40,
            "bold": true,
            "speakerX": 40,
            "speakerY": 25
        },
        "element": [{ //drag를 제외한 외부 부분에 존재하는 엘리먼트
            "type": "rect", //drag 아래 배경 rect('흰 배경')
            "meta": {
                "cx": 660,
                "cy": 265,
                "width": 140,
                "height": 380,
                "rXY": 10,
                "shapeFillClassNum": "14",
                "shapeStrokeClassNum": "no",
                "shapeStrokeWidth": 0,
                "shapeOpacity": 1,
                "shadowClassNum": "0006"
            }
        }, {
            "type": "image", // '시' 퍼즐에서 이미지 엘리먼트
            "meta": {
                "cx": 260,
                "cy": 150,
                "ImgUrl": "image_index_0",
                "ImgScale": 1
            }
        }, {
            "type": "image", // '나' 퍼즐에서 이미지 엘리먼트
            "meta": {
                "cx": 355,
                "cy": 245,
                "ImgUrl": "image_index_0",
                "ImgScale": 1
            }
        }, {
            "type": "image", // '무' 퍼즐에서 이미지 엘리먼트
            "meta": {
                "cx": 355,
                "cy": 340,
                "ImgUrl": "image_index_0",
                "ImgScale": 1
            }
        }, {
            "type": "text", // '시' 퍼즐에서 text 엘리먼트
            "meta": {
                "cx": 260,
                "cy": 150,
                "text": "시",
                "classNum": "14",
                "fontSize": 55,
                "bold": true
            }
        }, {
            "type": "text", // '나' 퍼즐에서 text 엘리먼트
            "meta": {
                "cx": 355,
                "cy": 245,
                "text": "나",
                "classNum": "14",
                "fontSize": 55,
                "bold": true
            }
        }, {
            "type": "text", // '무' 퍼즐에서 text 엘리먼트
            "meta": {
                "cx": 355,
                "cy": 340,
                "text": "무",
                "classNum": "14",
                "fontSize": 55,
                "bold": true
            }
        }, {
            "type": "image", // drag할 영역 (회색 빈칸 이미지)
            "meta": {
                "cx": 355,
                "cy": 150,
                "ImgUrl": "image_index_1",
                "ImgScale": 1
            }
        }],
        "imageButtons": [{ // 이미지 버튼 1 (시소)
            "isButton": false,
            "x": 0,
            "y": 0,
            "width": 0,
            "height": 0,
            "btnFillClassNum": "021",
            "btnStrokeClassNum": "no",
            "btnOpacity": 1,
            "btnStrokeWidth": 0.2,
            "btnR": 10,
            "imageInfo": [{ //시소 이미지
                "cx": 160,
                "cy": 150,
                "img": {
                    "url": "image_index_2",
                    "scale": 0.33
                }
            }, { // 스피커 이미지
                "cx": 95,
                "cy": 115,
                "img": {
                    "url": "image_index_4",
                    "scale": 1
                }
            }],
            "soundInfo": {
                "url": "sound_index_0"
            }
        }, { //이미지 버튼 2 (소나무)
            "isButton": false,
            "x": 235,
            "y": 310,
            "width": 110,
            "height": 100,
            "btnFillClassNum": "021",
            "btnStrokeClassNum": "no",
            "btnOpacity": 1,
            "btnStrokeWidth": 0.2,
            "btnR": 10,
            "imageInfo": [{ //소나무 이미지
                "cx": 490,
                "cy": 340,
                "img": {
                    "url": "image_index_3",
                    "scale": 0.33
                }
            }, { // 스피커 이미지
                "cx": 425,
                "cy": 310,
                "img": {
                    "url": "image_index_4",
                    "scale": 1
                }
            }],
            "soundInfo": {
                "url": "sound_index_1"
            }
        }],
        "drag": { //drag 엘리먼트
            "hintCount": 0, //드래그 시 힌트 수
            "dragPosition": [{ //드래그해서 넣을 영역의 cx,cy값 ( = 드래그가 놓여질 영역 이미지의 cx,cy 좌표라고 생각하시면 됩니다. 일치해야 정확히 들어갑니다.)
                "cx": 355,
                "cy": 150
            }],
            "ansIndex": [1], //정답 인덱스
            "element": [
                [{ // 첫 번째 드래그 엘리먼트
                    "type": "image",
                    "meta": {
                        "cx": 660,
                        "cy": 145,
                        "ImgUrl": "image_index_0",
                        "ImgScale": 1
                    }
                }, {
                    "type": "text",
                    "meta": {
                        "cx": 660,
                        "cy": 145,
                        "text": "자",
                        "classNum": "0002",
                        "fontSize": 55,
                        "bold": true
                    }
                }],
                [{ // 두 번째 드래그 엘리먼트
                    "type": "image",
                    "meta": {
                        "cx": 660,
                        "cy": 265,
                        "ImgUrl": "image_index_0",
                        "ImgScale": 1
                    }
                }, {
                    "type": "text",
                    "meta": {
                        "cx": 660,
                        "cy": 265,
                        "text": "소",
                        "classNum": "0002",
                        "fontSize": 55,
                        "bold": true
                    }
                }],
                [{ // 세 번째 드래그 엘리먼트
                    "type": "image",
                    "meta": {
                        "cx": 660,
                        "cy": 385,
                        "ImgUrl": "image_index_0",
                        "ImgScale": 1
                    }
                }, {
                    "type": "text",
                    "meta": {
                        "cx": 660,
                        "cy": 385,
                        "text": "우",
                        "classNum": "0002",
                        "fontSize": 55,
                        "bold": true
                    }
                }]
            ]
        }
    }
    ```

> ## KM000035

    write(낱자 학습, 끝말 잇기)

-   ### 기본 포맷
    ```javascript
    {
        "questionType": "KM000035",
        "direction": { //지시문
            "x": 80,
            "y": 45,
            "text": "text_index_0",
            "classNum": "000",
            "fontSize": 25,
            "dy": 40,
            "bold": true,
            "speakerX": 40,
            "speakerY": 25
        },
        "elements": [{ //배경과 같이 깔릴 엘리먼트
            "type": "image", //(ex 왼쪽 연결 선 이미지)
            "meta": {
                "cx": 260,
                "cy": 270,
                "ImgUrl": "image_index_0",
                "ImgScale": 1.2
            }
        }, {
            "type": "image", //(ex 오른쪽 연결 선 이미지)
            "meta": {
                "cx": 520,
                "cy": 245,
                "ImgUrl": "image_index_1",
                "ImgScale": 1.2
            }
        }],
        "imageButtons": [{ //이미지 버튼
            "element": [{ //첫번째 버튼 엘리먼트(ex 악어)
                "type": "image",
                "meta": {
                    "cx": 170,
                    "cy": 190,
                    "imgUrl": "image_index_2", //(ex 동그라미)
                    "imgScale": 1.15
                }
            }, {
                "type": "image",
                "meta": {
                    "cx": 95,
                    "cy": 130,
                    "imgUrl": "image_index_3", //(ex 스피커)
                    "imgScale": 1
                }
            }, {
                "type": "image",
                "meta": {
                    "cx": 170,
                    "cy": 190,
                    "imgUrl": "image_index_4", //(ex 악어)
                    "imgScale": 0.6
                }
            }],
            "soundInfo": { //버튼 클릭 시 나올 사운드 정보
                "url": "sound_index_0"
            }
        }, {
            "element": [{ //두번째 버튼 엘리먼트(ex 어린이)
                "type": "image",
                "meta": {
                    "cx": 410,
                    "cy": 300,
                    "imgUrl": "image_index_2", //(ex 동그라미)
                    "imgScale": 1.15
                }
            }, {
                "type": "image",
                "meta": {
                    "cx": 340,
                    "cy": 240,
                    "imgUrl": "image_index_3", //(ex 스피커)
                    "imgScale": 1
                }
            }, {
                "type": "image",
                "meta": {
                    "cx": 410,
                    "cy": 300,
                    "imgUrl": "image_index_5", //(ex 어린이)
                    "imgScale": 0.15
                }
            }],
            "soundInfo": { //버튼 클릭 시 나올 사운드 정보
                "url": "sound_index_1"
            }
        }, {
            "element": [{ //세번째 버튼 엘리먼트 (ex 이불)
                "type": "image",
                "meta": {
                    "cx": 650,
                    "cy": 190,
                    "imgUrl": "image_index_2", //(ex 동그라미)
                    "imgScale": 1.15
                }
            }, {
                "type": "image",
                "meta": {
                    "cx": 575,
                    "cy": 130,
                    "imgUrl": "image_index_3", //(ex 스피커)
                    "imgScale": 1
                }
            }, {
                "type": "image",
                "meta": {
                    "cx": 650,
                    "cy": 190,
                    "imgUrl": "image_index_6", //(ex 이불)
                    "imgScale": 0.27
                }
            }],
            "soundInfo": { //버튼 클릭 시 나올 사운드 정보
                "url": "sound_index_2"
            }
        }],
        "wordChain": [{ // 첫번째 끝말잇기 단어 부분
            "text": "악어",
            "cx": 170, //텍스트와 박스의 x위치
            "cy": 340, //텍스트와 박스의 y위치
            "classNum": "000", //텍스트 색상 번호
            "focusClassNum": "0002", //정답 시 낱자에 포커스 될 색상 번호
            "fontSize": 55, // 텍스트 사이즈
            "boxWidth": 80, // 박스 한개의 너비
            "boxHeight": 80, // 박스 한개의 높이
            "boxR": 10,  // 박스의 round 값
            "boxFillClassNum": "14",  //박스 채우기 색상 반호
            "boxStrokeClassNum": "117",  //박스 선 색상 번호
            "boxStrokeWidth": 1, //박스 선 굵기
            "boxGap": 0, //박스들 사이의 거리
            "boxShadowClassNum": "0006", //박스 그림자 색상
            "focusBoxClassNum": "04" //문제 시작 시 박스에 포커스 될 색상 번호
        }, { // 두번째 끝말잇기 단어 부분
            "text": "어린이",
            "cx": 410,
            "cy": 420,
            "classNum": "000",
            "focusClassNum": "0002",
            "fontSize": 55,
            "boxWidth": 80,
            "boxHeight": 80,
            "boxR": 10,
            "boxFillClassNum": "14",
            "boxStrokeClassNum": "117",
            "boxStrokeWidth": 1,
            "boxGap": 0,
            "boxShadowClassNum": "0006",
            "focusBoxClassNum": "04"
        }, { // 세번째 끝말잇기 단어 부분
            "text": "이불",
            "cx": 650,
            "cy": 340,
            "classNum": "000",
            "focusClassNum": "0002",
            "fontSize": 55,
            "boxWidth": 80,
            "boxHeight": 80,
            "boxR": 10,
            "boxFillClassNum": "14",
            "boxStrokeClassNum": "117",
            "boxStrokeWidth": 1,
            "boxGap": 0,
            "boxShadowClassNum": "0006"
        }],
        "popUpInfo": [{ //팝업 정보 (ex 현재 2문제)
            "isHint": true, //팝업의 띄우기 전 박스에 터치를 위한 힌트 여부
            "imageButton": [{ //앞에서 추가한 이미지 버튼에 대한 변경된 정보만 입력(이미지 메타에 관련된 값 모두 적용됨, 기존 이미지 버튼의 이미지와 동일한 순서로 적용, ex 공-스피커-악어 순)
                "cx": 211,
                "cy": 218
            }, {
                "cx": 131,
                "cy": 158
            }, {
                "cx": 211,
                "cy": 218
            }],
            "wordChain": { //앞에서 추가한 끝말 잇기 단어에서 변경된 정보만 입력 (text 메타에 관련된 값 모두 적용됨, ex 악어)
                "cx": 211,
                "cy": 370
            },
            "handWriteValue": { //핸드라이트 관련 정보
                "x": 347,
                "y": 143,
                "width": 270,
                "height": 270,
                "drawClassNum": "0005",
                "background": {
                    "fillClassNum": "14",
                    "strokeClassNum": "01"
                },
                "okButton": {
                    "cx": 662,
                    "cy": 388
                }
            }
        }, {
            "imageButton": [{//앞에서 추가한 이미지 버튼에 대한 변경된 정보만 입력(이미지 메타에 관련된 값 모두 적용됨, 기존 이미지 버튼의 이미지와 동일한 순서로 적용, ex 공-스피커-어린이 순)
                "cx": 211,
                "cy": 218
            }, {
                "cx": 131,
                "cy": 158
            }, {
                "cx": 211,
                "cy": 218
            }],
            "wordChain": { //앞에서 추가한 끝말 잇기 단어에서 변경된 정보만 입력 (text 메타에 관련된 값 모두 적용됨, ex 어린이)
                "cx": 211,
                "cy": 370,
                "fontSize": 45,
                "boxWidth": 60,
                "boxHeight": 60
            },
            "handWriteValue": { //핸드라이트 관련 정보
                "x": 347,
                "y": 143,
                "width": 270,
                "height": 270,
                "drawClassNum": "0005",
                "background": {
                    "fillClassNum": "14",
                    "strokeClassNum": "01"
                },
                "okButton": {
                    "cx": 662,
                    "cy": 388
                }
            }
        }]
    }
    ```

> ## KM000036

    고르기(낱자 학습)

-   ### 기본 포맷
    ```javascript
    {
        "questionType": "KM000036",
        "direction": { //지시문
            "x": 80,
            "y": 45,
            "text": "text_index_0",
            "classNum": "000",
            "fontSize": 25,
            "dy": 40,
            "bold": true,
            "speakerX": 40,
            "speakerY": 25
        },
        "elements": [{ //배경에 들어갈 엘리먼트(정적인 엘리먼트)
            "type": "image",
            "meta": {
                "cx": 160,
                "cy": 270,
                "ImgUrl": "image_index_0", //곰,다람쥐 이미지
                "ImgScale": 0.45
            }
        }, {
            "type": "image",
            "meta": {
                "cx": 145,
                "cy": 130,
                "ImgUrl": "image_index_1", //화살표 이미지
                "ImgScale": 0.45,
                "rotate": 315 //회전 정도
            }
        }, {
            "type": "text",
            "meta": {
                "cx": 380,
                "cy": 270,
                "text": "곰이",
                "classNum": "000",
                "fontSize": 55
            }
        }],
        "choice": { //선택지
            "hintCount": 1, //힌트 갯수
            "ansIndex": 0, //정답 인덱스
            "elements": [ //엘리먼트 배열(선택지 만큼 존재)
                [{ //첫번째 선택지
                    "type": "rect",
                    "meta": {
                        "cx": 600,
                        "cy": 180,
                        "width": 240,
                        "height": 100,
                        "rXY": 10,
                        "shapeFillClassNum": "14",
                        "shapeStrokeClassNum": "117",
                        "shadowClassNum": "0006",
                        "shapeStrokeWidth": 1
                    }
                }, {
                    "type": "text",
                    "meta": {
                        "cx": 600,
                        "cy": 180,
                        "text": "큽니다.",
                        "classNum": "000",
                        "fontSize": 55
                    }
                }],
                [{ //두번째 선택지
                    "type": "rect",
                    "meta": {
                        "cx": 600,
                        "cy": 360,
                        "width": 240,
                        "height": 100,
                        "rXY": 10,
                        "shapeFillClassNum": "14",
                        "shapeStrokeClassNum": "117",
                        "shadowClassNum": "0006",
                        "shapeStrokeWidth": 1
                    }
                }, {
                    "type": "text",
                    "meta": {
                        "cx": 600,
                        "cy": 360,
                        "text": "작습니다.",
                        "classNum": "000",
                        "fontSize": 55
                    }
                }]
            ]
        },
        "lastFeedback": { //마지막 피드백 화면 시 나타날 엘리먼트
            "elements": [{
                "type": "image",
                "meta": {
                    "cx": 400,
                    "cy": 240,
                    "ImgUrl": "image_index_0",
                    "ImgScale": 0.45
                }
            }, {
                "type": "image",
                "meta": {
                    "cx": 385,
                    "cy": 100,
                    "ImgUrl": "image_index_1",
                    "ImgScale": 0.45,
                    "rotate": 315
                }
            }, {
                "type": "text",
                "meta": {
                    "cx": 400,
                    "cy": 410,
                    "text": "text_index_1",
                    "classNum": "000",
                    "fontSize": 55,
                    "options": [{
                        "type": "color",
                        "classNum": "0018",
                        "bold":true
                    }],
                    "bold":true
                }
            }],
            "soundInfo": { //피드백 시 재생 될 사운드
                "url": "sound_index_0"
            }
        }
    }
    ```

> ## KM000037

    연결하기(낱자 학습)

-   ### 기본 포맷
    ```javascript
    {
        "questionType": "KM000037",
        "direction": { //지시문
            "x": 80,
            "y": 45,
            "text": "text_index_0",
            "classNum": "000",
            "fontSize": 25,
            "dy": 40,
            "bold": true,
            "speakerX": 40,
            "speakerY": 25
        },
        "connectElement": { //연결하기 엘리먼트
            "leftEl": { //왼쪽 엘리먼트
                "elements": [{
                    "type": "image",
                    "meta": {
                        "cx": 190,
                        "cy": 240,
                        "ImgUrl": "image_index_0", // 코끼리 다람쥐 이미지
                        "ImgScale": 0.45
                    }
                }, {
                    "type": "image",
                    "meta": {
                        "cx": 245,
                        "cy": 165,
                        "ImgUrl": "image_index_1", //화살표 이미지
                        "ImgScale": 0.45,
                        "rotate": 315
                    }
                }, {
                    "type": "text",
                    "meta": {
                        "cx": 195,
                        "cy": 360,
                        "text": "다람쥐가",
                        "classNum": "000",
                        "fontSize": 40
                    }
                }],
                "connectAnsIndex": 0, //연결하기 정답 인덱스
                "connectDotOffsets": { //연결 점 offset 위치
                    "x": 10,
                    "y": 0
                }
            },
            "rightEl": [{ //오른쪽 엘리먼트
                "element": [{ //첫번째 엘리먼트
                    "type": "text",
                    "meta": {
                        "cx": 620,
                        "cy": 160,
                        "text": "가볍습니다.",
                        "classNum": "000",
                        "fontSize": 40
                    }
                }],
                "connectDotOffsets": { //연결 점 offset 위치
                    "x": -20,
                    "y": 0
                }
            }, {
                "element": [{ //두번째 엘리먼트
                    "type": "text",
                    "meta": {
                        "cx": 620,
                        "cy": 370,
                        "text": "무겁습니다.",
                        "classNum": "000",
                        "fontSize": 40
                    }
                }],
                "connectDotOffsets": { //연결 점 offset 위치
                    "x": -20,
                    "y": 0
                }
            }],
            "lineClassNum": "04", //연결 선 생상
            "lineHint": true, // line 힌트 여부
            "handHint": true // hand 힌트 여부
        },
        "lastFeedback": { //마지막 피드백 화면 시 나타날 엘리먼트
            "elements": [{
                "type": "image",
                "meta": {
                    "cx": 400,
                    "cy": 220,
                    "ImgUrl": "image_index_0", //코끼리 다람쥐 이미지
                    "ImgScale": 0.6
                }
            }, {
                "type": "image",
                "meta": {
                    "cx": 470,
                    "cy": 140,
                    "ImgUrl": "image_index_1", // 화살표 이미지
                    "ImgScale": 0.45,
                    "rotate": 315
                }
            }, {
                "type": "text",
                "meta": {
                    "cx": 400,
                    "cy": 370,
                    "text": "text_index_1",
                    "classNum": "000",
                    "fontSize": 50,
                    "options": [{
                        "type": "color",
                        "classNum": "0018",
                        "bold":true
                    }],
                    "bold":true
                }
            }, {
                "type": "image",
                "meta": {
                    "cx": 195,
                    "cy": 110,
                    "ImgUrl": "image_index_3", //스피커 이미지
                    "ImgScale": 1
                }
            }],
            "soundInfo": { //피드백 시 재생 될 사운드
                "url": "sound_index_0"
            }
        }
    }
    ```

> ## KM000038

    선택하기 (문장학습_연습1)

-   ### 기본 포맷
    ```javascript
    {
        "questionType": "KM000038",
        "direction": { // 지시문
            "text": "text_index_0", // [필수]
            "bold": true
        },
        "choice": { // 선택지 1개
            "hintCount": 0, // 힌트 수
            "elements": [
                [{ // 첫번째 보기
                    "type": "image",
                    "meta": {
                        "cx": 115,
                        "cy": 350,
                        "ImgUrl": "image_index_1",
                        "ImgScale": 0.25,
                        "rx": 50
                    }
                }],
                [{ // 두번째 보기
                    "type": "image",
                    "meta": {
                        "cx": 305,
                        "cy": 350,
                        "ImgUrl": "image_index_2",
                        "ImgScale": 0.25,
                        "rx": 50
                    }
                }],
                [{ // 세번째 보기
                    "type": "image",
                    "meta": {
                        "cx": 495,
                        "cy": 350,
                        "ImgUrl": "image_index_3",
                        "ImgScale": 0.25,
                        "rx": 50
                    }
                }],
                [{ // 네번째 보기
                    "type": "image",
                    "meta": {
                        "cx": 685,
                        "cy": 350,
                        "ImgUrl": "image_index_4",
                        "ImgScale": 0.25,
                        "rx": 50
                    }
                }]
            ],
            "ansIndex": 1, //정답 인덱스
            "shadow": { // [선택] 각 보기 그림자&라운드 설정
                "rXY": [
                    10,
                    10,
                    10,
                    10
                ],
                "classNum": [
                    "0008",
                    "0008",
                    "0008",
                    "0008"
                ]
            }
        },
        "imageButtons": [{ // 누르면 소리나는 요소
            "element": [{
                    "type": "rect",
                    "meta": {
                        "cx": 400,
                        "cy": 150,
                        "width": 500,
                        "height": 100,
                        "rXY": 10,
                        "shapeFillClassNum": "14",
                        "shapeStrokeClassNum": "0001",
                        "shapeStrokeWidth": 5
                    }
                },
                {
                    "type": "text",
                    "meta": {
                        "cx": 410,
                        "cy": 150,
                        "text": "악어가 꼬리를 씻습니다.",
                        "classNum": "000",
                        "fontSize": 40
                    }
                },
                {
                    "type": "image",
                    "meta": {
                        "cx": 175,
                        "cy": 125,
                        "ImgUrl": "image_index_0", //스피커
                        "ImgScale": 0.8
                    }
                }
            ],
            "soundInfo": {
                "url": "sound_index_0" // 악어가 꼬리를 씻습니다 음원
            }
        }]
    }
    ```

> ## KM000039

    선택하기(문장 학습)

-   ### 기본 포맷
    ```javascript
    {
        "questionType": "KM000039",
        "direction": { //지시문
            "x": 80,
            "y": 45,
            "text": "text_index_0",
            "classNum": "000",
            "fontSize": 25,
            "dy": 40,
            "bold": true,
            "speakerX": 40,
            "speakerY": 25
        },
        "choice": { //선택지
            "hintCount": 1, //힌트 갯수
            "ansIndex": 0, //정답 인덱스
            "elements": [ //엘리먼트 배열(선택지 만큼 존재)
                [{  //첫번째 선택지
                    "type": "rect",
                    "meta": {
                        "cx": 600,
                        "cy": 140,
                        "width": 340,
                        "height": 60,
                        "rXY": 10,
                        "shapeFillClassNum": "14",
                        "shapeStrokeClassNum": "117",
                        "shadowClassNum": "0006",
                        "shapeStrokeWidth": 1
                    }
                }, {
                    "type": "text",
                    "meta": {
                        "cx": 600,
                        "cy": 140,
                        "text": "text_index_1",
                        "classNum": "000",
                        "fontSize": 25
                    }
                }],
                [{ // 두 번째 선택지
                    "type": "rect",
                    "meta": {
                        "cx": 600,
                        "cy": 235,
                        "width": 340,
                        "height": 60,
                        "rXY": 10,
                        "shapeFillClassNum": "14",
                        "shapeStrokeClassNum": "117",
                        "shadowClassNum": "0006",
                        "shapeStrokeWidth": 1
                    }
                }, {
                    "type": "text",
                    "meta": {
                        "cx": 600,
                        "cy": 235,
                        "text": "text_index_2",
                        "classNum": "000",
                        "fontSize": 25
                    }
                }],
                [{ // 세 번째 선택지
                    "type": "rect",
                    "meta": {
                        "cx": 600,
                        "cy": 330,
                        "width": 340,
                        "height": 60,
                        "rXY": 10,
                        "shapeFillClassNum": "14",
                        "shapeStrokeClassNum": "117",
                        "shadowClassNum": "0006",
                        "shapeStrokeWidth": 1
                    }
                }, {
                    "type": "text",
                    "meta": {
                        "cx": 600,
                        "cy": 330,
                        "text": "text_index_3",
                        "classNum": "000",
                        "fontSize": 25
                    }
                }],
                [{ // 네 번째 선택지
                    "type": "rect",
                    "meta": {
                        "cx": 600,
                        "cy": 425,
                        "width": 340,
                        "height": 60,
                        "rXY": 10,
                        "shapeFillClassNum": "14",
                        "shapeStrokeClassNum": "117",
                        "shadowClassNum": "0006",
                        "shapeStrokeWidth": 1
                    }
                }, {
                    "type": "text",
                    "meta": {
                        "cx": 600,
                        "cy": 425,
                        "text": "text_index_4",
                        "classNum": "000",
                        "fontSize": 25
                    }
                }]
            ]
        },
        "circleImage": { // 원 모양 이미지
            "focusIndex": 0, // 포커스 되는 이미지 인텍스 (element에 넣은 인덱스)
            "soundInfo": { // 포커스 되는 이미지 선택 시 재생되는 사운드 정보
                "url": "sound_index_0"
            },
            "element": [ // 이미지 구성하는 엘리먼트 배열
                [{ // 첫 번째 엘리먼트
                    "type": "image",
                    "meta": {
                        "cx": 200,
                        "cy": 200,
                        "imgUrl": "image_index_0",
                        "imgScale": 0.7
                    }
                }, {
                    "type": "image",
                    "meta": {
                        "cx": 200,
                        "cy": 128,
                        "imgUrl": "image_index_4",
                        "imgScale": 1
                    }
                }],
                [{ // 두 번째 엘리먼트
                    "type": "image",
                    "meta": {
                        "cx": 280,
                        "cy": 280,
                        "ImgUrl": "image_index_1",
                        "ImgScale": 0.6,
                        "shapeOpacity": 0.4
                    }
                }],
                [{ // 세 번째 엘리먼트
                    "type": "image",
                    "meta": {
                        "cx": 200,
                        "cy": 360,
                        "ImgUrl": "image_index_2",
                        "ImgScale": 0.6,
                        "shapeOpacity": 0.4
                    }
                }],
                [{ // 네 번째 엘리먼트
                    "type": "image",
                    "meta": {
                        "cx": 120,
                        "cy": 280,
                        "ImgUrl": "image_index_3",
                        "ImgScale": 0.6,
                        "shapeOpacity": 0.4
                    }
                }]
            ],
            "clickPath": { // 클릭되는 영역 정보
                "meta": { // 부채꼴 모양의 영역 만들기 위한 정보 (start, end를 시계방향으로 설정해야 함)
                    "startX": 65, // 호가 시작되는 점의 x 좌표값
                    "startY": 160, // 호가 시작되는 점의 y 좌표값
                    "endX": 335, // 호가 끝나는 점의 x 좌표값
                    "endY": 160, // 호가 끝나는 점의 y 좌표값
                    "originX": 200, // 중심의 x 좌표값
                    "originY": 300, // 중심의 y 좌표값
                    "r": 180, // 반지름
                    "strokeColor": "024", // path 테두리 색
                    "strokeWidth": "2" // path 테두리 두께
                },
                "check": false // 클릭되는 영역의 테두리를 확인하려면 이 값을 true로 설정, 테두리를 안보이게 하려면 false로 설정
            }
        }
    }
    ```

> ## KM000040

    drag (끝말잇기)

-   ### 기본 포맷

    ```javascript

    {
        "questionType": "KM000040",
        "direction": { //지시문
            "x": 80,
            "y": 45,
            "text": "text_index_0",
            "classNum": "000",
            "fontSize": 20,
            "dy": 45,
            "bold": true,
            "speakerX": 40,
            "speakerY": 25
        },
        "elements": [{ //반응 없이 배경처럼 들어갈 엘리먼트
            "type": "image", // 왼쪽 선 이미지
            "meta": {
                "cx": 235,
                "cy": 250,
                "ImgUrl": "image_index_0",
                "ImgScale": 1,
                "rotate": 50
            }
        }, {
            "type": "image", //오른쪽 선 이미지
            "meta": {
                "cx": 395,
                "cy": 220,
                "ImgUrl": "image_index_1",
                "ImgScale": 1,
                "rotate": 160
            }
        }, {
            "type": "rect", // 드래그 엘리먼트 아래의 rect
            "meta": {
                "cx": 710,
                "cy": 275,
                "width": 120,
                "height": 400,
                "rXY": 10,
                "shapeFillClassNum": "0028",
                "shapeStrokeClassNum": "no",
                "shapeStrokeWidth": 0,
                "shapeOpacity": 1,
                "shadowClassNum": "0006"
            }
        }],
        "imageButtons": [{ //이미지 버튼
            "element": [{ //첫번째 엘리먼트 (새우)
                "type": "image",
                "meta": {
                    "cx": 135,
                    "cy": 140,
                    "imgUrl": "image_index_2",
                    "imgScale": 0.45
                }
            }, {
                "type": "image",
                "meta": {
                    "cx": 55,
                    "cy": 100,
                    "imgUrl": "image_index_5", //스피커 이미지
                    "imgScale": 0.9
                }
            }],
            "soundInfo": {
                "url": "sound_index_0"
            }
        }, {
            "element": [{ //두번째 엘리먼트 (우유)
                "type": "image",
                "meta": {
                    "cx": 315,
                    "cy": 320,
                    "imgUrl": "image_index_3",
                    "imgScale": 0.45
                }
            }, {
                "type": "image",
                "meta": {
                    "cx": 235,
                    "cy": 290,
                    "imgUrl": "image_index_5", //스피커 이미지
                    "imgScale": 0.9
                }
            }],
            "soundInfo": {
                "url": "sound_index_1"
            }
        }, {
            "element": [{ //세번째 엘리먼트 (유치원)
                "type": "image",
                "meta": {
                    "cx": 510,
                    "cy": 145,
                    "imgUrl": "image_index_4",
                    "imgScale": 0.45
                }
            }, {
                "type": "image",
                "meta": {
                    "cx": 435,
                    "cy": 100,
                    "imgUrl": "image_index_5", //스피커 이미지
                    "imgScale": 0.9
                }
            }],
            "soundInfo": {
                "url": "sound_index_2"
            }
        }],
        "wordChain": [{ // 첫번째 끝말잇기 단어 부분
            "text": "새우",
            "cx": 120, //텍스트와 박스의 x위치
            "cy": 255, //텍스트와 박스의 y위치
            "classNum": "000", //텍스트 색상 번호
            "focusClassNum": "000", //정답 시 낱자에 포커스 될 색상 번호
            "fontSize": 50, // 텍스트 사이즈
            "boxWidth": 70, // 박스 한개의 너비
            "boxHeight": 70, // 박스 한개의 높이
            "boxR": 10, // 박스의 round 값
            "boxFillClassNum": "14", //박스 채우기 색상 반호
            "boxStrokeClassNum": "117", //박스 선 색상 번호
            "boxStrokeWidth": 1, //박스 선 굵기
            "boxGap": 0, //박스들 사이의 거리
            "boxShadowClassNum": "0006", //박스 그림자 색상
            "focusBoxClassNum": "04" //문제 시작 시 박스에 포커스 될 색상 번호
        }, { // 두번째 끝말잇기 단어 부분
            "text": "우유",
            "cx": 315,
            "cy": 435,
            "classNum": "000",
            "focusClassNum": "000",
            "fontSize": 50,
            "boxWidth": 70,
            "boxHeight": 70,
            "boxR": 10,
            "boxFillClassNum": "14",
            "boxStrokeClassNum": "117",
            "boxStrokeWidth": 1,
            "boxGap": 0,
            "boxShadowClassNum": "0006",
            "focusBoxClassNum": "04"
        }, { // 세번째 끝말잇기 단어 부분
            "text": "유치원",
            "cx": 515,
            "cy": 255,
            "classNum": "000",
            "focusClassNum": "000",
            "fontSize": 50,
            "boxWidth": 70,
            "boxHeight": 70,
            "boxR": 10,
            "boxFillClassNum": "14",
            "boxStrokeClassNum": "117",
            "boxStrokeWidth": 1,
            "boxGap": 0,
            "boxShadowClassNum": "0006"
        }],
        "drag": {
            "hintCount": 0,
            "dragPosition": [{ //드래그해서 넣을 영역의 cx,cy값 배열 ( = 드래그가 놓여질 영역의 cx,cy 좌표, 일치해야 정확히 들어갑니다.)
                "cx": 155,
                "cy": 255
            }, {
                "cx": 350,
                "cy": 435
            }], //(ex 첫번째 문제 드래그 영역 cx:155,cy:255 / 두번째 문제 드래그 영역 cx:350, cy:435)
            "ansIndex": [0, 3], //끝말잇기 순서대로 들어갈 정답 인덱스 배열 (ex 첫번째 문제 정답인덱스:0, 두번째 문제 정답 인덱스:3)
            "element": [ //첫번째 drag 엘리먼트
                [{
                    "type": "rect",
                    "meta": {
                        "cx": 710,
                        "cy": 135,
                        "width": 70,
                        "height": 70,
                        "rXY": 10,
                        "shapeFillClassNum": "14",
                        "shapeStrokeClassNum": "117",
                        "shapeStrokeWidth": 1,
                        "shadowClassNum": "0006"
                    }
                }, {
                    "type": "text",
                    "meta": {
                        "cx": 710,
                        "cy": 135,
                        "text": "우",
                        "classNum": "0032",
                        "fontSize": 50,
                        "bold": true
                    }
                }],
                [{ //두번째 drag 엘리먼트
                    "type": "rect",
                    "meta": {
                        "cx": 710,
                        "cy": 230,
                        "width": 70,
                        "height": 70,
                        "rXY": 10,
                        "shapeFillClassNum": "14",
                        "shapeStrokeClassNum": "117",
                        "shapeStrokeWidth": 1,
                        "shadowClassNum": "0006"
                    }
                }, {
                    "type": "text",
                    "meta": {
                        "cx": 710,
                        "cy": 230,
                        "text": "어",
                        "classNum": "0032",
                        "fontSize": 50,
                        "bold": true
                    }
                }],
                [{ //세번째 drag 엘리먼트
                    "type": "rect",
                    "meta": {
                        "cx": 710,
                        "cy": 325,
                        "width": 70,
                        "height": 70,
                        "rXY": 10,
                        "shapeFillClassNum": "14",
                        "shapeStrokeClassNum": "117",
                        "shapeStrokeWidth": 1,
                        "shadowClassNum": "0006"
                    }
                }, {
                    "type": "text",
                    "meta": {
                        "cx": 710,
                        "cy": 325,
                        "text": "이",
                        "classNum": "0032",
                        "fontSize": 50,
                        "bold": true
                    }
                }],
                [{ //네번째 drag 엘리먼트
                    "type": "rect",
                    "meta": {
                        "cx": 710,
                        "cy": 420,
                        "width": 70,
                        "height": 70,
                        "rXY": 10,
                        "shapeFillClassNum": "14",
                        "shapeStrokeClassNum": "117",
                        "shapeStrokeWidth": 1,
                        "shadowClassNum": "0006"
                    }
                }, {
                    "type": "text",
                    "meta": {
                        "cx": 710,
                        "cy": 420,
                        "text": "유",
                        "classNum": "0032",
                        "fontSize": 50,
                        "bold": true
                    }
                }]
            ]
        }
    }
    ```

> ## KM000041

선택하기(낱말 학습\_연습1,2)

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000041",
        "direction": { //지시문
            "text": "text_index_0", // [필수]
            "classNum": "000",
            "bold": true
        },
        "imageButtons": [ // 누르면 사운드 플레이 요소
            {
                "element": [{
                        "type": "image",
                        "meta": {
                            "cx": 400,
                            "cy": 175,
                            "ImgUrl": "image_index_1", // 비행장
                            "ImgScale": 0.23,
                            "rx": 80
                        }
                    },
                    {
                        "type": "image",
                        "meta": {
                            "cx": 120,
                            "cy": 100,
                            "ImgUrl": "image_index_0", // 스피커
                            "ImgScale": 0.8
                        }
                    }
                ],
                "soundInfo": {
                    "url": "sound_index_0" // 할머니가~
                }
            }
        ],
        "elements": [ // 바탕 요소
            {
                "type": "text",
                "meta": {
                    "cx": 130,
                    "cy": 380,
                    "text": "할머니가",
                    "classNum": "000",
                    "fontSize": 45
                }
            }
        ],
        "lastFeedback": { // 선택 끝난 후 이미지+사운드
            "elements": [ // 화면 요소
                {
                    "type": "image",
                    "meta": {
                        "cx": 400,
                        "cy": 200,
                        "ImgUrl": "image_index_1", //비행장
                        "ImgScale": 0.25,
                        "rx": 80
                    }
                },
                {
                    "type": "text",
                    "meta": {
                        "cx": 400,
                        "cy": 365,
                        "text": "text_index_1", // 할머니가 $option{비행기를} $option{탑니다.}
                        "classNum": "000",
                        "fontSize": 50,
                        "options": [ // 옵션
                            {
                                "type": "color",
                                "classNum": "0002",
                                "bold": true
                            },
                            {
                                "type": "color",
                                "classNum": "0027",
                                "bold": true
                            }
                        ]
                    }
                },
                {
                    "type": "image",
                    "meta": {
                        "cx": 100,
                        "cy": 125,
                        "ImgUrl": "image_index_0", // 스피커
                        "ImgScale": 0.8
                    }
                }
            ],
            "soundInfo": {
                "url": "sound_index_0" // 할머니가~
            }
        },
        "choice": [ // 선택지 2개 배열로
            { // 첫 번째 선택지 정보
                "hintCount": 0,
                "elements": [
                    [ // 첫 번째 선택지의 첫 번째 보기
                        {
                            "type": "rect",
                            "meta": {
                                "cx": 360,
                                "cy": 330,
                                "width": 240,
                                "height": 80,
                                "rXY": 10,
                                "shapeFillClassNum": "14",
                                "shapeStrokeClassNum": "117",
                                "shapeStrokeWidth": 1
                            }
                        },
                        {
                            "type": "text",
                            "meta": {
                                "cx": 360,
                                "cy": 330,
                                "text": "자동차를",
                                "classNum": "000",
                                "fontSize": 45
                            }
                        }
                    ],
                    [ //  첫 번째 선택지의 두 번째 보기
                        {
                            "type": "rect",
                            "meta": {
                                "cx": 360,
                                "cy": 430,
                                "width": 240,
                                "height": 80,
                                "rXY": 10,
                                "shapeFillClassNum": "14",
                                "shapeStrokeClassNum": "117",
                                "shapeStrokeWidth": 1
                            }
                        },
                        {
                            "type": "text",
                            "meta": {
                                "cx": 360,
                                "cy": 430,
                                "text": "비행기를",
                                "classNum": "000",
                                "fontSize": 45
                            }
                        }
                    ]
                ],
                "ansIndex": 1 //정답 인덱스
            },
            { // 두 번째 선택지 정보
                "hintCount": 0,
                "elements": [
                    [ //두 번째 선택지의 첫 번째 보기
                        {
                            "type": "rect",
                            "meta": {
                                "cx": 630,
                                "cy": 330,
                                "width": 240,
                                "height": 80,
                                "rXY": 10,
                                "shapeFillClassNum": "14",
                                "shapeStrokeClassNum": "117",
                                "shapeStrokeWidth": 1
                            }
                        },
                        {
                            "type": "text",
                            "meta": {
                                "cx": 630,
                                "cy": 330,
                                "text": "탑니다.",
                                "classNum": "000",
                                "fontSize": 45
                            }
                        }
                    ],
                    [ // 두 번째 선택지의 두 번째 보기
                        {
                            "type": "rect",
                            "meta": {
                                "cx": 630,
                                "cy": 430,
                                "width": 240,
                                "height": 80,
                                "rXY": 10,
                                "shapeFillClassNum": "14",
                                "shapeStrokeClassNum": "117",
                                "shapeStrokeWidth": 1
                            }
                        },
                        {
                            "type": "text",
                            "meta": {
                                "cx": 630,
                                "cy": 430,
                                "text": "닫습니다.",
                                "classNum": "000",
                                "fontSize": 45
                            }
                        }
                    ]
                ],
                "ansIndex": 0, //정답 인덱스
                "inactiveAttr": { // [선택] 비활성 일 때 보기 설정
                    "classNum": "0028", // 텍스트 색 (기본 0028)
                    "shapeFillClassNum": "14" // 버튼 바탕색 (기본 14)
                }
            }
        ]
    }
    ```

> ## KM000042

drag(낱말 학습)

-   ### 기본 포맷
    ```javascript
    {
        "questionType": "KM000042",
        "direction": { //지시문
            "x": 80,
            "y": 45,
            "text": "text_index_0",
            "classNum": "000",
            "fontSize": 25,
            "dy": 45,
            "bold": true,
            "speakerX": 40,
            "speakerY": 25
        },
        "elements": [{ //반응 없이 배경처럼 들어갈 엘리먼트
            "type": "rect", //drag 엘리먼트들 아래의 rect
            "meta": {
                "cx": 400,
                "cy": 180,
                "width": 470,
                "height": 200,
                "rXY": 10,
                "shapeFillClassNum": "0039",
                "shapeStrokeClassNum": "no",
                "shapeStrokeWidth": 1
            }
        }, {
            "type": "rect", //drag 엘리먼트가 들어갈 영역의 rect
            "meta": {
                "cx": 420,
                "cy": 385,
                "width": 150,
                "height": 75,
                "rXY": 10,
                "shapeFillClassNum": "0028",
                "shapeStrokeClassNum": "no",
                "shapeStrokeWidth": 1,
                "shadowClassNum": "0008"
            }
        }, {
            "type": "text", //drag 엘리먼트가 들어갈 영역옆의 text
            "meta": {
                "cx": 605,
                "cy": 385,
                "text": "가 납니다.",
                "classNum": "000",
                "fontSize": 45
            }
        }],
        "imageButtons": [{ //이미지 버튼
            "element": [{
                "type": "image", //나비 이미지
                "meta": {
                    "cx": 205,
                    "cy": 385,
                    "imgUrl": "image_index_0",
                    "imgScale": 0.4
                }
            }, {
                "type": "image", //스피커 이미지
                "meta": {
                    "cx": 90,
                    "cy": 320,
                    "imgUrl": "image_index_1",
                    "imgScale": 0.9
                }
            }],
            "soundInfo": {
                "url": "sound_index_0"
            }
        }],
        "drag": {
            "hintCount": 0, //힌트 수
            "dragPosition": [{ //드래그해서 넣을 영역의 cx,cy값 배열 ( = 드래그가 놓여질 영역의 cx,cy 좌표, 일치해야 정확히 들어갑니다.)
                "cx": 420,
                "cy": 385
            }],
            "ansIndex": [0], //정답 인덱스 배열
            "element": [ //drag 엘리먼트
                [{ //첫번째 drag 엘리먼트(나비)
                    "type": "rect",
                    "meta": {
                        "cx": 295,
                        "cy": 130,
                        "width": 150,
                        "height": 75,
                        "rXY": 10,
                        "shapeFillClassNum": "14",
                        "shapeStrokeClassNum": "117",
                        "shapeStrokeWidth": 1,
                        "shadowClassNum": "0006"
                    }
                }, {
                    "type": "text",
                    "meta": {
                        "cx": 295,
                        "cy": 130,
                        "text": "나비",
                        "classNum": "000",
                        "fontSize": 45
                    }
                }],
                [{  //두번째 drag 엘리먼트(뜁니다)
                    "type": "rect",
                    "meta": {
                        "cx": 505,
                        "cy": 130,
                        "width": 150,
                        "height": 75,
                        "rXY": 10,
                        "shapeFillClassNum": "14",
                        "shapeStrokeClassNum": "117",
                        "shapeStrokeWidth": 1,
                        "shadowClassNum": "0006"
                    }
                }, {
                    "type": "text",
                    "meta": {
                        "cx": 505,
                        "cy": 130,
                        "text": "뜁니다",
                        "classNum": "000",
                        "fontSize": 45
                    }
                }],
                [{  //첫번째 drag 엘리먼트(사과)
                    "type": "rect",
                    "meta": {
                        "cx": 295,
                        "cy": 225,
                        "width": 150,
                        "height": 75,
                        "rXY": 10,
                        "shapeFillClassNum": "14",
                        "shapeStrokeClassNum": "117",
                        "shapeStrokeWidth": 1,
                        "shadowClassNum": "0006"
                    }
                }, {
                    "type": "text",
                    "meta": {
                        "cx": 295,
                        "cy": 225,
                        "text": "사과",
                        "classNum": "000",
                        "fontSize": 45
                    }
                }],
                [{  //첫번째 drag 엘리먼트(다람쥐)
                    "type": "rect",
                    "meta": {
                        "cx": 505,
                        "cy": 225,
                        "width": 150,
                        "height": 75,
                        "rXY": 10,
                        "shapeFillClassNum": "14",
                        "shapeStrokeClassNum": "117",
                        "shapeStrokeWidth": 1,
                        "shadowClassNum": "0006"
                    }
                }, {
                    "type": "text",
                    "meta": {
                        "cx": 505,
                        "cy": 225,
                        "text": "다람쥐",
                        "classNum": "000",
                        "fontSize": 45
                    }
                }]
            ],
            "fbInfo": { //정답 시 stroke feedback이 나타날 때 rect의 round 정도
                "rx": 10,
                "ry": 10
            }
        },
        "lastFeedback": { //마지막 피드백 화면 시 나타날 엘리먼트
            "elements": [{
                "type": "image", // 나비 이미지
                "meta": {
                    "cx": 400,
                    "cy": 240,
                    "ImgUrl": "image_index_0",
                    "ImgScale": 0.45
                }
            }, {
                "type": "text", // 텍스트(나비가 납니다.)
                "meta": {
                    "cx": 400,
                    "cy": 410,
                    "text": "text_index_1",
                    "classNum": "000",
                    "fontSize": 55,
                    "options": [{
                        "type": "color",
                        "classNum": "0018",
                        "bold": true
                    }],
                    "bold":true
                }
            }, {
                "type": "image", // 스피커 이미지
                "meta": {
                    "cx": 270,
                    "cy": 165,
                    "ImgUrl": "image_index_1",
                    "ImgScale": 1
                }
            }],
            "soundInfo": { //피드백 시 재생 될 사운드
                "url": "sound_index_0"
            }
        }
    }
    ```

> ## KM000043

match(문장학습\_연습)

-   ### 기본 포맷

            ```javascript
            {
                "questionType": "KM000043",
                "direction": { //지시문
                    "x": 80,
                    "y": 45,
                    "text": "text_index_0",
                    "classNum": "000",
                    "fontSize": 25,
                    "dy": 45,
                    "bold": true,
                    "speakerX": 40,
                    "speakerY": 25
                },
                "connect": [{ //연결하기 엘리먼트
                    "element": [{ //첫번째 연결 엘리먼트
                        "createElement": [{
                            "type": "image",
                            "meta": {
                                "cx": 125,
                                "cy": 270,
                                "ImgUrl": "image_index_0",
                                "ImgScale": 0.7
                            }
                        }],
                        "connectDotOffsets": { //연결 점 offset
                            "x": 10,
                            "y": 0
                        }
                    }]
                }, {
                    "element": [{ //두번째 연결 엘리먼트
                        "createElement": [{
                            "type": "rect",
                            "meta": {
                                "cx": 400,
                                "cy": 150,
                                "width": 180,
                                "height": 60,
                                "rXY": 10,
                                "shapeFillClassNum": "14",
                                "shapeStrokeClassNum": "no",
                                "shapeStrokeWidth": 1,
                                "shadowClassNum": "0006"
                            }
                        }, {
                            "type": "text",
                            "meta": {
                                "cx": 400,
                                "cy": 150,
                                "text": "text_index_1", //라면이
                                "classNum": "001",
                                "fontSize": 28,
                                "dy": 45,
                                "bold": false,
                                "center": true
                            }
                        }],
                        "connectDotOffsets": { //연결 점 offset
                            "x": -10,
                            "y": 0
                        },
                        "isAns": true //정답 여부(boolean)
                    }, {
                        "createElement": [{
                            "type": "rect",
                            "meta": {
                                "cx": 400,
                                "cy": 390,
                                "width": 180,
                                "height": 60,
                                "rXY": 10,
                                "shapeFillClassNum": "14",
                                "shapeStrokeClassNum": "no",
                                "shapeStrokeWidth": 1,
                                "shadowClassNum": "0006"
                            }
                        }, {
                            "type": "text",
                            "meta": {
                                "cx": 400,
                                "cy": 390,
                                "text": "text_index_2", //아이스크림이
                                "classNum": "001",
                                "fontSize": 28,
                                "dy": 45,
                                "bold": false,
                                "center": true
                            }
                        }],
                        "connectDotOffsets": { //연결 점 offset
                            "x": -10,
                            "y": 0
                        },
                        "isAns": false //정답 여부(boolean)
                    }],
                    "dotSize": 3, //연결 점 사이즈 (첫번째 연결하기 모든(왼쪽,오른쪽) 점)
                    "lineClassNum": "04" //연결 시 선 색상 번호
                }, {
                    "element": [{ //세번째 연결 엘리먼트
                        "createElement": [{
                            "type": "rect",
                            "meta": {
                                "cx": 680,
                                "cy": 150,
                                "width": 180,
                                "height": 60,
                                "rXY": 10,
                                "shapeFillClassNum": "14",
                                "shapeStrokeClassNum": "no",
                                "shapeStrokeWidth": 1,
                                "shadowClassNum": "0006"
                            }
                        }, {
                            "type": "text",
                            "meta": {
                                "cx": 680,
                                "cy": 150,
                                "text": "text_index_3", //차갑습니다.
                                "classNum": "001",
                                "fontSize": 28,
                                "dy": 45,
                                "bold": false,
                                "center": true
                            }
                        }],
                        "connectDotOffsets": {  //연결 점 offset
                            "x": -10,
                            "y": 0
                        },
                        "isAns": false //정답 여부(boolean)
                    }, {
                        "createElement": [{
                            "type": "rect",
                            "meta": {
                                "cx": 680,
                                "cy": 390,
                                "width": 180,
                                "height": 60,
                                "rXY": 10,
                                "shapeFillClassNum": "14",
                                "shapeStrokeClassNum": "no",
                                "shapeStrokeWidth": 1,
                                "shadowClassNum": "0006"
                            }
                        }, {
                            "type": "text",
                            "meta": {
                                "cx": 680,
                                "cy": 390,
                                "text": "text_index_4", //뜨겁습니다.
                                "classNum": "001",
                                "fontSize": 28,
                                "dy": 45,
                                "bold": false,
                                "center": true
                            }
                        }],
                        "connectDotOffsets": { //연결 점 offset
                            "x": -10,
                            "y": 0
                        },
                        "isAns": true //정답 여부(boolean)
                    }],
                    "dotSize": 3, //연결 점 사이즈 (두번째 연결하기 모든(왼쪽,오른쪽) 점)
                    "lineClassNum": "04"  //연결 시 선 색상 번호
                }],
                "lastFeedback": { //마지막 피드백 화면 시 나타날 엘리먼트
                    "elements": [{
                        "type": "image", // 라면먹는 사람 이미지
                        "meta": {
                            "cx": 400,
                            "cy": 240,
                            "ImgUrl": "image_index_0",
                            "ImgScale": 0.9
                        }
                    }, {
                        "type": "text", // 텍스트(라면이 뜨겁습니다.)
                        "meta": {
                            "cx": 400,
                            "cy": 410,
                            "text": "text_index_5",
                            "classNum": "000",
                            "fontSize": 55,
                            "options": [{
                                "type": "color",
                                "classNum": "0018",
                                "bold": true
                            }],
                            "bold": true
                        }
                    }, {
                        "type": "image", // 스피커 이미지
                        "meta": {
                            "cx": 260,
                            "cy": 145,
                            "ImgUrl": "image_index_1",
                            "ImgScale": 1
                        }
                    }],
                    "soundInfo": { //피드백 시 재생 될 사운드
                        "url": "sound_index_0"
                    }
                }
            }
            ```

    > ## KM000044

        Drag (받침 학습)

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000044",
        "direction": { // 지시문
            "x": 80,
            "y": 45,
            "text": "text_index_0",
            "classNum": "000",
            "fontSize": 25,
            "dy": 40,
            "bold": true,
            "speakerX": 40,
            "speakerY": 25,
            "options": [
            {
                "type": "box",
                "classNum": "01",
                "boxText": "?",
                "boxTextClass": "91",
                "boxTextScale": 0.8,
                "bold": false
            }
            ]
        },
        "elements": [ // 배경에 들어갈 엘리먼트(ex. 기차 이미지)
            {
            "type": "image",
            "meta": {
                "cx": 400,
                "cy": 200,
                "imgUrl": "image_index_0",
                "imgScale": 0.3
            }
            }
        ],
        "drag": { // 드래그
            "hintCount": 0, // 힌트 횟수
            "ansIndex": [0, 1, 2], // drag 엘리먼트 중 정답의 인덱스
            "element": [ // 드래그할 요소
            [ // 첫 번째 요소
                {
                "type": "text",
                "meta": {
                    "cx": 200,
                    "cy": 230,
                    "text": "ㅁ",
                    "classNum": "000",
                    "fontSize": 45
                }
                }
            ],
            [ // 두 번째 요소
                {
                "type": "text",
                "meta": {
                    "cx": 335,
                    "cy": 230,
                    "text": "ㅜ",
                    "classNum": "000",
                    "fontSize": 45
                }
                }
            ],
            [ // 세 번째 요소
                {
                "type": "text",
                "meta": {
                    "cx": 470,
                    "cy": 230,
                    "text": "ㄴ",
                    "classNum": "000",
                    "fontSize": 45
                }
                }
            ]
            ],
            "areaEl": [ // 드래그해서 넣을 영역 (rect로 그려짐)
            {
                "cx": 400,
                "cy": 350,
                "width": 135,
                "height": 45,
                "rXY": 10,
                "shapeFillClassNum": "no",
                "shapeStrokeClassNum": "078",
                "shapeStrokeWidth": 1
            },
            {
                "cx": 400,
                "cy": 395,
                "width": 135,
                "height": 45,
                "rXY": 10,
                "shapeFillClassNum": "no",
                "shapeStrokeClassNum": "078",
                "shapeStrokeWidth": 1
            },
            {
                "cx": 400,
                "cy": 440,
                "width": 135,
                "height": 45,
                "rXY": 10,
                "shapeFillClassNum": "no",
                "shapeStrokeClassNum": "078",
                "shapeStrokeWidth": 1
            }
            ],
            "dragPosition": [   // [선택] 드래그 포지션 따로 지정해야할 때 사용 (없으면 areaEl의 cx, cy로 들어감)
                {
                    "cx": 420,
                    "cy": 385
                },
                {
                    "cx": 420,
                    "cy": 385
                },
                {
                    "cx": 420,
                    "cy": 385
                }
            ]
        },
        "lastFeedback": {  // 드래그 끝난 후 활동 관련
            "removeEl": [ // 드래그 완료되었을 때 지워질 element (ex. 기차 이미지 안의 물음표)
            { // 첫 번째 요소 (기차 이미지 안의 물음표)
                "type": "text",
                "meta": {
                "cx": 600,
                "cy": 220,
                "text": "?",
                "classNum": "0002",
                "fontSize": 45
                }
            }
            ],
            "element": [ // 드래그 완료되었을 때 제공되어야 할 element (ex. 기차 이미지 안의 "문")
            { // 첫 번째 요소 (기차 이미지 안의 "문")
                "type": "text",
                "meta": {
                "cx": 600,
                "cy": 220,
                "text": "문",
                "classNum": "0002",
                "fontSize": 45
                }
            },
            { // 두 번째 요소
                "type": "rect",
                "meta": {
                "cx": 400,
                "cy": 395,
                "width": 135,
                "height": 135,
                "rXY": 10,
                "shapeFillClassNum": "0040",
                "shapeStrokeClassNum": "078",
                "shapeStrokeWidth": 1
                }
            },
             { // 세 번째 요소
                "type": "text",
                "meta": {
                "cx": 400,
                "cy": 395,
                "text": "문",
                "classNum": "0002",
                "fontSize": 45
                }
            },
            ],
            "holdTime": 500 // 마지막 화면 제시되고 문항 종료될 때까지 시간 (기본값은 300)
        }
    }
    ```

> ## KM000045

선택하기(심화유형1)

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000045",
        "direction": { //지시문
            "x": 80,
            "y": 45,
            "text": "text_index_0",
            "classNum": "000",
            "fontSize": 25,
            "dy": 40,
            "bold": true,
            "speakerX": 40,
            "speakerY": 25
        },
        "choice": {
            "hintCount": 1,
            "elements": [
                [ //첫번째 선택지
                    {
                    "type": "rect",
                    "meta": {
                        "cx": 600,
                        "cy": 295,
                        "width": 330,
                        "height": 85,
                        "rXY": 10,
                        "shapeFillClassNum": "14",
                        "shapeStrokeClassNum": "117",
                        "shapeStrokeWidth": 1
                    }
                    },
                    {
                    "type": "text",
                    "meta": {
                        "cx": 600,
                        "cy": 295,
                        "text": "상자가 가볍습니다.",
                        "classNum": "000",
                        "fontSize": 35
                    }
                    }
                ],
                [ //두번째 선택지
                    {
                    "type": "rect",
                    "meta": {
                        "cx": 600,
                        "cy": 410,
                        "width": 330,
                        "height": 85,
                        "rXY": 10,
                        "shapeFillClassNum": "14",
                        "shapeStrokeClassNum": "117",
                        "shapeStrokeWidth": 1
                    }
                    },
                    {
                    "type": "text",
                    "meta": {
                        "cx": 600,
                        "cy": 410,
                        "text": "상자가 무겁습니다.",
                        "classNum": "000",
                        "fontSize": 35
                    }
                    }
                ]
            ],
            "ansIndex": 1 //정답 인덱스(다중일 때 배열로)
        },
        "elements": [ //배경에 들어갈 엘리먼트(정적인 엘리먼트)
            {
                "type": "image",
                "meta": {
                "cx": 195,
                "cy": 355,
                "ImgUrl": "image_index_0", // 아이들 이미지
                "ImgScale": 0.7
                }
            },
            {
                "type": "image",
                "meta": {
                "cx": 400,
                "cy": 355,
                "ImgUrl": "image_index_1", //화살표
                "ImgScale": 0.2
                }
                },
            { //왼쪽 렉트
                "type": "rect",
                "meta": {
                "cx": 200,
                "cy": 170,
                "width": 300,
                "height": 65,
                "rXY": 10,
                "shapeFillClassNum": "096",
                "shapeStrokeClassNum": "0001",
                "shapeStrokeWidth": "0"
                }
            },
            { //왼쪽 텍스트
                "type": "text",
                "meta": {
                "cx": 200,
                "cy": 170,
                "text": "먼저 일어난 일",
                "classNum": "000",
                "fontSize": 35
                }
            },
            { //오른쪽 렉트
                "type": "rect",
                "meta": {
                "cx": 600,
                "cy": 170,
                "width": 300,
                "height": 65,
                "rXY": 10,
                "shapeFillClassNum": "007",
                "shapeStrokeClassNum": "0001",
                "shapeStrokeWidth": "0"
                }
            },
            { // 오른쪽 텍스트
                "type": "text",
                "meta": {
                "cx": 600,
                "cy": 170,
                "text": "나중에 일어난 일",
                "classNum": "000",
                "fontSize": 35
                }
            }
        ]
    }
    ```

    ```

    ```

> ## KM000046

    choose 유형

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000046",
        "direction": {
            "text": "text_index_0",
            "classNum": "000",
            "bold": true,
        },
        "elements": [
            {
            "type": "image",
            "meta": {
                "cx": 160,
                "cy": 200,
                "ImgUrl": "image_index_0",
                "ImgScale": 1
                }
            },
            {
            "type": "image",
            "meta": {
                "cx": 400,
                "cy": 200,
                "ImgUrl": "image_index_1",
                "ImgScale": 1
                }
            },
            {
            "type": "image",
            "meta": {
                "cx": 640,
                "cy": 200,
                "ImgUrl": "image_index_2",
                "ImgScale": 1
                }
            }
        ],
        "okButton": {
            "type": 0,
        },
        "toggleImages": { // 토글 이미지
            "urls": {
                "active": "image_index_3", // 선택 했을 때 이미지(활성화)
                "inactive": "image_index_4" // 선택 안했을 때 이미지(비활성화)
            },
            "cx": 400,
            "cy": 350,
            "scale": 0.25, // 이미지 스케일
            "offset": { // 이미지 간격
                "x": 110,
                "y": 0
            },
            "count": 5 // 이미지 개수
        }
    }
    ```

> ## KM000047

    쓰기 (낱자 학습)

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000047",
        "direction": { //지시문
            "x": 80,
            "y": 45,
            "text": "text_index_0",
            "classNum": "000",
            "fontSize": 25,
            "dy": 45,
            "bold": true,
            "speakerX": 40,
            "speakerY": 25
        },
        "elements": [{ //퍼즐 이미지
            "type": "image",
            "meta": {
                "cx": 150,
                "cy": 260,
                "ImgUrl": "image_index_0",
                "ImgScale": 1.5
            }
        }, {
            "type": "text",
            "meta": {
                "cx": 140,
                "cy": 240,
                "text": "비",
                "classNum": "000",
                "fontSize": 65,
                "bold": true
            }
        }, { //퍼즐 이미지
            "type": "image",
            "meta": {
                "cx": 277,
                "cy": 243,
                "ImgUrl": "image_index_1",
                "ImgScale": 1.5
            }
        }, {
            "type": "text",
            "meta": {
                "cx": 290,
                "cy": 240,
                "text": "ㅅ",
                "classNum": "000",
                "fontSize": 65,
                "bold": true
            }
        }],
        "handWriteValue": {
            "x": 435,
            "y": 105,
            "width": 280,
            "height": 280,
            "drawClassNum": "0005",
            "boxFillClassNum": "14",
            "boxStrokeClassNum": "no",
            "boxOpacity": 1,
            "okButton": {
                "cx": 755,
                "cy": 430
            },
            "answer": "빗",
            "sound": {
                "url": "sound_index_0"
            },
            "undoButton": {
                "x": 730,
                "y": 315,
                "scale": 1
            },
            "resetButton": {
                "x": 730,
                "y": 355,
                "scale": 1
            }
        }
    }
    ```

> ## KM000048

    선택하기(문장학습연습_Choose5: 도형이 포함된 문장에서 낱말 고르기(한 문장&빈칸여러개))

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000048",
        "direction": {
            "text": "text_index_0",
            "classNum": "000",
            "bold": true
        },
        "elements": [ // 배경 요소
            {
                "type": "image",
                "meta": {
                    "cx": 400,
                    "cy": 160,
                    "ImgUrl": "image_index_0", // 아빠
                    "ImgScale": 0.4
                }
            }
        ],
        "choice": [ //선택지
            { // 첫 번째 선택지 정보
                "hintCount": 1,  // 힌트유무 (0 없음, 1 있음)
                "ansIndex": 1, // 정답 인덱스
                "bgRect": { //보기아래 깔리는 렉트 정보
                    "type": "rect",
                    "meta": {
                        "cx": 400, //[필수]
                        "cy": 430 //[필수]
                    }
                },
                "elements": [ // 보기 텍스트
                    { // 첫 번째 보기
                        "type": "text",
                        "meta": {
                            "cx": 140, //[필수]
                            "cy": 430, //[필수]
                            "text": "가방" //[필수]
                        }
                    },
                    { // 두 번째 보기
                        "type": "text",
                        "meta": {
                            "cx": 300,
                            "cy": 430,
                            "text": "구두"
                        }
                    },
                    { // 세 번째 보기
                        "type": "text",
                        "meta": {
                            "cx": 460,
                            "cy": 430,
                            "text": "큽니다"
                        }
                    },
                    { // 네 번째 보기
                        "type": "text",
                        "meta": {
                            "cx": 640,
                            "cy": 430,
                            "text": "작습니다"
                        }
                    }
                ]
            },
            { // 두 번째 선택지 정보
                "hintCount": 0,
                "ansIndex": 2,
                "bgRect": {
                    "type": "rect",
                    "meta": {
                        "cx": 400,
                        "cy": 430
                    }
                },
                "elements": [{
                        "type": "text",
                        "meta": {
                            "cx": 140,
                            "cy": 430,
                            "text": "가방"
                        }
                    },
                    {
                        "type": "text",
                        "meta": {
                            "cx": 300,
                            "cy": 430,
                            "text": "구두"
                        }
                    },
                    {
                        "type": "text",
                        "meta": {
                            "cx": 460,
                            "cy": 430,
                            "text": "큽니다",
                            "claaNum": "null"
                        }
                    },
                    {
                        "type": "text",
                        "meta": {
                            "cx": 640,
                            "cy": 430,
                            "text": "작습니다"
                        }
                    }
                ]
            }
        ],
        "choiceCommon": { // 선택지  메타 공통 사항
            "bgRect": { // 보기아래 깔리는 렉트(초이스 객체에서 설정한 것이 1순위, 없으면 이 곳의 정보 사용)
                "width": 750, //[필수]
                "height": 80, //[필수]
                "rxy": 5,
                "shapeFillClassNum": "0040"
            },
            "elements": { // 보기 텍스트 (초이스 객체에서 설정한 것이 1순위, 없으면 이 곳의 정보 사용)
                "classNum": "000", //텍스트 색
                "fontSize": 30 //텍스트 크기
            }
        },
        "sentenseBlanks": { // 빈칸 포함한 텍스트
            "x": 60, // 텍스트 시작 위치 x
            "y": 300, // 텍스트 시작 위치 y
            "dy": 50,
            "text": "text_index_1",
            "fontSize": 40,
            "classNum": "000",
            "textFocusNum": "0002", // 도형 내부 텍스트 색
            "focusNum": "0001", // 도형 테두리 색
            "option": [ //텍스트의 $shape{} 부분 정보
                {
                    "type": "rect", // 도형종류
                    "blankI": [ //도형에서 빈칸의 인덱스 [시작, 끝]
                        0,
                        1
                    ],
                    "meta": { //도형 정보
                        "width": 80, //[rect]
                        "height": 80, //[rect]
                        "shapeFillClassNum": "14",
                        "shapeStrokeClassNum": "117",
                        "shapeStrokeWidth": 1,
                        "rXY": "5", //[rect]
                        "shadowClassNum": "0006"
                    }
                },
                {
                    "type": "circle",
                    "blankI": [],
                    "meta": {
                        "r": 40, //[circle]
                        "shapeFillClassNum": "14",
                        "shapeStrokeClassNum": "117",
                        "shapeStrokeWidth": 1,
                        "shadowClassNum": "0006"
                    }
                },
                {
                    "type": "rect",
                    "blankI": [
                        0,
                        2
                    ],
                    "meta": {
                        "width": 80,
                        "height": 80,
                        "shapeFillClassNum": "14",
                        "shapeStrokeClassNum": "117",
                        "shapeStrokeWidth": 1,
                        "rXY": "5",
                        "shadowClassNum": "0006"
                    }
                }
            ]
        },
        "lastFeedback": { // 선택지 종료 후 사운드
            "soundInfo": {
                "url": "sound_index_0"
            },
            "elements": [{
                "type": "image",
                "meta": {
                    "cx": 70,
                    "cy": 260,
                    "ImgUrl": "image_index_1", // 스피커 아이콘
                    "ImgScale": 0.8
                }
            }]
        }
    }
    ```

> ## KM000049

    선택하기(심화유형2)

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000049",
        "scrollArea": { // [선택] 스크롤 영역
            "x": 40,
            "y": 80,
            "x2": 760,
            "y2": 330,
            "fillClassNum": "0013" //스크롤 영역 배경색
        },
        "elements": [ //바탕 요소
            {
                "type": "image",
                "meta": {
                    "cx": 275,
                    "cy": 255,
                    "ImgUrl": "image_index_4", //화살표
                    "ImgScale": 0.5,
                    "rotate": 225
                }
            },
            {
                "type": "image",
                "meta": {
                    "cx": 525,
                    "cy": 255,
                    "ImgUrl": "image_index_4", //화살표
                    "ImgScale": 0.5,
                    "rotate": 225
                }
            },
            {
                "type": "text",
                "meta": {
                    "cx": 400,
                    "cy": 130,
                    "text": "text_index_2", //오늘은 일요일~
                    "classNum": "000",
                    "fontSize": 30,
                    "dy": 45,
                    "textLength": 600
                }
            }
        ],
        "direction": { //지시문
            "text": "text_index_0",
            "dy": 45,
            "bold": true
        },
        "choice": [ //선택지 정보 배열로
            { //첫 번째 선택지 정보
                "hintCount": 0,
                "elements": [
                    [ //첫 번째 선택지의 첫 번째 보기
                        {
                            "type": "image",
                            "meta": {
                                "cx": 150,
                                "cy": 410,
                                "ImgUrl": "image_index_1",
                                "ImgScale": 0.25,
                                "rx": 30
                            }
                        }
                    ],
                    [ //첫 번째 선택지의 두 번째 보기
                        {
                            "type": "image",
                            "meta": {
                                "cx": 400,
                                "cy": 410,
                                "ImgUrl": "image_index_2",
                                "ImgScale": 0.25,
                                "rx": 30
                            }
                        }
                    ],
                    [ //첫 번째 선택지의 세 번째 보기
                        {
                            "type": "image",
                            "meta": {
                                "cx": 650,
                                "cy": 410,
                                "ImgUrl": "image_index_3",
                                "ImgScale": 0.25,
                                "rx": 30
                            }
                        }
                    ]
                ],
                "ansIndex": 0, // 정답인덱스
                "shadow": { // 보기의 버튼 설정
                    "classNum": [ // 그림자 색깔
                        "0008",
                        "0008",
                        "0008"
                    ],
                    "rXY": [ // 테두리 라운드
                        8,
                        8,
                        8
                    ]
                }
            },
            { //두 번째 선택지 정보
                "hintCount": 1,
                "elements": [
                    [ // 두 번째 선택지의 첫 번째 보기
                        {
                            "type": "image",
                            "meta": {
                                "cx": 250,
                                "cy": 410,
                                "ImgUrl": "image_index_2",
                                "ImgScale": 0.25,
                                "rx": 30
                            }
                        }
                    ],
                    [ // 두 번째 선택지의 두 번째 보기
                        {
                            "type": "image",
                            "meta": {
                                "cx": 550,
                                "cy": 410,
                                "ImgUrl": "image_index_3",
                                "ImgScale": 0.25,
                                "rx": 30
                            }
                        }
                    ]
                ],
                "ansIndex": 1,
                "shadow": {
                    "classNum": [
                        "0008",
                        "0008"
                    ],
                    "rXY": [
                        8,
                        8
                    ]
                }
            }
        ],
        "stepElements": [ // 일어난 일 이미지들(물음표 이미지 포함)
            [ //첫 번째 이미지 (자고있는 아이)
                {
                    "type": "image",
                    "meta": {
                        "cx": 150,
                        "cy": 250,
                        "ImgUrl": "image_index_0",
                        "ImgScale": 0.25,
                        "rx": 30,
                        "ry": 30
                    }
                }
            ],
            [ //두 번째 렉트+물음표
                {
                    "type": "rect",
                    "meta": {
                        "cx": 400,
                        "cy": 250,
                        "width": 133,
                        "height": 133,
                        "rXY": 10,
                        "shapeFillClassNum": "14",
                        "shapeStrokeClassNum": "0014",
                        "shapeStrokeWidth": 3
                    },
                    "isQ": true // 문제이면 true
                },
                {
                    "type": "text",
                    "meta": {
                        "cx": 400,
                        "cy": 250,
                        "text": "?",
                        "classNum": "000",
                        "fontSize": 80,
                        "dy": 45
                    }
                }
            ],
            [ //세 번째 렉트+물음표
                {
                    "type": "rect",
                    "meta": {
                        "cx": 650,
                        "cy": 250,
                        "width": 133,
                        "height": 133,
                        "rXY": 10,
                        "shapeFillClassNum": "14",
                        "shapeStrokeClassNum": "0014",
                        "shapeStrokeWidth": 3
                    },
                    "isQ": true
                },
                {
                    "type": "text",
                    "meta": {
                        "cx": 650,
                        "cy": 250,
                        "text": "?",
                        "classNum": "000",
                        "fontSize": 80,
                        "dy": 45
                    }
                }
            ]
        ]
    }
    ```

> ## KM000050

    Order

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000050",
        "direction": { // 지시문
            "text": "text_index_0",
            "classNum": "000",
            "bold": true
        },
        "elements": [ // 반응 없는 엘리먼트, 상단 이미지 or 텍스트 등
            { // 첫 번재 엘리먼트
                "type": "image",
                "meta": {
                    "cx": 130,
                    "cy": 130,
                    "ImgUrl": "image_index_0",
                    "ImgScale": 0.43
                }
            }, { // 두 번재 엘리먼트
                "type": "image",
                "meta": {
                    "cx": 310,
                    "cy": 130,
                    "ImgUrl": "image_index_1",
                    "ImgScale": 0.43
                }
            }
        ],
        "order": { // 순서
            "type": "v", // 세로로 움직이는 타입일 경우 "v", 가로로 움직이는 타입일 경우 "h"
            "ans": [1, 3, 2, 0], // 정답 인덱스 순서: dragEl의 index를 순서대로 배열로 작성
            "numbering": [ // 앞에 순서 나타내는 rect와 숫자
                [ // 첫 번째 (숫자 1과 배경 rect)
                    {
                        "type": "rect",
                        "meta": {
                            "cx": 190,
                            "cy": 230,
                            "width": 50,
                            "height": 50,
                            "rXY": 10,
                            "shapeFillClassNum": "14",
                            "shapeStrokeClassNum": "117",
                            "shapeStrokeWidth": 1
                        }
                    }, {
                        "type": "text",
                        "meta": {
                            "cx": 190,
                            "cy": 230,
                            "text": "1",
                            "classNum": "0006",
                            "fontSize": 25
                        }
                    }
                ],
                [  // 두 번째 (숫자 2와 배경 rect)
                    {
                        "type": "rect",
                        "meta": {
                            "cx": 190,
                            "cy": 300,
                            "width": 50,
                            "height": 50,
                            "rXY": 10,
                            "shapeFillClassNum": "14",
                            "shapeStrokeClassNum": "117",
                            "shapeStrokeWidth": 1
                        }
                    }, {
                        "type": "text",
                        "meta": {
                            "cx": 190,
                            "cy": 300,
                            "text": "2",
                            "classNum": "0006",
                            "fontSize": 25
                        }
                    }
                ]
            ],
            "dragEl": [ // 드래그할 요소
                { // 첫 번째 요소
                    "elements": [ // 첫 번째 요소의 엘리먼트 (배경 rect와 text)
                        {
                            "type": "rect",
                            "meta": {
                                "cx": 435,
                                "cy": 230,
                                "width": 400,
                                "height": 50,
                                "rXY": 10,
                                "shapeFillClassNum": "14",
                                "shapeStrokeClassNum": "117",
                                "shadowClassNum": "0006",
                                "shapeStrokeWidth": 1
                            }
                        },
                        {
                            "type": "text",
                            "meta": {
                                "cx": 435,
                                "cy": 230,
                                "text": "text_index_1",
                                "classNum": "000",
                                "fontSize": 25
                            }
                        }
                    ]
                },
                { // 두 번째 요소
                    "elements": [ // 두 번째 요소의 엘리먼트
                        {
                            "type": "rect",
                            "meta": {
                                "cx": 435,
                                "cy": 300,
                                "width": 400,
                                "height": 50,
                                "rXY": 10,
                                "shapeFillClassNum": "14",
                                "shapeStrokeClassNum": "117",
                                "shadowClassNum": "0006",
                                "shapeStrokeWidth": 1
                            }
                        }, {
                            "type": "text",
                            "meta": {
                                "cx": 435,
                                "cy": 300,
                                "text": "text_index_2",
                                "classNum": "000",
                                "fontSize": 25
                            }
                        }
                    ]
                }
            ],
            "dragArea": [10, 330, 740, 490] // 드래그 영역 지정 (dragEl 요소를 드래그할 때 해당 영역에 들어오지 않으면 원래 자리로 돌아감)
        },
        "helpPopUp": { // 도움말 선택 시 제공되는 popup창 관련
            "popUpSize": { // popup창 크기
                "width": 650,
                "height": 380,
                "rXY": 10
            },
            "elements": [ // popup창에 들어가는 반응 없는 요소
                { // 토끼 이미지
                    "type": "image",
                    "meta": {
                        "cx": 600,
                        "cy": 360,
                        "ImgUrl": "image_index_4",
                        "ImgScale": 0.4
                    }
                },
                { // 말풍선
                    "type": "speechBubble",
                    "meta": {
                        "cx": 600,
                        "cy": 200,
                        "width": 200,
                        "height": 120,
                        "rXY": 15,
                        "type": "b", // 말풍선 타입 (아래쪽: "b", 위쪽: "t", 오른쪽: "r", 왼쪽: "l"), 기본값은 "b"
                        "shapeStrokeWidth": 1, // 기본값은 1
                        "shapeFillClassNum": "14", // 기본값은 "14"
                        "shapeStrokeClassNum": "0008" // 기본값은 "0008"
                    }
                },
                { // 말풍선 내 text
                    "type": "text",
                    "meta": {
                        "cx": 600,
                        "cy": 195,
                        "text": "text_index_5",
                        "classNum": "000",
                        "fontSize": 20,
                        "dy": 30
                    }
                },
                { // order hint 들어가는 배경 rect
                    "type": "rect",
                    "meta": {
                        "cx": 280,
                        "cy": 265,
                        "width": 350,
                        "height": 300,
                        "rXY": 10,
                        "shapeFillClassNum": "14",
                        "shapeStrokeClassNum": "no",
                        "shapeStrokeWidth": 1
                    }
                }
            ],
            "orderHint": { // 순서 콘텐츠 학습 방법 알려주는 부분 관련
                "hintIndex": [0, 1], // 보여줄 hintEl index (hintEl의 첫 번째 요소(index: 0)를 두 번째 요소(index: 1)자리로 이동)
                "hintEl": [ // 힌트로 보여줄 엘리먼트
                    [ // 첫 번째 요소 (배경 rect와 text)
                        {
                            "type": "rect",
                            "meta": {
                                "cx": 280,
                                "cy": 160,
                                "width": 300,
                                "height": 40,
                                "rXY": 10,
                                "shapeFillClassNum": "14",
                                "shapeStrokeClassNum": "117",
                                "shadowClassNum": "0006",
                                "shapeStrokeWidth": 1
                            }
                        },{
                            "type": "text",
                            "meta": {
                                "cx": 280,
                                "cy": 160,
                                "text": "text_index_1",
                                "classNum": "000",
                                "fontSize": 20
                            }
                        }
                    ],
                    [ // 두 번째 요소 (배경 rect와 text)
                        {
                            "type": "rect",
                            "meta": {
                                "cx": 280,
                                "cy": 230,
                                "width": 300,
                                "height": 40,
                                "rXY": 10,
                                "shapeFillClassNum": "14",
                                "shapeStrokeClassNum": "117",
                                "shadowClassNum": "0006",
                                "shapeStrokeWidth": 1
                            }
                        }, {
                            "type": "text",
                            "meta": {
                                "cx": 280,
                                "cy": 230,
                                "text": "text_index_2",
                                "classNum": "000",
                                "fontSize": 20
                            }
                        }
                    ]
                ],
                "type": "v" // 힌트로 보여줄 order 타입 (세로: "v", 가로 "h")
            }
        },
        "helpButton": { // 도움말 버튼 위치
            "cx": 755,
            "cy": 380
        }
    }
    ```

> ## KM000051

    선택하기 (문장학습심화_Choose3: 그림보고 초이스 2번+마지막 화면)

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000051",
        "direction": { //지시문
            "text": "text_index_0", //[필수]
            "classNum": "000",
            "bold": true
        },
        "scrollArea": { // [선택] 스크롤 영역
            "x": 40,
            "y": 80,
            "x2": 760,
            "y2": 480,
            "fillClassNum": "0012" //스크롤 영역 바탕색
        },
        "choice": [ //선택지 정보 배열로
            { //첫 번째 선택지 정보
                "hintCount": 1,
                "elements": [ //첫 번째 선택지의 보기 배열
                    [ //첫 번째 선택지의 첫 번째 보기
                        {
                            "type": "rect",
                            "meta": {
                                "cx": 400,
                                "cy": 170,
                                "width": 400,
                                "height": 60,
                                "rXY": 10,
                                "shapeFillClassNum": "14",
                                "shapeStrokeClassNum": 117,
                                "shapeStrokeWidth": 1
                            }
                        },
                        {
                            "type": "text",
                            "meta": {
                                "cx": 400,
                                "cy": 170,
                                "text": "오늘은 설날입니다.",
                                "classNum": "000",
                                "fontSize": 25
                            }
                        }
                    ],
                    [ //첫 번째 선택지의 두 번째 보기
                        {
                            "type": "rect",
                            "meta": {
                                "cx": 400,
                                "cy": 250,
                                "width": 400,
                                "height": 60,
                                "rXY": 10,
                                "shapeFillClassNum": "14",
                                "shapeStrokeClassNum": 117,
                                "shapeStrokeWidth": 1
                            }
                        },
                        {
                            "type": "text",
                            "meta": {
                                "cx": 400,
                                "cy": 250,
                                "text": "오늘은 소풍날입니다.",
                                "classNum": "000",
                                "fontSize": 25
                            }
                        }
                    ],
                    [ //첫 번째 선택지의 세 번째 보기
                        {
                            "type": "rect",
                            "meta": {
                                "cx": 400,
                                "cy": 330,
                                "width": 400,
                                "height": 60,
                                "rXY": 10,
                                "shapeFillClassNum": "14",
                                "shapeStrokeClassNum": 117,
                                "shapeStrokeWidth": 1
                            }
                        },
                        {
                            "type": "text",
                            "meta": {
                                "cx": 400,
                                "cy": 330,
                                "text": "text_index_1", // 오늘은 내 생일입니다.
                                "classNum": "000",
                                "fontSize": 25
                            }
                        }
                    ]
                ],
                "ansIndex": 2, //정답 인덱스
                "shadow": {}
            },
            { //두 번째 선택지 정보
                "hintCount": 0,
                "elements": [ //두 번째 선택지 보기 배열
                    [ //두 번째 선택지의 첫 번째 보기
                        {
                            "type": "rect",
                            "meta": {
                                "cx": 400,
                                "cy": 630,
                                "width": 400,
                                "height": 60,
                                "rXY": 10,
                                "shapeFillClassNum": "14",
                                "shapeStrokeClassNum": 117,
                                "shapeStrokeWidth": 1
                            }
                        },
                        {
                            "type": "text",
                            "meta": {
                                "cx": 400,
                                "cy": 630,
                                "text": "동생에게 편지를 씁니다.",
                                "classNum": "001",
                                "fontSize": 25
                            }
                        }
                    ],
                    [ //두 번째 선택지의 두 번째 보기
                        {
                            "type": "rect",
                            "meta": {
                                "cx": 400,
                                "cy": 710,
                                "width": 400,
                                "height": 60,
                                "rXY": 10,
                                "shapeFillClassNum": "14",
                                "shapeStrokeClassNum": 117,
                                "shapeStrokeWidth": 1
                            }
                        },
                        {
                            "type": "text",
                            "meta": {
                                "cx": 400,
                                "cy": 710,
                                "text": "엄마와 케이크를 만듭니다.",
                                "classNum": "001",
                                "fontSize": 25
                            }
                        }
                    ],
                    [ //두 번째 선택지의 세 번째 보기
                        {
                            "type": "rect",
                            "meta": {
                                "cx": 400,
                                "cy": 790,
                                "width": 400,
                                "height": 60,
                                "rXY": 10,
                                "shapeFillClassNum": "14",
                                "shapeStrokeClassNum": 117,
                                "shapeStrokeWidth": 1
                            }
                        },
                        {
                            "type": "text",
                            "meta": {
                                "cx": 400,
                                "cy": 790,
                                "text": "친구들과 케이크를 먹습니다.",
                                "classNum": "001",
                                "fontSize": 25
                            }
                        }
                    ]
                ],
                "ansIndex": 2, //정답 인덱스
                "inactiveAttr": { // [선택]비활성화일 때 버튼 설정
                    "classNum": "0029", // 텍스트색깔 (기본 0028)
                    "shapeFillClassNum": "14" // 버튼 바탕색 (기본 14)
                },
                "shadow": { // [선택] 보기 버튼 설정
                    "classNum": [ //그림자 색
                        "0006",
                        "0006",
                        "0006"
                    ],
                    "rXY": [ //테두리 라운드
                        10,
                        10,
                        10
                    ]
                }
            }
        ],
        "lastFeedback": { //선택 종료 후 마지막 화면 요소
            "elements": [{
                    "type": "image",
                    "meta": {
                        "cx": 400,
                        "cy": 275,
                        "ImgUrl": "image_index_0", //생일파티 이미지
                        "ImgScale": 1,
                        "rx": 20
                    }
                },
                {
                    "type": "rect",
                    "meta": {
                        "cx": 400,
                        "cy": 130,
                        "width": 400,
                        "height": 60,
                        "rXY": 10,
                        "shapeFillClassNum": "14",
                        "shapeStrokeClassNum": 117,
                        "shapeStrokeWidth": 1
                    }
                },
                {
                    "type": "text",
                    "meta": {
                        "cx": 400,
                        "cy": 130,
                        "text": "text_index_1", //오늘은 내 생일입니다.
                        "classNum": "001",
                        "fontSize": 25
                    }
                },
                {
                    "type": "rect",
                    "meta": {
                        "cx": 400,
                        "cy": 420,
                        "width": 400,
                        "height": 60,
                        "rXY": 10,
                        "shapeFillClassNum": "14",
                        "shapeStrokeClassNum": 117,
                        "shapeStrokeWidth": 1
                    }
                },
                {
                    "type": "text",
                    "meta": {
                        "cx": 400,
                        "cy": 420,
                        "text": "친구들과 케이크를 먹습니다.",
                        "classNum": "001",
                        "fontSize": 25
                    }
                },
                {
                    "type": "image",
                    "meta": {
                        "cx": 400,
                        "cy": 185,
                        "ImgUrl": "image_index_1", //화살표
                        "ImgScale": 0.15
                    }
                },
                {
                    "type": "image",
                    "meta": {
                        "cx": 400,
                        "cy": 365,
                        "ImgUrl": "image_index_1", //화살표
                        "ImgScale": 0.15
                    }
                }
            ],
            "setTime": 1300 // [선택] 마지막 화면 지속 시간 (기본 300)
        },
        "scrollElements": [ // 스크롤 영역 요소
            {
                "type": "image",
                "meta": {
                    "cx": 400,
                    "cy": 480,
                    "ImgUrl": "image_index_0", //생일파티 이미지
                    "ImgScale": 1,
                    "rx": 20
                }
            },
            {
                "type": "image",
                "meta": {
                    "cx": 400,
                    "cy": 390,
                    "ImgUrl": "image_index_1", //화살표
                    "ImgScale": 0.15
                }
            },
            {
                "type": "image",
                "meta": {
                    "cx": 400,
                    "cy": 570,
                    "ImgUrl": "image_index_1", //화살표
                    "ImgScale": 0.15
                }
            }
        ],
        "elements": [] // 기본 바탕 요소
    }
    ```

> ## KM000052

    Choose1 (CN_W)

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000052",
        "direction": { // 지시문
            "x": 80,
            "y": 45,
            "text": "text_index_0",
            "classNum": "000",
            "fontSize": 25,
            "dy": 45,
            "bold": true,
            "speakerX": 40,
            "speakerY": 25
        },
        "choice": { //choice 엘리먼트 (해당 그룹의 크기에 맞춰 피드백 위치가 생성됨)
            "bgElement": [{ // choice 되는 그룹의 배경에 깔리는 엘리먼트
                "type": "rect",
                "meta": {
                    "cx": 400,
                    "cy": 250,
                    "width": 600,
                    "height": 100,
                    "rXY": 10,
                    "shapeFillClassNum": "0008",
                    "shapeStrokeClassNum": "no",
                    "shadowClassNum": "0006"
                }
            }],
            "elementText": [{ // 첫번째 선택 엘리먼트
                "text": "같이",
                "cx": 200,
                "cy": 250,
                "fontSize": 30,
                "classNum": "91",
                "focusClass": "0002",
                "bold": false
            }, { // 두번째 선택 엘리먼트
                "text": "함께",
                "cx": 400,
                "cy": 250,
                "fontSize": 30,
                "classNum": "91",
                "focusClass": "0002",
                "bold": false
            }, { // 세번째 선택 엘리먼트
                "text": "홀로",
                "cx": 600,
                "cy": 250,
                "fontSize": 30,
                "classNum": "91",
                "focusClass": "0002",
                "bold": false
            }],
            "hint": false, // 힌트 여부
            "answer": [0, 1] //정답 인덱스 (2개 이상 설정해야 됨)
        }
    }
    ```

> ## KM000053

    Choose2 (CW_W)

-   ### 기본 포맷

        ```javascript
        {
            "questionType": "KM000053",
            "direction": { // 지시문
                "x": 80,
                "y": 45,
                "text": "text_index_0",
                "classNum": "000",
                "fontSize": 25,
                "dy": 45,
                "bold": true,
                "speakerX": 40,
                "speakerY": 25
            },
            "elements": [{ //배경으로 깔릴 엘리먼트
                "type": "rect",
                "meta": {
                    "cx": 320,
                    "cy": 160,
                    "width": 140,
                    "height": 100,
                    "rXY": 10,
                    "shapeFillClassNum": "0009",
                    "shapeStrokeClassNum": "0009",
                    "shapeStrokeWidth": 3
                }
            }, {
                "type": "text",
                "meta": {
                    "cx": 320,
                    "cy": 160,
                    "text": "인간",
                    "classNum": "91",
                    "fontSize": 40,
                    "bold": true
                }
            }, {
                "type": "rect",
                "meta": {
                    "cx": 480,
                    "cy": 160,
                    "width": 140,
                    "height": 100,
                    "rXY": 10,
                    "shapeFillClassNum": "14",
                    "shapeStrokeClassNum": "0009"
                }
            }],
            "choice": { //선택지 그룹
                "elements": [
                    [{ //첫번째 선택 그룹
                        "type": "rect",
                        "meta": {
                            "cx": 150,
                            "cy": 350,
                            "width": 140,
                            "height": 100,
                            "rXY": 10,
                            "shapeFillClassNum": "14",
                            "shapeStrokeClassNum": "no",
                            "shadowClassNum": "0006"
                        }
                    }, {
                        "type": "text",
                        "meta": {
                            "cx": 150,
                            "cy": 350,
                            "text": "희망",
                            "classNum": "91",
                            "fontSize": 40,
                            "bold": false
                        }
                    }],
                    [{ //두번째 선택 그룹
                        "type": "rect",
                        "meta": {
                            "cx": 315,
                            "cy": 350,
                            "width": 140,
                            "height": 100,
                            "rXY": 10,
                            "shapeFillClassNum": "14",
                            "shapeStrokeClassNum": "no",
                            "shadowClassNum": "0006"
                        }
                    }, {
                        "type": "text",
                        "meta": {
                            "cx": 315,
                            "cy": 350,
                            "text": "사람",
                            "classNum": "91",
                            "fontSize": 40,
                            "bold": false
                        }
                    }],
                    [{ //세번째 선택 그룹
                        "type": "rect",
                        "meta": {
                            "cx": 480,
                            "cy": 350,
                            "width": 140,
                            "height": 100,
                            "rXY": 10,
                            "shapeFillClassNum": "14",
                            "shapeStrokeClassNum": "no",
                            "shadowClassNum": "0006"
                        }
                    }, {
                        "type": "text",
                        "meta": {
                            "cx": 480,
                            "cy": 350,
                            "text": "물",
                            "classNum": "91",
                            "fontSize": 40,
                            "bold": false
                        }
                    }],
                    [{ //네번째 선택 그룹
                        "type": "rect",
                        "meta": {
                            "cx": 645,
                            "cy": 350,
                            "width": 140,
                            "height": 100,
                            "rXY": 10,
                            "shapeFillClassNum": "14",
                            "shapeStrokeClassNum": "no",
                            "shadowClassNum": "0006"
                        }
                    }, {
                        "type": "text",
                        "meta": {
                            "cx": 645,
                            "cy": 350,
                            "text": "불",
                            "classNum": "91",
                            "fontSize": 40,
                            "bold": false
                        }
                    }]
                ],
                "ansIndex": 1, //정답 인덱스
                "fbInfo": { //피드백 시 나타날 텍스트 속성 (cx, cy, classNum, fontSize, bold)
                    "cx": 480,
                    "cy": 160,
                    "bold": true
                },
                "hintCount": 0 // 힌트 개수
            }
        }
        ```

    > ## KM000054

        Drag

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000054",
        "direction": { // 지시문
            "text": "text_index_0",
            "bold": true
        },
        "drag": { // 드래그 관련 메타
            "dragEl": { // 드래그 하는 요소
                "background": { // [선택] 드래그 elements 배경
                    "type": "rect",
                    "meta": {
                        "width": 720,
                        "height": 100,
                        "shapeStrokeClassNum": "117",
                        "shapeStrokeWidth": 1,
                        "shadowClassNum": "0006"
                    }
                },
                "elements": [ // 드래그 elements
                    [{ // 첫 번째
                        "type": "rect",
                        "meta": {
                            "cx": 160,
                            "cy": 320,
                            "width": 120,
                            "height": 60,
                            "rXY": 10,
                            "shapeFillClassNum": "14",
                            "shapeStrokeClassNum": "117",
                            "shapeStrokeWidth": 1,
                            "shadowRect": {
                                "fillClassNum": "0001"
                            }
                        }
                    }, {
                        "type": "text",
                        "meta": {
                            "cx": 160,
                            "cy": 320,
                            "text": "무지개",
                            "classNum": "000",
                            "fontSize": 35
                        }
                    }],
                    [{ // 두 번째
                        "type": "rect",
                        "meta": {
                            "cx": 320,
                            "cy": 320,
                            "width": 120,
                            "height": 60,
                            "rXY": 10,
                            "shapeFillClassNum": "14",
                            "shapeStrokeClassNum": "117",
                            "shapeStrokeWidth": 1,
                            "shadowRect": {
                                "fillClassNum": "0001"
                            }
                        }
                    }, {
                        "type": "text",
                        "meta": {
                            "cx": 320,
                            "cy": 320,
                            "text": "병아리",
                            "classNum": "000",
                            "fontSize": 35
                        }
                    }],
                    [{ // 세 번째
                        "type": "rect",
                        "meta": {
                            "cx": 480,
                            "cy": 320,
                            "width": 120,
                            "height": 60,
                            "rXY": 10,
                            "shapeFillClassNum": "14",
                            "shapeStrokeClassNum": "117",
                            "shapeStrokeWidth": 1,
                            "shadowRect": {
                                "fillClassNum": "0001"
                            }
                        }
                    }, {
                        "type": "text",
                        "meta": {
                            "cx": 480,
                            "cy": 320,
                            "text": "개나리",
                            "classNum": "000",
                            "fontSize": 35
                        }
                    }],
                    [{ // 네 번째
                        "type": "rect",
                        "meta": {
                            "cx": 640,
                            "cy": 320,
                            "width": 120,
                            "height": 60,
                            "rXY": 10,
                            "shapeFillClassNum": "14",
                            "shapeStrokeClassNum": "117",
                            "shapeStrokeWidth": 1,
                            "shadowRect": {
                                "fillClassNum": "0001"
                            }
                        }
                    }, {
                        "type": "text",
                        "meta": {
                            "cx": 640,
                            "cy": 320,
                            "text": "나팔",
                            "classNum": "000",
                            "fontSize": 35
                        }
                    }]
                ]
            },
            "step": [
                { // 첫 번째 step (하늘에 무지개가 뜹니다.)
                    "ansIndex": 0, // 드래그 답 (빈칸에 들어갈 dragEl의 인덱스)
                    "sentence": { // 드래그 빈칸 포함한 문장 (해당 모듈에서만 사용되는 형태입니다.)
                        "cx": 400, // 문장 위치
                        "cy": 430, // 문장 위치
                        "text": "하늘에 $blank{무지개}가 뜹니다.", // 텍스트: 빈칸으로 표시될 부분을 $blank{무지개}와 같이 작성 (텍슽트 테이블에 동일한 형태로 등록하여 사용 가능)
                        "blankOption": { // 문장 내 빈칸 관련 메타
                            "offset": 10, // 빈칸의 좌, 우 여백 조절
                            "width": 125,
                            "height": 65,
                            "rXY": 10,
                            "strokeClassNum": "01",
                            "strokeWidth": 1
                        },
                        "questionMarkOption": { // 빈칸 내 물음표 관련 메타
                            "fontSize": 35, // 물음표 fontSize
                            "classNum": "0002",
                            "bold": true
                        },
                        "fontSize": 30, // 문장의 fontSize
                        "classNum": "000",
                        "bold": true
                    },
                    "soundButton": { // 이미지 + 사운드 아이콘
                        "elements": [{ // 이미지
                            "type": "image",
                            "meta": {
                                "cx": 400,
                                "cy": 170,
                                "ImgUrl": "image_index_0",
                                "ImgScale": 0.35
                            }
                        }],
                        "sound": { // 사운드 url
                            "soundUrl": "sound_index_0"
                        }
                    }
                },
                { // 두 번째 step (봄이 오면 노란 개나리가 핍니다.)
                    "ansIndex": 2,
                    "sentence": {
                        "cx": 400,
                        "cy": 430,
                        "text": "봄이 오면 노란 $blank{개나리}가 핍니다.",
                        "blankOption": {
                            "width": 125,
                            "height": 65,
                            "rXY": 10,
                            "strokeClassNum": "01",
                            "strokeWidth": 1
                        },
                        "questionMarkOption": {
                            "fontSize": 35,
                            "classNum": "0002",
                            "isBold": true
                        },
                        "fontSize": 30,
                        "classNum": "000",
                        "isBold": false
                    },
                    "soundButton": {
                        "elements": [
                            "type": "image",
                            "meta": {
                                "cx": 400,
                                "cy": 170,
                                "ImgUrl": "image_index_1",
                                "ImgScale": 0.35
                            }
                        }],
                        "sound": {
                            "soundUrl": "sound_index_1"
                        }
                    }
                },
                { // 세 번째 step (뚜뚜, 나팔을 신나게 붑니다.)
                    "ansIndex": 3,
                    "sentence": {
                        "cx": 400,
                        "cy": 430,
                        "text": "뚜뚜, $blank{나팔}을 신나게 붑니다.",
                        "blankOption": {
                            "offset": 10,
                            "width": 125,
                            "height": 65,
                            "rXY": 10,
                            "strokeClassNum": "01",
                            "strokeWidth": 1
                        },
                        "questionMarkOption": {
                            "fontSize": 35,
                            "classNum": "0002",
                            "isBold": true
                        },
                        "fontSize": 30,
                        "classNum": "000",
                        "isBold": false
                    },
                    "soundButton": {
                        "elements": [{
                            "type": "image",
                            "meta": {
                                "cx": 400,
                                "cy": 170,
                                "ImgUrl": "image_index_2",
                                "ImgScale": 0.35
                            }
                        }],
                        "sound": {
                            "soundUrl": "sound_index_2"
                        }
                    }
                },
                { // 네 번째 step (삐약삐약, 귀여운 병아리가 마당에 있습니다.)
                    "ansIndex": 1,
                    "sentence": {
                        "cx": 400,
                        "cy": 430,
                        "text": "삐약삐약, 귀여운 $blank{병아리}가 마당에 있습니다.",
                        "blankOption": {
                            "offset": 10,
                            "width": 125,
                            "height": 65,
                            "rXY": 10,
                            "strokeClassNum": "01",
                            "strokeWidth": 1
                        },
                        "questionMarkOption": {
                            "fontSize": 35,
                            "classNum": "0002",
                            "isBold": true
                        },
                        "fontSize": 30,
                        "classNum": "000",
                        "isBold": false
                    },
                    "soundButton": {
                        "elements": [{
                            "type": "image",
                            "meta": {
                                "cx": 400,
                                "cy": 170,
                                "ImgUrl": "image_index_3",
                                "ImgScale": 0.35
                            }
                        }],
                        "sound": {
                            "soundUrl": "sound_index_3"
                        }
                    }
                }
            ]
        },
        "puzzle": { // 드래그 후 제공되는 퍼즐 관련 메타
            "hintCount": 1,
            "arrage": [ // 완성된 퍼즐 배열 (예시는 3행 4열, 빈 곳은 null)
                ["무", "지", "개", null],
                [null, null, "나", "팔"],
                ["병", "아", "리", null]
            ],
            "puzzleInfo": { // 퍼즐 위치 및 스타일
                "position": { // 퍼즐 위치
                    "cx": 400,
                    "cy": 330,
                },
                "style": { // 퍼즐 스타일
                    "beforeFlip": { // 뒤집히기 전
                        "type": "rect",
                        "meta": {
                            "width": 80,
                            "height": 80,
                            "rXY": 5,
                            "shapeFillClassNum": "0007",
                            "shapeStrokeClassNum": "117",
                            "shapeStrokeWidth": 1,
                            "shadowRect": {
                              "fillClassNum": "117"
                            }
                        }
                    },
                    "afterFlip": { // 뒤집힌 후
                        "type": "rect",
                        "meta": {
                            "width": 80,
                            "height": 80,
                            "rXY": 5,
                            "shapeFillClassNum": "0006",
                            "shapeStrokeClassNum": "117",
                            "shapeStrokeWidth": 1,
                            "shadowRect": {
                            "fillClassNum": "117"
                            }
                        }
                    }
                }, // 퍼즐 내 텍스트
                "text": {
                    "fontSize": 40,
                    "basicClassNum": "14",
                    "pointClassNum": "0002"
                }
            },
            "eventEl": [ // 퍼즐 옆 이미지 + 사운드 아이콘 관련 메타
                { // 첫 번째
                    "soundButton": { // 사운드 버튼
                        "elements": [
                            {
                                "type": "image",
                                "meta": {
                                    "cx": 160,
                                    "cy": 245,
                                    "ImgUrl": "image_index_0",
                                    "ImgScale": 0.2
                                }
                            }
                        ],
                        "sound": {
                            "soundUrl": "sound_index_0"
                        }
                    },
                    "puzzleIndex": [ // 클릭 시 뒤집히는 카드 (퍼즐 arrange와 동일한 형태, 뒤집히는 카드만 true, 나머지는 false)
                        [true, true, true, false],
                        [false, false, false, false],
                        [false, false, false, false]
                    ]
                },
                { // 두 번째
                    "soundButton": {
                        "elements": [
                            {
                                "type": "image",
                                "meta": {
                                    "cx": 440,
                                    "cy": 145,
                                    "ImgUrl": "image_index_1",
                                    "ImgScale": 0.2
                                }
                            }
                        ],
                        "sound": {
                            "soundUrl": "sound_index_1"
                        }
                    },
                    "puzzleIndex": [
                        [false, false, true, false],
                        [false, false, true, false],
                        [false, false, true, false]
                    ]
                },
                { // 세 번째
                    "soundButton": {
                        "elements": [
                            {
                                "type": "image",
                                "meta": {
                                    "cx": 650,
                                    "cy": 330,
                                    "ImgUrl": "image_index_2",
                                    "ImgScale": 0.2
                                }
                            }
                        ],
                        "sound": {
                            "soundUrl": "sound_index_2"
                        }
                    },
                    "puzzleIndex": [
                        [false, false, false, false],
                        [false, false, true, true],
                        [false, false, false, false]
                    ]
                },
                { // 네 번째
                    "soundButton": {
                        "elements": [
                            {
                                "type": "image",
                                "meta": {
                                    "cx": 160,
                                    "cy": 410,
                                    "ImgUrl": "image_index_3",
                                    "ImgScale": 0.2
                                }
                            }
                        ],
                        "sound": {
                            "soundUrl": "sound_index_3"
                        }
                    },
                    "puzzleIndex": [
                        [false, false, false, false],
                        [false, false, false, false],
                        [true, true, true, false]
                    ]
                }
            ]
        }
    }
    ```

> ## KM000055

    Reading + Choose

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000055",
        "direction": { //지시문
            "text": "text_index_0",
            "bold": true
        },
        "sound": { //지문 사운드
            "url": "sound_index_0",
            "textEndTime": [4, 7.9, 12.3, 14.1, 17.5, 22.4, 26.5, 29.3, 34.3] // 지문에서 열 마다 끝나는 시간 (시간에 맞춰서 focus가 이동함)
        },
        "scroll": { //스크롤 영역에 들어가는 정보
            "area": { //스크롤 영역 크기
                "x": 20, // x의 시작점
                "y": 80, // y의 시작점
                "x2": 730, // x의 끝점
                "y2": 500, // y의 끝점
                "fillClassNum": "0012", // 영역의 채우기 색
                "strokeClassNum": "no" // 영역의 선 색
            },
            "elements": [{ // 배경 처럼 깔리는 엘리먼트 (반응이 없는 element)
                "type": "image",
                "meta": {
                    "cx": 600,
                    "cy": 300,
                    "imgUrl": "image_index_0",
                    "imgScale": 0.8
                }
            }, {
                "type": "image",
                "meta": {
                    "cx": 500,
                    "cy": 780,
                    "imgUrl": "image_index_1",
                    "imgScale": 1
                }
            }],
            "focusText": [{ //focus가 진행될 text
                "text": "text_index_1", // [봄]
                "x": 375,
                "y": 130,
                "classNum": "91",
                "fontSize": 55,
                "dy": 55,
                "textLength": 0,
                "bold": true,
                "center": true
            }, {
                "text": "text_index_2", // [우리아기는 아래 $option{발치}에서 코올코올] : text 등록 시 줄바꿈을 하면 자동으로 focus도 다음 줄로 생성됨, text를 줄마다 따로 넣으셔도 됩니다.
                "x": 100,
                "y": 240,
                "classNum": "91",
                "fontSize": 30,
                "dy": 45,
                "textLength": 0,
                "options": [{
                    "type": "footnote", // 각주 생성 옵션
                    "classNum": "91", // 각주가 된 부분 text 색상
                    "bold": true // 각주가 된 부분 text bold 처리
                }]
            }, {
                "text": "text_index_3", // [고양이는 $option{부뚜막}에서 가릉가릉] : text 등록 시 줄바꿈을 하면 자동으로 focus도 다음 줄로 생성이 되지만 text를 줄마다 따로 등록하셔도 됩니다.
                "x": 100,
                "y": 380,
                "classNum": "91",
                "fontSize": 30,
                "dy": 45,
                "textLength": 0,
                "options": [{
                    "type": "footnote", // 각주 생성 옵션
                    "classNum": "91", // 각주가 된 부분 text 색상
                    "bold": true  // 각주가 된 부분 text bold 처리
                }]
            }, {
                "text": "text_index_4",  // [아기 바람이 나뭇가지에서 소올소올]
                "x": 100,
                "y": 550,
                "classNum": "91",
                "fontSize": 30,
                "dy": 45,
                "textLength": 0
            }, {
                "text": "text_index_5",  // [아저씨 해님이 하늘 한가운데서 째앵째앵]
                "x": 100,
                "y": 690,
                "classNum": "91",
                "fontSize": 30,
                "dy": 45,
                "textLength": 0
            }],
            "footNoteInfo": [{ // 각주 클릭시 팝업 정보 (위에 등록한 각주 순서에 따라 하나씩 적용)
                "bgImage": { //팝업의 배경으로 쓰일 이미지
                    "url": "image_index_2",
                    "scale": 1
                },
                "elements": [{ //팝업 안 내용
                    "type": "text",
                    "meta": {
                        "text": "text_index_6", //발치[발치]
                        "classNum": "91",
                        "fontSize": 30,
                        "options": [{
                            "type": "color",
                            "classNum": "91",
                            "fontSize": 50, //앞에 발치 크기 키우기
                            "bold": true
                        }],
                        "x": 180,
                        "y": 160
                    }
                }, {
                    "type": "text",
                    "meta": {
                        "text": "text_index_7", //발이 있는 쪽
                        "classNum": "91",
                        "fontSize": 25,
                        "x": 180,
                        "y": 250
                    }
                }]
            }, {
                "bgImage": { //팝업의 배경으로 쓰일 이미지
                    "url": "image_index_2",
                    "scale": 1
                },
                "elements": [{
                    "type": "text",
                    "meta": {
                        "text": "text_index_8", //부뚜막[부뚜막]
                        "classNum": "91",
                        "fontSize": 30,
                        "x": 180,
                        "y": 160,
                        "options": [{
                            "type": "color",
                            "classNum": "91",
                            "fontSize": 50, //앞에 부뚜막 크기 키우기
                            "bold": true
                        }]
                    }
                }, {
                    "type": "text",
                    "meta": {
                        "text": "text_index_9", //불을 때기 위해 만든 구멍 위에 흙과 돌을 \n쌓아 솥을 걸어 놓는 곳.
                        "classNum": "91",
                        "fontSize": 25,
                        "x": 180,
                        "y": 250
                    }
                }]
            }]
        },
        "question": { //문제 부분
            "direction": { //문제 부분 지시문
                "text": "text_index_10",
                "bold": true
            },
            "elements": [{ // 배경 처럼 깔리는 엘리먼트 (반응이 없는 element)
                "type": "image",
                "meta": {
                    "cx": 270,
                    "cy": 170,
                    "ImgUrl": "image_index_8", //화살표 이미지
                    "ImgScale": 0.2
                }
            }, {
                "type": "image",
                "meta": {
                    "cx": 530,
                    "cy": 170,
                    "ImgUrl": "image_index_8", //화살표 이미지
                    "ImgScale": 0.2
                }
            }],
            "stepElements": [ // 문제에서 단계별로 표시되는 부분의 엘리먼트(엘리먼트 마다 그룹 설정)
                [{
                    "type": "image",
                    "meta": {
                        "cx": 150,
                        "cy": 170,
                        "ImgUrl": "image_index_3", // 왼쪽 호랑이 이미지
                        "ImgScale": 1
                    }
                }],
                [{
                    "type": "rect", //가운데 물음표가 있는 rect
                    "meta": {
                        "cx": 400,
                        "cy": 170,
                        "width": 180,
                        "height": 150,
                        "rXY": 10,
                        "shapeFillClassNum": "14",
                        "shapeStrokeClassNum": "0014",
                        "shapeStrokeWidth": 3
                    },
                    "isQ": true
                }, {
                    "type": "text", //가운데 물음표
                    "meta": {
                        "cx": 400,
                        "cy": 170,
                        "text": "?",
                        "classNum": "000",
                        "fontSize": 80,
                        "dy": 45
                    }
                }],
                [{
                    "type": "image",
                    "meta": {
                        "cx": 650,
                        "cy": 170,
                        "ImgUrl": "image_index_4", // 오른쪽 호랑이 이미지
                        "ImgScale": 1
                    }
                }]
            ],
            "visible": false, // 문항 시작 시 문제가 먼저 보일지 여부
            "choice": [{ // choice element 배열 (해당 배열의 수에 따라 choice 문제의 수가 결정)
                "elements": [
                    [{
                        "type": "image",
                        "meta": {
                            "cx": 150,
                            "cy": 370,
                            "ImgUrl": "image_index_5", // 첫번재(왼쪽) 이미지
                            "ImgScale": 1.2
                        }
                    }],
                    [{
                        "type": "image",
                        "meta": {
                            "cx": 400,
                            "cy": 370,
                            "ImgUrl": "image_index_6",  // 두번재(가운데) 이미지
                            "ImgScale": 1.2
                        }
                    }],
                    [{
                        "type": "image",
                        "meta": {
                            "cx": 650,
                            "cy": 370,
                            "ImgUrl": "image_index_7",  // 세번재(오른쪽) 이미지
                            "ImgScale": 1.2
                        }
                    }]
                ],
                "answer": 2, //정답 인덱스 (다중 정답일 때 : 배열로 추가)
                "hintCount": 0, // 힌트 개수 (최대로 적용될 수 있는 값은 정답의 수)
                "shadow": { // choice 엘리먼트의 그림자 정보
                    "classNum": ["0008", "0008", "0008"], // 그림자 색상(elemnet 순서에 맞게 적용)
                    "rXY": [20, 20, 20] // 그림자 rXY (elemnet 순서에 맞게 적용)
                }
            }]
        }
    }
    ```

> ## KM000056

    Match 유형1 (MIW_IW)

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000056",
        "direction": {
            "text": "text_index_0",
            "classNum": "000",
            "bold": true
        },
        "connectElement": {
            "leftEl": {
            "elements": [
                {
                "type": "image",
                "meta": {
                    "cx": 120,
                    "cy": 220,
                    "ImgUrl": "image_index_0",
                    "ImgScale": 0.3
                }
                },
                {
                "type": "image",
                "meta": {
                    "cx": 270,
                    "cy": 220,
                    "ImgUrl": "image_index_1",
                    "ImgScale": 0.3
                }
                },
                {
                "type": "text",
                "meta": {
                    "cx": 110,
                    "cy": 330,
                    "text": "text_index_1",
                    "classNum": "000",
                    "fontSize": 40
                }
                },
                {
                "type": "text",
                "meta": {
                    "cx": 190,
                    "cy": 330,
                    "text": "text_index_2",
                    "classNum": "000",
                    "fontSize": 40
                }
                },
                {
                "type": "text",
                "meta": {
                    "cx": 270,
                    "cy": 330,
                    "text": "text_index_3",
                    "classNum": "000",
                    "fontSize": 40
                }
                }
            ],
            "connectAnsIndex": 1,
            "connectDotOffsets": {
                "x": 20,
                "y": 0
            }
            },
            "rightEl": [
            {
                "element": [
                {
                    "type": "image",
                    "meta": {
                    "cx": 670,
                    "cy": 140,
                    "ImgUrl": "image_index_2",
                    "ImgScale": 0.3
                    }
                },
                {
                    "type": "text",
                    "meta": {
                    "cx": 670,
                    "cy": 230,
                    "text": "text_index_4",
                    "classNum": "000",
                    "fontSize": 40
                    }
                }
                ],
                "connectDotOffsets": {
                "x": 0,
                "y": 0
                }
            },
            {
                "element": [
                {
                    "type": "image",
                    "meta": {
                    "cx": 670,
                    "cy": 360,
                    "ImgUrl": "image_index_3",
                    "ImgScale": 0.3
                    }
                },
                {
                    "type": "text",
                    "meta": {
                    "cx": 670,
                    "cy": 450,
                    "text": "text_index_5",
                    "classNum": "000",
                    "fontSize": 40
                    }
                }
                ],
                "connectDotOffsets": {
                "x": -20,
                "y": 0
                }
            }
            ],
            "lineClassNum": "04",
            "lineHint": false,
            "handHint": false
        },
        "soundInfo": {
            "url": "sound_index_0"
        },
        "fbSpeaker": {
            "x": 70,
            "y": 130,
            "scale": 1
        }
    }
    ```

> ## KM000057

    선택하기 (문장학습심화_Choose4: 도형이 포함된 문장에서 낱말 고르기(1문제 당 초이스1개))

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000057",
        "direction": { //지시문
            "text": "text_index_0", //[필수]
            "classNum": "000",
            "bold": true
        },
        "elements": [ //바탕 요소
            {
                "type": "image",
                "meta": {
                    "cx": 400,
                    "cy": 150,
                    "ImgUrl": "image_index_0", // 요리사
                    "ImgScale": 0.6
                }
            }
        ],
        "choice": [ //선택지 정보 배열
            { // 첫 번째 선택지 정보
                "hintCount": 0, // 힌트 유무(0 없음, 1 있음)
                "ansIndex": 1,
                "bgRect": { //보기 아래 깔리는 렉트
                    "type": "rect",
                    "meta": {}
                },
                "elements": [{ //보기 텍스트 (배열)
                    "type": "text",
                        "meta": {
                            "cx": 150,
                            "text": "찌개"
                        }
                    },
                    {
                        "type": "text",
                        "meta": {
                            "cx": 370,
                            "text": "요리사"
                        }
                    },
                    {
                        "type": "text",
                        "meta": {
                            "cx": 620,
                            "text": "뜨겁습니다"
                        }
                    }
                ]
            },
            { // 두 번째 선택지 정보
                "hintCount": 1,
                "ansIndex": 0,
                "bgRect": {
                    "type": "rect",
                    "meta": {}
                },
                "elements": [{
                    "type": "text",
                        "meta": {
                            "cx": 150,
                            "text": "찌개"
                        }
                    },
                    {
                        "type": "text",
                        "meta": {
                            "cx": 370,
                            "text": "요리사"
                        }
                    },
                    {
                        "type": "text",
                        "meta": {
                            "cx": 620,
                            "text": "뜨겁습니다"
                        }
                    }
                ]
            },
            { // 세 번째 선택지 정보
                "hintCount": 0,
                "ansIndex": 2,
                "bgRect": {
                    "type": "rect",
                    "meta": {}
                },
                "elements": [{
                    "type": "text",
                        "meta": {
                            "cx": 150,
                            "text": "찌개"
                        }
                    },
                    {
                        "type": "text",
                        "meta": {
                            "cx": 370,
                            "text": "요리사"
                        }
                    },
                    {
                        "type": "text",
                        "meta": {
                            "cx": 620,
                            "text": "뜨겁습니다"
                        }
                    }
                ]
            }
        ],
        "choiceCommon": { //선택지 공통메타
            "bgRect": { //보기 아래 깔리는 렉트
                "width": 750,
                "height": 80,
                "rxy": 5,
                "shapeFillClassNum": "0040",
                "cx": 400,
                "cy": 440
            },
            "elements": {// 보기 텍스트
                "classNum": "000",
                "fontSize": 30,
                "cy": 440
            }
        },
        "lastFeedback": { //마지막 화면 + 사운드
            "soundInfo": {
                "url": "sound_index_0" //요리사가 음식을~
            },
            "elements": [ //요소
                {
                    "type": "text",
                    "meta": {
                        "cx": 400,
                        "cy": 350,
                        "text": "text_index_1", // 찌개가
                        "classNum": "000",
                        "fontSize": 30,
                        "options": [{
                                "type": "color",
                                "classNum": "0002"
                            },
                            {
                                "type": "color",
                                "classNum": "0002"
                            },
                            {
                                "type": "color",
                                "classNum": "0002"
                            }
                        ]
                    }
                },
                {
                    "type": "image",
                    "meta": {
                        "cx": 160,
                        "cy": 280,
                        "ImgUrl": "image_index_1", // 사운드 아이콘
                        "ImgScale": 0.9
                    }
                }
            ]
        },
        "sentenseBlanks": [ // 빈칸 포함한 텍스트
            { // 첫 번째 문제 텍스트
                "x": 150, // 텍스트 시작 x
                "y": 275, // 텍스트 시작 y
                "dy": 30,
                "text": "text_index_2",  //ㅁㅁㅁ가~
                "fontSize": 30,
                "classNum": "000", // 도형 내부 텍스트 색
                "focusNum": "0001", // 도형 테두리 색
                "option": [ //텍스트의 $shape{} 부분 정보
                    {
                        "type": "rect", // 도형종류
                        "blankI": [ //도형에서 빈칸의 인덱스 [시작, 끝]
                            0,
                            2
                        ],
                        "meta": {
                            "width": 70,
                            "height": 70,
                            "shapeFillClassNum": "14",
                            "shapeStrokeClassNum": "117",
                            "shapeStrokeWidth": 1,
                            "rXY": "5",
                            "shadowClassNum": "0006"
                        }
                    }
                ]
            },
            { // 두 번째 문제 텍스트
                "x": 150,
                "y": 300,
                "dy": 30,
                "text": "text_index_3",
                "fontSize": 30,
                "classNum": "000",
                "textFocusNum": "0002",
                "focusNum": "0001",
                "option": [{ //텍스트의 $shape{} 부분 정보
                    "type": "rect",
                    "blankI": [
                        0,
                        1
                    ],
                    "meta": {
                        "width": 70,
                        "height": 70,
                        "shapeFillClassNum": "14",
                        "shapeStrokeClassNum": "117",
                        "shapeStrokeWidth": 1,
                        "rXY": "5",
                        "shadowClassNum": "0006"
                    }
                }]
            },
            { // 세 번째 문제 텍스트
                "x": 165,
                "y": 300,
                "dy": 30,
                "text": "text_index_4",
                "fontSize": 30,
                "classNum": "000",
                "textFocusNum": "0002",
                "focusNum": "0001",
                "option": [{
                    "type": "rect",
                    "blankI": [
                        0,
                        5
                    ],
                    "meta": {
                        "width": 70,
                        "height": 70,
                        "shapeFillClassNum": "14",
                        "shapeStrokeClassNum": "117",
                        "shapeStrokeWidth": 1,
                        "rXY": "5",
                        "shadowClassNum": "0006"
                    }
                }]
            }
        ]
    }
    ```

> ## KM000058

    선택하기 (기초독해학습 연습_R&Complex : 지문 읽고 문장 빈칸 낱말 초이스)

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000058",
        "direction": { //지시문
            "text": "text_index_5",
            "classNum": "000",
            "bold": true
        },
        "elements": [], // 배경요소
        "sound": { //지문 사운드
            "url": "sound_index_0",
            "textEndTime": [4, 7.9, 12.3, 14.1, 17.5, 22.4, 26.5, 29.3, 34.3] // 지문에서 열 마다 끝나는 시간 (시간에 맞춰서 focus가 이동함)
        },
        "scroll": { //스크롤 영역에 들어가는 정보
            "area": { //스크롤 영역 크기
                "x": 20, // x의 시작점
                "y": 80, // y의 시작점
                "x2": 730, // x의 끝점
                "y2": 500, // y의 끝점
                "fillClassNum": "0012", // 영역의 채우기 색
                "strokeClassNum": "no" // 영역의 선 색
            },
            "elements": [{ // 배경 처럼 깔리는 엘리먼트 (반응이 없는 element)
                "type": "image",
                "meta": {
                    "cx": 600,
                    "cy": 300,
                    "imgUrl": "image_index_0",
                    "imgScale": 0.8
                }
            }, {
                "type": "image",
                "meta": {
                    "cx": 500,
                    "cy": 780,
                    "imgUrl": "image_index_1",
                    "imgScale": 1
                }
            }],
            "focusText": [{ //focus가 진행될 text
                "text": "text_index_1", // [봄]
                "x": 375,
                "y": 130,
                "classNum": "91",
                "fontSize": 55,
                "dy": 55,
                "textLength": 0,
                "bold": true,
                "center": true
            }, {
                "text": "text_index_2", // [우리아기는 아래 $option{발치}에서 코올코올] : text 등록 시 줄바꿈을 하면 자동으로 focus도 다음 줄로 생성됨, text를 줄마다 따로 넣으셔도 됩니다.
                "x": 100,
                "y": 240,
                "classNum": "91",
                "fontSize": 30,
                "dy": 45,
                "textLength": 0,
                "options": [{
                    "type": "footnote", // 각주 생성 옵션
                    "classNum": "91", // 각주가 된 부분 text 색상
                    "bold": true // 각주가 된 부분 text bold 처리
                }]
            }, {
                "text": "text_index_3", // [고양이는 $option{부뚜막}에서 가릉가릉] : text 등록 시 줄바꿈을 하면 자동으로 focus도 다음 줄로 생성이 되지만 text를 줄마다 따로 등록하셔도 됩니다.
                "x": 100,
                "y": 380,
                "classNum": "91",
                "fontSize": 30,
                "dy": 45,
                "textLength": 0,
                "options": [{
                    "type": "footnote", // 각주 생성 옵션
                    "classNum": "91", // 각주가 된 부분 text 색상
                    "bold": true  // 각주가 된 부분 text bold 처리
                }]
            }, {
                "text": "text_index_4",  // [아기 바람이 나뭇가지에서 소올소올]
                "x": 100,
                "y": 550,
                "classNum": "91",
                "fontSize": 30,
                "dy": 45,
                "textLength": 0
            }, {
                "text": "text_index_5",  // [아저씨 해님이 하늘 한가운데서 째앵째앵]
                "x": 100,
                "y": 690,
                "classNum": "91",
                "fontSize": 30,
                "dy": 45,
                "textLength": 0
            }],
            "footNoteInfo": [{ // 각주 클릭시 팝업 정보 (위에 등록한 각주 순서에 따라 하나씩 적용)
                "bgImage": { //팝업의 배경으로 쓰일 이미지
                    "url": "image_index_2",
                    "scale": 1
                },
                "elements": [{ //팝업 안 내용
                    "type": "text",
                    "meta": {
                        "text": "text_index_6", //발치[발치]
                        "classNum": "91",
                        "fontSize": 30,
                        "options": [{
                            "type": "color",
                            "classNum": "91",
                            "fontSize": 50, //앞에 발치 크기 키우기
                            "bold": true
                        }],
                        "x": 180,
                        "y": 160
                    }
                }, {
                    "type": "text",
                    "meta": {
                        "text": "text_index_7", //발이 있는 쪽
                        "classNum": "91",
                        "fontSize": 25,
                        "x": 180,
                        "y": 250
                    }
                }]
            }, {
                "bgImage": { //팝업의 배경으로 쓰일 이미지
                    "url": "image_index_2",
                    "scale": 1
                },
                "elements": [{
                    "type": "text",
                    "meta": {
                        "text": "text_index_8", //부뚜막[부뚜막]
                        "classNum": "91",
                        "fontSize": 30,
                        "x": 180,
                        "y": 160,
                        "options": [{
                            "type": "color",
                            "classNum": "91",
                            "fontSize": 50, //앞에 부뚜막 크기 키우기
                            "bold": true
                        }]
                    }
                }, {
                    "type": "text",
                    "meta": {
                        "text": "text_index_9", //불을 때기 위해 만든 구멍 위에 흙과 돌을 \n쌓아 솥을 걸어 놓는 곳.
                        "classNum": "91",
                        "fontSize": 25,
                        "x": 180,
                        "y": 250
                    }
                }]
            }]
        },
        "question": { //문제 부분
            "direction": { //문제 부분 지시문
                "text": "text_index_0",
                "classNum": "000",
                "bold": true
            },
            "elements": [{ // 배경 처럼 깔리는 엘리먼트 (반응이 없는 element) :토끼와 거북 이미지4개
                    "type": "image",
                    "meta": {
                        "cx": 130,
                        "cy": 150,
                        "ImgUrl": "image_index_1",
                        "ImgScale": 0.9
                    }
                },
                {
                    "type": "image",
                    "meta": {
                        "cx": 310,
                        "cy": 150,
                        "ImgUrl": "image_index_2",
                        "ImgScale": 0.9
                    }
                },
                {
                    "type": "image",
                    "meta": {
                        "cx": 490,
                        "cy": 150,
                        "ImgUrl": "image_index_3",
                        "ImgScale": 0.9
                    }
                },
                {
                    "type": "image",
                    "meta": {
                        "cx": 670,
                        "cy": 150,
                        "ImgUrl": "image_index_4",
                        "ImgScale": 0.9
                    }
                }
            ],
            "choice": [ // choice element 배열 (해당 배열의 수에 따라 choice 문제의 수가 결정)
                {  // 첫번째 초이스 정보
                    "hintCount": 0,  // 힌트 유무(0 없음, 1 있음)
                    "ansIndex": 0,
                    "bgRect": { // 초이스 바탕 깔리는 사각형
                        "type": "rect",
                        "meta": {}
                    },
                    "elements": [{ // 첫번째 보기 배열
                        "type": "text",
                            "meta": {
                                "cx": 150,
                                "text": "달리기" //[필수]
                            }
                        },
                        {
                            "type": "text",
                            "meta": {
                                "cx": 370,
                                "text": "기어갑니다" //[필수]
                            }
                        },
                        {
                            "type": "text",
                            "meta": {
                                "cx": 620,
                                "text": "뛰어갑니다" //[필수]
                            }
                        }
                    ]
                },
                { // 두번째 초이스 정보
                    "hintCount": 0,
                    "ansIndex": 2,
                    "bgRect": {
                        "type": "rect",
                        "meta": {}
                    },
                    "elements": [{  // 두번째 보기 배열
                        "type": "text",
                            "meta": {
                                "cx": 150,
                                "text": "달리기" //[필수]
                            }
                        },
                        {
                            "type": "text",
                            "meta": {
                                "cx": 370,
                                "text": "기어갑니다" //[필수]
                            }
                        },
                        {
                            "type": "text",
                            "meta": {
                                "cx": 620,
                                "text": "뛰어갑니다" //[필수]
                            }
                        }
                    ]
                }
            ],
            "choiceCommonMeta": { //초이스의 공통 메타
                "bgRect": { // 초이스 바탕 깔리는 사각형의 메타 (choice.bgRect.meta가 우선 적용되고 없는 속성은 이부분을 참조함 )
                    "width": 750,
                    "height": 80,
                    "shapeFillClassNum": "0040", // 사각형 색
                    "cx": 400,
                    "cy": 440,
                    "rXY": 5
                },
                "elements": { // 초이스 보기의 메타 (choice.elements.meta가 우선 적용되고 없는 속성은 이부분을 참조함)
                    "classNum": "000",
                    "fontSize": 30,
                    "cy": 440
                }
            },
            "lastFeedback": { //초이스 끝나고 마지막 화면 정보
                "soundInfo": {
                    "url": "sound_index_0"
                },
                "elements": [{ //바탕 요소
                        "type": "text",
                        "meta": {
                            "cx": 400,
                            "cy": 350,
                            "text": "text_index_4", //토끼와 거북이 달리기~~
                            "classNum": "000",
                            "fontSize": 30,
                            "options": [{
                                    "type": "color",
                                    "classNum": "0002"
                                },
                                {
                                    "type": "color",
                                    "classNum": "0002"
                                },
                                {
                                    "type": "color",
                                    "classNum": "0002"
                                }
                            ]
                        }
                    },
                    {
                        "type": "image",
                        "meta": {
                            "cx": 100,
                            "cy": 260,
                            "ImgUrl": "image_index_0", //사운드 아이콘
                            "ImgScale": 0.9
                        }
                    }
                ]
            },
            "sentenseBlanks": [ //빈칸 있는 문장
                { // 첫 번째 문제 텍스트
                    "x": 110,
                    "y": 300,
                    "dy": 30,
                    "text": "text_index_1", // 토끼와 거북이 ㅁㅁㅁ 경주를~
                    "fontSize": 30,
                    "classNum": "000",
                    "textFocusNum": "0002",
                    "focusNum": "0001",
                    "option": [{ //텍스트의 $shape{} 부분 정보
                        "type": "rect",
                        "blankI": [
                            0,
                            2
                        ],
                        "meta": {
                            "width": 70,
                            "height": 70,
                            "shapeFillClassNum": "14",
                            "shapeStrokeClassNum": "117",
                            "shapeStrokeWidth": 1,
                            "rXY": "5",
                            "shadowClassNum": "0006"
                        }
                    }]
                },
                {  // 두 번째 문제 텍스트
                    "x": 110,
                    "y": 300,
                    "dy": 30,
                    "text": "text_index_2",
                    "fontSize": 30,
                    "classNum": "000",
                    "textFocusNum": "0002",
                    "focusNum": "0001",
                    "option": [{
                        "type": "rect",
                        "blankI": [
                            0,
                            4
                        ],
                        "meta": {
                            "width": 70,
                            "height": 70,
                            "shapeFillClassNum": "14",
                            "shapeStrokeClassNum": "117",
                            "shapeStrokeWidth": 1,
                            "rXY": "5",
                            "shadowClassNum": "0006"
                        }
                    }]
                },
                { //세 번째 텍스트 (빈칸없을 때, 해당모듈에서는 하단 '다음' 버튼과 같이 나옴)
                    "x": 110,
                    "y": 300,
                    "dy": 5,
                    "text": "text_index_3",
                    "fontSize": 30,
                    "classNum": "000",
                    "textFocusNum": "0002",
                    "focusNum": "0001"
                }
            ]
        }
    }

    ```

> ## KM000059

    Reading + Order
    (Reading 부분은 KM000055, Order 부분은 KM000050과 동일)

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000059",
        "direction": {
            "text": "text_index_0",
            "textLength": 0,
            "bold": true
        },
        "sound": {  //지문 사운드
            "url": "sound_index_0",
            "textEndTime": [4, 7.9, 12.3, 14.1, 17.5, 22.4, 26.5, 29.3, 34.3] // 지문에서 열 마다 끝나는 시간 (시간에 맞춰서 focus가 이동함)
        },
        "scroll": {  //스크롤 영역에 들어가는 정보
            "area": {  //스크롤 영역 크기
                "x": 20,
                "y": 80,
                "x2": 730,
                "y2": 500,
                "fillClassNum": "0012",
                "strokeClassNum": "no"
            },
            "elements": [ // 배경 처럼 깔리는 엘리먼트 (반응이 없는 element)
                {
                    "type": "image",
                    "meta": {
                        "cx": 600,
                        "cy": 300,
                        "imgUrl": "image_index_0",
                        "imgScale": 0.8
                    }
                },
                {
                    "type": "image",
                    "meta": {
                        "cx": 500,
                        "cy": 780,
                        "imgUrl": "image_index_1",
                        "imgScale": 1
                    }
                }
            ],
            "focusText": [ //focus가 진행될 text
                {
                    "text": "text_index_1",
                    "x": 375,
                    "y": 130,
                    "classNum": "91",
                    "fontSize": 55,
                    "dy": 55,
                    "textLength": 0,
                    "bold": true,
                    "center": true
                },
                {
                    "text": "text_index_2",
                    "x": 100,
                    "y": 240,
                    "classNum": "91",
                    "fontSize": 30,
                    "dy": 45,
                    "textLength": 400,
                    "options": [{
                        "type": "footnote",
                        "classNum": "91",
                        "bold": true
                    }]
                },
                {
                    "text": "text_index_3",
                    "x": 100,
                    "y": 380,
                    "classNum": "91",
                    "fontSize": 30,
                    "dy": 45,
                    "textLength": 0,
                    "options": [{
                        "type": "footnote",
                        "classNum": "91",
                        "bold": true
                    }]
                },
                {
                    "text": "text_index_4",
                    "x": 100,
                    "y": 550,
                    "classNum": "91",
                    "fontSize": 30,
                    "dy": 45,
                    "textLength": 0
                },
                {
                    "text": "text_index_5",
                    "x": 100,
                    "y": 690,
                    "classNum": "91",
                    "fontSize": 30,
                    "dy": 45,
                    "textLength": 0
                }
            ],
            "footNoteInfo": [ // 각주 클릭시 팝업 정보 (위에 등록한 각주 순서에 따라 하나씩 적용)
                {
                    "bgImage": {
                        "url": "image_index_2",
                        "scale": 1
                    },
                    "elements": [
                        {
                            "type": "text",
                            "meta": {
                                "text": "text_index_6",
                                "classNum": "91",
                                "fontSize": 30,
                                "options": [{
                                    "type": "color",
                                    "classNum": "91",
                                    "fontSize": 50,
                                    "bold": true
                                    }],
                                "x": 180,
                                "y": 160
                            }
                        },
                        {
                            "type": "text",
                            "meta": {
                                "text": "text_index_7",
                                "classNum": "91",
                                "fontSize": 25,
                                "x": 180,
                                "y": 250
                            }
                        }
                    ]
                },
                {
                    "bgImage": {
                        "url": "image_index_2",
                        "scale": 1
                    },
                    "elements": [
                        {
                            "type": "text",
                            "meta": {
                                "text": "text_index_8",
                                "classNum": "91",
                                "fontSize": 30,
                                "x": 180,
                                "y": 160,
                                "options": [{
                                    "type": "color",
                                    "classNum": "91",
                                    "fontSize": 50,
                                    "bold": true
                                }]
                            }
                        },
                        {
                            "type": "text",
                            "meta": {
                                "text": "text_index_9",
                                "classNum": "91",
                                "fontSize": 25,
                                "x": 180,
                                "y": 250
                            }
                        }
                    ]
                }
            ]
        },
        "question": { // 문제 부분 (Order)
            "direction": { // 문제 부분 지시문
                "text": "text_index_10",
                "x": 120,
                "classNum": "91",
                "fontSize": 25,
                "bold": true,
                "speakerX": 80
            },
            "elements": [ //
                {
                    "type": "rect",
                    "meta": {
                        "cx": 400,
                        "cy": 95,
                        "width": 470,
                        "height": 45,
                        "rXY": 10,
                        "shapeFillClassNum": "14",
                        "shapeStrokeClassNum": "117",
                        "shapeStrokeWidth": 1,
                        "shadowClassNum": "0006"
                    }
                },
                {
                    "type": "text",
                    "meta": {
                        "cx": 400,
                        "cy": 95,
                        "text": "text_index_11",
                        "classNum": "000",
                        "fontSize": 25
                    }
                },
                {
                    "type": "rect",
                    "meta": {
                        "cx": 190,
                        "cy": 153,
                        "width": 45,
                        "height": 45,
                        "rXY": 10,
                        "shapeFillClassNum": "14",
                        "shapeStrokeClassNum": "117",
                        "shapeStrokeWidth": 1
                    }
                },
                {
                    "type": "text",
                    "meta": {
                        "cx": 190,
                        "cy": 153,
                        "text": "1",
                        "classNum": "0006",
                        "fontSize": 25
                    }
                },
                {
                    "type": "rect",
                    "meta": {
                        "cx": 435,
                        "cy": 153,
                        "width": 400,
                        "height": 45,
                        "rXY": 10,
                        "shapeFillClassNum": "14",
                        "shapeStrokeClassNum": "117",
                        "shapeStrokeWidth": 1,
                        "shadowClassNum": "0006"
                    }
                },
                {
                    "type": "text",
                    "meta": {
                        "cx": 435,
                        "cy": 153,
                        "text": "text_index_12",
                        "classNum": "000",
                        "fontSize": 25
                    }
                },
                {
                    "type": "rect",
                    "meta": {
                        "cx": 190,
                        "cy": 211,
                        "width": 45,
                        "height": 45,
                        "rXY": 10,
                        "shapeFillClassNum": "14",
                        "shapeStrokeClassNum": "117",
                        "shapeStrokeWidth": 1
                    }
                },
                {
                    "type": "text",
                    "meta": {
                        "cx": 190,
                        "cy": 211,
                        "text": "2",
                        "classNum": "0006",
                        "fontSize": 25
                    }
                },
                {
                    "type": "rect",
                    "meta": {
                        "cx": 435,
                        "cy": 211,
                        "width": 400,
                        "height": 45,
                        "rXY": 10,
                        "shapeFillClassNum": "14",
                        "shapeStrokeClassNum": "117",
                        "shapeStrokeWidth": 1,
                        "shadowClassNum": "0006"
                    }
                },
                {
                    "type": "text",
                    "meta": {
                        "cx": 435,
                        "cy": 211,
                        "text": "text_index_13",
                        "classNum": "000",
                        "fontSize": 25
                    }
                },
                {
                    "type": "rect",
                    "meta": {
                        "cx": 190,
                        "cy": 269,
                        "width": 45,
                        "height": 45,
                        "rXY": 10,
                        "shapeFillClassNum": "14",
                        "shapeStrokeClassNum": "117",
                        "shapeStrokeWidth": 1
                    }
                },
                {
                    "type": "text",
                    "meta": {
                        "cx": 190,
                        "cy": 269,
                        "text": "3",
                        "classNum": "0006",
                        "fontSize": 25
                    }
                },
                {
                    "type": "rect",
                    "meta": {
                        "cx": 435,
                        "cy": 269,
                        "width": 400,
                        "height": 45,
                        "rXY": 10,
                        "shapeFillClassNum": "14",
                        "shapeStrokeClassNum": "117",
                        "shapeStrokeWidth": 1,
                        "shadowClassNum": "0006"
                    }
                },
                {
                    "type": "text",
                    "meta": {
                        "cx": 435,
                        "cy": 269,
                        "text": "text_index_14",
                        "classNum": "000",
                        "fontSize": 25
                    }
                }
            ],
            "order": { // order
                "type": "h", // order type
                "ans": [1, 2, 0],
                "numbering": [
                    [{ // 첫 번째
                        "type": "rect",
                        "meta": {
                            "cx": 160,
                            "cy": 330,
                            "width": 170,
                            "height": 40,
                            "rXY": 10,
                            "shapeFillClassNum": "14",
                            "shapeStrokeClassNum": "117",
                            "shapeStrokeWidth": 1
                        }
                    }, {
                        "type": "text",
                        "meta": {
                            "cx": 160,
                            "cy": 330,
                            "text": "1",
                            "classNum": "0006",
                            "fontSize": 25
                        }
                    }],
                    [{ // 두 번째
                        "type": "rect",
                        "meta": {
                            "cx": 370,
                            "cy": 330,
                            "width": 170,
                            "height": 40,
                            "rXY": 10,
                            "shapeFillClassNum": "14",
                            "shapeStrokeClassNum": "117",
                            "shapeStrokeWidth": 1
                        }
                    }, {
                        "type": "text",
                        "meta": {
                            "cx": 370,
                            "cy": 330,
                            "text": "2",
                            "classNum": "0006",
                            "fontSize": 25
                        }
                    }],
                    [{ // 세 번째
                        "type": "rect",
                        "meta": {
                            "cx": 580,
                            "cy": 330,
                            "width": 170,
                            "height": 40,
                            "rXY": 10,
                            "shapeFillClassNum": "14",
                            "shapeStrokeClassNum": "117",
                            "shapeStrokeWidth": 1
                        }
                    }, {
                        "type": "text",
                        "meta": {
                            "cx": 580,
                            "cy": 330,
                            "text": "3",
                            "classNum": "0006",
                            "fontSize": 25
                        }
                    }]
                ],
                "dragEl": [
                    { // 첫 번째
                        "elements": [{
                            "type": "rect",
                            "meta": {
                                "cx": 160,
                                "cy": 420,
                                "width": 170,
                                "height": 115,
                                "rXY": 10,
                                "shapeFillClassNum": "14",
                                "shapeStrokeClassNum": "117",
                                "shadowClassNum": "0006",
                                "shapeStrokeWidth": 1
                            }
                        }, {
                            "type": "image",
                            "meta": {
                                "cx": 160,
                                "cy": 420,
                                "ImgUrl": "image_index_3",
                                "ImgScale": 0.45
                            }
                        }]
                    },
                    { // 두 번째
                        "elements": [{
                            "type": "rect",
                            "meta": {
                                "cx": 370,
                                "cy": 420,
                                "width": 170,
                                "height": 115,
                                "rXY": 10,
                                "shapeFillClassNum": "14",
                                "shapeStrokeClassNum": "117",
                                "shadowClassNum": "0006",
                                "shapeStrokeWidth": 1
                            }
                        }, {
                            "type": "image",
                            "meta": {
                                "cx": 370,
                                "cy": 420,
                                "ImgUrl": "image_index_4",
                                "ImgScale": 0.45
                            }
                        }]
                    },
                    { // 세 번째
                        "elements": [{
                            "type": "rect",
                            "meta": {
                                "cx": 580,
                                "cy": 420,
                                "width": 170,
                                "height": 115,
                                "rXY": 10,
                                "shapeFillClassNum": "14",
                                "shapeStrokeClassNum": "117",
                                "shadowClassNum": "0006",
                                "shapeStrokeWidth": 1
                            }
                        }, {
                            "type": "image",
                            "meta": {
                                "cx": 580,
                                "cy": 420,
                                "ImgUrl": "image_index_5",
                                "ImgScale": 0.45
                            }
                        }]
                    }
                ],
                "dragArea": [10, 330, 740, 490]
            },
            "helpPopUp": { // 도움말 팝업
                "popUpSize": {
                    "width": 640,
                    "height": 380,
                    "rXY": 10
                },
                "elements": [{
                    "type": "image",
                    "meta": {
                        "cx": 600,
                        "cy": 370,
                        "ImgUrl": "image_index_6",
                        "ImgScale": 0.3
                    }
                }, {
                    "type": "speechBubble",
                    "meta": {
                        "cx": 350,
                        "cy": 355,
                        "width": 290,
                        "height": 110,
                        "rXY": 15,
                        "type": "r"
                    }
                }, {
                    "type": "text",
                    "meta": {
                        "cx": 340,
                        "cy": 355,
                        "text": "text_index_15",
                        "classNum": "000",
                        "fontSize": 20,
                        "dy": 30
                    }
                }, {
                    "type": "rect",
                    "meta": {
                        "cx": 400,
                        "cy": 210,
                        "width": 565,
                        "height": 140,
                        "rXY": 10,
                        "shapeFillClassNum": "14",
                        "shapeStrokeClassNum": "no",
                        "shapeStrokeWidth": 1
                    }
                }],
                "orderHint": { // order 힌트
                    "hintIndex": [0, 1],
                    "hintEl": [
                        [{ // 첫 번째
                            "type": "rect",
                            "meta": {
                                "cx": 225,
                                "cy": 210,
                                "width": 145,
                                "height": 95,
                                "rXY": 10,
                                "shapeFillClassNum": "14",
                                "shapeStrokeClassNum": "117",
                                "shadowClassNum": "0006",
                                "shapeStrokeWidth": 1
                            }
                        }, {
                            "type": "image",
                            "meta": {
                                "cx": 225,
                                "cy": 210,
                                "ImgUrl": "image_index_3",
                                "ImgScale": 0.37
                            }
                        }],
                        [{ // 두 번째
                            "type": "rect",
                            "meta": {
                                "cx": 400,
                                "cy": 210,
                                "width": 145,
                                "height": 95,
                                "rXY": 10,
                                "shapeFillClassNum": "14",
                                "shapeStrokeClassNum": "117",
                                "shadowClassNum": "0006",
                                "shapeStrokeWidth": 1
                            }
                        }, {
                            "type": "image",
                            "meta": {
                                "cx": 400,
                                "cy": 210,
                                "ImgUrl": "image_index_4",
                                "ImgScale": 0.37
                            }
                        }],
                        [{ // 세 번째
                            "type": "rect",
                            "meta": {
                                "cx": 575,
                                "cy": 210,
                                "width": 145,
                                "height": 95,
                                "rXY": 10,
                                "shapeFillClassNum": "14",
                                "shapeStrokeClassNum": "117",
                                "shadowClassNum": "0006",
                                "shapeStrokeWidth": 1
                            }
                        }, {
                            "type": "image",
                            "meta": {
                                "cx": 575,
                                "cy": 210,
                                "ImgUrl": "image_index_5",
                                "ImgScale": 0.37
                            }
                        }]
                    ],
                    "type": "h" // 순서 힌트 타입
                }
            },
            "helpButton": { // 도움말 버튼 위치
                "cx": 755,
                "cy": 380
            }
        }
    }

    ```

> ## KM000060

    선택하기 (기초독해학습 연습_R&Complex : 지시문 보고 문장 빈칸 낱말 초이스)

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000060",
        "direction": { //지시문
            "text": "text_index_5",
            "classNum": "000",
            "bold": true
        },
        "elements": [], // 배경요소
        "sound": { //지문 사운드
            "url": "sound_index_0",
            "textEndTime": [4, 7.9, 12.3, 14.1, 17.5, 22.4, 26.5, 29.3, 34.3] // 지문에서 열 마다 끝나는 시간 (시간에 맞춰서 focus가 이동함)
        },
        "scroll": { //스크롤 영역에 들어가는 정보
            "area": { //스크롤 영역 크기
                "x": 20, // x의 시작점
                "y": 80, // y의 시작점
                "x2": 730, // x의 끝점
                "y2": 500, // y의 끝점
                "fillClassNum": "0012", // 영역의 채우기 색
                "strokeClassNum": "no" // 영역의 선 색
            },
            "elements": [{ // 배경 처럼 깔리는 엘리먼트 (반응이 없는 element)
                "type": "image",
                "meta": {
                    "cx": 600,
                    "cy": 300,
                    "imgUrl": "image_index_0",
                    "imgScale": 0.8
                }
            }, {
                "type": "image",
                "meta": {
                    "cx": 500,
                    "cy": 780,
                    "imgUrl": "image_index_1",
                    "imgScale": 1
                }
            }],
            "focusText": [{ //focus가 진행될 text
                "text": "text_index_1", // [봄]
                "x": 375,
                "y": 130,
                "classNum": "91",
                "fontSize": 55,
                "dy": 55,
                "textLength": 0,
                "bold": true,
                "center": true
            }, {
                "text": "text_index_2", // [우리아기는 아래 $option{발치}에서 코올코올] : text 등록 시 줄바꿈을 하면 자동으로 focus도 다음 줄로 생성됨, text를 줄마다 따로 넣으셔도 됩니다.
                "x": 100,
                "y": 240,
                "classNum": "91",
                "fontSize": 30,
                "dy": 45,
                "textLength": 0,
                "options": [{
                    "type": "footnote", // 각주 생성 옵션
                    "classNum": "91", // 각주가 된 부분 text 색상
                    "bold": true // 각주가 된 부분 text bold 처리
                }]
            }, {
                "text": "text_index_3", // [고양이는 $option{부뚜막}에서 가릉가릉] : text 등록 시 줄바꿈을 하면 자동으로 focus도 다음 줄로 생성이 되지만 text를 줄마다 따로 등록하셔도 됩니다.
                "x": 100,
                "y": 380,
                "classNum": "91",
                "fontSize": 30,
                "dy": 45,
                "textLength": 0,
                "options": [{
                    "type": "footnote", // 각주 생성 옵션
                    "classNum": "91", // 각주가 된 부분 text 색상
                    "bold": true  // 각주가 된 부분 text bold 처리
                }]
            }, {
                "text": "text_index_4",  // [아기 바람이 나뭇가지에서 소올소올]
                "x": 100,
                "y": 550,
                "classNum": "91",
                "fontSize": 30,
                "dy": 45,
                "textLength": 0
            }, {
                "text": "text_index_5",  // [아저씨 해님이 하늘 한가운데서 째앵째앵]
                "x": 100,
                "y": 690,
                "classNum": "91",
                "fontSize": 30,
                "dy": 45,
                "textLength": 0
            }],
            "footNoteInfo": [{ // 각주 클릭시 팝업 정보 (위에 등록한 각주 순서에 따라 하나씩 적용)
                "bgImage": { //팝업의 배경으로 쓰일 이미지
                    "url": "image_index_2",
                    "scale": 1
                },
                "elements": [{ //팝업 안 내용
                    "type": "text",
                    "meta": {
                        "text": "text_index_6", //발치[발치]
                        "classNum": "91",
                        "fontSize": 30,
                        "options": [{
                            "type": "color",
                            "classNum": "91",
                            "fontSize": 50, //앞에 발치 크기 키우기
                            "bold": true
                        }],
                        "x": 180,
                        "y": 160
                    }
                }, {
                    "type": "text",
                    "meta": {
                        "text": "text_index_7", //발이 있는 쪽
                        "classNum": "91",
                        "fontSize": 25,
                        "x": 180,
                        "y": 250
                    }
                }]
            }, {
                "bgImage": { //팝업의 배경으로 쓰일 이미지
                    "url": "image_index_2",
                    "scale": 1
                },
                "elements": [{
                    "type": "text",
                    "meta": {
                        "text": "text_index_8", //부뚜막[부뚜막]
                        "classNum": "91",
                        "fontSize": 30,
                        "x": 180,
                        "y": 160,
                        "options": [{
                            "type": "color",
                            "classNum": "91",
                            "fontSize": 50, //앞에 부뚜막 크기 키우기
                            "bold": true
                        }]
                    }
                }, {
                    "type": "text",
                    "meta": {
                        "text": "text_index_9", //불을 때기 위해 만든 구멍 위에 흙과 돌을 \n쌓아 솥을 걸어 놓는 곳.
                        "classNum": "91",
                        "fontSize": 25,
                        "x": 180,
                        "y": 250
                    }
                }]
            }]
        },
        "question": { // 문제 부분
        "direction": { //문제 부분 지시문
            "text": "text_index_10",
            "classNum": "000",
            "bold": true,
            "textLength": 500,
            "fontSize": 25,
            "dy": 40
        },
        "elements": [ // 문제 부분 배경요소 (반응X)
            {
            "type": "image",
            "meta": {
                "cx": 400,
                "cy": 185,
                "ImgUrl": "image_index_4", //눈사람
                "ImgScale": 0.6
            }
            }
        ],
        "choice": [// choice element 배열 (해당 배열의 수에 따라 choice 문제의 수가 결정)
            { // 초이스 정보
            "hintCount": 0,
            "ansIndex": 1,
            "bgRect": { // 초이스 텍스트 바탕 렉트
                "type": "rect",
                "meta": {
                "width": 750,
                "height": 80,
                "cx": 400,
                "cy": 440,
                "rXY": 5,
                "shapeFillClassNum": "0040"
                }
            },
            "elements": [
                { // 첫번째 보기
                "type": "text",
                "meta": {
                    "cx": 200,
                    "text": "큽니다",
                    "fontSize": 30,
                    "cy": 440,
                    "classNum": "000"
                }
                },
                { // 두번째 보기
                "type": "text",
                "meta": {
                    "cx": 600,
                    "text": "작습니다",
                    "fontSize": 30,
                    "cy": 440,
                    "classNum": "000",
                }
                }
            ]
            }
        ],
        "lastFeedback": { //초이스 끝나고 마지막 화면
            "soundInfo": { //사운드
            "url": "sound_index_1"
            },
            "elements": [
            {
                "type": "image",
                "meta": {
                "cx": 175,
                "cy": 260,
                "ImgUrl": "image_index_0", //스피커 아이콘
                "ImgScale": 0.9
                }
            }
            ]
        },
        "sentenseBlanks": [ //빈칸 있는 문장
            {
            "x": 160,
            "y": 300,
            "dy": 30,
            "text": "text_index_11",
            "fontSize": 30,
            "classNum": "000",
            "textFocusNum": "0002",
            "focusNum": "0001",
            "option": [
                {
                "type": "rect",
                "blankI": [
                    0,
                    3
                ],
                "meta": {
                    "width": 70,
                    "height": 70,
                    "shapeFillClassNum": "14",
                    "shapeStrokeClassNum": "117",
                    "shapeStrokeWidth": 1,
                    "rXY": "5",
                    "shadowClassNum": "0006"
                }
                }
            ]
            }
        ]
        }
    }
    ```

> ## KM000061

    연습_Reading + Match

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000061",
        "direction": {
            "text": "text_index_0",
            "classNum": "000",
            "bold": true
        },
        "sound": {
            "url": "sound_index_0",
            "textEndTime": [
            4,
            7.9,
            12.3,
            14.1,
            17.5,
            22.4,
            26.5,
            29.3,
            34.3
            ]
        },
        "scroll": {
            "area": {
            "x": 20,
            "y": 80,
            "x2": 730,
            "y2": 500,
            "fillClassNum": "0012",
            "strokeClassNum": "no"
            },
            "elements": [
            {
                "type": "image",
                "meta": {
                "cx": 600,
                "cy": 300,
                "imgUrl": "image_index_0",
                "imgScale": 0.8
                }
            },
            {
                "type": "image",
                "meta": {
                "cx": 500,
                "cy": 780,
                "imgUrl": "image_index_1",
                "imgScale": 1
                }
            }
            ],
            "focusText": [
            {
                "text": "text_index_1",
                "x": 375,
                "y": 130,
                "classNum": "91",
                "fontSize": 55,
                "dy": 55,
                "textLength": 0,
                "bold": true,
                "center": true
            },
            {
                "text": "text_index_2",
                "x": 100,
                "y": 240,
                "classNum": "91",
                "fontSize": 30,
                "dy": 45,
                "textLength": 400,
                "options": [
                {
                    "type": "footnote",
                    "classNum": "91",
                    "bold": true
                }
                ]
            },
            {
                "text": "text_index_3",
                "x": 100,
                "y": 380,
                "classNum": "91",
                "fontSize": 30,
                "dy": 45,
                "textLength": 0,
                "options": [
                {
                    "type": "footnote",
                    "classNum": "91",
                    "bold": true
                }
                ]
            },
            {
                "text": "text_index_4",
                "x": 100,
                "y": 550,
                "classNum": "91",
                "fontSize": 30,
                "dy": 45,
                "textLength": 0
            },
            {
                "text": "text_index_5",
                "x": 100,
                "y": 690,
                "classNum": "91",
                "fontSize": 30,
                "dy": 45,
                "textLength": 0
            }
            ],
            "footNoteInfo": [
            {
                "bgImage": {
                "url": "image_index_2",
                "scale": 1
                },
                "elements": [
                {
                    "type": "text",
                    "meta": {
                    "text": "text_index_6",
                    "classNum": "91",
                    "fontSize": 30,
                    "options": [
                        {
                        "type": "color",
                        "classNum": "91",
                        "fontSize": 50,
                        "bold": true
                        }
                    ],
                    "x": 180,
                    "y": 160
                    }
                },
                {
                    "type": "text",
                    "meta": {
                    "text": "text_index_7",
                    "classNum": "91",
                    "fontSize": 25,
                    "x": 180,
                    "y": 250
                    }
                }
                ]
            },
            {
                "bgImage": {
                "url": "image_index_2",
                "scale": 1
                },
                "elements": [
                {
                    "type": "text",
                    "meta": {
                    "text": "text_index_8",
                    "classNum": "91",
                    "fontSize": 30,
                    "x": 180,
                    "y": 160,
                    "options": [
                        {
                        "type": "color",
                        "classNum": "91",
                        "fontSize": 50,
                        "bold": true
                        }
                    ]
                    }
                },
                {
                    "type": "text",
                    "meta": {
                    "text": "text_index_9",
                    "classNum": "91",
                    "fontSize": 25,
                    "x": 180,
                    "y": 250
                    }
                }
                ]
            }
            ]
        },
        "question": {
            "direction": {
            "text": "text_index_10",
            "classNum": "000",
            "bold": true
            },
            "connectElement": {
            "leftEl": [
                {
                "elements": [
                    {
                    "type": "image",
                    "meta": {
                        "cx": 150,
                        "cy": 174,
                        "ImgUrl": "image_index_3",
                        "ImgScale": 1.8
                    }
                    },
                    {
                    "type": "text",
                    "meta": {
                        "cx": 150,
                        "cy": 244,
                        "text": "text_index_11",
                        "classNum": "000",
                        "fontSize": 28
                    }
                    }
                ],
                "connectAnsIndex": 1,
                "connectDotOffsets": {
                    "x": 30,
                    "y": 0
                }
                },
                {
                "elements": [
                    {
                    "type": "image",
                    "meta": {
                        "cx": 150,
                        "cy": 340,
                        "ImgUrl": "image_index_4",
                        "ImgScale": 1.8
                    }
                    },
                    {
                    "type": "text",
                    "meta": {
                        "cx": 150,
                        "cy": 410,
                        "text": "text_index_12",
                        "classNum": "000",
                        "fontSize": 28
                    }
                    }
                ],
                "connectAnsIndex": 0,
                "connectDotOffsets": {
                    "x": 30,
                    "y": 0
                }
                }
            ],
            "rightEl": [
                {
                "element": [
                    {
                    "type": "rect",
                    "meta": {
                        "cx": 640,
                        "cy": 194,
                        "width": 120,
                        "height": 80,
                        "rXY": 10,
                        "shapeFillClassNum": "14",
                        "shapeStrokeClassNum": "no",
                        "shapeOpacity": 1,
                        "shapeStrokeWidth": 0,
                        "shapeIsDashArray": false,
                        "shadowClassNum": "0006"
                    }
                    },
                    {
                    "type": "text",
                    "meta": {
                        "cx": 640,
                        "cy": 194,
                        "text": "text_index_13",
                        "classNum": "000",
                        "fontSize": 40
                    }
                    }
                ],
                "connectDotOffsets": {
                    "x": -30,
                    "y": 0
                }
                },
                {
                "element": [
                    {
                    "type": "rect",
                    "meta": {
                        "cx": 640,
                        "cy": 364,
                        "width": 120,
                        "height": 80,
                        "rXY": 10,
                        "shapeFillClassNum": "14",
                        "shapeStrokeClassNum": "no",
                        "shapeOpacity": 1,
                        "shapeStrokeWidth": 0,
                        "shapeIsDashArray": false,
                        "shadowClassNum": "0006"
                    }
                    },
                    {
                    "type": "text",
                    "meta": {
                        "cx": 640,
                        "cy": 364,
                        "text": "text_index_14",
                        "classNum": "000",
                        "fontSize": 40
                    }
                    }
                ],
                "connectDotOffsets": {
                    "x": -30,
                    "y": 0
                }
                }
            ],
            "lineClassNum": "04",
            "hintCount": 0,
            "handHint": false
            },
            "visible": false
        }
    }
    ```

> ## KM000062

    drag (DIW_W)

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000062",
        "direction": { //지시문
            "text": "text_index_0",
            "bold": true
        },
        "elements": [{ // 배경 처럼 깔리는 엘리먼트 (반응이 없는 element)
            "type": "rect", //드래그 엘리먼트 아래의 rect
            "meta": {
                "cx": 400,
                "cy": 150,
                "width": 640,
                "height": 120,
                "shapeFillClassNum": "14",
                "shapeStrokeClassNum": "no",
                "rXY": 20,
                "shadowClassNum": "0006"
            }
        }, {
            "type": "image",
            "meta": {
                "cx": 240,
                "cy": 350,
                "imgUrl": "image_index_0", //표범 이미지
                "imgScale": 0.5
            }
        }],
        "drag": { // drag element
            "elements": [
                [{ //첫번째 엘리먼트 (배열안에 여러 element 추가 및 활용 가능)
                    "type": "text",
                    "meta": {
                        "text": "고무",
                        "cx": 135,
                        "cy": 150,
                        "classNum": "91",
                        "fontSize": 40
                    },
                    "isQ": true // 엘리먼트 중 단어에 해당하는 text인지 여부파악을 위해 추가 -> 이후 피드백에 사용
                }],
                [{ //두번째 엘리먼트
                    "type": "text",
                    "meta": {
                        "text": "꿀",
                        "cx": 230,
                        "cy": 150,
                        "classNum": "91",
                        "fontSize": 40
                    },
                    "isQ": true // 엘리먼트 중 단어에 해당하는 text인지 여부파악을 위해 추가 -> 이후 피드백에 사용
                }],
                [{ //세번째 엘리먼트
                    "type": "text",
                    "meta": {
                        "text": "연필",
                        "cx": 325,
                        "cy": 150,
                        "classNum": "91",
                        "fontSize": 40
                    },
                    "isQ": true // 엘리먼트 중 단어에 해당하는 text인지 여부파악을 위해 추가 -> 이후 피드백에 사용
                }],
                [{ //네번째 엘리먼트
                    "type": "text",
                    "meta": {
                        "text": "바다",
                        "cx": 440,
                        "cy": 150,
                        "classNum": "91",
                        "fontSize": 40
                    },
                    "isQ": true // 엘리먼트 중 단어에 해당하는 text인지 여부파악을 위해 추가 -> 이후 피드백에 사용
                }],
                [{ //다섯번째 엘리먼트
                    "type": "text",
                    "meta": {
                        "text": "김치",
                        "cx": 555,
                        "cy": 150,
                        "classNum": "91",
                        "fontSize": 40
                    },
                    "isQ": true // 엘리먼트 중 단어에 해당하는 text인지 여부파악을 위해 추가 -> 이후 피드백에 사용
                }], ////여섯번째 엘리먼트
                [{
                    "type": "text",
                    "meta": {
                        "text": "미역",
                        "cx": 670,
                        "cy": 150,
                        "classNum": "91",
                        "fontSize": 40
                    },
                    "isQ": true // 엘리먼트 중 단어에 해당하는 text인지 여부파악을 위해 추가 -> 이후 피드백에 사용
                }]
            ],
            "drop": [{ //drop 관련 정보 (drag한 element를 놓아줄 장소)
                "dropBox": { // element를 놓기 위한 공간
                    "type": "rect", // (text은 rect와 circle만 적용됨, 메타는 createElement와 동일)
                    "meta": {
                        "cx": 510,
                        "cy": 350,
                        "width": 120,
                        "height": 80
                    }
                },
                "answer": { // 정답에 대한 정보
                    "index": 3, //drag element에서 해당 공간에 들어갈 정답의 인덱스
                    "textInfo": { //정답 시 피드백으로 나타날 text의 색상과 사이즈 변경 정보
                        "classNum": "000",
                        "fontSize": 40
                    }
                }
            }, {
                "dropBox": { // element를 놓기 위한 공간
                    "type": "rect", // (text은 rect와 circle만 적용됨, 메타는 createElement와 동일)
                    "meta": {
                        "cx": 633,
                        "cy": 350,
                        "width": 120,
                        "height": 80
                    }
                },
                "answer": {
                    "index": "no", //drag element에서 해당 공간에 들어갈 정답의 인덱스 ('no'로 할 때는 문제로 인식되지 않고 처음부터 입력되서 나옴)
                    "textInfo": { //정답 시 피드백으로 나타날 text의 색상과 사이즈 변경 정보
                        "text": "표범", //정답의 인덱스가 'no'일 때 보여질 text
                        "classNum": "91",
                        "fontSize": 40
                    }
                }
            }],
            "isStepAction": false //빈칸들을 단계별로 drag 할 것인지 여부 (true면 한번에 모든 빈칸 활성화)
        }
    }
    ```

> ## KM000063

    Speaking

-   ### 기본 포맷

```javascript
   {
       "questionType": "KM000063",
       "direction": { // 지시문
           "text": "text_index_0",
           "bold": true
       },
       "firstContent": { // 첫 번째 화면 (펼쳐지기 전 책)
           "elements": [ // 첫 번째 화면에 들어갈 elements
           {
               "type": "image",
               "meta": {
                   "cx": 400,
                   "cy": 280,
                   "imgUrl": "image_index_0",
                   "imgScale": 0.8
               }
           },
           {
               "type": "text",
               "meta": {
                   "cx": 410,
                   "cy": 240,
                   "text": "봄",
                   "classNum": "14",
                   "fontSize": 70,
                   "bold": true
               }
           }
           ],
           "hint": { // 힌트 손가락 위치
               "x": 460,
               "y": 310
           }
       },
       "secondContent": { // 두 번째 화면 (펼쳐진 책)
           "elements": [ // 두 번째 화면에 들어갈 elements
           {
               "type": "image",
               "meta": {
                   "cx": 400,
                   "cy": 280,
                   "imgUrl": "image_index_1",
                   "imgScale": 0.8
               }
           },
           {
               "type": "text",
               "meta": {
                   "cx": 285,
                   "cy": 240,
                   "text": "봄",
                   "classNum": "0002",
                   "fontSize": 70,
                   "bold": true
               }
           },
           {
               "type": "image",
               "meta": {
                   "imgUrl": "image_index_2",
                   "imgScale": 0.57,
                   "cx": 555,
                   "cy": 283
               }
           }
           ],
           "moveTo": { // elements 움직여질 위치, 스케일, delayTime 정보
               "cx": 400,
               "cy": 170,
               "scale": 0.6,
               "delayTime": 300 // 0.3초 후에 움직이기 시작
           }
       },
       "soundButton": { // 두 번째 화면의 사운드 버튼 (텍스트 포함)
           "elements": [
           {
               "type": "rect",
               "meta": {
               "cx": 400,
               "cy": 330,
               "width": 640,
               "height": 100,
               "rXY": 10,
               "shapeFillClassNum": "14",
               "shapeStrokeClassNum": "117",
               "shapeStrokeWidth": 1,
               "shadowClassNum": "0006"
               }
           },
           {
               "type": "text",
               "meta": {
                   "cx": 400,
                   "cy": 330,
                   "text": "text_index_1",
                   "classNum": "000",
                   "fontSize": 25,
                   "options": [
                       {
                           "type": "color",
                           "classNum": "0002"
                       }
                   ],
                   "lineCenter": true,
                   "dy": 40,
                   "textLength": 650
               }
           }
           ],
           "sound": { // 사운드 버튼 위치
               "cx": 105,
               "cy": 305,
               "ttsText": "text_index_1" // tts일 때 해당 텍스트 정보
           }
       }
   }

```

> ## KM000064

    Reading + Choose

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000064",
        "direction": { //지시문
            "text": "text_index_0",
            "bold": true
        },
        "sound": { //지문 사운드
            "url": "sound_index_0",
            "textEndTime": [4, 7.9, 12.3, 14.1, 17.5, 22.4, 26.5, 29.3, 34.3] // 지문에서 열 마다 끝나는 시간 (시간에 맞춰서 focus가 이동함)
        },
        "scroll": { //스크롤 영역에 들어가는 정보
            "area": { //스크롤 영역 크기
                "x": 20, // x의 시작점
                "y": 80,  // y의 시작점
                "x2": 730, // x의 끝점
                "y2": 500, // y의 끝점
                "fillClassNum": "0012", // 영역의 채우기 색
                "strokeClassNum": "no" // 영역의 선 색
            },
            "elements": [{ // 배경 처럼 깔리는 엘리먼트 (반응이 없는 element)
                "type": "image",
                "meta": {
                    "cx": 600,
                    "cy": 300,
                    "imgUrl": "image_index_0",
                    "imgScale": 0.8
                }
            }, {
                "type": "image",
                "meta": {
                    "cx": 500,
                    "cy": 780,
                    "imgUrl": "image_index_1",
                    "imgScale": 1
                }
            }],
            "focusText": [{ //focus가 진행될 text
                "text": "text_index_1", // [봄]
                "x": 375,
                "y": 130,
                "classNum": "91",
                "fontSize": 55,
                "dy": 55,
                "textLength": 0,
                "bold": true,
                "center": true
            }, {
                "text": "text_index_2", // [우리아기는 아래 $option{발치}에서 코올코올] : text 등록 시 줄바꿈을 하면 자동으로 focus도 다음 줄로 생성됨, text를 줄마다 따로 넣으셔도 됩니다.
                "x": 100,
                "y": 240,
                "classNum": "91",
                "fontSize": 30,
                "dy": 45,
                "textLength": 400,
                "options": [{
                    "type": "footnote", // 각주 생성 옵션
                    "classNum": "91", // 각주가 된 부분 text 색상
                    "bold": true  // 각주가 된 부분 text bold 처리
                }]
            }, {
                "text": "text_index_3", // [고양이는 $option{부뚜막}에서 가릉가릉] : text 등록 시 줄바꿈을 하면 자동으로 focus도 다음 줄로 생성이 되지만 text를 줄마다 따로 등록하셔도 됩니다.
                "x": 100,
                "y": 380,
                "classNum": "91",
                "fontSize": 30,
                "dy": 45,
                "textLength": 0,
                "options": [{
                    "type": "footnote", // 각주 생성 옵션
                    "classNum": "91", // 각주가 된 부분 text 색상
                    "bold": true  // 각주가 된 부분 text bold 처리
                }]
            }, {
                "text": "text_index_4", // [아기 바람이 나뭇가지에서 소올소올]
                "x": 100,
                "y": 550,
                "classNum": "91",
                "fontSize": 30,
                "dy": 45,
                "textLength": 0
            }, {
                "text": "text_index_5", // [아저씨 해님이 하늘 한가운데서 째앵째앵]
                "x": 100,
                "y": 690,
                "classNum": "91",
                "fontSize": 30,
                "dy": 45,
                "textLength": 0
            }],
            "footNoteInfo": [{ // 각주 클릭시 팝업 정보 (위에 등록한 각주 순서에 따라 하나씩 적용)
                "bgImage": { //팝업의 배경으로 쓰일 이미지
                    "url": "image_index_2",
                    "scale": 1
                },
                "elements": [{ //팝업 안 내용
                    "type": "text",
                    "meta": {
                        "text": "text_index_6",  //발치[발치]
                        "classNum": "91",
                        "fontSize": 30,
                        "options": [{
                            "type": "color",
                            "classNum": "91",
                            "fontSize": 50, //앞에 발치 크기 키우기
                            "bold": true
                        }],
                        "x": 180,
                        "y": 160
                    }
                }, {
                    "type": "text",
                    "meta": {
                        "text": "text_index_7",  //발이 있는 쪽
                        "classNum": "91",
                        "fontSize": 25,
                        "x": 180,
                        "y": 250
                    }
                }]
            }, {
                "bgImage": {  //팝업의 배경으로 쓰일 이미지
                    "url": "image_index_2",
                    "scale": 1
                },
                "elements": [{
                    "type": "text",
                    "meta": {
                        "text": "text_index_8", //부뚜막[부뚜막]
                        "classNum": "91",
                        "fontSize": 30,
                        "x": 180,
                        "y": 160,
                        "options": [{
                            "type": "color",
                            "classNum": "91",
                            "fontSize": 50, //앞에 부뚜막 크기 키우기
                            "bold": true
                        }]
                    }
                }, {
                    "type": "text",
                    "meta": {
                        "text": "text_index_9", //불을 때기 위해 만든 구멍 위에 흙과 돌을 \n쌓아 솥을 걸어 놓는 곳.
                        "classNum": "91",
                        "fontSize": 25,
                        "x": 180,
                        "y": 250
                    }
                }]
            }]
        },
        "question": { //문제 부분
            "direction": {  //문제 부분 지시문
                "text": "text_index_10",
                "bold": true
            },
            "elements": [{ // 배경 처럼 깔리는 엘리먼트 (반응이 없는 element)
                "type": "image",
                "meta": {
                    "cx": 250,
                    "cy": 170,
                    "ImgUrl": "image_index_3",//이미지1
                    "ImgScale": 0.9
                }
            }, {
                "type": "image",
                "meta": {
                    "cx": 550,
                    "cy": 170,
                    "ImgUrl": "image_index_4", //이미지2
                    "ImgScale": 0.9
                }
            }, {
                "type": "text",
                "meta": {
                    "cx": 160,
                    "cy": 330,
                    "text": "나는",
                    "classNum": "91",
                    "fontSize": 50
                }
            }, {
                "type": "text",
                "meta": {
                    "cx": 230,
                    "cy": 430,
                    "text": "그렇지만 나는",
                    "classNum": "91",
                    "fontSize": 45
                }
            }],
            "visible": false,  // 문항 시작 시 문제가 먼저 보일지 여부
            "choice": [{ // choice element 배열 (해당 배열의 수에 따라 choice 문제의 수가 결정)
                "elements": [ // 첫번째 choice
                    [{
                        "type": "rect",
                        "meta": {
                            "cx": 320,
                            "cy": 330,
                            "width": 180,
                            "height": 80,
                            "rXY": 10,
                            "shapeFillClassNum": "14",
                            "shapeStrokeClassNum": "117",
                            "shapeStrokeWidth": 1
                        }
                    }, {
                        "type": "text",
                        "meta": {
                            "cx": 320,
                            "cy": 330,
                            "text": "커요.",
                            "classNum": "91",
                            "fontSize": 50
                        }
                    }],
                    [{
                        "type": "rect",
                        "meta": {
                            "cx": 515,
                            "cy": 330,
                            "width": 180,
                            "height": 80,
                            "rXY": 10,
                            "shapeFillClassNum": "14",
                            "shapeStrokeClassNum": "117",
                            "shapeStrokeWidth": 1
                        }
                    }, {
                        "type": "text",
                        "meta": {
                            "cx": 515,
                            "cy": 330,
                            "text": "작아요.",
                            "classNum": "91",
                            "fontSize": 50
                        }
                    }]
                ],
                "answer": 1, //정답 인덱스 (다중 정답일 때 : 배열로 추가)
                "hintCount": 0, // 힌트 개수 (최대로 적용될 수 있는 값은 정답의 수)
                "shadow": { // choice 엘리먼트의 그림자 정보
                    "classNum": ["0006", "0006"], // 그림자 색상(elemnet 순서에 맞게 적용)
                    "rXY": [10, 10] // 그림자 rXY (elemnet 순서에 맞게 적용)
                }
            }, {
                "elements": [ //두번째 choice
                    [{
                        "type": "rect",
                        "meta": {
                            "cx": 470,
                            "cy": 430,
                            "width": 180,
                            "height": 80,
                            "rXY": 10,
                            "shapeFillClassNum": "14",
                            "shapeStrokeClassNum": "117",
                            "shapeStrokeWidth": 1
                        }
                    }, {
                        "type": "text",
                        "meta": {
                            "cx": 470,
                            "cy": 430,
                            "text": "자라요.",
                            "classNum": "91",
                            "fontSize": 45
                        }
                    }],
                    [{
                        "type": "rect",
                        "meta": {
                            "cx": 660,
                            "cy": 430,
                            "width": 180,
                            "height": 80,
                            "rXY": 10,
                            "shapeFillClassNum": "14",
                            "shapeStrokeClassNum": "117",
                            "shapeStrokeWidth": 1
                        }
                    }, {
                        "type": "text",
                        "meta": {
                            "cx": 660,
                            "cy": 430,
                            "text": "씻어요.",
                            "classNum": "91",
                            "fontSize": 45
                        }
                    }]
                ],
                "answer": 0, //정답 인덱스 (다중 정답일 때 : 배열로 추가)
                "hintCount": 0,  // 힌트 개수 (최대로 적용될 수 있는 값은 정답의 수)
                "shadow": { // choice 엘리먼트의 그림자 정보
                    "classNum": ["0006", "0006"], // 그림자 색상(elemnet 순서에 맞게 적용)
                    "rXY": [10, 10] // 그림자 rXY (elemnet 순서에 맞게 적용)
                },
                "inactiveAttr" :  { //비활성 시 텍스트와 rect에 적용 될 색상 (현재 값이 기본값으로 필요시 추가해야됨, text버튼일 때만 추가)
                        "classNum": "0028", //텍스트 비활성 색상
                        "shapeFillClassNum": '14' //rect 비활성 색상
                    }
            }]
        }
    }
    ```

> ## KM000065

    order (정보이용 영역 : order2  순서대로 나열하기)

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000065",
        "direction": { //지시문
        "text": "text_index_0",
        "bold": true
        },
        "elements": [ //바탕 요소
        {
            "type": "image",
            "meta": {
            "cx": 265,
            "cy": 225,
            "ImgUrl": "image_index_0", //화살표(반응x)
            "ImgScale": 0.2
            }
        },
        {
            "type": "image",
            "meta": {
            "cx": 535,
            "cy": 225,
            "ImgUrl": "image_index_0", //화살표
            "ImgScale": 0.2
            }
        }
        ],
        "order": { //순서매기기
        "type": "h", // 세로로 움직이는 타입일 경우 "v", 가로로 움직이는 타입일 경우 "h"
        "ans": [  // 정답 인덱스 순서: dragEl의 index를 순서대로 배열로 작성
            2,
            1,
            0
        ],
        "dragEl": [ // 드래그할 요소
            { // 첫 번째 요소
                "elements": [ // 첫 번째 요소의 엘리먼트 (배경 rect,img, text)
                {
                "type": "rect",
                "meta": {
                    "cx": 130,
                    "cy": 225,
                    "width": 200,
                    "height": 240,
                    "rXY": 10,
                    "shapeFillClassNum": "14",
                    "shapeStrokeClassNum": "117",
                    "shadowClassNum": "0006",
                    "shapeStrokeWidth": 1
                }
                },
                {
                "type": "image",
                "meta": {
                    "cx": 130,
                    "cy": 210,
                    "ImgUrl": "image_index_1",
                    "ImgScale": 0.6
                }
                },
                {
                "type": "text",
                "meta": {
                    "cx": 130,
                    "cy": 320,
                    "text": "우정",
                    "classNum": "000",
                    "fontSize": 25
                }
                }
            ]
            },
            {
            "elements": [ // 두 번째 요소의 엘리먼트
                {
                "type": "rect",
                "meta": {
                    "cx": 400,
                    "cy": 225,
                    "width": 200,
                    "height": 240,
                    "rXY": 10,
                    "shapeFillClassNum": "14",
                    "shapeStrokeClassNum": "117",
                    "shadowClassNum": "0006",
                    "shapeStrokeWidth": 1
                }
                },
                {
                "type": "image",
                "meta": {
                    "cx": 400,
                    "cy": 210,
                    "ImgUrl": "image_index_2",
                    "ImgScale": 0.6
                }
                },
                {
                "type": "text",
                "meta": {
                    "cx": 400,
                    "cy": 320,
                    "text": "목동",
                    "classNum": "000",
                    "fontSize": 25
                }
                }
            ]
            },
            {
            "elements": [ // 세 번째 요소의 엘리먼트
                {
                "type": "rect",
                "meta": {
                    "cx": 670,
                    "cy": 225,
                    "width": 200,
                    "height": 240,
                    "rXY": 10,
                    "shapeFillClassNum": "14",
                    "shapeStrokeClassNum": "117",
                    "shadowClassNum": "0006",
                    "shapeStrokeWidth": 1
                }
                },
                {
                "type": "image",
                "meta": {
                    "cx": 670,
                    "cy": 210,
                    "ImgUrl": "image_index_3",
                    "ImgScale": 0.6
                }
                },
                {
                "type": "text",
                "meta": {
                    "cx": 670,
                    "cy": 320,
                    "text": "누룽지",
                    "classNum": "000",
                    "fontSize": 25
                }
                }
            ]
            }
        ],
        "dragArea": [ // 드래그 영역 지정 (dragEl 요소를 드래그할 때 해당 영역에 들어오지 않으면 원래 자리로 돌아감)
            10,
            80,
            790,
            380
        ]
        },
        "helpPopUp": {// 도움말 선택 시 제공되는 popup창 관련
            "popUpSize": { // popup창 크기
            "width": 650,
            "height": 200,
            "rXY": 10
        },
        "elements":  [ // popup창에 들어가는 반응 없는 요소
            {
            "type": "text",
            "meta": {
                "cx": 400,
                "cy": 250,
                "text": "text_index_1", //그림과 낱말을~
                "classNum": "000",
                "fontSize": 20,
                "dy": 30
            }
            }
        ]
        },
        "helpButton": { // 도움말 버튼 위치
        "cx": 675,
        "cy": 430
        }
    }
    ```

> ## KM000066

    Speak

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000066",
        "direction": {
            "text": "text_index_0",
            "classNum": "\"000\"",
            "bold": true
        },
        "elements": [
            {
            "type": "image",
            "meta": {
                "cx": 400,
                "cy": 220,
                "ImgUrl": "image_index_0",
                "ImgScale": 1.2
            }
            }
        ],
        "record": {
            "cx": 400,
            "cy": 385
        }
    }
    ```

> ## KM000067

    Complex (Choose + Write)

-   ### 기본 포맷

    ```javascript
    {
    "questionType": "KM000067",
    "direction": { //지시문
        "text": "text_index_0",
        "bold": true
    },
    "elements": [ // 배경 처럼 깔리는 엘리먼트 (반응이 없는 element)
        {
        "type": "rect",
        "meta": {
            "cx": 400,
            "cy": 140,
            "width": 640,
            "height": 100,
            "rXY": 20,
            "shapeFillClassNum": "0040",
            "shapeStrokeClassNum": "no"
        }
        }
    ],
    "wordChoose": { // 문장안에 특정 낱말 선택하기
        "x": 120, //문장의 x 좌표
        "y": 140, //문장의 y 좌표
        "text": "$choose{걷옷}은 색깔별로 구별해서 넣어라.", //문장 text ($choose{}안에 들어가는 단어가 선택 단어가 됩니다.)
        "ansIndex": 0 // 선택 단어 중 정답의 인덱스 (하나만 가능)
        "classNum" : "000" // 글자 색상 번호 (기본 000)
        "fontSize" : 40 // 글자 크기 (기본 40)
        "isHint": true, //힌트 여부 (기본 false)
        "hoverClassNum" : "02" // 마우스 커서를 올릴 때 포커스 되는 선 색상 번호 (기본 02)
        "fbClassNum" : "0002" // 피드백 시 변할 글자 색상 번호(기본 0002)
    },
    "handWriteValue": { //핸드라이트
        "x": 80, // 핸드라이트 박스 x좌표
        "y": 220, // 핸드라이트 박스 y좌표
        "width": 640, // 핸드라이트 박스 너비
        "height": 230, // 핸드라이트 박스 높이
        "rXY":20, // 핸드라이트 박스 round (기본 20)
        "drawClassNum": "0005", // 그려지는 선 색 (기본 0005)
        "drawStrokeWidth": 10, // 그려지는 선 두께 (기본 10)
        "boxFillClassNum": "14", // 핸드라이트 박스 채우기 색 (기본 111)
        "boxStrokeClassNum": "0015", // 핸드라이트 박스 선 색 (기본 01)
        "boxOpacity": 1, // 핸드라이트 박스 투명도 (기본 1)
        "shadowClassNum": false, //  핸드라이트 박스 그림자 (기본 없음)
        "wordHint": true, // 글자 힌트 여부 (기본 false)
        "wordHintFs":120, // 글자 힌트 크기 (기본 120)
        "okButton": { // 확인버튼 정보
            "cx": 755,
            "cy": 430
            },
        "answer": "겉옷", //핸드라이트 정답
        "undoButton": { // 이전 버튼 정보
            "x": 730,
            "y": 220,
            "scale": 1
        },
        "resetButton": { // 초기화 버튼 정보
            "x": 730,
            "y": 260,
            "scale": 1
        }
    }
    }
    ```

> ## KM000069

    write

-   ### 기본 포맷

    ```javascript
    //첫번째 문항
    {
        "questionType": "KM000069",
        "direction": { //지시문
            "text": "text_index_0",
            "bold": true
        },
        "elements": [ // 배경 처럼 깔리는 엘리먼트 (반응이 없는 element) - 처음에 나타나 있는 엘리먼트
            {
                "type": "rect",
                "meta": {
                    "cx": 400,
                    "cy": 190,
                    "width": 300,
                    "height": 120,
                    "shapeFillClassNum": "14",
                    "shapeStrokeClassNum": "0019"
                }
            },
            {
                "type": "line",
                "meta": {
                    "x": 400,
                    "y": 130,
                    "x2": 400,
                    "y2": 250,
                    "shapeStrokeClassNum": "0019"
                }
            },
            {
                "type": "text",
                "meta": {
                    "cx": 325,
                    "cy": 190,
                    "text": "text_index_3", //억
                    "classNum": "91",
                    "fontSize": 55,
                    "bold": true
                }
            },
            {
                "type": "text",
                "meta": {
                    "cx": 475,
                    "cy": 190,
                    "text": "text_index_4", //엌
                    "classNum": "91",
                    "fontSize": 55,
                    "bold": true
                }
            }
        ],
        "nextStep": { // 1초 뒤에 나타날 엘리먼트
            "elements": [
                {
                    "type": "rect",
                    "meta": {
                    "cx": 400,
                    "cy": 385,
                    "width": 600,
                    "height": 140,
                    "shapeFillClassNum": "14",
                    "shapeStrokeClassNum": "0053",
                    "rXY": 10
                    }
                },
                {
                    "type": "text",
                    "meta": {
                    "cx": 400,
                    "cy": 385,
                    "text": "text_index_1", //'억'과 '엌'의 받침 소리는 모두 [억]으로 납니다.
                    "classNum": "91",
                    "fontSize": 30,
                    "options": [
                        {
                        "type": "color",
                        "classNum": "02",
                        "bold": true
                        }
                    ]
                    }
                },
                {
                    "type": "image",
                    "meta": {
                    "cx": 650,
                    "cy": 280,
                    "imgUrl": "image_index_0", // 여자 아이 이미지
                    "imgScale": 0.7
                    }
                }
            ],
            "okButton": { // 1.5초 뒤에 생성 될 다음 버튼
                "type": 1
            }
        }
    }
    //두번째 문항
    {
        "questionType": "KM000069",
        "direction": { // 지시문
            "text": "text_index_0",
            "bold": true
        },
        "handWriteValue": [{ // 첫번째 핸드라이트 정보
                "x": 100,
                "y": 100,
                "width": 280,
                "height": 280,
                "rXY": 20 // 핸드라이트 박스 round (기본 20)
                "drawClassNum" : "0005" // 그려지는 선 색상 (기본 0005)
                "drawStrokeWidth": 10,  // 그려지는 선 두께 (기본 10)
                "boxFillClassNum": "14", // 핸드라이트 박스 채우기 색상 (기본 111)
                "boxStrokeClassNum": "0015", // 핸드라이트 박스 선 색상 (기본 01)
                "boxOpacity": 1, // 핸드라이트 박스 투명도 (기본 1)
                "shadowClassNum": false, // 핸드라이트 박스 그림자 (기본 없음)
                "wordHint": true, // 글자 힌트 (기본 false)
                "wordHintFs": 140 // 글자 힌트 크기 (기본 140)
                "okButton": {
                    "cx": 755,
                    "cy": 430
                },
                "answer": "text_index_3", //억
                "undoButton": {
                    "x": 310,
                    "y": 390,
                    "scale": 1
                },
                "resetButton": {
                    "x": 350,
                    "y": 390,
                    "scale": 1
                }
            },
            { // 두번째 핸드라이트 정보
                "x": 420,
                "y": 100,
                "width": 280,
                "height": 280,
                "boxFillClassNum": "14",
                "boxStrokeClassNum": "0015",
                "wordHint": true,
                "okButton": {
                    "cx": 755,
                    "cy": 430
                },
                "answer": "text_index_4", //엌
                "undoButton": {
                    "x": 630,
                    "y": 390,
                    "scale": 1
                },
                "resetButton": {
                    "x": 670,
                    "y": 390,
                    "scale": 1
                }
            }
        ]
    }
    ```

> ## KM000070

    Complex (Choose + Speak)

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000070",
        "direction": { // 지시문
            "text": "text_index_0",
            "bold": true
        },
        "choice": { // 선택형
            "elements": [ // 선택지
                [ // 첫 번째 보기
                    {
                        "type": "image",
                        "meta": {
                            "cx": 180,
                            "cy": 200,
                            "ImgUrl": "image_index_0",
                            "ImgScale": 1
                        }
                    }
                ],
                [ // 두 번째 보기
                    {
                        "type": "image",
                        "meta": {
                            "cx": 400,
                            "cy": 200,
                            "ImgUrl": "image_index_1",
                            "ImgScale": 1
                        }
                    }
                ],
                [ // 세 번째 보기
                    {
                        "type": "image",
                        "meta": {
                            "cx": 620,
                            "cy": 200,
                            "ImgUrl": "image_index_2",
                            "ImgScale": 1
                        }
                    }
                ]
            ],
            "moveTo": { // 선택된 보기 이동될 위치, 스케일 정보
                "cx": 400,
                "cy": 200,
                "scale": 1.2
            }
        }
    }

    ```

> ## KM000071

    Reading + Speak

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000071",
        "direction": {
            "text": "text_index_0",
            "classNum": "\"000\"",
            "bold": true
        },
        "sound": {
            "url": "sound_index_0",
            "textEndTime": [
            4,
            7.9,
            12.3,
            14.1,
            17.5,
            22.4,
            26.5,
            29.3,
            34.3
            ]
        },
        "scroll": {
            "area": {
            "x": 20,
            "y": 80,
            "x2": 730,
            "y2": 500,
            "fillClassNum": "0012",
            "strokeClassNum": "no"
            },
            "elements": [
            {
                "type": "image",
                "meta": {
                "cx": 600,
                "cy": 300,
                "imgUrl": "image_index_0",
                "imgScale": 0.8
                }
            },
            {
                "type": "image",
                "meta": {
                "cx": 500,
                "cy": 780,
                "imgUrl": "image_index_1",
                "imgScale": 1
                }
            }
            ],
            "focusText": [
            {
                "text": "text_index_1",
                "x": 375,
                "y": 130,
                "classNum": "91",
                "fontSize": 55,
                "dy": 55,
                "textLength": 0,
                "bold": true,
                "center": true
            },
            {
                "text": "text_index_2",
                "x": 100,
                "y": 240,
                "classNum": "91",
                "fontSize": 30,
                "dy": 45,
                "textLength": 400,
                "options": [
                {
                    "type": "footnote",
                    "classNum": "91",
                    "bold": true
                }
                ]
            },
            {
                "text": "text_index_3",
                "x": 100,
                "y": 380,
                "classNum": "91",
                "fontSize": 30,
                "dy": 45,
                "textLength": 0,
                "options": [
                {
                    "type": "footnote",
                    "classNum": "91",
                    "bold": true
                }
                ]
            },
            {
                "text": "text_index_4",
                "x": 100,
                "y": 550,
                "classNum": "91",
                "fontSize": 30,
                "dy": 45,
                "textLength": 0
            },
            {
                "text": "text_index_5",
                "x": 100,
                "y": 690,
                "classNum": "91",
                "fontSize": 30,
                "dy": 45,
                "textLength": 0
            }
            ],
            "footNoteInfo": [
            {
                "bgImage": {
                "url": "image_index_2",
                "scale": 1
                },
                "elements": [
                {
                    "type": "text",
                    "meta": {
                    "text": "text_index_6",
                    "classNum": "91",
                    "fontSize": 30,
                    "options": [
                        {
                        "type": "color",
                        "classNum": "91",
                        "fontSize": 50,
                        "bold": true
                        }
                    ],
                    "x": 180,
                    "y": 160
                    }
                },
                {
                    "type": "text",
                    "meta": {
                    "text": "text_index_7",
                    "classNum": "91",
                    "fontSize": 25,
                    "x": 180,
                    "y": 250
                    }
                }
                ]
            },
            {
                "bgImage": {
                    "url": "image_index_2",
                    "scale": 1
                },
                "elements": [
                {
                    "type": "text",
                    "meta": {
                    "text": "text_index_8",
                    "classNum": "91",
                    "fontSize": 30,
                    "x": 180,
                    "y": 160,
                    "options": [
                        {
                        "type": "color",
                        "classNum": "91",
                        "fontSize": 50,
                        "bold": true
                        }
                    ]
                    }
                },
                {
                    "type": "text",
                    "meta": {
                    "text": "text_index_9",
                    "classNum": "91",
                    "fontSize": 25,
                    "x": 180,
                    "y": 250
                    }
                }
                ]
            }
            ]
        },
        "question": {
            "direction": {
                "text": "text_index_10",
                "classNum": "\"000\"",
                "bold": true
            },
            "soundButton": {
            "elements": [
                {
                    "type": "image",
                    "meta": {
                        "cx": 200,
                        "cy": 220,
                        "ImgUrl": "image_index_3",
                        "ImgScale": 1.5
                    }
                },
                {
                    "type": "image",
                    "meta": {
                        "cx": 500,
                        "cy": 220,
                        "ImgUrl": "image_index_4",
                        "ImgScale": 1.5
                    }
                },
                {
                    "type": "text",
                    "meta": {
                        "cx": 510,
                        "cy": 220,
                        "text": "text_index_11",
                        "classNum": "000",
                        "fontSize": 25,
                        "options": [
                        {
                            "type": "color",
                            "classNum": "0002"
                        }
                        ],
                        "lineCenter": true,
                        "dy": 40
                    }
                }
            ],
            "sound": {
                "cx": 100,
                "cy": 140,
                "ttsText": "text_index_11"
            }
            },
            "record": {
                "cx": 400,
                "cy": 385
            }
        }
    }
    ```

> ## KM000072

    초기 독서 Check

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000072",
        "direction": {
            "text": "text_index_0",
            "classNum": "000",
            "bold": true
        },
        "elements": [
            {
            "type": "rect",
            "meta": {
                "cx": 400,
                "cy": 260,
                "width": 400,
                "height": 240,
                "rXY": 20,
                "shapeFillClassNum": "119",
                "shapeStrokeClassNum": "no",
                "shapeOpacity": 1,
                "shapeStrokeWidth": 0,
                "shapeIsDashArray": false,
                "shadowClassNum": "0008"
            }
            },
            {
            "type": "text",
            "meta": {
                "cx": 400,
                "cy": 260,
                "text": "text_index_1",
                "classNum": "000",
                "fontSize": 30
            }
            }
        ],
        "nextButton": {
            "type": 1,
            "visibility": true,
            "event": true
        },
        "okButton": {
            "type": 0,
            "visibility": false,
            "event": true
        },
        "animations": {
            "background": [
            {
                "type": "rect",
                "meta": {
                "cx": 400,
                "cy": 260,
                "width": 400,
                "height": 240,
                "rXY": 20,
                "shapeFillClassNum": "74",
                "shapeStrokeClassNum": "no",
                "shapeOpacity": 1,
                "shapeStrokeWidth": 0,
                "shapeIsDashArray": false,
                "shadowClassNum": "0008"
                }
            }
            ],
            "frameElements": [ // 애니메이션이 적용되는 요소들
            {
                "type": "text",
                "meta": {
                "cx": 340,
                "cy": 260,
                "text": "text_index_2",
                "classNum": "000",
                "fontSize": 40,
                "bold": true
                }
            },
            {
                "type": "text",
                "meta": {
                "cx": 380,
                "cy": 260,
                "text": "text_index_3",
                "classNum": "000",
                "fontSize": 40,
                "bold": true
                }
            },
            {
                "type": "text",
                "meta": {
                "cx": 384,
                "cy": 260,
                "text": "text_index_4",
                "classNum": "000",
                "fontSize": 40,
                "bold": true,
                "visibility": false
                }
            },
            {
                "type": "text",
                "meta": {
                "cx": 430,
                "cy": 260,
                "text": "text_index_5",
                "classNum": "000",
                "fontSize": 40,
                "bold": true
                }
            },
            {
                "type": "text",
                "meta": {
                "cx": 470,
                "cy": 260,
                "text": "text_index_6",
                "classNum": "000",
                "fontSize": 40,
                "bold": true
                }
            }
            ],
            "effects": [
            [
                {
                "targetIndex": 1, // 애니메이션이 적용될 요소의 인덱스
                "attributes": {}, // 애니메이션이 적용될 속성
                "classNum": "0017", // 텍스트 색상 변경을 위한 넘버
                "timeout": 500 // 애니메이션 지속 시간
                }
            ],
            [
                {
                "targetIndex": 1,
                "attributes": {
                    "opacity": 0,
                    "transform": "s0"
                },
                "timeout": 2500,
                "sound": "/sounds/K1/KS00000091.mp3" // 해당 요소에 대한 애니메이션 시작시 재생되는 효과음
                }
            ],
            [
                {
                "targetIndex": 2,
                "attributes": {
                    "opacity": 1
                },
                "timeout": 1000
                }
            ],
            [
                {
                "targetIndex": 2,
                "attributes": {
                    "opacity": 0,
                    "transform": "translate(30, 0)"
                },
                "timeout": 1000,
                "sound": "/sounds/K1/KS00000092.mp3",
                "soundDelay": 700 // 효과음 지연 시간
                },
                {
                "targetIndex": 0,
                "attributes": {
                    "transform": "translate(25, 0)"
                },
                "timeout": 1000
                },
                {
                "targetIndex": 3,
                "attributes": {
                    "transform": "translate(-25, 0)"
                },
                "timeout": 1000
                },
                {
                "targetIndex": 4,
                "attributes": {
                    "transform": "translate(-25, 0)"
                },
                "timeout": 1000
                }
            ]
            ],
            "checkElements": [ // 애니메이션 종료 후 보여주는 요소
            {
                "type": "rect",
                "meta": {
                "cx": 130,
                "cy": 260,
                "width": 150,
                "height": 100,
                "rXY": 20,
                "shapeFillClassNum": "74",
                "shapeStrokeClassNum": "no",
                "shapeOpacity": 1,
                "shapeStrokeWidth": 0,
                "shapeIsDashArray": false,
                "shadowClassNum": "0008"
                }
            },
            {
                "type": "text",
                "meta": {
                "cx": 130,
                "cy": 260,
                "text": "text_index_7",
                "classNum": "000",
                "fontSize": 28
                }
            },
            {
                "type": "regularPolygon",
                "meta": {
                "cx": 220,
                "cy": 260,
                "length": 26,
                "sideNum": 3,
                "shapeStrokeWidth": 1,
                "shapeOpacity": 1,
                "shapeFillClassNum": "0011",
                "shapeStrokeClassNum": "117"
                }
            },
            {
                "type": "rect",
                "meta": {
                "cx": 310,
                "cy": 260,
                "width": 150,
                "height": 100,
                "rXY": 20,
                "shapeFillClassNum": "74",
                "shapeStrokeClassNum": "no",
                "shapeOpacity": 1,
                "shapeStrokeWidth": 0,
                "shapeIsDashArray": false,
                "shadowClassNum": "0008"
                }
            },
            {
                "type": "text",
                "meta": {
                "cx": 310,
                "cy": 260,
                "text": "text_index_8",
                "classNum": "000",
                "fontSize": 28,
                "options": [
                    {
                    "type": "color",
                    "classNum": "0017"
                    }
                ]
                }
            },
            {
                "type": "regularPolygon",
                "meta": {
                "cx": 400,
                "cy": 260,
                "length": 26,
                "sideNum": 3,
                "shapeStrokeWidth": 1,
                "shapeOpacity": 1,
                "shapeFillClassNum": "0011",
                "shapeStrokeClassNum": "117"
                }
            },
            {
                "type": "rect",
                "meta": {
                "cx": 490,
                "cy": 260,
                "width": 150,
                "height": 100,
                "rXY": 20,
                "shapeFillClassNum": "74",
                "shapeStrokeClassNum": "no",
                "shapeOpacity": 1,
                "shapeStrokeWidth": 0,
                "shapeIsDashArray": false,
                "shadowClassNum": "0008"
                }
            },
            {
                "type": "text",
                "meta": {
                "cx": 490,
                "cy": 260,
                "text": "text_index_9",
                "classNum": "000",
                "fontSize": 28
                }
            },
            {
                "type": "regularPolygon",
                "meta": {
                "cx": 580,
                "cy": 260,
                "length": 26,
                "sideNum": 3,
                "shapeStrokeWidth": 1,
                "shapeOpacity": 1,
                "shapeFillClassNum": "0011",
                "shapeStrokeClassNum": "117"
                }
            },
            {
                "type": "rect",
                "meta": {
                "cx": 670,
                "cy": 260,
                "width": 150,
                "height": 100,
                "rXY": 20,
                "shapeFillClassNum": "74",
                "shapeStrokeClassNum": "no",
                "shapeOpacity": 1,
                "shapeStrokeWidth": 0,
                "shapeIsDashArray": false,
                "shadowClassNum": "0008"
                }
            },
            {
                "type": "text",
                "meta": {
                "cx": 670,
                "cy": 260,
                "text": "text_index_10",
                "classNum": "000",
                "fontSize": 28
                }
            }
            ]
        }
    }
    ```

> ## KM000074

    choose

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000074",
        "direction": { //지시문
            "text": "text_index_0",
            "bold": true
        },
        "elements": [{ // 배경 처럼 깔리는 엘리먼트 (반응이 없는 element)
            "type": "image",
            "meta": {
                "cx": 150,
                "cy": 180,
                "imgUrl": "image_index_0", //사람 이미지
                "imgScale": 0.35
            }
        }, {
            "type": "speechBubble", //말풍선 (말풍선을 이미지로 그릴경우 위의 이미지 메타 형식으로 만들어 주시면 됩니다.)
            "meta": {
                "width": 470,
                "height": 120,
                "rXY": 50,
                "shapeFillClassNum": "14",
                "shapeStrokeClassNum": "0008",
                "type": "l",
                "cx": 475,
                "cy": 180
            }
        }, {
            "type": "text",
            "meta": {
                "cx": 500,
                "cy": 180,
                "classNum": "91",
                "fontSize": 40,
                "text": "나는 선물을 받았어."
            }
        }],
        "help": { // 도움말 버튼
            "button": { //버튼 정보
                "x": 40, //버튼 x좌표
                "y": 440, //버튼 y좌표
                "size": 1 //버튼 크기 (기본 1)
            },
            "helpText": {
                "text": "text_index_1", //힌트 버튼을 누르면 나오는 메세지
                "fontSize": 16, //텍스트 사이즈 (기본 14)
                "classNum": "91", //텍스트 색상(기본 91)
                "bgFillClass": "14", //텍스트 배경에 깔리는 rect의 채우기 색상 (기본 14)
                "bgStrokeClass": "no", //텍스트 배경에 깔리는 rect의 선 색상 (기본 no)
                "bold": false, //텍스트 두께 (기본 false)
                "bgOpacity": 1  //텍스트 배경에 깔리는 rect의 투명도 (기본 1)
                "messageGap" : [0,0] // 텍스트 위치 조정 값 (기본 x:0, y:0)
            }
        },
        "choice": { // 선택하기
            "hintCount": 0, //힌트 수
            "ansIndex": 0, //정답 인덱스
            "elements": [ //선택지 엘리먼트
                [{ //첫번째 엘리먼트
                    "type": "rect",
                    "meta": {
                        "cx": 270,
                        "cy": 360,
                        "width": 200,
                        "height": 90,
                        "rXY": 10,
                        "shapeFillClassNum": "14",
                        "shapeStrokeClassNum": "117",
                        "shadowClassNum": "0006",
                        "shapeStrokeWidth": 1
                    }
                }, {
                    "type": "text",
                    "meta": {
                        "cx": 270,
                        "cy": 360,
                        "text": "사실",
                        "classNum": "000",
                        "fontSize": 45
                    }
                }],
                [{ //두번째 엘리먼트
                    "type": "rect",
                    "meta": {
                        "cx": 530,
                        "cy": 360,
                        "width": 200,
                        "height": 90,
                        "rXY": 10,
                        "shapeFillClassNum": "14",
                        "shapeStrokeClassNum": "117",
                        "shadowClassNum": "0006",
                        "shapeStrokeWidth": 1
                    }
                }, {
                    "type": "text",
                    "meta": {
                        "cx": 530,
                        "cy": 360,
                        "text": "의견",
                        "classNum": "000",
                        "fontSize": 45
                    }
                }]
            ]
        }
    }
    ```

> ## KM000076

    CHOOSE 2 (CR10 131a)

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000076",
        "direction": {
            "text": "text_index_0",
            "classNum": "\"000\"",
            "bold": true
        },
        "elements": [
            {
                "type": "rect",
                "meta": {
                    "cx": 400,
                    "cy": 120,
                    "width": 180,
                    "height": 60,
                    "rXY": 10,
                    "shapeFillClassNum": "0053",
                    "shapeStrokeClassNum": "no",
                    "shadowClassNum": "0053"
                }
            },
            {
                "type": "text",
                "meta": {
                    "cx": 400,
                    "cy": 120,
                    "text": "운동회",
                    "classNum": "001",
                    "fontSize": 30,
                    "bold": false
                }
            }
        ],
        "choice": { // 선택지
            "background": { // 선택지 배경
                "width": 150,
                "height": 70,
                "fillClassNum": "14",
                "strokeClassNum": "117",
                "r": 70,
                "opacity": 1
            },
            "selectedStyle": { // 선택했을 때 스타일
                "strokeWidth": 5,
                "strokeClassNum": "0053",
                "fontColor": "0053"
            },
            "font": { // 선택지 텍스트 스타일
                "size": 25,
                "classNum": "001",
                "bold": false,
                "dy": 30
            },
            "list": [ // 선택지 리스트
                {
                    "text": "text_index_2",
                    "cx": 200,
                    "cy": 210
                },
                {
                    "text": "text_index_3",
                    "cx": 400,
                    "cy": 210
                },
                {
                    "text": "text_index_4",
                    "cx": 600,
                    "cy": 210
                },
                {
                    "text": "text_index_5",
                    "cx": 100,
                    "cy": 280
                },
                {
                    "text": "text_index_6",
                    "cx": 300,
                    "cy": 280
                },
                {
                    "text": "text_index_7",
                    "cx": 500,
                    "cy": 280
                },
                {
                    "text": "text_index_8",
                    "cx": 700,
                    "cy": 280
                },
                {
                    "text": "text_index_9",
                    "cx": 200,
                    "cy": 350
                },
                {
                    "text": "text_index_10",
                    "cx": 400,
                    "cy": 350
                },
                {
                    "text": "text_index_11",
                    "cx": 600,
                    "cy": 350
                },
                {
                    "text": "text_index_12",
                    "cx": 300,
                    "cy": 420
                },
                {
                    "text": "text_index_13",
                    "cx": 500,
                    "cy": 420
                }
            ]
        },
        "popupInfo": { // 팝업
            "cx": 400,
            "cy": 260,
            "width": 600,
            "height": 350,
            "rXY": 10,
            "elements": [ // 팝업 내 요소들(이미지와 텍스트로 구성)
                [ // 첫 번째 내용
                    {
                    "type": "image",
                    "meta": {
                        "cx": 400,
                        "cy": 190,
                        "imgUrl": "image_index_0",
                        "imgScale": 0.3
                    }
                    },
                    {
                    "type": "text",
                    "meta": {
                        "cx": 400,
                        "cy": 340,
                        "text": "text_index_14",
                        "classNum": "001",
                        "fontSize": 25,
                        "bold": false
                    }
                    }
                ],
                [ // 두 번째 내용
                    {
                    "type": "image",
                    "meta": {
                        "cx": 400,
                        "cy": 190,
                        "imgUrl": "image_index_1",
                        "imgScale": 0.3
                    }
                    },
                    {
                    "type": "text",
                    "meta": {
                        "cx": 400,
                        "cy": 340,
                        "text": "text_index_15",
                        "classNum": "001",
                        "fontSize": 25,
                        "bold": false
                    }
                    }
                ]
            ],
            "timeout": 1000 // 팝업 노출 시간
        }
    }
    ```

    > ## KM000068

    표기영역 : choose3(길찾기)

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000068",
        "direction": { //지시문
            "text": "text_index_0",
            "bold": true
        },
        "choice": [ // 초이스 정보
            { // 두 번째 초이스
                "hintCount": 1,
                "elements": [
                    [{
                        "type": "rect",
                        "meta": {
                            "cx": 300,
                            "cy": 250,
                            "width": 65,
                            "height": 30,
                            "shapeFillClassNum": "14",
                            "shapeStrokeClassNum": "117",
                            "shadowClassNum": "0006",
                            "shapeStrokeWidth": 1,
                            "rXY": 5
                        }
                    }, {
                        "type": "text",
                        "meta": {
                            "cx": 300,
                            "cy": 250,
                            "text": "많다",
                            "classNum": "001",
                            "fontSize": 20
                        }
                    }],
                    [{
                            "type": "rect",
                            "meta": {
                                "cx": 395,
                                "cy": 270,
                                "width": 65,
                                "height": 30,
                                "shapeFillClassNum": "14",
                                "shapeStrokeClassNum": "117",
                                "shadowClassNum": "0006",
                                "shapeStrokeWidth": 1,
                                "rXY": 5
                            }
                        },
                        {
                            "type": "text",
                            "meta": {
                                "cx": 395,
                                "cy": 270,
                                "text": "맍다",
                                "classNum": "001",
                                "fontSize": 20
                            }
                        }
                    ]
                ],
                "ansIndex": 0 // 정답 인덱스
            },
            { // 두 번째 초이스
                "hintCount": 0,
                "elements": [
                    [{
                            "type": "rect",
                            "meta": {
                                "cx": 355,
                                "cy": 370,
                                "width": 65,
                                "height": 30,
                                "shapeFillClassNum": "14",
                                "shapeStrokeClassNum": "117",
                                "shadowClassNum": "0006",
                                "shapeStrokeWidth": 1,
                                "rXY": 5
                            }
                        },
                        {
                            "type": "text",
                            "meta": {
                                "cx": 355,
                                "cy": 370,
                                "text": "값",
                                "classNum": "001",
                                "fontSize": 20
                            }
                        }
                    ],
                    [{
                            "type": "rect",
                            "meta": {
                                "cx": 410,
                                "cy": 320,
                                "width": 65,
                                "height": 30,
                                "shapeFillClassNum": "14",
                                "shapeStrokeClassNum": "117",
                                "shadowClassNum": "0006",
                                "shapeStrokeWidth": 1,
                                "rXY": 5
                            }
                        },
                        {
                            "type": "text",
                            "meta": {
                                "cx": 410,
                                "cy": 320,
                                "text": "갌",
                                "classNum": "001",
                                "fontSize": 20
                            }
                        }
                    ]
                ],
                "ansIndex": 0 // 정답 인덱스
            },
            { // 세 번째 초이스
                "hintCount": 0,
                "elements": [
                    [{
                            "type": "rect",
                            "meta": {
                                "cx": 245,
                                "cy": 400,
                                "width": 65,
                                "height": 30,
                                "shapeFillClassNum": "14",
                                "shapeStrokeClassNum": "117",
                                "shadowClassNum": "0006",
                                "shapeStrokeWidth": 1,
                                "rXY": 5
                            }
                        },
                        {
                            "type": "text",
                            "meta": {
                                "cx": 245,
                                "cy": 400,
                                "text": "흜",
                                "classNum": "001",
                                "fontSize": 20
                            }
                        }
                    ],
                    [{
                            "type": "rect",
                            "meta": {
                                "cx": 360,
                                "cy": 440,
                                "width": 65,
                                "height": 30,
                                "shapeFillClassNum": "14",
                                "shapeStrokeClassNum": "117",
                                "shadowClassNum": "0006",
                                "shapeStrokeWidth": 1,
                                "rXY": 5
                            }
                        },
                        {
                            "type": "text",
                            "meta": {
                                "cx": 360,
                                "cy": 440,
                                "text": "흙",
                                "classNum": "001",
                                "fontSize": 20
                            }
                        }
                    ]
                ],
                "ansIndex": 1 // 정답 인덱스
            }
        ],
        "elements": [], //배경요소
        "animation": { // 애니메이션 정보
            "moveImage": { //움직이는 애니메이션
                "url": "image_index_1", //고양이
                "scale": 0.2
            },
            "mazeImage": { //미로 이미지 정보
                "x": 60, //시작 위치 x
                "y": 120,
                "scale": 0.85,
                "imgIndex": 0 //이미지풀에서의 인덱스
            },
            "pathAttr": { // 패스 정보
                "strokeWidth": 15,
                "stroke": "04" //패스 색
            }
        }
    }
    ```

> ## KM000075

    Reading + 길찾기(초이스)

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000055",
        "direction": { //지시문
            "text": "text_index_0",
            "bold": true
        },
        "sound": { //지문 사운드
            "url": "sound_index_0",
            "textEndTime": [4, 7.9, 12.3, 14.1, 17.5, 22.4, 26.5, 29.3, 34.3] // 지문에서 열 마다 끝나는 시간 (시간에 맞춰서 focus가 이동함)
        },
        "scroll": { //스크롤 영역에 들어가는 정보
            "area": { //스크롤 영역 크기
                "x": 20, // x의 시작점
                "y": 80, // y의 시작점
                "x2": 730, // x의 끝점
                "y2": 500, // y의 끝점
                "fillClassNum": "0012", // 영역의 채우기 색
                "strokeClassNum": "no" // 영역의 선 색
            },
            "elements": [{ // 배경 처럼 깔리는 엘리먼트 (반응이 없는 element)
                "type": "image",
                "meta": {
                    "cx": 600,
                    "cy": 300,
                    "imgUrl": "image_index_0",
                    "imgScale": 0.8
                }
            }, {
                "type": "image",
                "meta": {
                    "cx": 500,
                    "cy": 780,
                    "imgUrl": "image_index_1",
                    "imgScale": 1
                }
            }],
            "focusText": [{ //focus가 진행될 text
                "text": "text_index_1", // [봄]
                "x": 375,
                "y": 130,
                "classNum": "91",
                "fontSize": 55,
                "dy": 55,
                "textLength": 0,
                "bold": true,
                "center": true
            }, {
                "text": "text_index_2", // [우리아기는 아래 $option{발치}에서 코올코올] : text 등록 시 줄바꿈을 하면 자동으로 focus도 다음 줄로 생성됨, text를 줄마다 따로 넣으셔도 됩니다.
                "x": 100,
                "y": 240,
                "classNum": "91",
                "fontSize": 30,
                "dy": 45,
                "textLength": 0,
                "options": [{
                    "type": "footnote", // 각주 생성 옵션
                    "classNum": "91", // 각주가 된 부분 text 색상
                    "bold": true // 각주가 된 부분 text bold 처리
                }]
            }, {
                "text": "text_index_3", // [고양이는 $option{부뚜막}에서 가릉가릉] : text 등록 시 줄바꿈을 하면 자동으로 focus도 다음 줄로 생성이 되지만 text를 줄마다 따로 등록하셔도 됩니다.
                "x": 100,
                "y": 380,
                "classNum": "91",
                "fontSize": 30,
                "dy": 45,
                "textLength": 0,
                "options": [{
                    "type": "footnote", // 각주 생성 옵션
                    "classNum": "91", // 각주가 된 부분 text 색상
                    "bold": true  // 각주가 된 부분 text bold 처리
                }]
            }, {
                "text": "text_index_4",  // [아기 바람이 나뭇가지에서 소올소올]
                "x": 100,
                "y": 550,
                "classNum": "91",
                "fontSize": 30,
                "dy": 45,
                "textLength": 0
            }, {
                "text": "text_index_5",  // [아저씨 해님이 하늘 한가운데서 째앵째앵]
                "x": 100,
                "y": 690,
                "classNum": "91",
                "fontSize": 30,
                "dy": 45,
                "textLength": 0
            }],
            "footNoteInfo": [{ // 각주 클릭시 팝업 정보 (위에 등록한 각주 순서에 따라 하나씩 적용)
                "bgImage": { //팝업의 배경으로 쓰일 이미지
                    "url": "image_index_2",
                    "scale": 1
                },
                "elements": [{ //팝업 안 내용
                    "type": "text",
                    "meta": {
                        "text": "text_index_6", //발치[발치]
                        "classNum": "91",
                        "fontSize": 30,
                        "options": [{
                            "type": "color",
                            "classNum": "91",
                            "fontSize": 50, //앞에 발치 크기 키우기
                            "bold": true
                        }],
                        "x": 180,
                        "y": 160
                    }
                }, {
                    "type": "text",
                    "meta": {
                        "text": "text_index_7", //발이 있는 쪽
                        "classNum": "91",
                        "fontSize": 25,
                        "x": 180,
                        "y": 250
                    }
                }]
            }, {
                "bgImage": { //팝업의 배경으로 쓰일 이미지
                    "url": "image_index_2",
                    "scale": 1
                },
                "elements": [{
                    "type": "text",
                    "meta": {
                        "text": "text_index_8", //부뚜막[부뚜막]
                        "classNum": "91",
                        "fontSize": 30,
                        "x": 180,
                        "y": 160,
                        "options": [{
                            "type": "color",
                            "classNum": "91",
                            "fontSize": 50, //앞에 부뚜막 크기 키우기
                            "bold": true
                        }]
                    }
                }, {
                    "type": "text",
                    "meta": {
                        "text": "text_index_9", //불을 때기 위해 만든 구멍 위에 흙과 돌을 \n쌓아 솥을 걸어 놓는 곳.
                        "classNum": "91",
                        "fontSize": 25,
                        "x": 180,
                        "y": 250
                    }
                }]
            }]
        },
        "question": { //문제부분
            "direction": { // 문제 지시문
                "text": "text_index_10",
                "bold": true
            },
            "choice": [ //초이스 정보
                { // 첫 번째 초이스
                    "hintCount": 1,
                    "elements": [ //선택 보기 배열
                        [{
                                "type": "rect",
                                "meta": {
                                    "cx": 300,
                                    "cy": 250,
                                    "width": 70,
                                    "height": 30,
                                    "shapeFillClassNum": "14",
                                    "shapeStrokeClassNum": "117",
                                    "shadowClassNum": "0006",
                                    "shapeStrokeWidth": 1,
                                    "rXY": 5
                                }
                            },
                            {
                                "type": "text",
                                "meta": {
                                    "cx": 300,
                                    "cy": 250,
                                    "text": "친절하게 대함",
                                    "classNum": "001",
                                    "fontSize": 10
                                }
                            }
                        ],
                        [{
                                "type": "rect",
                                "meta": {
                                    "cx": 395,
                                    "cy": 270,
                                    "width": 65,
                                    "height": 30,
                                    "shapeFillClassNum": "14",
                                    "shapeStrokeClassNum": "117",
                                    "shadowClassNum": "0006",
                                    "shapeStrokeWidth": 1,
                                    "rXY": 5
                                }
                            },
                            {
                                "type": "text",
                                "meta": {
                                    "cx": 395,
                                    "cy": 270,
                                    "text": "쫓아냄",
                                    "classNum": "001",
                                    "fontSize": 10
                                }
                            }
                        ]
                    ],
                    "ansIndex": 0, //정답 인덱스
                    "question": { // 첫 번째 초이스의 질문지
                        "elements": [{
                                "type": "image",
                                "meta": {
                                    "cx": 420,
                                    "cy": 180,
                                    "ImgUrl": "image_index_8", //말풍선
                                    "ImgScale": 0.23
                                }
                            },
                            {
                                "type": "text",
                                "meta": {
                                    "cx": 415,
                                    "cy": 170,
                                    "text": "text_index_11", // 이웃 마을 사람들은~
                                    "classNum": "001",
                                    "fontSize": 10,
                                    "dy": 15
                                }
                            }
                        ]
                    }
                },
                { //두 번째 초이스
                    "hintCount": 0,
                    "elements": [ //선택 보기 배열
                        [{
                                "type": "rect",
                                "meta": {
                                    "cx": 355,
                                    "cy": 370,
                                    "width": 75,
                                    "height": 30,
                                    "shapeFillClassNum": "14",
                                    "shapeStrokeClassNum": "117",
                                    "shadowClassNum": "0006",
                                    "shapeStrokeWidth": 1,
                                    "rXY": 5
                                }
                            },
                            {
                                "type": "text",
                                "meta": {
                                    "cx": 355,
                                    "cy": 370,
                                    "text": "할머니께 부탁함",
                                    "classNum": "001",
                                    "fontSize": 10
                                }
                            }
                        ],
                        [{
                                "type": "rect",
                                "meta": {
                                    "cx": 410,
                                    "cy": 320,
                                    "width": 75,
                                    "height": 30,
                                    "shapeFillClassNum": "14",
                                    "shapeStrokeClassNum": "117",
                                    "shadowClassNum": "0006",
                                    "shapeStrokeWidth": 1,
                                    "rXY": 5
                                }
                            },
                            {
                                "type": "text",
                                "meta": {
                                    "cx": 410,
                                    "cy": 320,
                                    "text": "할머니를 의심함",
                                    "classNum": "001",
                                    "fontSize": 10
                                }
                            }
                        ]
                    ],
                    "ansIndex": 0, //정답 인덱스
                    "question": { // 두 번째 초이스의 질문지
                        "elements": [{
                                "type": "image",
                                "meta": {
                                    "cx": 420,
                                    "cy": 235,
                                    "ImgUrl": "image_index_8", //말풍선
                                    "ImgScale": 0.23
                                }
                            },
                            {
                                "type": "text",
                                "meta": {
                                    "cx": 415,
                                    "cy": 225,
                                    "text": "text_index_12", //마을 어른들은~
                                    "classNum": "001",
                                    "fontSize": 10,
                                    "dy": 15
                                }
                            }
                        ]
                    }
                },
                { //세 번째 초이스
                    "hintCount": 0,
                    "elements": [
                        [{
                                "type": "rect",
                                "meta": {
                                    "cx": 245,
                                    "cy": 400,
                                    "width": 65,
                                    "height": 30,
                                    "shapeFillClassNum": "14",
                                    "shapeStrokeClassNum": "117",
                                    "shadowClassNum": "0006",
                                    "shapeStrokeWidth": 1,
                                    "rXY": 5
                                }
                            },
                            {
                                "type": "text",
                                "meta": {
                                    "cx": 245,
                                    "cy": 400,
                                    "text": "포기함",
                                    "classNum": "001",
                                    "fontSize": 10
                                }
                            }
                        ],
                        [{
                                "type": "rect",
                                "meta": {
                                    "cx": 360,
                                    "cy": 440,
                                    "width": 65,
                                    "height": 30,
                                    "shapeFillClassNum": "14",
                                    "shapeStrokeClassNum": "117",
                                    "shadowClassNum": "0006",
                                    "shapeStrokeWidth": 1,
                                    "rXY": 5
                                }
                            },
                            {
                                "type": "text",
                                "meta": {
                                    "cx": 360,
                                    "cy": 440,
                                    "text": "끝까지 노력함",
                                    "classNum": "001",
                                    "fontSize": 10
                                }
                            }
                        ]
                    ],
                    "ansIndex": 1,// 정답 인덱스
                    "question": { // 세 번째 초이스의 질문지
                        "elements": [{
                                "type": "image",
                                "meta": {
                                    "cx": 270,
                                    "cy": 320,
                                    "ImgUrl": "image_index_8", //말풍선
                                    "ImgScale": 0.23
                                }
                            },
                            {
                                "type": "text",
                                "meta": {
                                    "cx": 270,
                                    "cy": 310,
                                    "text": "text_index_13", // 젊은이는~
                                    "classNum": "001",
                                    "fontSize": 10,
                                    "dy": 15
                                }
                            }
                        ]
                    }
                },
                { //네 번째 초이스
                    "hintCount": 0,
                    "elements": [
                        [{
                                "type": "rect",
                                "meta": {
                                    "cx": 595,
                                    "cy": 400,
                                    "width": 65,
                                    "height": 30,
                                    "shapeFillClassNum": "14",
                                    "shapeStrokeClassNum": "117",
                                    "shadowClassNum": "0006",
                                    "shapeStrokeWidth": 1,
                                    "rXY": 5
                                }
                            },
                            {
                                "type": "text",
                                "meta": {
                                    "cx": 595,
                                    "cy": 400,
                                    "text": "당연히 여김",
                                    "classNum": "001",
                                    "fontSize": 10
                                }
                            }
                        ],
                        [{
                                "type": "rect",
                                "meta": {
                                    "cx": 595,
                                    "cy": 470,
                                    "width": 65,
                                    "height": 30,
                                    "shapeFillClassNum": "14",
                                    "shapeStrokeClassNum": "117",
                                    "shadowClassNum": "0006",
                                    "shapeStrokeWidth": 1,
                                    "rXY": 5
                                }
                            },
                            {
                                "type": "text",
                                "meta": {
                                    "cx": 595,
                                    "cy": 470,
                                    "text": "미안해함",
                                    "classNum": "001",
                                    "fontSize": 10
                                }
                            }
                        ]
                    ],
                    "ansIndex": 1,
                    "question": { // 네 번째 초이스의 질문지
                        "elements": [{
                                "type": "image",
                                "meta": {
                                    "cx": 630,
                                    "cy": 310,
                                    "ImgUrl": "image_index_8", //말풍선
                                    "ImgScale": 0.23
                                }
                            },
                            {
                                "type": "text",
                                "meta": {
                                    "cx": 627,
                                    "cy": 300,
                                    "text": "text_index_14", //젊은이는 어떤~
                                    "classNum": "001",
                                    "fontSize": 10,
                                    "dy": 15
                                }
                            }
                        ]
                    }
                }
            ],
            "elements": [], //배경 요소
            "animation": { //애니메이션 정보
                "moveImage": { //움직이는 이미지
                    "url": "image_index_6", //젊은이
                    "scale": 0.5
                },
                "mazeImage": { // 미로 이미지
                    "x": 60,
                    "y": 120,
                    "scale": 0.85,
                    "imgIndex": 0 //이미지풀에서의 인덱스
                },
                "pathAttr": { //패스정보
                    "strokeWidth": 15,
                    "stroke": "04"
                },
                "elements": [{ // 애니메이션 내의 배경요소(반응없는)
                    "type": "image",
                    "meta": {
                        "cx": 650,
                        "cy": 420,
                        "ImgUrl": "image_index_5", //옥수수
                        "ImgScale": 0.35
                    }
                }]
            }
        }
    }
    ```

> ## KM000077

    CHOOSE 7 (CR06 79a)

-   ### 기본 포맷

    ```javascript
    {
        "questionType": "KM000077",
        "direction": {
            "text": "text_index_0",
            "classNum": "\"000\"",
            "bold": true
        },
        "elements": null,
        "choice": {
            "background": {
                "width": 630,
                "height": 43,
                "fillClassNum": "14",
                "strokeClassNum": "117",
                "r": 10,
                "opacity": 1
            },
            "selectedStyle": {
                "strokeWidth": 5,
                "strokeClassNum": "0018",
                "fontColor": "001"
            },
            "font": {
                "size": 23,
                "left": 30,
                "classNum": "001",
                "bold": false
            },
            "list": [
                {
                    "text": "text_index_1",
                    "x": 70,
                    "y": 135
                },
                {
                    "text": "text_index_2",
                    "x": 70,
                    "y": 192
                },
                {
                    "text": "text_index_3",
                    "x": 70,
                    "y": 252
                },
                {
                    "text": "text_index_4",
                    "x": 70,
                    "y": 312
                },
                {
                    "text": "text_index_5",
                    "x": 70,
                    "y": 372
                },
                {
                    "text": "text_index_6",
                    "x": 70,
                    "y": 432
                }
            ]
        },
        "popupInfo": {
            "cx": 400,
            "cy": 260,
            "width": 600,
            "height": 350,
            "rXY": 10,
            "elements": [
                [
                    {
                        "type": "text",
                        "meta": {
                            "cx": 500,
                            "cy": 190,
                            "text": "text_index_10",
                            "classNum": "001",
                            "fontSize": 26,
                            "bold": true
                        }
                    }
                ],
                [
                    {
                    "type": "image",
                        "meta": {
                            "cx": 280,
                            "cy": 180,
                            "imgUrl": "image_index_0",
                            "imgScale": 0.7
                        }
                    },
                    {
                    "type": "text",
                    "meta": {
                        "cx": 400,
                        "cy": 340,
                        "text": "text_index_7",
                        "classNum": "001",
                        "fontSize": 25,
                        "bold": false
                    }
                    }
                ],
                [
                    {
                    "type": "image",
                        "meta": {
                            "cx": 280,
                            "cy": 180,
                            "imgUrl": "image_index_1",
                            "imgScale": 0.7
                        }
                    },
                    {
                    "type": "text",
                        "meta": {
                            "cx": 400,
                            "cy": 340,
                            "text": "text_index_8",
                            "classNum": "001",
                            "fontSize": 25,
                            "bold": false
                        }
                    }
                ],
                [
                    {
                    "type": "image",
                        "meta": {
                            "cx": 280,
                            "cy": 180,
                            "imgUrl": "image_index_2",
                            "imgScale": 0.7
                        }
                    },
                    {
                    "type": "text",
                        "meta": {
                            "cx": 400,
                            "cy": 340,
                            "text": "text_index_9",
                            "classNum": "001",
                            "fontSize": 25,
                            "bold": false
                        }
                    }
                ]
            ],
            "timeout": 2000
        }
    }
    ```
