const express = require('express');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');

const app = express();
const port = 5007;

//Serving Static files from the public folder
app.use(express.static('public'));


// Setting templating engines 
app.set ('view engine' ,'ejs');

//Setting your body parser 
const urlencodedParser = bodyParser.urlencoded({ extended: false });

//Routes
app.get('', (req,res) => {
    res.render('index')
});

app.get('/register', (req,res) => {
    res.render('register')
})

app.post('/register', urlencodedParser, [
    check('username', 'This username must be above 4 characters')
            .exists()
            .isLength({min: 4}),
    check('email', 'Email is not valid')
            .isEmail()
            .normalizeEmail()

], (req,res) => {
    //console.log(req.body) 
    // post output to terminal 
    // console.log(req.body);

    const errors = validationResult(req) 

    if (!errors.isEmpty()) {
        // return res.status(422).jsonp(errors.array())
        const alert = errors.array()
        res.render('register', {
            alert
        })
    }
})


app.listen(port, () => console.info('App is lstening on port: ${port}'))