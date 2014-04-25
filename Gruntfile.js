module.exports = function(grunt) {

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n\n'
      },
      build: {
        src: 'public/assets/app.js',
        dest: 'public/assets/app.js'
      }
    },
    watch: {
      scripts: {
        files: ['assets/**/*.js'],
        tasks: ['concat'],
        options: {
          spawn: false,
        },
      },
    },
    concat: {
      options: {
        separator: ';\n',
      },
      dist: {
        src: ['assets/js/*.js'],
        dest: 'public/assets/app.js',
      },
    },
    sass: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        outputStyle: 'compressed'
      },
      dist: {
        files: {
          'public/assets/app.css': 'assets/scss/app.scss'
        }
      }
    },
    digest: {
      options: {
        // Task-specific options go here
        out: 'manifest.json',
        separator: '-',
        algorithm: 'md5'
      },
      files: {
        // Target-specific file lists
        src: ['public/assets/app.js', 'public/assets/app.css']
      },
    },
    clean: {
      build: {
        src: ['public/assets/app.js', 'public/assets/app.css']
      }
    },
    watch: {
      scripts: {
        files: [
          'assets/**/*'
        ],
        tasks: ['default']
      },
    },
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-digest');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task
  grunt.registerTask('heroku',  ['sass', 'concat', 'uglify', 'digest', 'clean']);
  grunt.registerTask('default', ['sass', 'concat']);

};
