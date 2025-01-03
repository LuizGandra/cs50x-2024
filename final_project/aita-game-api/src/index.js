const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 27017;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions));

require('./app/controllers/index')(app);
require('./tasks/scheduler.js');

app.listen(port, '0.0.0.0', () => {
    console.log('Server started');
});