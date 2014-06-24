module.exports = function (grunt) {
  // load all grunt tasks automatically
	require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    watch: {
      karma: {
        files: ['angular-toggle-switch.js', 'test/{,**/}*.js'],
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

    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
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
    },
		less: {
			options: {
				relativeUrls: true
			},
			serve: {
				files: [
					{
						src: 'src/less/bootstrap3/build.less',
						dest: 'angular-toggle-switch-bootstrap.css'
					}
				]
			}
		}
  });

  grunt.registerTask('build', [
    'less',
    'jshint:all',
    'ngmin',
    'uglify'
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
