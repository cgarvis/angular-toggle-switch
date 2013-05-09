module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    watch: {
      karma: {
        files: ['angular-toggle-switch.js', 'test/{,**/}*.js'],
        tasks: ['karma:unit:run']
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js'
      },
    },

    uglify: {
      options: {
        mangle: false
      },
      dist: {
        files: {
          'angular-toggle-switch.min.js': ['angulat-toggle-switch.js']
        }
      }
    }
  });

  grunt.registerTask('build', [
    'ngmin',
    'uglify'
  ]);

  // Default task.
  grunt.registerTask('default', ['watch']);
};
