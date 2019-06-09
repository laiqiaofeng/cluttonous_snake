const directionObj = {
    "RIGHT": {
        x: 1,
        y: 0
    },
    "LEFT": {
        x: -1,
        y: 0
    },
    "UP": {
        x: 0,
        y: -1
    },
    "DOWN": {
        x: 0,
        y: 1
    }
}



const oSanke = new Snake();

oSanke.head = null;
oSanke.tail = null;
oSanke.squareWidth = parameter.getData("SQUAREWIDTH");
oSanke.score = 0;
oSanke.init = function () {
    const snakeHead = SquareFactory.create("SnakeHead", 3, 1, this.squareWidth, "black");
    const snakeBody1 = SquareFactory.create("SankeBody", 2, 1, this.squareWidth, "gray");
    const snakeBody2 = SquareFactory.create("SankeBody", 1, 1, this.squareWidth, "gray");

    snakeHead.next = snakeBody1;
    snakeHead.prev = null;

    snakeBody1.prev = snakeHead;
    snakeBody1.next = snakeBody2;

    snakeBody2.prev = snakeBody1;
    snakeBody2.next = null;

    this.head = snakeHead;
    this.tail = snakeBody2;

    oG.remove(snakeHead.x, snakeHead.y);
    oG.append(snakeHead);

    oG.remove(snakeBody1.x, snakeBody1.y);
    oG.append(snakeBody1);

    oG.remove(snakeBody2.x, snakeBody2.y);
    oG.append(snakeBody2);

    this.direction = directionObj.RIGHT;
}
oSanke.strategires = {
    MOVE (oG, snake, square, soucre) {
        if(!snake.head.next) {
            this.DIE(oG, snake, square);
        }
        const newSquare = SquareFactory.create("SankeBody", snake.head.x, snake.head.y, snake.squareWidth, "gray");
        newSquare.next = snake.head.next;
        newSquare.prev = null;
        newSquare.next.prev = newSquare;

        oG.remove(snake.head.x, snake.head.y);
        oG.append(newSquare);

        const newHead = SquareFactory.create("SnakeHead", square.x, square.y, snake.squareWidth, "black");
        newSquare.prev = newHead;
        newHead.next = newSquare;
        newHead.prev = null;
        oG.remove(square.x, square.y);
        oG.append(newHead);

        snake.head = newHead;

        if(soucre !== "EAT" && soucre !== "POISON") {
            oG.remove(snake.tail.x, snake.tail.y);
            oG.append(SquareFactory.create("Floor", snake.tail.x, snake.tail.y, snake.squareWidth, "blue"));
            snake.tail = snake.tail.prev;
            snake.tail.next = null;
        } else if(soucre == "POISON") {
            oG.remove(snake.tail.x, snake.tail.y);
            oG.append(SquareFactory.create("Floor", snake.tail.x, snake.tail.y, snake.squareWidth, "blue"));
            if(snake.tail.prev) {
                oG.remove(snake.tail.prev.x, snake.tail.prev.y);
                oG.append(SquareFactory.create("Floor", snake.tail.prev.x, snake.tail.prev.y, snake.squareWidth, "blue"));
                if(snake.tail.prev.prev) {
                    snake.tail = snake.tail.prev.prev;
                }else {
                    this.DIE(oG, snake, square);
                }
            }else {
                this.DIE(oG, snake, square);
            }
            snake.tail.prev.next = null;
        } 

    },
    EAT (oG, snake, square) {
        this.MOVE(oG, snake, square, "EAT");
        snake.score ++;

        Math.random() > 0.2 ? createFood("Food", oG) : createFood("Poison", oG);
    },
    DIE (oG, snake, square) {
        alert(snake.score);
        snake.score = 0;
        clearInterval(game.timer);
    },
    POISON (oG, snake, square) {
        this.MOVE(oG, snake, square, "POISON");
        snake.score --;
        Math.random() > 0.2 ? createFood("Food", oG) : createFood("Poison", oG);
    }
}
oSanke.move = function (oG) {
    const square = oG.squareTable[this.head.y + this.direction.y][this.head.x + this.direction.x];
    // let msg = (typeof square.touch == "function") ? square.touch() : "";
    
    oSanke.strategires[square.touch()](oG, this, square);
}


