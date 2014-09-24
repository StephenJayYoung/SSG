function SiteGenerator() {

}

SiteGenerator.prototype.generateSite = function(a, b, cb) {
	// use the generateFile method to make things easier!
	setTimeout(cb, 0);
};

SiteGenerator.prototype.generateFile = function(a, b, c, cb) {
	// use the generateFile method to make things easier!
	setTimeout(cb, 0);
};

//This is going to take 2 arguments (they are both strings). The 2 arguments are the two inputs. The output will return a string. 
SiteGenerator.prototype.combined = function(string1, string2) {
	var newString = string1.replace('{{contents}}', string2);
	return newString;
};

module.exports = SiteGenerator;