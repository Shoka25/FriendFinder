let path = require('path');
let data = require("../data/friends");

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(data);
    });

	app.post("/api/friends", function(req, res) {
		
		let name = '';
		let image = '';
        let Input = req.body;
		let response = Input.choice;
		let total = 300; 

		for (let i = 0; i < data.length; i++) {
			let difference = 0;
			for (let j = 0; j < response.length; j++) {
				difference += Math.abs(data[i].choice[j] - response[j]);
			} 
			if (difference < total) {
                name = data[i].name;
				image = data[i].image;
				total = difference;
			}
		}
		data.push(Input);
		res.json({status: 'OK', name: name, image: image});
	});
};