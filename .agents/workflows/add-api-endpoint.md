# Workflow: Adding a New API Endpoint

This workflow ensures every new JSON endpoint is typed, documented, and follows the correct RPC/sebuf conventions.

## 1. Define Message (Proto-first)
- Create or update a `.proto` file in `proto/worldmonitor/<domain>/v1/`.
- Add relevant message types and an `rpc` method.
- MUST include `(sebuf.http.config)` with `path` and `method`.
- If GET, use `(sebuf.http.query)` for fields.

## 2. Generate Stubs
- Run `make generate`.
- Verify new stubs in `src/generated/client/` and `src/generated/server/`.

## 3. Implement Handler
- Update/Create `server/worldmonitor/<domain>/v1/handler.ts`.
- Implement the interface generated in step 2.
- Use `cachedFetchJson()` from `server/_shared/redis.ts` for all upstream calls.
- **CRITICAL**: Include ALL varying request params in the Redis cache key.

## 4. Wire the Gateway
- If adding a NEW domain, update `api/[domain]/v1/[rpc].ts` to register the new handler.
- If existing domain, it should automagically pick up the new RPC if the handler is wired in the domain's server factory.

## 5. Client Service Wrapper
- Add to `src/services/<domain>/index.ts` to wrap the client call for application use.
- Handle any necessary domain-specific transformations or retries.

## 6. Integration Test
- Add a test case in `tests/<domain>.test.mts` (using `node:test`).
- Mock the upstream API if necessary.
- Verify the cache key logic.

## 7. Registry
- Add to `api/health.js` if the endpoint requires periodic seeding or freshness tracking.
