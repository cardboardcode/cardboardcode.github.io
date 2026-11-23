#!/usr/bin/env bash

# Ruby >= 3.1 removed String#untaint/taint (and related methods), but liquid 4.0.3
# (pinned via github-pages ~> 227) still calls them in `escape` and `taint_check`.
# Load a no-op shim so local builds work on modern Ruby.
# (No-op on GitHub Pages, which runs an older Ruby with the native methods.)
export RUBYOPT="-r$PWD/scripts/ruby-liquid-compat"

bundle exec jekyll serve
