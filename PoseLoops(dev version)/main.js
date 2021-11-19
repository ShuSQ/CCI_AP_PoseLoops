
  // ------------------------------------------------------- //
  
  
  var rArray1 = [];
  var rArray2 = [];
//   var bpmValue = parseInt(document.getElementById("bpm").value);

  var darray = new Array();
  var seedPattern = new Array();
  var btn = document.getElementById("btn");
  var checkboxGroup = document.getElementsByClassName("audioBox");


  var obj1 = document.getElementById("row1").getElementsByTagName("input");
  var obj2 = document.getElementById("row2").getElementsByTagName("input");
  var obj3 = document.getElementById("row3").getElementsByTagName("input");
  var obj4 = document.getElementById("row4").getElementsByTagName("input");
  var obj5 = document.getElementById("row5").getElementsByTagName("input");
  var obj6 = document.getElementById("row6").getElementsByTagName("input");
  var obj7 = document.getElementById("row7").getElementsByTagName("input");
  var obj8 = document.getElementById("row8").getElementsByTagName("input");
  var obj9 = document.getElementById("row9").getElementsByTagName("input");
  var obj10 = document.getElementById("row10").getElementsByTagName("input");

  btn.addEventListener("click", function () {
    var rArray1 = [];
    var rArray2 = [];
    var rArray3 = [];
    var rArray4 = [];
    var rArray5 = [];
    var rArray6 = [];
    var rArray7 = [];
    var rArray8 = [];
    var rArray9 = [];
    var rArray10 = [];

    for (var i = 0; i < obj1.length; i++) {
      if (obj1[i].value.length > 0 && obj1[i].checked == true) {
        rArray1.push(parseInt(obj1[i].value));
      }
    }

    for (var i = 0; i < obj2.length; i++) {
      if (obj2[i].value.length > 0 && obj2[i].checked == true) {
        rArray2.push(parseInt(obj2[i].value));
      }
    }

    for (var i = 0; i < obj3.length; i++) {
      if (obj3[i].value.length > 0 && obj3[i].checked == true) {
        rArray3.push(parseInt(obj3[i].value));
      }
    }

    for (var i = 0; i < obj4.length; i++) {
      if (obj4[i].value.length > 0 && obj4[i].checked == true) {
        rArray4.push(parseInt(obj4[i].value));
      }
    }

    for (var i = 0; i < obj5.length; i++) {
      if (obj5[i].value.length > 0 && obj5[i].checked == true) {
        rArray5.push(parseInt(obj5[i].value));
      }
    }

    for (var i = 0; i < obj6.length; i++) {
      if (obj6[i].value.length > 0 && obj6[i].checked == true) {
        rArray6.push(parseInt(obj6[i].value));
      }
    }

    for (var i = 0; i < obj7.length; i++) {
      if (obj7[i].value.length > 0 && obj7[i].checked == true) {
        rArray7.push(parseInt(obj7[i].value));
      }
    }

    for (var i = 0; i < obj8.length; i++) {
      if (obj8[i].value.length > 0 && obj8[i].checked == true) {
        rArray8.push(parseInt(obj8[i].value));
      }
    }

    for (var i = 0; i < obj9.length; i++) {
      if (obj9[i].value.length > 0 && obj9[i].checked == true) {
        rArray9.push(parseInt(obj9[i].value));
      }
    }

    for (var i = 0; i < obj10.length; i++) {
      if (obj10[i].value.length > 0 && obj10[i].checked == true) {
        rArray10.push(parseInt(obj10[i].value));
      }
    }

    // 将字符串转
    // website.push(parseInt(obj[0].value));
    // website.push(parseInt(obj[1].value));
    // website.push(parseInt(obj[2].value));
    // console.log("row1: " + rArray1);
    // console.log("row2: " + rArray2);
    // console.log("row3: " + rArray3);
    // console.log("row4: " + rArray4);
    // console.log("row5: " + rArray5);
    // console.log("row6: " + rArray6);
    // console.log("row7: " + rArray7);
    // console.log("row8: " + rArray8);
    // console.log("row9: " + rArray9);
    // console.log("row10: " + rArray10);

    darray[0] = rArray1;
    darray[1] = rArray2;
    darray[2] = rArray3;
    darray[3] = rArray4;
    darray[4] = rArray5;
    darray[5] = rArray6;
    darray[6] = rArray7;
    darray[7] = rArray8;
    darray[8] = rArray9;
    darray[9] = rArray10;

    console.log(darray);
    seedPattern = darray;
  });


 // 一键清除所有的input checkbox内容
 document.getElementById("cleanBtn").addEventListener("click", function () {
    for (var i = 0; i < checkboxGroup.length; i++) {
      checkboxGroup[i].checked = false;
    }
  });

