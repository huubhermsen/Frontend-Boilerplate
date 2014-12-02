module.exports = {
    options: {
        keepSpecialComments: 0
    },
    minify: {
        expand: true,
        cwd: '<%= config.path.test %>/<%= config.asset.css %>',
        src: ['*.css'],
        dest: '<%= config.path.build %>/<%= config.asset.css %>',
        ext: '.css'
    }
}
