module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    watch: {
      karma: {
        files: ['angular-toggle-switch.js', 'test/{,**/}*.js', 'bootstrap3/*.less'],
        tasks: ['karma:unit']
      }
    },

    bump: {
      options: {
        commitMessage: 'chore: release v%VERSION%',
        commitFiles: ['package.json', 'bower.json', 'angular-toggle-switch.min.js'],
        files: ['package.json', 'bower.json'],
        pushTo: 'origin'
      }
    },

    less: {
      'style/default/angular-toggle-switch.css': ['style/default/angular-toggle-switch.less'],
      'style/bootstrap2/angular-toggle-switch-bootstrap-2.css': ['style/bootstrap2/angular-toggle-switch-bootstrap-2.less'],
      'style/bootstrap3/angular-toggle-switch-bootstrap-3.css': ['style/bootstrap3/angular-toggle-switch-bootstrap-3.less']
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      },
    },

    jshint: {
      all: ['Gruntfile.js', 'angular-toggle-switch.js', 'test/angular-toggle-switch.spec.js']
    },

    ngmin: {
      dist: {
        files: {
          'angular-toggle-switch.min.js': ['angular-toggle-switch.js']
        }
      }
    },

    'npm-contributors': {
      options: {
        commitMessage: 'chore: update contributors'
      }
    },

    uglify: {
      options: {
        mangle: false
      },
      dist: {
        files: {
          'angular-toggle-switch.min.js': ['angular-toggle-switch.min.js']
        }
      }
    }
  });

  grunt.registerTask('build', [
    'jshint:all',
    'ngmin',
    'uglify',
    'less'
  ]);

  grunt.registerTask('test', [
    'jshint:all',
    'karma:unit'
  ]);

  grunt.registerTask('release', 'Bump the version', function(type) {
    grunt.task.run([
      'build',
      'npm-contributors',
      'bump:' + (type ? type : 'patch')
    ]);
  });

  // Default task.
  grunt.registerTask('default', ['watch']);
};
