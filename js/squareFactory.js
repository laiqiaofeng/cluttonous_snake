function SquareFactory () {
}
SquareFactory.msgObj = parameter.getData("msg");

SquareFactory.prototype.init = function (square, color, msg) {
    square.viewContent.style.position = "absolute";
    square.viewContent.style.backgroundColor = color;
    square.viewContent.style.width = square.width + "px";
    square.viewContent.style.height = square.height + 'px';
    square.viewContent.style.top = square.y * square.squareWidth + 'px';
    square.viewContent.style.left =  square.x * square.squareWidth + 'px';
    square.touch = function () {
        return msg;
    }
}

SquareFactory.create = function (type, ...arg) {
    if(typeof SquareFactory.prototype[type] == undefined) {
        throw "no this type";
    }
    if(SquareFactory.prototype[type].prototype.__proto__ !== SquareFactory.prototype) {
        SquareFactory.prototype[type].prototype = new SquareFactory();
    }

    return newSquare = new SquareFactory.prototype[type](...arg, this.msgObj[type]);

}


SquareFactory.prototype.Wall = function (x, y, squareWidth, color, msg) {
    const wall = new Wall(x, y, 1, 1, squareWidth);
    this.init(wall, color, msg);
    return wall;
}

SquareFactory.prototype.Floor = function (x, y, squareWidth, color, msg) {
    const floor = new Floor(x, y, 1, 1, squareWidth);
    this.init(floor, color, msg);
    return floor;
}

SquareFactory.prototype.Food = function (x, y, squareWidth, color, msg) {
    const food = new Food(x, y, 1, 1, squareWidth);
    this.init(food, color, msg);
    food.update(x, y);
    return food;
}
SquareFactory.prototype.Poison = function (x, y, squareWidth, color, msg) {
    const poison = new Poison(x, y, 1, 1, squareWidth);
    this.init(poison, color, msg);
    poison.update(x, y);
    return poison;
}
SquareFactory.prototype.SnakeHead = function (x, y, squareWidth, color, msg) {
    const snakeHead = new SnakeHead(x, y, 1, 1, squareWidth);
    this.init(snakeHead, color, msg);
    snakeHead.update(x, y);
    return snakeHead;
}

SquareFactory.prototype.SankeBody = function (x, y, squareWidth, color, msg) {
    const sankeBody = new SankeBody(x, y, 1, 1, squareWidth);
    this.init(sankeBody, color, msg);
    return sankeBody;
}