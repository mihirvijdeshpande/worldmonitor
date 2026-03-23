import { Panel } from './Panel';
import { escapeHtml } from '@/utils/sanitize';

interface CrossSourceSignal {
  id: string;
  type: string;
  theater: string;
  summary: string;
  severity: string;
  severityScore: number;
  detectedAt: number;
  contributingTypes: string[];
  signalCount: number;
}

interface CrossSourceSignalsData {
  signals: CrossSourceSignal[];
  evaluatedAt: number;
  compositeCount: number;
}

const SEVERITY_CLASS: Record<string, string> = {
  CROSS_SOURCE_SIGNAL_SEVERITY_CRITICAL: 'css-critical',
  CROSS_SOURCE_SIGNAL_SEVERITY_HIGH: 'css-high',
  CROSS_SOURCE_SIGNAL_SEVERITY_MEDIUM: 'css-medium',
  CROSS_SOURCE_SIGNAL_SEVERITY_LOW: 'css-low',
};

const SEVERITY_LABEL: Record<string, string> = {
  CROSS_SOURCE_SIGNAL_SEVERITY_CRITICAL: 'CRITICAL',
  CROSS_SOURCE_SIGNAL_SEVERITY_HIGH: 'HIGH',
  CROSS_SOURCE_SIGNAL_SEVERITY_MEDIUM: 'MED',
  CROSS_SOURCE_SIGNAL_SEVERITY_LOW: 'LOW',
};

const TYPE_LABEL: Record<string, string> = {
  CROSS_SOURCE_SIGNAL_TYPE_COMPOSITE_ESCALATION: 'COMPOSITE',
  CROSS_SOURCE_SIGNAL_TYPE_THERMAL_SPIKE: 'THERMAL',
  CROSS_SOURCE_SIGNAL_TYPE_GPS_JAMMING: 'GPS JAM',
  CROSS_SOURCE_SIGNAL_TYPE_MILITARY_FLIGHT_SURGE: 'MIL FLTX',
  CROSS_SOURCE_SIGNAL_TYPE_UNREST_SURGE: 'UNREST',
  CROSS_SOURCE_SIGNAL_TYPE_OREF_ALERT_CLUSTER: 'OREF',
  CROSS_SOURCE_SIGNAL_TYPE_VIX_SPIKE: 'VIX',
  CROSS_SOURCE_SIGNAL_TYPE_COMMODITY_SHOCK: 'COMDTY',
  CROSS_SOURCE_SIGNAL_TYPE_CYBER_ESCALATION: 'CYBER',
  CROSS_SOURCE_SIGNAL_TYPE_SHIPPING_DISRUPTION: 'SHIPPING',
  CROSS_SOURCE_SIGNAL_TYPE_SANCTIONS_SURGE: 'SANCTIONS',
  CROSS_SOURCE_SIGNAL_TYPE_EARTHQUAKE_SIGNIFICANT: 'QUAKE',
  CROSS_SOURCE_SIGNAL_TYPE_RADIATION_ANOMALY: 'RADIATION',
  CROSS_SOURCE_SIGNAL_TYPE_INFRASTRUCTURE_OUTAGE: 'INFRA',
  CROSS_SOURCE_SIGNAL_TYPE_WILDFIRE_ESCALATION: 'WILDFIRE',
  CROSS_SOURCE_SIGNAL_TYPE_DISPLACEMENT_SURGE: 'DISPLCMT',
  CROSS_SOURCE_SIGNAL_TYPE_FORECAST_DETERIORATION: 'FORECAST',
  CROSS_SOURCE_SIGNAL_TYPE_MARKET_STRESS: 'MARKET',
  CROSS_SOURCE_SIGNAL_TYPE_WEATHER_EXTREME: 'WEATHER',
  CROSS_SOURCE_SIGNAL_TYPE_MEDIA_TONE_DETERIORATION: 'MEDIA',
  CROSS_SOURCE_SIGNAL_TYPE_RISK_SCORE_SPIKE: 'RISK',
};

export class CrossSourceSignalsPanel extends Panel {
  private signals: CrossSourceSignal[] = [];
  private evaluatedAt: Date | null = null;
  private compositeCount = 0;

  constructor() {
    super({
      id: 'cross-source-signals',
      title: 'Cross-Source Signal Aggregator',
      showCount: true,
      trackActivity: true,
      infoTooltip: 'Aggregates 15+ real-time data streams every 15 minutes. Ranks cross-domain signals by severity and detects composite escalation when 3 or more signal categories co-fire in the same theater.',
    });
    this.showLoading('Loading signal data...');
  }

  public setData(data: CrossSourceSignalsData): void {
    this.signals = data.signals ?? [];
    this.evaluatedAt = data.evaluatedAt ? new Date(data.evaluatedAt) : null;
    this.compositeCount = data.compositeCount ?? 0;
    this.setCount(this.signals.length);
    this.render();
  }

  private ageSuffix(ts: number): string {
    const diffMs = Date.now() - ts;
    const mins = Math.floor(diffMs / 60000);
    if (mins < 2) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    return `${Math.floor(mins / 60)}h ago`;
  }

  private renderSignal(sig: CrossSourceSignal, index: number): string {
    const isComposite = sig.type === 'CROSS_SOURCE_SIGNAL_TYPE_COMPOSITE_ESCALATION';
    const sevClass = SEVERITY_CLASS[sig.severity] ?? 'css-low';
    const typeLabel = TYPE_LABEL[sig.type] ?? sig.type.replace('CROSS_SOURCE_SIGNAL_TYPE_', '');
    const age = this.ageSuffix(sig.detectedAt);
    const compositeClass = isComposite ? ' css-composite' : '';

    const contributors = isComposite && sig.contributingTypes.length > 0
      ? `<div class="css-contributors">${escapeHtml(sig.contributingTypes.slice(0, 5).join(' · '))}</div>`
      : '';

    return `
      <div class="css-signal${compositeClass}">
        <div class="css-rank">${index + 1}</div>
        <div class="css-content">
          <div class="css-header">
            <span class="css-badge css-badge-type">${escapeHtml(typeLabel)}</span>
            <span class="css-badge ${sevClass}">${escapeHtml(SEVERITY_LABEL[sig.severity] ?? '')}</span>
            <span class="css-theater">${escapeHtml(sig.theater)}</span>
            <span class="css-age">${escapeHtml(age)}</span>
          </div>
          <div class="css-summary">${escapeHtml(sig.summary)}</div>
          ${contributors}
        </div>
      </div>
    `;
  }

  private render(): void {
    if (this.signals.length === 0) {
      this.setContent('<div class="panel-empty">No cross-source signals detected.</div>');
      return;
    }

    const evalTime = this.evaluatedAt
      ? `Evaluated ${this.evaluatedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
      : '';

    const compositeNote = this.compositeCount > 0
      ? `<div class="css-composite-note">${this.compositeCount} composite escalation zone${this.compositeCount > 1 ? 's' : ''} detected</div>`
      : '';

    const signalRows = this.signals.map((s, i) => this.renderSignal(s, i)).join('');

    this.setContent(`
      <div class="css-panel">
        ${compositeNote}
        <div class="css-list">
          ${signalRows}
        </div>
        ${evalTime ? `<div class="css-footer">${escapeHtml(evalTime)}</div>` : ''}
      </div>
    `);
  }
}
