<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { layout, updateWidget } from './stores/layout';
  import { WIDGET_DEFS } from './widgets/registry';
  import { focusTrap } from './actions/focusTrap';

  export let open: boolean;
  export let widgetId: string | null;
  const dispatch = createEventDispatcher<{ close: void }>();

  $: widget = widgetId ? $layout.widgets.find((w) => w.id === widgetId) : undefined;
  $: def = widget ? WIDGET_DEFS[widget.type] : undefined;

  function onChange(e: CustomEvent<Record<string, unknown>>) {
    if (!widget) return;
    updateWidget(widget.id, { settings: e.detail });
  }
</script>

{#if open && widget && def}
  <div class="sidebar-backdrop open" role="presentation" aria-hidden="true" on:click={() => dispatch('close')}></div>
  <div class="settings-sidebar open" role="dialog" aria-modal="true" aria-label="{def.label} settings" use:focusTrap>
    <div class="sidebar-header">
      <span class="sidebar-title">{def.label} Settings</span>
      <button class="sidebar-close" on:click={() => dispatch('close')}>✕</button>
    </div>
    <div class="sidebar-body">
      <svelte:component this={def.settingsComponent} settings={widget.settings} on:change={onChange} />
    </div>
    <div class="sidebar-footer">
      <button class="btn-ghost" on:click={() => dispatch('close')}>Done</button>
    </div>
  </div>
{/if}

<style lang="scss">
  .settings-sidebar {
    position: fixed; top: 0; right: 0; bottom: 0; width: 300px; background: var(--surface2);
    border-left: 1px solid var(--border); display: flex; flex-direction: column; z-index: 120;
  }
  .sidebar-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,.35); z-index: 119; }
  .sidebar-header { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; border-bottom: 1px solid var(--border); }
  .sidebar-title { font-size: 15px; font-weight: 600; color: var(--text); }
  .sidebar-close { background: none; border: none; color: var(--subtext); cursor: pointer; font-size: 16px; }
  .sidebar-body { flex: 1; overflow-y: auto; padding: 20px; }
  .sidebar-footer { padding: 16px 20px; border-top: 1px solid var(--border); display: flex; justify-content: flex-end; }
</style>
