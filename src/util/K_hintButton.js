// import Snap from 'sol-common/snap'

// import { K_richTextAuto } from "./K_text";
// import { helpImg } from "./com_image";

// // import bulb from '../assets/images/bulb.svg'

// const K_hintButton = function ({
//     canvas,
//     btnXY,
//     fontSize=14,
//     hintMessage,
//     className,
//     backgroundClass,
//     messageGap = [0, 0],
//     event = false,
// }) {
//     const g = canvas.g();
//     const textG = g.g().attr('opacity', '0');
//     const iconG = g.g();
//     const helpImgs = helpImg();
//     const dy = fontSize + 10;

//     const pressImg = helpImgs[1].use().transform(Snap.matrix(1,0,0,1,btnXY[0],btnXY[1])).appendTo(iconG).attr('opacity',0);
//     const touchBtn = helpImgs[0].use()
//                                 .transform(Snap.matrix(1,0,0,1,btnXY[0],btnXY[1]))
//                                 .appendTo(iconG)
//                                 .attr('pointerEvents','none');                       

//     const t=new K_richTextAuto({
//         'canvas': textG,
//         'text': hintMessage,
//         'x': 0,
//         'y': 0,
//         'className': className || 'ffng f001',
//         'fontSize': fontSize,
//         'dy': dy,
//     });
//     const textBbox = t.getBBox();
//     textG.rect(textBbox.cx, textBbox.cy, textBbox.w + 10, textBbox.h + 10).addClass(backgroundClass || 'f14 sno').attr({
//         'opacity': 1
//     }).center().prependTo(t);
//     const bbox = iconG.getTBox();
//     textG.transform('t'+[bbox.x + 5 + messageGap[0], bbox.y2 + dy + messageGap[1]]);
                    
//     touchBtn.pressEvent(function(bool){
//         if(bool){
//             console.log('누르기')
//             this.attr('opacity',0);
//             pressImg.attr('opacity',1);
//         }else{
//             if (textG.attr('opacity') === '0') {
//                 textG.attr('opacity', '1')
//             } else {
//                 textG.attr('opacity', '0')
//             }
//             pressImg.attr('opacity',0);
//             this.attr('opacity',1);
//         }
//     })

//     if (event) touchBtn.attr('pointerEvents', 'auto');

//     this.start = function () {
//         if (!event) touchBtn.attr('pointerEvents', 'auto');
//     }
//     return this;
// }

// export default K_hintButton;