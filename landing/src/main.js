import "./style.css";

const app = document.querySelector("#app");

app.innerHTML = `
  <div style="min-height: 100vh; overflow: hidden;">
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
          <span style="color: rgb(252, 165, 165); font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; font-size: 0.875rem;">ALERTA CRÍTICO DE SEGURANÇA</span>
        </div>
        
        <h1 style="font-size: clamp(2rem, 6vw, 3.5rem); font-weight: 900; line-height: 1.1; margin-bottom: 1.5rem;">
          O <span style="background: linear-gradient(to right, rgb(239, 68, 68), rgb(220, 38, 38)); background-clip: text; -webkit-background-clip: text; color: transparent;">Multer</span> está em suas APIs<br/>
          <span style="color: rgb(203, 213, 225);">e você precisa saber disso</span> <span style="background: linear-gradient(to right, rgb(239, 68, 68), rgb(220, 38, 38)); background-clip: text; -webkit-background-clip: text; color: transparent;">AGORA</span>
        </h1>
        
        <p style="font-size: 1.125rem; color: rgb(203, 213, 225); line-height: 1.75;">
          Se você desenvolveu ou mantém uma API Node.js que processa uploads de arquivos, 
          há uma chance de <strong style="color: rgb(239, 68, 68);">95%</strong> de que você esteja usando o multer.
        </p>
      </header>

      <!-- Estatísticas Alarmantes -->
      <section style="margin: 4rem 0;">
        <div style="background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(24px); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 1rem; padding: 2rem;">
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 2rem;">
            <span style="font-size: 1.5rem;">📊</span>
            <h2 style="font-size: 1.75rem; font-weight: 800; color: rgb(252, 165, 165);">Os Números que Deveriam te Alarmar</h2>
          </div>
          
          <div style="display: grid; gap: 1.5rem; margin-bottom: 2rem;">
            <div style="background: rgba(239, 68, 68, 0.1); border-left: 4px solid rgb(239, 68, 68); padding: 1.5rem; border-radius: 0.5rem;">
              <div style="font-size: 2.5rem; font-weight: 900; color: rgb(239, 68, 68); margin-bottom: 0.5rem;">9.4 MILHÕES</div>
              <div style="color: rgb(203, 213, 225);">downloads por semana de uma biblioteca sem manutenção ativa</div>
            </div>
            
            <div style="background: rgba(239, 68, 68, 0.1); border-left: 4px solid rgb(220, 38, 38); padding: 1.5rem; border-radius: 0.5rem;">
              <div style="font-size: 2.5rem; font-weight: 900; color: rgb(220, 38, 38); margin-bottom: 0.5rem;">6 MESES</div>
              <div style="color: rgb(203, 213, 225);">sem nenhuma atualização</div>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
              <div style="background: rgba(239, 68, 68, 0.1); border-left: 4px solid rgb(185, 28, 28); padding: 1.5rem; border-radius: 0.5rem;">
                <div style="font-size: 2rem; font-weight: 900; color: rgb(185, 28, 28); margin-bottom: 0.5rem;">69 PRs</div>
                <div style="color: rgb(203, 213, 225); font-size: 0.875rem;">pendentes aguardando revisão</div>
              </div>
              
              <div style="background: rgba(239, 68, 68, 0.1); border-left: 4px solid rgb(127, 29, 29); padding: 1.5rem; border-radius: 0.5rem;">
                <div style="font-size: 2rem; font-weight: 900; color: rgb(127, 29, 29); margin-bottom: 0.5rem;">178 Issues</div>
                <div style="color: rgb(203, 213, 225); font-size: 0.875rem;">abertas sem resolução</div>
              </div>
            </div>
          </div>
          
          <div style="background: rgba(239, 68, 68, 0.2); border: 2px solid rgba(239, 68, 68, 0.5); border-radius: 0.75rem; padding: 1.5rem;">
            <div style="font-weight: 700; color: rgb(252, 165, 165); margin-bottom: 0.5rem;">⚠️ VULNERABILIDADES CRÍTICAS</div>
            <div style="color: rgb(226, 232, 240);">Brechas de segurança conhecidas e não corrigidas detectadas. Milhões de aplicações em produção potencialmente expostas.</div>
          </div>
        </div>
      </section>

      <!-- Comparação -->
      <section style="margin: 4rem 0;">
        <h2 style="font-size: 2rem; font-weight: 800; text-align: center; margin-bottom: 2rem;">
          <span style="background: linear-gradient(to right, rgb(239, 68, 68), rgb(220, 38, 38)); background-clip: text; -webkit-background-clip: text; color: transparent;">Multer</span>
          <span style="color: rgb(148, 163, 184); font-weight: 400; margin: 0 1rem;">vs</span>
          <span style="background: linear-gradient(to right, rgb(52, 211, 153), rgb(16, 185, 129)); background-clip: text; -webkit-background-clip: text; color: transparent;">nexMulter</span>
        </h2>
        
        <div style="background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(24px); border: 1px solid rgba(71, 85, 105, 0.5); border-radius: 1rem; overflow: hidden;">
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: rgba(30, 41, 59, 0.8);">
                <th style="padding: 1rem; text-align: left; color: rgb(203, 213, 225); font-weight: 600; border-bottom: 1px solid rgba(71, 85, 105, 0.5);">Aspecto</th>
                <th style="padding: 1rem; text-align: center; color: rgb(252, 165, 165); font-weight: 600; border-bottom: 1px solid rgba(71, 85, 105, 0.5);">Multer</th>
                <th style="padding: 1rem; text-align: center; color: rgb(110, 231, 183); font-weight: 600; border-bottom: 1px solid rgba(71, 85, 105, 0.5);">nexMulter</th>
              </tr>
            </thead>
            <tbody style="color: rgb(203, 213, 225);">
              <tr style="border-bottom: 1px solid rgba(71, 85, 105, 0.3);">
                <td style="padding: 1rem;">Dependências Externas</td>
                <td style="padding: 1rem; text-align: center; color: rgb(239, 68, 68);">Sim (7)</td>
                <td style="padding: 1rem; text-align: center; color: rgb(52, 211, 153); font-weight: 700;">Zero</td>
              </tr>
              <tr style="border-bottom: 1px solid rgba(71, 85, 105, 0.3);">
                <td style="padding: 1rem;">Última Atualização</td>
                <td style="padding: 1rem; text-align: center; color: rgb(239, 68, 68);">6+ meses</td>
                <td style="padding: 1rem; text-align: center; color: rgb(52, 211, 153); font-weight: 700;">Semanal</td>
              </tr>
              <tr style="border-bottom: 1px solid rgba(71, 85, 105, 0.3);">
                <td style="padding: 1rem;">PRs Pendentes</td>
                <td style="padding: 1rem; text-align: center; color: rgb(239, 68, 68);">69</td>
                <td style="padding: 1rem; text-align: center; color: rgb(52, 211, 153); font-weight: 700;">0 (meta)</td>
              </tr>
              <tr style="border-bottom: 1px solid rgba(71, 85, 105, 0.3);">
                <td style="padding: 1rem;">Issues Abertas</td>
                <td style="padding: 1rem; text-align: center; color: rgb(239, 68, 68);">178</td>
                <td style="padding: 1rem; text-align: center; color: rgb(52, 211, 153); font-weight: 700;">Proativas</td>
              </tr>
              <tr style="border-bottom: 1px solid rgba(71, 85, 105, 0.3);">
                <td style="padding: 1rem;">Vulnerabilidades</td>
                <td style="padding: 1rem; text-align: center; color: rgb(239, 68, 68);">Não corrigidas</td>
                <td style="padding: 1rem; text-align: center; color: rgb(52, 211, 153); font-weight: 700;">Monitoradas</td>
              </tr>
              <tr>
                <td style="padding: 1rem;">Breaking Changes</td>
                <td style="padding: 1rem; text-align: center; color: rgb(239, 68, 68);">Possíveis</td>
                <td style="padding: 1rem; text-align: center; color: rgb(52, 211, 153); font-weight: 700;">Impossíveis</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- A Solução -->
      <section style="margin: 4rem 0;">
        <div style="text-align: center; margin-bottom: 3rem;">
          <h2 style="font-size: 2.25rem; font-weight: 900; margin-bottom: 1rem;">
            A Solução: <span style="background: linear-gradient(to right, rgb(52, 211, 153), rgb(16, 185, 129)); background-clip: text; -webkit-background-clip: text; color: transparent;">nexMulter</span>
          </h2>
          <p style="font-size: 1.125rem; color: rgb(203, 213, 225);">Uma nova filosofia de desenvolvimento para bibliotecas críticas</p>
        </div>
        
        <div style="display: grid; gap: 1.5rem; margin-bottom: 3rem;">
          <div class="stat-card" style="cursor: default;">
            <div style="position: relative; z-index: 10;">
              <div style="font-size: 2rem; margin-bottom: 1rem;">🎯</div>
              <h3 style="font-size: 1.5rem; font-weight: 700; color: rgb(110, 231, 183); margin-bottom: 0.75rem;">Zero Dependências Externas</h3>
              <p style="color: rgb(203, 213, 225); line-height: 1.75;">
                <strong>NUNCA. NENHUMA. JAMAIS.</strong><br/>
                Cada funcionalidade é implementada nativamente. Superfície de ataque minimizada ao extremo.
              </p>
            </div>
          </div>
          
          <div class="stat-card" style="cursor: default;">
            <div style="position: relative; z-index: 10;">
              <div style="font-size: 2rem; margin-bottom: 1rem;">📌</div>
              <h3 style="font-size: 1.5rem; font-weight: 700; color: rgb(110, 231, 183); margin-bottom: 0.75rem;">Versionamento Canônico Eterno</h3>
              <p style="color: rgb(203, 213, 225); line-height: 1.75;">
                Apenas <strong>2 versões para sempre</strong>: <code style="background: rgba(52, 211, 153, 0.1); padding: 0.25rem 0.5rem; border-radius: 0.25rem; color: rgb(110, 231, 183);">1.0.0</code> e <code style="background: rgba(52, 211, 153, 0.1); padding: 0.25rem 0.5rem; border-radius: 0.25rem; color: rgb(110, 231, 183);">latest</code><br/>
                <strong>Nunca haverá breaking changes.</strong>
              </p>
            </div>
          </div>
          
          <div class="stat-card" style="cursor: default;">
            <div style="position: relative; z-index: 10;">
              <div style="font-size: 2rem; margin-bottom: 1rem;">🔒</div>
              <h3 style="font-size: 1.5rem; font-weight: 700; color: rgb(110, 231, 183); margin-bottom: 0.75rem;">Interface Imutável</h3>
              <p style="color: rgb(203, 213, 225); line-height: 1.75;">
                Assinaturas de funções, tipos TypeScript e contratos de I/O <strong>nunca mudam</strong>.<br/>
                Você atualiza sem medo. Sem quebrar seu código.
              </p>
            </div>
          </div>
          
          <div class="stat-card" style="cursor: default;">
            <div style="position: relative; z-index: 10;">
              <div style="font-size: 2rem; margin-bottom: 1rem;">🤖</div>
              <h3 style="font-size: 1.5rem; font-weight: 700; color: rgb(110, 231, 183); margin-bottom: 0.75rem;">Automação Inteligente</h3>
              <p style="color: rgb(203, 213, 225); line-height: 1.75;">
                Pipeline semanal automatizado: analisa, avalia, implementa, testa e publica correções.<br/>
                <strong>Meta: 0 Pull Requests pendentes. Sempre.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Migração Trivial -->
      <section style="margin: 4rem 0;">
        <h2 style="font-size: 2rem; font-weight: 800; text-align: center; margin-bottom: 2rem; color: rgb(241, 245, 249);">
          Substituição Trivial: <span style="background: linear-gradient(to right, rgb(52, 211, 153), rgb(16, 185, 129)); background-clip: text; -webkit-background-clip: text; color: transparent;">Drop-in Replacement</span>
        </h2>
        
        <div style="display: grid; gap: 1.5rem;">
          <div style="background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(24px); border: 1px solid rgba(239, 68, 68, 0.5); border-radius: 1rem; padding: 1.5rem;">
            <div style="color: rgb(252, 165, 165); font-weight: 700; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
              <span style="font-size: 1.25rem;">❌</span> Antes (Multer)
            </div>
            <pre style="overflow-x: auto;"><code style="color: rgb(203, 213, 225); font-family: 'Courier New', monospace;"><span style="color: rgb(167, 139, 250);">import</span> multer <span style="color: rgb(167, 139, 250);">from</span> <span style="color: rgb(239, 68, 68);">'multer'</span>;

<span style="color: rgb(167, 139, 250);">const</span> upload = <span style="color: rgb(34, 211, 238);">multer</span>({ dest: <span style="color: rgb(52, 211, 153);">'uploads/'</span> });</code></pre>
          </div>
          
          <div style="background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(24px); border: 1px solid rgba(52, 211, 153, 0.5); border-radius: 1rem; padding: 1.5rem;">
            <div style="color: rgb(110, 231, 183); font-weight: 700; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
              <span style="font-size: 1.25rem;">✅</span> Depois (nexMulter)
            </div>
            <pre style="overflow-x: auto;"><code style="color: rgb(203, 213, 225); font-family: 'Courier New', monospace;"><span style="color: rgb(167, 139, 250);">import</span> multer <span style="color: rgb(167, 139, 250);">from</span> <span style="color: rgb(52, 211, 153);">'@purecore/nexMulter'</span>;

<span style="color: rgb(167, 139, 250);">const</span> upload = <span style="color: rgb(34, 211, 238);">multer</span>({ dest: <span style="color: rgb(52, 211, 153);">'uploads/'</span> });</code></pre>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 2rem; padding: 1.5rem; background: rgba(52, 211, 153, 0.1); border-radius: 1rem;">
          <p style="font-size: 1.25rem; color: rgb(110, 231, 183); font-weight: 700;">É só isso. Sem refatorações. Sem mudanças de código.</p>
          <p style="color: rgb(203, 213, 225); margin-top: 0.5rem;">Apenas troque o import.</p>
        </div>
      </section>

      <!-- Instalação -->
      <section style="margin: 4rem 0;">
        <div style="background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(24px); border: 2px solid rgba(52, 211, 153, 0.5); border-radius: 1rem; padding: 2rem; text-align: center;">
          <div style="font-size: 0.875rem; font-weight: 600; color: rgb(110, 231, 183); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 1rem;">Instale Agora</div>
          <div style="display: flex; align-items: center; justify-content: center; gap: 1rem; flex-wrap: wrap;">
            <code style="font-size: 1.25rem; color: rgb(167, 139, 250); font-family: 'Courier New', monospace; background: rgba(0, 0, 0, 0.3); padding: 1rem 1.5rem; border-radius: 0.5rem;">npm install @purecore/nexMulter</code>
            <button 
              onclick="navigator.clipboard.writeText('npm install @purecore/nexMulter'); this.textContent='✅ Copiado!'; setTimeout(() => this.textContent='📋 Copiar', 2000)"
              style="padding: 1rem 2rem; background: linear-gradient(to right, rgb(52, 211, 153), rgb(16, 185, 129)); border: none; border-radius: 0.75rem; font-weight: 700; cursor: pointer; color: rgb(15, 23, 42); transition: all 0.3s;"
              onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 10px 25px -5px rgba(52, 211, 153, 0.5)'"
              onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='none'"
            >
              📋 Copiar
            </button>
          </div>
        </div>
      </section>

      <!-- Chamada para Ação -->
      <section style="margin: 4rem 0; text-align: center;">
        <div style="background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(52, 211, 153, 0.1)); border: 2px solid rgba(52, 211, 153, 0.3); border-radius: 1.5rem; padding: 3rem 2rem;">
          <h2 style="font-size: 2.5rem; font-weight: 900; margin-bottom: 1.5rem; line-height: 1.2;">
            O Tempo de Agir é <span style="background: linear-gradient(to right, rgb(239, 68, 68), rgb(220, 38, 38)); background-clip: text; -webkit-background-clip: text; color: transparent;">AGORA</span>
          </h2>
          
          <p style="font-size: 1.125rem; color: rgb(203, 213, 225); line-height: 1.75; max-width: 42rem; margin: 0 auto 2rem;">
            Continuar usando uma biblioteca com 9.4 milhões de downloads semanais, 6 meses sem manutenção 
            e vulnerabilidades conhecidas não é "pragmatismo" — é <strong style="color: rgb(239, 68, 68);">negligência</strong>.
          </p>
          
          <div style="display: grid; gap: 1rem; max-width: 32rem; margin: 2rem auto;">
            <div style="text-align: left; padding: 1rem; background: rgba(15, 23, 42, 0.6); border-radius: 0.75rem; border-left: 4px solid rgb(52, 211, 153);">
              <div style="font-weight: 700; color: rgb(110, 231, 183);">✅ Hoje</div>
              <div style="color: rgb(203, 213, 225); font-size: 0.875rem;">Estrele o repositório e teste em dev</div>
            </div>
            <div style="text-align: left; padding: 1rem; background: rgba(15, 23, 42, 0.6); border-radius: 0.75rem; border-left: 4px solid rgb(52, 211, 153);">
              <div style="font-weight: 700; color: rgb(110, 231, 183);">✅ Esta semana</div>
              <div style="color: rgb(203, 213, 225); font-size: 0.875rem;">Migre seus projetos ativos</div>
            </div>
            <div style="text-align: left; padding: 1rem; background: rgba(15, 23, 42, 0.6); border-radius: 0.75rem; border-left: 4px solid rgb(52, 211, 153);">
              <div style="font-weight: 700; color: rgb(110, 231, 183);">✅ Este mês</div>
              <div style="color: rgb(203, 213, 225); font-size: 0.875rem;">Deploy em produção</div>
            </div>
          </div>
          
          <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-top: 2rem;">
            <a 
              href="https://github.com/suissa/nexMulter" 
              target="_blank"
              style="padding: 1rem 2rem; background: linear-gradient(to right, rgb(52, 211, 153), rgb(16, 185, 129)); border-radius: 0.75rem; font-weight: 700; text-decoration: none; color: rgb(15, 23, 42); transition: all 0.3s; display: inline-block;"
              onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 10px 25px -5px rgba(52, 211, 153, 0.5)'"
              onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'"
            >
              ⭐ GitHub
            </a>
            <a 
              href="https://npmjs.com/package/@purecore/nexMulter" 
              target="_blank"
              style="padding: 1rem 2rem; background: rgba(52, 211, 153, 0.1); border: 2px solid rgb(52, 211, 153); border-radius: 0.75rem; font-weight: 700; text-decoration: none; color: rgb(110, 231, 183); transition: all 0.3s; display: inline-block;"
              onmouseover="this.style.background='rgba(52, 211, 153, 0.2)'"
              onmouseout="this.style.background='rgba(52, 211, 153, 0.1)'"
            >
              📦 npm
            </a>
          </div>
        </div>
      </section>

      <!-- Quote Final -->
      <section style="margin: 4rem 0; text-align: center;">
        <blockquote style="font-size: 1.5rem; font-style: italic; color: rgb(203, 213, 225); border-left: 4px solid rgb(52, 211, 153); padding-left: 2rem; margin: 0;">
          "A melhor hora para migrar era há 6 meses.<br/>
          A segunda melhor hora é agora."
        </blockquote>
        <p style="margin-top: 2rem; font-size: 1.25rem; font-weight: 700; color: rgb(239, 68, 68);">
          🚨 Não espere uma violação de segurança para agir.
        </p>
      </section>

      <!-- Footer -->
      <footer style="margin-top: 6rem; padding-top: 3rem; border-top: 1px solid rgba(71, 85, 105, 0.3); text-align: center;">
        <div style="margin-bottom: 1.5rem;">
          <img src="https://i.imgur.com/4w12Her.png" alt="nexMulter" style="width: 100%; max-width: 600px; height: auto; margin: 0 auto; filter: drop-shadow(0 0 20px rgba(52, 211, 153, 0.3));" />
        </div>
        <p style="color: rgb(148, 163, 184); margin-bottom: 1rem;">
          Parte da iniciativa <strong style="color: rgb(110, 231, 183);">@purecore</strong> — Bibliotecas Node.js seguras e sustentáveis
        </p>
        <p style="color: rgb(100, 116, 139); font-size: 0.875rem;">
          Última atualização: 19 de Janeiro de 2026<br/>
          Status do Multer: 6 meses sem atualização • 69 PRs pendentes • 178 issues abertas<br/>
          Status do nexMulter: ✅ Ativamente mantido | ✅ 0 PRs pendentes | ✅ 0 vulnerabilidades
        </p>
      </footer>
    </article>
  </div>
`;

// Add smooth scroll
document.documentElement.style.scrollBehavior = "smooth";
