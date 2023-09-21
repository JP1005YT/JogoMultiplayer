const { Socket } = require("socket.io")
const { Pacotes } = require("../configs/Pacotes.js")
let P = new Pacotes()

const { Server } = require("../configs/Server.js")
let S = new Server()

S.start()

let app = S.app
let isLoged = {}
let playersObj = [{}]

S.io.on('connection', (socket) => {

    socket.on('data', async (player) => {
        let Exists
        for (const chave in isLoged) {
            if (isLoged.hasOwnProperty(chave)) {
                if (isLoged[chave] === player) {
                    Exists = true
                }
            }
        }
        if (!Exists) {
            isLoged[`${socket.id}`] = player

        }
        playersObj = await AdquirePlayerLogStats()
        S.io.emit("loadPlayers", playersObj)
    });

    socket.on("positionUpdate", async (data) => {
        playersObj.forEach(player => {
            if (player.name === data[2]) {
                player.posX = data[0];
                player.posY = data[1];
            }
        })
        S.io.emit("updatePlayers", playersObj);
    })

    socket.on('disconnect', async () => {
        delete isLoged[socket.id]
        playersObj = await AdquirePlayerLogStats()
        S.io.emit("updatePlayers", playersObj)
    })
});

async function AdquirePlayerLogStats() {
    let data = P.Buscar('./data/users.json')
    let nameslogged = []
    let dataofFinal = []

    for (const chave in isLoged) {
        if (isLoged.hasOwnProperty(chave)) {
            nameslogged.push(isLoged[chave])
        }
    }


    nameslogged.forEach(nome => {
        data.users.forEach(usuario => {
            if (usuario.name === nome) {
                dataofFinal.push(usuario)
            }
        })
    })

    return dataofFinal
}

app.get('/login', async (req, res) => {
    let dados = JSON.parse(req.headers.data)
    let data = P.Buscar("./data/users.json")
    data.users.forEach(element => {
        if (element.name === dados.user) {
            element.Token = P.uid.v4()
            res.send(element)
            P.Guardar('./data/users.json', data)
        }
    });
})
app.get('/play', async (req, res) => {
    let data = P.Buscar("./data/users.json")
    let caminho
    data.users.forEach(element => {
        if (element.Token === req.query.token) {
            caminho = P.path.join(__dirname, '../', 'pages', 'game', 'index.html')
        }
    })
    if (caminho) {
        res.sendFile(caminho)
    } else {
        res.send('broxo')
    }
})
app.get('/user', async (req, res) => {
    let dados = JSON.parse(req.headers.data)
    let data = P.Buscar("./data/users.json")
    data.users.forEach(element => {
        if (element.Token === dados.token) {
            res.send(element)
        }
    });
})