import { useState } from "react";
import { translations, type Language } from "./i18n";
import { AlertCircle, BarChart3, Copy } from "lucide-react";
import { cn } from "./lib/utils";

const languages: Record<Language, string> = {
  en: "🇺🇸 English",
  pt: "🇧🇷 Português",
};

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const browserLang = navigator.language || "en";
      return browserLang.toLowerCase().startsWith("pt") ? "pt" : "en";
    }
    return "en";
  });

  const t = translations[lang];

  const handleCopy = () => {
    navigator.clipboard.writeText("npm install @purecore/multerless");
    const btn = document.getElementById("copy-btn-text");
    if (btn) btn.innerText = t.copied_button;
    setTimeout(() => {
      if (btn) btn.innerText = t.copy_button;
    }, 2000);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground antialiased selection:bg-emerald-500/30">
      {/* Language Selector */}
      <div className="fixed top-6 right-6 z-50">
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value as Language)}
          className="bg-slate-900/80 text-slate-300 border border-slate-700/50 px-4 py-2 rounded-lg cursor-pointer backdrop-blur-sm outline-none hover:border-emerald-500/50 transition-colors"
        >
          {Object.entries(languages).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="animate-pulse-slow absolute -top-24 -right-24 w-96 h-96 bg-red-500/30 rounded-full blur-3xl opacity-20"></div>
        <div className="animate-pulse-slow absolute -bottom-24 -left-24 w-96 h-96 bg-red-500/20 rounded-full blur-3xl opacity-20 delay-1000"></div>
      </div>

      <article className="relative pt-8 z-10 max-w-5xl mx-auto px-6 py-0">
        <img src="/logo.png" alt="multerless" className="w-full max-w-lg mx-auto drop-shadow-2xl" style={{ filter: "drop-shadow(0 0 20px rgba(52, 211, 153, 0.2))" }} />
      </article>
      {/* Main Content */}
      <article className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        {/* Alarm Header */}
        <header className="text-center py-16 md:py-0 animate-fade-in">
          {/* <div className="inline-flex items-center gap-2 bg-red-500/10 border-2 border-red-500/50 rounded-full px-6 py-2 mb-8 animate-float">
            <AlertCircle className="w-6 h-6 text-red-400" />
            <span className="text-red-300 font-bold uppercase tracking-widest text-sm">
              {t.alert_title}
            </span>
          </div> */}

          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-8 tracking-tight">
            {t.hero_title_prefix}{" "}
            <span className="bg-linear-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
              Multer
            </span>{" "}
            <span className="text-slate-300">{t.hero_title_suffix}</span>
            <br />
            <span className="text-slate-300">{t.hero_subtitle_1}</span>{" "}
            <span className="bg-linear-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
              {t.hero_subtitle_2}
            </span>
          </h1>

          <p
            className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto"
            dangerouslySetInnerHTML={{ __html: t.hero_desc }}
          />
        </header>

        {/* Statistics */}
        <section className="my-16 animate-slide-up">
          <div className="bg-slate-900/60 backdrop-blur-xl border border-red-500/30 rounded-2xl p-8 shadow-2xl shadow-red-900/10">
            <div className="flex items-center gap-3 mb-8">
              <BarChart3 className="w-8 h-8 text-red-300" />
              <h2 className="text-3xl font-extrabold text-red-300">
                {t.stats_title}
              </h2>
            </div>

            <div className="grid gap-6 mb-8">
              <div className="bg-red-500/10 border-l-4 border-red-500 p-6 rounded-r-lg hover:bg-red-500/20 transition-colors">
                <div className="text-4xl font-black text-red-500 mb-2">
                  {t.stat_1_val}
                </div>
                <div className="text-slate-300 font-medium">{t.stat_1_desc}</div>
              </div>

              <div className="bg-red-500/10 border-l-4 border-red-600 p-6 rounded-r-lg hover:bg-red-500/20 transition-colors">
                <div className="text-4xl font-black text-red-600 mb-2">
                  {t.stat_2_val}
                </div>
                <div className="text-slate-300 font-medium">{t.stat_2_desc}</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-red-500/10 border-l-4 border-red-700 p-6 rounded-r-lg hover:bg-red-500/20 transition-colors">
                  <div className="text-3xl font-black text-red-700 mb-2">
                    {t.stat_3_val}
                  </div>
                  <div className="text-slate-300 text-sm">{t.stat_3_desc}</div>
                </div>

                <div className="bg-red-500/10 border-l-4 border-red-800 p-6 rounded-r-lg hover:bg-red-500/20 transition-colors">
                  <div className="text-3xl font-black text-red-800 mb-2">
                    {t.stat_4_val}
                  </div>
                  <div className="text-slate-300 text-sm">{t.stat_4_desc}</div>
                </div>
              </div>
            </div>

            <div className="bg-red-500/20 border-2 border-red-500/50 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="p-3 bg-red-500/20 rounded-full">
                <AlertCircle className="w-8 h-8 text-red-300" />
              </div>
              <div>
                <div className="font-bold text-red-300 text-lg mb-1">
                  {t.vuln_title}
                </div>
                <div className="text-slate-200">{t.vuln_desc}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section className="my-24">
          <h2 className="text-4xl font-black text-center mb-12 flex items-center justify-center gap-4 flex-wrap">
            <span className="bg-linear-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
              Multer
            </span>
            <span className="text-slate-400 font-normal text-2xl">
              {t.comparison_title_vs}
            </span>
            <span className="bg-linear-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
              multerless
            </span>
          </h2>

          <div className="overflow-hidden rounded-2xl border border-slate-700/50 shadow-2xl">
            <table className="w-full border-collapse bg-slate-900/60 backdrop-blur-xl text-left">
              <thead>
                <tr className="bg-slate-800/80 border-b border-slate-700/50">
                  <th className="p-4 text-slate-300 font-semibold w-1/3">
                    {t.table_header_aspect}
                  </th>
                  <th className="p-4 text-center text-red-300 font-semibold w-1/3 border-l border-slate-700/50">
                    Multer
                  </th>
                  <th className="p-4 text-center text-emerald-300 font-semibold w-1/3 border-l border-slate-700/50 bg-emerald-500/5">
                    multerless
                  </th>
                </tr>
              </thead>
              <tbody className="text-slate-300 divide-y divide-slate-700/30">
                {[
                  ["deps", "red-500", "emerald-400 font-bold"],
                  ["update", "red-500", "emerald-400 font-bold"],
                  ["prs", "red-500", "emerald-400 font-bold"],
                  ["issues", "red-500", "emerald-400 font-bold"],
                  ["vuln", "red-500", "emerald-400 font-bold"],
                  ["breaking", "red-500", "emerald-400 font-bold"],
                ].map(([key, col1Class, col2Class]) => (
                  <tr key={key} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 font-medium">
                      {t[`table_row_${key}` as keyof typeof t]}
                    </td>
                    <td
                      className={cn(
                        "p-4 text-center border-l border-slate-700/50",
                        col1Class
                      )}
                    >
                      {t[`table_row_${key}_multer` as keyof typeof t]}
                    </td>
                    <td
                      className={cn(
                        "p-4 text-center border-l border-slate-700/50 bg-emerald-500/5",
                        col2Class
                      )}
                    >
                      {t[`table_row_${key}_multerless` as keyof typeof t]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* The Solution */}
        <section className="my-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="text-slate-300">{t.solution_title}</span>{" "}
              <span className="bg-linear-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                multerless
              </span>
            </h2>
            <p className="text-xl text-slate-400">{t.solution_subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: "🎯", key: "feature_1" },
              { icon: "📌", key: "feature_2" },
              { icon: "🔒", key: "feature_3" },
              { icon: "🤖", key: "feature_4" },
            ].map(({ icon, key }) => (
              <div key={key} className="stat-card group">
                <div className="relative z-10">
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {icon}
                  </div>
                  <h3 className="text-2xl font-bold text-emerald-300 mb-3 group-hover:text-emerald-200 transition-colors">
                    {t[`${key}_title` as keyof typeof t]}
                  </h3>
                  <p
                    className="text-slate-300 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: t[`${key}_desc` as keyof typeof t],
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Migration */}
        <section className="my-24">
          <h2 className="text-4xl font-black text-center mb-12 text-slate-100">
            {t.migration_title}{" "}
            <span className="bg-linear-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
              {t.migration_subtitle}
            </span>
          </h2>

          <div className="grid gap-8 max-w-3xl mx-auto">
            <div className="bg-slate-900/60 backdrop-blur-xl border border-red-500/30 rounded-2xl p-6 shadow-lg shadow-red-900/5 group hover:border-red-500/50 transition-all duration-300">
              <div className="text-red-300 font-bold mb-4 flex items-center gap-2">
                <span className="text-xl">❌</span> {t.before_label}
              </div>
              <pre className="overflow-x-auto bg-slate-950/50 p-4 rounded-lg border border-slate-800 text-sm md:text-base">
                <code className="font-mono text-slate-300">
                  <span className="text-purple-400">import</span> multer{" "}
                  <span className="text-purple-400">from</span>{" "}
                  <span className="text-red-400">'multer'</span>;<br />
                  <br />
                  <span className="text-purple-400">const</span> upload ={" "}
                  <span className="text-cyan-400">multer</span>({"{"} dest:{" "}
                  <span className="text-emerald-400">'uploads/'</span> {"}"});
                </code>
              </pre>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-6 shadow-lg shadow-emerald-900/5 group hover:border-emerald-500/50 transition-all duration-300 transform md:scale-105">
              <div className="text-emerald-300 font-bold mb-4 flex items-center gap-2">
                <span className="text-xl">✅</span> {t.after_label}
              </div>
              <pre className="overflow-x-auto bg-slate-950/50 p-4 rounded-lg border border-slate-800 text-sm md:text-base">
                <code className="font-mono text-slate-300">
                  <span className="text-purple-400">import</span> multer{" "}
                  <span className="text-purple-400">from</span>{" "}
                  <span className="text-emerald-400">
                    '@purecore/multerless'
                  </span>
                  ;<br />
                  <br />
                  <span className="text-purple-400">const</span> upload ={" "}
                  <span className="text-cyan-400">multer</span>({"{"} dest:{" "}
                  <span className="text-emerald-400">'uploads/'</span> {"}"});
                </code>
              </pre>
            </div>
          </div>

          <div className="text-center mt-12 p-8 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 max-w-2xl mx-auto">
            <p className="text-2xl font-bold text-emerald-300 mb-2">
              {t.migration_note_1}
            </p>
            <p className="text-slate-300 text-lg">{t.migration_note_2}</p>
          </div>
        </section>

        {/* Installation */}
        <section className="my-24">
          <div className="bg-slate-900/80 backdrop-blur-xl border-2 border-emerald-500/30 rounded-2xl p-12 text-center max-w-3xl mx-auto shadow-2xl hover:border-emerald-500/50 transition-all duration-300">
            <div className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-6">
              {t.install_title}
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <code className="text-lg md:text-xl text-purple-300 font-mono bg-black/40 px-6 py-4 rounded-lg border border-slate-800 w-full md:w-auto">
                npm install @purecore/multerless
              </code>
              <button
                onClick={handleCopy}
                className="group flex items-center justify-center gap-2 px-8 py-4 bg-linear-to-r from-emerald-500 to-emerald-600 rounded-xl font-bold text-slate-900 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-200 active:scale-95 w-full md:w-auto"
              >
                <Copy className="w-5 h-5" />
                <span id="copy-btn-text">{t.copy_button}</span>
              </button>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="my-24 text-center">
          <div className="bg-linear-to-br from-red-500/10 to-emerald-500/10 border-2 border-emerald-500/20 rounded-3xl p-12 md:p-16 relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-5xl md:text-6xl font-black mb-8 leading-tight">
                <span className="text-slate-300">{t.cta_title_prefix}</span>{" "}
                <span className="bg-linear-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                  {t.cta_title_suffix}
                </span>
              </h2>

              <p
                className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto mb-12"
                dangerouslySetInnerHTML={{ __html: t.cta_desc }}
              />

              <div className="grid gap-4 max-w-lg mx-auto mb-12 text-left">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 flex flex-col"
                  >
                    <div className="font-bold text-emerald-300 text-lg">
                      {t[`checklist_${i}_title` as keyof typeof t]}
                    </div>
                    <div className="text-slate-400">
                      {t[`checklist_${i}_desc` as keyof typeof t]}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="https://github.com/suissa/multerless"
                  target="_blank"
                  className="px-8 py-4 bg-linear-to-r from-emerald-500 to-emerald-600 rounded-xl font-bold text-slate-900 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 flex items-center gap-2"
                >
                  ⭐ GitHub
                </a>
                <a
                  href="https://npmjs.com/package/@purecore/multerless"
                  target="_blank"
                  className="px-8 py-4 bg-emerald-500/10 border-2 border-emerald-500 rounded-xl font-bold text-emerald-300 hover:bg-emerald-500/20 transition-all duration-300 flex items-center gap-2"
                >
                  📦 npm
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Quote */}
        <section className="mt-0 text-center max-w-4xl mx-auto">
          <blockquote
            className="text-2xl md:text-3xl italic text-slate-300 border-l-8 border-emerald-500 pl-8 py-2 mb-8"
            dangerouslySetInnerHTML={{ __html: t.quote }}
          />
          <p className="text-xl font-bold text-red-500 animate-pulse">
            {t.footer_warning}
          </p>
        </section>

        {/* Footer */}
        <footer className="mt-0 pt-4 border-t border-slate-700/30 text-center">
          <div className="mb-8">
            <img
              src="/logos.png"
              alt="multerless"
              className="w-full max-w-lg mx-auto drop-shadow-2xl"
              style={{ filter: "drop-shadow(0 0 20px rgba(52, 211, 153, 0.2))" }}
            />
          </div>
          <p
            className="text-slate-400 mb-4 text-lg"
            dangerouslySetInnerHTML={{ __html: t.footer_initiative }}
          />
          <p
            className="text-slate-500 text-sm max-w-2xl mx-auto leading-relaxed"
            dangerouslySetInnerHTML={{ __html: t.footer_status }}
          />
        </footer>
      </article>
    </div>
  );
}
