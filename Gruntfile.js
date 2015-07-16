module.exports = function (grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dev: {
                options: {
                    style: "expanded",
                    loadPath: ['bower_components/foundation/scss'],
                    trace: true
                },
                files: [{
                    expand: true,
                    cwd: 'scss/',
                    src: ['**/*.scss'],
                    dest: 'css/',
                    ext: '.css'
                }]
            },
            dist: {
                options: {
                    loadPath: ['bower_components/foundation/scss'],
                    style: "compressed"
                },
                files: [{
                    expand: true,
                    cwd: 'scss/',
                    src: ['**/*.scss'],
                    dest: 'css/',
                    ext: '.css'
                }]
            }
        },
        copy: {
            main: {
                files: [
                    {expand: true, cwd: 'scss/', src: '**/.css', dest: 'css/'}
                ]
            }
        },
        watch: {
            sass: {
                files: "scss/**/*.scss",
                tasks: "sass:dev"
            },
            copy: {
                files: "scss/**/*.css",
                tasks: "copy"
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.loadNpmTasks('grunt-contrib-watch');
    // Default task(s).
    grunt.registerTask('default', ['sass:dev', 'copy']);
    grunt.registerTask('dist', ['sass:dist', 'copy']);
};
