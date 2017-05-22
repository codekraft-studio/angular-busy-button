module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    watch: {
      scripts: {
        files: ['src/*.js'],
        tasks: ['concat', 'uglify'],
        options: {
          livereload: true
        }
      }
    },

    concat: {
      options: {
        stripBanners: true,
        banner: '/* <%= pkg.name %> - v<%= pkg.version %> by <%= pkg.author %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> */\n\n',
      },
      dist: {
        src: ['src/<%= pkg.name %>.module.js', 'src/<%= pkg.name %>.*.js'],
        dest: 'dist/<%= pkg.name %>.js',
      }
    },

    uglify: {
      options: {
        mangle: false,
        banner: '/* <%= pkg.name %> - v<%= pkg.version %> by <%= pkg.author %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> */\n',
      },
      my_target: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['dist/<%= pkg.name %>.js']
        }
      }
    },
    
    connect: {
      server: {
        options: {
          port: 8080,
          hostname: 'localhost',
          open: true,
          livereload: true
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // default task
  grunt.registerTask('default', ['connect', 'watch']);

  // build task (no watch)
  grunt.registerTask('build', ['concat', 'uglify']);
};
