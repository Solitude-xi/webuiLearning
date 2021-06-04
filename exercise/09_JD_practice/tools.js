// 没有用swiper，手写轮播图

// 定位点击更新
var posArea = document.querySelector('header nav .leftPart .area span'); // 获取定位显示
var downList01 = document.querySelectorAll('.downList01 a'); // 获取每一个地理位置

function changeClass() { // 改变类和更新位置信息
    for (var i = 0; i < downList01.length; i++) {
        if (downList01[i].classList.contains('areaRed')) {
            downList01[i].classList.remove('areaRed');
            break;
        }
    }
    this.classList.add('areaRed');
    posArea.innerHTML = this.innerHTML;
}

for (var i = 0; i < downList01.length; i++) { // 给每一个地理位置添加一个单击响应函数
    downList01[i].onclick = changeClass;
}

// 轮播图部分
// 控件切换
var img = document.querySelector('.middleImg a img'); // 获取图片显示位置
var squ = document.querySelectorAll('.middleImg .changeImg li'); // 获取改变图片的小圆点
var timer // 定义定时器

var pos = 0; // 当前图片的序号

var src1 = './allSourse/img/轮播图01.jpg'; // 每张轮播图的路径
var src2 = './allSourse/img/轮播图02.jpg';
var src3 = './allSourse/img/轮播图03.jpg';
var src4 = './allSourse/img/轮播图04.jpg';
var src5 = './allSourse/img/轮播图05.jpg';
var src6 = './allSourse/img/轮播图06.jpg';
var src7 = './allSourse/img/轮播图07.jpg';
var src8 = './allSourse/img/轮播图08.jpg';

var src = [src1, src2, src3, src4, src5, src6, src7, src8];

// 点击上一张切换图片
var last = document.querySelector('.middleImg .last'); // 获取上一张按钮
var next = document.querySelector('.middleImg .next'); // 获取下一张按钮
var li = document.querySelectorAll('.changeImg li'); // 获取切换图片的小圆圈

last.onclick = function () { // 给切换按钮绑定单击响应函数
    if (pos == 0) {
        pos = squ.length - 1;
    } else {
        pos--;
    }
    img.src = src[pos];
    for (var i = 0; i < squ.length; i++) { // 清除其他圆点上的效果
        if (li[i].classList.contains('changeStyle')) {
            li[i].classList.remove('changeStyle');
        }
    }
    li[pos].classList.add('changeStyle'); // 给当前小圆点添加效果

}

// 点击下一张切换图片
next.onclick = function () { // 给切换按钮绑定单击响应函数
    if (pos == squ.length - 1) {
        pos = 0;
    } else {
        pos++;
    }
    img.src = src[pos];
    for (var i = 0; i < squ.length; i++) { // 清除其他圆点上的效果
        if (li[i].classList.contains('changeStyle')) {
            li[i].classList.remove('changeStyle');
        }
    }
    li[pos].classList.add('changeStyle'); // 给当前小圆点添加效果
}

for (var j = 0; j < squ.length; j++) { // 给每个小圆点绑定鼠标移入函数
    li[j].j = j;
    li[j].onmouseover = function () {
        clearInterval(timer); // 用小圆点切换图片时关闭轮播
        for (var i = 0; i < squ.length; i++) { // 清除圆点上的效果(删除changeStyle类)
            if (li[i].classList.contains('changeStyle')) {
                li[i].classList.remove('changeStyle');
            }
        }
        img.src = src[this.j];
        pos = this.j;
        li[pos].classList.add('changeStyle'); // 给当前小圆点添加效果
    }
}

for (var j = 0; j < squ.length; j++) {
    li[j].onmouseleave = function () { // 鼠标离开小圆点时重新打开轮播
        timer = setInterval(fn, 2000);
    }
}

img.onmouseover = function () { // 鼠标在图片上时关闭轮播
    clearInterval(timer);
}

img.onmouseleave = function () { // 鼠标离开图片时打开轮播
    timer = setInterval(fn, 2000);
}

function fn() { // 定时器内部函数
    if (pos == squ.length - 1) {
        pos = 0;
    } else {
        pos++;
    }
    img.src = src[pos];
    for (var i = 0; i < squ.length; i++) {
        if (li[i].classList.contains('changeStyle')) {
            li[i].classList.remove('changeStyle');
        }
    }
    li[pos].classList.add('changeStyle');
}

// 轮播图 定时器实现
timer = setInterval(fn, 2000); // 页面加载结束就启动轮播图