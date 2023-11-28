console.log("Hello from the server!");

const express = require('express')
const mongoose = require('mongoose')
const MongoClient = require('mongodb').MongoClient;
const path = require('path');

const app = express()
const port = 3000

// Serve static files from the "html" directory
app.use('/app', express.static(path.join(__dirname, 'app/html')));
console.log(path.join(__dirname, 'app/html'));
// Serve static files from the "js" directory
app.use('/app/js', express.static(path.join(__dirname, 'app/js')));
app.use('/app/css', express.static(path.join(__dirname, 'app/css')));

app.get('/', (req, res) => {
    res.send('Hello from Mongo Schedulator!')
})
mongoose.connect('mongodb://localhost:27017/Fall2024', {

}).then(() => {
    app.listen(port, () => {
        console.log(`Schedulator Mongo listening on port ${port}`)
    })
    console.log('Connected to MongoDB')
}).catch(err => {
    console.log(err)
})

app.get('/faculty', async(req, res) => {
    const url = 'mongodb://localhost:27017'; // replace with your MongoDB connection string
    const client = new MongoClient(url);

    try {
        await client.connect();
        const db = client.db('Fall2024');
        console.log(`Connected successfully to the ${db.databaseName} database`);

        const collection = db.collection('CORFaculty');
        const documents = await collection.find().toArray();

        res.json(documents);
        //console.log(documents);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error connecting to database');
    } finally {
        await client.close();
    }
});

app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.get('/faculty.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'app/html/faculty.html'));
})

app.get('/courses', (req, res) => {
    res.send('Hello from courses!')
})

app.get('/survey', (req, res) => {
    res.send('Hello from survey!')
})