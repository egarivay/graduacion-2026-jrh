import { Injectable, NgZone, OnDestroy } from '@angular/core';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Orquesta el scroll suave (Lenis) y lo sincroniza con GSAP ScrollTrigger.
 * Fuera de la zona de Angular para no disparar detección de cambios en cada frame.
 */
@Injectable({ providedIn: 'root' })
export class ScrollService implements OnDestroy {
  private lenis?: Lenis;
  private rafId = 0;

  constructor(private zone: NgZone) {}

  init(): void {
    if (this.lenis) return;

    this.zone.runOutsideAngular(() => {
      this.lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.6,
      });

      this.lenis.on('scroll', ScrollTrigger.update);

      const raf = (time: number) => {
        this.lenis?.raf(time);
        this.rafId = requestAnimationFrame(raf);
      };
      this.rafId = requestAnimationFrame(raf);

      ScrollTrigger.refresh();
    });
  }

  scrollTo(target: string | number | HTMLElement, offset = 0): void {
    this.lenis?.scrollTo(target as any, { offset, duration: 1.4 });
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.rafId);
    this.lenis?.destroy();
    ScrollTrigger.getAll().forEach((t) => t.kill());
  }
}
