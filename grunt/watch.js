module.exports = {
    ts: {
        files: ['src/main/ts/**/*.ts', 'src/main/ts/**/*.tsx'],
        tasks: ['webpack:local'],
        options: {
            spawn: false
        }
    },
    sass: {
        files: ['src/main/sass/**/*.scss'],
        tasks: ['sass'],
        options: {
            spawn: false
        }
    }
};