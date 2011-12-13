require 'rubygems'
gem 'rego-ruby-ext'
require "rego-ruby-ext"
gem 'rego-js-builder'
require "rego-js-builder"
gem 'rake-hooks'
require 'rake/hooks'

project = JsProjectBuilder.new(
  :name => 'progressBar',
  :description => 'jQuery plugin for progress bar ui widget',
  :file_name => 'jquery.progress-bar.js',
  :js_files => %w{progress-bar.js},
  :sass => true
)
JsProjectBuilder::Tasks.new(project)
