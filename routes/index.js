
/*
 * GET home page.
 */

/*exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};*/

/*exports.index = function(req, res){
	var request = require('request');
    var myJSON = '{"user":[{"id":"1","name":"Mahesh"}, {"id":"2","name":"Haya"}]}';

    var myObj = JSON.parse(myJSON);
    console.log(">>>>>>>>>>>" + myObj.user[1].name);
    res.render('index', { 
    	title: myObj.user[1].name 
    }
  )
};*/

exports.index = function(req, res){
var request = require('request');

request('http://localhost:8080/RESTfulExample/rest/CityService/cities', function (error, response, body) {
	if (!error && response.statusCode == 200) {
		
		//var myObj = '{"city":[{"countryCode":"1","district":"Mahesh"}, {"countryCode":"2","district":"Haya"}]}';
		var x = JSON.parse(response.body);
		//console.log(">>>>>>>>>>>>>" + myObj.city[0].countryCode);
		/*res.render('index', {
        	myJSON: JSON.stringify(myObj),
        }
        }*/
        res.render('index', { layout : 'layout', json: x });
	}
})
};

exports.editCity = function(req, res){
	        console.log("------" + req.param('cid'));
	        var id = req.param('cid');
	        var request = require('request');        
	       
	      //1.
	        var http = require('http');

	        var req = request('http://localhost:8080/RESTfulExample/rest/CityService/city/' + id, function (error, response, body) {
	        	if (!error && response.statusCode == 200) {
	        		
	        		//var myObj = '{"city":[{"countryCode":"1","district":"Mahesh"}, {"countryCode":"2","district":"Haya"}]}';
	        		var x = JSON.parse(response.body);
	        		//console.log(">>>>>>>>>>>>>" + myObj.city[0].countryCode);
	        		/*res.render('index', {
	                	myJSON: JSON.stringify(myObj),
	                }
	                }*/
	        		console.log("x____" + x);
	                res.render('editcity', {json: x });
	        	}
	        })
};

exports.submitCity = function(req, res){
	console.log("-----***-submit City");
	 console.log(req.body);
	 /**
	  * HOW TO Make an HTTP Call - POST
	  */
	 // do a POST request
	 // create the JSON object
	 jsonObject = JSON.stringify(req.body);
	 var http = require('http');
	 // prepare the header
	 var postheaders = {
	     'Content-Type' : 'application/json',
	     'Content-Length' : Buffer.byteLength(jsonObject, 'utf8')
	 };
	  
	 // the post options
	 var optionspost = {
	      host: 'localhost', 
	      port: 8080,
	      path: '/RESTfulExample/rest/CityService/city/update',
	      method: 'PUT',
	      headers : postheaders
	 };
	  
	 console.info('Options prepared:');
	 console.info(optionspost);
	 console.info('Do the [PUT call');
	  
	 // do the POST call
	 var reqPut = http.request(optionspost, function(res) {
	     console.log("statusCode: ", res.statusCode);
	     // uncomment it for header details
	 //  console.log("headers: ", res.headers);
	  
	     res.on('data', function(d) {
	         console.info('PUT result:\n');
	         process.stdout.write(d);
	         console.info('\n\nPUT completed');
	     });
	 });
	  
	 // write the json data
	 reqPut.write(jsonObject);
	 reqPut.end();
	 reqPut.on('error', function(e) {
	     console.error(e);
	 });
	 
	 
	 var request = require('request');

	 request('http://localhost:8080/RESTfulExample/rest/CityService/cities', function (error, response, body) {
	 	if (!error && response.statusCode == 200) {
	 		
	 		//var myObj = '{"city":[{"countryCode":"1","district":"Mahesh"}, {"countryCode":"2","district":"Haya"}]}';
	 		var x = JSON.parse(response.body);
	 		//console.log(">>>>>>>>>>>>>" + myObj.city[0].countryCode);
	 		/*res.render('index', {
	         	myJSON: JSON.stringify(myObj),
	         }
	         }*/
	         res.render('index', { layout : 'layout', json: x });
	 	}})
};
