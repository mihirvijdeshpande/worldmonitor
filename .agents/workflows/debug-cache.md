# Workflow: Debugging Cache & Data Issues

This workflow describes how to triage data missing from the frontend or inconsistent across clients.

## 1. Verify Client Hydration
- Open browser devtools -> Application -> IndexedDB.
- Check `world-monitor-cache` or `world-monitor-bootstrap`.
- Verify the key exists and `last_updated_at` is recent.

## 2. Check the Health Endpoint
- Navigate to `/api/health`.
- This endpoint aggregates `seed-meta` from Redis.
- Look for `STALE` or `EMPTY` status for the relevant domain key.

## 3. Consult Redis Directly
- Login to Upstash dashboard or use `redis-cli` if available.
- Check `seed-meta:<key>` for the `{ fetchedAt, recordCount, error }` object.
- If `recordCount` is 0 but status is OK, the upstream API might be returning empty valid payloads.

## 4. Run Data Integrity Tests
- Run `npm run test:data`.
- This suite checks schema validity on the latest data in Redis.
- If data fails validation, check the `handler.ts` transformation logic or upstream API changes.

## 5. Cache Key Inspection
- Open `server/worldmonitor/<domain>/v1/handler.ts`.
- Verify the cache key logic includes all relevant params (e.g., `symbol`, `country`, `limit`).
- If params are missing, different users might see each other's data (data leak).

## 6. Restart/Re-seed
- If data is corrupt or stale, manually run the relevant script:
  `node scripts/seed-<domain>.mjs`.
- Verify `seed-meta` updates after execution.
