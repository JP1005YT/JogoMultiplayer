const { Socket } = require("socket.io")
const { Pacotes } = require("../configs/Pacotes.js")
let P = new Pacotes()

const { Server } = require("../configs/Server.js")
let S = new Server()

S.start()

let app = S.app
const Sio = S.io
let LoggedPlayers = []

Sio.on("connection", (socket) => {
    socket.on("connected", async (token) => {
        let logged = await FetchLoggedPlayers(token);
        logged['socketID'] = socket.id
        LoggedPlayers.push(logged);
        Sio.emit("UpdatePlayers", LoggedPlayers);

    });
    socket.on("disconnect", async () => {
        LoggedPlayers.forEach((player, index) => {
            if (player.socketID === socket.id) {
                LoggedPlayers.splice(index, 1)
            }
        })
        Sio.emit("UpdatePlayers", LoggedPlayers); 
    })

})

async function FetchLoggedPlayers(token) {
    const data = await P.Buscar('./data/users.json')

    let Player

    data.forEach(user => {
        if (user.Token === token) {
            Player = user
        }
        return;
    })
    return Player;
}

app.get('/login', async (req, res) => {
    let dados = JSON.parse(req.headers.data)
    let data = P.Buscar("./data/users.json")
    data.forEach(element => {
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
    data.forEach(element => {
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
    data.forEach(element => {
        if (element.Token === dados.token) {
            res.send(element)
        }
    });
})