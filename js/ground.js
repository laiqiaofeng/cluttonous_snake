// 创建一个广厂实例
const oG = new Ground(
    parameter.getData("BASE_X_POINT"),
    parameter.getData("BASE_Y_POINT"),
    parameter.getData("XLEN"),
    parameter.getData("YLEN"),
    parameter.getData("SQUAREWIDTH"));

oG.init = function () {
    this.viewContent.style.position = "absolute";
    this.viewContent.style.left = this.x + "px";
    this.viewContent.style.top = this.y + "px";
    this.viewContent.style.backgroundColor = "#ff0";
    this.viewContent.style.width = this.width + "px";
    this.viewContent.style.height = this.height + "px";
    document.body.appendChild(this.viewContent);

    //定义方块二维数组
    this.squareTable = [];
    this.createSquareTable();
}

oG.createSquareTable = function () {
    for(let i = 0; i < this.Xlen; i ++) {
        this.squareTable[i] = [];
        for(let j = 0; j < this.Ylen; j ++) {
            let newSquare = null;
            if(i == 0 || i == this.Xlen - 1 || j == 0 || j == this.Ylen - 1){
                newSquare = SquareFactory.create("Wall", j, i, this.squareWidth, "red");
            }else {
                newSquare = SquareFactory.create("Floor", j, i, this.squareWidth, "blue");
            }
            this.squareTable[i][j] = newSquare;
            this.viewContent.appendChild(newSquare.viewContent);
        }
    }
} 

oG.remove = function (x, y) {
    let square = this.squareTable[y][x];
    this.viewContent.removeChild(square.viewContent);
    this.squareTable[y][x] = null;
}

oG.append = function (square) {
    this.squareTable[square.y][square.x] = square;
    this.viewContent.appendChild(square.viewContent);
}

