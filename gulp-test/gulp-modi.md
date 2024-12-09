const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const rename = require("gulp-rename");
const csso = require("postcss-csso");
const htmlmin = require("gulp-htmlmin");
const terser = require("gulp-terser");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const del = require("del");

/*
минификация styles > style.min.css
const rename = require("gulp-rename");
const csso = require("postcss-csso");

    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("source/css"))
*/

/*
РАСШИФРОВКА
const gulp = require("gulp");
const htmlmin = require("gulp-htmlmin");

const html = () => { СОЗДАЙ функцию html для минификации файлов html
  return gulp.src("source/*.html") //найди все файлы с расширением .html в папке source
  .pipe(htmlmin({ collapseWhitespace: true })) //выполни минификацию
  .pipe(gulp.dest("build")); //положи в папку build
}
! файл index.html будет заменен (посмотреть в прежнем формате можно в инспекторе отладчик>index)

exports.html = html; //экспортируй функцию

>package.json
"scripts": { //команда для запуска функции
    "html" : "gulp html"
}
*/

// Watcher - осслеживание изменений в файле

const watcher = () => {
  gulp.watch("source/less/**/*.less", gulp.series("styles"));
  gulp.watch("source/js/*.js", gulp.series(scripts));
  gulp.watch("source/*.html").on("change", sync.reload);
}

exports.default = gulp.series(
  styles, server, watcher
);

// Build - собери все задачи воедино при запуске gulp build

const build = gulp.series(
  gulp.parallel(
    styles,
    html,
  ),
);

exports.build = build;



.................................

// Scripts
/*
const scripts = () => {
  return gulp.src("source/js/*.js")
    .pipe(gulp.dest("build/js"))
    .pipe(terser()) //min
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest("build/js"))
    .pipe(sync.stream());
}

exports.scripts = scripts;

// Images - ПРОБЛЕМЫ!

const optimizeImages = () => {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.mozjpeg({ progressive: true }),
      imagemin.optipng({ optimizationLevel: 3 }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"))
}

exports.images = optimizeImages;

const copyImages = () => { //команда для копирования картинок в неоптимизирванном формате
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(gulp.dest("build/img"))
}

exports.images = copyImages;

// WebP -ЗДЕСЬ ПРОБЛЕМА!

const createWebp = () => {
  return gulp.src("source/img/**/*.{jpg,png}")
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest("build/img"))
}

exports.createWebp = createWebp;

// Sprite

const sprite = () => {
  return gulp.src("source/img/icons/*.svg") //возьми все иконки из папки icons
    .pipe(svgstore({ //преврати в спрайт
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
}

exports.sprite = sprite;

// Copy

const copy = (done) => { //минимизируй все остальные части
  gulp.src([
    "source/fonts/*.{woff2,woff}",
    "source/*.ico",
    "source/img/**/*.svg",
    "!source/img/icons/*.svg",
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"))
  done();
}

exports.copy = copy;

// Clean

const clean = () => {
  return del("build");
};

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Reload

const reload = (done) => {
  sync.reload();
  done();
}

// Watcher - осслеживание изменений в файле

const watcher = () => {
  gulp.watch("source/less/**/*.less", gulp.series("styles"));
  gulp.watch("source/js/*.js", gulp.series(scripts));
  gulp.watch("source/*.html").on("change", sync.reload);
}

/*exports.default = gulp.series(
  styles, server, watcher
);*/

// Build - собери все задачи воедино при запуске gulp build

const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    sprite,
    createWebp
  ),
);

exports.build = build;

// Default

exports.default = gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    sprite,
    createWebp
  ),
  gulp.series(
    server,
    watcher
  ));
