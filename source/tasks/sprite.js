module.exports = {
    def: {
        src: "<%= config.path.test %>/<%= config.asset.image %>/sprites/standard/*.png",
        destImg: "<%= config.path.test %>/<%= config.asset.image %>/sprites/standard-sprite.png",
        destCSS: "<%= config.path.source %>/sass/core/_sprites.scss",
        imgPath: "../image/sprites/standard-sprite.png",
        cssTemplate: "<%= config.path.source %>/config/scss.mustache",
        cssOpts: {
            path: "../image/sprites/standard-sprite.png"
        }
    }
}
