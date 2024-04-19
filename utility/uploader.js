const multer = require('multer');
const path = require('path');
const createError = require('http-errors');

const uplaoder = (
    subfolderPath,
    allowedFiledType,
    maxFileSize,
     errorMas
    ) => {

    const UPLOADS_FOLDER = `${__dirname}/../public/uploads/${subfolderPath}/`;
    
     const storage = multer.diskStorage({
        destination: (req, file, cb) => {
           
            cb(null,UPLOADS_FOLDER);
        },

        filename: (req, file, cb) => {

            const fileExt = path.extname(file.originalname);
            const fileName = file.originalname
            .replace(fileExt,'')
            .toLowerCase()
            .split(' ')
            .join('-') + '-' + Date.now();

            cb(null,fileName+fileExt)
        }

        });

        const upload = multer({
            storage: storage,
            limits: {
                fieldSize: maxFileSize
            },

            fileFilter: (req, file, cb)=>{

                if(allowedFiledType.includes(file.mimetype)){

                    cb(null, true)
                    console.log(file)
                } else {
                    console.log(errorMas);
                    cb(createError(errorMas));
                }
            }

        });

        return upload;
    }

    module.exports = uplaoder;