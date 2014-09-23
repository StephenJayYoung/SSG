var epect = require('chai').expect;
var File = require();
// need to input the name of the object that we are operating on


describe('site generator', function() {
	it('generates a site', function() {
	var file = new File;
		var result = file.siteGenerator(index, layout);
		expect(result).to.eql('result index');
	});
});