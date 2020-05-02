const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('./ws.db')

db.serialize(function () {

    //criar tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS ideas(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            title TEXT,
            category TEXT,
            description TEXT,
            link TEXT
        );
    `)


    //Inserir dados na tabela
    //const query = `
            //    INSERT INTO ideas (
          //          image,
            //        title,
             //       category,
             //       description,
             //       link
              //  ) VALUES (?,?,?,?,?)
           // `

   // const values = [
           // "https://image.flaticon.com/icons/svg/2729/2729038.svg",
            //"Pintura",
           // "Criatividade",
           // "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste facilis aspernatur minima quasi cumque perspiciatis amet iusto debitis",
           // "https://rocketseat.com.br"
   // ]   


    //db.run(query, values, function(err){
         //if (err) return console.log(err)

        //console.log(this)
    //})
   

    //Consultar dados na tabela
    //db.all("SELECT * FROM ideas", function(err, rows) {
    //    if (err) return console.log(err)

    //    console.log(rows)
   // })
        

    //Deletar um dado na tabela
    //db.run(`DELETE FROM ideas WHERE id =?`, [5], function(err) {
        //if (err) return console.log(err)

        //console.log("DELETEI", this)
    //})
})

module.exports = db