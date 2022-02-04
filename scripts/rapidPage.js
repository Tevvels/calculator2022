// var http = require('http');
// http.createServer(function(req,res){
//     res.writeHead(200,{'Content-Type':'text/html'});
//     res.end('hello world');

// const { off } = require("process");

// const e = require("express");

// }).listen(8080);
// var mongo = require("mongodb");
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";

// MongoClient.connect(url,function(err, db){
//     if(err) throw err;
    
//     var dbo = db.db("mydb");
//     var myobj = {name: "Company Inc", address:"Highway 37"};
//     dbo.collection("customers").findOne(myobj,function(err,res){
//         if(err) throw err;
//         console.log(res.name);
//         db.close();

//     })

// })


// const express = require('express');
// const app = express();
// const port = 3000;
// const path = require("path");
// const recordRoutes = express.Router();


// recordRoutes.route("/listings").get(async function(req,res){
//     const dbConnect = dbo.getDb();

//     dbConnect.collection("listingsandreviews").find({}).limit(50).toArray(function(err,result){
//         if(err){
//             res.status(400).send("Error fetching listings");
//         } else {
//             res.json(result);
//         }
//     });


// });
// app.get('/', (req,res)=>{
//     res.sendFile(path.resolve("../index.html"));
// })
// app.listen(port,()=>{
//     console.log(`Example app listening on port ${port}`);
// })

/*


 the functions I need for a task app+
 
 program
 login,create account

 user read,addtolist,createlist,deletelist
 name,login,readlist, differentlists with % on how much is complete. 

 
 task  create,delete,update.
 taskname,datemade,datecreated




 when the user opens the program they are prompted to login 
 or create account. 

 after they are in, they can see a list of their tasks.
 one task will be displayed, the rest are in a list the user can click on. 

 the user can also add a new task, delete a task,

 the user can also create new lists to display different kinds of tasks. 


needs database, frontend display. 

maybe using react trying to use just vanilla js?




*/


const box = document.querySelector('.box');
const roadblock = document.querySelector('.roadblock');
a = 0;
b = 0;


box.addEventListener("keydown",(e)=>{

    if(e.keyCode == 39){
        a += 10;
        gsap.to(".box",{x: a })
    }
    if(e.keyCode == 37){
        a = a - 10;
        gsap.to(".box",{x: a})

    }
    if(e.keyCode == 38){
        b = b - 10;
        gsap.to(".box",{y: b})
        gsap.to(".box",{y: b - b})

    }
    if(e.keyCode == 40){
        b = b + 10;
        gsap.to(".box",{y: b})


    }
    
});


const item_one = document.querySelector(".item_one");
const item_operator = document.querySelector(".item_operator");
const item_two = document.querySelector(".item_two");
const item_submit = document.querySelector(".item_submit");

const numpad = ["clear","c m c",1,2,3,"+",4,5,6,"-",7,8,9,"*","#",0,".","/",];

numpad.map((item,index)=>{

let button = document.createElement("button");
button.textContent = item;
button.addEventListener('click',()=>{
    console.log(typeof(item));
    if(item == "." && hasdecimal == false){
        numberstring.push(item);
        hasdecimal = true;
    }
    if(isNaN(item)){
        box.innerHTML = 0;
    }
    if(!isNaN(item)){
        numberstring.push(item);
        box.innerHTML = numberstring.join('');
    }
    if(item == "+" || item == "-" || item == "*" || item == "/"){
        hasdecimal = false;
       
        if(numberstring.length == 0){
            equation.push(previousequations[previousequations.length - 1])
        }
       
        if(numberstring.length > 0){
            equation.push(numberstring.join(''));
            numberstring = [];
            
        }
        equation.push(item);
    }
    
    
    if(item == "#"){
       
        if(numberstring.length == 0){
            
            console.log(previousnumberstring[previousnumberstring -1])
         
         if(previousnumberstring.length == 0){
             equation.push(0);
         }
         
            if(previousnumberstring.length > 0 && previousoperator.length > 0){
                equation.push(previousnumberstring[previousnumberstring.length - 1]);
                equation.push(previousoperator[previousoperator.length -1]);
                equation.push(previousequations[previousequations.length -1])
                let answer = operate(equation[0],equation[1],equation[2]);
                previousequations.push(answer);
                equation = []; 
                numberstring = [];                
            }
        }


if(numberstring.length > 0 ){
                equation.push(numberstring.join(''));
            let answer = operate(equation[0],equation[1],equation[2]);
            previousequations.push(answer);
            hasdecimal = false;
            previousnumberstring.push(Number(equation[equation.length -1]));
            previousoperator.push(equation[1]);
            equation = []; 
            numberstring = [];
        }
        else if(numberstring.length <= 0 && previousequations.length <= 0){
            box.innerHTML = "nothing to calculate",
            previousequations.push(0);
        }
    }
    if(item == "clear"){
        numberstring = [];
    }
    if(item == "c m c"){
        previousequations = [];
    }
    
    console.log(`number string = ` + numberstring);
    console.log(`equation = ` + equation);
    console.log(`previous operator = ` +previousoperator);
    console.log(`previous number string = ` + previousnumberstring);
    console.log(`previous equations = ` + previousequations);
});



roadblock.appendChild(button);

});


let numberstring  = [];
let equation = [];
let previousequations = [];
let previousnumberstring = [];
let previousoperator = [];
let hasdecimal = false;



function operate(a,b,c){
    a = Number(a);
    c = Number(c);    
    console.log(a,b,c)

    if(b == "+"){
        box.innerHTML =  a + c;
        return a + c;
    }
    if(b == "-"){
        box.innerHTML =  a - c;
        return a - c;

    }
    if(b == "*"){
        box.innerHTML =  a * c;
        return a * c;

    }
    if(b == "/"){
        box.innerHTML =  a / c;
        return a / c;

    }


    
}

