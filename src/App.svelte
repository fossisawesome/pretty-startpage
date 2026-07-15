<script lang="ts">
  import { onMount } from 'svelte';
  import { layout, updateWidget } from './lib/stores/layout';
  import { settings } from './lib/stores/settings';
  import { applyTheme, THEMES } from './lib/themes';
  import Widget from './lib/Widget.svelte';
  import WidgetPicker from './lib/WidgetPicker.svelte';
  import { WIDGET_DEFS } from './lib/widgets/registry';
  import { addWidget } from './lib/stores/layout';
  import SettingsSidebar from './lib/SettingsSidebar.svelte';
  import ThemeModal from './lib/ThemeModal.svelte';
  import { setTheme } from './lib/stores/settings';

  let pickerOpen = false;
  let sidebarOpen = false;
  let sidebarWidgetId: string | null = null;
  let themeModalOpen = false;

  function openWidgetSettings(id: string) {
    sidebarWidgetId = id;
    sidebarOpen = true;
  }

  onMount(() => {
    applyTheme($settings.theme);
  });

  $: applyTheme($settings.theme);

  function toggleEditMode(on: boolean) {
    layout.update((s) => ({ ...s, editMode: on }));
  }
</script>

<div class="top-controls">
  <button class="ctrl-btn" title="Settings" aria-label="Open theme settings" on:click={() => (themeModalOpen = true)}>⚙</button>
  <button
    class="ctrl-btn"
    class:active={$layout.editMode}
    title="Edit layout"
    aria-label="Toggle edit mode"
    on:click={() => toggleEditMode(!$layout.editMode)}
  >✎</button>
</div>

{#if $layout.editMode}
  <div class="edit-banner visible">
    <span>Edit mode, drag widgets, resize from edges</span>
    <button class="btn-done" on:click={() => toggleEditMode(false)}>Done</button>
  </div>
{/if}

<main class="canvas">
  {#each $layout.widgets as widget (widget.id)}
    {#if WIDGET_DEFS[widget.type]}
      <Widget {widget} editMode={$layout.editMode} on:settings={(e) => openWidgetSettings(e.detail.id)}>
        <svelte:component
          this={WIDGET_DEFS[widget.type].component}
          settings={widget.settings}
          on:change={(e) => updateWidget(widget.id, { settings: e.detail })}
        />
      </Widget>
    {/if}
  {/each}
</main>

{#if $layout.editMode}
  <button class="add-widget-btn visible" on:click={() => (pickerOpen = true)}>+ Add widget</button>
{/if}

<WidgetPicker
  open={pickerOpen}
  on:close={() => (pickerOpen = false)}
  on:select={(e) => {
    const def = WIDGET_DEFS[e.detail.type];
    addWidget(e.detail.type, { w: def.defaultW, h: def.defaultH, settings: def.defaultSettings });
    pickerOpen = false;
  }}
/>

<SettingsSidebar open={sidebarOpen} widgetId={sidebarWidgetId} on:close={() => (sidebarOpen = false)} />
<ThemeModal
  open={themeModalOpen}
  current={$settings.theme}
  on:close={() => (themeModalOpen = false)}
  on:save={(e) => { setTheme(e.detail.theme); themeModalOpen = false; }}
/>

<svelte:window on:keydown={(e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    document.querySelector<HTMLInputElement>('.search-input')?.focus();
  }
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    e.preventDefault();
    themeModalOpen = true;
  }
  if (e.key === 'Escape') {
    themeModalOpen = false;
    sidebarOpen = false;
    pickerOpen = false;
  }
}} />

<footer class="footer">{THEMES[$settings.theme].name} :)</footer>

<style lang="scss">
  .top-controls {
    position: fixed;
    top: 16px;
    right: 16px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    z-index: 100;
  }
  .ctrl-btn {
    width: 40px;
    height: 40px;
    display: grid;
    place-items: center;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 6px;
    cursor: pointer;
    color: var(--text);
  }
  .ctrl-btn.active {
    background: var(--accent);
    color: var(--bg);
    border-color: var(--accent);
  }
  .edit-banner {
    position: fixed;
    top: 0; left: 0; right: 0;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    background: color-mix(in srgb, var(--accent) 12%, var(--surface));
    border-bottom: 1px solid var(--accent);
    font-size: 13px;
    color: var(--subtext);
    z-index: 90;
  }
  .btn-done {
    padding: 4px 14px;
    background: var(--accent);
    color: var(--bg);
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 600;
  }
  .canvas {
    position: fixed;
    inset: 0;
    overflow: hidden;
  }
  .footer {
    position: fixed;
    bottom: 16px;
    left: 16px;
    font-size: 12px;
    color: var(--subtext);
    z-index: 5;
    pointer-events: none;
  }
  .add-widget-btn {
    position: fixed;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px 20px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 40px;
    color: var(--text);
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    z-index: 100;
  }
  .add-widget-btn:hover { background: var(--border); }
</style>
