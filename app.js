import Timer from './timer.js';

const tempoDisplay = document.querySelector('.tempo');
const tempoText = document.querySelector('.tempo-text');
const decreaseTempoByHalfButton = document.querySelector('.decrease-tempo-by-half');
const decreaseTempoByFiveButton = document.querySelector('.decrease-tempo-by-five');
const decreaseTempoByOneButton = document.querySelector('.decrease-tempo-by-one');
const increaseTempoByOneButton = document.querySelector('.increase-tempo-by-one');
const increaseTempoByFiveButton = document.querySelector('.increase-tempo-by-five');
const increaseTempoByDoubleButton = document.querySelector('.increase-tempo-by-double');
const tempoSlider = document.querySelector('.slider');
const startStopButton = document.querySelector('.start-stop');
const subtractBeats = document.querySelector('.subtract-beats');
const addBeats = document.querySelector('.add-beats');
const measureCount = document.querySelector('.measure-count');

const click1 = new Audio('src/sounds/metronome/High_Seiko_SQ50.wav');
const click2 = new Audio('src/sounds/metronome/Low_Seiko_SQ50.wav');

let beatsPerMinute = 120;
let beatsPerMeasure = 4;
let beatCount = 0;
let isRunning = false;
let tempoTextString = 'Allegro';

decreaseTempoByHalfButton.addEventListener('click', () => {
    if (beatsPerMinute <= 20) { return };
    beatsPerMinute *= 0.5;
    updateMetronome();
    validateTempo();
});

decreaseTempoByFiveButton.addEventListener('click', () => {
    if (beatsPerMinute <= 20) { return };
    beatsPerMinute -= 5;
    updateMetronome();
    validateTempo();
});

decreaseTempoByOneButton.addEventListener('click', () => {
    if (beatsPerMinute <= 20) { return };
    beatsPerMinute --;
    updateMetronome();
    validateTempo();
});

increaseTempoByFiveButton.addEventListener('click', () => {
    if (beatsPerMinute >= 400) { return };
    beatsPerMinute += 5;
    updateMetronome();
    validateTempo();
});

increaseTempoByOneButton.addEventListener('click', () => {
    if (beatsPerMinute >= 400) { return };
    beatsPerMinute ++;
    updateMetronome();
    validateTempo();
});

increaseTempoByDoubleButton.addEventListener('click', () => {
    if (beatsPerMinute >= 400) { return };
    beatsPerMinute *= 2;
    updateMetronome();
    validateTempo();
});

tempoSlider.addEventListener('input', () => {
    beatsPerMinute = parseInt(tempoSlider.value);
    updateMetronome();
    validateTempo();
});

subtractBeats.addEventListener('click', () => {
    if (beatsPerMeasure <= 2) { return };
    beatsPerMeasure --;
    measureCount.textContent = beatsPerMeasure;
    beatCount = 0;
});

addBeats.addEventListener('click', () => {
    if (beatsPerMeasure >= 12) { return };
    beatsPerMeasure ++;
    measureCount.textContent = beatsPerMeasure;
    beatCount = 0;
});

startStopButton.addEventListener('click', () => {
    beatCount = 0;
    if (!isRunning) {
        metronome.start();
        isRunning = true;
        startStopButton.textContent = 'STOP';
    } else {
        metronome.stop();
        isRunning = false;
        startStopButton.textContent = 'START';
    }
});


function updateMetronome() {
    tempoDisplay.textContent = beatsPerMinute;
    tempoSlider.value = beatsPerMinute;
    metronome.timeInterval = 60000 / beatsPerMinute;
    if (beatsPerMinute <= 40) { tempoTextString = 'Grave'};
    if (beatsPerMinute > 40 && beatsPerMinute <= 45) { tempoTextString = 'Lento'};
    if (beatsPerMinute > 45 && beatsPerMinute <= 55) { tempoTextString = 'Largo'};
    if (beatsPerMinute > 55 && beatsPerMinute <= 65) { tempoTextString = 'Adagio'};
    if (beatsPerMinute > 65 && beatsPerMinute <= 73) { tempoTextString = 'Adagietto'};
    if (beatsPerMinute > 73 && beatsPerMinute <= 86) { tempoTextString = 'Andante'};
    if (beatsPerMinute > 86 && beatsPerMinute <= 97) { tempoTextString = 'Moderato'};
    if (beatsPerMinute > 97 && beatsPerMinute <= 109) { tempoTextString = 'Allegretto'};
    if (beatsPerMinute > 109 && beatsPerMinute <= 132) { tempoTextString = 'Allegro'};
    if (beatsPerMinute > 132 && beatsPerMinute <= 140) { tempoTextString = 'Vivace'};
    if (beatsPerMinute > 140 && beatsPerMinute <= 177) { tempoTextString = 'Presto'};
    if (beatsPerMinute > 178 && beatsPerMinute <= 200) { tempoTextString = 'Prestissimo'};
    if (beatsPerMinute > 200) { tempoTextString = 'Somebody call the fire department'};

    tempoText.textContent = tempoTextString;
};

function validateTempo() {
    if (beatsPerMinute <= 20) { return };
    if (beatsPerMinute >= 400) { return };
}

function playClick() {
    if (beatCount === beatsPerMeasure) {
        beatCount = 0;
    } 

    if (beatCount === 0) {
        click1.play();
        click1.currentTime = 0;
    } else {
        click2.play();
        click2.currentTime = 0;
    }

    beatCount ++;
}

const metronome = new Timer(playClick, 60000 / beatsPerMinute, { immediate: true});
