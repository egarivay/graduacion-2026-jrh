import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BirreteComponent } from './birrete.component';

interface Star {
  x: number;
  y: number;
  s: number;
  d: number;
}

/**
 * Capa de fondo fija: degradados, resplandores rosa/plata, estrellas y un
 * birrete gigante que gira de forma continua con el scroll.
 */
@Component({
  selector: 'app-background',
  standalone: true,
  imports: [BirreteComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink">
      <!-- base degradada -->
      <div
        class="absolute inset-0"
        style="background:
          radial-gradient(120% 80% at 50% -10%, #1a1a20 0%, #0a0a0c 55%),
          radial-gradient(60% 50% at 80% 110%, rgba(194,140,151,0.16), transparent 70%),
          radial-gradient(50% 45% at 10% 90%, rgba(140,142,146,0.14), transparent 70%);"
      ></div>

      <!-- rejilla sutil -->
      <div
        class="absolute inset-0 opacity-[0.05]"
        style="background-image:
          linear-gradient(to right, #c7c9cc 1px, transparent 1px),
          linear-gradient(to bottom, #c7c9cc 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(70% 60% at 50% 40%, #000 30%, transparent 80%);
          -webkit-mask-image: radial-gradient(70% 60% at 50% 40%, #000 30%, transparent 80%);"
      ></div>

      <!-- estrellas / partículas -->
      <div class="absolute inset-0">
        @for (st of stars; track $index) {
        <span
          class="absolute rounded-full bg-silver-light animate-twinkle"
          [style.left.%]="st.x"
          [style.top.%]="st.y"
          [style.width.px]="st.s"
          [style.height.px]="st.s"
          [style.animation-delay.s]="st.d"
        ></span>
        }
      </div>

      <!-- birrete giratorio -->
      <div
        #cap
        class="absolute left-1/2 top-1/2 h-[78vmin] w-[78vmin] -translate-x-1/2 -translate-y-1/2 opacity-[0.10]"
        style="filter: drop-shadow(0 30px 60px rgba(0,0,0,0.6));"
      >
        <app-birrete />
      </div>

      <!-- viñeta -->
      <div
        class="absolute inset-0"
        style="background: radial-gradient(100% 100% at 50% 50%, transparent 55%, rgba(0,0,0,0.55) 100%);"
      ></div>
    </div>
  `,
})
export class BackgroundComponent implements AfterViewInit, OnDestroy {
  @ViewChild('cap') cap!: ElementRef<HTMLElement>;
  stars: Star[] = [];
  private trigger?: ScrollTrigger;

  constructor(private zone: NgZone) {
    for (let i = 0; i < 60; i++) {
      this.stars.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        s: Math.random() * 2 + 0.6,
        d: Math.random() * 4,
      });
    }
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      const node = this.cap.nativeElement;

      // El birrete gira y crece ligado al progreso del scroll de la página.
      this.trigger = ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
        onUpdate: (self) => {
          gsap.set(node, {
            rotation: self.progress * 720,
            scale: 1 + self.progress * 0.28,
          });
        },
      });
    });
  }

  ngOnDestroy(): void {
    this.trigger?.kill();
  }
}
