const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//an app is a chain of middlewares; a funnel through which 
//all requests are sent
//each middleware piece can manipulate it in some way

app.use(bodyParser.json());


//Handles the initial CORS issue
app.use((req, res, next) => {
    //any domain that sends a request can access 
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS")
    next();
});

app.post("/api/posts", (req,res,next) => {
    const post = req.body;
    console.log(post);
    res.status(201).json({
        message: "roger, roger"
    }); //201 means everything is ok; a new resource was created
});

app.get('/api/posts', (req, res, next) => {
    const posts = [
        { id: 'djkl3', 
        title: 'first server side post', 
        content: 'from the server, yo'
        },
        { id: '654hfg', 
        title: 'second server side post', 
        content: 'getting tired from the server, pete!'
        },
    ];
    res.status(200).json({
        message: 'successful execution, head master',
        posts: posts
    })
    //200 means everything is ok
});


app.use('/api/jdawg', (req, res, next) => {
    res.json({
        title: 'hey ho jdawg!'
    })
});

module.exports = app;

