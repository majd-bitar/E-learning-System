import Class from "../models/classModel.js";
import path  from "path";
import fs from "fs";

//admin
const uploadFile = async (req,res)=>{

    try{

        const {classID} = req.params;
        const file = req.file;

        if(!file){
            return res.status(400).json({message:'No file uploaded'});
        }

        const fileUrl = `uploads/$(file.filename)`;
        const targetClass = await Class.findById(classID);
        if(!targetClass){
            return res.status(400).json({message:'Class not found'});
        }

        targetClass.files.push({filename:file.originalname,fileUrl});
        await targetClass.save();

        res.status(200).json({message:'file uploaded successfully',fileUrl})
    } catch(e){
        return res.status(500),json({message:e.message});
    }
};

//user

const downloadFile = async (req, res) => {
    const { fileName } = req.params;
    const filePath = path.join(__dirname, '../uploads', fileName);

    // Check if the file exists before trying to send it
    if (fs.existsSync(filePath)) {
        // Use res.sendFile to send the file as a download
        res.sendFile(filePath, err => {
            if (err) {
                console.error('Error sending file:', err);
                res.status(500).json({ message: 'Error sending file' });
            }
        });
    } else {
        res.status(404).json({ message: 'File not found' });
    }
};

export default {uploadFile,downloadFile};