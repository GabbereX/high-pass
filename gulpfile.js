const { src, dest, series, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const svgSprite = require('gulp-svg-sprite');
const image = require('gulp-image');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const del = require('del');

const clean = () => del(['dist', 'src/assets/css']);
const fonts = () => src('src/fonts/**').pipe(dest('dist/fonts'));

const sassTransform = () =>
  src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('src/assets/css'));

const styles = () =>
  src('src/assets/css/**/*.css')
    .pipe(concat('styles.css'))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cleanCSS({ level: 2 }))
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream());

const stylesDEV = () =>
  src('src/assets/css/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(sourcemaps.write())
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream());

const htmlMinify = () =>
  src('src/**/*.html')
    .pipe(htmlMin({ collapseWhitespace: true }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream());

const htmlNotMinify = () =>
  src('src/**/*.html').pipe(dest('dist')).pipe(browserSync.stream());

const svgSprites = () =>
  src('src/img/svg/**/*.svg')
    .pipe(svgSprite({ mode: { stack: { sprite: '../sprite.svg' } } }))
    .pipe(dest('dist/img'));

const scripts = () =>
  src(['src/js/components/**/*.js', 'src/js/main.js'])
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(concat('main.js'))
    .pipe(uglify({ toplevel: false }).on('error', notify.onError()))
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream());

const scriptsDEV = () =>
  src(['src/js/components/**/*.js', 'src/js/main.js'])
    .pipe(sourcemaps.init())
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write())
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream());

const watchFiles = () => browserSync.init({ server: { baseDir: 'dist' } });

const images = () =>
  src([
    'src/img/**/*.jpg',
    'src/img/**/*.jpeg',
    'src/img/**/*.png',
    'src/img/*.svg',
  ])
    .pipe(image())
    .pipe(dest('dist/img'));

watch('src/scss/**/*.scss', sassTransform);
// watch('src/**/*.html', htmlMinify);
watch('src/**/*.html', htmlNotMinify);
// watch('src/assets/css/**/*.css', styles);
watch('src/assets/css/**/*.css', stylesDEV);
watch('src/img/svg/**/*.svg', svgSprites);
watch('src/js/**/*.js', scripts);

exports.dev = series(
  clean,
  fonts,
  sassTransform,
  htmlNotMinify,
  stylesDEV,
  scriptsDEV,
  images,
  svgSprites,
  watchFiles
);

exports.prod = series(
  clean,
  fonts,
  sassTransform,
  htmlMinify,
  styles,
  scripts,
  images,
  svgSprites,
  watchFiles
);
