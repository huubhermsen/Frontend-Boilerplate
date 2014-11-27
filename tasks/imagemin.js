module.exports = {
    production: {
        files: [{
            expand: true,
            cwd: '<%= config.path.test %>/<%= config.asset.image %>',
            src: ['**/*.{jpg,jpeg,gif,png,svg,bmp}', '!sprites/default/*', '!sprites/retina/*'],
            dest: '<%= config.path.build %>/<%= config.asset.image %>'
        }]
    }
}
