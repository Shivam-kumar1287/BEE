module.exports =(fun)=>{
    return function(req,res,next){
        fn(req,res,next).catch(next);
    }
}

