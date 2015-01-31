var gulp = require('gulp');
var templates = require('../index.js');
var through = require('through2');
var assert = require('chai').assert;

console.log('gulp-osws-templates');

var timeout = false;

gulp.src(__dirname + '/module.js')
.pipe(templates({
    arguments: [2],
    context: { b: 3 }
}))
.pipe(through.obj(function(file, enc, callback){
    assert.equal(file.path, __dirname + '/module.html');
    assert.equal(String(file.contents), '123');
    timeout = true;
}));

setTimeout(function() {
    if (!timeout) throw new Error('timeout');
    console.log('done');
}, 500);