const audio = document.querySelector('audio');
const cvs = document.querySelector('canvas');
const ctx = cvs.getContext('2d');

function initCvs() {
    cvs.width = window.innerWidth * devicePixelRatio;
    cvs.height = (window.innerHeight / 2) * devicePixelRatio;
}

initCvs();


let isInit = false;

let dateArray;

let analyser;

audio.onplay = function () {
    if (isInit) {
        return;
    }

    const audioCtx = new AudioContext();

    const source = audioCtx.createMediaElementSource(audio);

    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 512;

    dateArray = new Uint8Array(analyser.frequencyBinCount);

    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    isInit = true;
}


function draw() {
    requestAnimationFrame(draw);

    const { width, height } = cvs;

    ctx.clearRect(0, 0, width, height);
    if (!isInit) {
        return;
    }

    analyser.getByteFrequencyData(dateArray);

    const len = dateArray.length;
    const barWidth = width / len;

    ctx.fillStyle = '#e0f9b5';

    for (let i = 0; i < len; i++) {
        const date = dateArray[i];
        const barHeight = (date / 255) * height;
        const x = i * barWidth;
        const y = height - barHeight;
        ctx.fillRect(x, y, barHeight, barWidth);
    }
}

draw();
