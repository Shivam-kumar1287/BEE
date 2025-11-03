const express = require("express");
const app= express();
const mongoose = require("mongoose");
const listing = require("../majorproject/models/listing.js")
const path = require("path");
const methodOverride = require('method-override');
const ejsmate= require("ejs-mate");
const wrapAsync = require ("./utils/wrapAsync.js");
const  ExpressError  = require ("./utils/ExpressError.js");
app.engine('ejs',ejsmate);

app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"/public")));


const checkToken=(req,res,next)=>{
let {token}= req.query;
if(token==="giveaccess"){
    next();}
    throw new ExpressError (401,"you dont have access to this resource");
}

app.get("/api", checkToken,(req,res)=>{
    res.send("data");
});



main()
    .then(()=>{
    console.log("connection formed");
    
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
    };

app.get("/",(req,res)=>{
res.send("hello bhai root bhi chal gya");
});


// app.get("/testListing", async(req,res)=>{
// let sampleListing= new listing({
//     title :"My Home",
//     description: " by the beach",
//     price:1200,
//     location:" calangute ,Goa",
//     country:"India"



// });
// await sampleListing.save();
// console.log("sample was success");
// res.send("successful testing");


// index route
app.get("/listings",async (req,res)=>{

      const allistings = await listing.find({});
        res.render("listings/index.ejs",{allistings});
});


// new route
app.get("/listing/new",(req,res)=>{
    res.render("listings/new.ejs")
});

//show route
app.get("/listing/:id", async (req,res)=>{
    let {id}= req.params;
   const listings = await listing.findById(id);

    res.render("listings/show.ejs",{listings});
})


// Create route
app.post("/listings", wrapAsync(async (req, res, next) => {
    if(!req.body.listing) throw new ExpressError (400,"Invalid Listing Data");
    if(!req.body.listing.title){
        throw new ExpressError (400,"Title cannot be empty");
    }
    const newListing = new listing(req.body.listing);
    if(!newListing.description){
        throw new ExpressError (400,"Description cannot be empty");
    }
    if(!newListing.price || newListing.price<=0){
        throw new ExpressError (400,"Price must be a positive number");
    }
    if(!newListing.location){
        throw new ExpressError (400,"Location cannot be empty");
    }
    if(!newListing.country){
        throw new ExpressError (400,"Country cannot be empty");
    }
    if(!newListing.image || !newListing.image.startsWith("http")){
        throw new ExpressError (400,"Image must be a valid URL");
    };
    await newListing.save();
    res.redirect("/listings");
}));

//edit route
app.get("/listings/:id/edit",async(req,res)=>{
    let {id}= req.params;
    const listings = await listing.findById(id);
    res.render("listings/edit.ejs",{listings});
});




//update route
app.put("/listing/:id",async(req,res)=>{
    let {id}= req.params;
    console.log("update working bhai");
    console.log(req.body.listing);
    
   await listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listing/${id}`);
})

app.delete("/listing/:id",async (req,res)=>{
    let {id}= req.params;
   let deleted= await listing.findByIdAndDelete(id);
   console.log(deleted);
   res.redirect("/listings");
})


app.all(("*"),(req,res,next)=>{
    // res.status(404).send("page not found ");
    next (new ExpressError (404,"page not found"));
});


app.use((err,req,res,next)=>{
    let {statusCode,message="something went wrong"}= err;
     res.status(statusCode).render("error.ejs".send(message));
  //  res.render("error.ejs",{err});
})

// app.use((req,res)=>{
//     // res.status(404).send("page not found ");
//     let  {status=404,message="page not found"}=err;
//     res.status(status).send(message);
// })

app.get("/error",(req,res)=>{
console.log("error route");
next(err);
  //  throw new Error("this is a forced error");
});

//admin
app.get("/admin",(req,res)=>{
    throw new ExpressError (403,"you are not an admin");
});

app.listen(3000,()=>{
     console.log("server started at port 3000");
})