// ------------------------------------------------------ //

// 在这里我们提供随机生成二维数组，随机构建melody

var ddArray= [];

// 随机生成一维数组
function ranArray(len, min, max) {
return Array.from({length:len}, v=>Math.floor(Math.random()*(max-min))+min);
};

// 数组滤重
function unique (arr) {
return Array.from(new Set(arr))
}

// 数组排序
function resort(arr) {
return arr.sort(function(a, b){return a - b});
}

// 生成二维数组

function randomArray() {
var ranArrayLen = parseInt(document.getElementById('ranArrayLength').value);
var ranArrayMin = 
  parseInt(document.getElementById('ranArrayMin').value);
var ranArrayMax = 
  parseInt(document.getElementById('ranArrayMax').value);
for (var i = 0; i < 10; i++) {
ddArray[i] = resort(unique(ranArray(ranArrayLen, ranArrayMin, ranArrayMax)));
seedPattern = ddArray;
console.log(seedPattern);
}
}





// ----------------------------------------------------- //


  let drumRnn = new mm.MusicRNN('https://storage.googleapis.com/download.magenta.tensorflow.org/tfjs_checkpoints/music_rnn/drum_kit_rnn');
  drumRnn.initialize();


  const midiDrums = [36, 38, 42, 46, 41, 43, 45, 49, 51];
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

  var temperature = document.getElementById("temperature").value;

  function temperatureChange() {
    temperature = document.getElementById("temperature").value;
    console.log(temperature);
  }


  const patternLength = 32;

  // var seedPattern = [
  //     [0, 2],
  //     [0],
  //     [2, 5, 8],
  //     [],
  //     [2, 5, 8],
  //     [],
  //     [0, 2, 5, 8],
  //     [4, 5, 8],
  //     [],
  //     [0, 5, 8]
  // ];


  let reverb = new Tone.Convolver(`assets/small-drum-room.wav`).toMaster();
  reverb.wet.value = 0.3;

  // DRUM_CLASSES: 'Kick', 'Snare', 'Hi-hat closed', 'Hi-hat open', 'Tom low', 'Tom mid', 'Tom high', 'Clap', 'Rim'

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

  // ==================
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
          },
          1
      );
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
          pattern.map((drums, index) => ({ drums, index })),
          '16n'
      );

      Tone.context.resume();
      Tone.Transport.start();
      // 下面这里是播放速度！！！但是双向绑定好像不能解决这个问题，因为生成之后的播放速率固定了
      Tone.Transport.bpm.value = parseInt(document.getElementById("bpm").value);
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
                  patternBtnGroup.append($(`<span></span>`).addClass('pattern active'));
              else
                  patternBtnGroup.append($(`<span></span>`).addClass('pattern'));
          }
          $('#pattern-container').append(patternBtnGroup)
      }
      return patterns;
  }
  

  function createAndPlayPattern(e) {

      $(e).remove()
      let seedSeq = toNoteSequence(seedPattern);
      drumRnn
          .continueSequence(seedSeq, patternLength, temperature)
          .then(r => seedPattern.concat(fromNoteSequence(r, patternLength)))
          .then(displayPattern)
          .then(playPattern)
  }




  // range的单向绑定
  function lengthChange() {
      var value = document.getElementById('ranArrayLength').value;
      document.getElementById('lengthValue').innerHTML = "    " + value;
  }

  function minChange() {
    var value = document.getElementById('ranArrayMin').value;
    document.getElementById('minValue').innerHTML = "    " + value;
}

function maxChange() {
    var value = document.getElementById('ranArrayMax').value;
    document.getElementById('maxValue').innerHTML = "    " + value;
}

function bpmChange() {
    var value = document.getElementById('bpm').value;
    document.getElementById('bpmValue').innerHTML = "    " + value;
}

function temperatureChange() {
    var value = document.getElementById('temperature').value;
    document.getElementById('temperatureValue').innerHTML = "    " + value;
}