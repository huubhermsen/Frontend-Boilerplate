module.exports = {
    all: {
        dest: '<%= config.path.test %>/<%= config.asset.js %>/lib/bower.js',
        exclude: ['modernizr'],
        mainFiles: {
            'greensock': [
                'src/uncompressed/TweenLite.js',
                'src/uncompressed/plugins/ScrollToPlugin.js',
                'src/uncompressed/easing/EasePack.js'
            ]
        }
    },
    modernizr: {
        dest: '<%= config.path.test %>/<%= config.asset.js %>/ext/modernizr.js',
        include: ['modernizr']
    }
}
