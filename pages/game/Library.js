export class Game {
    constructor(ScreenWidth, ScreenHeight) {
        this.width = ScreenWidth;
        this.height = ScreenHeight;
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
    }
    players = []

    /**
   * Start the game area.
   * @method
   * @param {HTMLElement} container - The container element where the game canvas will be appended.
   */
    start(container) {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        // this.context = this.canvas.getContext("2d");
        container.appendChild(this.canvas);
        // this.interval = setInterval(updateGameArea, 7);
    }
    /**
       * Clear the game canvas.
       * @method
       */
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};


export class Player {
    constructor(name, width, x, y, color, socketID, context) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.speed = 1;
        this.isRight = false;
        this.isLeft = false;
        this.isTop = false;
        this.isBottom = false;
        this.color = color;
        this.socket = socketID;
        this.width = width;
        this.context = context;
    }
    /**
     * Update the position and rerender the Player
     * @method
     */
    update() {
        ctx = this.context;
        ctx.font = "bold 15px Arial";
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.width);
        ctx.fillText(this.name, this.x, this.y - 7);
        if (this.isRight || this.isLeft || this.isBottom || this.isTop) {
            socket.emit("positionUpdate", [this.x, this.y, this.name]);
        }
    }


};











// class Game {
//     ObjElements = {};
//     constructor(ScreenWidth, ScreenHeight) {
//         this.ScreenHeight = ScreenHeight;
//         this.ScreenWidth = ScreenWidth;
//         this.myGameArea = {
//             canvas: document.createElement("canvas"),
//             start: function () {
//                 myGameArea.canvas.width = this.ScreenWidth;
//                 myGameArea.canvas.height = this.ScreenHeight;
//                 myGameArea.context = myGameArea.canvas.getContext("2d");
//                 document.getElementById("container").appendChild(myGameArea.canvas);
//                 myGameArea.interval = setInterval(updateGameArea, 7);
//             },
//             clear: function () {
//                 myGameArea.context.clearRect(0, 0, myGameArea.canvas.width, myGameArea.canvas.height);
//             },
//         };
//         this.CreateSquare = function Square(name, width, x, y, color, socketID) {
//             this.ObjElements[this.RandomID(4)] = {
//                 "name": name,
//                 "x": x,
//                 "y": y,
//                 "speed": 1,
//                 "isRight": false,
//                 "isLeft": false,
//                 "isTop": false,
//                 "isBottom": false,
//                 "color": color,
//                 "socket": socketID,
//                 "width": width,
//                 "update": function () {
//                     ctx = myGameArea.context;
//                     ctx.font = "bold 15px Arial";
//                     ctx.fillStyle = this.color;
//                     ctx.fillRect(this.x, this.y, this.width, this.width);
//                     ctx.fillText(this.name, this.x, this.y - 7);
//                     if (this.isRight || this.isLeft || this.isBottom || this.isTop) {
//                         socket.emit("positionUpdate", [this.x, this.y, this.name]);
//                     }
//                 },
//                 "newPos": function () {
//                     // if (this.x + this.width >= collision.x &&
//                     //     this.x <= collision.x + collision.h &&
//                     //     this.y + this.width >= collision.y &&
//                     //     this.y <= collision.y + collision.v
//                     // ) {
//                     //     collision.verify(this.x, this.y, this.width);
//                     // }

//                     if (this.isRight) {
//                         this.x += this.speed;
//                     }
//                     if (this.isLeft) {
//                         this.x -= this.speed;
//                     }
//                     if (this.isTop) {
//                         this.y += this.speed;
//                     }
//                     if (this.isBottom) {
//                         this.y -= this.speed;
//                     }
//                 }
//             }
//         };


//         // this.ObjectCollision = function ObjectCollision(x, y, horizontal, vertical) {
//         //     this.ObjElements[this.randomID(4)] = {
//         //         "x": x,
//         //         "y": y,
//         //         "h": horizontal,
//         //         "v": vertical,
//         //         "update": function () {
//         //             ctx = myGameArea.context;
//         //             ctx.fillStyle = "Green";
//         //             ctx.fillRect(this.x, this.y, this.h, this.v);
//         //         },


//         //         "verify": function (playerX, playerY, playerWidth) {

//         //             if (playerY + playerWidth <= this.y) {
//         //                 console.log("encima")
//         //                 for (const square in players) {
//         //                     if (players[square].socket === socket.id) {
//         //                         players[square].isTop = false;
//         //                     }
//         //                 }
//         //             } if (playerY >= this.y + this.v) {
//         //                 console.log("embaixo ")
//         //                 for (const square in players) {
//         //                     if (players[square].socket === socket.id) {
//         //                         players[square].isBottom = false;
//         //                     }
//         //                 }
//         //             }
//         //             if (playerX + playerWidth <= this.x) {
//         //                 console.log("esquerda")
//         //                 for (const square in players) {
//         //                     if (players[square].socket === socket.id) {
//         //                         players[square].isRight = false;
//         //                     }
//         //                 }
//         //             } if (playerX >= this.x + this.h) {
//         //                 console.log("direita")
//         //                 for (const square in players) {
//         //                     if (players[square].socket === socket.id) {
//         //                         players[square].isLeft = false;
//         //                     }
//         //                 }
//         //             }
//         //         }
//         //     }
//         // };

//     };
//     RandomID(length) {
//         let result = '';
//         const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//         const charactersLength = characters.length;
//         let counter = 0;
//         while (counter < length) {
//             result += characters.charAt(Math.floor(Math.random() * charactersLength));
//             counter += 1;
//         }
//         return result;
//     }
// };
