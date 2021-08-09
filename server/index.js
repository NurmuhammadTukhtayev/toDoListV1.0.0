const PORT=3001
const mysql=require('mysql')
const express=require('express')
const cors=require('cors')
const app=express()

app.use(cors())
app.use(express.json())

const connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"nur&asal",
    database:"todolist"
})

app.get('/lists', (req,res)=>{
    connection.query("SELECT * FROM todolist.todo", (err, result)=>{
        if(err)
            console.log("GET ERROR", err)
        else{
            // console.log("SUCCESS")
            res.send(result)
        }
    })
})

app.post('/add', (req,res)=>{
    const plans=req.body.plans

    connection.query('INSERT INTO todo (plans)  VALUE (?)', plans, (err, result)=>{
        if(err)
             console.log("ERROR DATABASE", err)
        else
            res.send("VALUES INSERTED")
    })
})

app.put('/done/:id', (req, res)=>{
    const id=req.params.id
    connection.query('UPDATE todo SET  isDone= TRUE WHERE id = ?', [id], (err, result)=>{
        if(err)
            console.log("Update error", err)
        else
            res.send(result)
    })

})

app.delete('/delete/:id', (req, res)=>{
    const id=req.params.id
    connection.query('DELETE FROM todo WHERE id=?', id, (err, result)=>{
        if(err){
            console.log("DELETE ERROR", err)
        }

        else{
            res.send(result)
        }
    })
})

app.listen(PORT, ()=>{
    console.log(`Server has started at http://localhost:${PORT}`)
})