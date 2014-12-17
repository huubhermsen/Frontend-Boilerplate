module.exports = {
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
                    fs = require('fs');

                var output = './test.json';
                var data = grunt.config('config');

                /*
                fs.readFile(output, 'utf8', function(error, d){
                    if (error) grunt.log.writeln(error);
                    data = JSON.parse(d);
                    data.path.build = 'dist2';
                });


                fs.writeFile(output, JSON.stringify(data, null, 4), function(error){
                    if (error) {
                        grunt.log.writeln('I is having error, esse!');
                    } else {
                        grunt.log.writeln('Holy shit, I created something that works?');
                    }
                });*/

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
