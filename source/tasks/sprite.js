module.exports = {
    retina3: {
        src: "<%= config.path.test %>/<%= config.asset.image %>/sprites/3x/*.png",
        destImg: "<%= config.path.test %>/<%= config.asset.image %>/sprites/3x-sprite.png",
        destCSS: "<%= config.path.source %>/sass/core/_sprites.scss"
    },
    retina: {
        src: "<%= config.path.test %>/<%= config.asset.image %>/sprites/2x/*.png",
        destImg: "<%= config.path.test %>/<%= config.asset.image %>/sprites/2x-sprite.png",
        destCSS: "<%= config.path.source %>/sass/core/_sprites.scss"
    },
    standard: {
        src: "<%= config.path.test %>/<%= config.asset.image %>/sprites/standard/*.png",
        destImg: "<%= config.path.test %>/<%= config.asset.image %>/sprites/standard-sprite.png",
        destCSS: "<%= config.path.source %>/sass/core/_sprites.scss",
        imgPath: "../image/sprites/standard-sprite.png",
        cssTemplate: "<%= config.path.source %>/config/scss.mustache",
        cssOpts: {
            path: "../image/sprites/standard-sprite.png",
            retinaPath: "../image/sprites/2x-sprite.png",
            retina3Path: "../image/sprites/3x-sprite.png"
        }
    }
}
