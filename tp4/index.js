const express = require('express')
const bodyParser = require('body-parser');
const app = express()
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
    extended: true
}));
const knex = require('knex')({
    client: 'pg',
    version: '7.2',
    connection: {
        host : '127.0.0.1',
        port : 5432,
        user : 'postgres',
        password : '1403',
        database : 'Daoudax'
    }
});
const port = 3000

function getCity(res, name) {
    knex('city').where('name', name)
    .then(knexres => {
        res.send(knexres)
    });
}
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/city', (req, res) => {
    knex('city').insert(req.body).then(result => {
        console.log(result);
    });
    res.send('create')
})

app.get('/city/:city', (req, res) => {
    getCity(res, req.params.city);
})

app.put('/city/:city', (req, res) => {
    knex('city')
    .update({ population: req.body.population })
    .where('name', '=', req.params.city)
    .then(knexres => {
        if (!knexres) res.send('Error')
        getCity(res, req.params.city);
    });
})

app.delete('/city/:city', (req, res) => {
    knex('city').where('name', req.params.city).del()
    .then(knexres => {
        res.send({result:knexres});
    });
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})