export const meta1 = [{
    "questionType": "KM000054",
    "direction": {
      "text": "text_index_0",
      "classNum": "000",
      "bold": true
    },
    "drag": {
      "dragEl": {
        "background": {
          "type": "rect",
          "meta": {
            "width": 720,
            "height": 100,
            "shapeStrokeClassNum": "117",
            "shapeStrokeWidth": 1,
            "shadowClassNum": "0006"
          }
        },
        "elements": [
          [
            {
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
            },
            {
              "type": "text",
              "meta": {
                "cx": 160,
                "cy": 320,
                "text": "무지개",
                "classNum": "000",
                "fontSize": 35
              }
            }
          ],
          [
            {
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
            },
            {
              "type": "text",
              "meta": {
                "cx": 320,
                "cy": 320,
                "text": "병아리",
                "classNum": "000",
                "fontSize": 35
              }
            }
          ],
          [
            {
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
            },
            {
              "type": "text",
              "meta": {
                "cx": 480,
                "cy": 320,
                "text": "개나리",
                "classNum": "000",
                "fontSize": 35
              }
            }
          ],
          [
            {
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
            },
            {
              "type": "text",
              "meta": {
                "cx": 640,
                "cy": 320,
                "text": "나팔",
                "classNum": "000",
                "fontSize": 35
              }
            }
          ]
        ]
      },
      "step": [
        { // 첫 번째 step
            "ansIndex": 0,
            "sentence": { 
                "cx": 400,
                "cy": 430,
                "text": "하늘에 $blank{무지개}가 뜹니다.",
                "blankOption": {
                    "offset": 10,  // 옵션, 없으면 10
                    "width": 125, // 옵션, 없으면 안에 들어간 텍스트 길이만큼 자동으로
                    "height": 65, // 옵션, 없으면 폰트 사이즈의 1.5배
                    "rXY": 10, // 옵션, 없으면 10
                    "strokeClassNum": "01",
                    "strokeWidth": 1,
                    "visible": true, // 옵션, 디폴트는 true
                    "wordVisible": false, //  옵션, 디폴트는 false
                },
                "questionMark": true, // 옵션, 디폴트는 true
                "questionMarkOption": {
                    "fontSize": 35,  // 옵션, 디폴트는 fontSize
                    "classNum": "0002",
                    "isBold": true // 옵션, 디폴트는 false
                },
                "fontSize": 30, // 옵션, 디폴트는 true
                "classNum": "000" , // 옵션, 디폴트는 "000"
                "isBold": false // 옵션, 디폴트는 false
            }, // 해당 스텝 문장
            "dragPosition": {
                "cx": 400,
                "cy": 250
            }, // 옵션, 없으면 blank의 cx, cy
            "soundButton": {
                "elements": [
                    {
                        "imgUrl": "image_index_0",
                        "scale": 0.4,
                        "cx": 400, 
                        "cy": 150 
                    }
                ],
                "sound": {
                  "soundUrl": "sound_index_0",
                  "imgUrl": "image_index_0", // 옵션, 스피커 버튼 이미지 다른 것 사용할 때
                  "scale": 1,
                  "cx": 100,
                  "cy": 100
                }
              },
            "elements": [ // 옵션, 해당 스텝에 필요한 반응 없는 element
                {
                    "type": "rect",
                    "meta": {
                      "cx": 400,
                      "cy": 250,
                      "width": 120,
                      "height": 60,
                      "shapeFillClassNum": "14",
                      "shapeStrokeClassNum": "117",
                      "shapeStrokeWidth": 1,
                    }
                  }
            ] 
        }, { // 두 번째 step
            "ansIndex": 2,
            "sentence": { 
                "cx": 400,
                "cy": 430,
                "text": "봄이 오면 노란 $blank{개나리}가 핍니다.",
                "blankOption": {
                    "offset": 10,  // 옵션, 없으면 10
                    "width": 125, // 옵션, 없으면 안에 들어간 텍스트 길이만큼 자동으로
                    "height": 65, // 옵션, 없으면 폰트 사이즈의 1.5배
                    "rXY": 10, // 옵션, 없으면 10
                    "strokeClassNum": "01",
                    "strokeWidth": 1,
                    "visible": true, // 옵션, 디폴트는 true
                    "wordVisible": false, //  옵션, 디폴트는 false
                },
                "questionMark": true, // 옵션, 디폴트는 true
                "questionMarkOption": {
                    "fontSize": 35,  // 옵션, 디폴트는 fontSize
                    "classNum": "0002",
                    "isBold": true // 옵션, 디폴트는 false
                },
                "fontSize": 30, // 옵션, 디폴트는 true
                "classNum": "000" , // 옵션, 디폴트는 "000"
                "isBold": false // 옵션, 디폴트는 false
            }, // 해당 스텝 문장
        }, { // 세 번째 step
            "ansIndex": 3,
            "sentence": { 
                "cx": 400,
                "cy": 430,
                "text": "뚜뚜, $blank{나팔}을 신나게 붑니다.",
                "blankOption": {
                    "offset": 10,  // 옵션, 없으면 10
                    "width": 125, // 옵션, 없으면 안에 들어간 텍스트 길이만큼 자동으로
                    "height": 65, // 옵션, 없으면 폰트 사이즈의 1.5배
                    "rXY": 10, // 옵션, 없으면 10
                    "strokeClassNum": "01",
                    "strokeWidth": 1,
                    "visible": true, // 옵션, 디폴트는 true
                    "wordVisible": false, //  옵션, 디폴트는 false
                },
                "questionMark": true, // 옵션, 디폴트는 true
                "questionMarkOption": {
                    "fontSize": 35,  // 옵션, 디폴트는 fontSize
                    "classNum": "0002",
                    "isBold": true // 옵션, 디폴트는 false
                },
                "fontSize": 30, // 옵션, 디폴트는 true
                "classNum": "000" , // 옵션, 디폴트는 "000"
                "isBold": false // 옵션, 디폴트는 false
            }, // 해당 스텝 문장
        }, { // 네 번째 step
            "ansIndex": 1,
            "sentence": { 
                "cx": 400,
                "cy": 430,
                "text": "삐약삐약, 귀여운 $blank{병아리}가 마당에 있습니다.",
                "blankOption": {
                    "offset": 10,  // 옵션, 없으면 10
                    "width": 125, // 옵션, 없으면 안에 들어간 텍스트 길이만큼 자동으로
                    "height": 65, // 옵션, 없으면 폰트 사이즈의 1.5배
                    "rXY": 10, // 옵션, 없으면 10
                    "strokeClassNum": "01",
                    "strokeWidth": 1,
                    "visible": true, // 옵션, 디폴트는 true
                    "wordVisible": false, //  옵션, 디폴트는 false
                },
                "questionMark": true, // 옵션, 디폴트는 true
                "questionMarkOption": {
                    "fontSize": 35,  // 옵션, 디폴트는 fontSize
                    "classNum": "0002",
                    "isBold": true // 옵션, 디폴트는 false
                },
                "fontSize": 30, // 옵션, 디폴트는 true
                "classNum": "000" , // 옵션, 디폴트는 "000"
                "isBold": false // 옵션, 디폴트는 false
            }, // 해당 스텝 문장
            "dragPosition": {}, // 옵션, 없으면 blank의 
            "elements": [], // 옵션, 해당 스텝에 필요한 반응 없는 element
        }
      ], // drag.step 끝
    }, // drag 끝
    "puzzle": {
        "hintCount": 1,
        "arrage": [
            ["무", "지", "개", null],
            [null, null, "나", "팔"],
            ["병", "아", "리", null]
        ],
        "puzzleInfo": {
            "position": {
                "cx": 400,
                "cy": 300,
                "scale": 1
            },
            "style": {
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
            },
            "text": {
                "fontSize": 30,
                "basicClassNum": "14",
                "pointClassNum": "0002",
            }
        },
        "eventEl": [
            { // 첫 번째
                "soundButton": {
                    "elements": [
                        {
                            "imgUrl": "image_index_0",
                            "scale": 0.4,
                            "cx": 400, 
                            "cy": 150 
                        }
                    ],
                    "sound": {
                      "soundUrl": "sound_index_0",
                      "scale": 0.3,
                      "cx": 400,
                      "cy": 100
                    }
                },
                "puzzleIndex": [
                    [true, true, true, false],
                    [false, false, false, false],
                    [false, false, false, false],
                ] 
            },
            { // 두 번째
                "imageButton": {
                    "image": {
                        "imgUrl": "images/K1/KI00000010.svg",
                        "scale": 0.5,
                        "cx": 200,
                        "cy": 100
                    },
                    "sound": {
                        // "soundUrl":
                    }
                },
                "puzzleIndex": [
                    [false, false, true, false],
                    [false, false, true, false],
                    [false, false, true, false]
                ] 
            },
            { // 세 번째
                "imageButton": {
                    "image": {
                        "imgUrl": "images/K1/KI00000010.svg",
                        "scale": 0.5,
                        "cx": 600,
                        "cy": 300
                    },
                    "sound": {
                        // "soundUrl":
                    }
                },
                "puzzleIndex": [
                    [false, false, false, false],
                    [false, false, true, true],
                    [false, false, false, false]
                ] 
            }
        ]
    }
  }];



  