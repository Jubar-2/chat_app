
const decorateHtmlResponsive = (page_title)=>{
    return (req, res, next) => {
        res.locals.html = true;
        res.locals.title = `${page_title} - ${process.env.APP_NAME}`;
        res.locals.data = {};
        res.locals.errors ={};
        res.locals.loggedinUser = {};
        next();
    }
}

module.exports = decorateHtmlResponsive;