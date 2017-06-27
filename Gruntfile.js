module.exports = function(grunt) {

    var gruntBase = require('./vendor/proyecto-base/grunt.base.js');
    var buildConfig = require('./vendor/proyecto-base/build.config.js');

    buildConfig.context = 'www/miplataforma-web/servicios';

    grunt.initConfig(grunt.util._.extend(gruntBase.getConfig(grunt), buildConfig));
    gruntBase.init(grunt);
};