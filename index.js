const express = require('express')
const app = express();
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(cors());
app.use(express.json());

console.log(process.env.DB_USER)
console.log(process.env.DB_PASS)


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@clustersheauly.6uz8dzi.mongodb.net/?retryWrites=true&w=majority&appName=ClusterSheauly1`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        
        const roommateCollection = client.db('roommateDB').collection('roommate')

        app.get('/roommate', async (req, res) => {
            // const cursor = coffeesCollection.find();
            // const result = await cursor.toArray();
            const result = await roommateCollection.find().toArray()
            res.send(result);
        })
        
        

        app.post('/roommate', async (req, res) => {
            const newRoommate = req.body;
            console.log(newRoommate)
            const result = await roommateCollection.insertOne(newRoommate);
            res.send(result);
        })

        await client.db("admin").command({ ping: 1 });
        console.log(" Connected to MongoDB!");
    } catch (err) {
        console.error(err);
    }
}
run();
    


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
