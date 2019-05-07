// Imports
const { src, dest, series, parallel, watch } = require( 'gulp' ),
      browserSync = require( 'browser-sync' ) .create(),
      sass = require( 'gulp-sass');

// Task: Compile Sass into CSS & auto-inject browsers
function scss() {
    return src(
            [ 
                './node_modules/bootstrap/scss/bootstrap.scss',
                './src/assets/scss/*.scss' 
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
                './node_modules/bootstrap/dist/js/bootstrap.min.js' 
            ]
        )
        .pipe( dest( './dist/assets/js' ) )
        .pipe( browserSync .stream() );
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
            './src/assets/scss/*.scss'
        ],
        series( scss )
    );
    watch( '*.html' ) .on( 'change', browserSync .reload );
}

// Exports
module .exports = {
    default: series( parallel( scss, js ), serve ),
    scss
}