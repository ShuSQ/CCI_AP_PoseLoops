
let drumRnn = new mm.MusicRNN('https://storage.googleapis.com/download.magenta.tensorflow.org/tfjs_checkpoints/music_rnn/drum_kit_rnn');

const midiDrums = [36, 38, 42, 46, 41, 43, 45, 49, 51];


// 创建映射关系
const reverseMidiMapping = new Map([
    [36, 0],
    [35, 0],
    [38, 1],
    [27, 1],
    [28, 1],
    [31, 1],
    [32, 1],
    [33, 1],
    [34, 1],
    [37, 1],
    [39, 1],
    [40, 1],
    [56, 1],
    [65, 1],
    [66, 1],
    [75, 1],
    [85, 1],
    [42, 2],
    [44, 2],
    [54, 2],
    [68, 2],
    [69, 2],
    [70, 2],
    [71, 2],
    [73, 2],
    [78, 2],
    [80, 2],
    [46, 3],
    [67, 3],
    [72, 3],
    [74, 3],
    [79, 3],
    [81, 3],
    [45, 4],
    [29, 4],
    [41, 4],
    [61, 4],
    [64, 4],
    [84, 4],
    [48, 5],
    [47, 5],
    [60, 5],
    [63, 5],
    [77, 5],
    [86, 5],
    [87, 5],
    [50, 6],
    [30, 6],
    [43, 6],
    [62, 6],
    [76, 6],
    [83, 6],
    [49, 7],
    [55, 7],
    [57, 7],
    [58, 7],
    [51, 8],
    [52, 8],
    [53, 8],
    [59, 8],
    [82, 8]
]);

// 设置混合强度
const temperature = 1.0;
// 设置pattern长度，小节数？
const patternLength = 32;

var seedPattern = [
    [0, 2],
    [0],
    [2, 5, 8],
    [],
    [2, 5, 8],
    [],
    [0, 2, 5, 8],
    [4, 5, 8],
    [],
    [0, 5, 8]
];

/*
在可视化结果上会是矩阵的转置，如下：

1 1 0 0 0 0 1 0 0 1
0 0 0 0 0 0 0 0 0 0
1 0 1 0 1 0 1 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 1 0 0
0 0 1 0 1 0 1 1 0 1
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 1 0 1 0 1 1 0 1

*/

let reverb = new Tone.Convolver(`assets/small-drum-room.wav`).toMaster();
reverb.wet.value = 0.3;

// 载入音频文件
let drumKit = [
    new Tone.Player(`assets/808-kick-vh.mp3`).toMaster(),
    new Tone.Player(`assets/flares-snare-vh.mp3`).toMaster(),
    new Tone.Player(`assets/808-hihat-vh.mp3`).connect(new Tone.Panner(-0.5).connect(reverb)),
    new Tone.Player(`assets/808-hihat-open-vh.mp3`).connect(new Tone.Panner(-0.5).connect(reverb)),
    new Tone.Player(`assets/slamdam-tom-low-vh.mp3`).connect(new Tone.Panner(-0.4).connect(reverb)),
    new Tone.Player(`assets/slamdam-tom-mid-vh.mp3`).connect(reverb),
    new Tone.Player(`assets/slamdam-tom-high-vh.mp3`).connect(new Tone.Panner(0.4).connect(reverb)),
    new Tone.Player(`assets/909-clap-vh.mp3`).connect(new Tone.Panner(0.5).connect(reverb)),
    new Tone.Player(`assets/909-rim-vh.wav`).connect(new Tone.Panner(0.5).connect(reverb))
];

// 导入模型&mix
function toNoteSequence(pattern) {
    return mm.sequences.quantizeNoteSequence({
        ticksPerQuarter: 220,
        totalTime: pattern.length / 2,
        timeSignatures: [{
            time: 0,
            numerator: 4,
            denominator: 4
        }],
        tempos: [{
            time: 0,
            qpm: 120
        }],
        notes: _.flatMap(pattern, (step, index) =>
            step.map(d => ({
                pitch: midiDrums[d],
                startTime: index * 0.5,
                endTime: (index + 1) * 0.5
            }))
            )
    }, 1);
};

function fromNoteSequence(seq, patternLength) {
    let res = _.times(patternLength, () => []);
    for (let { pitch, quantizedStartStep } of seq.notes) {
            res[quantizedStartStep].push(reverseMidiMapping.get(pitch));
    }
    return res;
}

function playPattern(pattern) {
    sequence = new Tone.Sequence(
        (time, {drums, index}) => {
            drums.forEach(d => {
                drumKit[d].start(time)
            });
        },
        pattern.map((drums, index) => ({ drums, index })
    ), '16n'
    );

    Tone.context.resume();
    Tone.Transport.start();
    sequence.start();
}

function displayPattern(patterns) {
    for (let patternIndex = 0; patternIndex < patterns.length; patternIndex++) {
        let pattern = patterns[patternIndex];
        patternBtnGroup = $('<div></div>').addClass('pattern-group');
        if (patternIndex < seedPattern.length)
        patternBtnGroup.addClass('seed');

        for (let i = 0; i <= 8; i++) {
            if (pattern.includes(i))
                patternBtnGroup.append($('<span></span>').addClass('pattern active'));
            else
                patternBtnGroup.append($('<span></span>').addClass('pattern'));
        }
        $('#pattern-container').append(patternBtnGroup)
    }

    return patterns;
}

function createAndPlayPattern(e) {
    $(e).remove()
    let seedSeq = toNoteSequence(seedPattern);
    dsrumRnn
        .continueSequence(seedSeq, patternLength, temperature)
        .then(r => seedPattern.concat(fromNoteSequence(r, patternLength)))
        .then(displayPattern)
        .then(playPattern)
}