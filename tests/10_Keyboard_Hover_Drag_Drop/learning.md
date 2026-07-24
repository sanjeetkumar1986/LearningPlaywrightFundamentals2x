# Playwright Keyboard & Mouse Reference

Quick reference for keyboard keys, mouse actions, hover, and drag & drop in Playwright.

---

## 1. Keyboard API

Two ways to use the keyboard:

| Style | Example | When to use |
|---|---|---|
| Locator-based | `await locator.press('Enter')` | Key press on a specific element (recommended) |
| Page-level | `await page.keyboard.press('Enter')` | Key press wherever focus currently is |

### Core keyboard methods

```ts
// Press and release a single key (or combination)
await page.keyboard.press('Enter');
await locator.press('Tab');

// Type text character by character (fires real key events per char)
await page.keyboard.type('Hello World');
await locator.pressSequentially('Hello', { delay: 100 }); // with delay between keys

// Insert text without key events (fast, like paste)
await page.keyboard.insertText('Hello');

// Hold and release keys manually
await page.keyboard.down('Shift');
await page.keyboard.press('ArrowRight');
await page.keyboard.up('Shift');
```

> Note: `locator.type()` is deprecated. Use `locator.fill()` for forms, `locator.pressSequentially()` when you need per-key events.

### Key combinations (chords)

Join keys with `+`:

```ts
await page.keyboard.press('Control+A');       // Select all (Windows/Linux)
await page.keyboard.press('Meta+A');          // Select all (macOS, Meta = Cmd)
await page.keyboard.press('Control+C');       // Copy
await page.keyboard.press('Control+V');       // Paste
await page.keyboard.press('Shift+Tab');       // Reverse tab
await page.keyboard.press('Control+Shift+T'); // Multi-modifier
await page.keyboard.press('ControlOrMeta+A'); // Cross-platform: Ctrl on Win/Linux, Cmd on Mac
```

### All key names

**Modifier keys**

| Key | Meaning |
|---|---|
| `Shift` | Shift |
| `Control` | Ctrl |
| `Alt` | Alt (Option on Mac) |
| `Meta` | Cmd on Mac / Win key on Windows |
| `ControlOrMeta` | Ctrl on Win/Linux, Cmd on Mac (cross-platform) |

**Navigation keys**

| Key | Meaning |
|---|---|
| `ArrowUp` `ArrowDown` `ArrowLeft` `ArrowRight` | Arrow keys |
| `Home` `End` | Line start / end |
| `PageUp` `PageDown` | Page scroll |
| `Tab` | Focus next element |

**Editing / action keys**

| Key | Meaning |
|---|---|
| `Enter` | Enter / Return |
| `Escape` | Esc |
| `Backspace` | Delete char before cursor |
| `Delete` | Delete char after cursor |
| `Insert` | Insert |
| `Space` (or literal `' '`) | Spacebar |
| `CapsLock` | Caps lock |

**Function keys**

`F1` `F2` `F3` `F4` `F5` `F6` `F7` `F8` `F9` `F10` `F11` `F12`

**Digits & letters**

- Digits: `Digit0` to `Digit9` (or just `'0'`-`'9'`)
- Letters: `KeyA` to `KeyZ` (or just `'a'`-`'z'`)
- Single characters work directly: `await page.keyboard.press('a')`, `press('#')`, `press('$')`
- `press('Shift+KeyA')` produces `A`; lowercase `press('a')` produces `a`

**Numpad keys**

`Numpad0`-`Numpad9`, `NumpadAdd`, `NumpadSubtract`, `NumpadMultiply`, `NumpadDivide`, `NumpadDecimal`, `NumpadEnter`, `NumLock`

**Other**

`PrintScreen`, `ScrollLock`, `Pause`, `ContextMenu`

---

## 2. Mouse API

Coordinates are relative to top-left of viewport. `page.mouse` gives raw control; prefer `locator.click()` etc. when targeting elements.

### Core mouse methods

