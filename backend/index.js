const connectToMongo = require('./db');
const express = require('express');

const app = express()
const port = 5000

connectToMongo();

app.use(express.json());

//Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`iNotebook app listening on port ${port}`)
})