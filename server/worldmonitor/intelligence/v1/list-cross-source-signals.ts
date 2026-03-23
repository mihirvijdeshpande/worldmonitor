import type {
  IntelligenceServiceHandler,
  ServerContext,
  ListCrossSourceSignalsRequest,
  ListCrossSourceSignalsResponse,
  CrossSourceSignal,
  CrossSourceSignalType,
  CrossSourceSignalSeverity,
} from '../../../../src/generated/server/worldmonitor/intelligence/v1/service_server';
import { getCachedJson } from '../../../_shared/redis';

const REDIS_KEY = 'intelligence:cross-source-signals:v1';

interface CachedSignal {
  id?: string;
  type?: string;
  theater?: string;
  summary?: string;
  severity?: string;
  severityScore?: number;
  detectedAt?: number;
  contributingTypes?: string[];
  signalCount?: number;
}

interface CachedPayload {
  signals?: CachedSignal[];
  evaluatedAt?: number;
  compositeCount?: number;
}

function toSignalType(raw: string | undefined): CrossSourceSignalType {
  const valid: CrossSourceSignalType[] = [
    'CROSS_SOURCE_SIGNAL_TYPE_COMPOSITE_ESCALATION',
    'CROSS_SOURCE_SIGNAL_TYPE_THERMAL_SPIKE',
    'CROSS_SOURCE_SIGNAL_TYPE_GPS_JAMMING',
    'CROSS_SOURCE_SIGNAL_TYPE_MILITARY_FLIGHT_SURGE',
    'CROSS_SOURCE_SIGNAL_TYPE_UNREST_SURGE',
    'CROSS_SOURCE_SIGNAL_TYPE_OREF_ALERT_CLUSTER',
    'CROSS_SOURCE_SIGNAL_TYPE_VIX_SPIKE',
    'CROSS_SOURCE_SIGNAL_TYPE_COMMODITY_SHOCK',
    'CROSS_SOURCE_SIGNAL_TYPE_CYBER_ESCALATION',
    'CROSS_SOURCE_SIGNAL_TYPE_SHIPPING_DISRUPTION',
    'CROSS_SOURCE_SIGNAL_TYPE_SANCTIONS_SURGE',
    'CROSS_SOURCE_SIGNAL_TYPE_EARTHQUAKE_SIGNIFICANT',
    'CROSS_SOURCE_SIGNAL_TYPE_RADIATION_ANOMALY',
    'CROSS_SOURCE_SIGNAL_TYPE_INFRASTRUCTURE_OUTAGE',
    'CROSS_SOURCE_SIGNAL_TYPE_WILDFIRE_ESCALATION',
    'CROSS_SOURCE_SIGNAL_TYPE_DISPLACEMENT_SURGE',
    'CROSS_SOURCE_SIGNAL_TYPE_FORECAST_DETERIORATION',
    'CROSS_SOURCE_SIGNAL_TYPE_MARKET_STRESS',
    'CROSS_SOURCE_SIGNAL_TYPE_WEATHER_EXTREME',
    'CROSS_SOURCE_SIGNAL_TYPE_MEDIA_TONE_DETERIORATION',
    'CROSS_SOURCE_SIGNAL_TYPE_RISK_SCORE_SPIKE',
  ];
  return (valid.includes(raw as CrossSourceSignalType) ? raw : 'CROSS_SOURCE_SIGNAL_TYPE_UNSPECIFIED') as CrossSourceSignalType;
}

function toSeverity(raw: string | undefined): CrossSourceSignalSeverity {
  const valid: CrossSourceSignalSeverity[] = [
    'CROSS_SOURCE_SIGNAL_SEVERITY_LOW',
    'CROSS_SOURCE_SIGNAL_SEVERITY_MEDIUM',
    'CROSS_SOURCE_SIGNAL_SEVERITY_HIGH',
    'CROSS_SOURCE_SIGNAL_SEVERITY_CRITICAL',
  ];
  return (valid.includes(raw as CrossSourceSignalSeverity) ? raw : 'CROSS_SOURCE_SIGNAL_SEVERITY_UNSPECIFIED') as CrossSourceSignalSeverity;
}

function normalizeSignal(s: CachedSignal): CrossSourceSignal {
  return {
    id: String(s.id || ''),
    type: toSignalType(s.type),
    theater: String(s.theater || 'Global'),
    summary: String(s.summary || ''),
    severity: toSeverity(s.severity),
    severityScore: typeof s.severityScore === 'number' && Number.isFinite(s.severityScore) ? s.severityScore : 0,
    detectedAt: typeof s.detectedAt === 'number' && Number.isFinite(s.detectedAt) ? s.detectedAt : Date.now(),
    contributingTypes: Array.isArray(s.contributingTypes) ? s.contributingTypes.map(String) : [],
    signalCount: typeof s.signalCount === 'number' ? s.signalCount : 0,
  };
}

export const listCrossSourceSignals: IntelligenceServiceHandler['listCrossSourceSignals'] = async (
  _ctx: ServerContext,
  _req: ListCrossSourceSignalsRequest,
): Promise<ListCrossSourceSignalsResponse> => {
  const raw = await getCachedJson(REDIS_KEY, true);
  if (!raw || typeof raw !== 'object') {
    return { signals: [], evaluatedAt: 0, compositeCount: 0 };
  }

  const payload = raw as CachedPayload;
  const signals = Array.isArray(payload.signals)
    ? payload.signals.map(normalizeSignal)
    : [];

  return {
    signals,
    evaluatedAt: typeof payload.evaluatedAt === 'number' ? payload.evaluatedAt : 0,
    compositeCount: typeof payload.compositeCount === 'number' ? payload.compositeCount : 0,
  };
};
