import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type RevealKind = 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale';

/**
 * Anima un elemento cuando entra en el viewport.
 * Uso: <div appReveal="up" [revealDelay]="0.1">
 */
@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements AfterViewInit, OnDestroy {
  @Input('appReveal') kind: RevealKind | '' = 'up';
  @Input() revealDelay = 0;
  @Input() revealDistance = 42;
  @Input() revealDuration = 1.1;

  private trigger?: ScrollTrigger;

  constructor(private el: ElementRef<HTMLElement>, private zone: NgZone) {}

  ngAfterViewInit(): void {
    const node = this.el.nativeElement;
    const kind = this.kind || 'up';
    const d = this.revealDistance;

    const from: gsap.TweenVars = { opacity: 0, willChange: 'transform, opacity' };
    if (kind === 'up') from.y = d;
    if (kind === 'down') from.y = -d;
    if (kind === 'left') from.x = d;
    if (kind === 'right') from.x = -d;
    if (kind === 'scale') {
      from.scale = 0.92;
      from.y = d * 0.4;
    }

    this.zone.runOutsideAngular(() => {
      gsap.set(node, { ...from });
      node.style.opacity = '0';

      const tween = gsap.to(node, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: this.revealDuration,
        delay: this.revealDelay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: node,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
        },
      });
      this.trigger = tween.scrollTrigger;
    });
  }

  ngOnDestroy(): void {
    this.trigger?.kill();
  }
}
