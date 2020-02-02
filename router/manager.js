const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secret = "gurehtfsdjfoiefjiefjewidfjceoidfne";
require('../dataBasa/dataBase')
const userModel = require('../model/managers');

router.get('/', (req, res) => {
    res.sendfile('./index.html');
})

router.get('/login', (req, res) => {
    res.sendfile('./login.html');
})
router.post('/login'/*, isAuthenticated */, async (req, res) => {
    var userName = await userModel.findOne({ email: req.body.email })
    if (!userName) {

        res.json({ status: "error", text: 'Your email no exist' })
    } else {
        const value = await bcrypt.compare(req.body.password, userName.password)
        if (value) {
            var token = jwt.sign({ username: userName.name }, secret)
            res.json({ status: 'Ok', name: userName.name, lName: userName.lName , token : token})
        } else
            res.json({ status: "error", text: 'Your code no work' });

    }
})
function myFunc(req, res, next) {
    console.log('hi');
    next();
}

function isAuthenticated(req, res, next) {
    if (typeof req.headers.authorization !== "undefined") {
        let token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, secret, (err, user) => {
            if (err) {
                res.status(500).json({ error: "Not Authorized" });
                throw new Error("Not Authorized");
            }
            return next();
        });
    } else {
        res.status(500).json({ error: "Not Authorized" });
        throw new Error("Not Authorized");
    }
}

router.get('/register', (req, res) => {
    res.sendfile('./register.html');
})

router.post('/register', async (req, res) => {
    var dataReg = null;
    req.read('./register.html', (err, data) => {
        if (err)
            console.log(err)
        else {
            console.log(data);
            dataReg = data;
        }
    });
    var hash = bcrypt.hashSync(req.body.password, 10)
    await new userModel({
        name: req.body.name,
        password: hash,
        lName: req.body.lName,
        email: req.body.email,
        tz: req.body.tz,
        nameSocity: req.body.nameSocity,
        tel: req.body.tel
    }).save();
    res.send('success')
})

router.get('/logout', (req, res) => {
    localStorage.removeItem('manager');
    res.send('delete');
})

module.exports = router; 