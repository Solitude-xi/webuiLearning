

// 中间部分轮播图
{
    var img = document.getElementById("img");
    var pic1 = "./sourse/轮播图01.jpg";
    var pic2 = "./sourse/轮播图02.jpg";
    var pic3 = "./sourse/轮播图03.jpg";
    var pic4 = "./sourse/轮播图04.jpg";
    var pic5 = "./sourse/轮播图05.jpg";
    var pic6 = "./sourse/轮播图06.jpg";
    var pic7 = "./sourse/轮播图07.jpg";
    var pic8 = "./sourse/轮播图08.jpg";
    var cnt = 0;
    var timer;
    var pic = [pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8];
    var bb = document.getElementsByClassName("bb");

    function myMouse(i) {
        bb[i].onmouseover = function () {
            img.src = pic[i];
            bb[i].style.backgroundColor = "#fff";
            clearInterval(timer);
        };

        bb[i].onmouseleave = function () {
            //关闭上一个定时器
            clearInterval(timer);

            //开启定时器
            cnt = i;
            timer = setInterval(function () {
                cnt++;

                // 清除圆形颜色
                for (var j = 0; j < bb.length; j++) {
                    bb[j].style.backgroundColor = "#f8f4f4a8";
                }
                if (cnt >= bb.length) {
                    cnt = 0;
                }
                img.src = pic[cnt];

                // 设置被选中圆形背景
                bb[cnt].style.backgroundColor = "#fff";
            }, 2000);

            // 清除圆形颜色
            for (var j = 0; j < bb.length; j++) {
                bb[j].style.backgroundColor = "#f8f4f4a8";
            }

            // 设置被选中圆形背景
            bb[i].style.backgroundColor = "#fff";
        };
    }

    for (var i = 0; i < bb.length; i++) {
        myMouse(i);
    }

    timer = setInterval(function () {
        cnt++;
        for (var j = 0; j < bb.length; j++) {
            bb[j].style.backgroundColor = "#f8f4f4a8";
        }
        if (cnt >= bb.length) {
            cnt = 0;
        }
        img.src = pic[cnt];
        bb[cnt].style.backgroundColor = "#fff";
    }, 2000);
}
