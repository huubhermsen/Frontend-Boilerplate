module.exports = {
    icons: {
        options: {
            sizes: [
                { width: '33.3333334%', name: 'standard' },
                { width: '66.6666667%', name: '2x' },
                { width: '100%', name: '3x' }
            ]
        },
        files: [{
            expand: true,
            cwd: '<%= config.path.source %>/sprite',
            src: [ '*.{jpg,gif,png}' ],
            custom_dest: '<%= config.path.test %>/<%= config.asset.image %>' + '/sprites/{%= name %}/'
        }]
    }
}
