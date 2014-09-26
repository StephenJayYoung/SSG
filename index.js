var fs = require('fs');
var path = require('path');
var _ = require('lodash');

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
	this.listFiles(siteDirectory, function(err, files) {
		// console.log(files);s
		var numberOfGenerateFileRuns = 0;
		
		files.forEach(function(file) {
			console.log(file);
			var layoutFile = path.join(siteDirectory, 'layout.html');
			var outputFile = path.join(outputDirectory, path.basename(file));
			//create a path for each file
			this.generateFile(layoutFile, file, outputFile, function(err) {
				// this takes a long time.
				// it also happens for multiple things
				// only call the callback if all of the files have been generated
				numberOfGenerateFileRuns = numberOfGenerateFileRuns+1;
				if (files.length === numberOfGenerateFileRuns) {
					cb(null);
				}
			});
		}.bind(this))
			//read the files
				// then combine with the layout
					//then generate file
	}.bind(this));
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

/**
 * @callback SiteGenerator~listFilesCallback
 * @param {Error} err The error if one occurred.
 * @param {Array.<String>} files The different full file paths that are in the directory.
 */

/**
 * Look at a directory and determine what files are in it other than layout
 *
 * @method 
 * @param  {String} Directory - The full path to the directory  file.
 * @param  {SiteGenerator~listFilesCallback} cb - The callback.
 */
SiteGenerator.prototype.listFiles = function(directory, cb) {
	//read directory 
	//filter out the layout file
	//map
	fs.readdir(directory, function(err, files){
		if (err) { cb(err); return; }
		var fileNames = _.filter(files, function(file){
			return file !== 'layout.html';
		});
		var fullFileNames = fileNames.map(function(file){
			return path.join(directory, file);
		});
		cb(null, fullFileNames);
	})
};

module.exports = SiteGenerator;




























