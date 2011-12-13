# [progressBar]() - jQuery plugin for progress bar ui widget
================================

Usage
---------------------
See wiki on github: https://github.com/alextk/progressBar/wiki

What you need to build progressBar
----------------------------
In order to build progressBar, you need to ruby 1.8.7, Node.js 0.2 or later, and git 1.7 or later.
(Earlier versions might work OK, but are not tested.)

`rego-js-builder` gem installed:

    gem install rego-js-builder


Windows users:

   Install [msysgit](https://code.google.com/p/msysgit/) (Full installer for official Git),
   [GNU make for Windows](http://gnuwin32.sourceforge.net/packages/make.htm).
   Next you gonna need to build node js exe file and then copy it into mingw/bin folder. To build node js follow this guide:
   (https://github.com/joyent/node/wiki/Building-node.js-on-mingw). To install c++/g++ compilers run:

   mingw-get install gcc g++ mingw32-make

   To install phyton, simply download it from link on the guide, and add it to PATH variable.

Building to a different directory
---------------------------------
If you want to build jqLog to a directory that is different from the default location, you need to edit the Rakefile.


Special thanks
--------------
Big shout-out to the jQuery team for providing the directory structure and base files for the git repo, as well as the base-files for the new NodeJS build system!