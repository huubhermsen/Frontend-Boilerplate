/*!
 *  Invoke strict mode
 */
"use strict"

/*!
 *  Setup Grunt tasks
 */
module.exports = function(grunt){

    function loadConfig(path) {
        var glob = require('glob'),
            object = {},
            key;

        glob.sync('*', { cwd: path }).forEach(function(option) {
            key = option.replace(/\.js$/,'');
            object[key] = require(path + option);
        });

        return object;
    }

    /*!
     *  Configure Grunt
     *  More info: http://gruntjs.com/configuring-tasks
     */
    var config = {
        pkg: grunt.file.readJSON('package.json'),
        config: grunt.file.readJSON('config.json')
    };

    /*!
     *  Extend Grunt config and init configuration
     */
    grunt.util._.extend(config, loadConfig('./tasks/'));
    grunt.initConfig(config);

    /*!
     *  Load all dependent npm tasks (def|dev|peer)
     *  More info: https://github.com/sindresorhus/load-grunt-tasks
     */
    require('load-grunt-tasks')(grunt);

    /*!
     *  Register grunt tasks
     *  Default task clears test folder and creates a new test environment
     *  Build tasks clears build folder, runs test task, concatenates used bower files and minifies JS and CSS
     *  More info: http://gruntjs.com/creating-tasks
     */
    grunt.registerTask('test', ['clean:test', 'jade:test', 'responsive_images', 'compass', 'autoprefixer', 'coffee', 'copy:fonts_test', 'copy:images']);
    grunt.registerTask('build', ['test', 'clean:build', 'jade:build', 'cssmin', 'bower_concat', 'uglify', 'imagemin', 'copy:fonts_build']);
    grunt.registerTask('default', ['test', 'connect', 'watch']);
}
