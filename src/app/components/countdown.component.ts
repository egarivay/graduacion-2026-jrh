import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';

interface Unit {
  label: string;
  value: number;
}

/**
 * Cuenta regresiva hasta la fecha del evento.
 */
@Component({
  selector: 'app-countdown',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="mx-auto grid max-w-xs grid-cols-2 gap-3 sm:flex sm:max-w-none sm:flex-wrap sm:items-stretch sm:justify-center sm:gap-5"
    >
      @for (u of units(); track u.label) {
      <div
        class="glass flex flex-col items-center rounded-2xl px-4 py-5 sm:min-w-[110px] sm:px-7 sm:py-7"
      >
        <span
          class="text-metal font-display text-3xl font-semibold tabular-nums sm:text-5xl"
        >
          {{ pad(u.value) }}
        </span>
        <span
          class="mt-2 font-sans text-[10px] uppercase tracking-widest2 text-silver-muted sm:text-xs"
        >
          {{ u.label }}
        </span>
      </div>
      }
    </div>
    @if (finished()) {
    <p class="mt-6 text-center font-serif text-2xl italic text-rosa">
      ¡Hoy es el gran día!
    </p>
    }
  `,
})
export class CountdownComponent implements OnInit, OnDestroy {
  /** Fecha objetivo en ISO local. */
  @Input() target = '2026-07-10T08:00:00';

  units = signal<Unit[]>([
    { label: 'Días', value: 0 },
    { label: 'Horas', value: 0 },
    { label: 'Min', value: 0 },
    { label: 'Seg', value: 0 },
  ]);
  finished = signal(false);

  private timer?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.tick();
    this.timer = setInterval(() => this.tick(), 1000);
  }

  private tick(): void {
    const diff = new Date(this.target).getTime() - Date.now();
    if (diff <= 0) {
      this.finished.set(true);
      this.units.set([
        { label: 'Días', value: 0 },
        { label: 'Horas', value: 0 },
        { label: 'Min', value: 0 },
        { label: 'Seg', value: 0 },
      ]);
      return;
    }
    const s = Math.floor(diff / 1000);
    this.units.set([
      { label: 'Días', value: Math.floor(s / 86400) },
      { label: 'Horas', value: Math.floor((s % 86400) / 3600) },
      { label: 'Min', value: Math.floor((s % 3600) / 60) },
      { label: 'Seg', value: s % 60 },
    ]);
  }

  pad(n: number): string {
    return n < 10 ? '0' + n : '' + n;
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
  }
}
