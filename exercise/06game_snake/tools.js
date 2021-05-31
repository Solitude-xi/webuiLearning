window.onload = function () {
    // 获取地图
    var map = document.getElementById("map");

    // 获取蛇
    var snake = document.getElementById("snake");

    // 获取食物
    var food = document.getElementById("food");

    // 获取开始游戏按钮
    var btn = document.getElementById("btn");

    // 获取计分板
    var score = document.getElementById("score");

    // 定义成绩
    var grade = 0;

    // 定义定时器timer
    var timer;

    // 定义速度
    var rate = 3;

    // 设置食物初始化随机坐标
    var foodNowX = parseInt(Math.random() * map.offsetWidth);
    var foodNowY = parseInt(Math.random() * map.offsetWidth);
    if (foodNowX > map.offsetWidth - food.offsetWidth) {
        foodNowX = map.offsetWidth - food.offsetWidth;
    }
    if (foodNowY > map.offsetWidth - food.offsetWidth) {
        foodNowY = map.offsetWidth - food.offsetWidth;
    }
    food.style.left = foodNowX + "px";
    food.style.top = foodNowY + "px";

    // 给开始按钮绑定点击事件
    btn.onclick = function () {
        // 修改开始按钮的值
        btn.innerHTML = "正在游戏中";

        // 给文档绑定按键事件

        // 上 ArrowUp ，下 ArrowDown ，左 ArrowLeft ，右 ArrowRight
        document.onkeydown = function (event) {
            // 蛇吃到食物
            setInterval(function () {
                foodNowX = food.offsetLeft;
                foodNowY = food.offsetTop;
                if (
                    Math.abs(foodNowX - snake.offsetLeft) < food.offsetWidth &&
                    Math.abs(foodNowY - snake.offsetTop) < food.offsetWidth
                ) {
                    foodNowX = parseInt(Math.random() * map.offsetWidth);
                    foodNowY = parseInt(Math.random() * map.offsetWidth);
                    if (foodNowX > map.offsetWidth - food.offsetWidth) {
                        foodNowX = map.offsetWidth - food.offsetWidth;
                    }
                    if (foodNowY > map.offsetWidth - food.offsetWidth) {
                        foodNowY = map.offsetWidth - food.offsetWidth;
                    }
                    food.style.left = foodNowX + "px";
                    food.style.top = foodNowY + "px";
                    score.innerHTML = "当前得分：" + ++grade;
                }
            }, 10);

            // 向下移动
            if (event.key == "ArrowDown") {
                clearInterval(timer);
                timer = setInterval(function () {
                    var snakeNow = snake.offsetTop;
                    var newValue = snakeNow + rate;

                    // 到达边界游戏结束
                    if (newValue > map.offsetWidth - food.offsetWidth) {
                        newValue = map.offsetWidth - food.offsetWidth;
                        snake.style.top = newValue + "px";
                        clearInterval(timer);
                        btn.innerHTML = "开始游戏";
                        alert("游戏结束，你的分数是" + grade);
                        document.onkeydown = null;
                        snake.style.left = "20px";
                        snake.style.top = "20px";
                        score.innerHTML = "你还没有吃到食物";
                        grade = 0;
                    } else {
                        snake.style.top = newValue + "px";
                    }
                }, 20);
            }

            // 向上移动
            if (event.key == "ArrowUp") {
                clearInterval(timer);
                timer = setInterval(function () {
                    var snakeNow = snake.offsetTop;
                    var newValue = snakeNow - rate;

                    // 到达边界游戏结束
                    if (newValue < 0) {
                        newValue = 0;
                        snake.style.top = newValue + "px";
                        clearInterval(timer);
                        btn.innerHTML = "开始游戏";
                        alert("游戏结束，你的分数是" + grade);
                        document.onkeydown = null;
                        snake.style.left = "20px";
                        snake.style.top = "20px";
                        score.innerHTML = "你还没有吃到食物";
                        grade = 0;
                    } else {
                        snake.style.top = newValue + "px";
                    }
                }, 20);
            }

            // 向左移动
            if (event.key == "ArrowLeft") {
                clearInterval(timer);
                timer = setInterval(function () {
                    var snakeNow = snake.offsetLeft;
                    var newValue = snakeNow - rate;

                    // 到达边界游戏结束
                    if (newValue < 0) {
                        newValue = 0;
                        snake.style.left = newValue + "px";
                        clearInterval(timer);
                        btn.innerHTML = "开始游戏";
                        alert("游戏结束，你的分数是" + grade);
                        document.onkeydown = null;
                        snake.style.left = "20px";
                        snake.style.top = "20px";
                        score.innerHTML = "你还没有吃到食物";
                        grade = 0;
                    } else {
                        snake.style.left = newValue + "px";
                    }
                }, 20);
            }

            // 向右移动
            if (event.key == "ArrowRight") {
                clearInterval(timer);
                timer = setInterval(function () {
                    var snakeNow = snake.offsetLeft;
                    var newValue = snakeNow + rate;

                    // 到达边界游戏结束
                    if (newValue > map.offsetWidth - food.offsetWidth) {
                        newValue = map.offsetWidth - food.offsetWidth;
                        snake.style.left = newValue + "px";
                        clearInterval(timer);
                        btn.innerHTML = "开始游戏";
                        alert("游戏结束，你的分数是" + grade);
                        document.onkeydown = null;
                        snake.style.left = "20px";
                        snake.style.top = "20px";
                        score.innerHTML = "你还没有吃到食物";
                        grade = 0;
                    } else {
                        snake.style.left = newValue + "px";
                    }
                }, 20);
            }

            // 按住ctrl加速
            if (event.key == "Control") {
                rate *= 2;
            }
        };

        // 松开ctrl减速
        document.onkeyup = function (event) {
            if (event.key == "Control") {
                rate = 3;
            }
        };
    };
};
