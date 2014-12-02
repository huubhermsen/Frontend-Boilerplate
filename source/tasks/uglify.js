module.exports = {
    options: {
        mangle: {
            except: ['jQuery']
        },
        compress: {
            drop_console: true
        }
    },
    javascript: {
        files: [{
            src: [
                '<%= config.path.test %>/<%= config.asset.js %>/lib/**/*.js',
                '<%= config.path.test %>/<%= config.asset.js %>/plugins/**/*.js',
                '<%= config.path.test %>/<%= config.asset.js %>/default/**/*.js'
            ],
            dest: '<%= config.path.build %>/<%= config.asset.js %>/all.js'
        },{
            src: ['<%= config.path.test %>/<%= config.asset.js %>/ext/modernizr.js'],
            dest: '<%= config.path.build %>/<%= config.asset.js %>/modernizr.min.js'
        }]
    }
}
