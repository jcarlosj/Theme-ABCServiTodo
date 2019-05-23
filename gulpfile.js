// Imports
const { src, dest, series, parallel, watch } = require( 'gulp' ),
      browserSync = require( 'browser-sync' ) .create(),
      sass = require( 'gulp-sass'),
      imagemin = require( 'gulp-imagemin' ),
      cache = require( 'gulp-cache' ); // Archivos de caché en secuencia para su uso posterior. 

// Task: Compile Sass into CSS & auto-inject browsers
function scss() {
    return src(
            [ 
                './node_modules/bootstrap/scss/bootstrap.scss',
                './src/assets/scss/**/**/**/**/*.scss' 
            ]
        )
        .pipe( sass() )
        .pipe( dest( './dist/assets/css' ) )
        .pipe( browserSync .stream() );
}

// Task: Move the JavaScript files into our /dist/js folder
function js() {
    return src(
            [ 
                './node_modules/jquery/dist/jquery.min.js',
                './node_modules/bootstrap/dist/js/bootstrap.min.js',
                './src/assets/js/carousel.js'  
            ]
        )
        .pipe( dest( './dist/assets/js' ) )
        .pipe( browserSync .stream() );
}

// Minimiza imágenes PNG, JPEG, GIF y SVG.
function images() {
	return src( './src/assets/images/**/*.{png,jpg,gif,svg}' )
		.pipe(
			cache(
				imagemin([
					imagemin .gifsicle({ interlaced: true }),
					imagemin .jpegtran({ progressive: true }),
					imagemin .optipng({ optimizationLevel: 3 }), // 0-7 low-high.
					imagemin .svgo({
						plugins: [ { removeViewBox: true }, { cleanupIDs: false } ]
					})
				])
			)
		)
		.pipe( dest( './dist/assets/images/' ) );
}

// Static Server + Watching scss/html files
function serve() {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: './'   // root file (index.html)
        }
    });

    watch(
        [
            './node_modules/boostrap/scss/bootstrap.scss',
            './src/assets/scss/**/**/**/**/*.scss',
            './src/assets/js/*.js',
            './src/assets/images/*.{jpg,jpeg,png,gif,svg}}'
        ],
        series( scss ,js, images )
    );
    watch( '*.html' ) .on( 'change', browserSync .reload );
}

// Exports
module .exports = {
    default: series( images, parallel( scss, js ), serve ),
    images,
    scss
}