const express = require("express")
const server = express()
const routes = require("./routes")

server.set('view engine', 'ejs')

// Habilitar rotas dos arquivos statics
server.use(express.static("public"))

// usar o req.body
server.use(express.urlencoded({ extende: true }))

// Habilitar rotas
server.use(routes)

server.listen(3000, () => console.log('Online Server'))