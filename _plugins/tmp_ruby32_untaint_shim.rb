# TEMPORARY - local dev only. Do NOT commit.
#
# liquid 4.0.3's built-in `escape` filter and its taint check call
# String#untaint / Object#tainted?, both removed in Ruby 3.2. This local box
# runs Ruby 3.2.3, but CI builds on Ruby 3.1 (where these exist), so the real
# deploy is unaffected. This shim lets us run a full `jekyll build` locally to
# verify the callout filter end-to-end. Delete after verification.
unless String.method_defined?(:untaint)
  class String
    def untaint
      self
    end
  end
end
[Object, NilClass, TrueClass, FalseClass, Numeric, Symbol, Array, Hash].each do |klass|
  klass.class_eval do
    def tainted?
      false
    end
  end unless klass.method_defined?(:tainted?)
end
