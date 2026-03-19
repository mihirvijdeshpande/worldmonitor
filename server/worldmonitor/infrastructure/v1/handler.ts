import type { InfrastructureServiceHandler } from '../../../../src/generated/server/worldmonitor/infrastructure/v1/service_server';

import { getCableHealth } from './get-cable-health';
import { listInternetOutages } from './list-internet-outages';
import { listServiceStatuses } from './list-service-statuses';
import { getTemporalBaseline } from './get-temporal-baseline';
import { recordBaselineSnapshot } from './record-baseline-snapshot';
import { listTemporalAnomalies } from './list-temporal-anomalies';

export const infrastructureHandler: InfrastructureServiceHandler = {
  getCableHealth,
  listInternetOutages,
  listServiceStatuses,
  getTemporalBaseline,
  recordBaselineSnapshot,
  listTemporalAnomalies,
  getIpGeo: async (_ctx, _req) => ({ ip: '', countryCode: '', countryName: '', city: '', latitude: 0, longitude: 0, isp: '' }),
  reverseGeocode: async (_ctx, _req) => ({ countryCode: '', countryName: '', city: '', region: '', formatted: '' }),
  getBootstrapData: async (_ctx, _req) => ({ data: {} }),
};
