# frozen_string_literal: true

$LOAD_PATH.unshift File.expand_path("lib", __dir__)
require "jekyll/github-callouts/version"

Gem::Specification.new do |spec|
  spec.name    = "jekyll-github-callouts"
  spec.version = Jekyll::GithubCallouts::VERSION
  spec.authors = ["Gary Bey"]
  spec.email   = ["beyhy94@gmail.com"]

  spec.summary = "Render GitHub's `> [!NOTE]` markdown as styled callout boxes in Jekyll."
  spec.homepage = "https://github.com/cardbardcode/cardboardcode.github.io"
  spec.license = "MIT"

  # Bundler installs the library from `files`; use a glob so the lib tree is
  # always included regardless of exact structure.
  spec.files = Dir["lib/**/*.rb"] + ["jekyll-github-callouts.gemspec"]
  spec.require_paths = ["lib"]

  # Jekyll is provided by the host site; the gem only adds a Liquid filter.
  spec.add_development_dependency "bundler", ">= 1.14"

  spec.rdoc_options = ["--charset=UTF-8"]
end
