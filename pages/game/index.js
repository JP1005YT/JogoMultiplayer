import { Game, Player } from './Library.js';

const game = new Game(1000, 600);
const container = document.getElementById("container");
game.start(container);

const token = localStorage.getItem("token");
const socket = io();

let player = new Player('Arthur', 50, 100, 100, "Green", token, game.context);
game.players.push(player);

// Update and render the game loop
function updateGameArea() {
    game.clear();
    for (const player of game.players) {
        player.update();
    }
}

// Set up the game loop interval
setInterval(updateGameArea, 7);




// Quando a conexão com o servidor é estabelecida
socket.on("connect", () => {
    socket.emit("connected", token);

    socket.on("UpdatePlayers", (players) => {
        UpdatePlayers(players);
    });
});
// let players = [];

// function UpdatePlayers(data) {
//     data.forEach((playerBack) => {
//         if (players[playerBack.name] === undefined) {
//             players[playerBack.name] = new Game(
//                 playerBack.name,
//                 50,
//                 playerBack.posX,
//                 playerBack.posY,
//                 playerBack.Color,
//                 playerBack.socketID
//             );
//         }
//     });
//     const objectNameSet = new Set(data.map((obj) => obj.name));

//     for (const key in players) {
//         if (!objectNameSet.has(players[key].name)) {
//             delete players[key];
//         }
//     }

//     data.forEach((square) => {
//         if (socket.id !== data.socketID) {
//             players[square.name].x = square.posX;
//             players[square.name].y = square.posY;
//         }
//     });
// console.log(players);
// players.forEach((playerFront) => {
//   console.log("cenoura")
//   data.forEach((playerBack) => {
//     console.log(playerFront);
//     console.log(playerFront);
//     console.log("batata");
//     if (playerFront.name !== playerBack.name) {
//       console.log('fudeu')
//     }
//   });
// });
// }

// var myGameArea = {
//   canvas: document.createElement("canvas"),
//   start: function () {
//     const WIDTH = 1000,
//       HEIGHT = 600;
//     this.canvas.width = WIDTH;
//     this.canvas.height = HEIGHT;
//     this.context = this.canvas.getContext("2d");
//     container.appendChild(this.canvas);
//     this.interval = setInterval(updateGameArea, 7);
//   },
//   clear: function () {
//     this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
//   },
// };

// function Square(name, width, x, y, color, socketID) {
//   this.name = name;
//   this.x = x;
//   this.y = y;
//   this.speed = 1;
//   this.isRight = false;
//   this.isLeft = false;
//   this.isTop = false;
//   this.isBottom = false;
//   this.color = color;
//   this.socket = socketID;
//   this.width = width;
//   this.update = function () {
//     ctx = myGameArea.context;
//     ctx.font = "bold 15px Arial";
//     ctx.fillStyle = this.color;
//     ctx.fillRect(this.x, this.y, width, width);
//     ctx.fillText(this.name, this.x, this.y - 7);
//     if (this.isRight || this.isLeft || this.isBottom || this.isTop) {
//       socket.emit("positionUpdate", [this.x, this.y, this.name]);
//     }
//   };
//   this.newPos = function () {
//     if (this.x + this.width >= collision.x &&
//       this.x <= collision.x + collision.h &&
//       this.y + this.width >= collision.y &&
//       this.y <= collision.y + collision.v
//     ) {
//       collision.verify(this.x, this.y, this.width);
//     }


//     if (this.isRight) {
//       this.x += this.speed;
//     }
//     if (this.isLeft) {
//       this.x -= this.speed;
//     }
//     if (this.isTop) {
//       this.y += this.speed;
//     }
//     if (this.isBottom) {
//       this.y -= this.speed;
//     }
//   };
// }

// function ObjectCollision(x, y, horizontal, vertical) {
//   this.x = x;
//   this.y = y;
//   this.h = horizontal;
//   this.v = vertical;
//   this.update = function () {
//     ctx = myGameArea.context;
//     ctx.fillStyle = "Green";
//     ctx.fillRect(this.x, this.y, this.h, this.v);
//   };
//   this.verify = function (playerX, playerY, playerWidth) {

//     if (playerY + playerWidth <= this.y) {
//       console.log("encima")
//       for (const square in players) {
//         if (players[square].socket === socket.id) {
//           players[square].isTop = false;
//         }
//       }
//     } if (playerY >= this.y + this.v) {
//       console.log("embaixo ")
//       for (const square in players) {
//         if (players[square].socket === socket.id) {
//           players[square].isBottom = false;
//         }
//       }
//     }


//     if (playerX + playerWidth <= this.x) {
//       console.log("esquerda")
//       for (const square in players) {
//         if (players[square].socket === socket.id) {
//           players[square].isRight = false;
//         }
//       }
//     } if (playerX >= this.x + this.h) {
//       console.log("direita")
//       for (const square in players) {
//         if (players[square].socket === socket.id) {
//           players[square].isLeft = false;
//         }
//       }
//     }


//   }
// }


// function updateGameArea() {
//     myGameArea.clear();
//     for (const player in players) {
//         players[player].newPos();
//         players[player].update();
//     }
//     collision.update();
// }

addEventListener("keyup", function (e) {
    switch (e.key) {
        case "d":
        case "ArrowRight":
            for (const square in players) {
                if (players[square].socket === socket.id) {
                    players[square].isRight = false;
                }
            }
            break;
        case "a":
        case "ArrowLeft":
            for (const square in players) {
                if (players[square].socket === socket.id) {
                    players[square].isLeft = false;
                }
            }
            break;
        case "w":
        case "ArrowUp":
            for (const square in players) {
                if (players[square].socket === socket.id) {
                    players[square].isBottom = false;
                }
            }
            break;
        case "s":
        case "ArrowDown":
            for (const square in players) {
                if (players[square].socket === socket.id) {
                    players[square].isTop = false;
                }
            }
            break;
    }
});

addEventListener("keydown", function (e) {
    switch (e.key) {
        case "d":
        case "ArrowRight":
            for (const square in players) {
                if (players[square].socket === socket.id) {
                    players[square].isRight = true;
                }
            }
            break;
        case "a":
        case "ArrowLeft":
            for (const square in players) {
                if (players[square].socket === socket.id) {
                    players[square].isLeft = true;
                }
            }
            break;
        case "w":
        case "ArrowUp":
            for (const square in players) {
                if (players[square].socket === socket.id) {
                    players[square].isBottom = true;
                }
            }
            break;
        case "s":
        case "ArrowDown":
            for (const square in players) {
                if (players[square].socket === socket.id) {
                    players[square].isTop = true;
                }
            }
            break;
        default:
            for (const square in players) {
                if (players[square].socket === socket.id) {
                    players[square].speedY = 0;
                    players[square].speedX = 0;
                }
            }
    }
});

// buscardados();
// myGameArea.start();
// let collision = new ObjectCollision(300, 200, 50, 80);