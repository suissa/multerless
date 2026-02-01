import "./style.css";
import { translations } from "./i18n.js";

const app = document.querySelector("#app");

// Language detection
const getInitialLang = () => {
  // "tente reconhecer o idioma ddo navegador do usuário se não, o padrão é ingles"
  const browserLang = navigator.language || navigator.userLanguage || "en";
  return browserLang.toLowerCase().startsWith("pt") ? "pt" : "en";
};

let currentLang = getInitialLang();

const render = (lang) => {
  const t = translations[lang];

  app.innerHTML = `
  <div style="min-height: 100vh; overflow: hidden;">
    <!-- Language Selector -->
    <div style="position: fixed; top: 1.5rem; right: 1.5rem; z-index: 100;">
      <select id="lang-select" style="background: rgba(15, 23, 42, 0.8); color: rgb(203, 213, 225); border: 1px solid rgba(71, 85, 105, 0.5); padding: 0.5rem 1rem; border-radius: 0.5rem; cursor: pointer; backdrop-filter: blur(4px); outline: none;">
        <option value="en" ${lang === 'en' ? 'selected' : ''}>🇺🇸 English</option>
        <option value="pt" ${lang === 'pt' ? 'selected' : ''}>🇧🇷 Português</option>
      </select>
    </div>

    <!-- Background gradient effects -->
    <div style="position: fixed; inset: 0; overflow: hidden; pointer-events: none;">
      <div class="animate-pulse-slow" style="position: absolute; top: 0; right: 0; width: 24rem; height: 24rem; background: rgba(239, 68, 68, 0.3); border-radius: 9999px; filter: blur(80px);"></div>
      <div class="animate-pulse-slow" style="position: absolute; bottom: 0; left: 0; width: 24rem; height: 24rem; background: rgba(239, 68, 68, 0.2); border-radius: 9999px; filter: blur(80px); animation-delay: 1s;"></div>
    </div>

    <!-- Main content -->
    <article style="position: relative; z-index: 10; max-width: 56rem; margin: 0 auto; padding: 2rem 1.5rem;">
      
      <!-- Alarme Header -->
      <header style="text-align: center; padding: 4rem 0 3rem;">
        <div style="display: inline-block; background: rgba(239, 68, 68, 0.1); border: 2px solid rgba(239, 68, 68, 0.5); border-radius: 9999px; padding: 0.5rem 1.5rem; margin-bottom: 2rem;">
          <span style="font-size: 1.5rem; margin-right: 0.5rem;">🚨</span>
          <span style="color: rgb(252, 165, 165); font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; font-size: 0.875rem;">${t.alert_title}</span>
        </div>
        
        <h1 style="font-size: clamp(2rem, 6vw, 3.5rem); font-weight: 900; line-height: 1.1; margin-bottom: 1.5rem;">
          ${t.hero_title_prefix} <span style="background: linear-gradient(to right, rgb(239, 68, 68), rgb(220, 38, 38)); background-clip: text; -webkit-background-clip: text; color: transparent;">Multer</span> ${t.hero_title_suffix}<br/>
          <span style="color: rgb(203, 213, 225);">${t.hero_subtitle_1}</span> <span style="background: linear-gradient(to right, rgb(239, 68, 68), rgb(220, 38, 38)); background-clip: text; -webkit-background-clip: text; color: transparent;">${t.hero_subtitle_2}</span>
        </h1>
        
        <p style="font-size: 1.125rem; color: rgb(203, 213, 225); line-height: 1.75;">
          ${t.hero_desc}
        </p>
      </header>

      <!-- Estatísticas Alarmantes -->
      <section style="margin: 4rem 0;">
        <div style="background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(24px); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 1rem; padding: 2rem;">
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 2rem;">
            <span style="font-size: 1.5rem;">📊</span>
            <h2 style="font-size: 1.75rem; font-weight: 800; color: rgb(252, 165, 165);">${t.stats_title}</h2>
          </div>
          
          <div style="display: grid; gap: 1.5rem; margin-bottom: 2rem;">
            <div style="background: rgba(239, 68, 68, 0.1); border-left: 4px solid rgb(239, 68, 68); padding: 1.5rem; border-radius: 0.5rem;">
              <div style="font-size: 2.5rem; font-weight: 900; color: rgb(239, 68, 68); margin-bottom: 0.5rem;">${t.stat_1_val}</div>
              <div style="color: rgb(203, 213, 225);">${t.stat_1_desc}</div>
            </div>
            
            <div style="background: rgba(239, 68, 68, 0.1); border-left: 4px solid rgb(220, 38, 38); padding: 1.5rem; border-radius: 0.5rem;">
              <div style="font-size: 2.5rem; font-weight: 900; color: rgb(220, 38, 38); margin-bottom: 0.5rem;">${t.stat_2_val}</div>
              <div style="color: rgb(203, 213, 225);">${t.stat_2_desc}</div>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
              <div style="background: rgba(239, 68, 68, 0.1); border-left: 4px solid rgb(185, 28, 28); padding: 1.5rem; border-radius: 0.5rem;">
                <div style="font-size: 2rem; font-weight: 900; color: rgb(185, 28, 28); margin-bottom: 0.5rem;">${t.stat_3_val}</div>
                <div style="color: rgb(203, 213, 225); font-size: 0.875rem;">${t.stat_3_desc}</div>
              </div>
              
              <div style="background: rgba(239, 68, 68, 0.1); border-left: 4px solid rgb(127, 29, 29); padding: 1.5rem; border-radius: 0.5rem;">
                <div style="font-size: 2rem; font-weight: 900; color: rgb(127, 29, 29); margin-bottom: 0.5rem;">${t.stat_4_val}</div>
                <div style="color: rgb(203, 213, 225); font-size: 0.875rem;">${t.stat_4_desc}</div>
              </div>
            </div>
          </div>
          
          <div style="background: rgba(239, 68, 68, 0.2); border: 2px solid rgba(239, 68, 68, 0.5); border-radius: 0.75rem; padding: 1.5rem;">
            <div style="font-weight: 700; color: rgb(252, 165, 165); margin-bottom: 0.5rem;">${t.vuln_title}</div>
            <div style="color: rgb(226, 232, 240);">${t.vuln_desc}</div>
          </div>
        </div>
      </section>

      <!-- Comparação -->
      <section style="margin: 4rem 0;">
        <h2 style="font-size: 2rem; font-weight: 800; text-align: center; margin-bottom: 2rem;">
          <span style="background: linear-gradient(to right, rgb(239, 68, 68), rgb(220, 38, 38)); background-clip: text; -webkit-background-clip: text; color: transparent;">Multer</span>
          <span style="color: rgb(148, 163, 184); font-weight: 400; margin: 0 1rem;">${t.comparison_title_vs}</span>
          <span style="background: linear-gradient(to right, rgb(52, 211, 153), rgb(16, 185, 129)); background-clip: text; -webkit-background-clip: text; color: transparent;">multerless</span>
        </h2>
        
        <div style="background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(24px); border: 1px solid rgba(71, 85, 105, 0.5); border-radius: 1rem; overflow: hidden;">
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: rgba(30, 41, 59, 0.8);">
                <th style="padding: 1rem; text-align: left; color: rgb(203, 213, 225); font-weight: 600; border-bottom: 1px solid rgba(71, 85, 105, 0.5);">${t.table_header_aspect}</th>
                <th style="padding: 1rem; text-align: center; color: rgb(252, 165, 165); font-weight: 600; border-bottom: 1px solid rgba(71, 85, 105, 0.5);">Multer</th>
                <th style="padding: 1rem; text-align: center; color: rgb(110, 231, 183); font-weight: 600; border-bottom: 1px solid rgba(71, 85, 105, 0.5);">multerless</th>
              </tr>
            </thead>
            <tbody style="color: rgb(203, 213, 225);">
              <tr style="border-bottom: 1px solid rgba(71, 85, 105, 0.3);">
                <td style="padding: 1rem;">${t.table_row_deps}</td>
                <td style="padding: 1rem; text-align: center; color: rgb(239, 68, 68);">${t.table_row_deps_multer}</td>
                <td style="padding: 1rem; text-align: center; color: rgb(52, 211, 153); font-weight: 700;">${t.table_row_deps_multerless}</td>
              </tr>
              <tr style="border-bottom: 1px solid rgba(71, 85, 105, 0.3);">
                <td style="padding: 1rem;">${t.table_row_update}</td>
                <td style="padding: 1rem; text-align: center; color: rgb(239, 68, 68);">${t.table_row_update_multer}</td>
                <td style="padding: 1rem; text-align: center; color: rgb(52, 211, 153); font-weight: 700;">${t.table_row_update_multerless}</td>
              </tr>
              <tr style="border-bottom: 1px solid rgba(71, 85, 105, 0.3);">
                <td style="padding: 1rem;">${t.table_row_prs}</td>
                <td style="padding: 1rem; text-align: center; color: rgb(239, 68, 68);">${t.table_row_prs_multer}</td>
                <td style="padding: 1rem; text-align: center; color: rgb(52, 211, 153); font-weight: 700;">${t.table_row_prs_multerless}</td>
              </tr>
              <tr style="border-bottom: 1px solid rgba(71, 85, 105, 0.3);">
                <td style="padding: 1rem;">${t.table_row_issues}</td>
                <td style="padding: 1rem; text-align: center; color: rgb(239, 68, 68);">${t.table_row_issues_multer}</td>
                <td style="padding: 1rem; text-align: center; color: rgb(52, 211, 153); font-weight: 700;">${t.table_row_issues_multerless}</td>
              </tr>
              <tr style="border-bottom: 1px solid rgba(71, 85, 105, 0.3);">
                <td style="padding: 1rem;">${t.table_row_vuln}</td>
                <td style="padding: 1rem; text-align: center; color: rgb(239, 68, 68);">${t.table_row_vuln_multer}</td>
                <td style="padding: 1rem; text-align: center; color: rgb(52, 211, 153); font-weight: 700;">${t.table_row_vuln_multerless}</td>
              </tr>
              <tr>
                <td style="padding: 1rem;">${t.table_row_breaking}</td>
                <td style="padding: 1rem; text-align: center; color: rgb(239, 68, 68);">${t.table_row_breaking_multer}</td>
                <td style="padding: 1rem; text-align: center; color: rgb(52, 211, 153); font-weight: 700;">${t.table_row_breaking_multerless}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- A Solução -->
      <section style="margin: 4rem 0;">
        <div style="text-align: center; margin-bottom: 3rem;">
          <h2 style="font-size: 2.25rem; font-weight: 900; margin-bottom: 1rem;">
            ${t.solution_title} <span style="background: linear-gradient(to right, rgb(52, 211, 153), rgb(16, 185, 129)); background-clip: text; -webkit-background-clip: text; color: transparent;">multerless</span>
          </h2>
          <p style="font-size: 1.125rem; color: rgb(203, 213, 225);">${t.solution_subtitle}</p>
        </div>
        
        <div style="display: grid; gap: 1.5rem; margin-bottom: 3rem;">
          <div class="stat-card" style="cursor: default;">
            <div style="position: relative; z-index: 10;">
              <div style="font-size: 2rem; margin-bottom: 1rem;">🎯</div>
              <h3 style="font-size: 1.5rem; font-weight: 700; color: rgb(110, 231, 183); margin-bottom: 0.75rem;">${t.feature_1_title}</h3>
              <p style="color: rgb(203, 213, 225); line-height: 1.75;">
                ${t.feature_1_desc}
              </p>
            </div>
          </div>
          
          <div class="stat-card" style="cursor: default;">
            <div style="position: relative; z-index: 10;">
              <div style="font-size: 2rem; margin-bottom: 1rem;">📌</div>
              <h3 style="font-size: 1.5rem; font-weight: 700; color: rgb(110, 231, 183); margin-bottom: 0.75rem;">${t.feature_2_title}</h3>
              <p style="color: rgb(203, 213, 225); line-height: 1.75;">
                ${t.feature_2_desc}
              </p>
            </div>
          </div>
          
          <div class="stat-card" style="cursor: default;">
            <div style="position: relative; z-index: 10;">
              <div style="font-size: 2rem; margin-bottom: 1rem;">🔒</div>
              <h3 style="font-size: 1.5rem; font-weight: 700; color: rgb(110, 231, 183); margin-bottom: 0.75rem;">${t.feature_3_title}</h3>
              <p style="color: rgb(203, 213, 225); line-height: 1.75;">
                ${t.feature_3_desc}
              </p>
            </div>
          </div>
          
          <div class="stat-card" style="cursor: default;">
            <div style="position: relative; z-index: 10;">
              <div style="font-size: 2rem; margin-bottom: 1rem;">🤖</div>
              <h3 style="font-size: 1.5rem; font-weight: 700; color: rgb(110, 231, 183); margin-bottom: 0.75rem;">${t.feature_4_title}</h3>
              <p style="color: rgb(203, 213, 225); line-height: 1.75;">
                ${t.feature_4_desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Migração Trivial -->
      <section style="margin: 4rem 0;">
        <h2 style="font-size: 2rem; font-weight: 800; text-align: center; margin-bottom: 2rem; color: rgb(241, 245, 249);">
          ${t.migration_title} <span style="background: linear-gradient(to right, rgb(52, 211, 153), rgb(16, 185, 129)); background-clip: text; -webkit-background-clip: text; color: transparent;">${t.migration_subtitle}</span>
        </h2>
        
        <div style="display: grid; gap: 1.5rem;">
          <div style="background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(24px); border: 1px solid rgba(239, 68, 68, 0.5); border-radius: 1rem; padding: 1.5rem;">
            <div style="color: rgb(252, 165, 165); font-weight: 700; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
              <span style="font-size: 1.25rem;">❌</span> ${t.before_label}
            </div>
            <pre style="overflow-x: auto;"><code style="color: rgb(203, 213, 225); font-family: 'Courier New', monospace;"><span style="color: rgb(167, 139, 250);">import</span> multer <span style="color: rgb(167, 139, 250);">from</span> <span style="color: rgb(239, 68, 68);">'multer'</span>;

<span style="color: rgb(167, 139, 250);">const</span> upload = <span style="color: rgb(34, 211, 238);">multer</span>({ dest: <span style="color: rgb(52, 211, 153);">'uploads/'</span> });</code></pre>
          </div>
          
          <div style="background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(24px); border: 1px solid rgba(52, 211, 153, 0.5); border-radius: 1rem; padding: 1.5rem;">
            <div style="color: rgb(110, 231, 183); font-weight: 700; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
              <span style="font-size: 1.25rem;">✅</span> ${t.after_label}
            </div>
            <pre style="overflow-x: auto;"><code style="color: rgb(203, 213, 225); font-family: 'Courier New', monospace;"><span style="color: rgb(167, 139, 250);">import</span> multer <span style="color: rgb(167, 139, 250);">from</span> <span style="color: rgb(52, 211, 153);">'@purecore/multerless'</span>;

<span style="color: rgb(167, 139, 250);">const</span> upload = <span style="color: rgb(34, 211, 238);">multer</span>({ dest: <span style="color: rgb(52, 211, 153);">'uploads/'</span> });</code></pre>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 2rem; padding: 1.5rem; background: rgba(52, 211, 153, 0.1); border-radius: 1rem;">
          <p style="font-size: 1.25rem; color: rgb(110, 231, 183); font-weight: 700;">${t.migration_note_1}</p>
          <p style="color: rgb(203, 213, 225); margin-top: 0.5rem;">${t.migration_note_2}</p>
        </div>
      </section>

      <!-- Instalação -->
      <section style="margin: 4rem 0;">
        <div style="background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(24px); border: 2px solid rgba(52, 211, 153, 0.5); border-radius: 1rem; padding: 2rem; text-align: center;">
          <div style="font-size: 0.875rem; font-weight: 600; color: rgb(110, 231, 183); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 1rem;">${t.install_title}</div>
          <div style="display: flex; align-items: center; justify-content: center; gap: 1rem; flex-wrap: wrap;">
            <code style="font-size: 1.25rem; color: rgb(167, 139, 250); font-family: 'Courier New', monospace; background: rgba(0, 0, 0, 0.3); padding: 1rem 1.5rem; border-radius: 0.5rem;">npm install @purecore/multerless</code>
            <button 
              id="copy-btn"
              style="padding: 1rem 2rem; background: linear-gradient(to right, rgb(52, 211, 153), rgb(16, 185, 129)); border: none; border-radius: 0.75rem; font-weight: 700; cursor: pointer; color: rgb(15, 23, 42); transition: all 0.3s;"
            >
              ${t.copy_button}
            </button>
          </div>
        </div>
      </section>

      <!-- Chamada para Ação -->
      <section style="margin: 4rem 0; text-align: center;">
        <div style="background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(52, 211, 153, 0.1)); border: 2px solid rgba(52, 211, 153, 0.3); border-radius: 1.5rem; padding: 3rem 2rem;">
          <h2 style="font-size: 2.5rem; font-weight: 900; margin-bottom: 1.5rem; line-height: 1.2;">
            ${t.cta_title_prefix} <span style="background: linear-gradient(to right, rgb(239, 68, 68), rgb(220, 38, 38)); background-clip: text; -webkit-background-clip: text; color: transparent;">${t.cta_title_suffix}</span>
          </h2>
          
          <p style="font-size: 1.125rem; color: rgb(203, 213, 225); line-height: 1.75; max-width: 42rem; margin: 0 auto 2rem;">
            ${t.cta_desc}
          </p>
          
          <div style="display: grid; gap: 1rem; max-width: 32rem; margin: 2rem auto;">
            <div style="text-align: left; padding: 1rem; background: rgba(15, 23, 42, 0.6); border-radius: 0.75rem; border-left: 4px solid rgb(52, 211, 153);">
              <div style="font-weight: 700; color: rgb(110, 231, 183);">${t.checklist_1_title}</div>
              <div style="color: rgb(203, 213, 225); font-size: 0.875rem;">${t.checklist_1_desc}</div>
            </div>
            <div style="text-align: left; padding: 1rem; background: rgba(15, 23, 42, 0.6); border-radius: 0.75rem; border-left: 4px solid rgb(52, 211, 153);">
              <div style="font-weight: 700; color: rgb(110, 231, 183);">${t.checklist_2_title}</div>
              <div style="color: rgb(203, 213, 225); font-size: 0.875rem;">${t.checklist_2_desc}</div>
            </div>
            <div style="text-align: left; padding: 1rem; background: rgba(15, 23, 42, 0.6); border-radius: 0.75rem; border-left: 4px solid rgb(52, 211, 153);">
              <div style="font-weight: 700; color: rgb(110, 231, 183);">${t.checklist_3_title}</div>
              <div style="color: rgb(203, 213, 225); font-size: 0.875rem;">${t.checklist_3_desc}</div>
            </div>
          </div>
          
          <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-top: 2rem;">
            <a 
              href="https://github.com/suissa/multerless" 
              target="_blank"
              class="hover-effect-github"
              style="padding: 1rem 2rem; background: linear-gradient(to right, rgb(52, 211, 153), rgb(16, 185, 129)); border-radius: 0.75rem; font-weight: 700; text-decoration: none; color: rgb(15, 23, 42); transition: all 0.3s; display: inline-block;"
            >
              ⭐ GitHub
            </a>
            <a 
              href="https://npmjs.com/package/@purecore/multerless" 
              target="_blank"
              class="hover-effect-npm"
              style="padding: 1rem 2rem; background: rgba(52, 211, 153, 0.1); border: 2px solid rgb(52, 211, 153); border-radius: 0.75rem; font-weight: 700; text-decoration: none; color: rgb(110, 231, 183); transition: all 0.3s; display: inline-block;"
            >
              📦 npm
            </a>
          </div>
        </div>
      </section>

      <!-- Quote Final -->
      <section style="margin: 4rem 0; text-align: center;">
        <blockquote style="font-size: 1.5rem; font-style: italic; color: rgb(203, 213, 225); border-left: 4px solid rgb(52, 211, 153); padding-left: 2rem; margin: 0;">
          ${t.quote}
        </blockquote>
        <p style="margin-top: 2rem; font-size: 1.25rem; font-weight: 700; color: rgb(239, 68, 68);">
          ${t.footer_warning}
        </p>
      </section>

      <!-- Footer -->
      <footer style="margin-top: 6rem; padding-top: 3rem; border-top: 1px solid rgba(71, 85, 105, 0.3); text-align: center;">
        <div style="margin-bottom: 1.5rem;">
          <img src="https://i.imgur.com/4w12Her.png" alt="multerless" style="width: 100%; max-width: 600px; height: auto; margin: 0 auto; filter: drop-shadow(0 0 20px rgba(52, 211, 153, 0.3));" />
        </div>
        <p style="color: rgb(148, 163, 184); margin-bottom: 1rem;">
          ${t.footer_initiative}
        </p>
        <p style="color: rgb(100, 116, 139); font-size: 0.875rem;">
          ${t.footer_status}
        </p>
      </footer>
    </article>
  </div>
  `;

  // Re-attach event listeners
  const select = document.getElementById("lang-select");
  select.addEventListener("change", (e) => {
    currentLang = e.target.value;
    render(currentLang);
  });

  const copyBtn = document.getElementById("copy-btn");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText('npm install @purecore/multerless');
      copyBtn.textContent = t.copied_button;
      setTimeout(() => {
        copyBtn.textContent = t.copy_button;
      }, 2000);
    });
    copyBtn.addEventListener("mouseover", () => {
      copyBtn.style.transform = 'scale(1.05)';
      copyBtn.style.boxShadow = '0 10px 25px -5px rgba(52, 211, 153, 0.5)';
    });
    copyBtn.addEventListener("mouseout", () => {
      copyBtn.style.transform = 'scale(1)';
      copyBtn.style.boxShadow = 'none';
    });
  }

  // Hover effects for github/npm buttons (using event delegation or just finding them)
  const githubBtn = document.querySelector(".hover-effect-github");
  if (githubBtn) {
    githubBtn.addEventListener("mouseover", () => {
        githubBtn.style.transform='translateY(-2px)';
        githubBtn.style.boxShadow='0 10px 25px -5px rgba(52, 211, 153, 0.5)';
    });
    githubBtn.addEventListener("mouseout", () => {
        githubBtn.style.transform='translateY(0)';
        githubBtn.style.boxShadow='none';
    });
  }

  const npmBtn = document.querySelector(".hover-effect-npm");
  if (npmBtn) {
    npmBtn.addEventListener("mouseover", () => {
        npmBtn.style.background='rgba(52, 211, 153, 0.2)';
    });
    npmBtn.addEventListener("mouseout", () => {
        npmBtn.style.background='rgba(52, 211, 153, 0.1)';
    });
  }
};

render(currentLang);

// Smooth scroll
document.documentElement.style.scrollBehavior = "smooth";
