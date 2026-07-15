<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Widget } from './types';
  import { updateWidget, removeWidget, snap } from './stores/layout';

  export let widget: Widget;
  export let editMode: boolean;

  const dispatch = createEventDispatcher<{ settings: { id: string } }>();

  let dragging = false;
  let resizeDir: 'e' | 's' | 'se' | null = null;
  let startX = 0;
  let startY = 0;
  let startLeft = 0;
  let startTop = 0;
  let startW = 0;
  let startH = 0;

  function onPointerDownDrag(e: PointerEvent) {
    if (!editMode) return;
    const target = e.target as HTMLElement;
    if (target.closest('.resize-handle') || target.closest('.widget-edit-bar')) return;
    e.preventDefault();
    dragging = true;
    startX = e.clientX;
    startY = e.clientY;
    startLeft = widget.x;
    startTop = widget.y;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: PointerEvent) {
    if (dragging) {
      const nx = snap(startLeft + e.clientX - startX);
      const ny = snap(startTop + e.clientY - startY);
      const boundX = Math.max(0, window.innerWidth - widget.w);
      const boundY = Math.max(0, window.innerHeight - widget.h);
      widget.x = Math.max(0, Math.min(boundX, nx));
      widget.y = Math.max(0, Math.min(boundY, ny));
    } else if (resizeDir) {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (resizeDir === 'e' || resizeDir === 'se') {
        const maxW = window.innerWidth - widget.x;
        widget.w = Math.max(160, Math.min(maxW, snap(startW + dx)));
      }
      if (resizeDir === 's' || resizeDir === 'se') {
        const maxH = window.innerHeight - widget.y;
        widget.h = Math.max(60, Math.min(maxH, snap(startH + dy)));
      }
    }
  }

  function onPointerUp(e: PointerEvent) {
    if (dragging || resizeDir) {
      updateWidget(widget.id, { x: widget.x, y: widget.y, w: widget.w, h: widget.h });
    }
    dragging = false;
    resizeDir = null;
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
  }

  function onResizeStart(dir: 'e' | 's' | 'se') {
    return (e: PointerEvent) => {
      if (!editMode) return;
      e.preventDefault();
      e.stopPropagation();
      resizeDir = dir;
      startX = e.clientX;
      startY = e.clientY;
      startW = widget.w;
      startH = widget.h;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    };
  }
</script>

<div
  class="widget"
  class:edit-mode={editMode}
  class:dragging
  role="group"
  aria-label="{widget.type} widget"
  style="left:{widget.x}px; top:{widget.y}px; width:{widget.w}px; height:{widget.h}px;"
  on:pointerdown={onPointerDownDrag}
  on:pointermove={onPointerMove}
  on:pointerup={onPointerUp}
>
  <div class="widget-edit-bar">
    <button class="widget-settings-btn" aria-label="Widget settings" on:click|stopPropagation={() => dispatch('settings', { id: widget.id })}>⚙</button>
    <button class="widget-remove-btn" aria-label="Remove widget" on:click|stopPropagation={() => removeWidget(widget.id)}>✕</button>
  </div>
  <div class="widget-body">
    <slot />
  </div>
  <div class="resize-handle resize-e" role="presentation" aria-hidden="true" on:pointerdown={onResizeStart('e')}></div>
  <div class="resize-handle resize-s" role="presentation" aria-hidden="true" on:pointerdown={onResizeStart('s')}></div>
  <div class="resize-handle resize-se" role="presentation" aria-hidden="true" on:pointerdown={onResizeStart('se')}></div>
</div>

<style lang="scss">
  .widget {
    position: absolute;
    user-select: none;
    border-radius: 8px;
    touch-action: none;
  }
  .widget-body {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 8px;
  }
  .widget-edit-bar {
    display: none;
    position: absolute;
    top: -30px;
    right: 0;
    gap: 4px;
    z-index: 10;
  }
  .widget.edit-mode .widget-edit-bar { display: flex; }
  .widget-settings-btn, .widget-remove-btn {
    padding: 3px 7px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 4px;
    color: var(--subtext);
    cursor: pointer;
  }
  .widget-remove-btn:hover { background: var(--red); color: var(--bg); }
  .widget.edit-mode:hover { box-shadow: 0 0 0 2px var(--accent); cursor: grab; }
  .widget.dragging { cursor: grabbing; box-shadow: 0 8px 32px rgba(0,0,0,.5), 0 0 0 2px var(--accent); opacity: .9; }
  .resize-handle { position: absolute; display: none; z-index: 10; }
  .widget.edit-mode .resize-handle { display: block; }
  .resize-e { right: -5px; top: 10%; bottom: 10%; width: 10px; cursor: ew-resize; }
  .resize-s { bottom: -5px; left: 10%; right: 10%; height: 10px; cursor: ns-resize; }
  .resize-se { right: -5px; bottom: -5px; width: 16px; height: 16px; cursor: nwse-resize; background: var(--accent); border-radius: 2px; opacity: .7; }
</style>
