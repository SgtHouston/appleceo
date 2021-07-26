const http = require('http');
const express = require('express');
const app = express();

app.set('view engine', 'ejs')
// 1st argument: setting,2nd argument: value - folder name 'views'
app.set('views', 'views')
const hostname = '127.0.0.1'
const port = 3000   
let id = 9;

// Middleware
app.use(express.static('./public'))
app.use(express.json('./public'))
app.use(express.urlencoded({ extended: false}))


const server = http.createServer(app)
const db = require('./model/db')



// linked to home.ejs
app.get('/', (req, res) => {
    res.render('home', {
        title: "Apple CEOs"
    })     
})

// Adding new page for form to add new CEO
// 1. Add Route handler
// 2. Add a template 'new'
app.get('/new', (req, res) => {
    // 3. Render the template 
    res.render('new', {
        title: "New CEO Form"
    })     
})

// Receiving information from user 
app.post('/new', (req, res) => {
    console.log('test string');
    const newCeo = {
        id: id + 1,
        slug: req.body.ceo_name.toLowerCase().split(' ').join('_'),
        name: req.body.ceo_name,
        year: req.body.ceo_year,
    }
    db.push(newCeo)
    console.log('New CEO Received', newCeo)
    res.redirect('/ceos')
})



app.get('/ceos', (req, res) => {
    // render the template
    res.render('ceo-list', {
        ceos: db
    })   
})

app.get('/ceos/:slug', (req, res) => {
    // get data from db.ceo
    const selectedCEO = db.find((ceo) => {
        return ceo.slug === req.params.slug
    })
    // render the template
    res.render('ceo-details',{
        ceo: selectedCEO
    })
})

server.listen(port, hostname, () => {
    console.log(`server running at http://${hostname}:${port}/`);
})