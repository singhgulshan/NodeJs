const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(fileUpload());
const Video = require('./Video');


//INSERTS VIDEO INTO DATABASE
router.post('/uploadVideoDetails', (req, res) => {
	//console.log("i am reching here"+JSON.stringify(req.body));
	if (req.files){ //Checking whether file is uploaded of not

		let videoFile = req.files.videofile;
		// Use the mv() method to place the file somewhere on your Machine.
		videoFile.mv(__root+'videofiles/'+req.body.videoname+'.mp4', (err) => {
			if(err)
				return res.status(500).send(err);
		});

		Video.create({
            name: req.body.videoname,
			author: req.body.author,
			discription: req.body.discription,
			location: __root+'videofiles/'+req.body.videoname+'.mp4'
			
        }, 
         (err) => {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send({"msg":"Successfully inserted"});
        });
	}
});

// RETURNS ALL THE VIDEOS IN THE DATABASE
router.get('/findAllVideos', (req, res) => {
	  Video.find({}, (err,Video) => {
        if (err) return res.status(500).send("There was a problem finding the reservation.");
        res.status(200).send(Video);
    }).sort('-date').exec( (err, docs) => { 
		console.log("error");
	});
});



/*// DELETES A VIDEO FROM THE DATABASE
router.get('/deleteVideo/:name', (req, res) => {
	
    Video.findOneAndRemove(req.params.name, (err, Video) => {
        if (err) return res.status(500).send("There was a problem deleting the book.");
        res.status(200).send("Video with : "+ Video.name +" was deleted.");
    });
});

// UPDATES A SINGLE Video IN THE DATABASE
router.put('/updateVideo/:name', (req, res) => {
	console.log("i am called"+req.params.name+"body"+JSON.stringify(req.body));
    Video.findOneAndUpdate(req.params.mobile, req.body, {new: true}, function (err, Video) {
        if (err) return res.status(500).send("There was a problem updating the book.");
        res.status(200).send(Video);
    });
});*/


module.exports = router;