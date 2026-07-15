<script lang="ts">
  import { onDestroy } from 'svelte';

  export let settings: {
    hourFormat: 'auto' | '12' | '24';
    timezone: string;
    clockFont: string;
    showSeconds: boolean;
  };

  let timeText = '--:--';
  let tzText = '';

  function update() {
    const tz = settings.timezone === 'system' ? undefined : settings.timezone;
    const opts: Intl.DateTimeFormatOptions = { timeStyle: settings.showSeconds ? 'medium' : 'short' };
    if (settings.hourFormat === '12') opts.hour12 = true;
    else if (settings.hourFormat === '24') opts.hour12 = false;
    try {
      const fmt = new Intl.DateTimeFormat([], { ...opts, ...(tz ? { timeZone: tz } : {}) });
      timeText = fmt.format(new Date());
    } catch {
      timeText = new Date().toLocaleTimeString();
    }
    tzText = settings.timezone === 'system' ? Intl.DateTimeFormat().resolvedOptions().timeZone : settings.timezone;
  }

  update();
  const interval = setInterval(update, 1000);
  onDestroy(() => clearInterval(interval));

  $: settings, update();
</script>

<div class="w-clock">
  <div class="w-clock-time" style="font-family: {settings.clockFont}">{timeText}</div>
  <div class="w-clock-tz">{tzText}</div>
</div>

<style lang="scss">
  .w-clock {
    width: 100%; height: 100%;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    background: var(--surface); border: 1px solid var(--border); border-radius: 8px;
    padding: 12px 16px; gap: 4px;
  }
  .w-clock-time { font-weight: 700; font-size: clamp(28px, 5vw, 56px); color: var(--text); line-height: 1; }
  .w-clock-tz { font-size: 12px; color: var(--subtext); }
</style>
