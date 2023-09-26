class Game {
    ObjElements = {};
    constructor(ScreenWidth, ScreenHeight) {
        this.ScreenHeight = ScreenHeight;
        this.ScreenWidth = ScreenWidth;
        this.myGameArea = {
            canvas: document.createElement("canvas"),
            start: function () {
                const WIDTH = 1000,
                    HEIGHT = 600;
                myGameArea.canvas.width = WIDTH;
                this.canvas.height = HEIGHT;
                this.context = this.canvas.getContext("2d");
                container.appendChild(this.canvas);
                this.interval = setInterval(updateGameArea, 7);
            },
            clear: function () {
                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            },
        };
        this.CreateSquare = function Square(name, width, x, y, color, socketID) {
            this.ObjElements = {
                "name": name,
                "x": x,
                "y": y,
                "speed": 1,
                "isRight": false,
                "isLeft": false,
                "isTop": false,
                "isBottom": false,
                "color": color,
                "socket": socketID,
                "width": width,
                "update": function () {

                }
            }
            this.update = function () {
                ctx = myGameArea.context;
                ctx.font = "bold 15px Arial";
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x, this.y, width, width);
                ctx.fillText(this.name, this.x, this.y - 7);
                if (this.isRight || this.isLeft || this.isBottom || this.isTop) {
                    socket.emit("positionUpdate", [this.x, this.y, this.name]);
                }
            };
            this.newPos = function () {
                if (this.x + this.width >= collision.x &&
                    this.x <= collision.x + collision.h &&
                    this.y + this.width >= collision.y &&
                    this.y <= collision.y + collision.v
                ) {
                    collision.verify(this.x, this.y, this.width);
                }


                if (this.isRight) {
                    this.x += this.speed;
                }
                if (this.isLeft) {
                    this.x -= this.speed;
                }
                if (this.isTop) {
                    this.y += this.speed;
                }
                if (this.isBottom) {
                    this.y -= this.speed;
                }
            };
        }
    }
}