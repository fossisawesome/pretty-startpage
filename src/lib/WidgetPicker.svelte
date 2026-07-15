<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { WIDGET_DEFS } from './widgets/registry';

  export let open: boolean;
  const dispatch = createEventDispatcher<{ close: void; select: { type: string } }>();
</script>

<div class="widget-picker" class:visible={open} role="dialog" aria-modal="true" aria-label="Add a widget">
  <div class="picker-title">Add a widget</div>
  <div class="picker-list">
    {#each Object.entries(WIDGET_DEFS) as [type, def]}
      <button class="picker-item" on:click={() => dispatch('select', { type })}>{def.label}</button>
    {/each}
  </div>
  <button class="btn-ghost picker-close" on:click={() => dispatch('close')}>Cancel</button>
</div>

<style lang="scss">
  .widget-picker {
    position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%) translateY(20px);
    background: var(--surface); border: 1px solid var(--border); border-radius: 10px;
    padding: 16px; width: 280px; z-index: 110; opacity: 0; pointer-events: none;
    transition: opacity .2s, transform .2s;
  }
  .widget-picker.visible { opacity: 1; pointer-events: all; transform: translateX(-50%) translateY(0); }
  .picker-title { font-size: 12px; font-weight: 600; color: var(--subtext); text-transform: uppercase; margin-bottom: 10px; }
  .picker-list { display: flex; flex-direction: column; gap: 4px; margin-bottom: 10px; }
  .picker-item {
    padding: 9px 12px; background: none; border: 1px solid transparent; border-radius: 6px;
    color: var(--text); font-size: 14px; cursor: pointer; text-align: left;
  }
  .picker-item:hover { background: var(--border); border-color: var(--border); }
  .picker-close { width: 100%; justify-content: center; }
</style>
