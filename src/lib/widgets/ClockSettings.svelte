<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let settings: {
    hourFormat: 'auto' | '12' | '24';
    timezone: string;
    clockFont: string;
    showSeconds: boolean;
  };

  const dispatch = createEventDispatcher<{ change: typeof settings }>();

  function emit() {
    dispatch('change', settings);
  }
</script>

<div class="form-group">
  <label for="hourFormat">Hour format</label>
  <select id="hourFormat" bind:value={settings.hourFormat} on:change={emit}>
    <option value="auto">Auto (locale)</option>
    <option value="12">12-hour (AM/PM)</option>
    <option value="24">24-hour</option>
  </select>
</div>
<div class="form-group">
  <label for="timezone">Timezone (IANA)</label>
  <input id="timezone" type="text" bind:value={settings.timezone} on:change={emit} placeholder="system, UTC, Europe/London" />
  <small>Type "system" for your local timezone</small>
</div>
<div class="form-group">
  <label for="clockFont">Clock font</label>
  <select id="clockFont" bind:value={settings.clockFont} on:change={emit}>
    <option value="'M PLUS 1 Code', monospace">M+ Code</option>
    <option value="'Roboto Mono', monospace">Roboto Mono</option>
    <option value="'Courier New', monospace">Courier New</option>
    <option value="system-ui">System UI</option>
  </select>
</div>
<div class="form-group form-row-check">
  <label class="check-label">
    <input type="checkbox" bind:checked={settings.showSeconds} on:change={emit} />
    Show seconds
  </label>
</div>
