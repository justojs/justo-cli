module.exports = function (grunt) {
    'use strict';
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-travis-lint');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-babel');
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        babel: {},
        clean: {},
        copy: {},
        jshint: {},
        mochaTest: {}
    });
    grunt.registerTask('default', []);
};