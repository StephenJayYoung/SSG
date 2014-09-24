var expect = require('chai').expect;
var path = require('path');
var fs = require('fs');
var SiteGenerator = require('../index');
var fileReader = require('../index');
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
});

//TODO: Write some tests to make sure that the site generator: 1) Can read the file,
// 2) Can find the place where the content is supposed to go, 3) Can find what needs to be replaced.
//this test makes sure we can find the place where the content will go
describe('combine files', function() {
	it.skip('combines the content from 2 files into 1 new file', function(done) {
	//it is going to expect the content to be a file with new content
	var generator = new SiteGenerator();
	var expectedSite1 = path.join(__dirname, 'fixtures/expected/site1');
	var layout = path.join(_dirname, 'fixtures/site/layout.html');
	var index = path.join(_dirname, 'fixtures/site/index.html');
	var newFile = generator.generateSite(layout, index);      //combine(layoutFile, contentFile);

	expect(newFile.length).to.eql(1);
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





