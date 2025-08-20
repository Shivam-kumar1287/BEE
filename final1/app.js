const express = require('express');
const app= express();
const mongoose=require('mongoose');

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/trvel');
    console.log('connected to database')
    .then( ()=>{
        console.log('connected to database')
    }
    )
    .catch((error)=>{
        console.log('error in connecting to database')
    })
}

app.listen(8080,()=>{
 console.log('server   is running on port 8080')
})