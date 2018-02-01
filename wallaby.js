module.exports = function(wallaby) {
    // Babel, jest-cli and some other modules may be located under
    // react-scripts/node_modules, so need to let node.js know about it
    return {
        files: [
            'src/web/**/*.+(js|jsx|json|snap|css|less|sass|scss|jpg|jpeg|gif|png|svg)',
            '!src/web/**/*.spec.js?(x)',
        ],

        tests: ['src/web/**/*.spec.js?(x)'],

        env: {
            type: 'node',
            runner: 'node',
        },

        compilers: {
            '**/*.js?(x)': wallaby.compilers.babel({}),
        },

        setup: wallaby => {
            const jestConfig = require('./package.json').jest
            wallaby.testFramework.configure(jestConfig)
        },

        testFramework: 'jest',
    }
}
