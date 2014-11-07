/**
 * Invoke strict mode
 */
"use strict"

/**
 * Setup paths
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

/**
 * Setup development server
 */
var server = {
	port: 9000,
	livereload: 9001,
	base: ['bower', path.test]
}

/**
 * Setup Grunt tasks
 */
module.exports = function(grunt){

	// Load all dependent npm tasks
	require('load-grunt-tasks')(grunt);

	// Configure Grunt and individual tasks
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		watch: {
			options: {
				livereload: server.livereload,
				spawn: false
			},
			coffee: {
				files: [path.source + '/coffee/**/*.coffee'],
				tasks: ['newer:coffee', 'uglify']
			},
			compass: {
				files: [path.source + '/sass/**/*.scss'],
				tasks: ['newer:compass', 'autoprefixer', 'cssmin']
			},
			image: {
				files: [path.source + 'image/**/*.{jpg,jpeg,gif,png,svg,bmp}'],
				tasks: ['copy:images', 'imagemin']
			},
			jade: {
				files: [path.source + '/jade/**/*.jade'],
				tasks: ['newer:jade']
			},
			javascript: {
				files: [path.source + '/javascript/**/*.js'],
				tasks: ['copy:javascript', 'uglify']
			},
			font: {
				files: [path.source + '/font/**/*.{ttf,otf,svg,woff,eot}'],
				tasks: ['copy:fonts']
			},
			sprites: {
				files: [path.source + 'sprite/**/*.{jpg,jpeg,gif,png}'],
				tasks: ['responsive_images', 'compass', 'imagemin']
			}
		},

		connect: {
			target: {
				options: server
			}
		},

		coffee: {
			options: {
				bare: true
			},
			build: {
				expand: true,
				cwd: path.source + '/coffee',
				src: ['**/*.coffee'],
				dest: path.test + asset.js,
				ext: '.js'
			}
		},

		uglify: {
			options: {
				mangle: {
					except: ['jQuery', 'Modernizr']
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

		autoprefixer: {
			files: {
				expand: true,
				cwd: path.test + asset.css,
				src: ['**/*.css'],
				dest: path.test + asset.css
			}
		},

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

		jade: {
			test: {
				options: {
					data: {
						debug: true,
						livereload: true,
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
					dest: path.build,
					ext: '.html'
				}]
			}
		},

		clean: {
			test: [path.test]
		},

		copy: {
			fonts: {
				files: [{
					expand: true,
					cwd: path.source + '/font',
					src: ['**'],
					dest: path.test + asset.font
				},{
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

	grunt.registerTask('test', ['clean:test', 'jade:test', 'responsive_images', 'compass', 'autoprefixer', 'coffee', 'copy:fonts', 'copy:images']);
	grunt.registerTask('production', ['jade:build', 'cssmin', 'bower_concat', 'uglify', 'imagemin']);
	grunt.registerTask('init', ['test', 'production']);
	grunt.registerTask('default', ['init', 'connect', 'watch']);
}







