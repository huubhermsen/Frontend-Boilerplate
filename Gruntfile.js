/*!
 *  Invoke strict mode
 */
"use strict"

/*!
 *  Setup Grunt tasks
 */
module.exports = function(grunt){

    /*!
     *  Load individual Grunt tasks
     */
    function loadTasks(path) {
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
        config: (grunt.file.isFile('config.json')) ? grunt.file.readJSON('config.json') : {}
    };

    /*!
     *  Extend Grunt config and init configuration
     */
    grunt.util._.extend(config, loadTasks('./source/tasks/'));
    //grunt.config.merge(loadTasks('./source/tasks/'));
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
    grunt.registerTask('test', ['clean:test', 'jade:test', 'responsive_images', 'sass', 'autoprefixer', 'coffee', 'copy:fonts_test', 'copy:images']);
    grunt.registerTask('serve', ['connect', 'watch']);
    grunt.registerTask('build', ['clean:build', 'jade:build', 'sass', 'autoprefixer', 'cssmin', 'coffee', 'eslint', 'bower_concat', 'uglify', 'copy:images', 'imagemin', 'copy:fonts_build']);
    grunt.registerTask('default', ['prompt']);
}
