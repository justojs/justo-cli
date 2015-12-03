module.exports = function(grunt) {
  "use strict";

  // Project configuration
  grunt.initConfig({
    // Metadata
    pkg: grunt.file.readJSON('package.json'),

    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= props.license %> */\n',

    // Task configuration
    babel: {
      options: {
        sourceMap: false,
        comments: false,
        retainLines: true
      },

      es5: {
        files: {
          "build/es5/lib/AutomatorWork.js": "lib/AutomatorWork.js",
          "build/es5/lib/Call.js": "lib/Call.js",
          "build/es5/lib/Calls.js": "lib/Calls.js",
          "build/es5/lib/Cli.js": "lib/Cli.js",
          "build/es5/lib/JustoJson.js": "lib/JustoJson.js",
          "build/es5/lib/Loader.js": "lib/Loader.js",
          "build/es5/lib/MacroWork.js": "lib/MacroWork.js",
          "build/es5/lib/Runner.js": "lib/Runner.js",
          "build/es5/lib/TesterWork.js": "lib/TesterWork.js",
          "build/es5/lib/Work.js": "lib/Work.js",
          "build/es5/lib/Works.js": "lib/Works.js"
        }
      }
    },

    clean: {
      es5: {
        src: ["build/es5", "dist/es5"]
      }
    },

    copy: {
      nodejs: {
        options: {
          mode: true
        },

        files: [
          {cwd: "build/es5/", src: ["lib/*.js"], dest: "dist/es5/nodejs/<%= pkg.name %>/", expand: true},
          {src: ["bin/justo-cli.js"], dest: "dist/es5/nodejs/<%= pkg.name %>/", expand: true},
          {src: ["package.json", "README.md"], dest: "dist/es5/nodejs/<%= pkg.name %>/", expand: true},
          {src: ["test/**/*.*"], dest: "dist/es5/nodejs/<%= pkg.name %>", expand: true}
        ]
      }
    },

    jshint: {
      gruntfile: {
        src: ["Gruntfile.js"]
      },

      bin: {
        options: {
          jshintrc: true
        },

        src: ["bin/**"]
      },

      lib: {
        options: {
          jshintrc: true
        },

        src: ["lib/**"]
      },

      test: {
        options: {
          jshintrc: true,
          ignores: [
            "test/mocha.opts"
          ]
        },

        src: ["test/**"]
      }
    },

    mochaTest:{
      options: {
        ignoreLeaks: false,
        quiet: false,
        reporter: "spec",
        timeout: 1500
      },

      es5: {
        options: {
          require: [
            "justo-assert"
          ]
        },

        src: [
          "test/unit/**/*.js"
        ]
      }
    }
  });

  // These plugins provide necessary tasks
  grunt.loadNpmTasks("grunt-babel");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks("grunt-mocha-test");
  grunt.loadNpmTasks("grunt-travis-lint");

  //aliases
  grunt.registerTask("buildes5", ["jshint", "clean:es5", "babel:es5", "copy:nodejs"]);
  grunt.registerTask("test", ["mochaTest:es5"]);
  grunt.registerTask("es5", ["buildes5", "test"]);

  // Default task
  grunt.registerTask("default", []);
};
