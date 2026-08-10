const express = require("express");
const app = express();
const port = 3000;
const students = [
    { "id": "1","name":"Somchai","major":"sciencecomputer"},
    { "id": "2","name":"Max","major":"sciencecomputer"},
    { "id": "3","name":"Wave","major":"sciencecomputer"},
    { "id": "4","name":"jus","major":"sciencecomputer"}
];

app.get('/',(req,res)=>{
    res.send('Hello express');
})

app.get('/about',(req,res)=>{
    res.send('about');
})

app.get('/contact',(req,res)=>{
    res.send('contact');
})

app.get('/student/:id',(req,res)=>{
    const std = req.params.id;
    const student = students.find(e => e.id === std);
    res.json(student);
});

app.get('/product/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    res.send('Product id : 101');
})

app.get('/square', (req, res) => {
     const num = parseFloat(req.query.number);
     const result = num * num;
     res.json(Square = {result});
});

    app.get('/grade',(req,res)=>{
    const score = req.query.score;

    if (score >= 80) {grade = 'A';}
    else if (score >= 70) {grade = 'B';}
    else if (score >= 60) {grade = 'C';}
    else if (score >= 50) {grade = 'D';}
    else if (score <= 50) {grade = 'E';}
    res.json(grade);
})
app.listen(port, () =>{
    console.log("Server is Running....");
})