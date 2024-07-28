const express = require("express")
const routes = require("./routes/routes")

const server = express()
const PORT = 3000

server.use(express.json()) // middleware para interpretar requisições json
server.use(express.urlencoded({ extended: true })) // middleware para interpretar dados da url
server.use(routes)


server.listen(PORT, () => {
    console.log("Servidor executando na porta " + PORT)
})
