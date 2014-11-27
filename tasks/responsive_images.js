module.exports = {
    icons: {
        options: {
            sizes: [
                { width: '50%', name: 'default' },
                { width: '100%', name: 'retina' }
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
