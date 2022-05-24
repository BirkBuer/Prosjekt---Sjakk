// Grid-system start.
const containerEl = document.querySelector(".container");
const gridEl = document.querySelector(".grid0");

// Generering av sjakkbrett.
var switchRow = false;
for (let x = 1; x <= 64; x++) {
    const createGrid = document.createElement("div");
    createGrid.id = "cell_" + x;

    // Dette er det som skaper mønsteret til sjakkbrettet.
    if (switchRow == true) {
        if (x % 2 == 0) {
            createGrid.style.backgroundColor = "white";
        } else {
            createGrid.style.backgroundColor = "gray";
        }
    } else {
        if (x % 2 == 0) {
            createGrid.style.backgroundColor = "gray";
        } else {
            createGrid.style.backgroundColor = "white";
        }
    }

    // Skaping av sjakkbrettet.
    createGrid.style.display = "flex";
    createGrid.style.justifyContent = "center";
    createGrid.style.alignItems = "center";
    containerEl.appendChild(createGrid);

    // Her byttes variabelens boolean-verdi, som gjør at mønsteret bytter seg hver 8. rute, hvis ikke hadde sjakkbrettet bare vært linjer, og ikke rutete.
    if (x % 8 == 0) {
        switchRow = !switchRow;
    }
}

// Her starter programmeringen som skaper og plasserer sjakk-bitene.

