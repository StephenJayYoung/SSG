var expect = require('chai').expect;
var path = require('path');
var fs = require('fs-extra');
var SiteGenerator = require('../index');
// need to input the name of the object that we are operating on


describe('site generator', function() {
	beforeEach(function(done) {
		var tmpDirectory = path.join(__dirname, 'tmp');
		fs.remove(tmpDirectory, function(err) {
			fs.ensureDir(tmpDirectory, function(err) {
				if (err) { throw err; }
				done();
			});
		});
	});

	it.skip('generates a site', function(done) {
		var generator = new SiteGenerator();
		// this is going to require the index file. This file will contain our new static site generator
		var site1 = path.join(__dirname, 'fixtures/site1');
		//this makes a shortcut to the file called site1
		var expectedSite1 = path.join(__dirname, 'fixtures/expected/site1');
		//this makes a shortcut to the file called expected site1
		var tmpDirectory = path.join(__dirname, 'tmp');
		//this creates a shortcut for the temporary directory which will hold the new file once 'compiled'
		generator.generateSite(site1, tmpDirectory, function() {
		//we don't know how this works yet, but it takes the following arguments: site1, tmpDirectory, and a function. This is the callback.
			fs.readdir(tmpDirectory, function(err, contents) {
			//the function is going to read the directory, and if it can't read the file, it will receive an error.
				expect(contents).to.eql(['index.html']);
				//if it can read the file, it will expect the contents of those files to match the contents of index.html
				fs.readFile(path.join(tmpDirectory, 'index.html'), { encoding: 'utf8' }, function(err, actualContents) {
					fs.readFile(path.join(expectedSite1, 'index.html'), { encoding: 'utf8' }, function(err, expectedContents) {
						expect(actualContents).to.eql(expectedContents);
						done();
					});
				});
			});
		});
	});

	describe('combine files', function() {
		it('combines the content from 2 files into 1 new file', function(done) {
			//it is going to expect the content to be a file with new content
			var generator = new SiteGenerator();
			var layout = path.join(__dirname, 'fixtures/site1/layout.html');
			var index = path.join(__dirname, 'fixtures/site1/index.html');

			var outputDirectory = path.join(__dirname, 'tmp');
			var outputFile = path.join(outputDirectory, 'index.html');

			var expectedDirectory = path.join(__dirname, 'fixtures/expected/site1');
			var expectedFile = path.join(expectedDirectory, 'index.html');

			generator.generateFile(layout, index, outputFile, function(err) {
				fs.readFile(outputFile, { encoding: 'utf8' }, function(err, outputContents) {
					fs.readFile(expectedFile, { encoding: 'utf8' }, function(err, expectedContents) {
						expect(outputContents).to.eql(expectedContents);
						done();
					});
				});
			});
		});
	});

	describe('generate a string', function() {
		it('takes input from 2 strings and returns 1 supercalifragilisticexpialidocious string', function() {
			//it is going to expect the content to be a file with new content
			var generator = new SiteGenerator();
			var string1 = "this is the combo of the {{ content }}";
		 	var string2 = 'majestic things';
		 	var expectedString = 'this is the combo of the majestic things';
			var result = generator.combined(string1, string2);      //combine(layoutFile, contentFile);
			expect(result).to.eql(expectedString);
			//this is going to require the index file so that we can make sure that we can read it
		});
	});
});
