# Textil ERP Coding Style Guide

## Angular Templates

### Control Flow
Always use the modern Angular control flow syntax instead of structural directives.

- **Prefer `@if` / `@else`** over `*ngIf`.
- **Prefer `@for`** over `*ngFor`.
- **Prefer `@switch` / `@case`** over `*ngSwitch`.

**Rationale:**
- **Performance:** Better integration with the Angular change detection system.
- **Type Safety:** Improved type narrowing within blocks.
- **Readability:** Cleaner syntax that reduces the need for extra wrapper elements or `<ng-container>`.

#### Examples

**Incorrect:**
```html
<div *ngIf="isVisible">Visible</div>
<div *ngFor="let item of items">{{ item }}</div>
```

**Correct:**
```html
@if (isVisible) {
  <div>Visible</div>
}

@for (item of items; track item.id) {
  <div>{{ item }}</div>
}
```

---

## TypeScript

- Use **Signals** for reactive state where possible.
- Prefer **Standalone Components**.
- Use **Standardized Naming** (PascalCase for classes, camelCase for variables/methods).
