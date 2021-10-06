import K1Record from '../util/K_record';
import { loadrecordImg } from './com_image';

/*
p = {
    canvas: g,
    record: {},
    recordCallback,
    stopCallback,
    listenCallback,
    pauseCallback
}
*/
export const K_record = function ({
    canvas,
    record: recordInfo = {},
    recordStartCallback,
    recordEndCallback,
    listenStartCallback,
    listenEndCallback
}) {
    const { cx = 400, cy = 430, gap = 60, limitTime = 10000 } = recordInfo;
    
    const g = canvas.g().attr({ visibility: 'hidden' });
    const recordContainerG = g.g();
    const recordG = recordContainerG.g();
    const listenG = recordContainerG.g();
    const recordItemG = recordG.g();
    const recordStopG = recordG.g();
    const listenItemG = listenG.g();
    const listenPauseG = listenG.g();
    
    const btnW = 60;
    const { record, listen, pause, stop } = loadrecordImg('1');
    const recordState = {
        record: 'active', // active, nonActive, hidden
        listen: 'nonActive' // active, nonActive, hidden
    };
    
    let myRecord;
    let isFirst = true;
    let timeLimit;
    
    const actionButton = (g, onClick) => {
        const children = g.children();
        children[1].attr('opacity', 0);
        children[2].attr('opacity', 0);
        g.pressEvent(bool => {
            if (bool) {
                children[0].attr('opacity', 0);
                children[1].attr('opacity', 1);
            } else {
                children[0].attr('opacity', 1);
                children[1].attr('opacity', 0);
                onClick && onClick();
            }
        });
        
        g.nonAcitve = () => {
            g.attr({ pointerEvents: 'none' });
            children[0].attr('opacity', 0);
            children[1].attr('opacity', 0);
            children[2].attr('opacity', 1);
        };
        g.active = () => {
            g.attr({ pointerEvents: 'auto' });
            children[0].attr('opacity', 1);
            children[1].attr('opacity', 0);
            children[2].attr('opacity', 0);
        };
        g.hidden = () => {
            g.attr({ pointerEvents: 'none' });
            children[0].attr('opacity', 0);
            children[1].attr('opacity', 0);
            children[2].attr('opacity', 0);
        };
        return g;
    };
    
    const drawRecordImage = () => {
        record.forEach((el) => {
            el.use()
            .transform('t' + [cx - gap / 2 - btnW, cy])
            .center()
            .appendTo(recordItemG);
        });
        stop.forEach((el) => {
            el.use()
            .transform('t' + [cx - gap / 2 - btnW, cy])
            .center()
            .appendTo(recordStopG);
        });
        listen.forEach((el) => {
            el.use()
            .transform('t' + [cx + gap / 2 + btnW, cy])
            .center()
            .appendTo(listenItemG);
        });
        pause.forEach((el) => {
            el.use()
            .transform('t' + [cx + gap / 2 + btnW, cy])
            .center()
            .appendTo(listenPauseG);
        });
    };
    
    // 녹음하기 버튼 선택 시
    const _record = async () => {
        recordState.record = 'hidden';
        recordState.listen = 'nonActive';
        recordIconState();
        recordStartCallback && recordStartCallback();
        
        if (!myRecord) {
            const endCallback = (bool) => {
                if (bool) isFirst = false;
                recordState.record = 'active';
                recordState.listen = isFirst ? 'nonActive' : 'active';
                if (!isFirst && recordEndCallback) recordEndCallback();
                recordIconState();
            };
            myRecord = await K1Record(endCallback);
        }
        myRecord.mediaRecorder.start(); // 녹음 시작
        timeLimit = setTimeout(() => {
            // 5초 후 자동 중지
            myRecord.mediaRecorder.stop(); // 녹음 중지
            recordState.record = 'active';
            recordState.listen = isFirst ? 'nonActive' : 'active';
            if (!isFirst && recordEndCallback) recordEndCallback();
            recordIconState();
        }, limitTime);
    };
    // 녹음 끝내기 버튼 선택 시
    const _stop = () => {
        recordState.record = 'active';
        recordState.listen = 'active';
        recordIconState();
        clearTimeout(timeLimit); // clearTimeout
        myRecord?.mediaRecorder.stop();
        recordEndCallback && recordEndCallback();
    };
    // 들어보기 버튼 선택 시
    const _listen = () => {
        recordState.record = 'nonActive';
        recordState.listen = 'hidden';
        recordIconState();
        listenStartCallback && listenStartCallback();
        
        myRecord.audio.play();
        
        myRecord.audio.onended = () => {
            // 재생 끝나면
            recordState.record = 'active';
            recordState.listen = 'active';
            recordIconState();
            listenEndCallback && listenEndCallback();
        };
    };
    
    // 재생 멈추기 버튼 선택 시
    const _pause = () => {
        recordState.record = 'active';
        recordState.listen = 'active';
        myRecord?.audio.pause();
        recordIconState();
        listenEndCallback && listenEndCallback();
    };
    
    const recordIconState = () => {
        const { record, listen } = recordState;
        
        if (record === 'active') {
            recordItemG.active();
            recordStopG.hidden();
        }
        if (record === 'nonActive') {
            recordItemG.nonAcitve();
            recordStopG.hidden();
        }
        if (record === 'hidden') {
            recordItemG.hidden();
            recordStopG.active();
        }
        if (listen === 'active') {
            listenItemG.active();
            listenPauseG.hidden();
        }
        if (listen === 'nonActive') {
            listenItemG.nonAcitve();
            listenPauseG.hidden();
        }
        if (listen === 'hidden') {
            listenItemG.hidden();
            listenPauseG.active();
        }
    };
    
    drawRecordImage();
    actionButton(recordItemG, _record);
    actionButton(recordStopG, _stop);
    actionButton(listenItemG, _listen);
    actionButton(listenPauseG, _pause);
    
    g.show = () => g.attr('visibility', 'visible');
    g.hidden = () => g.attr('visibility', 'hidden');
    g.start = () => {
        g.attr('visibility', 'visible');
        recordIconState(); // 처음 실행
    };
    g.getState = () => recordState;
    g.initIcon = () => {
        recordState.record = 'active';
        recordState.listen = 'nonActive';
        recordIconState();
    };
    g.pause = () => _pause();
    g.stop = () => _stop();
    
    return g;
};
