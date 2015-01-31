var Templates = require('osws-templates');
var _ = require('lodash');
var through = require('through2');
var gutil = require('gulp-util');

module.exports = function(options){
	var options = _.defaults(options, {
		arguments: [],
		context: {}
	});
	
	return through.obj(function(file, enc, callback){
		file.path = gutil.replaceExtension(file.path, '.html');
		
		var _this = this;
		
		if (file.isNull()) {
			return callback(null, file);
		}
		
		if (file.isStream()) {
			return callback(new gutil.PluginError('gulp-osws-templates', 'Streaming not supported'));
		}
		
		if(file.isBuffer()){
			try {
				var template = Templates.includeString(String(file.contents), file.path);
				template.apply(template, options.arguments).render(options.context, function(result) {
					file.contents = new Buffer(result);
					callback(null, file);
				});
			} catch(error) {
				callback(new gutil.PluginError('gulp-osws-templates', error));
			}
		} else {
			callback(null, file);
		}
	});
};