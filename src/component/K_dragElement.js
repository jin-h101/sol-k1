 
import Snap from 'sol-common/snap'
// import { loadImage } from 'sol-common';
// import pencil from '../assets/images/pencil.svg'
// import { SOL, getPointAtEvent } from 'sol-common/util';

 const K_dragElement = function ({
     el,
     pathStr,
     matrix,
     pathAttr = {
         'class': 'fno s001',
         'stroke-width': 25,
         'stroke-linejoin': 'miter',
         'stroke-linecap': 'square',
         'pointer-events': 'none'
     },
     rotate = true,
     mousePointer=true,
     callback
 }) {
     const bbox = el.getBBox(true);
    const cursorType = mousePointer? 'cp': 'penNone';

     let pathArray = false,
         pathArrayLen, path, pt, totLen, l, n = 0,
         isStop = false,
         isEnd = false,
         BBox;
     if (Array.isArray(pathStr)) {
         pathArray = true;
         pathArrayLen = pathStr.length;
     }
     el.attr({
         visibility: 'hidden'
     });

     function setVal(pStr) {
         const str = matrix ? Snap.path.map(pStr, matrix) : pStr;
         path = el.parent().path(str).attr(pathAttr || {
             'class': 'fno sno'
         }).after(el);
         pt = path.getPointAtLength(0);
         totLen = path.getTotalLength();
         l = 0;
         el.transform('t' + [pt.x - bbox.cx, pt.y - bbox.cy] + 'r' + (rotate ? pt.alpha : 0));
         if (pathAttr) {
             path.attr({
                 'stroke-dasharray': totLen + 1,
                 'stroke-dashoffset': totLen
             });
         }
     }

     function start() {
        if(!mousePointer) el.addClass(cursorType);
         BBox = this.getBBox();
     }

     function move(dx, dy, x, y, e) {
         e.preventDefault();
         let tdx, tdy;
         const snapInvMatrix = this.transform().diffMatrix.invert();
         snapInvMatrix.e = snapInvMatrix.f = 0;
         tdx = snapInvMatrix.x(dx, dy);
         tdy = snapInvMatrix.y(dx, dy);
        console.log(isStop);
         if (!isStop) {
             const tmpPt = {
                 x: BBox.cx + tdx,
                 y: BBox.cy + tdy
             };
             const myPoint = getMyPoint(pt, tmpPt);
             if (myPoint) {
                 pt = myPoint.pt;
                 const alpha = myPoint.alpha;
                 this.transform('t' + [pt.x - bbox.cx, pt.y - bbox.cy] + 'r' + (rotate ? alpha : 0));
                 if (pathAttr) {
                     path.attr({
                         'stroke-dashoffset': totLen - l
                     });
                 }
             }
         }
     }

     function stop() {
         if (isEnd) {
            // el.removeClass('cp').undrag();
             el.removeClass(cursorType).undrag();
             callback(true,path);
         } else {
                if(!mousePointer) el.removeClass(cursorType);
                if (!isStop) {
                    callback(false);
                } else {
                    isStop = false;
                }
         }
     }

     function getMyPoint(pt0, pt1) {
         let point0 = pt0;
         let dist0 = dist(point0, pt1);
         let len = l;
         len += 1;
         let point1 = path.getPointAtLength(len);
         let dist1 = dist(point1, pt1);

         while (dist1 < dist0) {
             dist0 = dist1;
             point0 = point1;
             len += 1;
             point1 = path.getPointAtLength(len);
             dist1 = dist(point1, pt1);
         }
         l = len - 1;
         let alpha = point1.alpha;

         if (l >= totLen - 30) {
             l = totLen;
             point0 = path.getPointAtLength(totLen);
             alpha = path.getPointAtLength(totLen - 0.5).alpha;
             if (pathArray && n < pathArrayLen - 1) {
                 if (pathAttr) {
                     path.attr({
                         'stroke-dashoffset': 0
                     });
                 }
                 isStop = true;
                 n += 1;
                 return;
             } else {
                 isEnd = true;
             }
         }
         return {
             pt: point0,
             alpha: alpha
         };
     }

     function dist(pt1, pt2) {
         const dx = pt1.x - pt2.x;
         const dy = pt1.y - pt2.y;
         return Math.sqrt(dx * dx + dy * dy);
     }

     this.start = function () {
         el.attr({
             visibility: 'visible'
         });
         if (pathArray) {
             setVal(pathStr[n]);
         } else {
             setVal(pathStr);
         }

         if(n===0){
            // el.addClass('cp').drag(move, start, stop);
            if(mousePointer) el.addClass(cursorType);
            el.drag(move, start, stop);
         }
     };
 }

 export default K_dragElement;