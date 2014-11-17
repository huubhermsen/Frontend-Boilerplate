/*!
 *  Invoke strict mode
 */
"use strict"

/*!
 *  Setup paths
 */
var path = {
    source: 'source',
    test: 'test',
    build: 'build'
}

var asset = {
    css: '/asset/css',
    font: '/asset/font',
    image: '/asset/image',
    js: '/asset/js'
}

/*!
 *  Add a production url to nicely prepend url to asset paths
 *  For example: http://www.expample.com (don't add traling slash)
 */
var productionUrl = '';

/*!
 *  Development server configuration
 */
var server = {
    port: 9000,
    livereload: 9001,
    base: ['bower', path.test]
}

/*!
 *  Setup Grunt tasks
 */
module.exports = function(grunt){

    /*!
     *  Load all dependent npm tasks (def|dev|peer)
     *  More info: https://github.com/sindresorhus/load-grunt-tasks
     */
    require('load-grunt-tasks')(grunt);

    /*!
     *  Configure Grunt and individual tasks
     *  More info: http://gruntjs.com/configuring-tasks
     */
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /*!
         *  Grunt watch configuration sets up the file watchers and corresponding tasks
         *  More info: https://github.com/gruntjs/grunt-contrib-watch
         */
        watch: {
            options: {
                livereload: server.livereload,
                spawn: true // Set to false to disable child processes. Faster, yet also more prone to failing
            },
            coffee: {
                files: [path.source + '/coffee/**/*.coffee'],
                tasks: ['coffee']
            },
            compass: {
                files: [path.source + '/sass/**/*.scss'],
                tasks: ['compass', 'autoprefixer']
            },
            image: {
                files: [path.source + 'image/**/*.{jpg,jpeg,gif,png,svg,bmp}'],
                tasks: ['copy:images']
            },
            jade: {
                files: [path.source + '/jade/**/*.jade'],
                tasks: ['jade:test']
            },
            javascript: {
                files: [path.source + '/javascript/**/*.js'],
                tasks: ['copy:javascript']
            },
            font: {
                files: [path.source + '/font/**/*.{ttf,otf,svg,woff,eot}'],
                tasks: ['copy:fonts_test']
            },
            sprites: {
                files: [path.source + 'sprite/**/*.{jpg,jpeg,gif,png}'],
                tasks: ['responsive_images', 'compass']
            }
        },

        /*!
         *  Establish a test url at http://localhost:{server port}
         *  More info: https://github.com/gruntjs/grunt-contrib-connect
         */
        connect: {
            target: {
                options: server
            }
        },

        /*!
         *  Coffeescript settings
         *  More info: https://github.com/gruntjs/grunt-contrib-coffee
         */
        coffee: {
            options: {
                bare: true // Set to false to include anominous function wrapper
            },
            build: {
                expand: true,
                cwd: path.source + '/coffee',
                src: ['**/*.coffee'],
                dest: path.test + asset.js,
                ext: '.js'
            }
        },

        /*!
         *  Uglifies Javascript files
         *  More info: https://github.com/gruntjs/grunt-contrib-uglify
         */
        uglify: {
            options: {
                mangle: {
                    except: ['jQuery']
                },
                compress: {
                    drop_console: true
                }
            },
            javascript: {
                files: [{
                    src: [
                        path.test + asset.js + '/lib/**/*.js',
                        path.test + asset.js + '/plugins/**/*.js',
                        path.test + asset.js + '/default/**/*.js'
                    ],
                    dest: path.build + asset.js + '/all.js'
                },{
                    src: [path.test + asset.js + '/ext/modernizr.js'],
                    dest: path.build + asset.js + '/modernizr.min.js'
                }]
            }
        },

        /*!
         *  Concatenates used bower files to single bower.js in test folder
         *  More info: https://github.com/sapegin/grunt-bower-concat
         */
        bower_concat: {
            all: {
                dest: path.test + asset.js + '/lib/bower.js',
                exclude: ['modernizr']
            },
            modernizr: {
                dest: path.test + asset.js + '/ext/modernizr.js',
                include: ['modernizr']
            }
        },

        /*!
         *  Parse sass files to css and create sprites if sprite mixin is enabled
         *  More info: https://github.com/gruntjs/grunt-contrib-compass
         */
        compass: {
            dist: {
                options: {
                    require: ['compass-normalize', 'susy'],
                    sassDir: path.source + '/sass',
                    cssDir: path.test + asset.css,
                    imagesDir: path.test + asset.image,
                    generatedImagesDir: path.test + asset.image,
                    relativeAssets: true
                }
            }
        },

        /*!
         *  Use autoprefixer to automaticly add/remove vendor prefixes in CSS files
         *  More info: https://github.com/nDmitry/grunt-autoprefixer
         */
        autoprefixer: {
            files: {
                expand: true,
                cwd: path.test + asset.css,
                src: ['**/*.css'],
                dest: path.test + asset.css
            }
        },

        /*!
         *  Minify rendered and auto-prefixed CSS
         *  More info: https://github.com/gruntjs/grunt-contrib-cssmin
         */
        cssmin: {
            options: {
                keepSpecialComments: 0
            },
            minify: {
                expand: true,
                cwd: path.test + asset.css,
                src: ['*.css'],
                dest: path.build + asset.css,
                ext: '.css'
            }
        },

        /*!
         *  Compile jade files to HTML
         *  More info: https://github.com/gruntjs/grunt-contrib-jade
         */
        jade: {
            test: {
                options: {
                    data: {
                        debug: true,
                        port: server.livereload,
                        css_path: asset.css,
                        image_path: asset.image,
                        js_path: asset.js
                    },
                    pretty: true
                },
                files: [{
                    expand: true,
                    cwd: path.source + '/jade',
                    src: ['**/*.jade', '!layout/**/*.jade', '!includes/**/*.jade'],
                    dest: path.test,
                    ext: '.html'
                }]
            },
            build: {
                options: {
                    data: {
                        debug: false,
                        build: true,
                        css_path: productionUrl + asset.css,
                        image_path: productionUrl + asset.image,
                        js_path: productionUrl + asset.js
                    },
                    pretty: true
                },
                files: [{
                    expand: true,
                    cwd: path.source + '/jade',
                    src: ['**/*.jade', '!layout/**/*.jade', '!includes/**/*.jade'],
                    dest: path.build,
                    ext: '.html'
                }]
            }
        },

        /*!
         *  Remove test folder on grunt:init
         *  More info: https://github.com/gruntjs/grunt-contrib-clean
         */
        clean: {
            test: [path.test]
        },

        /*!
         *  Copy static files from source folder to test folder and test folder to build folder
         *  More info: https://github.com/gruntjs/grunt-contrib-copy
         */
        copy: {
            fonts_test: {
                files: [{
                    expand: true,
                    cwd: path.source + '/font',
                    src: ['**'],
                    dest: path.test + asset.font
                }]
            },
            fonts_build: {
                files: [{
                    expand: true,
                    cwd: path.source + '/font',
                    src: ['**'],
                    dest: path.build + asset.font
                }]
            },
            images: {
                files: [{
                    expand: true,
                    cwd: path.source + '/image',
                    src: ['**'],
                    dest: path.test + asset.image
                }]
            }
        },

        /*!
         *  Renders the retina sized icons from the source folder to usable sizes for the sprite mixin in Compass
         *  More info: https://github.com/andismith/grunt-responsive-images
         */
        responsive_images: {
            icons: {
                options: {
                    sizes: [
                        { width: '50%', name: 'default' },
                        { width: '100%', name: 'retina' }
                    ]
                },
                files: [{
                    expand: true,
                    cwd: path.source + '/sprite',
                    src: [ '*.{jpg,gif,png}' ],
                    custom_dest: path.test + asset.image + '/sprites/{%= name %}/'
                }]
            }
        },

        /*!
         *  Optimizes all images in build folder
         *  More info: https://github.com/gruntjs/grunt-contrib-imagemin
         */
        imagemin: {
            production: {
                files: [{
                    expand: true,
                    cwd: path.test + asset.image,
                    src: ['**/*.{jpg,jpeg,gif,png,svg,bmp}', '!sprites/default/*', '!sprites/retina/*'],
                    dest: path.build + asset.image
                }]
            }
        }
    });

    /*!
     *  Register grunt tasks
     *  Default task clears test folder and creates a new test environment
     *  More info: http://gruntjs.com/creating-tasks
     */
    grunt.registerTask('test', ['clean:test', 'jade:test', 'responsive_images', 'compass', 'autoprefixer', 'coffee', 'copy:fonts_test', 'copy:images']);
    grunt.registerTask('build', ['jade:build', 'cssmin', 'bower_concat', 'uglify', 'imagemin', 'copy:fonts_build']);
    grunt.registerTask('default', ['test', 'connect', 'watch']);
}







