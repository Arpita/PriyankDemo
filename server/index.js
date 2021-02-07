const express = require('express')
const app = express()
const port = 3000
var cors = require('cors')

var bodyParser = require('body-parser')

//Import the mongoose module
var mongoose = require('mongoose');

const { db, Unit } = require('./unitSchema');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/admin';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

//Get the default connection
// var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// console.log('dab===========', db)


app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/saveApartment', async (req, res) => {
    let body = req.body;
    // console.log('hello', body);
    // 2, 5, 4, 5
    let { apartmentName, totalBlocks, totalTowers, totalFloors, totalUnits } = body;

    for (let b = 1; b <= totalBlocks; b++) {
        let blockId = `B${b}`
        for (let t = 1; t <= totalTowers; t++) {
            let towerId = `${blockId}T${t}`
            for (let f = 1; f <= totalFloors; f++) {
                let floorId = `${towerId}F${f}`
                for (let u = 1; u <= totalUnits; u++) {
                    let unitId = `${floorId}U${u}`
                    let unit = new Unit({
                        unit_name: unitId,
                        tower_id: `T${t}`,
                        floor_id: `F${f}`,
                        block_id: `B${b}`,
                        apartmentName
                    })
                    let res = await unit.save();
                    // console.log('res ====', res);
                }
            }
        }
    }
    // console.log('unit array', unitArray)

    res.json('hello')

})

app.get('/getAllUnits', async (req, res) => {
    let all = await Unit.find({}).exec();
    res.json(all);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})