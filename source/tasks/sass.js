module.exports = {
    options: {
        includePaths: ["<%= config.path.source %>/bower/normalize-scss/"]
    },
    dist: {
        files: { "<%= config.path.test %>/<%= config.asset.css %>/default.css": "<%= config.path.source %>/sass/default.scss" }
    }
}
