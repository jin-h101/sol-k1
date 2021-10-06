const K_ok = function ({
    canvas,
    type=0,
    x = 650,
    y = 450,
    width = 80,
    height = 40,
    visibility = false,
    event = false,
    callback = undefined
}) {
    const self = this;
    const g = canvas.g();
    const btn = [];
    const btnColor='112';
    for (let a = 0; a < 2; a++) {
        btn[a] = g.g().attr('opacity', 0);
        const rectBBox =btn[a].rect(0,0,width,height,20,20).addClass('f'+['14', btnColor][a]+' s'+[btnColor, 'no'][a]).attr({
            'strokeWidth':2
        }).center().getTBox();
        btn[a].text(rectBBox.cx,rectBBox.cy,['확인','다음'][type]).addClass('ffng '+['f'+btnColor,'f14'][a]).attr({
            'fontSize':20,
        }).center();
        btn[a].transform('t'+[x,y]);
    }

    if (visibility) visible(btn[0]);
    if (!event) g.attr('pointer-events','none');
    auto(g);
    // if (event) auto(g);
    
    
    this.start = function () {  
        if (!visibility) visible(btn[0]);
        // if (!event) auto(g);
        if(g.attr('pointer-events')!=='auto') g.attr('pointer-events','auto') 
    };
    this.stop = function(){
        if(g.attr('pointer-events')!=='none') g.attr('pointer-events','none')   
    }
    this.kill=function(){
        if(g.attr('pointer-events')!=='none') g.attr('pointer-events','none')
        g.remove();
    }

    this.callback = callback;

    function visible(el) {
        el.attr('opacity', 1);
    }

    function auto(group) {
        group.pressEvent(function (bool) {
            //이미지 change
            for (let i = 0; i < 2; i++) {
                btn[i].attr({
                    opacity: bool ? i : 1 - i
                });
            }
            if (!bool && self.callback) self.callback();
        });
    }
    return this;
};
export default K_ok;