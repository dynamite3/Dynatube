import express, { response } from "express"

import { auth } from "../middleware/auth.js";

import ffmpeg from "fluent-ffmpeg"

import multer from "multer";

import extractFrame from "ffmpeg-extract-frame"
const router=express.Router();


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4') {
            return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("file")


var storage1 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/thumbnails/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4') {
            return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
        }
        cb(null, true)
    }
})

var upload1 = multer({ storage: storage1 }).single("file")




router.post("/upload",(req,res)=>{
    
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
    })

})

// router.post("/thumbnail",(req,res)=>{
//     console.log(req.body)
    
//     let thumbsFilePath ="";
//     let fileDuration ="";

   
//     ffmpeg(req.body.filePath)
//         .on('filenames', function (filenames) {
//             console.log('Will generate ' + filenames.join(', '))
//             thumbsFilePath = "uploads/thumbnails/" + filenames[0];
//         })
//         .on('end', function () {
//             console.log('Screenshots taken');
//             return res.json({ success: true})
//             // return res.json({ success: true, thumbsFilePath: thumbsFilePath, fileDuration: fileDuration})
//         })
//         .screenshots({
//             // Will take screens at 20%, 40%, 60% and 80% of the video
//             count: 3,
//             folder: 'uploads/thumbnails',
//             size:'320x240',
//             // %b input basename ( filename w/o extension )
//             filename:'thumbnail-%b.png'
//         });

// })

router.post("/thumbnail",(req,res)=>{

upload1(req, res, err => {
    if (err) {
        return res.json({ success: false, err })
    }
    return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
})

})
export{router}