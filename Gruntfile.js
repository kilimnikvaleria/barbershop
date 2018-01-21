module.exports = function(grunt) {
    require("load-grunt-tasks")(grunt);
    grunt.initConfig({

        clean: {
            build: ["build"]
        },
        copy: {
            build: {
                files: [{
                    expand: true,
                    src: [
                        "fonts/**/*.{woff,woff2}",
                        "images/**",
                        "js/**",
                        "*.html"
                    ],
                    dest: "build"
                }]
            },
            html:{
                files:[{
                    expand: true,
                    src: ["*.html"],
                    dest: "build"
                }]
            }

        },
        less: {
            style: {
                files: {
                    "build/css/style.css": ["less/style.less"]
                }
            }
        },
        postcss: {
            style:{
                options: {
                    processors: [
                        require("autoprefixer")({
                            browsers: [
                                "last 1 version",
                                "last 2 Chrome versions",
                                "last 2 Firefox versions",
                                "last 2 Opera versions",
                                "last 2 Edge versions"
                            ]
                        }),
                        require("css-mqpacker")({
                            sort: true
                        })
                    ]


                },
                src: "build/css/*.css"
            }

        },
        svgstore:{
            options:{
                svg:{
                    style: "display: none"
                }
            },
            symbols:{
                files:{
                    "build/images/symbols.svg":["images/*.svg"]
                }
            }
        },
        svgmin:{
            symbols:{
                files:[{
                    expand: true,
                    src: ["build/images/*.svg"]
                }]
            }
        },
        csso: {
            style: {
                options: {
                    report: "gzip"
                },
                files: {           "build/css/style.min.css": ["build/css/style.css"]
                }
            }
        },
        imagemin: {
            images: {
                options: {
                    optimizationLevel: 3
                },
                files: [{
                    expand: true,
                    src: ["build/images/**/*.{png,jpg,gif}"]
                }]
            }

        },
        browserSync: {
            server: {
                bsFiles: {
                    src: ["build/*.html", "build/css/*.css"]
                },
                options: {
                    server: "build",
                    watchTask: true
                }
            }
        },
        watch: {
            html:{
                files: ["*.html"],
                tasks: ["copy:html"]
            },
            style: {
                files: ["less/**/*.less"],
                tasks: ["less", "postcss","csso"]
            }
        },
    });
    grunt.registerTask("serve",["browserSync","watch"]);
    grunt.registerTask("symbols", ["svgmin", "svgstore"]);
    grunt.registerTask("build",[
        "clean",
        "copy",
        "less",
        "postcss",
        "csso",
        "symbols",
        "imagemin"
    ]);
};