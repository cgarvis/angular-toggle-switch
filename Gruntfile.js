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

    bump: {
      options: {
        commitMessage: 'chore: release v%VERSION%',
        commitFiles: ['package.json', 'bower.json', 'angular-toggle-switch.min.js'],
        files: ['package.json', 'bower.json'],
        pushTo: 'master'
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js'
      },
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
    'ngmin',
    'uglify'
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
