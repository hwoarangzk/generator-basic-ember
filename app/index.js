var yeoman = require('yeoman-generator');
var chalk = require('chalk');

module.exports = yeoman.generators.Base.extend({

  promptUser: function() {
    var done = this.async();

    var prompts = [{
      name: 'appName',
      message: 'What is your app\'s name ?'
    },{
      name: 'author',
      message: 'What is the author\'s name'
    }];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;
      this.author = props.author;
  
      done();
    }.bind(this));
  },

  createFolders: function() {
    this.mkdir('resource');
    this.mkdir('resource/css');
    this.mkdir('resource/images');
    this.mkdir('resource/js');
    this.mkdir('resource/js/components');
    this.mkdir('resource/js/controllers');
    this.mkdir('resource/js/lib');
    this.mkdir('resource/js/models');
    this.mkdir('resource/js/routes');
    this.mkdir('resource/js/templates');
    this.mkdir('resource/js/templates/components');
    this.mkdir('resource/js/util');
    this.mkdir('resource/js/views');
  },

  copyFiles: function() {
    this.copy('_app.js', 'resource/js/app.js');
    this.copy('_router.js', 'resource/js/router.js');
    this.copy('_gruntfile.js', 'Gruntfile.js');

    var context = {
      appName: this.appName,
      author: this.author
    };

    this.template('_package.json', 'package.json', context);
  }

});
