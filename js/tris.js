let table = document.getElementById("table");
let headerName = document.querySelectorAll("header > div > div");
let menu = document.getElementById("menu");

let param = new URLSearchParams(window.location.search);
let pl = [param.get("pl1"), param.get("pl2")];

headerName[0].textContent = pl[0];
headerName[1].textContent = pl[1];

let turno = 0, gioacate = 0;
let cells = [[], [], []];
let canIclick = true;

for (let i = 0; i < 3; i++) {
    let row = document.createElement("div");

    for (let j = 0; j < 3; j++) {
        let col = document.createElement("div");

        col.className = "card";
        col.innerHTML = `<div><div></div></div>`;

        cells[i].push("");

        col.addEventListener("click", function () {
            if (!this.firstChild.classList.contains("scopri") && canIclick) {
                headerName[0].parentElement.className = "turno" + (turno + 1);

                gioacate++;

                this.firstChild.className = "scopri";

                let divImg = this.firstChild.firstChild;
                let sign = turno == 0 ? "O" : "X";

                cells[i][j] = sign;

                divImg.style.backgroundImage = "url(./img/" +
                    sign + ".png)";

                if (gioacate > 4) {
                    let winMsg = win(sign);

                    if (winMsg != "") {
                        canIclick = false;

                        menu.querySelector("b").textContent = "Ha vinto " +
                            pl[turno] + " " + winMsg;

                        menu.style.top = "8vh";

                        menu.querySelector("#play").onclick = () => {
                            if (confirm("Volete rigiocare?")) {
                                menu.style.top = "";

                                for (const card of document.querySelectorAll(".scopri"))
                                    card.className = "";

                                canIclick = true;
                                turno ^= 1;
                            }
                        };

                        menu.querySelector("#close").onclick = () => {
                            if (confirm("Volete chiudere?"))
                                close();
                        };

                        for (let i = 0; i < 3; i++)
                            cells[i] = ["", "", ""];
                    }
                }

                turno ^= 1;
            }
        });

        row.appendChild(col);
    }

    table.appendChild(row);
}

function win(sign) {
    let win = "";
    let i = 0, j = 0;

    //righe
    while (i < 3 && j < 3) {
        j = 0;

        //Colonne
        while (j < 3 && cells[i][j] == sign)
            j++;

        i++;
    }

    if (j < 3) {
        i = 0;

        while (i < 3 && j < 3) {
            j = 0;

            //Colonne
            while (j < 3 && cells[j][i] == sign)
                j++;

            i++;
        }

        if (j < 3) {
            i = 0;

            //Diagonale
            while (i < 3 && cells[i][i] == sign)
                i++;

            if (i < 3) {
                i = 0;

                //Diagonale
                while (i < 3 && cells[i][2 - i] == sign)
                    i++;

                if (i == 3)
                    win = "in diagonale secondaria";

            } else win = "in diagonale principale";

        } else win = "in colonna";

    } else win = "in riga";

    return win;
}