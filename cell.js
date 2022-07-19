class Node {
    constructor(x, y, element) {
        this.x = x;
        this.y = y;
        this.element = element;
    }

    pos() {
        return [this.x, this.y];
    }

    neighboors() {
        // const neighboorsList = [];
        // for(let y = this.y - 1;y <= this.y + 1;y++) {
        //     for(let x = this.x - 1;x <= this.x + 1;x++){
        //         if(y < 0 || x < 0 || (y === this.y && x === this.x)) continue;
        //         if(!cellsTable[y][x]) continue;
        //         // if(y === this.y - 1 || y === this.y + 1 && x === this.x + 1 || x === this.x - 1) continue;
        //         neighboorsList.push(cellsTable[y][x]);
        //     }
        // }
        // return neighboorsList
        if(this.y < 0) return [
            cellsTable[this.y - 1][this.x],
            cellsTable[this.y][this.x - 1],
            cellsTable[this.y + 1][this.x],
        ];
        if(this.x > 0 && this.x < BOARD_WIDTH && this.y > 0 && this.y < BOARD_WIDTH) return [
            cellsTable[this.y - 1][this.x], 
            cellsTable[this.y][this.x - 1],
            cellsTable[this.y][this.x + 1],
            cellsTable[this.y + 1][this.x]
        ]
    }

    getNodesToEnd() {

    }
}