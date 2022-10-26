import Item from "../model/item";
import multer from "multer";
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: (req,file,cb) => cb(null, 'uploads/'),
    filename:  (req,file,cb) => {
        const uniqueName = `${Date.now()}-${Math.round(
            Math.random() * 1e9
          )}${path.extname(file.originalname)}`;
          cb(null, uniqueName);
        },
      });

const handleMultipartData = multer({ storage, limit: {filesize : 1000000 * 5 }}).single('image');

const itemController = 
{
    async store(req,res,next)
    {
      
            handleMultipartData(req,res, async (err) => {
               
                const filePath = req.file.path;
                const  { name, price, size } = req.body;
                let document;
                try{
                    document = await Item.create({
                    name,
                    price,
                    size,
                    image: filePath
                });
                console.log(document);
            }
            catch(err){
                return next(err);
            }
            res.status(201).json({
                success:true,
                data: document
            }); 
        });

    },

    async index(req, res) {
        const itemdata = await Item.find();
         res.status(201).json(itemdata);
      },

      async showsingle(req,res,next){
        let documents;
        try{
            documents = await Item.findOne({_id: req.params.id });
        }
        catch(err){
            return res.json({msg: "error found"});
        }
        return res.json(documents); 
    }

}

export default itemController;