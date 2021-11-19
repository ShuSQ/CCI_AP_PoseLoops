var bodyArray = new Array();
for (var k=0; k<10; k++) {
    bodyArray[k] = new Array();
    for(var j=0; j<9; j++) {
        bodyArray[k][j]= "";
    }
}

console.log(bodyArray);

var arrayx = [3,4,3,5,2,5,1,7,0,6,0,5,1,7,1,6];
var arrayy = [2,1,1,2,2,4,4,4,7,1,6,7,6,6,6,7];

for (var i = 0; i < 16; i++) {
bodyArray[arrayx[i]][arrayy[i]] = arrayy[i];
}

console.log(bodyArray);


for( var i = 0; i < 10; i++) {
    bodyArray[i]=bodyArray[i].filter(number => number != "");
}

console.log(bodyArray);


// 把bodyArray加入mlpose中，完成对seedpattern的映射。
// 实现切换音源的功能
// 优化GUI布局
// 页面刷新
// 代码整理
