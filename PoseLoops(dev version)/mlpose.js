let video;
let poseNet;
let poses = [];


function setup() {
    let mycanvas = createCanvas(540, 398);
    mycanvas.parent('canvas');
    strokeWeight(4);
    stroke(51);
    video = createCapture(VIDEO);
    video.size(width, height);



    // 通过单人检测闯进啊一个新的posetNet方法
    poseNet = ml5.poseNet(video, modelReady);
    // 这里设置了一个时间，填充全局变量“pose”
    // 当新的pose被检测时会有一个数组
    poseNet.on("pose", function(results) {
        poses = results;
    });
    // 隐藏视频元素，只显示canvas
    video.hide();
}

function modelReady() {
    console.log("model Loaded!");
}

function draw() {
    image(video, 0, 0, width, height);

    // 我们可以调用该函数来绘制所有的关键点和骨骼
    drawKeypoints();
    drawSkeleton();
}

// 为检测的关键点绘制ellipses
function drawKeypoints() {
    // 通过所有的检测循环实现
    for (let i = 0; i < poses.length; i += 1) {
        const pose = poses[i].pose;
        for (let j = 0; j < pose.keypoints.length; j += 1) {
            const keypoint = pose.keypoints[j];
            // 只有当可信度大于0.2的时候才绘制
            if (keypoint.score > 0.01) {
                fill(255, 0, 0);
                noStroke();
                ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
            }
        }
    }
}

// 绘制skeletons的函数
function drawSkeleton() {
    // 通过所有检测骨骼循环
    for (let i = 0; i < poses.length; i += 1) {
        const skeleton = poses[i].skeleton;
        // 为每一个骨骼循环所有的body连接
        for (let j = 0; j < skeleton.length; j += 1) {
            const partA = skeleton[j][0];
            const partB = skeleton[j][1];
            stroke(255, 0, 0);
            line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
        }
    }
}


// 在这里我们通过keypoints的坐标来生成一个新的数组
// console.log(poses[0]['pose']['keypoints'][0]['position']['x'])

let seedArrayX = [];
let seedArrayY = [];

function arrayMap() {
    // 获取到keypoints的x坐标信息
    for (var i=0; i < 16; i++) {
        seedArrayX[i] = Math.round(poses[0]['pose']['keypoints'][i]['position']['x']);
    }
    console.log(seedArrayX);
    var max_X = Math.max.apply(null, seedArrayX);
    var min_X = Math.min.apply(null, seedArrayX);
    console.log(max_X, min_X);


    // 获取到keypoints的y坐标信息
    for (var i=0; i < 16; i++) {
        seedArrayY[i] = Math.round(poses[0]['pose']['keypoints'][i]['position']['y']);
    }
    console.log(seedArrayY);
    var max_Y = Math.max.apply(null, seedArrayY);
    var min_Y = Math.min.apply(null, seedArrayY);
    console.log(max_Y, min_Y);

        // gapValue 查看我们等比划分的间距
    var gapValueX = (max_X - min_X)/9;
    var gapValueY = (max_Y - min_Y)/8;
    console.log(gapValueX, gapValueY);

        // seedArrayX.flatMap( (n) =>
        // (n < min_X) ?      [] :
        // (min_X <= n < min_X + gapValueX ) ? [0] :
        // (min_X <= n < min_X + 2*gapValueX ) ? [1] :
        // (min_X <= n < min_X + 3*gapValueX ) ? [2] :
        // (min_X <= n < min_X + 4*gapValueX ) ? [3] :
        // (min_X <= n < min_X + 5*gapValueX ) ? [4] :
        // (min_X <= n < min_X + 6*gapValueX ) ? [5] :
        // (min_X <= n < min_X + 7*gapValueX ) ? [6] :
        // (min_X <= n < min_X + 8*gapValueX ) ? [7] :
        // (min_x + 8*gapValueX< n ) ? [8]
  
        // )

    // 这里按间距分块生产seedpattern的方法失败了！总是出现只有1的数组 
    // for (var i = 0; i < seedArrayX.length; i++) {
    //     if(seedArrayX[i] <= min_X) {
    //         seedArrayX[i] = 0;
    //     } else if (min_X < seedArrayX[i] <= min_X + gapValueX) {
    //         seedArrayX[i] = 1;
    //     } else if (min_X + gapValueX < seedArrayX[i] <= min_X + 2*gapValueX) {
    //         seedArrayX[i] = 2;
    //     } else if (min_X + 2*gapValueX < seedArrayX[i] <= min_X + 3*gapValueX) {
    //         seedArrayX[i] = 3;
    //     } else if (min_X + 3*gapValueX < seedArrayX[i] <= min_X + 4*gapValueX) {
    //         seedArrayX[i] = 4;
    //     } else if (min_X + 4*gapValueX < seedArrayX[i] <= min_X + 5*gapValueX) {
    //         seedArrayX[i] = 5;
    //     } else if (min_X + 5*gapValueX < seedArrayX[i] <= min_X + 6*gapValueX) {
    //         seedArrayX[i] = 6;
    //     } else if (min_X + 6*gapValueX < seedArrayX[i] <= min_X + 7*gapValueX) {
    //         seedArrayX[i] = 7;
    //     } else if (min_X + 7*gapValueX < seedArrayX[i] <= max_X) {
    //         seedArrayX[i] = 8;
    //     }
    // }
    console.log(seedArrayX);

    for (var i = 0; i < seedArrayX.length; i++) {
        seedArrayX[i] = Math.round(seedArrayX[i]/60);
        if(seedArrayX[i] >= 8 ) {
            seedArrayX[i] = 8;
        } else if (seedArrayX[i] <= 0) {
            seedArrayX[i] = 0;
        }
    }
    console.log("seedArrayX:" + seedArrayX);


    for (var i = 0; i < seedArrayY.length; i++) {
        seedArrayY[i] = Math.round(seedArrayY[i]/80);
        if(seedArrayY[i] >= 8 ) {
            seedArrayY[i] = 8;
        } else if (seedArrayY[i] <= 0) {
            seedArrayY[i] = 0;
        }
    }
    console.log("seedArrayY:" + seedArrayY);


    //  在这里我们预先生成一个空的数组[10x9]，存储和映射webcam收集的坐标信息
    var bodyArray = new Array();
    
    for (var k = 0; k < 10; k++){
        bodyArray[k] = new Array();
        for (var j = 0; j < 9; j++) {
            bodyArray[k][j] = "";
        }
    }

    // 将生成的数组打印出来
    console.log("empty bodyArray:" + bodyArray);

    // 将坐标信息映射到生成的bodyArray数组中
    for (var i = 0; i < 16; i++) {
        bodyArray[seedArrayX[i]][seedArrayY[i]] = seedArrayY[i];
    }

    // 打印更新后的bodyArray检查是否输入
    console.log("updated bodyArray:" + bodyArray);

    // 将数组中的空元素滤出
    for (var i = 0; i < 10; i++) {
        bodyArray[i] = bodyArray[i].filter(number => number != "");

    }

    // 将过滤的数组打印
    console.log("filtered bodyArray:" + bodyArray);

    seedPattern = bodyArray;

}