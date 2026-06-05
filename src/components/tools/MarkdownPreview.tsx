import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function MarkdownPreview() {
  const [markdown, setMarkdown] = useState(
    "# Welcome\n\nThis is **bold** text.\n\n- Item 1\n- Item 2",
  );
  const [copied, setCopied] = useState(false);

  const parseMarkdown = (md: string) => {
    let html = md;

    // Headers
    html = html.replace(/^### (.*?)$/gm, "<h3>$1</h3>");
    html = html.replace(/^## (.*?)$/gm, "<h2>$1</h2>");
    html = html.replace(/^# (.*?)$/gm, "<h1>$1</h1>");

    // Bold and Italic
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
    html = html.replace(/__(.*?)__/g, "<strong>$1</strong>");
    html = html.replace(/_(.*?)_/g, "<em>$1</em>");

    // Code
    html = html.replace(/`(.*?)`/g, "<code>$1</code>");

    // Lists
    html = html.replace(/^\- (.*?)$/gm, "<li>$1</li>");
    html = html.replace(/(<li>.*?<\/li>)/s, "<ul>$1</ul>");
    html = html.replace(/^(\d+)\. (.*?)$/gm, "<li>$2</li>");

    // Links
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

    // Line breaks
    html = html.replace(/\n\n/g, "</p><p>");
    html = "<p>" + html + "</p>";

    return html;
  };

  const htmlOutput = parseMarkdown(markdown);

  const copyHTML = () => {
    navigator.clipboard.writeText(htmlOutput.replace(/<[^>]*>/g, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-lg">
          <label className="block text-sm font-semibold text-neon-pink mb-3">
            Markdown
          </label>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Enter markdown..."
            className="w-full h-64 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-muted-silver/50 focus:outline-none focus:border-neon-pink resize-none font-mono text-sm"
          />
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-lg">
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-semibold text-bright-cyan">
              Preview
            </label>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={copyHTML}
              className="bg-acid-lime/20 border border-acid-lime/50 text-acid-lime rounded-lg px-3 py-1 text-sm hover:bg-acid-lime/30 transition-all flex items-center gap-2"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </motion.button>
          </div>
          <div className="h-64 bg-white/5 border border-white/10 rounded-lg px-4 py-3 overflow-auto prose prose-invert max-w-none text-sm text-white">
            <div className="space-y-2">
              {markdown.split("\n").map((line, i) => (
                <div key={i} className="text-white/80 break-words">
                  {line.startsWith("#") ? (
                    <div
                      className={
                        line.startsWith("###")
                          ? "text-base font-bold"
                          : line.startsWith("##")
                            ? "text-lg font-bold"
                            : "text-xl font-bold"
                      }
                    >
                      {line.replace(/^#+\s/, "")}
                    </div>
                  ) : line.startsWith("-") ? (
                    <div className="ml-4">• {line.replace(/^-\s/, "")}</div>
                  ) : (
                    <div>{line}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
