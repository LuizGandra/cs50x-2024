const Redis = require('ioredis');
require('dotenv').config();

const host = process.env.REDISHOST;
const port = process.env.REDISPORT;
const password = process.env.REDISPASSWORD;

const redisClient = new Redis({
    host,
    port,
    password
});

module.exports = {
    redisClient
}