const express = require('express')
const app = express()
const port = 3000
var cors = require('cors')

var bodyParser = require('body-parser')


app.use(bodyParser.json())
app.use(cors())

var MongoClient = require('mongodb').MongoClient;

// Connect to the db


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/saveApartment', (req, res) => {
    let body = req.body;
    console.log('hello', body);
    // 2, 5, 4, 5
    let {
        apartmentName,
        totalBlocks,
        totalTowers,
        totalFloors,
        totalUnits
      } = body;
      let unitArray = []
      let unitObj = {
          unitId: '',
          blockId: '',
          towerId: '',
          floorId: ''
      }
    for (let b=0; b<totalBlocks; b++) {
        let blockId = `B${b}`
        for (let t=0; t<totalTowers; t++) {
            let towerId = `${blockId}T${t}`
            for (let f=0; f<totalFloors; f++) {
                let floorId = `${towerId}F${f}`
                for (let u=0; u<totalUnits; u++) {
                    let unitId = `${floorId}U${u}`
                    unitArray.push({unitId, towerId: `T${t}`, floorId: `F${f}`, blockId: `B${b}`});
                }
            }
        }
    }
    console.log('unit array', unitArray)
      
    res.json('hello')
    MongoClient.connect("mongodb+srv://test:test@cluster0.ln2bp.mongodb.net/admin?retryWrites=true&w=majority", function (err, db) {
   
     if(err) throw err;
     console.log('Mongodb connected..........')
     db.collection('apartment', function (err, collection) {
        
        collection.insert({ id: 1, firstName: 'Steve', lastName: 'Jobs' });
        // collection.insert({ id: 2, firstName: 'Bill', lastName: 'Gates' });
        // collection.insert({ id: 3, firstName: 'James', lastName: 'Bond' });
        
        

        db.collection('apartment').count(function (err, count) {
            if (err) throw err;
            
            console.log('Total Rows: ' + count);
        });
    });

     //Write databse Insert/Update/Query code here..
                
});
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})