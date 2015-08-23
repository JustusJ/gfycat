require 'rubygems'
require 'bundler'
Bundler.require(:default)

class SlimHelper
	
	attr_accessor :templates
	
	def initialize
		self.templates = {}
	end
	
end

desc "best build system ever"
task :build do |t|
	helper = SlimHelper.new
	Dir.glob("src/tml/*.slim").each do |f|
	  o = Tilt.new(f).render
		id = f.split(".")[0].split("/").last
		helper.templates[id] = o
	end
	
  o = Tilt.new('src/index.html.slim').render(helper)
  File.open('index.html', 'w+').write(o)
end

