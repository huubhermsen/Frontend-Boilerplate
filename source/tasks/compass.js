module.exports = {
    dist: {
        options: {
            require: ['compass-normalize', 'susy'],
            sassDir: '<%= config.path.source %>/sass',
            cssDir: '<%= config.path.test %>/<%= config.asset.css %>',
            imagesDir: '<%= config.path.test %>/<%= config.asset.image %>',
            generatedImagesDir: '<%= config.path.test %>/<%= config.asset.image %>',
            relativeAssets: true
        }
    }
}
