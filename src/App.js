const express = require('express')
const path = require('path')
const hbs = require('hbs')
const request = require('request')
const app = express()

// paths
const dirName = path.join(__dirname,'../public')
const viewsDir = path.join(__dirname, '../template/views')
const partialsDir = path.join(__dirname,'../template/partials')


hbs.registerPartials(partialsDir)



// handle bars setup
app.set('view engine', 'hbs')
app.set('views', viewsDir)

// static  directory setup 
app.use(express.static(dirName))

app.get('', (req, res)=>{
    res.render('index', {
        name:'siva',
        title:'Siv Display', 
        path:'../public/img/siv.png'
    })
})

app.get('/help', (req,res)=>{
    res.render('help', {
        help:'help pageeee'
    })
})


app.get('/about', (req,res)=>{
    res.render('about', {
        name:'hsss'
    })
})

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


app.get('/weather', (req, res)=>{
    console.log(req.query)
    const url = `http://api.weatherstack.com/current?access_key=ac77bc4b3ad91fac1567d7add1f19e8c&query=${req.query.location}`
    request.get({url:url, json:true},(err,data)=>{
        if(err){
            res.send({
                err:'unable send request'
            })
        } else {
            res.send({
                ...data.body
            })
        }
    })
})

app.get('*', (req, res)=>{
    res.send('My 404')
})

app.listen(3000,()=>{
    console.log('up and running 3000')
}) 