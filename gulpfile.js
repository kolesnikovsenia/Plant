const project_folder = "dist";
const sorce_folder = "#src";

const path={
	build:{
		html: project_folder + "/",
		css: project_folder + "/css/",
		img: project_folder + "/img/",
		icons: project_folder + "/icons/",
	},
	src:{
		html: [sorce_folder + "/*.html", "!"+sorce_folder + "/_*.html"],
		css: sorce_folder + "/sass/*.sass", 
		img: sorce_folder + "/img/*.svg",
		icons: sorce_folder + "/icons/*.svg",
	},
	watch:{
		html: sorce_folder + "/**/*.html",
		css: sorce_folder + "/sass/**/*.sass",
		img: sorce_folder + "/img/*.svg",
		icons: sorce_folder + "/icons/*.svg",
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
	clean_css = require('gulp-clean-css'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify-es').default,
	webp = require('gulp-webp');

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
		.pipe(webp())
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
		.pipe(dest(path.build.css))
		.pipe (clean_css())
		.pipe(
			rename({
				extname: ".min.css"
			})
		)
		.pipe(dest(path.build.css))
		.pipe(browsersync.stream())
}

// function js() {
// 	return src(path.src.js)
// 		.pipe(fileinclude())
// 		.pipe(dest(path.build.js))
// 		.pipe(uglify())
// 		.pipe(
// 			rename({
// 				extname: ".min.js"
// 			})
// 		)
// 		.pipe(dest(path.build.js))
// 		.pipe(browsersync.stream())
// }

function icons() {
	return src(path.src.icons)
		.pipe(dest(path.build.icons))
		.pipe(browsersync.stream())
}

function images() {
	return src(path.src.img)
		.pipe(dest(path.build.img))
		.pipe(browsersync.stream())
}

function watchFiles(params) {
	gulp.watch([path.watch.html], html);
	gulp.watch([path.watch.css], css);
	// gulp.watch([path.watch.js], js);
	gulp.watch([path.watch.img], images);
	gulp.watch([path.watch.icons], icons);
}

function clean(params) {
	return del(path.clean);
}

const build = gulp.series(clean, gulp.parallel(css, html, images, icons)); 
const watch = gulp.parallel(build, watchFiles, browserSync);

exports.images = images;
exports.icons = icons;
// exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;