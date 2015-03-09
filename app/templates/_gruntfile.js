module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON( 'package.json' ),
		emberTemplates: {
			compile: {
				options: {
					templateBasePath: /resource\/js\/templates\//
				},
				files: {
					'publish/resource/js/templates.js': 'resource/js/templates/**/*.hbs'
				}
			}
		},
		watch: {
			emberTemplates: {
				files: 'resource/js/templates/**/*.hbs',
				tasks: ['emberTemplates']
			},
			cssmin: {
				files: 'resource/css/*.css',
				tasks: ['sprite','cssmin']
			},
			uglify: {
				files: ['resource/js/controllers/**/*.js', 
						'resource/js/components/**/*.js', 
						'resource/js/models/**/*.js', 
						'resource/js/helpers/**/*.js', 
						'resource/js/views/**/*.js', 
						'resource/js/util/**/*.js', 
						'resource/js/routes/**/*.js'],
				tasks: ['uglify']
			}
		},
		connect: {
		 	server: {
	          options: {
	            port: 8888,
	            hostname: '192.168.1.33',
	            keepalive: true
	          }
	        }
		},
		uglify: {
			my_target: {
				files: {
					'publish/resource/js/controllers.js': 'resource/js/controllers/**/*.js',
					'publish/resource/js/components.js': 'resource/js/components/**/*.js',
					'publish/resource/js/models.js': 'resource/js/models/**/*.js',
					'publish/resource/js/views.js': 'resource/js/views/**/*.js',
					'publish/resource/js/utils.js': 'resource/js/util/**/*.js',
					'publish/resource/js/routes.js': 'resource/js/routes/**/*.js',
                    'publish/resource/js/app.js': 'resource/js/app.js',
                    'publish/resource/js/router.js':'resource/js/router.js'
				}
			}
		},
        cssmin: {
			combine: {
				files: {
					'publish/resource/css/app.css' : 'resource/css/sprite/*.css'
				}
			},
			minify: {
				files: {
					'publish/resource/css/app.min.css': 'publish/resource/css/app.css'
				}
			}
		},
        //Auto sprite
		sprite: {
			options: {
				// sprite背景图源文件夹，只有匹配此路径才会处理，默认 images/slice/
				imagepath: 'resource/images/slice/',
				// 映射CSS中背景路径，支持函数和数组，默认为 null
				imagepath_map: null,
				// sprite图输出目录，注意，会覆盖之前文件！默认 images/
				spritedest: 'publish/resource/images/',
				// 替换后的背景路径，默认 ../images/
				spritepath: '../images/',
				// 各图片间间距，如果设置为奇数，会强制+1以保证生成的2x图片为偶数宽高，默认 0
				padding: 2,
				// 是否使用 image-set 作为2x图片实现，默认不使用
				useimageset: false,
				// 是否以时间戳为文件名生成新的雪碧图文件，如果启用请注意清理之前生成的文件，默认不生成新文件
				newsprite: false,
				// 给sprite图追加时间戳，默认不追加
				spritestamp: true,
				// 在CSS文件末尾追加时间戳，默认不追加
				cssstamp: true,
				// 默认使用二叉树最优排列算法
				algorithm: 'binary-tree',
				// 默认使用`pngsmith`图像处理引擎
				engine: 'pngsmith'
			},
			autoSprite: {
				files: [{
					// 启用动态扩展
					expand: true,
					// css文件源的文件夹
					cwd: 'resource/css/',
					// 匹配规则
					src: '*.css',
					// 导出css和sprite的路径地址
					dest: 'resource/css/sprite/',
					// 导出的css名
					ext: '.sprite.css'
				}]
			}
		}
    });
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-ember-templates');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-css-sprite');
    // Default task(s).
    grunt.registerTask('default', ['uglify', 'sprite','cssmin','emberTemplates','watch']);
};
