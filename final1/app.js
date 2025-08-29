const express = require("express");
const app=express();
const port=8000;
const mongoose=require("mongoose");
const db="mongodb://localhost:27017/travel";
const listing=require("./model/listing");

main() 
 .then(()=>{
    console.log("Connected to database");
 })
 .catch((error)=>{
    console.log("Error in connecting to database",error);
 });
async function main(){
    await mongoose.connect(db);
    console.log("Connected to database");
}

app.get("/testListing", async (req, res) => {
  let sampleListing = new Listing({
    title: "My New Villa",
    description: "By the beach",
    price: 1200,
    location: "Calangute, Goa",
    country: "India",
  });

  await sampleListing.save();
  console.log("sample was saved");
  res.send("successful testing");
});

app.get("/",(req,res)=>{
    res.send("Hello World");
});



app.listen(port,()=>{
    console.log("Server is running on port "+port);
});