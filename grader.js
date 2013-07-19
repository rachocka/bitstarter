#!/usr/bin/env node

var fs = require('fs');
var rest = require('restler');
var program = require('commander');
var cheerio = require('cheerio');
var sys = require('util');

var HTML_DEFAULT = "index.html";
var CHECKSFILE_DEFAULT = "checks.json";
var URL_DEFAULT = "http://sheltered-crag-5447.herokuapp.com";

var assertFileExists = function(infile) {
	var instr = infile.toString();
	if(!fs.existsSync(instr)){
		console.log("%s does not exist. Exiting.", instr);
		process.exit(1);
	}
	return instr;
};

var assertUrlExists = function(infile) {
	var instr = infile.toString();
	if(!instr){
		console.log("%s - no url path found. Exiting.", instr);
		process.exit(1);
	}
	return instr;	
};
var cheerioHtmlFile = function(htmlfile){
	return cheerio.load(fs.readFileSync(htmlfile));
};

var readData = function(urlfile, checksfile){
	var data1 = rest.get(urlfile, 'data').once('success', function(data, response){
		$ = cheerio.load(data);
		var checks = loadChecks(checksfile);
		var out = {};
		for (var ii in checks){
			var present = $(checks[ii]).length > 0;
			out[checks[ii]] = present;
		}
		//print
		var outJson = JSON.stringify(out, null, 4);
		console.log(outJson); 
});	
};

var loadChecks = function(checksfile){
	return JSON.parse(fs.readFileSync(checksfile));
};

var checkHtmlFile = function(htmlfile, checksfile){
	$ = cheerioHtmlFile(htmlfile);
	var checks = loadChecks(checksfile).sort();
	var out = {};
	for(var ii in checks){
		var present = $(checks[ii]).length > 0;
		out[checks[ii]] = present;
	}
	return out;
};

var checkUrlFile = function(urlfile, checksfile){
	var data = readData(urlfile, checksfile);
};

var clone = function(fn){
	return fn.bind({});
};

if(require.main == module){
	program
		.option('-c, --checks <check_file>', 'Path to checks.json', clone(assertFileExists), CHECKSFILE_DEFAULT)
		/*.option('-f, --file <html_file>', 'Path to index.html', clone(assertFileExists), HTML_DEFAULT)*/
		.option('-u, --url <url_file>', 'Path to URL', clone(assertUrlExists), URL_DEFAULT)
		.parse(process.argv);
		var checkJson = checkUrlFile(program.url, program.checks);
}else{
	exports.checkHtmlFile = checkHtmlFile;
}










