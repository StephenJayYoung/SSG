var fs = require('fs');
function SiteGenerator() {

}

SiteGenerator.prototype.generateSite = function(siteDirectory, outputDirectory, cb) {
	// use the generateFile method to make things easier!
	setTimeout(cb, 0);
};
//**
//*@param {strings}
//*@return {string}
//**

SiteGenerator.prototype.generateFile = function(layoutFile, indexFile, outputFile, cb) {
	fs.readFile(layoutFile, { encoding: 'utf8' }, function(err, layoutContents) {
		if (err) { cb(err); return; }
		fs.readFile(indexFile, { encoding: 'utf8' }, function(err, indexContents) {
			if (err) { cb(err); return; }
			var newString = this.combined(layoutContents, indexContents);
			fs.writeFile(outputFile, newString, function(err) {
				if (err) { cb(err); return; }
				cb(null);
			});
		}.bind(this));
		//binding "this" brings the generator into the read file function as the "this"
		//so that the combined method is able to be called.
	}.bind(this));
};

//This is going to take 2 arguments (they are both strings). The 2 arguments are the two inputs. The output will return a string. 
SiteGenerator.prototype.combined = function(string1, string2) {
	var newString = string1.replace('{{ content }}', string2);
	return newString;
};

module.exports = SiteGenerator;