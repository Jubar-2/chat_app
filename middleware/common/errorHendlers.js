const createError = require('http-errors');

const notFoundHendler = (req,res,next)=>{
    next(createError(404,"Youer requset was not found"));
}

const errorHendler =(err,req,res,next)=>{
    res.render('error',{
        title: "error hendler"
    });
}



module.exports = {notFoundHendler,errorHendler};