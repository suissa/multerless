import "./style.css";

const app = document.querySelector("#app");

const stats = [
  {
    number: "0",
    suffix: "",
    label: "Dependencies",
    icon: "📦",
    description: "Pure Native Node.js",
    gradient: "linear-gradient(to right, rgb(52, 211, 153), rgb(20, 184, 166))",
  },
  {
    number: "10",
    suffix: "x",
    label: "Faster",
    icon: "⚡",
    description: "Than Multer",
    gradient:
      "linear-gradient(to right, rgb(167, 139, 250), rgb(168, 85, 247))",
  },
  {
    number: "100",
    suffix: "%",
    label: "Compatible",
    icon: "🔄",
    description: "Drop-in replacement",
    gradient:
      "linear-gradient(to right, rgb(244, 114, 182), rgb(251, 113, 133))",
  },
  {
    number: "5",
    suffix: "KB",
    label: "Bundle Size",
    icon: "📊",
    description: "Minimal footprint",
    gradient: "linear-gradient(to right, rgb(34, 211, 238), rgb(59, 130, 246))",
  },
];

const features = [
  {
    icon: "🚀",
    title: "Native Performance",
    description: "Built with pure Node.js streams for maximum efficiency",
  },
  {
    icon: "💾",
    title: "Multiple Storage",
    description: "Disk, Memory, S3, and GCS storage engines",
  },
  {
    icon: "🔒",
    title: "Type Safe",
    description: "Full TypeScript support with comprehensive types",
  },
  {
    icon: "⚙️",
    title: "Highly Configurable",
    description: "File filters, size limits, and custom storage engines",
  },
];

