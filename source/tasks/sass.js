module.exports = {
    options: {
        includePaths: ["<%= config.path.source %>/bower/normalize-scss/"]
    },
    dist: {
        expand: true,
        cwd: '<%= config.path.source %>/sass',
        src: ['*.scss'],
        dest: '<%= config.path.test %>/<%= config.asset.css %>',
        ext: '.css'
    }
}
