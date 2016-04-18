var     lazypipe = require('lazypipe'),
  gulpTypescript = require('gulp-typescript'),
       gulpBabel = require('gulp-babel');

/**
tsc: {
    config: {...},
    incremental: true/false,
    configFile: '...',
    reporter: {},
    filterBefore: [],
    filterAfter: []
}
*/
var compile =
    (function(){
        var compile = function(tsc, babel){
            var tsOption = {};
            if(!!tsc.incremental){
                if(tsc.configFile !== undefined){
                    tsOption = gulpTypescript.createProject(tsc.configFile, tsc.config || {});
                }else{
                    tsOption = gulpTypescript.createProject(tsc.config || {});
                }
            }else{
                if(tsc.configFile !== undefined){
                    tsc.config.project = tsc.configFile;
                }
                tsOption = tsc.config;
            }
            var pipe = lazypipe();
            pipe = pipe.pipe(gulpTypescript, tsOption, tsc.filterBefore || undefined, tsc.reporter);
            if(tsc.filterAfter !== undefined){
                pipe = pipe.pipe(gulpTypescript.filter, tsOption, tsc.filterAfter);
            }
            pipe = pipe.pipe(gulpBabel, babel);
            return pipe();
        }
        compile.tsReporter = gulpTypescript.reporter;
        return compile;
    })();

module.exports = compile;
