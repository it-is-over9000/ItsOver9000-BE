
require('dotenv').config();

const express = require('express');
const knex = require('knex');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'What I would not do to see you again';
 

const knexConfig = require('./knexfile.js');
const auth = require('./authentication/auth.js');
const chessApi = require('./predictions/chessdata.js');


const db = knex(knexConfig.development);



const server = express();

server.use(express.json()); // allows us to read data from the body of the request
server.use(logger);
//server.use(guest);


server.use('/authorization', auth, notFound ); // notFound() passed after auth, so that it only runs if auth does not run
server.use('/games', chessApi, notFound)


server.post('/register', (req, res) => {
    const user = req.body;
    user.password = bcrypt.hashSync(user.password, 10);

  
    db.insert(user)
      .into('users')
      .then(ids => {
        res.status(201).send(`welcome, ${req.body.username}. You have successfully registered. Please Login to continue`);
      })
      .catch(err => {
        res.status(500).json(err);
      });
});

server.post('/login', async (req, res) => {
    try{
        const {username, password} = req.body;
        const user = await db('users').where({username : username}).first(); 
        console.log('user is', user);
        if( bcrypt.compareSync(password, user.password))
            console.log('passwords match');
        if(username && password){
            res.status(200).send('username and password received');
         }
         else
             res.status(400).send('Please provide both a username and password');
     
         // find the user in the database by it's username then
        //  if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
        //      return res.status(401).json({ error: 'Incorrect credentials' });
        // }
    }
    catch (err){
        res.status(500).send(err);
    }

// the user is valid, continue on

   // res.status(200).send('nothing was actually done');

})

function generateToken ( user ) {
    const payload = {
                        subject: user.id,
                        username: user.username,
                    }
    const options = {
                        expiresIn: '2h'
                    }
    return jwt.sign( payload, secret, options);
}

server.delete('/removeaccount', async (req, res) => {

    // knex('users').where({
    //     first_name: 'Test',
    //     last_name:  'User'
    //   }).select('id')

    const {username, password} = req.body;
    console.log(username)      //where({ id: id })
    const response = await db('users').where({username : username, password: password}).first();  //.select('id')
    if(response){
        const count = await db('users').where({ id : response.id}).del();
        console.log('count is', count)
        if (count > 0)
            res.status(200).send('user deleted');
        else
            res.status(500).send('Could not delete user');
    } else
        res.status(404).send('no user matches the provided information');


    console.log(response)
    
})

server.put('/updatepassword', async (req, res) => {
    try {
        const {username, oldPassword, newPassword} = req.body;
        if(username && oldPassword && newPassword){
            const response = await db('users').where({username : username, password: oldPassword}).first();  //.select('id')
            if(response){
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


    console.log(response)
})

  
server.get('/', (req, res) => {
    res.status(200).send('<h1>Hi Mom!</h1>');
})


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


// server.use(err);


// function err (req, res, next) {
//     res
//     .status(500)
//     .json({ message: 'There was an error performing the required operation' });
// }

function errorMessages(req, res, next, errorCode) {
    if(errorCode === 404)
        res.status(404).send('Does not exist');
    else if(errorCode === 500)
        res.status(500).send('Internal Server Error');

    
    console.log('yup', errorCode);
}

const port = process.env.PORT || 5000;
server.listen( port, () => console.log(`server running on port ${port}`));