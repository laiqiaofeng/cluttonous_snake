

let colorObj = {
    "Food": "origan",
    "Poison": "purple"
}
const createFood = function (type, oG) {
    console.log(type);
    let flag = true,
        x = 0, y = 0;
    while (flag) {
        x = Math.floor(Math.random() * 28) + 1;
        y = Math.floor(Math.random() * 28) + 1;
        const square = oG.squareTable[x][y];
        if(square.touch() == "MOVE") {
            flag = false;
        }
    }
    oG.remove(x, y);
    const food = SquareFactory.create(type, x, y, 20, colorObj[type]);
    oG.append(food);

    if(type == "Poison") {
        setTimeout( () => {
            oG.remove(x, y);
            oG.append(SquareFactory.create("Floor", x, y, 20, "blue"))
            Math.random() > 0.2 ? createFood("Food", oG) : createFood("Poison", oG);
        }, 5000);
    }
}
