module.exports = {
    target: {
        options: {
            port: '<%= config.server.port %>',
            livereload: '<%= config.server.livereload %>',
            base: ['<%= config.path.source %>/bower', '<%= config.path.test %>']
        }
    }
}
