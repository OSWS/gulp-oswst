var gulp = require('gulp');
var templates = require('./index.js');
var through = require('through2');
var assert = require('chai').assert;

describe('gulp-osws-templates', function() {
    it('mixin', function(done) {
        gulp.src(__dirname + '/tests/mixin.js')
        .pipe(templates({
            arguments: [2],
            context: { b: 3 }
        }))
        .pipe(through.obj(function(file, enc, callback){
            assert.equal(file.path, __dirname + '/tests/mixin.html');
            assert.equal(String(file.contents), '123');
            done();
        }));
    });
    it('tag', function(done) {
        gulp.src(__dirname + '/tests/tag.js')
        .pipe(templates({ context: { a: 2 }}))
        .pipe(through.obj(function(file, enc, callback){
            assert.equal(file.path, __dirname + '/tests/tag.html');
            assert.equal(String(file.contents), '<div>123</div>');
            done();
        }));
    });
    it('data', function(done) {
        gulp.src(__dirname + '/tests/data.js')
        .pipe(templates({ context: { a: 3 }}))
        .pipe(through.obj(function(file, enc, callback){
            assert.equal(file.path, __dirname + '/tests/data.html');
            assert.equal(String(file.contents), '123');
            done();
        }));
    });
});