
require('dotenv').config();

const express = require('express');
const knex = require('knex');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'What I would not do to see you again';
 

const knexConfig = require('../knexfile.js');
const auth = require('../authentication/auth.js');
const chessApi = require('../predictions/chessdata.js');


const db = knex(knexConfig.development);



const server = express();

server.use(express.json()); // allows us to read data from the body of the request
server.use(logger);
//server.use(guest);


server.use('/authorization', notFound ); // notFound() passed after auth, so that it only runs if auth does not run
server.use('/api', lock ,checkRole('registered user'), chessApi ,  notFound);



function notFound (req, res) {
    res.status(404).send('URL not found.');
}

function logger (req, res, next) {
    console.log(`Time: ${new Date().toISOString()}, request method: ${req.method} to ${req.url} from ${req.get('Origin')}`);
    next();
 }

function guest (req, res, next) {
    if (req.url === '/guest')
        next();
    else    
        res.send(`If you don't want to register you can sign in as guest`);
}



function lock (req, res, next) {
    const token = req.headers.authorization;
    console.log('token is', token)
    if ( token ) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if(err) 
                res.status(403).json({ message: 'Token is invalid'});
            else {
                req.decodedToken = decodedToken;
                next();
            }
        })
        
    } else {
        res.status(401).json({ message: 'no token provided'})
    }
}
function checkRole ( role ) {
    return function (req, res, next){
        if (req.decodedToken.role === role )
            next();
        else
            res.status(403).json({ message: `you need to be a ${role}`});
    };
}


server.post('/register', (req, res) => {
    const user = req.body;
    user.password = bcrypt.hashSync(user.password, 10);

    if( user.password && user.username) {
    db.insert(user)
      .into('users')
      .then(ids => {
        res.status(201).send(`Welcome, ${req.body.username}. You have successfully registered. Please Login to continue`);
      })
      .catch(err => {
        res.status(500).json({ error: err, message: 'Something went wrong while registering. Please try again later'});
      });
    } else
        res.status(400).send(`You must provide both a username and a password. Please try again.`);
});

server.get('/register',  async (req, res) => {
    try {
        const users =await db('users');
        res.status(200).send(users);

    } catch (err) {
        res.status(500).send('An Internal Error Occurred.')
    }
    
    console.log(db('users'));
})

server.post('/login', async (req, res) => {
    try{
        const {username, password} = req.body;
        if( username && password){
             const user = await db('users').where({username : username}).first(); 
             console.log('user is', user);
             if( user && bcrypt.compareSync(password, user.password) ){
                 console.log('passwords match');

                 const token = generateToken(user);

                 res.status(200).json({ message: 'username and password match', token });
             } else
                  res.status(401).json({ message: 'Invalid Credentials. Please try again.'});
        } else 
            res.status(400).json({ message: 'Please enter both a username and a password' });
    }
    catch (err){
        res.status(500).send(err);
    }
}) // end login

function generateToken ( user ) {
    const payload = {
                        subject: user.id,
                        username: user.username,
                        role: user.role,
                    }
    const options = {
                        expiresIn: '1h'
                    }
    return jwt.sign( payload, secret, options);
}

server.delete('/removeaccount', async (req, res) => {

    let {username, password} = req.body;
    console.log(username, password)      //where({ id: id })
    const response = await db('users').where({username : username }).first();  //.select('id')
    console.log('response is', response) 
    if(response && bcrypt.compareSync(password, response.password)){
        const count = await db('users').where({ id : response.id}).del();
        console.log('count is', count)
        if (count > 0)
            res.status(200).send('user deleted');
        else
            res.status(500).send('Could not delete user');
    } else
        res.status(404).send('no user matches the provided information');
})

server.put('/updatepassword', async (req, res) => {
    try {
        let {username, oldPassword, newPassword} = req.body;
        if(username && oldPassword && newPassword){
            const response = await db('users').where({username : username}).first();  //.select('id')
            console.log('response is', response)
            if(response && bcrypt.compareSync(oldPassword, response.password) ){
                newPassword = bcrypt.hashSync(newPassword, 10);
                 const count = await db('users').where({ id : response.id}).update({ password: newPassword });
                 console.log('count is', count)
                if (count > 0)
                     res.status(200).send('password updated');
                else
                    res.status(500).send('Could not update password. Please try again later.');
             } else
                res.status(404).send('no user matches the provided information');
        } else 
            res.status(400).send('Please provide all required fields');

    } catch (err) {
        res.status(500).send(err);
    }

})

  
server.get('/', (req, res) => {
    res.status(200).send('<h1>Hi Mom!</h1>');
})






module.exports = server;