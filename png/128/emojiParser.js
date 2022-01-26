var http = require('http'),                                                
    Stream = require('stream').Transform,                                  
    fs = require('fs');



fs.readFile('file.txt', 'utf8' , (err, data) => {
  const regexp = /srcset=\"(.{10,300}) 2x\" alt/g;
  const matches = [...data.matchAll(regexp)];
  matches.forEach((url) => {
 const urlRegex = /(([a-f,0-9]{3,5})(-?)){1,20}\.png/g;
  var code = [...url[1].matchAll(urlRegex)][0][0];
  var codeElements = code.split('-').map((s) => s.replace('.png', ''));
  var fileName = 'emoji_u' + codeElements.join('_') + '.png';
  var data = new Stream();
     http.request(url[1].replace("https", "http"), function(response) {                                        
  	response.on('data', function(chunk) {                                       
    	data.push(chunk);                                                         
  	});                                                                         

  	response.on('end', function() {                                             
    	fs.writeFileSync(fileName, data.read());                               
  	});                                                                         
	}).end();

     console.log(fileName);
  });
})

