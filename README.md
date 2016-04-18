# gulp-typescript-babel

gulp-typescript-babel = [gulp-babel](https://www.npmjs.com/package/gulp-babel) + [gulp-typescript](https://www.npmjs.com/package/gulp-typescript)

A simple wrapper for `gulp-typescript` and `gulp-babel`

For compiling from typescript to es2015 to es5, JavaScript in the browser.

.ts --> [gulp-typescript] --> es2015 --> [gulp-babel] --> es5

## Installation

```bash
npm install --save-dev gulp-typescript-babel
```

## Basic Usage

```javascript
var gtb = require('gulp-typescript-babel');

gulp.task('compile', function () {
    gulp.src(config.typescript)
         .pipe(gtb({incremental: true, configFile: 'tsconfig.json'},
            {presets: ['es2015']}))
        .pipe(gulp.dest(config.output))
});
```

## Documentation

### API

`gtb(typescript_option, babel_option)`

### Typescript option

```javascript
ts_option: {
    config: {...},
    incremental: true/false,
    configFile: '...',
    reporter: {},
    filterBefore: [],
    filterAfter: []
}
```

1. Basic Usage

    ```javascript
    .pipe(gtb(
        { config: {
            noImplicitAny: true,
            out: 'output.js'
          }
        },
        babelOption
    }))
    ```

    is equivalent to

    ```javascript
    .pipe(ts({
        noImplicitAny: true,
        out: 'output.js'
    }))
    ```

2. Incremental Compilation

    ```javascript
    .pipe(gtb(
        { config: {
                noImplicitAny: true,
                out: 'output.js'
          },
          incremental: true
        },
        babelOption
    }))
    ```

    is equivalent to

    ```javascript
    var tsProject = ts.createProject({
    	declaration: true,
    	noExternalResolve: true
    });
    ...
	.pipe(ts(tsProject));
    ```

3. Using tsconfig.json

    ```javascript
    .pipe(gtb(
        { config: {
                sortOutput: true
          },
          incremental: true,
          configFile: 'tsconfig.json'
        },
        babelOption
    }))
    ```

    is equivalent to

    ```javascript
    var tsProject = ts.createProject('tsconfig.json', { sortOutput: true });
    ...
    .pipe(ts(tsProject));    
    ```

4. Filters

    ```javascript
    .pipe(gtb(
        { ...
            filterBefore: filterBefore,
            filterAfter: filterAfter,
        },
        babelOption
    }))
    ```

    is equivalent to

    ```javascript
    var tsResult = gulp.src('lib/*.ts')
                        .pipe(ts(tsProject, filterBefore));
    tsResult.pipe(ts.filter(tsProject, filterAfter));
    ```

    See different between `filterBefore` and `filterAfter` [here](https://www.npmjs.com/package/gulp-typescript#filters)

5. Reporter

    ```javascript
    .pipe(gtb(
        { ...
          reporter: reporter
        },
        babelOption
    }))
    ```

    is equivalent to

    ```javascript
    ts(optionsOrProject, filters, reporter);
    ```

    You can access `ts.reporter` using `gtb.tsReporter`. For example: `gtb.tsReporter.defaultReporter() === ts.reporter.defaultReporter()`.


Refer [gulp-typescript](https://www.npmjs.com/package/gulp-typescript).

### Babel option

See [gulp-babel](https://www.npmjs.com/package/gulp-babel).

## License

The MIT License (MIT)

Copyright (c) 2016 Tan Li Hau

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
