// Clavicula Lumenosi — Interactive Module Engine v1.0
// Fource coherence-under-constraint interactive system

// ============ HEBREW LETTER MAPPING ============
const hebrewLetters = {
  'P': { heb: 'Peh', pos: 'crown-top', func: 'Name/Mouth', order: 1 },
  'V': { heb: 'Vav', pos: 'arm-right', func: 'Bridge/Hook', order: 2 },
  'R': { heb: 'Resh', pos: 'crown-center', func: 'Govern/Head', order: 3 },
  'S': { heb: 'Samekh', pos: 'root-right', func: 'Contain/Circle', order: 4 },
  'H': { heb: 'He', pos: 'root-left', func: 'Close/Breath', order: 5 }
};

// ============ PLACEHOLDER DYAD DATA ============
const dyadData = [
  { id: 1, name: 'Vehuiah', number: 1, office: 'willpower, activation', distortion: 'compulsion', gift: 'courage', shem: 'Yod-He-Vav-He', tags: ['will', 'initiation'] },
  { id: 2, name: 'Jeliel', number: 2, office: 'mercy, witness', distortion: 'emotional manipulation', gift: 'compassion', shem: 'Yod-Aleph', tags: ['mercy', 'witness'] },
  { id: 3, name: 'Sitael', number: 3, office: 'building', distortion: 'false creation', gift: 'creativity', shem: 'Aleph-Lamed', tags: ['creation', 'structure'] },
];

// ============ CELESTIAL SCRIPT RENDERER ============
function initCelestialRenderer() {
  const renderBtn = document.getElementById('csRender');
  if (!renderBtn) return;

  renderBtn.addEventListener('click', () => {
    const input = document.getElementById('csInput').value.toUpperCase();
    const route = document.getElementById('csRoute').value;
    const script = document.getElementById('csScript').value;
    
    renderScriptGate(input, route, script);
  });
}

