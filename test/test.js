var expect = require('chai').expect;
var path = require('path');
var fs = require('fs');
var SiteGenerator = require('../index');
var fileReader = require('../index');
var helpers = require('./helpers');
// need to input the name of the object that we are operating on


describe('site generator', function() {
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
			var dirs = { expected: expectedSite1, output: tmpDirectory };
			helpers.dirsContents(dirs, function(err, contents) {
				expect(contents.output).to.eql(contents.expected);
				done();
			});
		});
	});
});

//TODO: Write some tests to make sure that the site generator: 1) Can read the file,
// 2) Can find the place where the content is supposed to go, 3) Can find what needs to be replaced.
//this test makes sure we can find the place where the content will go


describe('combine files', function() {
	it.skip('combines the content from 2 files into 1 new file', function(done) {
		//it is going to expect the content to be a file with new content
		var generator = new SiteGenerator();
		var layout = path.join(__dirname, 'fixtures/site/layout.html');
		var index = path.join(__dirname, 'fixtures/site/index.html');

		var outputDirectory = path.join(__dirname, 'tmp');
		var outputFile = path.join(outputDirectory, 'index.html');

		var expectedDirectory = path.join(__dirname, 'fixtures/expected/site1');
		var expectedFile = path.join(expectedDirectory, 'index.html');
		console.log(expectedFile)

		generator.generateFile(layout, index, outputFile, function(err) {
			fs.readFile(outputFile, { encoding: 'utf8' }, function(err, outputContents) {
				fs.readFile(expectedFile, { encoding: 'utf8' }, function(err, expectedContents) {
					console.log(err)
					expect(outputContents).to.eql(expectedContents);
					done();
				});
			});
		});
	});
});

describe('generate a string', function() {
	it.skip('takes input from 2 strings and returns 1 supercalifragilisticexpialidocious string', function(done) {
	//it is going to expect the content to be a file with new content
	var generator = new SiteGenerator();
	var string1 = ("this is the combo of all of the {{contents}}");
 	var string2 = ('majestic things');
 	var expectedString = ('this is the combo of the majestic things');
	var result = generator.combined(string1, string2);      //combine(layoutFile, contentFile);
	expect(result).to.eql(expectedString);
		//this is going to require the index file so that we can make sure that we can read it
	});
});






//given two files, it produces a new file with the combination of content from each



//this test makes sure we can find the place where the content will go
describe('lets find the content', function() {
	it.skip('finds where the content will go', function(done) {
		var reader = new fileReader();
		//this is going to require the index file so that we can make sure that we can read it
	});
});


//this test finds what content needs to be replaced
describe('content replacement', function() {
	it.skip('finds what content needs to be replaced', function(done) {
		var reader = new fileReader();
		//this is going to require the index file so that we can make sure that we can read it
	});
});





