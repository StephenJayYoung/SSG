function SiteGenerator() {

}

SiteGenerator.prototype.generateSite = function(a, b, cb) {
	// use the generateFile method to make things easier!
	setTimeout(cb, 0);
};
//**
//*@param {strings}
//*@return {string}
//**

SiteGenerator.prototype.generateFile = function(layoutFile, indexFile, outputFile, cb) {
	// how do we get the file to read first?
	fs.readFile(layoutFile, { encoding: 'utf8' }, function(err, layoutContents) {
		fs.readFile(indexFile, { encoding: 'utf8' }, function(err, indexContents) {
			var newString = this.combined(layoutContents, indexContents);
			console.log (newString);
			var newFile = {};
		});
	});
	//newString read to newFile path to temp file
	setTimeout(cb, 0);
};

//This is going to take 2 arguments (they are both strings). The 2 arguments are the two inputs. The output will return a string. 
SiteGenerator.prototype.combined = function(string1, string2) {
	var newString = string1.replace('{{contents}}', string2);
	return newString;
};

module.exports = SiteGenerator;