var expect = require('chai').expect;
var path = require('path');
var fs = require('fs');
var SiteGenerator = require('../index');
// need to input the name of the object that we are operating on


describe('site generator', function() {
	it.skip('generates a site', function(done) {
		var generator = new SiteGenerator();
		var site1 = path.join(__dirname, 'fixtures/site1');
		var expectedSite1 = path.join(__dirname, 'fixtures/expected/site1');
		var tmpDirectory = path.join(__dirname, 'tmp');
		generator.generateSite(site1, tmpDirectory, function() {
			fs.readdir(tmpDirectory, function(err, contents) {
				expect(contents).to.eql(['index.html']);
				fs.readFile(path.join(tmpDirectory, 'index.html'), { encoding: 'utf8' }, function(err, contents) {
					fs.readFile(path.join(expectedSite1, 'index.html'), { encoding: 'utf8' }, function(err, expectedContents) {
						expect(contents).to.eql(expectedContents);
						done();
					});
				});
			});
		});
	});
});
