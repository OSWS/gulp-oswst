var _ = require('lodash');
var through = require('through2');
var gutil = require('gulp-util');
var name = 'gulp-oswst';

module.exports = function(T) {
	var plugin = function(options){
		var options = _.defaults(_.isObject(options)? options : {}, plugin.options);
		
		return through.obj(function(file, enc, callback){
			
			var flow = this;
			
			if (file.isNull()) {
				flow.push(file);
				
			} else if (file.isStream()) {
				this.emit(
					'error',
					new gutil.PluginError(name, 'Streaming not supported')
				);
				
			} else if(file.isBuffer()){
				try {
					options.handler(
						T.compile(String(file.contents), file.path),
						options,
						file,
						function(error, result) {
							file.contents = new Buffer(result);
							file.path = gutil.replaceExtension(file.path, '.html');
							flow.push(file);
						}
					);
				} catch(error) {
					callback(new gutil.PluginError(name, error));
				}
				
			} else {
				callback(null, file);
			}
			
			callback();
		});
	};

	plugin.options = {
		arguments: [],
		context: {},
		handler: function(template, options, file, callback) {
			T.Module(template)
			.apply(null, options.arguments)
			.render(callback, options.context);
		}
	};

	return plugin;
};