const http = require('http');
const express = require('express');
const app = express();

app.set('view engine', 'ejs')
// 1st argument: setting,2nd argument: value - folder name 'views'
app.set('views', 'views')
const hostname = '127.0.0.1'
const port = 5000   
const server = http.createServer(app)
const db= require('./db')

// linked to home.ejs
app.get('/', (req, res) => {
    res.render('home', {
        title: "JJ's Diner",
        special: "Free Bacon",
        user: {name: "Chris Houston"}
    })     
})