const express= require('express');
const bodyParser=require('body-parser');
const cors = require('cors');
const fetch = require("node-fetch");
const knex = require('knex');
const bcrypt = require('bcrypt');


const app= express();
app.use(bodyParser.json());
app.use(cors());

const db= knex({
  client: 'pg',
  connection: {
    host : process.env.DB_HOST || '127.0.0.1',
    user : process.env.DB_USER || '',
    password : process.env.DB_PASSWORD || '',
    database : process.env.DB_NAME || 'movie'
  }
});


// SIGN IN
app.put('/api/signin', (req,res)=>{
    const {email, password}= req.body;
    db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data=>{
        if (data.length != 1) {
            res.status(400).json('incorrect password or email')}
        else {
            const isValid=bcrypt.compareSync(password, data[0].hash);
            if(isValid){
                return db.select('*').from('users')
                    .where('email', '=', email)
                    .then(user=> {
                        res.json(user[0])
                    })
                    .catch(err=> res.status(400).json('unable to get user'))
            }else{
                res.status(400).json('wrong datails')
            }
        }
    })
})


// SIGN UP
app.post('/api/signin', (req,res)=>{
    const {email, name, password}= req.body;
    if (!email || !name || !password){
        return res.status(400).json('incorrect register');
    }
    const hash= bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    db.transaction(trx=> {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail=>{
            return trx('users')
                .returning('*')
                .insert({
                    name:name,
                    email:loginEmail[0],
                    joined: new Date()
                })
                .then(user=>{
                    res.json(user[0])})
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
        .catch(err=> res.status(400).json('fetch issue with registration'))
});

// movie API

const API_KEY= process.env.MOVIE_API_KEY;

// movie fetch for genres

app.post('/api/genre', (req,res)=>{
    const {id, page}= req.body;
    const baseURL = 'https://api.themoviedb.org/3/';
    let url = ''.concat(baseURL, 'discover/movie?api_key=', API_KEY, '&with_genres=', id, '&page=', page);
            fetch(url)
            .then(result=>result.json())
            .then(result => res.status(200).json(result))
            .then(data=>console.log(data))
            .catch(err=> res.status(400).json('fetch movie issue'))            
})

// movie fetch for random movie
 
app.post('/api/joker', (req,res)=>{
    const {id}= req.body;
    const baseURL = 'https://api.themoviedb.org/3/';
    let url = ''.concat(baseURL, 'movie/', id,'?api_key=', API_KEY);
            fetch(url)
            .then(result=>result.json())
            .then(result => res.status(200).json(result))
            .then(data=>console.log(data))
            .catch(err=> res.status(400).json('fetch movie issue'))            
})

// movie favorites put method
app.put('/api/like', (req,res)=>{
    const {id, movie_id }= req.body;
    db.select('id')
        .from('favorite')
        .where('id', '=', id)
        .where('movie_id', '=', movie_id)
        .then(db_res => {
            if (db_res.length == 0) {
                db('favorite').insert({
                        id:id,
                        movie_id: movie_id
                    })
                    .then(result => res.status(200).json('movie added'))
                    .catch(err=> res.status(400).json('fetch movie issue 1'))           
            } else {
                res.status(200).json('movie already there')
                res.catch(err=> res.status(400).json('fetch movie issue 2'))
            }
        })
})

// movie get favorites

app.get('/api/like/:id', (req, res)=>
    { const {id}= req.params;
    db.select('movie_id')
        .from('favorite')
        .where('id', '=', id)
    .then(user=>res.status(200).json(user))
    .catch(err=> {
        console.log(err)
        res.status(400).json('error getting user')
    })}
 )

const port = process.env.PORT || 3005
app.listen(port, ()=> {
    console.log(`app is running on port ${port}`)
}) 