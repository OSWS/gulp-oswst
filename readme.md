# [OSWS](https://github.com/OSWS) [Templates](https://github.com/OSWS/OSWS-Templates) gulp plugin 0.0.2

[gulp](gulpjs.com)-[osws](https://github.com/OSWS)-[templates](https://github.com/OSWS/OSWS-Templates)

[![GitHub version](https://badge.fury.io/gh/ivansglazunov%2FOSWS-Templates.svg)](http://badge.fury.io/gh/ivansglazunov%2FOSWS-Templates)
[![npm version](https://badge.fury.io/js/gulp-osws-templates.svg)](http://badge.fury.io/js/gulp-osws-templates)
[![Build Status](https://travis-ci.org/ivansglazunov/gulp-osws-templates.svg)](https://travis-ci.org/ivansglazunov/gulp-osws-templates)

For [osws-templates@0.2.5](https://github.com/OSWS/OSWS-Templates/releases/tag/0.2.7).

## Usage

`template.js`
```js
var Templates = require('osws-templates');

with(Templates.with) {
    module.exports = div()('<%= name? name : "undefined" %>')
}
```

`gulpfile.js`
```js
var gulp = require('gulp');
var templates = require('gulp-osws-templates');

gulp.task('templates', function() {
    gulp.src('./template.js')
    .pipe(templates({
        context: { name: 'OSWS' }
    }))
    .pipe(gulp.dest('./'));
});
```

```html
<div>OSWS</div>
```

## Options

### context
> { [name: string]: [Templates.IContext](https://github.com/OSWS/OSWS-Templates/wiki/0.2.7-interfaces-IContext) };

### arguments
> Array<any>;

### handler
> (template: Function, options: IOptions, file: [GulpFile](https://github.com/gulpjs/gulp-util#new-fileobj), callback: (result: string) => void)

Handle any file.

`template.js`
```js
var Templates = require('osws-templates');

with(Templates.with) {
    module.exports = div()('<%= name? name : "undefined" %>')
}
```

`gulpfile.js`
```js
var gulp = require('gulp');
var templates = require('gulp-osws-templates');

gulp.task('templates', function() {
    gulp.src('./template.js')
    .pipe(templates({
        context: { name: 'OSWS' },
        arguments: [1, 2, 3],
        
        // default handler
        handler: function(template, options, file, callback) {
    		template.apply(null, options.arguments)
    		.render(options.context, function(result) {
    			callback(result);
    		})
        }
    }))
    .pipe(gulp.dest('./'));
});
```