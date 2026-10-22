# Static Export Plan

This change plans a static export mode that writes routed project selections to JSON files for portfolio variants and stack accents.

## Presets

- `fullstack-product` plus `node`
- `backend-platform` plus `go`
- `ai-data` plus `python`
- `frontend-web` plus `node`

## Acceptance Notes

- Add an `npm run export` command.
- Write deterministic JSON into `dist/`.
- Cover the exporter with Node test assertions.
