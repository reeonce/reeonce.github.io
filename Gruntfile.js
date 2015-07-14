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
                    dest: '_site/css/',
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
                    dest: '_site/css/',
                    ext: '.css'
                }]
            }
        },
        jade: {
            debug: {
                options: {
                    pretty: true
                },
                files: {
                    "_site/voice_tour.html": "_pages/voice_tour.jade"
                }
            },
            release: {
                options: {
                    pretty: false
                },
                files: {
                    "_site/voice_tour.html": "_pages/voice_tour.jade"
                }
            }
        },
        copy: {
            main: {
                files: [
                    {expand: true, cwd: 'bower_components/', src: '**', dest: '_site/bower_components'},
                    {expand: true, cwd: '_pages/', src: '**/*.html', dest: '_site/'},
                    {expand: true, src: ['statics/**', '!statics/less/**', '!statics/js/**'], dest: '_site/'}
                ]
            }
        },
        concat: {
            options: {
                stripBanners: true
            },
            voice_tour: {
                src: [
                    'statics/js/voice_tour.js',
                    'statics/js/locationService.js',
                    'statics/js/xjimiService.js',
                    'statics/js/soundService.js'
                ],
                dest: '_site/statics/js/voice_tour.js'
            }
        },
        uglify: {
            options: {
                compress: {
                    warnings: false
                },
                mangle: true,
                mangleProperties: true,
                preserveComments: false
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '_site/js/',
                    src: '**/*.js',
                    dest: '_site/js/'
                }]
            }
        },
        watch: {
            sass: {
                files: "scss/**/*.scss",
                tasks: "less:dev"
            },
            concat: {
                files: 'statics/js/**',
                tasks: 'concat'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['sass:dev', 'copy', 'concat']);
    grunt.registerTask('dist', ['sass:dist', 'copy', 'concat', 'uglify:dist']);
};
