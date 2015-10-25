var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	//res.send({title:"test"});
	res.render("index",{title:"test"});
});

router.post("/validate",function(req,res){
	if(isValid(req.body.data)){
		var address_details = JSON.parse(req.body.data);
		var result = [];
		for(i=0;i < address_details.payload.length;i++)
		{
			//console.log("drm" + [i] + address_details.payload[i].drm);
			
			if(address_details.payload[i].drm===true && address_details.payload[i].episodeCount > 0)
			{	
				console.log("showImage ---- " + address_details.payload[i].image.showImage);
				result.push({"image": address_details.payload[i].image.showImage,"slug": address_details.payload[i].slug,"title": address_details.payload[i].title});		
				console.log("------- success yeyy  -----");
			}    
		}
		console.log("result ---- " + result);
		var payload_address_details = {};
		payload_address_details.response=result;
		res.send(JSON.stringify(payload_address_details));
	}else{
		res.send("400",{"error": "Could not decode request: JSON parsing failed"});
	}
	
});

function isValid(json){
	try{
		JSON.parse(json)
	}catch(e){
		return false
	}
	return true;
}
module.exports = router;
