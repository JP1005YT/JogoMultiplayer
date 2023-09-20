class Pacotes{
    express = require("express")
    uid = require("uuid");
    fs = require("fs");
    cors = require("cors")
    bodyparser = require("body-parser")
    multer = require("multer")
    path = require("path")
    io = require("socket.io")
    // Presets

    Guardar(Local,Conteudo) {
        this.fs.writeFileSync(Local, JSON.stringify(Conteudo))
    }

    Buscar(Local){
        return JSON.parse(this.fs.readFileSync(Local))
    }

    Excluir(Local){
        this.fs.unlink(Local, (err) => {
            if (err) {
              console.error('Erro ao excluir o arquivo:', err);
              return;
            }
          
            console.log('Arquivo excluído com sucesso!');
          });
    }
    Log(Str){
        console.log(Str)
    }
}
module.exports = {
    Pacotes
}