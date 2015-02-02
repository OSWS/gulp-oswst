var gulp = require('gulp');
var templates = require('./index.js');
var through = require('through2');
var assert = require('chai').assert;

describe('gulp-osws-templates', function() {
    it('compile', function(done) {
        gulp.src(__dirname + '/tests/module.js')
        .pipe(templates({
            arguments: [2],
            context: { b: 3 }
        }))
        .pipe(through.obj(function(file, enc, callback){
            assert.equal(file.path, __dirname + '/tests/module.html');
            assert.equal(String(file.contents), '123');
            done();
        }));
    })
});