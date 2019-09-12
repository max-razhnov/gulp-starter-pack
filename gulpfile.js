const gulp = require("gulp");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const watch = require("gulp-watch");

gulp.task("message", function() {
  return console.log("gulp running...");
});

gulp.task("copyHtml", () => {
  gulp.src("src/*.html").pipe(gulp.dest("dist"));
});

gulp.task("minify", () => {
  gulp
    .src("src/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"));
});

gulp.task("sass", () => {
  gulp
    .src("src/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("dist/css"));
});

gulp.task("scripts", () => {
  gulp
    .src("src/*.js")
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"));
});

gulp.task(
  "default",
  gulp.parallel("message", "copyHtml", "minify", "sass", "scripts")
);

gulp.task("watch", () => {
  watch("src/*.js", ["scripts"]);
  watch("src/*.html", ["copyHtml"]);
  watch("src/*.scss", ["sass"]);
});
