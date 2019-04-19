
const server = require('./server/server.js');



function errorMessages(req, res, next, errorCode) {
    if(errorCode === 404)
        res.status(404).send('Does not exist');
    else if(errorCode === 500)
        res.status(500).send('Internal Server Error');
}













const port = process.env.PORT || 5000;
server.listen( port, () => console.log(`server running on port ${port}`));