const { src, dest, watch, series } = require('gulp'); // npm i -D gulp
const sass = require('gulp-sass')(require('sass')); // npm i -D sass gulp-sass
const postcss = require('gulp-postcss'); // npm i -D gulp-postcss
const autoprefixer = require('autoprefixer'); // npm i -D autoprefixer
const sourcemaps = require('gulp-sourcemaps'); // npm i -D gulp-sourcemaps
const cssnano = require('cssnano'); // npm i -D cssnano

const imagemin = require('gulp-imagemin'); // npm i -D gulp-imagemin@7.1.0
const webp = require('gulp-webp'); // npm i -D gulp-webp
const avif = require('gulp-avif'); // npm i -D gulp-avif


function css(done) {
	src('./src/scss/app.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({ outputStyle: 'compressed' })) // expanded para debug and  compressed para minificar 
		.pipe(postcss([autoprefixer(), cssnano()]))
		.pipe(sourcemaps.write('.'))
		.pipe(dest('./build/css'))
	done();
};


function dev() {
	watch('./src/scss/**/*.scss', css);
	watch('./src/scss/**/', imagenes);
};


function imagenes(done) {
	src('./src/img/**/*')
		.pipe(imagemin({ optimizationLevel: 5 }))
		.pipe(dest('./build/img'))
	done();
};


function versionWebp(done) {
	const opciones = {
		quality: 50
	}

	src('./src/img/**/*.{jpg,png}')
		.pipe(webp(opciones))
		.pipe(dest('./build/img'))
	done();
};


function versionAvif(done) {
	const opciones = {
		quality: 50
	}

	src('./src/img/**/*.{jpg,png}')
		.pipe(avif(opciones))
		.pipe(dest('./build/img'))
	done();
};


exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default = series(imagenes, versionWebp, versionAvif, css, dev);

// npm i -D gulp sass gulp-sass gulp-postcss autoprefixer gulp-imagemin@7.1.0 gulp-webp gulp-avif gulp-sourcemaps cssnano