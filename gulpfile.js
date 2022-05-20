const project_folder = "dist";
const sorce_folder = "#src";

const path={
	build:{
		html: project_folder + "/",
		css: project_folder + "/css/",
		img: project_folder + "/img/",
		icon: project_folder + "/icon/",
	},
	src:{
		html: [sorce_folder + "/*.html", "!"+sorce_folder + "/_*.html"],
		css: sorce_folder + "/sass/*.sass", 
		img: sorce_folder + "/img/",
		icon: sorce_folder + "/icon/",
	},
	watch:{
		html: sorce_folder + "/**/*.html",
		css: sorce_folder + "/sass/**/*.sass",
		img: sorce_folder + "/img/",
		icon: sorce_folder + "/icon/",
	},
	clean: "./" + project_folder + "/"
}

const {src,dest} = require('gulp'),
	gulp=require('gulp'),
	browsersync = require('browser-sync').create(),
	fileinclude = require('gulp-file-include'),
	del = require('del'),
	scss = require('gulp-sass') (require('sass')),
	autoprefixer = require('gulp-autoprefixer'),
	group_media = require('gulp-group-css-media-queries'),
	clean_css = require('gulp-clean-css');

function browserSync(params) {
	browsersync.init({
		server:{
			baseDir: "./"+project_folder+"/"
		},
		port: 5000,
		notify: false
	})
}

function html() {
	return src(path.src.html)
		.pipe(fileinclude())
		.pipe(dest(path.build.html))
		.pipe(browsersync.stream())
}

function css() {
	return src(path.src.css)
		.pipe(
			scss({
				outputStyle: "expanded"
			})
		)
		.pipe(
			group_media()
		)
		.pipe(
			autoprefixer({
				overrideBrowserslist: ["last 5 version"],
				cascade: true
			})
		)
		.pipe (clean_css())
		.pipe(dest(path.build.css))
		.pipe(browsersync.stream())
}

function watchFiles(params) {
	gulp.watch([path.watch.html], html);
	gulp.watch([path.watch.css], css);
}

function clean(params) {
	return del(path.clean);
}

const build = gulp.series(clean, gulp.parallel(css, html)); 
const watch = gulp.parallel(build, watchFiles, browserSync);

exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;