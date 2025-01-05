const connectToMongo = require('./db'); // Connecting to MongoDB (as per your earlier code)
const express = require('express');
var cors = require('cors')
connectToMongo();


const app = express();
const port = 5000;
app.use(express.json())
app.use(cors())

// Use the auth route
app.use('/api/auth', require('./routes/auth'));

app.use('/api/notes', require('./routes/notes'));

// Root route (optional, as I suggested earlier)
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
