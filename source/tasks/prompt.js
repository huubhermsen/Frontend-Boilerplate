module.exports = {
    target: {
        options: {
            questions: [{
                config: 'choosetask',
                type: 'list',
                message: 'What ya wanna do today?',
                default: 'Test',
                choices: ['Test', 'Build', 'Whateva']
            }],
            validate: function(value){
                var grunt = require('grunt');
                grunt.task.run(['default']);
                return true;
            }
        }
    }
}
