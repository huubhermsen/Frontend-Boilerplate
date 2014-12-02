module.exports = {
    target: {
        options: {
            port: '<%= config.server.port %>',
            livereload: '<%= config.server.livereload %>',
            base: ['source/bower', '<%= config.path.test %>']
        }
    }
}
