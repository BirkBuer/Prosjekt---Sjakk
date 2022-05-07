//Grid-system creation
const containerEl = document.querySelector(".container");
const gridEl = document.querySelector(".grid0");


//Chess board creation
var switchRow = false;
for(let x=1; x<=64; x++){
    const createGrid = document.createElement("div");
    createGrid.id="cell_"+x;
    if(switchRow == true){
        if(x%2==0){
            createGrid.style.backgroundColor = "white";
        }
        else{
            createGrid.style.backgroundColor = "gray";
        };
    }
    else{
        if(x%2==0){
            createGrid.style.backgroundColor = "gray";
        }
        else{
            createGrid.style.backgroundColor = "white";
        };
    };
    createGrid.style.display = "flex";
    createGrid.style.justifyContent = "center";
    createGrid.style.alignItems = "center";
    containerEl.appendChild(createGrid);
    if (x%8==0){
        switchRow = !switchRow;
    };
};

//Chess pieces placement/creation
const blackT = document.createElement("img");
let placementMatrix = [
    [-6, -3, -4, -10, -9, -4, -3, -6],
    [-1, -1, -1, -1, -1, -1, -1, -1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [6, 3, 4, 9, 10, 4, 3, 6]
];
var pieceNum = {
    pawn: {
        white: 1,
        black: 1
    },
    knight: {
        white: 1,
        black: 1
    },
    bishop: {
        white: 1,
        black: 1
    },
    tower: {
        white: 1,
        black: 1
    }
};
loadPieces();
function loadPieces(){
    for (let x=0; x<placementMatrix.length; x++) {
        for (let y=0; y<placementMatrix[x].length; y++) {
            if (placementMatrix[x][y] == 0) {}
            else{
                let createImage = document.createElement("img");
                var fileName = "";
                var pieceID = "";
                var pieceClass = "";
                var pieceType = "";
                if (placementMatrix[x][y] < 0) {
                    fileName += "black";
                }
                else {
                    fileName += "white";
                };
                fileName += "_";
                switch(Math.abs(placementMatrix[x][y])){
                    case 1:
                        fileName += "pawn.png";
                        if (placementMatrix[x][y] < 0) {
                            pieceID = "bp" + pieceNum.pawn.black;
                            pieceNum.pawn.black++;
                            pieceClass = "black";
                            pieceType = "pawn";
                        }
                        else {
                            pieceID = "wp" + pieceNum.pawn.white;
                            pieceNum.pawn.white++;
                            pieceClass = "white";
                            pieceType = "pawn";
                        };
                        break;
                    case 3:
                        fileName += "knight.png";
                        if (placementMatrix[x][y] < 0) {
                            pieceID = "bk" + pieceNum.knight.black;
                            pieceNum.knight.black++;
                            pieceClass = "black";
                            pieceType = "knight";
                        }
                        else {
                            pieceID = "wk" + pieceNum.knight.white;
                            pieceNum.knight.white++;
                            pieceClass = "white";
                            pieceType = "knight";
                        };
                        break;
                    case 4:
                        fileName += "bishop.png";
                        if (placementMatrix[x][y] < 0) {
                            pieceID = "bb" + pieceNum.bishop.black;
                            pieceNum.bishop.black++;
                            pieceClass = "black";
                            pieceType = "bishop";
                        }
                        else {
                            pieceID = "wb" + pieceNum.bishop.white;
                            pieceNum.bishop.white++;
                            pieceClass = "white";
                            pieceType = "bishop";
                        };
                        break;
                    case 6:
                        fileName += "tower.png";
                        if (placementMatrix[x][y] < 0) {
                            pieceID = "bt" + pieceNum.tower.black;
                            pieceNum.tower.black++;
                            pieceClass = "black";
                            pieceType = "tower";
                        }
                        else {
                            pieceID = "wt" + pieceNum.tower.white;
                            pieceNum.tower.white++;
                            pieceClass = "white";
                            pieceType = "tower";
                        };
                        break;
                    case 9:
                        fileName += "queen.png";
                        if (placementMatrix[x][y] < 0) {
                            pieceID += "bq";
                            pieceClass = "black";
                            pieceType = "queen";
                        }
                        else {
                            pieceID += "wq";
                            pieceClass = "white";
                            pieceType = "queen";
                        };
                        break;
                    case 10:
                        fileName += "king.png";
                        if (placementMatrix[x][y] < 0) {
                            pieceID += "bk";
                            pieceClass = "black";
                            pieceType = "king";
                        }
                        else {
                            pieceID += "wk";
                            pieceClass = "white";
                            pieceType = "king";
                        };
                        break;
                };
                createImage.src = "../../Assets/" + fileName;
                createImage.id = pieceID;
                createImage.classList.add(pieceClass);
                createImage.classList.add(pieceType);
                createImage.style.width = "75%";
                createImage.style.height = "75%";
                createImage.style.cursor = "pointer";
                createImage.addEventListener("click", selectPiece, true);
                containerEl.querySelectorAll("div")[(8*x)+y].append(createImage);
            };
        };
    };
}

//Chess piece movement & selection
let nodelist = Array.from(containerEl.querySelectorAll("div"));
console.log(nodelist);
const nodeMatrix = [];
for (let x = 0; x < nodelist.length; x += 8){
    nodeMatrix.push(nodelist.slice(x, x+8))
};
let pieceChosen;
let piecePos;
let pieceIsChosen = false;
let position1 = { x: null, y: null };
let position2 = { x: null, y: null };
let pieceTarget;
console.log(nodeMatrix);
function selectPiece(event){
    if (!pieceIsChosen){
        pieceIsChosen = true;
        pieceTarget = event.target;
        pieceChosen = pieceTarget.id;
        piecePos = pieceTarget.closest("div");
        if (pieceTarget.classList.contains("pawn")){
            console.log("pawn selected, ID: " + pieceTarget.id);
            console.log("parent element: " + piecePos.id);
        }
        else if (pieceTarget.classList.contains("knight")){
            console.log("knight selected, ID: " + pieceTarget.id);
            console.log("parent element: " + piecePos.id);
        }
        else if (pieceTarget.classList.contains("bishop")){
            console.log("bishop selected, ID: " + pieceTarget.id);
            console.log("parent element: " + piecePos.id);
        }
        else if (pieceTarget.classList.contains("tower")){
            console.log("tower selected, ID: " + pieceTarget.id);
            console.log("parent element: " + piecePos.id);
        }
        else if (pieceTarget.classList.contains("queen")){
            console.log("queen selected, ID: " + pieceTarget.id);
            console.log("parent element: " + piecePos.id);
        }
        else if (pieceTarget.classList.contains("king")){
            console.log("king selected, ID: " + pieceTarget.id);
            console.log("parent element: " + piecePos.id);
        }
        else {
            console.log("Piece target error, ID: " + pieceTarget.id);
            console.log("parent element: " + piecePos.id);
        };
        for (let x=0; x<nodeMatrix.length; x++) { 
            for (let y=0; y<nodeMatrix[x].length; y++) {
                if (nodeMatrix[x][y] == piecePos){
                    console.log("Coordinates of first position: " + x + ", " + y);
                    position1.x = x;
                    position1.y = y;
                };
            };
        };
        for(let node of nodelist){
            node.addEventListener("click", movePiece, true);
        };
    }
    else{
        return;
    };
};
let moveTarget;
function movePiece(event){
    moveTarget = event.target;
    console.log("moveTarget: " + moveTarget)
    for (let x=0; x<nodeMatrix.length; x++) { 
        for (let y=0; y<nodeMatrix[x].length; y++) {
            if (nodeMatrix[x][y] == moveTarget.closest("div")){
                console.log("Coordinates of second position: " + x + ", " + y);
                position2.x = x;
                position2.y = y;
            };
        };
    };
    console.log("Board position ID: " + (moveTarget.closest("div").id));
    console.log("Piece chosen: " + pieceChosen);
    for(let node of nodelist){
        node.removeEventListener("click", movePiece, true);
    };
    pieceIsChosen = false;
    if((position1.x == position2.x) && (position1.y == position2.y)){
        alert("Du kan ikke flytte en brikke til der den allerede er");
        return;
    }
    else if((moveTarget.classList.contains("white") && pieceTarget.classList.contains("white")) || (moveTarget.classList.contains("black") && pieceTarget.classList.contains("black"))){
        alert("Du kan ikke flytte en brikke oppå din egen brikke");
        return;
    }
    else{
        if(moveTarget.querySelector("img") != null){
            if((moveTarget.querySelector("img").classList.contains("white") && pieceTarget.classList.contains("white")) || (moveTarget.querySelector("img").classList.contains("black") && pieceTarget.classList.contains("black"))){
                alert("Du kan ikke flytte en brikke oppå din egen brikke");
                return;
            }
            else{movingPiece();};
        }
        else{movingPiece();};
    };
};
function movingPiece(){
    if(pieceTarget.classList.contains("pawn")){
        if(pieceTarget.classList.contains("white")){
            if(position1.x == 6){
                if((position2.x == 5 || position2.x == 4) && position2.y == position1.y){
                    placementMatrix[position2.x][position2.y] = placementMatrix[position1.x][position1.y];
                    placementMatrix[position1.x][position1.y] = 0;
                }
            }
            else if(position1.x - 1 == position2.x && position1.y == position2.y){
                placementMatrix[position2.x][position2.y] = placementMatrix[position1.x][position1.y];
                placementMatrix[position1.x][position1.y] = 0;
            }
            else{
                alert("Du kan ikke flytte denne brikken hit.");
                return;
            };
        }
        else if(pieceTarget.classList.contains("black")){
            if(position1.x == 1){
                if((position2.x == 2 || position2.x == 3) && position2.y == position1.y){
                    placementMatrix[position2.x][position2.y] = placementMatrix[position1.x][position1.y];
                    placementMatrix[position1.x][position1.y] = 0;
                }
            }
            else if(position1.x + 1 == position2.x && position1.y == position2.y){
                placementMatrix[position2.x][position2.y] = placementMatrix[position1.x][position1.y];
                placementMatrix[position1.x][position1.y] = 0;
            }
            else{
                alert("Du kan ikke flytte denne brikken hit.");
                return;
            };
        };
    }
    else if(pieceTarget.classList.contains("knight")){
        if(((position1.x == position2.x - 2) && (position2.y == position1.y + 1 || position2.y == position1.y - 1)) || ((position1.y == position2.y - 2) && (position2.x == position1.x + 1 || position2.x == position1.x - 1)) || ((position1.y == position2.y + 2) && (position2.x == position1.x + 1 || position2.x == position1.x - 1)) || ((position1.x == position2.x + 2) && (position2.y == position1.y + 1 || position2.y == position1.y - 1))){
            placementMatrix[position2.x][position2.y] = placementMatrix[position1.x][position1.y];
            placementMatrix[position1.x][position1.y] = 0;
        }
        else{
            alert("Du kan ikke flytte denne brikken hit.");
            return;
        };
    }
    else if(pieceTarget.classList.contains("bishop")){
        if(Math.abs(position1.x-position2.x) == Math.abs(position1.y - position2.y)) {
            placementMatrix[position2.x][position2.y] = placementMatrix[position1.x][position1.y];
            placementMatrix[position1.x][position1.y] = 0;
        }
        else{
            alert("Du kan ikke flytte denne brikken hit.");
            return;
        };
    }
    let imgList = document.querySelectorAll("img");
    for(let d = 0; d < imgList.length; d++){
        imgList[d].remove();
    };
    loadPieces();
};