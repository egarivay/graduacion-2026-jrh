import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  ViewChild,
} from '@angular/core';
import { gsap } from 'gsap';

import { ScrollService } from './core/scroll.service';
import { RevealDirective } from './core/reveal.directive';
import { BackgroundComponent } from './components/background.component';
import { CountdownComponent } from './components/countdown.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RevealDirective, BackgroundComponent, CountdownComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements AfterViewInit {
  @ViewChild('hero') hero!: ElementRef<HTMLElement>;

  /** Datos del evento (centralizados para editarlos fácilmente). */
  readonly event = {
    school: 'Escuela Primaria Federal Jesús Reyes Heroles',
    generation: '2020 — 2026',
    dateLabel: 'Viernes 10 de Julio',
    timeLabel: '8:00 a.m.',
    place: 'Bulevares del Lago',
    city: 'Nicolás Romero, Estado de México',
    targetIso: '2026-07-10T08:00:00',
  };

  constructor(private scroll: ScrollService, private zone: NgZone) {}

  ngAfterViewInit(): void {
    this.scroll.init();
    this.animateHero();
  }

  private animateHero(): void {
    this.zone.runOutsideAngular(() => {
      const root = this.hero.nativeElement;
      const items = root.querySelectorAll('[data-hero]');
      const topItems = root.querySelectorAll('[data-hero-top] [data-hero]');
      const bottomItems = root.querySelectorAll('[data-hero-bottom] [data-hero]');
      const wrap = root.querySelector('[data-hero-img]') as HTMLElement | null;
      const img = root.querySelector('[data-hero-img] img') as HTMLElement | null;

      gsap.set(items, { opacity: 0, y: 40 });

      // Entrada de la imagen: revelado tipo cortina (arriba→abajo) + zoom interno.
      if (wrap && img) {
        gsap.set(wrap, { opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' });
        gsap.set(img, { scale: 1.28 });
      }

      const tl = gsap.timeline({ delay: 0.3 });

      // 1. Identidad de la escuela + título.
      tl.to(topItems, {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: 'power3.out',
        stagger: 0.12,
      });

      // 2. Revelado de la imagen.
      if (wrap && img) {
        tl.to(
          wrap,
          {
            opacity: 1,
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.4,
            ease: 'power3.inOut',
          },
          '-=0.3'
        ).to(img, { scale: 1, duration: 1.8, ease: 'power2.out' }, '<');
      }

      // 3. Ubicación + indicador de scroll.
      tl.to(
        bottomItems,
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: 'power3.out',
          stagger: 0.12,
        },
        '-=0.8'
      );
    });
  }

  goTo(id: string): void {
    this.scroll.scrollTo('#' + id, -10);
  }
}
