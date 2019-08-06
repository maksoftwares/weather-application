const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials') 

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res)=>{
    res.render('index',{
        title : 'Weather',
        name : 'Muhammad Ali Khan'
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title : 'About Me',
        name : 'Muhammad Ali Khan'
    })
})

app.get('/help',(req, res)=>{
    res.render('help',{
        title : 'Help Page',
        message : "Looks like no one can help you, Why don't you help yourself !!",
        name : 'Muhammad Ali Khan'
    })
})

app.get('/weather',(req, res)=>{
    if(!req.query.address){
        res.send({
            error : 'Please provide an address'
        })
    } else {
        geoCode(req.query.address,(error, data)=>{
            if(error){
                res.send({
                    error : 'Please provide an address'
                })
            }
            forecast(data.latitude, data.longitude, (error, foreCastData) => {
                if(error){
                    res.send({
                        error : 'Please provide an address'
                    })
                }
                res.send({
                    location : data.location,
                    forecast : foreCastData
                })
              })
        })
    }
})

app.get('/products',(req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req, res)=>{
    res.render('error',{
        title : 'Help',
        message : 'Help page not found',
        name : 'Muhammad Ali Khan'
    })
})

app.get('*',(req, res)=>{
    res.render('error',{
        title : '404',
        message : '404 page not found',
        name : 'Muhammad Ali Khan'
    })
})

app.listen(3000,()=>{
    console.log('Up and Running')
})