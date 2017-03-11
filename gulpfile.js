var gulp = require('gulp');
var mocha = require('gulp-mocha');
var fs = require( "fs" );

const eslint = require('gulp-eslint');

gulp.task('lint', function () {

  return gulp.src(['src/app/*.jsx', 'src/components/*.jsx'])

    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.format('html', fs.createWriteStream('eslintOutput.html')))
    .pipe(eslint.failAfterError());

});

gulp.task('guiTest1', ['lint'], function () {

  return gulp.src(['test/guiTest1.js'], { read: false })
    .pipe(mocha({
      reporter: 'spec'
    }))
    .on('error', function() { console.log( 'failed test' ); process.exit.bind(process, 1) });
    
});


gulp.task('default', ['lint', 'guiTest1'], function () {
    // This will only run if the lint task is successful...
    console.log( 'Success?' );
});