function renderScriptGate(word, route, scriptType) {
  const tokens = [];
  
  if (route === 'fource') {
    tokens.push('P', 'V', 'R', 'S', 'H');
  } else if (route === 'latin') {
    tokens = word.split('').filter(c => /[A-Z]/.test(c)).slice(0, 5);
  } else {
    tokens = word.split('').filter(c => /[A-Z]/.test(c)).slice(0, 5);
  }

  // Populate table
  const tbody = document.getElementById('csTable');
  tbody.innerHTML = '';
  tokens.forEach((t, i) => {
    const letter = hebrewLetters[t] || { heb: t, func: 'unknown', order: i + 1, pos: 'unknown' };
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${t}</td>
      <td>${letter.heb}</td>
      <td>${letter.func}</td>
      <td>${letter.pos}</td>
    `;
    tbody.appendChild(row);
  });

  // Render glyphs
  renderGlyphs(tokens, scriptType);

  // Render pentagram
  renderPentagram(tokens);

  // Set formula
  const formula = document.getElementById('csFormula');
  formula.textContent = tokens.map(t => hebrewLetters[t]?.heb || t).join(' → ');

  document.getElementById('csTitle').textContent = `Rendered Script-Gate: ${word}`;
}

function renderGlyphs(tokens, scriptType) {
  const row = document.getElementById('csGlyphRow');
  row.innerHTML = '';

  tokens.forEach(t => {
    const letter = hebrewLetters[t];
    const card = document.createElement('div');
    card.className = 'script-glyph-card';

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 70 70');
    
    // Create glyph based on script type
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', '35');
    circle.setAttribute('cy', '35');
    circle.setAttribute('r', '30');
    circle.setAttribute('fill', 'none');
    circle.setAttribute('stroke', 'var(--accent)');
    circle.setAttribute('stroke-width', '2');

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', '35');
    text.setAttribute('y', '40');
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('fill', 'var(--accent2)');
    text.setAttribute('font-size', '24');
    text.setAttribute('font-weight', 'bold');
    text.textContent = t;

    svg.appendChild(circle);
    svg.appendChild(text);

    card.appendChild(svg);
    const label = document.createElement('div');
    label.className = 'small';
    label.innerHTML = `<b>${letter.heb}</b><br>${letter.func}`;
    card.appendChild(label);

    row.appendChild(card);
  });
}

function renderPentagram(tokens) {
  const container = document.getElementById('csPentagram');
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 200 200');
  svg.setAttribute('style', 'width:100%; height:100%');

  // Pentagon
  const pentagon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
  const points = [];
  for (let i = 0; i < 5; i++) {
    const angle = (i * 72 - 90) * Math.PI / 180;
    points.push([100 + 80 * Math.cos(angle), 100 + 80 * Math.sin(angle)]);
  }
  pentagon.setAttribute('points', points.map(p => p.join(',')).join(' '));
  pentagon.setAttribute('fill', 'none');
  pentagon.setAttribute('stroke', 'var(--accent)');
  pentagon.setAttribute('stroke-width', '2');
  svg.appendChild(pentagon);

  // Inner star
  const star = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
  star.setAttribute('points', points.map((p, i) => points[(i + 2) % 5]).map(p => p.join(',')).join(' '));
  star.setAttribute('fill', 'none');
  star.setAttribute('stroke', 'var(--accent2)');
  star.setAttribute('stroke-width', '1.5');
  star.setAttribute('opacity', '0.7');
  svg.appendChild(star);

  // Add labels for Resh (top), Peh/Vav (arms), Samekh/He (roots)
  const labels = [
    { pos: points[0], text: 'Resh', color: 'var(--accent)' },
    { pos: points[1], text: 'Vav', color: 'var(--accent2)' },
    { pos: points[2], text: 'He', color: 'var(--accent2)' },
    { pos: points[3], text: 'Samekh', color: 'var(--accent2)' },
    { pos: points[4], text: 'Peh', color: 'var(--accent)' }
  ];

  labels.forEach(label => {
    const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    t.setAttribute('x', label.pos[0]);
    t.setAttribute('y', label.pos[1]);
    t.setAttribute('text-anchor', 'middle');
    t.setAttribute('fill', label.color);
    t.setAttribute('font-size', '14');
    t.setAttribute('font-weight', 'bold');
    t.textContent = label.text;
    svg.appendChild(t);
  });

  container.innerHTML = '';
  container.appendChild(svg);
}

// ============ LUMENOS LEDGER ============
function initLumenosLedger() {
  const renderBtn = document.getElementById('liclRender');
  if (!renderBtn) return;

  // Update value displays
  ['Ra', 'Thoth', 'Hermes', 'Lumenos'].forEach(op => {
    const slider = document.getElementById(`licl${op}`);
    const val = document.getElementById(`licl${op}Val`);
    slider.addEventListener('input', () => {
      val.textContent = slider.value;
    });
  });

  renderBtn.addEventListener('click', () => {
    const subject = document.getElementById('liclSubject').value;
    const ra = parseInt(document.getElementById('liclRa').value);
    const thoth = parseInt(document.getElementById('liclThoth').value);
    const hermes = parseInt(document.getElementById('liclHermes').value);
    const lumenos = parseInt(document.getElementById('liclLumenos').value);

    renderLumenosResult(subject, ra, thoth, hermes, lumenos);
  });

  // Render initial state
  renderLumenosResult(
    document.getElementById('liclSubject').value,
    82, 88, 84, 76
  );
}

function renderLumenosResult(subject, ra, thoth, hermes, lumenos) {
  const avg = Math.round((ra + thoth + hermes + lumenos) / 4);
  
  // Render meters
  const metersDiv = document.getElementById('liclMeters');
  metersDiv.innerHTML = `
    <div class="licl-meter">
      <b>Ra</b>
      <p class="small">Radiance</p>
      <div class="licl-bar"><div class="licl-fill" style="width:${ra}%"></div></div>
      <p>${ra}</p>
    </div>
    <div class="licl-meter">
      <b>Thoth</b>
      <p class="small">Inscription</p>
      <div class="licl-bar"><div class="licl-fill" style="width:${thoth}%"></div></div>
      <p>${thoth}</p>
    </div>
    <div class="licl-meter">
      <b>Hermes</b>
      <p class="small">Transmission</p>
      <div class="licl-bar"><div class="licl-fill" style="width:${hermes}%"></div></div>
      <p>${hermes}</p>
    </div>
    <div class="licl-meter">
      <b>Lumenos</b>
      <p class="small">Integration</p>
      <div class="licl-bar"><div class="licl-fill" style="width:${lumenos}%"></div></div>
      <p>${lumenos}</p>
    </div>
  `;

  // Render radar
  renderRadar(ra, thoth, hermes, lumenos);

  // Interpretation
  const interp = document.getElementById('liclInterpretation');
  const status = avg > 80 ? 'High coherence: pattern survives crossing.' 
               : avg > 60 ? 'Moderate coherence: pattern shows strain.'
               : 'Low coherence: boundary may be compromised.';
  
  interp.textContent = `${subject}\nFource average: ${avg}/100\n${status}\n\nRa reveals: ${ra} | Thoth records: ${thoth} | Hermes transmits: ${hermes} | Lumenos integrates: ${lumenos}`;
}

function renderRadar(ra, thoth, hermes, lumenos) {
  const radar = document.getElementById('liclRadar');
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 200 200');
  svg.setAttribute('style', 'width:100%; height:100%');

  // Grid circles
  for (let r = 1; r <= 5; r++) {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', '100');
    circle.setAttribute('cy', '100');
    circle.setAttribute('r', 20 * r);
    circle.setAttribute('fill', 'none');
    circle.setAttribute('stroke', 'var(--line)');
    circle.setAttribute('stroke-width', '0.5');
    circle.setAttribute('opacity', '0.5');
    svg.appendChild(circle);
  }

  // Axes
  const axisLabels = ['Ra', 'Thoth', 'Hermes', 'Lumenos'];
  for (let i = 0; i < 4; i++) {
    const angle = (i * 90 - 90) * Math.PI / 180;
    const x2 = 100 + 90 * Math.cos(angle);
    const y2 = 100 + 90 * Math.sin(angle);
    
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', '100');
    line.setAttribute('y1', '100');
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    line.setAttribute('stroke', 'var(--line)');
    line.setAttribute('stroke-width', '1');
    line.setAttribute('opacity', '0.3');
    svg.appendChild(line);

    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    const labelX = 100 + 110 * Math.cos(angle);
    const labelY = 100 + 110 * Math.sin(angle);
    label.setAttribute('x', labelX);
    label.setAttribute('y', labelY);
    label.setAttribute('text-anchor', 'middle');
    label.setAttribute('dominant-baseline', 'middle');
    label.setAttribute('fill', 'var(--accent2)');
    label.setAttribute('font-size', '12');
    label.textContent = axisLabels[i];
    svg.appendChild(label);
  }

  // Data polygon
  const values = [ra, thoth, hermes, lumenos];
  const polygonPoints = values.map((v, i) => {
    const angle = (i * 90 - 90) * Math.PI / 180;
    const r = (v / 100) * 80;
    return [100 + r * Math.cos(angle), 100 + r * Math.sin(angle)];
  });

  const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
  polygon.setAttribute('points', polygonPoints.map(p => p.join(',')).join(' '));
  polygon.setAttribute('fill', 'rgba(232,196,106,0.15)');
  polygon.setAttribute('stroke', 'var(--accent)');
  polygon.setAttribute('stroke-width', '2');
  svg.appendChild(polygon);

  radar.innerHTML = '';
  radar.appendChild(svg);
}

// ============ GREATER KEY PENTACLES FILTER ============
function initGreaterKeyFilters() {
  const filterBtns = document.querySelectorAll('.gk-filter');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const planet = btn.dataset.gk;
      const cards = document.querySelectorAll('.gk-card');
      
      cards.forEach(card => {
        if (planet === 'all' || card.dataset.planet === planet) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // View toggle buttons
  const gkLedger = document.querySelector('.gk-ledger');
  document.getElementById('gkShowBoth')?.addEventListener('click', () => {
    gkLedger.classList.remove('gk-hide-source', 'gk-hide-generated', 'gk-hide-crop');
  });
  document.getElementById('gkHideSource')?.addEventListener('click', () => {
    gkLedger.classList.add('gk-hide-source');
  });
  document.getElementById('gkHideGenerated')?.addEventListener('click', () => {
    gkLedger.classList.add('gk-hide-generated');
  });
  document.getElementById('gkHideCrop')?.addEventListener('click', () => {
    gkLedger.classList.add('gk-hide-crop');
  });

  // Export crop manifest
  document.getElementById('gkExportCropManifest')?.addEventListener('click', () => {
    const manifest = [];
    document.querySelectorAll('.gk-crop-frame').forEach(frame => {
      manifest.push({
        fig: frame.dataset.fig,
        stub: frame.dataset.stub,
        candidates: frame.dataset.candidates,
        preset: {
          x: frame.style.getPropertyValue('--crop-x'),
          y: frame.style.getPropertyValue('--crop-y'),
          zoom: frame.style.getPropertyValue('--crop-zoom')
        }
      });
    });
    
    const blob = new Blob([JSON.stringify(manifest, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gk-crop-manifest.json';
    a.click();
  });

  // Set initial filter to "all"
  document.querySelector('[data-gk="all"]').click();
}

// ============ AKASHIC LEDGER ============
function initAkashicLedger() {
  // Update value displays
  ['TraceStrength', 'SourceClarity', 'Distortion', 'Closure'].forEach(field => {
    const slider = document.getElementById(`ak${field}`);
    const val = document.getElementById(`ak${field}Val`);
    if (slider && val) {
      slider.addEventListener('input', () => {
        val.textContent = slider.value;
      });
    }
  });

  const renderBtn = document.getElementById('akRender');
  if (renderBtn) {
    renderBtn.addEventListener('click', () => {
      renderAkashicEntry();
    });
  }
}

function renderAkashicEntry() {
  const title = document.getElementById('akTitle').value;
  const trace = document.getElementById('akTrace').value;
  const traceType = document.getElementById('akTraceType').value;
  const claimTier = document.getElementById('akClaimTier').value;
  const lineage = document.getElementById('akLineage').value;
  const strength = parseInt(document.getElementById('akTraceStrength').value);
  const clarity = parseInt(document.getElementById('akSourceClarity').value);
  const distortion = parseInt(document.getElementById('akDistortion').value);
  const closure = parseInt(document.getElementById('akClosure').value);

  const coherence = Math.round((strength + clarity + (100 - distortion)) / 3);

  const entry = document.getElementById('akEntry');
  entry.innerHTML = `
    <div class="kv">
      <div>Title</div><div><b>${title}</b></div>
      <div>Trace type</div><div>${traceType}</div>
      <div>Claim tier</div><div>${claimTier}</div>
      <div>Coherence</div><div>${coherence}/100</div>
    </div>
    <div style="margin-top:1rem; font-size:0.9rem;">
      <b>Trace:</b><br>${trace.substring(0, 200)}...
      <br><b>Lineage:</b><br>${lineage.substring(0, 150)}...
    </div>
  `;

  document.getElementById('akOutputTitle').textContent = `Akashic Ledger Entry: ${title}`;
}

// ============ DYAD SYSTEM (PLACEHOLDER) ============
function initDyadSystem() {
  const search = document.getElementById('search');
  const tagFilter = document.getElementById('tagFilter');
  const dyadList = document.getElementById('dyadList');
  const detail = document.getElementById('detail');

  if (!search || !dyadList) return;

  // Populate filter tags
  const allTags = new Set();
  dyadData.forEach(d => d.tags.forEach(t => allTags.add(t)));
  [...allTags].forEach(tag => {
    const opt = document.createElement('option');
    opt.value = tag;
    opt.textContent = tag;
    tagFilter.appendChild(opt);
  });

  function filterDyads() {
    const searchTerm = search.value.toLowerCase();
    const selectedTag = tagFilter.value;

    const filtered = dyadData.filter(d => {
      const matchesSearch = d.name.toLowerCase().includes(searchTerm) ||
                           d.office.toLowerCase().includes(searchTerm) ||
                           d.shem.toLowerCase().includes(searchTerm);
      const matchesTag = !selectedTag || d.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    });

    renderDyadCards(filtered);
  }

  function renderDyadCards(dyads) {
    dyadList.innerHTML = '';
    dyads.forEach(d => {
      const card = document.createElement('div');
      card.className = 'dyad-card';
      card.innerHTML = `
        <div class="num">${d.number}</div>
        <h3>${d.name}</h3>
        <p class="small">${d.shem}</p>
        <div class="tag">${d.tags.join(', ')}</div>
      `;
      card.addEventListener('click', () => showDyadDetail(d));
      dyadList.appendChild(card);
    });
  }

  function showDyadDetail(dyad) {
    detail.innerHTML = `
      <div class="detail-title">
        <div>
          <div class="num">${dyad.number}</div>
          <h3>${dyad.name}</h3>
        </div>
      </div>
      <div class="kv">
        <div>Shem</div><div>${dyad.shem}</div>
        <div>Office</div><div>${dyad.office}</div>
        <div>Gift</div><div>${dyad.gift}</div>
        <div>Distortion</div><div>${dyad.distortion}</div>
      </div>
      <div class="code" style="margin-top:0.75rem; font-size:0.85rem;">
Boundary restoration:
Identify the ${dyad.office} pattern.
Recover the gift: ${dyad.gift}.
Apply the governor: ${dyad.shem}.
Close the gate.
      </div>
    `;
  }

  search.addEventListener('input', filterDyads);
  tagFilter.addEventListener('change', filterDyads);

  filterDyads();
}

// ============ INITIALIZATION ============
document.addEventListener('DOMContentLoaded', () => {
  initDyadSystem();
  initCelestialRenderer();
  initLumenosLedger();
  initGreaterKeyFilters();
  initAkashicLedger();
});
