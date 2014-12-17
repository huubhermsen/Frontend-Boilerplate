module.exports = {
    setup: {
        options: {
            questions: [{
                config: 'setuptest',
                type: 'input',
                message: 'Please choose a folder name for development',
                default: 'test',
                when: function(){
                    var grunt = require('grunt');

                    if (!grunt.file.isFile('./source/config/paths.json')) return true;
                    return false;
                }
            },{
                config: 'setupbuild',
                type: 'input',
                message: 'Please choose a folder name for production',
                default: 'dist',
                when: function(answers){
                    if (answers.setuptest === undefined) return false;
                    return true;
                }
            },{
                config: 'assetcss',
                type: 'input',
                message: 'Where do you want to store your CSS files?',
                default: 'asset/css',
                when: function(answers){
                    if (answers.setuptest === undefined) return false;
                    return true;
                }
            },{
                config: 'assetfont',
                type: 'input',
                message: 'Where do you want to store your webfonts?',
                default: 'asset/font',
                when: function(answers){
                    if (answers.setuptest === undefined) return false;
                    return true;
                }
            },{
                config: 'assetimage',
                type: 'input',
                message: 'Where do you want to store your images?',
                default: 'asset/image',
                when: function(answers){
                    if (answers.setuptest === undefined) return false;
                    return true;
                }
            },{
                config: 'assetjs',
                type: 'input',
                message: 'Where do you want to store your Javascript files?',
                default: 'asset/js',
                when: function(answers){
                    if (answers.setuptest === undefined) return false;
                    return true;
                }
            }],
            then: function(results, done){
                if (results.setuptest !== undefined) {
                    var grunt = require('grunt'),
                        fs = require('fs');

                    /** Setup paths */
                    grunt.config('config.path.source', 'source');
                    grunt.config('config.path.test', results.setuptest);
                    grunt.config('config.path.build', results.setupbuild);

                    /** Setup asset paths */
                    grunt.config('config.asset.css', results.assetcss);
                    grunt.config('config.asset.font', results.assetfont);
                    grunt.config('config.asset.image', results.assetimage);
                    grunt.config('config.asset.js', results.assetjs);

                    var data = grunt.config('config'),
                        output = "./source/config/paths.json";

                    fs.writeFile(output, JSON.stringify(data, null, 4), function(error){
                        if (error) grunt.log.writeln("Error: Path file couldn't be written");
                    });
                }

                done();
                return true;
            }
        }
    },
    target: {
        options: {
            questions: [{
                config: 'choosetask',
                type: 'list',
                message: 'What do you want to do today?',
                default: 'test',
                choices: [
                    { name: 'Start a development server', value: 'test' },
                    { name: 'Build project', value: 'build' },
                    { name: 'Bump version', value: 'bump' }
                ]
            },{
                config: 'testserver',
                type: 'input',
                message: 'Choose a server port',
                default: 9000,
                when: function(answers) {
                    if (answers.choosetask == 'test') return true;
                    return false;
                }
            },{
                config: 'rebuildtest',
                type: 'confirm',
                message: 'Rebuild test folder?',
                default: false,
                when: function(answers) {
                    if (answers.choosetask == 'test') return true;
                    return false;
                }
            }],
            then: function(results, done){
                var grunt = require('grunt'),
                    data = grunt.config('config');

                switch (results.choosetask) {
                    case 'test':
                        var tasks = [];

                        grunt.config('config.server.port', results.testserver);
                        grunt.config('config.server.livereload', results.testserver + 1);

                        if (!grunt.file.isDir(data.path.test) || results.rebuildtest) tasks.push('test');
                        tasks.push('serve');

                        grunt.task.run(tasks);
                        break;
                    case 'build':
                        grunt.task.run(['build']);
                        break;
                    case 'bump':
                        grunt.log.writeln('No bump functionality available yet...');
                        break;
                }

                done();
                return true;
            }
        }
    }
}
