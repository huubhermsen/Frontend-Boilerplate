module.exports = {
    options: {
        bare: true // Set to false to include anominous function wrapper
    },
    build: {
        expand: true,
        cwd: '<%= config.path.source %>/coffee',
        src: ['**/*.coffee'],
        dest: '<%= config.path.test %>/<%= config.asset.js %>',
        ext: '.js'
    }
}
