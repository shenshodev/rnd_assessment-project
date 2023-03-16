const browserSync = require('browser-sync');
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const handlebars = require('handlebars');
const gulpHandlebars = require('gulp-handlebars-html')(handlebars);
const data = require('gulp-data');
const { src, dest, series, parallel } = require('gulp');
const reload = browserSync.reload;
const paths = {
  html: {
    src: './app/index.html'
  },
  images: {
    src: './src/imgs/*.*',
    dest: './app/imgs'
  },
  scripts: {
    src: './src/js/*.js',
    dest: './app/js'
  },
  css: {
    src: './src/css/**/*.*',
    dest: './app/css'
  },
  scss: {
    src: './src/style.scss',
    dest: './app/css'
  },
  js: {
    src: './src/script.js',
    dest: './app/js'
  },
  server: {
    src: './app/'
  },
  handlebars: {
    src: './src/index.handlebars',
    dest: './app',
    data: './src/data.json'
  }
};

function exportImagesTask() {
  return src(paths.images.src)
    .pipe(dest(paths.images.dest));
}

function exportScriptsTask() {
  return src(paths.scripts.src)
    .pipe(dest(paths.scripts.dest));
}

function exportCssTask() {
  return src(paths.css.src)
    .pipe(dest(paths.css.dest));
}

function scssTask() {
  return src(paths.scss.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(rename({
      basename: 'app'
    }))
    .pipe(dest(paths.scss.dest))
    .pipe(browserSync.stream());
}

function scriptTask() {
  return src(paths.js.src, { sourcemaps: true })
    .pipe(rename({
      basename: 'app'
    }))
    .pipe(dest(paths.js.dest))
    .pipe(browserSync.stream());
}

function handlebarsTask() {
  return src(paths.handlebars.src)
    .pipe(data(function (file) {
      return require(paths.handlebars.data);
    }))
    .pipe(gulpHandlebars())
    .pipe(rename('index.html'))
    .pipe(dest(paths.handlebars.dest))
    .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
      server: {
        baseDir: paths.server.src
      }
  });

  // gulp.watch(paths.styles.src, styles); //Reload does not work when I do big changes on scss file
  gulp.watch(paths.scss.src, scssTask).on('change', reload); //Always reload after a change on scss file
  gulp.watch(paths.js.src, scriptTask);
  gulp.watch(paths.handlebars.src, handlebarsTask);
}

const resources = parallel(exportCssTask, exportScriptsTask, exportImagesTask);
const build = series(scssTask, handlebarsTask, scriptTask, resources);
const start = series(build, watch);

exports.images = exportImagesTask;
exports.js = exportScriptsTask;
exports.css = exportCssTask;
exports.styles = parallel(scssTask, exportCssTask);
exports.scripts = parallel(scriptTask, exportScriptsTask);
exports.handlebars = handlebarsTask;
exports.watch = watch;
exports.build = build;
exports.start = start;
exports.default = start;