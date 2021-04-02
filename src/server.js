const express = require("express")
const server = express()
const routes = require("./routes")

const path = require("path")

// Utilizando template engine
server.set('view engine', 'ejs')

// Mudas a localização da pasta views (Juntando com __dirname)
server.set('views', path.join(__dirname, 'views'))

// Habilitar rotas dos arquivos statics
server.use(express.static("public"))

// usar o req.body
server.use(express.urlencoded({ extende: true }))

// Habilitar rotas
server.use(routes)

server.listen(3000, () => console.log('Online Server'))