# Workflow: Adding a New UI Panel

This workflow ensures new data panels are correctly integrated into the grid system and variant configurations.

## 1. Create Component
- Create `src/components/MyPanel.ts`.
- Subclass the `Panel` base class (`src/components/Panel.ts`).
- Implement `render()` and `update()` methods.
- Use `this.setContent(html)` to update content (debounced).
- Prefer event delegation on `this.content`.

## 2. Register Panel
- Add reference to `src/config/panels.ts`.
- Define its default `col_span` and `row_span`.
- Assign it to a domain (e.g., `CONFLICT`, `MARKETS`).

## 3. Wire Data Loading
- Update `src/app/data-loader.ts`.
- Add logic to fetch data for this panel during the initial/refresh loop.
- Use `getHydratedData(key)` for bootstrap data or call service wrappers directly.

## 4. Add to Variants
- Update `src/config/variants/` (e.g., `full.ts`, `tech.ts`, `finance.ts`).
- Add the panel ID to the `panels` array for each variant that should display it.

## 5. Localization
- Add display titles and labels to `src/locales/` (at least `en.json` first).

## 6. Validation
- Run `npm run dev` and verify layout.
- Check responsiveness with the resize handles.
