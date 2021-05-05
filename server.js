/**
 * Status codes used in all APIs are standart http status codes.
 * 
 * Response structure -> 
 * {
 *  responseCode : '00',
 *  responseMessage : 'successful',
 *  data : {} (optional)
 * }
 * 
 * Response codes used in APIs are
 * '00' -> successful
 * '01' -> user created
 * '02' -> user does not exist
 * '03' -> wrong password
 * '04' -> user updated
 * '05' -> user already exist
 * '06' -> user name cannot be empty
 * '07' -> email cannot be empty
 * '08' -> password cannot be empty
 * '09' -> id cannot be empty
 * '10' -> image cannot be empty
 * '11' -> api server down
 */
const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const register = require('./controller/register');
const signin = require('./controller/signin');
const profile = require('./controller/profile');
const use = require('./controller/use');
const allusers = require('./controller/allusers');
const pgDatabase = require('./database/postgresdatabase');

const app = express();

app.use(cors());
app.use(express.json());

app.put('/', (req, res) => res.send('Face detector server is up and running!'))

app.post('/register', (req, res) => register.handleRegistration(req, res, pgDatabase, bcrypt));

app.post('/signin', (req, res) => signin.handleSigningIn(req, res, pgDatabase, bcrypt));

app.get('/profile/:email', (req, res) => profile.handleProfile(req, res, pgDatabase));

app.put('/use', (req, res) => use.handleUsage(req, res, pgDatabase));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`app is running on port ${PORT}`));