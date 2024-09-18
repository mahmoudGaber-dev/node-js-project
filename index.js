const { name } = require("ejs");
const mongoose = require("mongoose");
const express = require("express");

const app = express(); //creat web server 

const Article = require("./models/Article");

mongoose.connect("mongodb+srv://mahmoudelgamal1678:CaKND8PATDSZj5m8@mahmoudgaber.ukgey.mongodb.net/?retryWrites=true&w=majority&appName=mahmoudGaber")  //to connect to db
//mongodb+srv://mahmoudelgamal1678:<db_password>@mahmoudgaber.ukgey.mongodb.net/?retryWrites=true&w=majority&appName=mahmoudGaber
.then(()=> {
    console.log("connected succesfully");

}).catch((error)=> {
    console.log("error with connecting with the DB" , error);
});


app.use(express.json()); //call function jason



app.get("/hello", (req,res) => {    //if there is get request function (request , response) (pass:/hello)
    res.send("hello");
}); 


app.get("/", (req,res) => {    
    res.send("hello in node js project");
}); 

app.get("/numbers", (req,res) => { 
    let numbers = ""
    for(let i = 0 ; i <= 100 ; i++){
        numbers += i + " - " ;
    }
    //res.send(`the numbers are:  ${numbers}`);
    //res.send(__dirname + "/views/numbers.html");
    //res.sendFile(__dirname + "/views/numbers.html"); //html file
    res.render("numbers.ejs" , {
        name: "yarob",
        numbers: numbers,
    }); //templatw engine ejs
}); 

app.get("/findSummation/:number1/:number2", (req,res) => {    //  /:number1/number2 'path prameter'
    const num1 = req.params.number1;
    const num2 = req.params.number2;

    const total = Number(num1) + Number(num2) ;

    res.send(`the total is : ${total} `);
}); 

app.get("/sayHello", (req,res) => {    //body prameter

    //console.log(req.body);

    //console.log(req.query);

    //res.send(`Hello ${req.body.name}, Age is : ${req.query.age}`);
    res.json({
        name: req.body.name,
        age: req.query.age,
        language: "Arabic",
    });
}); 

app.put("/test", (req,res) => {    
    res.send("you visited test");
}); 

app.post("/addComment", (req,res) => {    
    res.send("post request on add comment");
}); 


app.delete("/testingDelete", (req,res) => {    
    res.send(" delete request");
}); 

//========Articles endPoints ============
app.post("/articles", async (req,res)=> {
    const newArticle = new Article();

    const artTitle = req.body.articleTitle ;
    const artBody = req.body.articleBody ;
/*
    res.send(artTitle + " " + artBody);
    return;
*/
    newArticle.title = artTitle;
    newArticle.body =  artBody;
    newArticle.numberOfLikes = 0;

    await newArticle.save();

    //res.send("the new article has been stored");
    res.json(newArticle);
});
//===========end ==========


//=====read article =========
app.get("/articles", async (req, res) => {
    const articles = await Article.find() ;
    console.log("the articles are", articles);
    res.json(articles);
});
//===========end ==========

//=====read get spesific article =========
app.get("/articles/:articleId", async (req, res) => {
    const id = req.params.articleId ;
    try{  
        const article = await Article.findById(id);
        res.json(article);
        }catch(error){
            console.log("error while reading article of id" , id)
            return res.send("error");
        }
    //res.json(article);
});
//===========end ==========

//=====delete  spesific article =========
app.delete("/articles/:articleId", async (req, res) => {
    const id = req.params.articleId ;
    try{  
        const article = await Article.findByIdAndDelete(id);
        res.json(article);
        }catch(error){
            console.log("error while deleting article of id" , id)
            return res.json(error);
        }
    //res.json(article);
});
//===========end ==========


//=======html page back end without using api ============
app.get("/showArticles" , async (req,res) => {
    const articles = await Article.find();

    res.render("articles.ejs", { //render understand that there is folder named views
        allArticles: articles 
    }); 
})


app.listen(3000, () => {  //listen (port , function ) to run server
    console.log("i am listening in port 3000");
});
//npm install express 'to grt express library'
//node index.js 'run server from terminal'
//localhost:3000/hello 'to open serverv in google'
//npm install nodemon 'to get nodemon library'
//npx nodemon index.js 'library listen automaticaly' to use external
//npm install ejs 'to get ejs package template engine'
//npm install mongoose 'to get mongoose library to connect to dataBase mongodb'