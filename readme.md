# [OSWS](https://github.com/OSWS) [Templates](https://github.com/OSWS/OSWS-Templates) gulp plugin 0.3.0

[gulp](gulpjs.com)-[osws](https://github.com/OSWS)-[templates](https://github.com/OSWS/OSWS-Templates)

[![GitHub version](https://badge.fury.io/gh/OSWS%2Fgulp-osws-templates.svg)](http://badge.fury.io/gh/OSWS%2Fgulp-osws-templates)
[![npm version](https://badge.fury.io/js/gulp-osws-templates.svg)](http://badge.fury.io/js/gulp-osws-templates)
[![Build Status](https://travis-ci.org/OSWS/gulp-osws-templates.svg)](https://travis-ci.org/OSWS/gulp-osws-templates)

For [osws-templates@0.3.0](https://github.com/OSWS/OSWS-Templates/releases/tag/0.3.0).

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

## TOptions

### context
> { [name: string]: [Templates.TContext](https://github.com/OSWS/OSWS-Templates/wiki/0.3.0-TContext) };

### arguments
> Array<any>;

### handler
> (template: Function, options: [TOptions](#toptions), file: [GulpFile](https://github.com/gulpjs/gulp-util#new-fileobj), callback: (result: string) => void)

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
    		Templates.Module(template)
    		.apply(null, options.arguments)
    		.render(callback, options.context);
        }
    }))
    .pipe(gulp.dest('./'));
});
```