const game = new Game();

game.init = function () {
    oG.init();
    oSanke.init();
    createFood("Food", oG);
    this.bindEvent();
    this.tiemr = null;
    this.duration = 200;
    this.start();
}
game.bindEvent = function () {
    document.addEventListener("keydown", tools._throttle(keyDowns, 100));

    function keyDowns(e) {
        console.log(e);
        let event = e || window.event;
        switch (event.keyCode) {
            case 37:
                oSanke.direction !== directionObj.RIGHT && (oSanke.direction = directionObj.LEFT);
                break;
            case 38:
                oSanke.direction !== directionObj.DOWN && (oSanke.direction = directionObj.UP);
                break;
            case 39:
                oSanke.direction !== directionObj.LEFT && (oSanke.direction = directionObj.RIGHT);
                break;
            case 40:
                oSanke.direction !== directionObj.TOP && (oSanke.direction = directionObj.DOWN);
                break;
            default:
                break;
        }
    }
}

game.start = function () {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
        oSanke.move(oG);
    }, this.duration);
}
game.init();