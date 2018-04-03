window.onload = function () {
    var magnitude = 60;

    function Snake(size, speed, score, arr) {                                   //移动的对象
        this.size = size,                                    //长度
            this.toLeft = toLeft,                             //向左移动
            this.toRight = toRight,                           //向右移动
            this.toTop = toTop,                               //向上移动
            this.toBottom = toBottom,                         //向下移动
            this.speed = speed,                                //移动速度
            this.score = score,
            this.place = [arr],                    //移动物体的身体
            this.timer = null                                 //持续移动
    }

    var snake = new Snake(1, 100, 0, [0, 0]);
    var map = new Array();                          //创建地图
    var maps = document.getElementById("map");      //地图存放的节点
    var keyCode;
    map = init(magnitude);

    enter(snake.place)
    rounds()                                        //随机生成food
    show(map);

    window.addEventListener('keydown', keydowns, false);   //点击键盘控制  走向
    function keydowns(e) {
        if (!e)
            e = window.event;
        if (document.all) {
            keyCode = e.keyCode;
        } else {
            keyCode = e.which;
        }
        // ← 或 A
        if (keyCode == 37 || keyCode == 65) {
            clearInterval(snake.timer)
            snake.toLeft();
        }
        // ↑ 或 W
        if (keyCode == 38 || keyCode == 87) {
            clearInterval(snake.timer)
            snake.toTop();
        }
        // → 或 D
        if (keyCode == 39 || keyCode == 68) {
            clearInterval(snake.timer)
            snake.toRight();
        }
        // ↓ 或 S
        if (keyCode == 40 || keyCode == 83) {
            clearInterval(snake.timer)
            snake.toBottom();
        }
    }

    function move(that, arr) {

        var x = arr[0];
        var y = arr[1];
        if (x < 0 || x >= magnitude || y < 0 || y >= magnitude) {
            over(snake.score)
            return that;
        }
        that.unshift(arr);                                      //推进
        if (map[x][y] != 3) {
            if (map[x][y] != 0) {
                over(snake.score);
                return that;
            }
            var xy = that.pop();                                 //退出
            map[xy[0]][xy[1]] = 0;

        }
        else {
            snake.size++;
            snake.score++;
            document.getElementById("s").innerHTML = snake.score + "分";
            rounds()
        }
        return that;
    }

    function toLeft() {                             //向左移动
        var that = this.place;                      //把移动物体的身体数组存进that
        var speed = this.speed;                     //移动速度  存进  speed
        this.timer = setInterval(function () {        //持续移动
            var x = that[0][0];
            var y = that[0][1] - 1;
            that = move(that, [x, y])
            enter(that)
        }, speed)
    }

    function toRight() {
        var that = this.place;                      //把移动物体的身体数组存进that
        var speed = this.speed;                     //移动速度  存进  speed
        this.timer = setInterval(function () {        //持续移动
            var x = that[0][0];
            var y = that[0][1] + 1;
            that = move(that, [x, y])
            enter(that)
        }, speed)
    }

    function toTop() {
        var that = this.place;                      //把移动物体的身体数组存进that
        var speed = this.speed;                     //移动速度  存进  speed
        this.timer = setInterval(function () {        //持续移动
            var x = that[0][0] - 1;
            var y = that[0][1];
            that = move(that, [x, y])
            enter(that)
        }, speed)
    }

    function toBottom() {
        var that = this.place;                      //把移动物体的身体数组存进that
        var speed = this.speed;                     //移动速度  存进  speed
        this.timer = setInterval(function () {        //持续移动
            var x = that[0][0] + 1;
            var y = that[0][1];
            that = move(that, [x, y])
            enter(that)
        }, speed)
    }

    function rounds() {     //生成随机位置  和随机2/4
        var row = Math.round(Math.random() * (magnitude - 1));
        var col = Math.round(Math.random() * (magnitude - 1));
        console.log(row + ":" + col)
        if (map[row][col] == 0) {
            map[row][col] = 3;
        } else {
            rounds();
        }
    }

    function enter(snakes) {                    //移动物体数组存进地图数组
        var x = snakes[0][0];
        var y = snakes[0][1];
        try {
            map[x][y] = 2;
        } catch (e) {
            clearInterval(snake.timer);
            return
        }
        for (var i = 1; i < snakes.length; i++) {
            map[snakes[i][0]][snakes[i][1]] = 1;
        }
        show(map);
    }

    function init(leng) {                           //初始化地图
        var arrs = new Array();
        for (var i = 0; i < leng; i++) {
            arrs[i] = new Array();
            for (var j = 0; j < leng; j++) {
                arrs[i][j] = 0;
            }
        }
        return arrs;
    }

    function show(map) {                            //显示地图
        var luList = maps.children[0];
        luList.innerHTML = "";
        var f=true;
        for (var i = 0; i < map.length; i++) {
            for (var j = 0; j < map[0].length; j++) {
                var li = document.createElement("li")
                switch (map[i][j]) {
                    case 1:
                        if(f=!f)
                            li.className = "body1";

                        else{
                            li.className = "body2";

                        }
                        break;
                    case 2:
                        li.className = "head";
                        break;
                    case 3:
                        li.className = "food";
                        break;
                    default:
                }
                luList.appendChild(li);
            }
        }
    }

    function over(score) {
        document.getElementById("score").innerHTML = score + "分";

        console.log("游戏结束");
        clearInterval(snake.timer)

        window.removeEventListener("keydown", keydowns, false);   //接触点击键盘触发事件
        mask.style.display = "block";
    }

    var btn = document.getElementById("btn");
    var mask = document.getElementById("mask");
    btn.addEventListener("click", function () {
        newGame();
        mask.style.display = "none";
    })

    function newGame() {
        snake = new Snake(1, 200, 0, [0, 0]);
        map = init(magnitude);

        enter(snake.place)
        rounds()                                        //随机生成food
        show(map);
        window.addEventListener('keydown', keydowns, false);
    }
}
