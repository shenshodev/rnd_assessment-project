const browserSync = require('browser-sync');
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');

const handlebars = require('handlebars');
const gulpHandlebars = require('gulp-handlebars-html')(handlebars);
const data = require('gulp-data');


const reload = browserSync.reload;
const paths = {
  html:{
    src: './app/index.html'
  },
  styles: {
    src: './scss/*.scss',
    dest: './app/css'
  },
  scripts: {
    src: './scripts/*.js',
    dest: './app/js'
  },
  server:{
    src: './app/'
  },
  handlebars: {
    src: './src/index.handlebars',
    dest: './app',
    data: './src/data.json'
  }
};

function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(rename({
      basename: 'app'
    }))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
}
 
function scripts() {
  return gulp.src(paths.scripts.src, { sourcemaps: true })
    .pipe(rename({
      basename: 'app'
    }))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.stream());
}
 
function handlebarsTask() {
  return gulp.src(paths.handlebars.src)
      .pipe(data(function(file) {
          return require(paths.handlebars.data);
      }))
      .pipe(gulpHandlebars())
      .pipe(rename('index.html'))
      .pipe(gulp.dest(paths.handlebars.dest))
      .pipe(browserSync.stream());
}

function watch() {
  browserSync.init({
    server: {
      baseDir: paths.server.src
    }
  });

  gulp.watch(paths.styles.src, styles);
  // gulp.watch(paths.html.src).on('change', reload);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.handlebars.src, handlebarsTask);
}
 
// const build = gulp.parallel(styles, scripts);
 

exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
// exports.build = build;
exports.handlebarsTask = handlebarsTask;
exports.default = watch;