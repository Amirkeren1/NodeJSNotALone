const express = require('express');
const app = express();
const mysql = require('mysql')
const cors = require('cors')


app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'NotAlone'
})

db.connect((err) => {
    if (err) {
        throw err
    }
    console.log("connected to sql")
})


app.get("/home", async (req, res) => {
    try {
        let b = await Query(`SELECT * from home`)
        res.json(b)
    } catch (err) {
        res.sendStatus(500)
        throw err
    }
})


app.get("/home/:city", async (req, res) => {
    try {
        let q = (`SELECT * from home where City=?`)
        let b = await Query(q, req.params.city)
        res.json(b)
        console.log(req.params.city)
    } catch (err) {
        res.sendStatus(500)
        throw err
    }
})



app.listen(1000, console.log("rockin1000"))

let Query = (q, ...p) => {
    return new Promise((resolve, rej) => {
        db.query(q, p, (err, result) => {
            if (err) {
                rej(err)
                console.log(err)
            } else {
                resolve(result)
            }
        })
    })
}