```ts
// Move mouse to position (x, y)
await page.mouse.move(100, 200);
await page.mouse.move(100, 200, { steps: 10 }); // smooth move, fires intermediate mousemove events

// Press mouse button down
await page.mouse.down();                          // left button
await page.mouse.down({ button: 'right' });       // right button
await page.mouse.down({ button: 'middle' });      // middle button
await page.mouse.down({ clickCount: 2 });         // as part of double click

// Release mouse button
await page.mouse.up();

// Click at coordinates (shortcut for move + down + up)
await page.mouse.click(100, 200);
await page.mouse.click(100, 200, { button: 'right', delay: 500 });

// Double click at coordinates
await page.mouse.dblclick(100, 200);

// Scroll with mouse wheel (deltaX, deltaY) — positive deltaY scrolls down
await page.mouse.wheel(0, 500);
```

### Mouse options

| Option | Values | Default |
|---|---|---|
| `button` | `'left'` \| `'right'` \| `'middle'` | `'left'` |
| `clickCount` | number | `1` |
| `delay` | ms between down and up | `0` |
| `steps` | intermediate mousemove events (move only) | `1` |

### Locator click variants (element-targeted, auto-waiting)

```ts
await locator.click();                             // left click
await locator.click({ button: 'right' });          // right click (context menu)
await locator.click({ modifiers: ['Shift'] });     // shift+click
await locator.click({ modifiers: ['ControlOrMeta'] }); // ctrl/cmd+click
await locator.click({ position: { x: 5, y: 5 } }); // click at offset within element
await locator.click({ clickCount: 3 });            // triple click (select paragraph)
await locator.dblclick();                          // double click
await locator.click({ force: true });              // skip actionability checks
```

---

## 3. Hover

```ts
// Hover over element (auto-waits for element)
await locator.hover();
await page.getByRole('button', { name: 'Menu' }).hover();

// Hover at specific position within element
await locator.hover({ position: { x: 10, y: 10 } });

// Hover with modifier held
await locator.hover({ modifiers: ['Shift'] });

// Raw hover via mouse move
await page.mouse.move(150, 300);
```

Common pattern, hover to reveal submenu then click:

```ts
await page.getByText('Products').hover();
await page.getByText('Playwright Course').click();
```

---

## 4. Drag and Drop

### Method 1: dragTo (recommended)

```ts
const source = page.locator('#draggable');
const target = page.locator('#droppable');
await source.dragTo(target);

// With source/target position offsets
await source.dragTo(target, {
  sourcePosition: { x: 10, y: 10 },
  targetPosition: { x: 20, y: 20 },
});
```

### Method 2: page.dragAndDrop with selectors

```ts
await page.dragAndDrop('#draggable', '#droppable');
```

### Method 3: Manual (mouse down, move, up)

Use when HTML5 drag events need finer control or dragTo fails:

```ts
await page.locator('#draggable').hover();
await page.mouse.down();
await page.locator('#droppable').hover();
await page.mouse.move(0, 0, { steps: 5 }); // extra move helps trigger dragover
await page.locator('#droppable').hover();
await page.mouse.up();
```

---

## 5. Quick Cheat Sheet

| Task | Code |
|---|---|
| Press Enter on input | `await input.press('Enter')` |
| Select all text | `await page.keyboard.press('ControlOrMeta+A')` |
| Type with real key events | `await locator.pressSequentially('text')` |
| Fill form field (fast) | `await locator.fill('text')` |
| Hold Shift while pressing | `keyboard.down('Shift')` ... `keyboard.up('Shift')` |
| Right click | `await locator.click({ button: 'right' })` |
| Double click | `await locator.dblclick()` |
| Scroll down 500px | `await page.mouse.wheel(0, 500)` |
| Hover menu | `await locator.hover()` |
| Drag & drop | `await source.dragTo(target)` |

---

## Docs

- Keyboard: https://playwright.dev/docs/api/class-keyboard
- Mouse: https://playwright.dev/docs/api/class-mouse
- Input actions: https://playwright.dev/docs/input
