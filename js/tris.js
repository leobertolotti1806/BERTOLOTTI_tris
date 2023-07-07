let table = document.getElementById("table");

let turno = 0, gioacate = 0;
let canIclick = true;
let cells = [[], [], []];

for (let i = 0; i < 3; i++) {
    let row = document.createElement("div");

    for (let j = 0; j < 3; j++) {
        const arrInd = i * 3 + j;

        let col = document.createElement("div");

        col.className = "card";
        col.innerHTML = `<div><div></div></div>`;

        cells[i].push("");

        col.addEventListener("click", function () {
            if (!this.firstChild.classList.contains("scopri") && canIclick) {
                gioacate++;

                this.firstChild.className = "scopri";

                let divImg = this.firstChild.firstChild;
                let sign = turno == 0 ? "O" : "X";

                cells[i][j] = sign;

                divImg.style.backgroundImage = "url(./img/" + 
                        sign + ".png)";

                if (gioacate > 4) {
                    let c = win(sign);
                    if (c != "") {
                        alert(c)
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
    let i = 0 , j = 0;

    //righe
    while (i < 3 && cells[i].some(c => c != sign))
        i++;

    if (i == 3) {
        i = 0;

        while (i < 3 && j < 3) {
            
            j = 0;

            while (j < 3 && cells[i][j] != sign) {
                j++;
            }

            i++;
        }

        if (j == 3) {
            i = 0;

            while (i < 3 && cells[i][i] != sign)
                i++;

            if (i == 3) {
                i = 0;

                while (i < 3 && cells[i][3 - i]) 
                    i++;

                if (i < 3)
                    win = "Ha vinto " + sign + " in diagonale";
                    
            } else win = "Ha vinto " + sign + " in diagonale";

        } else win = "Ha vinto " + sign + " in colonna " + (j +1);

    } else win = "Ha vinto " + sign + " in riga " + (i +1);

    return win;
}