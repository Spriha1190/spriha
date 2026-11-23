/**
 * Projects Showcase, SVG Preview Diagrams, Filtering & 3 Live Interactive Modal Demos:
 * 1) Artificial Life Evolution Simulator (<canvas> organism simulation)
 * 2) Luggage Security System (DLD combinational logic gate simulator)
 * 3) Office Network Architecture (VLAN subnet & packet-hop ACL tracer)
 */
(() => {
  if (!window.SPRIHA_DATA) return;
  const { projects } = window.SPRIHA_DATA;

  const projectDialog = document.getElementById('project-dialog');
  if (projectDialog) {
    window.attachDialogLightDismiss?.(projectDialog);
  }

  let activeDemoCleanup = null;

  const stopActiveDemo = () => {
    if (typeof activeDemoCleanup === 'function') {
      activeDemoCleanup();
      activeDemoCleanup = null;
    }
  };

  if (projectDialog) {
    projectDialog.addEventListener('close', stopActiveDemo);
  }

  // Bespoke high-contrast SVG visual mockups per project
  const getProjectSvg = (project) => {
    switch (project.id) {
      case 'artificial-life-simulator':
        return `<svg viewBox="0 0 360 200" width="360" height="200" aria-hidden="true">
          <rect width="360" height="200" fill="#181016"/>
          <g stroke="#3A2634" stroke-width="1">
            <line x1="0" y1="50" x2="360" y2="50"/><line x1="0" y1="100" x2="360" y2="100"/><line x1="0" y1="150" x2="360" y2="150"/>
            <line x1="90" y1="0" x2="90" y2="200"/><line x1="180" y1="0" x2="180" y2="200"/><line x1="270" y1="0" x2="270" y2="200"/>
          </g>
          <circle cx="95" cy="92" r="24" fill="#F472B6" fill-opacity="0.18" stroke="#F472B6" stroke-width="2"/>
          <circle cx="95" cy="92" r="7" fill="#F472B6"/>
          <circle cx="215" cy="68" r="18" fill="#E6BC82" fill-opacity="0.2" stroke="#E6BC82" stroke-width="2"/>
          <circle cx="215" cy="68" r="5" fill="#E6BC82"/>
          <circle cx="268" cy="136" r="28" fill="#6EE7B7" fill-opacity="0.16" stroke="#6EE7B7" stroke-width="2"/>
          <circle cx="268" cy="136" r="6" fill="#6EE7B7"/>
          <path d="M95,92 Q155,40 215,68 T268,136" fill="none" stroke="#F9A8D4" stroke-width="1.5" stroke-dasharray="4 4"/>
          <text x="16" y="24" fill="#E6BC82" font-family="monospace" font-size="11">GEN 042 · ORGANISMS: 18</text>
        </svg>`;
      case 'office-network-architecture':
        return `<svg viewBox="0 0 360 200" width="360" height="200" aria-hidden="true">
          <rect width="360" height="200" fill="#171117"/>
          <line x1="180" y1="54" x2="72" y2="142" stroke="#E6BC82" stroke-width="2" stroke-dasharray="5 3"/>
          <line x1="180" y1="54" x2="180" y2="142" stroke="#F472B6" stroke-width="2"/>
          <line x1="180" y1="54" x2="288" y2="142" stroke="#6EE7B7" stroke-width="2" stroke-dasharray="5 3"/>
          <rect x="135" y="24" width="90" height="32" rx="8" fill="#2A1C26" stroke="#F472B6" stroke-width="2"/>
          <text x="180" y="44" text-anchor="middle" fill="#FAF7F4" font-family="monospace" font-size="10">L3 CORE / FW</text>
          <rect x="28" y="136" width="88" height="36" rx="7" fill="#241B22" stroke="#E6BC82" stroke-width="1.5"/>
          <text x="72" y="158" text-anchor="middle" fill="#E6BC82" font-family="monospace" font-size="9">VLAN 10 ADMIN</text>
          <rect x="136" y="136" width="88" height="36" rx="7" fill="#241B22" stroke="#F472B6" stroke-width="1.5"/>
          <text x="180" y="158" text-anchor="middle" fill="#F9A8D4" font-family="monospace" font-size="9">VLAN 20 DEV</text>
          <rect x="244" y="136" width="88" height="36" rx="7" fill="#241B22" stroke="#6EE7B7" stroke-width="1.5"/>
          <text x="288" y="158" text-anchor="middle" fill="#6EE7B7" font-family="monospace" font-size="9">VLAN 30 DMZ</text>
        </svg>`;
      case 'luggage-security-system':
        return `<svg viewBox="0 0 360 200" width="360" height="200" aria-hidden="true">
          <rect width="360" height="200" fill="#181016"/>
          <text x="16" y="26" fill="#F9A8D4" font-family="monospace" font-size="11">ALARM = A · (T + P)</text>
          <line x1="35" y1="68" x2="215" y2="68" stroke="#6EE7B7" stroke-width="2.5"/>
          <line x1="35" y1="115" x2="125" y2="115" stroke="#E6BC82" stroke-width="2.5"/>
          <line x1="35" y1="145" x2="125" y2="145" stroke="#E6BC82" stroke-width="2.5"/>
          <path d="M122,102 Q140,130 122,158 L158,158 Q186,130 158,102 Z" fill="#2D1D28" stroke="#E6BC82" stroke-width="2"/>
          <text x="148" y="134" text-anchor="middle" fill="#FAF7F4" font-family="monospace" font-size="10">OR</text>
          <line x1="173" y1="130" x2="215" y2="108" stroke="#E6BC82" stroke-width="2"/>
          <path d="M215,58 L255,58 A36,36 0 0,1 255,126 L215,126 Z" fill="#2D1D28" stroke="#F472B6" stroke-width="2"/>
          <text x="247" y="96" text-anchor="middle" fill="#FAF7F4" font-family="monospace" font-size="10">AND</text>
          <line x1="291" y1="92" x2="328" y2="92" stroke="#F472B6" stroke-width="3"/>
          <circle cx="332" cy="92" r="8" fill="#F472B6"/>
        </svg>`;
      default: {
        const badges = {
          'hotel-management-system': ['Room Inventory', 'OOP Hierarchy', 'Check-in / Invoice'],
          'hospital-management-system': ['Patient Triage', 'Doctor Shifts', 'Ward Billing'],
          'restaurant-management-system': ['Table Map', 'Kitchen Queue', 'Split Receipt'],
          'cafe-management-system': ['Counter POS', 'Stock Alerts', 'Daily Ledger']
        }[project.id] || ['Module A', 'Database', 'Output'];

        return `<svg viewBox="0 0 360 200" width="360" height="200" aria-hidden="true">
          <rect width="360" height="200" fill="#1B1319"/>
          <rect x="18" y="18" width="324" height="164" rx="12" fill="#251B22" stroke="#4B3442" stroke-width="1.5"/>
          <circle cx="36" cy="34" r="4" fill="#F472B6"/>
          <circle cx="50" cy="34" r="4" fill="#E6BC82"/>
          <circle cx="64" cy="34" r="4" fill="#6EE7B7"/>
          <line x1="18" y1="48" x2="342" y2="48" stroke="#4B3442" stroke-width="1"/>
          <rect x="32" y="64" width="90" height="98" rx="8" fill="#1D141B" stroke="#4B3442"/>
          <rect x="42" y="76" width="70" height="10" rx="4" fill="#A61B55"/>
          <rect x="42" y="96" width="60" height="8" rx="4" fill="#594853"/>
          <rect x="42" y="112" width="54" height="8" rx="4" fill="#594853"/>
          <rect x="42" y="128" width="64" height="8" rx="4" fill="#594853"/>
          <rect x="136" y="64" width="190" height="28" rx="7" fill="#32232D" stroke="#F472B6" stroke-opacity="0.45"/>
          <text x="148" y="82" fill="#FAF7F4" font-family="monospace" font-size="10">01 · ${badges[0]}</text>
          <rect x="136" y="100" width="190" height="28" rx="7" fill="#32232D" stroke="#E6BC82" stroke-opacity="0.45"/>
          <text x="148" y="118" fill="#E6BC82" font-family="monospace" font-size="10">02 · ${badges[1]}</text>
          <rect x="136" y="136" width="190" height="28" rx="7" fill="#32232D" stroke="#6EE7B7" stroke-opacity="0.45"/>
          <text x="148" y="154" fill="#6EE7B7" font-family="monospace" font-size="10">03 · ${badges[2]}</text>
        </svg>`;
      }
    }
  };

  // Interactive Micro-Demo Renderers inside Modal Dialog
  const mountInteractiveDemo = (project, container) => {
    stopActiveDemo();
    container.innerHTML = '';

    if (project.demoType === 'life') {
      container.innerHTML = `
        <div class="demo-sandbox">
          <div class="demo-sandbox-head">
            <div>
              <strong>Interactive Preview: Artificial Life Evolution Canvas</strong>
              <p class="hint" id="life-stats">Generation 1 · Population 18 · Active Evolution</p>
            </div>
            <span class="tag tag-accent">Real-Time 2D Canvas</span>
          </div>
          <canvas id="life-sim-canvas" class="life-canvas" width="640" height="240"></canvas>
          <div class="demo-controls">
            <button type="button" class="btn btn-primary btn-sm" id="life-toggle-btn">Pause</button>
            <button type="button" class="btn btn-secondary btn-sm" id="life-mutate-btn">Mutate &amp; Spawn Generation</button>
            <label class="hint" style="margin-inline-start:auto;">
              Speed:
              <input type="range" id="life-speed-range" min="1" max="5" value="2" style="vertical-align:middle;">
            </label>
          </div>
        </div>`;

      const canvas = container.querySelector('#life-sim-canvas');
      const ctx = canvas.getContext('2d');
      const statsEl = container.querySelector('#life-stats');
      const toggleBtn = container.querySelector('#life-toggle-btn');
      const mutateBtn = container.querySelector('#life-mutate-btn');
      const speedInput = container.querySelector('#life-speed-range');

      let running = true;
      let gen = 1;
      let rafId = null;

      const palette = ['#F472B6', '#E6BC82', '#6EE7B7', '#F9A8D4'];
      const makeOrganisms = (count) =>
        Array.from({ length: count }, (_, i) => ({
          x: 30 + Math.random() * 580,
          y: 30 + Math.random() * 180,
          r: 5 + Math.random() * 6,
          vx: (Math.random() - 0.5) * 1.8,
          vy: (Math.random() - 0.5) * 1.8,
          color: palette[i % palette.length],
          energy: 60 + Math.random() * 40
        }));

      let organisms = makeOrganisms(18);
      const nutrients = Array.from({ length: 14 }, () => ({
        x: 24 + Math.random() * 592,
        y: 24 + Math.random() * 192
      }));

      const step = () => {
        if (!running) {
          rafId = null;
          return;
        }
        const speedMult = Number(speedInput.value) * 0.7;
        ctx.fillStyle = '#140D12';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Grid lines
        ctx.strokeStyle = 'rgba(230, 188, 130, 0.08)';
        ctx.lineWidth = 1;
        for (let gx = 40; gx < canvas.width; gx += 40) {
          ctx.beginPath();
          ctx.moveTo(gx, 0);
          ctx.lineTo(gx, canvas.height);
          ctx.stroke();
        }
        for (let gy = 40; gy < canvas.height; gy += 40) {
          ctx.beginPath();
          ctx.moveTo(0, gy);
          ctx.lineTo(canvas.width, gy);
          ctx.stroke();
        }

        // Nutrients
        nutrients.forEach((n) => {
          ctx.beginPath();
          ctx.arc(n.x, n.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = '#6EE7B7';
          ctx.fill();
        });

        // Organisms
        organisms.forEach((o) => {
          o.x += o.vx * speedMult;
          o.y += o.vy * speedMult;
          if (o.x < o.r || o.x > canvas.width - o.r) o.vx *= -1;
          if (o.y < o.r || o.y > canvas.height - o.r) o.vy *= -1;

          // Consume nutrient if near
          for (const n of nutrients) {
            if (Math.hypot(o.x - n.x, o.y - n.y) < o.r + 7) {
              o.r = Math.min(14, o.r + 0.35);
              n.x = 24 + Math.random() * 592;
              n.y = 24 + Math.random() * 192;
            }
          }

          ctx.beginPath();
          ctx.arc(o.x, o.y, o.r * 1.9, 0, Math.PI * 2);
          ctx.fillStyle = o.color;
          ctx.globalAlpha = 0.16;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
          ctx.globalAlpha = 0.92;
          ctx.fill();
          ctx.globalAlpha = 1;
        });

        rafId = requestAnimationFrame(step);
      };

      toggleBtn.addEventListener('click', () => {
        running = !running;
        toggleBtn.textContent = running ? 'Pause' : 'Resume';
        if (running && rafId === null) rafId = requestAnimationFrame(step);
      });

      mutateBtn.addEventListener('click', () => {
        gen += 1;
        organisms = makeOrganisms(14 + (gen % 9));
        statsEl.textContent = `Generation ${gen} · Population ${organisms.length} · Trait Mutation Seeded`;
        if (!running) {
          running = true;
          toggleBtn.textContent = 'Pause';
          rafId = requestAnimationFrame(step);
        }
      });

      rafId = requestAnimationFrame(step);
      activeDemoCleanup = () => {
        running = false;
        if (rafId !== null) cancelAnimationFrame(rafId);
      };
      return;
    }

    if (project.demoType === 'dld') {
      const state = { armed: true, tamper: false, proximity: false };
      container.innerHTML = `
        <div class="demo-sandbox">
          <div class="demo-sandbox-head">
            <div>
              <strong>Interactive Logic Gate Simulator: Luggage Security</strong>
              <p class="hint">Toggle inputs below to evaluate combinational Boolean expression: <code>ALARM = Armed · (Tamper + Proximity)</code></p>
            </div>
            <span class="tag tag-accent">DLD Gate Lab</span>
          </div>
          <div class="dld-switches">
            <button type="button" class="dld-switch-btn" data-dld-key="armed" aria-pressed="true">
              <span>A · Armed Lock</span><span class="tag">1 (ON)</span>
            </button>
            <button type="button" class="dld-switch-btn" data-dld-key="tamper" aria-pressed="false">
              <span>T · Tamper Switch</span><span class="tag">0 (OFF)</span>
            </button>
            <button type="button" class="dld-switch-btn" data-dld-key="proximity" aria-pressed="false">
              <span>P · Proximity Loss</span><span class="tag">0 (OFF)</span>
            </button>
          </div>
          <div id="dld-alarm-banner" class="alarm-banner" aria-live="polite"></div>
        </div>`;

      const updateDld = () => {
        const orOut = state.tamper || state.proximity;
        const alarm = state.armed && orOut;
        container.querySelectorAll('[data-dld-key]').forEach((btn) => {
          const key = btn.getAttribute('data-dld-key');
          const active = state[key];
          btn.setAttribute('aria-pressed', active ? 'true' : 'false');
          btn.querySelector('.tag').textContent = active ? '1 (HIGH)' : '0 (LOW)';
        });
        const banner = container.querySelector('#dld-alarm-banner');
        banner.className = `alarm-banner${alarm ? ' is-triggered' : ''}`;
        banner.innerHTML = alarm
          ? `<span>OUTPUT ALARM = 1 (ALERT TRIGGERED) · Armed=${+state.armed} · (T+P)=1</span><span>SECURITY BREACH</span>`
          : `<span>OUTPUT ALARM = 0 (SAFE / STANDBY) · Armed=${+state.armed} · (T+P)=${+orOut}</span><span>SECURE</span>`;
      };

      container.addEventListener('click', (event) => {
        const btn = event.target.closest('[data-dld-key]');
        if (!btn) return;
        const key = btn.getAttribute('data-dld-key');
        state[key] = !state[key];
        updateDld();
      });

      updateDld();
      return;
    }

    if (project.demoType === 'network') {
      container.innerHTML = `
        <div class="demo-sandbox">
          <div class="demo-sandbox-head">
            <div>
              <strong>Interactive VLAN &amp; ACL Packet Tracer</strong>
              <p class="hint">Verify inter-VLAN routing and firewall isolation rules across office subnets.</p>
            </div>
            <span class="tag tag-accent">Subnet Simulator</span>
          </div>
          <div class="demo-controls" style="margin-block-start:0;">
            <label class="hint">Source:
              <select id="net-src" class="control" style="display:inline-block;inline-size:auto;padding:0.35rem 0.65rem;">
                <option value="VLAN10">VLAN 10 · Admin (192.168.10.0/24)</option>
                <option value="VLAN20" selected>VLAN 20 · Engineering (192.168.20.0/24)</option>
                <option value="VLAN40">VLAN 40 · Guest Wi-Fi (192.168.40.0/24)</option>
              </select>
            </label>
            <label class="hint">Destination:
              <select id="net-dst" class="control" style="display:inline-block;inline-size:auto;padding:0.35rem 0.65rem;">
                <option value="VLAN30" selected>VLAN 30 · Server DMZ (192.168.30.10)</option>
                <option value="VLAN10">VLAN 10 · Admin HR DB (192.168.10.5)</option>
              </select>
            </label>
            <button type="button" class="btn btn-primary btn-sm" id="net-trace-btn">Trace Packet</button>
          </div>
          <div id="net-trace-result" class="alarm-banner" style="margin-block-start:0.85rem;" aria-live="polite"></div>
        </div>`;

      const srcSel = container.querySelector('#net-src');
      const dstSel = container.querySelector('#net-dst');
      const resultEl = container.querySelector('#net-trace-result');

      const tracePacket = () => {
        const s = srcSel.value;
        const d = dstSel.value;
        if (s === 'VLAN40') {
          resultEl.className = 'alarm-banner is-triggered';
          resultEl.innerHTML = `<span>ACL DENY: Guest Wi-Fi (${s}) blocked from internal ${d} at Core Firewall.</span><span>DROP (ACL-104)</span>`;
        } else if (s === 'VLAN20' && d === 'VLAN10') {
          resultEl.className = 'alarm-banner is-triggered';
          resultEl.innerHTML = `<span>ACL ISOLATE: Engineering (${s}) restricted from Admin HR subnet (${d}).</span><span>BLOCKED</span>`;
        } else {
          resultEl.className = 'alarm-banner';
          resultEl.innerHTML = `<span>PERMIT: ${s} -> L3 Switch -> Core Router -> ${d} (2.4 ms · 3 hops)</span><span>200 OK</span>`;
        }
      };

      container.querySelector('#net-trace-btn').addEventListener('click', tracePacket);
      tracePacket();
    }
  };

  const openProjectModal = (project) => {
    if (!projectDialog || !project) return;
    document.getElementById('pd-kicker').textContent = `${project.index} · ${project.category} · ${project.course}`;
    document.getElementById('pd-title').textContent = project.title;
    document.getElementById('pd-summary').textContent = project.summary;
    document.getElementById('pd-arch').textContent = project.architecture;

    const highlightsEl = document.getElementById('pd-highlights');
    highlightsEl.innerHTML = '';
    project.highlights.forEach((h) => {
      const li = document.createElement('li');
      li.textContent = h;
      highlightsEl.appendChild(li);
    });

    const tagsEl = document.getElementById('pd-tags');
    tagsEl.innerHTML = '';
    project.tags.forEach((t) => {
      const span = document.createElement('span');
      span.className = 'tag';
      span.textContent = t;
      tagsEl.appendChild(span);
    });

    const demoWrap = document.getElementById('pd-demo-mount');
    mountInteractiveDemo(project, demoWrap);

    projectDialog.showModal();
  };

  const createProjectCard = (project) => {
    const article = document.createElement('article');
    article.className = 'project-card spotlight-card tilt-card';
    article.innerHTML = `
      <div class="project-card-top">
        <span class="project-index">${project.index} / 07</span>
        <span class="tag tag-accent">${project.category}</span>
      </div>
      <div class="project-preview-frame">
        ${getProjectSvg(project)}
      </div>
      <div>
        <h3>${project.title}</h3>
        <p class="hint" style="margin-block-start:0.2rem;">${project.course}</p>
      </div>
      <p>${project.summary}</p>
      <div class="project-tags">
        ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}
      </div>
      <div class="project-card-actions">
        <button type="button" class="btn btn-primary btn-sm magnetic-btn" data-inspect-project="${project.id}">
          ${project.demoType !== 'mockup' ? 'Interactive Preview' : 'Inspect Project'}
        </button>
        <a class="btn btn-secondary btn-sm magnetic-btn" href="${window.SPRIHA_DATA.profile.github}" target="_blank" rel="noopener noreferrer">
          GitHub Profile
        </a>
      </div>`;
    return article;
  };

  // Delegate project inspection clicks across index.html and projects.html
  document.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-inspect-project]');
    if (!btn) return;
    const id = btn.getAttribute('data-inspect-project');
    const found = projects.find((p) => p.id === id);
    if (found) openProjectModal(found);
  });

  // Mount Featured 4 on index.html
  const featuredMount = document.getElementById('featured-projects-grid');
  if (featuredMount) {
    projects.filter((p) => p.featured).forEach((p) => {
      featuredMount.appendChild(createProjectCard(p));
    });
  }

  // Mount All 7 + Filters + Search on projects.html
  const allMount = document.getElementById('all-projects-grid');
  if (allMount) {
    let activeCategory = 'All';
    let searchQuery = '';
    const liveStatus = document.getElementById('projects-live-count');
    const searchInput = document.getElementById('project-search');
    const filterButtons = document.querySelectorAll('[data-filter-cat]');

    const renderList = () => {
      allMount.innerHTML = '';
      const q = searchQuery.trim().toLowerCase();
      const visible = projects.filter((p) => {
        const matchCat = activeCategory === 'All' || p.category === activeCategory;
        const matchText =
          !q ||
          `${p.title} ${p.course} ${p.category} ${p.summary} ${p.tags.join(' ')}`
            .toLowerCase()
            .includes(q);
        return matchCat && matchText;
      });

      if (!visible.length) {
        allMount.innerHTML = `
          <div class="card" style="grid-column: 1 / -1; text-align: center;">
            <h3>No projects match "${searchQuery}"</h3>
            <p class="section-subtitle" style="margin-inline:auto; margin-block:0.5rem 1rem;">
              Try clearing your search filter or selecting "All Projects".
            </p>
            <button type="button" class="btn btn-secondary btn-sm" id="reset-project-filters">Reset Filters</button>
          </div>`;
        allMount.querySelector('#reset-project-filters')?.addEventListener('click', () => {
          activeCategory = 'All';
          searchQuery = '';
          if (searchInput) searchInput.value = '';
          filterButtons.forEach((b) =>
            b.setAttribute('aria-pressed', b.getAttribute('data-filter-cat') === 'All' ? 'true' : 'false')
          );
          renderList();
        });
      } else {
        visible.forEach((p) => allMount.appendChild(createProjectCard(p)));
      }

      if (liveStatus) {
        liveStatus.textContent = `Showing ${visible.length} of ${projects.length} projects`;
      }
    };

    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        activeCategory = btn.getAttribute('data-filter-cat') || 'All';
        filterButtons.forEach((b) => b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'));
        renderList();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', () => {
        searchQuery = searchInput.value;
        renderList();
      });
    }

    renderList();
  }
})();