app.innerHTML = `
  <div style="min-height: 100vh; overflow: hidden;">
    <!-- Background gradient  effects -->
    <div style="position: fixed; inset: 0; overflow: hidden; pointer-events: none;">
      <div class="animate-pulse-slow" style="position: absolute; top: 0; right: 0; width: 24rem; height: 24rem; background: rgba(139, 92, 246, 0.3); border-radius: 9999px; filter: blur(80px);"></div>
      <div class="animate-pulse-slow" style="position: absolute; bottom: 0; left: 0; width: 24rem; height: 24rem; background: rgba(217, 70, 239, 0.2); border-radius: 9999px; filter: blur(80px); animation-delay: 1s;"></div>
    </div>

    <!-- Main content -->
    <div style="position: relative; z-index: 10;">
      <!-- Header -->
      <header style="max-width: 80rem; margin: 0 auto; padding: 4rem 1.5rem 2rem;">
        <div class="animate-fade-in" style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
          <div style="display: flex; align-items: center; gap: 1rem;">
            <div class="animate-float" style="font-size: 3rem;">📤</div>
            <div>
              <h1 class="gradient-text" style="font-size: 1.5rem; font-weight: 700;">@purecore/native-multer</h1>
              <p style="font-size: 0.875rem; color: rgb(148, 163, 184); margin-top: 0.25rem;">Zero Dependencies File Upload</p>
            </div>
          </div>
          <a 
            href="https://github.com/purecore/native-multer" 
            target="_blank"
            style="padding: 0.75rem 1.5rem; background: linear-gradient(to right, rgb(124, 58, 237), rgb(192, 38, 211)); border-radius: 0.75rem; font-weight: 600; transition: all 0.3s; text-decoration: none; color: white;"
            onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 10px 25px -5px rgba(139, 92, 246, 0.5)'"
            onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='none'"
          >
            View on GitHub
          </a>
        </div>
      </header>

      <!-- Hero section -->
      <section class="animate-slide-up" style="max-width: 80rem; margin: 0 auto; padding: 4rem 1.5rem; text-align: center;">
        <h2 style="font-size: clamp(3rem, 8vw, 4.5rem); font-weight: 900; margin-bottom: 1.5rem; line-height: 1.1;">
          File Upload
          <span class="gradient-text" style="display: block; margin-top: 0.5rem;">Reimagined</span>
        </h2>
        <p style="font-size: 1.25rem; color: rgb(203, 213, 225); max-width: 42rem; margin: 0 auto 3rem;">
          Native Node.js multipart/form-data parser. Drop-in replacement for Multer with 
          <span style="color: rgb(167, 139, 250); font-weight: 600;">superior performance</span> and 
          <span style="color: rgb(232, 121, 249); font-weight: 600;">zero dependencies</span>.
        </p>
        
        <!-- Installation -->
        <div style="max-width: 42rem; margin: 0 auto 4rem;">
          <div style="background: rgba(15, 23, 42, 0.5); backdrop-filter: blur(24px); border: 1px solid rgba(71, 85, 105, 0.5); border-radius: 1rem; padding: 1.5rem; text-align: left;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
              <span style="font-size: 0.875rem; font-weight: 600; color: rgb(148, 163, 184); text-transform: uppercase; letter-spacing: 0.05em;">Installation</span>
              <button 
                onclick="navigator.clipboard.writeText('npm install @purecore/native-multer'); this.textContent='Copied!'; setTimeout(() => this.textContent='Copy', 2000)"
                style="font-size: 0.75rem; padding: 0.25rem 0.75rem; background: rgb(30, 41, 59); border: none; border-radius: 0.5rem; cursor: pointer; color: white; transition: background 0.2s;"
                onmouseover="this.style.background='rgb(51, 65, 85)'"
                onmouseout="this.style.background='rgb(30, 41, 59)'"
              >
                Copy
              </button>
            </div>
            <code style="color: rgb(167, 139, 250); font-family: 'Courier New', monospace; font-size: 1.125rem;">npm install @purecore/native-multer</code>
          </div>
        </div>

        <!-- Stats grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; max-width: 75rem; margin: 0 auto;">
          ${stats
            .map(
              (stat, index) => `
            <div 
              class="stat-card animate-slide-up" 
              style="animation-delay: ${index * 100}ms; cursor: pointer;"
            >
              <div style="position: relative; z-index: 10;">
                <div style="font-size: 3rem; margin-bottom: 1rem; transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">${stat.icon}</div>
                <div style="margin-bottom: 0.5rem;">
                  <span style="font-size: 3.75rem; font-weight: 900; background-image: ${stat.gradient}; background-clip: text; -webkit-background-clip: text; color: transparent;">
                    ${stat.number}
                  </span>
                  <span style="font-size: 1.875rem; font-weight: 700; color: rgb(203, 213, 225);">${stat.suffix}</span>
                </div>
                <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem; color: rgb(241, 245, 249);">${stat.label}</h3>
                <p style="font-size: 0.875rem; color: rgb(148, 163, 184);">${stat.description}</p>
              </div>
            </div>
          `,
            )
            .join("")}
        </div>
      </section>

      <!-- Features section -->
      <section style="max-width: 80rem; margin: 0 auto; padding: 5rem 1.5rem;">
        <h3 class="gradient-text" style="font-size: 2.25rem; font-weight: 900; text-align: center; margin-bottom: 3rem;">Key Features</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; max-width: 64rem; margin: 0 auto;">
          ${features
            .map(
              (feature, index) => `
            <div 
              class="stat-card animate-slide-up" 
              style="animation-delay: ${index * 100}ms;"
            >
              <div style="position: relative; z-index: 10;">
                <div style="font-size: 2.5rem; margin-bottom: 1rem; transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">${feature.icon}</div>
                <h4 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 0.75rem; color: rgb(241, 245, 249);">${feature.title}</h4>
                <p style="color: rgb(148, 163, 184);">${feature.description}</p>
              </div>
            </div>
          `,
            )
            .join("")}
        </div>
      </section>

      <!-- Code example -->
      <section style="max-width: 80rem; margin: 0 auto; padding: 5rem 1.5rem;">
        <h3 class="gradient-text" style="font-size: 2.25rem; font-weight: 900; text-align: center; margin-bottom: 3rem;">Quick Start</h3>
        <div style="max-width: 48rem; margin: 0 auto;">
          <div class="stat-card">
            <div style="position: relative; z-index: 10;">
              <pre style="text-align: left; overflow-x: auto; font-size: clamp(0.75rem, 2vw, 1rem);"><code><span style="color: rgb(167, 139, 250);">import</span> <span style="color: rgb(203, 213, 225);">multer</span> <span style="color: rgb(167, 139, 250);">from</span> <span style="color: rgb(52, 211, 153);">'@purecore/native-multer'</span>;
<span style="color: rgb(167, 139, 250);">import</span> <span style="color: rgb(203, 213, 225);">express</span> <span style="color: rgb(167, 139, 250);">from</span> <span style="color: rgb(52, 211, 153);">'express'</span>;

<span style="color: rgb(167, 139, 250);">const</span> <span style="color: rgb(203, 213, 225);">app</span> = <span style="color: rgb(34, 211, 238);">express</span>();
<span style="color: rgb(167, 139, 250);">const</span> <span style="color: rgb(203, 213, 225);">upload</span> = <span style="color: rgb(34, 211, 238);">multer</span>({ 
  <span style="color: rgb(203, 213, 225);">storage</span>: multer.<span style="color: rgb(34, 211, 238);">diskStorage</span>({ 
    <span style="color: rgb(203, 213, 225);">destination</span>: <span style="color: rgb(52, 211, 153);">'uploads/'</span> 
  }) 
});

app.<span style="color: rgb(34, 211, 238);">post</span>(<span style="color: rgb(52, 211, 153);">'/upload'</span>, upload.<span style="color: rgb(34, 211, 238);">single</span>(<span style="color: rgb(52, 211, 153);">'file'</span>), (req, res) => {
  res.<span style="color: rgb(34, 211, 238);">json</span>({ <span style="color: rgb(203, 213, 225);">message</span>: <span style="color: rgb(52, 211, 153);">'File uploaded!'</span>, <span style="color: rgb(203, 213, 225);">file</span>: req.file });
});</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer style="max-width: 80rem; margin: 0 auto; padding: 3rem 1.5rem; text-align: center;">
        <p style="color: rgb(148, 163, 184); margin-bottom: 1rem;">Built with ❤️ by the PureCore Team</p>
        <div style="display: flex; align-items: center; justify-content: center; gap: 1.5rem; flex-wrap: wrap;">
          <a href="https://github.com/purecore/native-multer" style="color: rgb(148, 163, 184); text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='rgb(167, 139, 250)'" onmouseout="this.style.color='rgb(148, 163, 184)'">GitHub</a>
          <a href="https://npmjs.com/package/@purecore/native-multer" style="color: rgb(148, 163, 184); text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='rgb(167, 139, 250)'" onmouseout="this.style.color='rgb(148, 163, 184)'">npm</a>
          <a href="#" style="color: rgb(148, 163, 184); text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='rgb(167, 139, 250)'" onmouseout="this.style.color='rgb(148, 163, 184)'">Documentation</a>
        </div>
      </footer>
    </div>
  </div>
`;

// Add smooth scroll
document.documentElement.style.scrollBehavior = "smooth";
