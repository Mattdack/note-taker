const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 }  = require('uuid');
const PORT = process.env.PORT || 3000;

app.use(express.static("public"))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"./views/notes.html"))
});

app.get('/api/notes', (req,res)=>{
    // res.json(path.join(__dirname,'./db/db.json'))
    fs.readFile("./db/db.json","utf-8",(err,data)=>{
        if(err){
            console.log(err);
            res.status(500).json({
                msg:"oh no!",
                err:err
            })
        } else {
            const dataArr = JSON.parse(data);
            res.json(dataArr);
        }
    })
});

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,"./views/index.html"))
});

app.listen(PORT,()=>{
    console.log(`listenin on port ${PORT}`)
});