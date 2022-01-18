var express = require("express");
const app = express();
const path = require('path');

app.get('/*', function(req, res) {
    //console.log(req.url)
    res.sendFile(path.join(__dirname + req.url));
});

let port = 80;
app.listen(port, () => console.info(`App listen on port ${port}`));