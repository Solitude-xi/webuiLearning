var sw = 20, // 一个方块的宽
    sh = 20, // 一个方块的高
    tr = 30, // 行数
    td = 30; // 列数

var snake = null, // 蛇的实例
    food = null, // 食物的实例
    game = null; // 游戏的实例

function Square(x, y, classname){ // 方块创建函数
    this.x = x * sw;
    this.y = y * sh;
    this.class = classname;

    this.viewContent = document.createElement('div'); // 方块对应的DOM元素
    this.viewContent.className = this.class;
    this.parent = document.getElementById('snakeWarp'); // 方块的父级
};

Square.prototype.create = function(){ // 创建方块DOM，并添加到文档里
    this.viewContent.style.position = 'absolute';
    this.viewContent.style.width = sw + 'px';
    this.viewContent.style.height = sh + 'px';
    this.viewContent.style.left = this.x + 'px';
    this.viewContent.style.top = this.y + 'px';

    this.parent.appendChild(this.viewContent);
};

Square.prototype.remove = function(){
    this.parent.removeChild('this.viewContent');
};

// 蛇
function Snake(){
    this.head = null; // 存一下蛇头的信息
    this.tail = null; // 存一下蛇尾的信息
    this.pos = []; // 用来存储蛇身上每一个方块的位置
    this.directionNum = { // 存储蛇走的方向，用一个对象表示
        left : {
            x : -1,
            y : 0
        },
        right : {
            x : 1,
            y : 0
        },
        up : {
            x : 0,
            y : -1
        },
        down : {
            x : 0,
            y : 1
        }
    };
};

Snake.prototype.init = function(){
    // 创建一个蛇头
    var snakeHead = new Square(2, 0, 'snakeHead');
    snakeHead.create();
    this.head = snakeHead; // 存储蛇头信息
    this.pos.push([2, 0]); // 把蛇头的位置存起来

    // 创建蛇身体1
    var snakeBody1 = new Square(1, 0, 'snakeBody');
    snakeBody1.create();
    this.pos.push([1, 0]);

    // 创建蛇身体2
    var snakeBody2 = new Square(0, 0, 'snakeBody');
    snakeBody2.create();
    this.tail = snakeBody2; // 把蛇尾的信息存起来
    this.pos.push([0, 0]);

    // 形成链表关系
    snakeHead.last = null;
    snakeHead.next = snakeBody1; 

    snakeBody1.last = snakeHead;
    snakeBody1.next = snakeBody2;

    snakeBody2.last = snakeBody1;
    snakeBody2.next = null;

    // 给蛇添加一条属性，用来表示走的方向
    this.direction = this.directionNum.right; // 默认蛇往右走
};

// 这个方法用来获取蛇头的下一个位置对应的元素，要根据元素做不同的事情
Snake.prototype.getNextPos = function(){
    var nextPos = [ // 蛇头要走的下一个点的坐标
        this.head.x / sw + this.direction.x,
        this.head.y / sh + this.direction.y
    ];

    // 下一个点是自己，代表撞到了自己，游戏结束
    var selfCollied = false; // 是否撞到自己
    this.pos.forEach(function(value){
        if(value[0] == nextPos[0] && value[1] == nextPos[1]){
            // 如果两个数都相等，证明蛇撞到自己了
            selfCollied = true;
        }
    });
    if(selfCollied){
        console.log('撞到自己了');
        this.strategies.die.call(this);
        return;
    }

    // 下一个点是墙，代表撞到了围墙，游戏结束
    if(nextPos[0] < 0 || nextPos[1] < 0 || nextPos[0] > td  - 1 || nextPos[1] > tr - 1){
        // console.log('撞到墙了');
        this.strategies.die.call(this);
        return;
    }

    // 下一个点是食物，要吃
    if(food && food.pos[0] == nextPos[0] && food.pos[1] == nextPos[1]){
        this.strategies.eat.call(this);
        return;
    }
    
    // 下一个点什么也不是，继续走
    this.strategies.move.call(this);

};

