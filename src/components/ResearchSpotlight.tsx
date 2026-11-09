/** A recruiter-first research summary. All figures describe controlled offline feature validation,
 * not live ML detection accuracy. No simulated dashboard screenshots or invented claims. */
const github = 'https://github.com/mariabatool869-star/nova_shield'
const report = `${github}/blob/main/research/reports/NovaShield_Flow_Validation_Research_Report.pdf`
const doi = 'https://doi.org/10.5281/zenodo.24056070'

const stages = [
  { n: '01', name: 'Observe', detail: 'Network-flow measurements' },
  { n: '02', name: 'Explain', detail: 'Offline ML + SHAP research' },
  { n: '03', name: 'Review', detail: 'Human-centred SOC workflows' },
]

export default function ResearchSpotlight() {
  return (
    <section id="research" className="research-section" aria-labelledby="research-title">
      <div className="research-shell">
        <div className="research-topline"><span className="research-status-dot" /> FEATURED RESEARCH · NOVASHIELD · OPEN SOURCE</div>
        <div className="research-layout">
          <div className="research-copy">
            <h2 id="research-title">Can we trust AI intrusion detection <span>if we can’t trust its measurements?</span></h2>
            <p className="research-lede">I built NovaShield to investigate that question—combining network-flow feature engineering, explainable machine-learning experiments and an authenticated analyst console.</p>
            <p className="research-caveat">Research prototype. The validation below measures agreement with reference flow features, not attack-detection accuracy or production readiness.</p>
            <div className="research-actions">
              <a className="research-main-link" href={github} target="_blank" rel="noopener noreferrer">Explore the source code <span aria-hidden="true">↗</span></a>
              <a className="research-sub-link" href={report} target="_blank" rel="noopener noreferrer">Read the research report ↗</a>
              <a className="research-sub-link" href={doi} target="_blank" rel="noopener noreferrer">Citable software DOI ↗</a>
            </div>
          </div>
          <div className="research-evidence" aria-label="NovaShield validation evidence">
            <div className="research-evidence-kicker">CONTROLLED EXPERIMENT · FEATURE AGREEMENT</div>
            <div className="research-score">468<span>/468</span></div>
            <p className="research-score-caption">Numerical comparisons matched within defined tolerances</p>
            <div className="research-evidence-grid">
              <div><strong>5</strong><span>Synthetic test fixtures</span></div>
              <div><strong>10/10</strong><span>Evidence file hashes verified</span></div>
            </div>
            <div className="research-flow">
              {stages.map((stage) => <div key={stage.n} className="research-flow-item"><span>{stage.n}</span><strong>{stage.name}</strong><small>{stage.detail}</small></div>)}
            </div>
            <p className="research-smallnote">Network observation, offline inference, and human review are research components—not a continuously integrated enforcement system.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