// Plasseringen er ikke en fast plassering, det er basert på matrixen "placementMatrix".
// placementMatrix blir forandret i bevegelsesfunksjonene, og derfor blir sjakkbrettet endret hver gang man bruker loadPieces() funksjonen.
const blackT = document.createElement("img");
let placementMatrix = [
    [-6, -3, -4, -9, -10, -4, -3, -6],
    [-1, -1, -1, -1, -1, -1, -1, -1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [6, 3, 4, 9, 10, 4, 3, 6],
];
//Her telles antall brikker det er av hver type/farge, antallet forandrer seg selvfølgelig senere.
var pieceNum = {
    pawn: {
        white: 1,
        black: 1,
    },
    knight: {
        white: 1,
        black: 1,
    },
    bishop: {
        white: 1,
        black: 1,
    },
    tower: {
        white: 1,
        black: 1,
    },
};
// Dette er funksjonen som laster inn alle sjakk-brikkene.
loadPieces();
function loadPieces() {
    // for-løkker som utfører lastingen av sjakk-brikkene, en etter en.
    for (let x = 0; x < placementMatrix.length; x++) {
        for (let y = 0; y < placementMatrix[x].length; y++) {
            if (placementMatrix[x][y] == 0) {
            } else {
                // Variabel-suppe som endrer verdier lenger ned i funksjonen.
                let createImage = document.createElement("img");
                var fileName = "";
                var pieceID = "";
                var pieceClass = "";
                var pieceType = "";
                if (placementMatrix[x][y] < 0) {
                    fileName += "black";
                } else {
                    fileName += "white";
                }
                fileName += "_";
                // Her lærte jeg å bruke "switch" av Igor.
                // Jeg brukte det ikke noe mer senere i dokumentet, men jeg syntest likevel det var kult å lære.
                // Det gjør nesten det samme som et if-statement, men litt anerledes.

                // Her blir identiteten, filnavnet, og nummeret til brikken dannet.
                switch (Math.abs(placementMatrix[x][y])) {
                    case 1:
                        fileName += "pawn.png";
                        if (placementMatrix[x][y] < 0) {
                            pieceID = "bp" + pieceNum.pawn.black;
                            pieceNum.pawn.black++;
                            pieceClass = "black";
                            pieceType = "pawn";
                        } else {
                            pieceID = "wp" + pieceNum.pawn.white;
                            pieceNum.pawn.white++;
                            pieceClass = "white";
                            pieceType = "pawn";
                        }
                        break;
                    case 3:
                        fileName += "knight.png";
                        if (placementMatrix[x][y] < 0) {
                            pieceID = "bk" + pieceNum.knight.black;
                            pieceNum.knight.black++;
                            pieceClass = "black";
                            pieceType = "knight";
                        } else {
                            pieceID = "wk" + pieceNum.knight.white;
                            pieceNum.knight.white++;
                            pieceClass = "white";
                            pieceType = "knight";
                        }
                        break;
                    case 4:
                        fileName += "bishop.png";
                        if (placementMatrix[x][y] < 0) {
                            pieceID = "bb" + pieceNum.bishop.black;
                            pieceNum.bishop.black++;
                            pieceClass = "black";
                            pieceType = "bishop";
                        } else {
                            pieceID = "wb" + pieceNum.bishop.white;
                            pieceNum.bishop.white++;
                            pieceClass = "white";
                            pieceType = "bishop";
                        }
                        break;
                    case 6:
                        fileName += "tower.png";
                        if (placementMatrix[x][y] < 0) {
                            pieceID = "bt" + pieceNum.tower.black;
                            pieceNum.tower.black++;
                            pieceClass = "black";
                            pieceType = "tower";
                        } else {
                            pieceID = "wt" + pieceNum.tower.white;
                            pieceNum.tower.white++;
                            pieceClass = "white";
                            pieceType = "tower";
                        }
                        break;
                    case 9:
                        fileName += "queen.png";
                        if (placementMatrix[x][y] < 0) {
                            pieceID += "bq";
                            pieceClass = "black";
                            pieceType = "queen";
                        } else {
                            pieceID += "wq";
                            pieceClass = "white";
                            pieceType = "queen";
                        }
                        break;
                    case 10:
                        fileName += "king.png";
                        if (placementMatrix[x][y] < 0) {
                            pieceID += "bk";
                            pieceClass = "black";
                            pieceType = "king";
                        } else {
                            pieceID += "wk";
                            pieceClass = "white";
                            pieceType = "king";
                        }
                        break;
                }

                // Her blir bildene til brikkene dannet, og de får sine klasser, identiteter, og alt annet som tilhører dem.
                createImage.src = "../../../Assets/" + fileName;
                createImage.id = pieceID;
                createImage.classList.add(pieceClass);
                createImage.classList.add(pieceType);
                createImage.style.width = "75%";
                createImage.style.height = "75%";
                createImage.style.cursor = "pointer";
                createImage.addEventListener("click", selectPiece, true);
                containerEl
                    .querySelectorAll("div")
                    [8 * x + y].append(createImage);
            }
        }
    }
}

// Denne funksjonen er en veldig viktig funksjon som sjekker om det er noe i den retningen den beveger seg i som blokkerer veien.
// Den sjekker først hvilken retning du drar i ved å sjekke hvilke X-og-Y-verdier som er større og hvilke som er mindre.
// Det er litt vanskelig å forklare hvordan de diagonale linjene blir sjekket, men det er litt samme konsept som de vertikale/horisontale.

// OBS: X-og-Y-koordinatsystemet er baklengs, noe som måtte bli justert etter i denne funksjoner og de andre som bruker det.
// Altså er X-koordinaten vertikal, og Y er horisontal.

// Og forresten er alt som logges i konsollet på Engelsk, jeg gjorde dette fordi jeg bare syntest det var litt lettere.
function VectorFree(placementMatrix, y1, x1, y2, x2) {
    console.log("VectorFree ", x1, y1, x2, y2);

    // -- Vertikale/horisontale linjer --
    if (x1 === x2 && y1 > y2) {
        // Nord
        console.log("direction is north");
        for (let i = y1 - 1; i > y2; i--) {
            if (placementMatrix[i][x1] != 0) {
                console.log("VectorFree found an obstacle");
                return false;
            }
        }
    } else if (x1 < x2 && y1 == y2) {
        // Øst
        console.log("direction is east");
        for (let i = x1 + 1; i < x2; i++) {
            if (placementMatrix[y1][i] != 0) {
                console.log("VectorFree found an obstacle");
                return false;
            }
        }
    } else if (x1 == x2 && y1 < y2) {
        // Sør
        console.log("direction is south");
        for (let i = y1 + 1; i < y2; i++) {
            if (placementMatrix[i][x1] != 0) {
                console.log("VectorFree found an obstacle");
                return false;
            }
        }
    } else if (x1 > x2 && y1 == y2) {
        // Vest
        console.log("direction is west");
        for (let i = x1 - 1; i > x2; i--) {
            if (placementMatrix[y1][i] != 0) {
                console.log("VectorFree found an obstacle");
                return false;
            }
        }
    }

    // -- Diagonale linjer --
    else if (x1 < x2 && y1 > y2) {
        // Nordøst
        console.log(
            `direction is northeast. start position (x,y) is (${x1},${y1})-->(${x2},${y2})`
        );
        for (let i = x2 - x1 - 1; i > 0; i--) {
            console.log(
                `i= ${i}: (x,y) is (${x1 + i},${y1 - i}): ${
                    placementMatrix[y1 - i][x1 + i]
                }`
            );
            if (placementMatrix[y1 - i][x1 + i] != 0) {
                console.log("VectorFree found an obstacle");
                return false;
            }
        }
    } else if (x1 < x2 && y1 < y2) {
        // Sørøst
        console.log(
            `direction is southeast. start position (x,y) is (${x1},${y1})-->(${x2},${y2})`
        );
        for (let i = x2 - x1 - 1; i > 0; i--) {
            console.log(
                `i= ${i}: (x,y) is (${x1 + i},${y1 + i}): ${
                    placementMatrix[y1 + i][x1 + i]
                }`
            );
            if (placementMatrix[y1 + i][x1 + i] != 0) {
                console.log("VectorFree found an obstacle");
                return false;
            }
        }
    } else if (x1 > x2 && y1 < y2) {
        // Sørvest
        console.log(
            `direction is southwest. start position (x,y) is (${x1},${y1})-->(${x2},${y2})`
        );
        for (let i = x1 - x2 - 1; i > 0; i--) {
            console.log(
                `i= ${i}: (x,y) is (${x1 + i},${y1 + i}): ${
                    placementMatrix[y1 + i][x1 - i]
                }`
            );
            if (placementMatrix[y1 + i][x1 - i] != 0) {
                console.log("VectorFree found an obstacle");
                return false;
            }
        }
    } else if (x1 > x2 && y1 > y2) {
        // Nordvest
        console.log(
            `direction is northwest. start position (x,y) is (${x1},${y1})-->(${x2},${y2})`
        );
        for (let i = x1 - x2 - 1; i > 0; i--) {
            console.log(
                `i= ${i}: (x,y) is (${x1 + i},${y1 + i}): ${
                    placementMatrix[y1 - i][x1 - i]
                }`
            );
            if (placementMatrix[y1 - i][x1 - i] != 0) {
                console.log("VectorFree found an obstacle");
                return false;
            }
        }
    }
    return true;
}

// Funksjonen som kjøres når man velger brikken man skal flytte og tilhørende variabler.
// Denne funskjonen er ikke så avansert, den fyller egentlig bare et par globale variabler som brukes i senere funksjoner.
// Den er fortsatt veldig viktig, da.

// Variabel-suppe.
let nodelist = Array.from(containerEl.querySelectorAll("div"));
console.log("Nodelist: " + nodelist);
const nodeMatrix = [];
for (let x = 0; x < nodelist.length; x += 8) {
    nodeMatrix.push(nodelist.slice(x, x + 8));
}
let pieceChosen;
let piecePos;
let position1 = { x: null, y: null };
let position2 = { x: null, y: null };
let pieceTarget;
console.log(nodeMatrix);

// Funksjonen som velger brikken du skal deretter flytte.
function selectPiece(event) {
    // Setter noen variabler
    pieceTarget = event.target;
    pieceChosen = pieceTarget.id;
    piecePos = pieceTarget.closest("div");
    // If-statements som sjekker hva det er du trykker på.
    if (pieceTarget.classList.contains("pawn")) {
        console.log("pawn selected, ID: " + pieceTarget.id);
        console.log("parent element: " + piecePos.id);
    } else if (pieceTarget.classList.contains("knight")) {
        console.log("knight selected, ID: " + pieceTarget.id);
        console.log("parent element: " + piecePos.id);
    } else if (pieceTarget.classList.contains("bishop")) {
        console.log("bishop selected, ID: " + pieceTarget.id);
        console.log("parent element: " + piecePos.id);
    } else if (pieceTarget.classList.contains("tower")) {
        console.log("tower selected, ID: " + pieceTarget.id);
        console.log("parent element: " + piecePos.id);
    } else if (pieceTarget.classList.contains("queen")) {
        console.log("queen selected, ID: " + pieceTarget.id);
        console.log("parent element: " + piecePos.id);
    } else if (pieceTarget.classList.contains("king")) {
        console.log("king selected, ID: " + pieceTarget.id);
        console.log("parent element: " + piecePos.id);
    } else {
        console.log("Piece target error, ID: " + pieceTarget.id);
        console.log("parent element: " + piecePos.id);
    }
    // For-løkke som fjerner noen eventlisteners og setter koordinater.
    for (let x = 0; x < nodeMatrix.length; x++) {
        for (let y = 0; y < nodeMatrix[x].length; y++) {
            if (nodeMatrix[x][y] == piecePos) {
                console.log("Coordinates of first position: " + x + ", " + y);
                position1.x = x;
                position1.y = y;
            }
            if (nodeMatrix[x][y].querySelector("img") != null) {
                nodeMatrix[x][y]
                    .querySelector("img")
                    .removeEventListener("click", selectPiece, true);
            }
        }
    }
    for (let node of nodelist) {
        node.addEventListener("click", movePiece, true);
    }
}
// Her begynner funksjonene som igangsetter bevegelsen av brikkene.
let moveTarget;
function movePiece(event) {
    moveTarget = event.target;
    console.log("moveTarget: " + moveTarget);
    // For-løkke som setter koordinater.
    for (let x = 0; x < nodeMatrix.length; x++) {
        for (let y = 0; y < nodeMatrix[x].length; y++) {
            if (nodeMatrix[x][y] == moveTarget.closest("div")) {
                console.log("Coordinates of second position: " + x + ", " + y);
                position2.x = x;
                position2.y = y;
            }
        }
    }
    console.log("Board position ID: " + moveTarget.closest("div").id);
    console.log("Piece chosen: " + pieceChosen);
    // For-løkke som fjerner eventlistener til denne funksjonen.
    for (let node of nodelist) {
        node.removeEventListener("click", movePiece, true);
    }
    // Her sjekker jeg for alle reglene, jeg skal kort forklare de jeg mener ikke er åpenbare og slikt.

    // Sjekker om du prøver å flytte brikken oppå seg selv.
    if (position1.x == position2.x && position1.y == position2.y) {
        alert("Du kan ikke flytte en brikke til der den allerede er");
        for (let x = 0; x < nodeMatrix.length; x++) {
            for (let y = 0; y < nodeMatrix[x].length; y++) {
                if (nodeMatrix[x][y].querySelector("img") != null) {
                    nodeMatrix[x][y]
                        .querySelector("img")
                        .addEventListener("click", selectPiece, true);
                }
            }
        }
        return;
    } else if (
        // Sjekker om du prøver å flytte brikken din oppå en med samme farge.
        (moveTarget.classList.contains("white") &&
            pieceTarget.classList.contains("white")) ||
        (moveTarget.classList.contains("black") &&
            pieceTarget.classList.contains("black"))
    ) {
        alert("Du kan ikke flytte en brikke oppå din egen brikke");
        for (let x = 0; x < nodeMatrix.length; x++) {
            for (let y = 0; y < nodeMatrix[x].length; y++) {
                if (nodeMatrix[x][y].querySelector("img") != null) {
                    nodeMatrix[x][y]
                        .querySelector("img")
                        .addEventListener("click", selectPiece, true);
                }
            }
        }
        return;
    } else {
        // Sjekker samme ting igjen, men hvis du trykker på en celle med en brikke på, og ikke brikken i seg selv.
        if (moveTarget.querySelector("img") != null) {
            if (
                (moveTarget.querySelector("img").classList.contains("white") &&
                    pieceTarget.classList.contains("white")) ||
                (moveTarget.querySelector("img").classList.contains("black") &&
                    pieceTarget.classList.contains("black"))
            ) {
                alert("Du kan ikke flytte en brikke oppå din egen brikke");
                for (let x = 0; x < nodeMatrix.length; x++) {
                    for (let y = 0; y < nodeMatrix[x].length; y++) {
                        if (nodeMatrix[x][y].querySelector("img") != null) {
                            nodeMatrix[x][y]
                                .querySelector("img")
                                .addEventListener("click", selectPiece, true);
                        }
                    }
                }
                return;
            } else {
                // Hvis funksjonen når fram hit, har ikke bevegelsen brutt de enkleste reglene.
                // Da blir movingPiece() kjørt, der den går igjennom noen mer spesifikke tester.
                movingPiece();
                for (let x = 0; x < nodeMatrix.length; x++) {
                    for (let y = 0; y < nodeMatrix[x].length; y++) {
                        if (nodeMatrix[x][y].querySelector("img") != null) {
                            nodeMatrix[x][y]
                                .querySelector("img")
                                .addEventListener("click", selectPiece, true);
                        }
                    }
                }
                return;
            }
        } else {
            // Samme her som ovenfor.
            movingPiece();
            for (let x = 0; x < nodeMatrix.length; x++) {
                for (let y = 0; y < nodeMatrix[x].length; y++) {
                    if (nodeMatrix[x][y].querySelector("img") != null) {
                        nodeMatrix[x][y]
                            .querySelector("img")
                            .addEventListener("click", selectPiece, true);
                    }
                }
            }
            return;
        }
    }
}

// movingPiece()-funksjonen er siste funksjonen som kjører når du flytter en brikke.
// Den sjekker om brikken du flytter passer med reglene til den spesifikke brikken, og så flytter den hvis den ikke bryter reglene.
// Hvis brikken passerer testen, flyttes den verdien som var i posisjon 1 til posisjon 2, og skaper en 0 der den før var.
// Altså, alt dette i matrixen som ligger lengre opp.
function movingPiece() {
    // Her begynner den å sjekke hvilken type brikke du flytter.
    // Bare i tilfelle; pawn er bonde, knight er hest, bishop er løper, tower er tårn, king & queen vet du hva er.
    if (pieceTarget.classList.contains("pawn")) {
        // Bonden er den eneste som har forskjellig oppførsel basert på farge.
        if (pieceTarget.classList.contains("white")) {
            // Her sjekker jeg for om bonden fortsatt er på første rad, da kan den flytte seg to fram.
            if (position1.x == 6) {
                if (
                    (position2.x == 5 || position2.x == 4) &&
                    position2.y == position1.y &&
                    // VectorFree-funksjonen har jeg tidligere forklart hva gjør. Den sjekker om noe er i veien, og returnerer true hvis veien ikke er blokkert.
                    VectorFree(
                        placementMatrix,
                        position1.x,
                        position1.y,
                        position2.x - 1,
                        position2.y
                    )
                ) {
                    // Alt dette gjør er å flytte brikken fra posisjon 1 til posisjon 2, og plassere et tomrom der den før var.
                    // Du kommer til å se dette mange ganger.
                    placementMatrix[position2.x][position2.y] =
                        placementMatrix[position1.x][position1.y];
                    placementMatrix[position1.x][position1.y] = 0;
                } else if (
                    // Her sjekker jeg om det er en brikke av omvendt farge diagonalt foran bonden, og lar den flytte seg dit hvis det er det.
                    (moveTarget.classList.contains("black") ||
                        (moveTarget.localName == "div" &&
                            moveTarget.querySelector("img") != null)) &&
                    position2.x == position1.x - 1 &&
                    (position2.y == position1.y - 1 ||
                        position2.y == position1.y + 1)
                ) {
                    placementMatrix[position2.x][position2.y] =
                        placementMatrix[position1.x][position1.y];
                    placementMatrix[position1.x][position1.y] = 0;
                } else {
                    // Hvis den ikke flytter seg, så kjører dette.
                    // Relativt åpenbart.
                    alert("Du kan ikke flytte denne brikken hit.");
                    return;
                }
            } else if (
                // Her er standard "1 fram" flyttingen. Funker likt som de ovenfor.
                // De if-statementene under dette igjen har allerede bitt brukt ovenfor, forklarer dem ikke igjen.
                position1.x - 1 == position2.x &&
                position1.y == position2.y &&
                moveTarget.localName == "div" &&
                moveTarget.querySelector("img") == null
            ) {
                placementMatrix[position2.x][position2.y] =
                    placementMatrix[position1.x][position1.y];
                placementMatrix[position1.x][position1.y] = 0;
            } else if (
                (moveTarget.classList.contains("black") ||
                    (moveTarget.localName == "div" &&
                        moveTarget.querySelector("img") != null)) &&
                position2.x == position1.x - 1 &&
                (position2.y == position1.y - 1 ||
                    position2.y == position1.y + 1)
            ) {
                placementMatrix[position2.x][position2.y] =
                    placementMatrix[position1.x][position1.y];
                placementMatrix[position1.x][position1.y] = 0;
            } else {
                alert("Du kan ikke flytte denne brikken hit.");
                return;
            }
        } else if (pieceTarget.classList.contains("black")) {
            // Her gjør den nøyaktig det samme som ovenfor, men med forskjellige verdier grunnet retningen den flytter seg.
            if (position1.x == 1) {
                if (
                    (position2.x == 2 || position2.x == 3) &&
                    position2.y == position1.y &&
                    VectorFree(
                        placementMatrix,
                        position1.x,
                        position1.y,
                        position2.x + 1,
                        position2.y
                    )
                ) {
                    placementMatrix[position2.x][position2.y] =
                        placementMatrix[position1.x][position1.y];
                    placementMatrix[position1.x][position1.y] = 0;
                } else if (
                    (moveTarget.classList.contains("white") ||
                        (moveTarget.localName == "div" &&
                            moveTarget.querySelector("img") != null)) &&
                    position2.x == position1.x + 1 &&
                    (position2.y == position1.y - 1 ||
                        position2.y == position1.y + 1)
                ) {
                    placementMatrix[position2.x][position2.y] =
                        placementMatrix[position1.x][position1.y];
                    placementMatrix[position1.x][position1.y] = 0;
                } else {
                    alert("Du kan ikke flytte denne brikken hit.");
                    return;
                }
            } else if (
                position1.x + 1 == position2.x &&
                position1.y == position2.y
            ) {
                placementMatrix[position2.x][position2.y] =
                    placementMatrix[position1.x][position1.y];
                placementMatrix[position1.x][position1.y] = 0;
            } else {
                alert("Du kan ikke flytte denne brikken hit.");
                return;
            }
        }
        // Her slutter sjekkingen for bonden.
        // Ikke frykt, de andre er ikke i nærheten av like avanserte/lange som bonden.

        // Sjekking av flytting for hest.
        // Dette er nok den største mengden tekst jeg har hatt inni parantesene i et if-statement.
        // Hvis du lurer på hvordan filen er organisert så bra som den er, så er det fordi jeg har en "extension" i programmet VSCode som fikser det automatisk for meg.
    } else if (pieceTarget.classList.contains("knight")) {
        if (
            (position1.x == position2.x - 2 &&
                (position2.y == position1.y + 1 ||
                    position2.y == position1.y - 1)) ||
            (position1.y == position2.y - 2 &&
                (position2.x == position1.x + 1 ||
                    position2.x == position1.x - 1)) ||
            (position1.y == position2.y + 2 &&
                (position2.x == position1.x + 1 ||
                    position2.x == position1.x - 1)) ||
            (position1.x == position2.x + 2 &&
                (position2.y == position1.y + 1 ||
                    position2.y == position1.y - 1))
        ) {
            placementMatrix[position2.x][position2.y] =
                placementMatrix[position1.x][position1.y];
            placementMatrix[position1.x][position1.y] = 0;
        } else {
            alert("Du kan ikke flytte denne brikken hit.");
            return;
        }

        // Sjekking for løper.
        // Det var ikke så lett å komme på hvordan man sjekket om bevegelsen var diagonal, men med litt hjelp fra Igor gikk det etterhvert.
    } else if (pieceTarget.classList.contains("bishop")) {
        if (
            Math.abs(position1.x - position2.x) ==
                Math.abs(position1.y - position2.y) &&
            VectorFree(
                placementMatrix,
                position1.x,
                position1.y,
                position2.x,
                position2.y
            )
        ) {
            placementMatrix[position2.x][position2.y] =
                placementMatrix[position1.x][position1.y];
            placementMatrix[position1.x][position1.y] = 0;
        } else {
            alert("Du kan ikke flytte denne brikken hit.");
            return;
        }

        // Sjekking for tårn.
        // Dette var kanskje den letteste.
        // Alt jeg trengte å gjøre var å sjekke om noen av aksene ikke endret seg.
    } else if (pieceTarget.classList.contains("tower")) {
        console.log("checking tower movement");
        if (
            (position1.x == position2.x || position1.y == position2.y) &&
            VectorFree(
                placementMatrix,
                position1.x,
                position1.y,
                position2.x,
                position2.y
            )
        ) {
            placementMatrix[position2.x][position2.y] =
                placementMatrix[position1.x][position1.y];
            placementMatrix[position1.x][position1.y] = 0;
        } else {
            alert("Du kan ikke flytte denne brikken hit.");
            return;
        }

        // Sjekking for dronning.
        // Denne var også relativt lett, fordi jeg allerede hadde skrevet programmeringen for tårn og løper,
        // så jeg trengte bare å kombinere de to.
    } else if (pieceTarget.classList.contains("queen")) {
        if (
            (position1.x == position2.x ||
                position1.y == position2.y ||
                Math.abs(position1.x - position2.x) ==
                    Math.abs(position1.y - position2.y)) &&
            VectorFree(
                placementMatrix,
                position1.x,
                position1.y,
                position2.x,
                position2.y
            )
        ) {
            placementMatrix[position2.x][position2.y] =
                placementMatrix[position1.x][position1.y];
            placementMatrix[position1.x][position1.y] = 0;
        } else {
            alert("Du kan ikke flytte denne brikken hit");
            return;
        }

        // Sjekking for konge.
        // Denne var heller ikke vanskelig, fordi jeg trengte bare sjekke om noen av verdiene hadde forandret seg med en verdi av 1.
    } else if (pieceTarget.classList.contains("king")) {
        if (
            Math.abs(position1.x - position2.x) == 1 ||
            Math.abs(position1.y - position2.y) == 1
        ) {
            placementMatrix[position2.x][position2.y] =
                placementMatrix[position1.x][position1.y];
            placementMatrix[position1.x][position1.y] = 0;
        } else {
            alert("Du kan ikke flytte denne brikken hit");
            return;
        }
    } else {
        // Dette kjører bare hvis du på en eller annen måte klarte å kjøre funksjonen uten at den første valgte brikken har noen av de klassene nevnt ovenfor.
        // Det bør ikke være mulig at dette skjer, men hvorfor ikke bare ha det med?
        alert("Error 404: Piece target not found.");
        return;
    }
    // Og her er siste delen av den siste delen.
    // Her slettes alle de eksisterende bildene (altså bare brikkene) og loadPieces() kjøres, som laster inn brikkene på nytt med de nye posisjonene.
    let imgList = document.querySelectorAll("img");
    for (let d = 0; d < imgList.length; d++) {
        imgList[d].remove();
    }
    loadPieces();
}
