module.exports = {
    target: {
        options: {
            port: '<%= config.server.port %>',
            livereload: '<%= config.server.livereload %>',
            base: ['bower', '<%= config.path.test %>']
        }
    }
}
