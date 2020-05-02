const express = require("express")
const server = express()

const db = require("./db")


//configurar arquivos estáticos (css, js, img)
server.use(express.static("public"))

//habilitar uso do req.body
server.use(express.urlencoded({ extended: true}))


//configuração do nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true,
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//GET  /index
server.get("/", function (req, res) {

    db.all("SELECT * FROM ideas", function (err, rows) {
        if (err){
            console.log(err)
            return res.send("Erro no banco de dados!")
        }

        const reversdIdeas = [...rows].reverse()

        let lastIdeas = []
        for (let idea of reversdIdeas) {
            if (lastIdeas.length < 2) {
                lastIdeas.push(idea)
            }
        }

        return res.render("index.html", { ideas: lastIdeas })
    })
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//GET  /ideias
server.get("/ideias", function (req, res) {
    db.all("SELECT * FROM ideas", function (err, rows) {
        if (err){
            console.log(err)
            return res.send("Erro no banco de dados!")
        }

        const reversdIdeas = [...rows].reverse()

        return res.render("ideias.html", { ideas: reversdIdeas })
    })    
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//GET  /?  - delete
server.get("/:id", function (req, res) {
    const  id  = req.params.id

    db.run("DELETE FROM ideas WHERE id =?",[id], function(err) {
        if (err){
             console.log(err)
             console.log("erro")
             return res.send("Erro no banco de dados!")
         }
         console.log(id)
         return res.redirect("/")
    })

})

//GET  /ideias/?  - delete
server.get("/ideias/:id", function (req, res) {
    const  id  = req.params.id

    db.run("DELETE FROM ideas WHERE id =?",[id], function(err) {
        if (err){
             console.log(err)
             console.log("erro")
             return res.send("Erro no banco de dados!")
         }
         console.log(id)
         return res.redirect("/ideias")
    })

})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//POST  /modal
server.post("/", function (req, res) {
//Inserir dados na tabela
    const query = `
                INSERT INTO ideas (
                    image,
                    title,
                    category,
                    description,
                    link
                ) VALUES (?,?,?,?,?)
            `

    const values = [
                req.body.image,
                req.body.title,
                req.body.category,
                req.body.description,
                req.body.link,
    ]   


    db.run(query, values, function(err){
        if (err){
            console.log(err)
            return res.send("Erro no banco de dados!")
        }

        return res.redirect("/ideias")
    })

})

server.listen(3000)