// 处理碰撞后要做的事
Snake.prototype.strategies = {
    move : function(format){  // format参数用来决定要不要删除蛇尾  当传了这个参数后表示要吃
        // 创建一个新的身体（新旧蛇头的位置）
        var newBody = new Square(this.head.x / sw, this.head.y / sh, 'snakeBody');
        // 更新链表的关系
        newBody.next = this.head.next;
        newBody.next.last = newBody;
        newBody.last = null;

        this.head.remove(); // 把旧蛇头从原来的位置删除
        newBody.create();

        // 创建新的蛇头（下一个点）
        var newHead = new Square(this.head.x / sw + this.direction.x, this.head.y / sh + this.direction.y, 'snakeHead');

        // 更新链表的关系
        newHead.next = newBody;
        newHead.last = null;
        newBody.last = newHead;
        newHead.create();

        // 蛇身上每一个方块的位置也要更新
        this.pos.splice(0, 0, [this.head.x / sw + this.direction.x, this.head.y / sh + this.direction.y]);
        this.head = newHead; // 还要更新this.head

        if(!format){ // 如果format的值为false表示要删除（除了吃以为的操作）
            this.tail.remove();
            this.tail = this.tail.last;

            this.pos.pop();
        }
    },
    eat : function(){
        this.strategies.move.call(this, true);
        createFood();
        game.score++;
    },
    die : function(){
        // game.over
        console.log('嗝屁了');
    }
};

snake = new Snake();

// 创建食物
function createFood(){
    // 食物小方块的随机坐标
    var x = null;
    var y = null;

    var include = true; // 循环跳出的条件，true表示生成的食物的坐标是在蛇身上，false表示不在蛇身上（跳出循环）
    while(include){
        x = Math.round(Math.random() * (td - 1)); // round四舍五入
        y = Math.round(Math.random() * (tr - 1)); // round四舍五入

        snake.pos.forEach(function(value){
            if(x != value[0] && y != value[1]){ // 这个条件成立说明随机生成的这个坐标，在蛇身上没有找到
                include = false;
            }
        });
    }

    // 生成食物
    food = new Square(x, y, 'food');
    food.pos = [x, y]; // 存储一下生成的食物坐标，用于跟蛇头的下一个点做对比

    var foodDom = document.querySelector('.food');
    if(foodDom){
        foodDom.style.left = x * sw + 'px';
        foodDom.style.top = y * sh + 'px';
    }else{
        food.create();
    }
    
}



// 创建游戏逻辑
function Game(){
    this.timer = null;
    this.score = 0;
}

Game.prototype.start = function(){ // 开始游戏
    this.timer = setInterval(function(){
        snake.getNextPos();
    }, 200);
}

Game.prototype.init = function(){
    snake.init();
    // snake.getNextPos();
    createFood();

    // 上 ArrowUp ，下 ArrowDown ，左 ArrowLeft ，右 ArrowRight
    document.onkeydown = function(event){
        if(event.key == 'ArrowLeft' && snake.direction != snake.directionNum.right){
            snake.direction = snake.directionNum.left;
        }else if(event.key == 'ArrowUp' && snake.direction != snake.directionNum.down){
            snake.direction = snake.directionNum.up;
        }else if(event.key == 'ArrowRight' && snake.direction != snake.directionNum.left){
            snake.direction = snake.directionNum.right;
        }else if(event.key == 'ArrowDown' && snake.direction != snake.directionNum.up){
            snake.direction = snake.directionNum.down;
        }
        
    }
    this.start();
}



Game.prototype.over = function(){
    clearInterval(this.timer);
    alert('你的得分为' +this.score);
}

// 开启游戏
game = new Game();
var startBtn = document.querySelector('.startBtn button');
startBtn.onclick = function(){
    startBtn.parentNode.style.display = 'none';
    game.init();
};
