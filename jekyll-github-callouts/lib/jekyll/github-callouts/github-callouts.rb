# frozen_string_literal: true

# GitHub-style callouts for the `> [!NOTE]` markdown form (NOTE, TIP,
# IMPORTANT, WARNING, CAUTION).
#
# CRITICAL DESIGN NOTE — why the filter lives in a *brand-new* module
# (Jekyll::GithubCallouts.filters) rather than being added to the core
# Jekyll::Filters:
#
#   Jekyll 3.9.2 calls Liquid::Template.register_filter(Jekyll::Filters)
#   at "require" time (lib/jekyll/filters.rb:377). Liquid's Strainer
#   snapshots the module's public_instance_methods into its
#   "filter_objects"/"filter_methods" sets AT THAT MOMENT. My plugin gem is
#   loaded *later* by Bundler, by which time Jekyll::Filters is already in
#   the snapshot set, so the "unless filter_objects.include?(filter)"
#   guard in add_filter skips any re-merging — a #callout method I add to
#   Jekyll::Filters afterwards is invisible to the Strainer and would
#   silently pass input through (no error, non-strict mode).
#
#   A fresh module not previously registered has no such guard, so
#   register_filter actually merges its methods. This is the same pattern
#   jekyll-seo-tag uses (defining its own filter module, not reopening
#   Jekyll::Filters).

module Jekyll
  module GithubCallouts
    # The actual filter implementation, kept in a brand-new module so
    # Jekyll::Template.register_filter(Jekyll::GithubCallouts.filters)
    # reliably adds the methods to Liquid's Strainer at require time.
    module Filters
      MARKER_TYPES = %w[note tip important warning caution].freeze

      ICONS = {
        "note"      => "ℹ️",
        "tip"       => "💡",
        "important" => "📘",
        "warning"   => "⚠️",
        "caution"   => "⛔"
      }.freeze

      # Transform every callout blockquote in the HTML into a styled <div>.
      # Non-callout blockquotes (e.g. plain `> text`) pass through untouched.
      def callout(input)
        return input unless input.is_a?(String)
        return input unless input.include?("<blockquote")
        return input unless input.include?("[!")

        transform_callouts(input)
      end

      def transform_callouts(html)
        out = +""
        i   = 0

        while (start = html.index("<blockquote", i))
          end_idx = callout_block_close(html, html.index(">", start) + 1)

          out << html[i...start]
          full  = html[start...end_idx]

          type = callout_type(full)
          if type
            out << %(<div class="callout callout-#{type}" role="note">)
            out << %(<p class="callout-title"><span class="callout-icon">#{ICONS[type]}</span><span>#{type.capitalize}</span></p>)
            out << callout_body(full)
            out << "</div>"
          else
            out << full
          end
          i = end_idx
        end

        out << html[i..]
        out
      end

      # Inner content of the blockquote with its outer <blockquote> open
      # tag, close tag, and surrounding whitespace removed.
      def blockquote_inner(blockquote_html)
        inner = blockquote_html.to_s.strip
        inner = inner.sub(/\A<blockquote[^>]*>/, "")
        inner = inner.sub(/<\/blockquote>\s*\z/, "")
        inner.strip
      end

      # If the blockquote starts with a recognised `[!TYPE]` marker
      # (possibly preceded by an opening tag such as <p>), return the
      # lowercased type; else nil.
      def callout_type(blockquote_html)
        inner  = blockquote_inner(blockquote_html)
        marker = /\A\s*(?:<[^>]+>\s*)*\[!([A-Za-z]+)\]/.match(inner)
        return nil unless marker

        type = marker[1].downcase
        MARKER_TYPES.include?(type) ? type : nil
      end

      # Body of the callout: inner content minus the leading `[!TYPE]`
      # marker and the <br /> kramdown inserts to break from the marker
      # line. Everything else (including the wrapping <p>..</p>) is
      # preserved as-is so the output stays balanced, valid HTML.
      def callout_body(blockquote_html)
        blockquote_inner(blockquote_html)
          .sub(/\[![A-Za-z]+\](?:\s*<br\b[^>]*\/?>)?/, "")
          .strip
      end

      private

      # Index just past the matching </blockquote> for the <blockquote>
      # whose `>` is at `open_end - 1`; honours nesting depth.
      def callout_block_close(html, open_end)
        depth = 1
        j     = open_end

        while depth.positive? && j < html.length
          next_open  = html.index("<blockquote", j)
          next_close = html.index("</blockquote>", j)

          break if next_close.nil?

          if next_open && next_open < next_close
            depth += 1
            j = html.index(">", next_open) + 1
          else
            depth -= 1
            j = next_close + "</blockquote>".length
          end
        end

        j
      end
    end

    def self.filters
      Filters
    end
  end
end
