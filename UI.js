const BOARD = document.querySelector(".board")

function setEventListener() {   

    for(const cell of cells) {
        cell.draggable = true;
        if(cell === start || cell === end) continue;
        cell.ondrag =  _ => {
            _.preventDefault();
            for(const _cell of cells) {
                _cell.ondragover = ({ target }) => {
                    target.classList.add("obstacle");
                    _cell.ondragover = null;
                }
            }
            cell.ondrag = null;
        }
        cell.ondragend = _ => clearCellsEvent(false);
    }

    start.addEventListener("dragstart", _ => {
        clearCellsEvent(false);
        cells.forEach(cell => {
            if(cell.classList.contains("END") || cell.classList.contains("obstacle")) return;
            cell.ondragover = (evt) => {
                const {target} = evt;
                evt.preventDefault();
                // s for start the lime cell
                let [s] = cells.filter(x => x.classList.contains("START"));
                s.classList.remove("START");
                target.classList.add("START");
                start.draggable = false;
                start = target;
                start.draggable = true;
            };
        });
    });
    
    end.addEventListener("dragstart", _ => {
        clearCellsEvent(false);
        cells.forEach(cell => {
            if(cell.classList.contains("START") || cell.classList.contains("obstacle")) return;
            cell.ondragover = (evt) => {
                const {target} = evt;
                evt.preventDefault();
                // e for end the red cell
                let [e] = cells.filter(x => x.classList.contains("END"));
                e.classList.remove("END");
                target.classList.add("END");
                end.draggable = false;
                end = target;
                end.draggable = true;
            };
        });
    });

    
    start.addEventListener("dragend", clearCellsEvent);
    end.addEventListener("dragend", clearCellsEvent);
}


function clearCellsEvent(startAgain=true) {
    cells.forEach(c => {
        c.ondragover = null;
        c.ondrag = null;
    });
    if(startAgain) startSearch();
    setEventListener();
}


