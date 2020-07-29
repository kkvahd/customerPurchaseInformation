const express = require('express');
const csv = require('csvtojson');
var cors = require('cors');

const app = express();
app.use(cors());

app.get('/api/data', (req, res) => {
    res.header("Content-Type", 'application/json');
    const converter = csv()
        .fromFile('./customerdata.csv')
        .then(json => {
            res.send(JSON.stringify(json))
        })
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
