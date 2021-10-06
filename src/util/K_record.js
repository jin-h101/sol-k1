import AudioRecorder from 'audio-recorder-polyfill';
window.MediaRecorder = AudioRecorder;

export default async function K1Record(endCallback) {
    let userRecord = [];
    const constraints = {
        audio: true
    };    
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    const mediaRecorder = new MediaRecorder(stream);

    const audio = new Audio();
    audio.controls = true;
    const source = document.createElement('source');
    audio.appendChild(source);

    mediaRecorder.addEventListener('stop', () => {
        let bool = true;
        if (userRecord[0].size === 0) bool = false;
        if (bool) {
            const audioURL = URL.createObjectURL(userRecord[0]);
            source.src = audioURL;
            audio.load();            
        }
        userRecord = [];
        endCallback(bool);
    });

    mediaRecorder.addEventListener('dataavailable', e => userRecord.push(e.data));

    return {
        mediaRecorder,
        audio,
        source
    };
}
