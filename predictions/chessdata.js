const router = require('express').Router();


const fakedata = [ { id : 1, name: 'Lenleagg' }, { id: 2, name: 'Pyrrhus' }] ;


router.get('/', (req, res) => {
    res.status(200).send('<h1>Server is ready. Send a username and password to register.</h1>') //.json(fakedata);
})


router.post('/', (req, res) => {
    const { username, password } = req.body;  /********  Does the server want to send it through req.params ??? */
    if( username && password )
        res.status(200).send('Received username and password. User not registered however');
    else                                       /******** Build a database to insert users in */
        res.status(401).send('Incomplete information entered. Please try again with username and password');
})


module.exports = router;