var gulp = require("gulp");
var plumber = require("gulp-plumber");
var uglify = require('gulp-uglify');
var nano = require("gulp-cssnano")
var htmlmin = require("gulp-htmlmin");
var notifier = require("node-notifier");
var usemin = require("gulp-usemin");
var exec = require("gulp-exec");
var sass = require('gulp-sass');

gulp.task('sass', function () {
  gulp.src('./sass/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./app/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('bundle:assets', function() {
  return gulp.src('./app/index.html')
  .pipe(plumber())
  .pipe(usemin())
  .pipe(plumber.stop())
  .pipe(gulp.dest('build'));
})


gulp.task("bundle:templates", function() {
  return gulp.src("./app/templates/*.html")
  .pipe(plumber())
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest('build/views'));
})

gulp.task("build", function() {
  return gulp.src('./app/index.html')
  .pipe(plumber())
  .pipe(usemin({
    js : [ uglify ],
    jsAttributes : {
      async : true
    },
    css : [ nano ]
  }))
  .pipe(plumber.stop())
  .pipe(gulp.dest('build'));
})

gulp.task("dev", ["bundle:assets", "bundle:templates"], function() {
  gulp.watch(["./app/javascript/**/*", "./app/css/**/*", "./app/index.html"], ["bundle:assets"])
  gulp.watch("./app/templates/*", ["bundle:templates"])
})
