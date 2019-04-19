const router = require('express').Router();



router.post('/games', (req, res) => {
    
    let randomNum = Math.floor(Math.random()*100);
    console.log('in api/games', randomNum)
    res.status(200).json( {number: randomNum}); //.json(fakedata);
})


router.post('/', (req, res) => {
    const { username, password } = req.body;  /********  Does the server want to send it through req.params ??? */
    if( username && password )
        res.status(200).send('Received username and password. User not registered however');
    else                                       /******** Build a database to insert users in */
        res.status(401).send('Incomplete information entered. Please try again with username and password');
})


module.exports = router;