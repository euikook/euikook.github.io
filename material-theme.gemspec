# coding: utf-8

Gem::Specification.new do |spec|
  spec.name          = "jekyll-material-theme"
  spec.version       = "0.6.2"
  spec.authors       = ["James Hamann"]
  spec.email         = ["jameshamann0@gmail.com"]

  spec.summary       = "A Material Theme for Jekyll"
  spec.homepage      = "https://github.com/jameshamann/jekyll-material-theme"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r{^(js|css|assets|_sass|_layouts|_includes|_posts|LICENSE|README|_config.yml)}i) }

  spec.add_runtime_dependency "jekyll"
  spec.add_runtime_dependency "jekyll-assets"
  spec.add_runtime_dependency "jekyll-minifier"
  spec.add_runtime_dependency "jekyll-feed"
  spec.add_runtime_dependency "kramdown"


  spec.add_development_dependency "bundler"
  spec.add_development_dependency "rake"
  spec.add_development_dependency "capybara"
  spec.add_development_dependency "rspec"
  spec.add_development_dependency "selenium-webdriver"
end
