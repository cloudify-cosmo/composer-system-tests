'use strict';
//var logger = require('log4js').getLogger('Gruntfile');

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        cfy:{
            all:{}
        },

        jshint: {
            options: {
                reporter: require('jshint-stylish'),
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'src/**/*.js',
                'spec/**/*.js',
                'spec_design/**/*.js'
            ]
        },
        protractor:{

            develop:{
                options: {
                    configFile:'protractor.conf.js',
                    args : { suite: '<%= suite %>' }
                }
            },
            applitools:{
                options: {
                    configFile: 'applitools.conf.js'
                }

            }
        },
        protractor_webdriver:{
            start:{

            }
        }
    });


    grunt.registerTask('applitools', [ 'protractor_webdriver','protractor:applitools' ]);

    grunt.registerTask('build', [ 'jshint' ]);

    grunt.registerTask('default', [ 'build' ]);

    grunt.registerTask('protract',function( suite ){
        suite = suite || 'sanity';
        grunt.config.data.suite = suite;

        console.log(grunt.template.process('<%= suite %>'));

        grunt.task.run(['protractor_webdriver', 'protractor:develop']);

    }); // [ 'protractor_webdriver','protractor:develop']);
};