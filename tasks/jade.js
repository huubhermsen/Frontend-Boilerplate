module.exports = {
    test: {
        options: {
            data: {
                debug: true,
                css_path: '<%= config.asset.css %>',
                image_path: '<%= config.asset.image %>',
                js_path: '<%= config.asset.js %>'
            },
            pretty: true
        },
        files: [{
            expand: true,
            cwd: '<%= config.path.source %>/jade',
            src: ['**/*.jade', '!layout/**/*.jade', '!includes/**/*.jade'],
            dest: '<%= config.path.test %>',
            ext: '.html'
        }]
    },
    build: {
        options: {
            data: {
                debug: false,
                build: true,
                css_path: '<%= config.asset.css %>',
                image_path: '<%= config.asset.image %>',
                js_path: '<%= config.asset.js %>'
            },
            pretty: true
        },
        files: [{
            expand: true,
            cwd: '<%= config.path.source %>/jade',
            src: ['**/*.jade', '!layout/**/*.jade', '!includes/**/*.jade'],
            dest: '<%= config.path.build %>',
            ext: '.html'
        }]
    }
}
