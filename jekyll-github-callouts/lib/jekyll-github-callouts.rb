# frozen_string_literal: true

require "jekyll/github-callouts/version"
require "jekyll/github-callouts/github-callouts"

# Register the filter with Liquid. This MUST happen at require time (i.e.
# here, when Bundler loads this file for the :jekyll_plugins group), and it
# must target a *fresh* module (Jekyll::GithubCallouts::Filters) that Liquid
# has not already registered — re-registering the core Jekyll::Filters
# module (already in Liquid::Strainer's set) is a no-op for any methods
# added to it after its initial registration.
Liquid::Template.register_filter(Jekyll::GithubCallouts.filters)
