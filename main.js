const BOARD_WIDTH = 20;
const cells = [...document.querySelectorAll(".cell")];
const cellsTable = cells2Darray();
const cellsClass = [...cells.map(x => new Node(getPos(x)[0], getPos(x)[1], x))]
let openSet = [];
let [start, end] = [document.querySelector(".START"), document.querySelector(".END")];
let [startNodeClass] = cellsClass.filter(cellClass => cellClass.element.classList.contains("START"));
// logic for dragging elements and events
setEventListener();

const sleep = ms => new Promise(res => setTimeout(res, ms));
// return a grid of cells, 2d array if the cells( divs )
function cells2Darray() {
    const arr = [[]];
    let count = 0;
    for(let i = 0;i < cells.length;i++) {
        if(( i + 1 ) % BOARD_WIDTH !== 0) {
            arr[count].push(cells[i]);
            continue;
        } 
        arr.push([]);
        arr[count].push(cells[i]);
        count++;
    }
    arr.pop();
    return arr;
}

function getPos(element) {
    let y = 0;
    for(let x = 0;x < cells.length;x++) {
        if(x % BOARD_WIDTH === 0 && x !== 0) y++;
        if(cells[x] !== element) continue
        let widths = Math.floor(x / BOARD_WIDTH);
        x -= BOARD_WIDTH * widths;
        return [x, y];
    }    
    // if the element is not found
    return [0, 0]
}

function dist(a, b) {
    // const {x: aX, y: aY} = a.getBoundingClientRect();
    // const {x: bX, y: bY} = b.getBoundingClientRect();
    const [aX, aY] = getPos(a);
    const [bX, bY] = getPos(b);

    const distanceX = (aX - bX) ** 2;
    const distanceY = (aY - bY) ** 2;
    return (
        Math.sqrt(distanceX*10 + distanceY*10)
    );
}

// function DATA_NODE(element) {
//     this.element = element;
//     this.g = dist(this.element, start);
//     this.h = dist(this.element, end);
//     this.f = this.g + this.h;
// }

async function search(s) {
    var neighboors = s.neighboors();
    [endNodeClass] = cellsClass.filter(cellClass => cellClass.element.classList.contains("END"));
    let distanceNodes = {
        fromNodeToEnd: dist(neighboors[0], endNodeClass.element),
        elm: neighboors[0], fromNodeToStart: dist(neighboors[0], startNodeClass.element),
    }

    for(let i = 0;i < neighboors.length;i++) {
        for(let j = 0;j < neighboors.length;j++) {
            if(distanceNodes.fromNodeToEnd < dist(neighboors[j], endNodeClass.element)) continue;
            neighboors[j].classList.add("searchCell")
            distanceNodes.fromNodeToEnd = dist(neighboors[j], endNodeClass.element);
            distanceNodes.fromNodeToStart = dist(neighboors[j], startNodeClass.element); 
            distanceNodes.elm = neighboors[j];
        }
    }
    openSet.push(distanceNodes);
    await sleep(150)
    distanceNodes.elm.classList.remove("searchCell")
    distanceNodes.elm.classList.add("validCell")
    const [distanceNodesClassElement] = cellsClass.filter(cellClass => cellClass.element === distanceNodes.elm);
    for(const n of distanceNodesClassElement.neighboors()) {
        if(n === endNodeClass.element) {
            await sleep(500);
            var i = 0;
            var interval = setInterval(() => {
                if(i === openSet.length) {
                    clearInterval(interval);
                    return;
                }
                try {
                    openSet[i].elm.classList.remove("validCell")
                    openSet[i].elm.classList.remove("searchCell")
                    openSet[i].elm.classList.add("path")
                    i++;
                } catch(error) {
                    return 0;
                }
            }, 100)
            return 1;
        }
    }
    search(distanceNodesClassElement)

}



function startSearch() {
    for(const element of openSet) {
        element.elm.classList.remove("path")
    }
    cells.forEach(cell => {
        cell.classList.remove("searchCell")
        cell.classList.remove("validCell")
    })
    openSet = [];
    [startNodeClass] = cellsClass.filter(cellClass => cellClass.element.classList.contains("START"));
    search(startNodeClass)
}
startSearch()

