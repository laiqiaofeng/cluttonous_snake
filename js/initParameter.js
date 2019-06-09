/**
 * 初始化所有可以用到的参数变量或构造函数
 * 
 */



//  初始化变量

let parameter = (function () {
    const parameterObj = {
        BASE_X_POINT : 200,
        BASE_Y_POINT : 200,
        XLEN : 30,
        YLEN : 30,
        SQUAREWIDTH: 20,
        msg: {
            "Wall": "DIE",
            "Floor": "MOVE",
            "Food": "EAT",
            "SnakeHead": "DIE",
            "SankeBody": "DIE",
            "Poison": "POISON"
        }
    }
    const Parameter = function () {}
    Parameter.prototype.update = function (options) {
        if(options !== null && typeof options == "object") {
            for(let prop in options) {
                parameterObj[prop] && (parameterObj[prop] = options[prop]);
            }
        }
    }
    
    Parameter.prototype.getData = function (prop) {
        return parameterObj[prop];
    }
    let parameter = new Parameter();
    return parameter
})();



//基础类
function Square (x, y, XLEN, YLEN, SQUAREWIDTH, viewContent) {
    this.x = x;
    this.y = y;
    this.Xlen = XLEN;
    this.Ylen = YLEN;
    this.squareWidth = SQUAREWIDTH;
    this.width = this.Xlen * this.squareWidth;
    this.height = this.Ylen * this.squareWidth;
    this.viewContent = viewContent || document.createElement("div");
}

Square.prototype.update = function (x, y) {
    this.x = x;
    this.y = y;
    this.viewContent.style.left = this.x * this.squareWidth + "px";
    this.viewContent.style.top = this.y * this.squareWidth + "px";
}


// 创建有继承关系的构造函数
//地板    
const Floor = tools._extend(Square);
//围墙
const Wall = tools._extend(Square);
//食物
const Food = tools._single(Square);

//毒药 单例
const Poison = tools._single(Square);


//蛇头 单例
const SnakeHead = tools._single(Square);
//蛇身
const SankeBody = tools._extend(Square);

//广场, 单例
const Ground = tools._single(Square);
//蛇, 单例
const Snake = tools._single();
//游戏, 单例
const Game = tools._single();





