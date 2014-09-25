var fs = require('fs');
var path = require('path');

/**
 * @constructor
 */
function SiteGenerator() {

}
/**
 * @callback SiteGenerator~generateSiteCallback
 * @param {Error} err The error if one occurred.
 */

/**
 * Generate new site in a output directory based on input directory.
 *  It will take any file from the input directory other then the layout
 *  file and combine it with the layout, writing that to the output directory.
 * It will call the callback when complete.
 *
 *
 * @method
 * @param  {String} siteDirectory - The full path to the input directory.
 * @param  {String} outputDirectory - The full path to the output directory.
 * @param  {SiteGenerator~generateSiteCallback} cb - The callback.
 * @see {SiteGenerator#generateFile}
 */

SiteGenerator.prototype.generateSite = function(siteDirectory, outputDirectory, cb) {
	var layoutFile = path.join(siteDirectory, 'layout.html');
	var indexFile = path.join(siteDirectory, 'index.html');
	var outputFile = path.join(outputDirectory, 'index.html');
	this.generateFile(layoutFile, indexFile, outputFile, cb);
};

/**
 * @callback SiteGenerator~generateFileCallback
 * @param {Error} err The error if one occurred.
 */

/**
 * Generate a new file. It will write a new file to `outputFile` and call the
 * callback when complete. The contents of that file are based on the
 * `layoutFile` and the `contentFile`.
 *
 * @method
 * @param  {String} layoutFile - The full path to the layout file.
 * @param  {String} contentFile - The full path to the content file.
 * @param  {String} outputFile - The full path to the output file.
 * @param  {SiteGenerator~generateFileCallback} cb - The callback.
 * @see {SiteGenerator#combined}
 */
SiteGenerator.prototype.generateFile = function(layoutFile, contentFile, outputFile, cb) {
	fs.readFile(layoutFile, { encoding: 'utf8' }, function(err, layoutContents) {
		if (err) { cb(err); return; }
		fs.readFile(contentFile, { encoding: 'utf8' }, function(err, contentContents) {
			if (err) { cb(err); return; }
			var newString = this.combined(layoutContents, contentContents);
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

//TODO: 1) document out generateFile and generateSite -parameters, return value, what does it do?
//more tests for generateSite, describe explicitly what they do
//test: how do we make sure that we are calling the correct directory pending additional files?