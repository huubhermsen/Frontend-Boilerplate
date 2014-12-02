module.exports = {
    files: {
        expand: true,
        cwd: '<%= config.path.test %>/<%= config.asset.css %>',
        src: ['**/*.css'],
        dest: '<%= config.path.test %>/<%= config.asset.css %>'
    }
}
