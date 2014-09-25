var expect = require('chai').expect;
var path = require('path');
var fs = require('fs-extra');
var SiteGenerator = require('../index');
var helpers = require('./helpers');
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
	it.skip('generates a site with cats file', function(done) {
		var generator = new SiteGenerator();
		var site2 = path.join(__dirname, 'fixtures/site2');
		var expectedSite2 = path.join(__dirname, 'fixtures/expected/site2');
		var tmpDirectory = path.join(__dirname, 'tmp');
		generator.generateSite(site2, tmpDirectory, function() {
			var dirs = { expected: expectedSite2, output: tmpDirectory };
			helpers.dirsContents(dirs, function(err, contents) {
				expect(contents.output).to.eql(contents.expected);
				done();
			});
		});
	});
	it('generates a site with index file', function(done) {
		var generator = new SiteGenerator();
		// this is going to require the index file. This file will contain our new static site generator
		var site1 = path.join(__dirname, 'fixtures/site1');
		//this makes a shortcut to the file called site1
		var expectedSite1 = path.join(__dirname, 'fixtures/expected/site1');
		//this makes a shortcut to the file called expected site1
		var tmpDirectory = path.join(__dirname, 'tmp');
		//this creates a shortcut for the temporary directory which will hold the new file once 'compiled'
		generator.generateSite(site1, tmpDirectory, function() {
			var dirs = { expected: expectedSite1, output: tmpDirectory };
			helpers.dirsContents(dirs, function(err, contents) {
				expect(contents.output).to.eql(contents.expected);
				done();
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

	describe('listFiles', function() {
		it.skip('what is the contents of a directory other then layout', function() {
			var generator = new SiteGenerator();
			var site1 = path.join(__dirname, 'fixtures/site1');
			var index = path.join(__dirname, 'fixtures/site1/index.html')
			console.log (site1);
			console.log (index);
			generator.listFiles(site1, function(err, result) {
				expect(result).to.eql([index]);
			});
		});
		it.skip('what is the contents of a directory other then layout', function() {
			var generator = new SiteGenerator();
			var site2 = path.join(__dirname, 'fixtures/site2');
			var cats = path.join(__dirname, 'fixtures/site2/cats.html');
			var foodCarts = path.join(__dirname, 'fixtures/site2/foodcarts.html')
			generator.listFiles(site2, function(err, result) {
				expect(result).to.eql([cats, foodCarts]);
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
