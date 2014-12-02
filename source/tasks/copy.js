module.exports = {
    fonts_test: {
        files: [{
            expand: true,
            cwd: '<%= config.path.source %>/font',
            src: ['**'],
            dest: '<%= config.path.test %>/<%= config.asset.font %>'
        }]
    },
    fonts_build: {
        files: [{
            expand: true,
            cwd: '<%= config.path.source %>/font',
            src: ['**'],
            dest: '<%= config.path.build %>/<%= config.asset.font %>'
        }]
    },
    images: {
        files: [{
            expand: true,
            cwd: '<%= config.path.source %>/image',
            src: ['**'],
            dest: '<%= config.path.test %>/<%= config.asset.image %>'
        }]
    }
}
