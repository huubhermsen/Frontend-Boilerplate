module.exports = {
    options: {
        livereload: '<%= config.server.livereload %>',
        spawn: false // Set to true to enable child processes.
    },
    coffee: {
        files: ['<%= config.path.source %>/coffee/**/*.coffee'],
        tasks: ['coffee']
    },
    sass: {
        files: ['<%= config.path.source %>/sass/**/*.scss'],
        tasks: ['sass', 'autoprefixer']
    },
    image: {
        files: ['<%= config.path.source %>/image/**/*.{jpg,jpeg,gif,png,svg,bmp}'],
        tasks: ['copy:images']
    },
    jade: {
        files: ['<%= config.path.source %>/jade/**/*.jade'],
        tasks: ['jade:test']
    },
    javascript: {
        files: ['<%= config.path.source %>/javascript/**/*.js'],
        tasks: ['copy:javascript']
    },
    font: {
        files: ['<%= config.path.source %>/font/**/*.{ttf,otf,svg,woff,eot}'],
        tasks: ['copy:fonts_test']
    },
    sprites: {
        files: ['<%= config.path.source %>/sprite/**/*.{jpg,jpeg,gif,png}'],
        tasks: ['responsive_images', 'sprite', 'sass']
    }
}
