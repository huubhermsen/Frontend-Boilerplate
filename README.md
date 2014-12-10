# Frontend boilerplate using Grunt and Bower
This is a testing and production ready boilerplate for frontend development. It uses an array of different languages and utillities to provide (c)leaner code and faster workflows. The boilerplate uses:

* [Grunt](http://gruntjs.com) for task management
* [Bower](http://bower.io) for packet management
* [Sass](http://sass-lang.com/) for CSS compiling
* [Susy](http://susy.oddbird.net/) for killer grids in Sass
* [CoffeeScript](http://coffeescript.org/) for javascript compiling
* [Jade](http://jade-lang.com/) for templating

## Requirements
The following components are required for the use of this boilerplate:

* [Node.js](#nodejs)
* [Grunt](#grunt)
* [Bower](#bower)
* [Git](#git)
* [GraphicsMagick](#graphicsmagick)

## Installation of components

### Node.js
Visit [nodejs.org](http://nodejs.org/) and click the "install" button, follow further instructions.

### Grunt
Install Grunt's command line interface globally:

```bash
npm install -g grunt-cli
```

It's that simple! Sure you could do more, visit [gruntjs.com](http://gruntjs.com/) for more info and libraries.

### Bower
Install Bower's command line interface globally:

```bash
npm install -g bower
```

Yes, this is also that simple! Visit [bower.io](http://bower.io/) for more info, tools and libraries.

### Git
Visit [git-scm.com](http://git-scm.com/) and download the latest source release, follow further instructions.

### GraphicsMagick
Download and install [GraphicsMagick](http://www.graphicsmagick.org/). In Mac OS X, you can simply use [Homebrew](http://mxcl.github.io/homebrew/) and do:

```bash
brew install graphicsmagick
```

## Getting started
Although the first part of this readme look daunting, chances are half of the components are already installed on your system. Next step is to start developing.

### Easy start
Navigate to the root of project and type the following two commands in your terminal app:

```bash
npm install --save-dev
bower install
```

This will start downloading the required files, components, libraries, etc, to your project.
> Node and Bower place their components in two folders: `bower` and `node_modules`. If you use version control on your project it is wise to exclude these dirs from your commits, these can get quite weighty, whilst not contributing anything to your production enviroment.

Next run the grunt command and watch the magic happen:

```bash
grunt
```

Grunt will create new `test` and `dist` folders where it stores the test (uncompressed) and production files. Open a browser and navigate to [0.0.0.0:9000](http://0.0.0.0:9000) and check out the website that's being live rendered from the test folder.

> If your project is under version control, it is wise to atleast add the `test` folder to your ignore list.

### Harder start
Have some expierence with Grunt and/or Bower? Then it might be desirable to change settings to your comfort.

* In the `bower.json` file you can add/remove extra dependencies for Bower.
* Likewise in the `package.json` file you can add/remove extra dependencies for the Grunt task runner.
* The `Gruntfile.js` contains all business logic of this boilerplate. You can alter the build and asset paths here or change specific component settings. See [gruntjs.com](http://gruntjs.com/) for more information on Grunt settings and the GitHub repositories of the components (see `package.json`) for more info about their inner workings.

## The almighty source folder

Navigate to the source folder in the project root to see all development files.
