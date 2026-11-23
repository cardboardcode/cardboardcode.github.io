# Compatibility shim for local Ruby >= 3.2 builds.
#
# Ruby 3.1 froze and Ruby 3.2 removed `String#untaint` / `String#taint`
# and the `tainted?` / `untainted?` predicates. Older Liquid (4.0.x,
# resolved via `github-pages ~> 227`) still calls them:
#   * StandardFilters#escape -> `CGI.escapeHTML(input.to_s).untaint`
#   * Variable#render        -> taint_check -> `value.tainted?`
#
# Define no-op replacements so local `bundle exec jekyll build/serve`
# works on Ruby 3.2. On GitHub Pages (older Ruby) the native methods still
# exist and these branches below are simply skipped.

unless Object.method_defined?(:untaint)
  class Object
    def untaint; self; end
    def taint;   self; end
    def untainted?; true;  end
    def tainted?;   false; end
  end
end
