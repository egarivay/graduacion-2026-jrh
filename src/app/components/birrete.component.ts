import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Birrete (gorro de graduación) en vista superior, estilizado con acabado
 * metálico plateado y borla rosa palo. Pensado para girar con el scroll.
 */
@Component({
  selector: 'app-birrete',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="board" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#E9EAEC" />
          <stop offset="38%" stop-color="#C7C9CC" />
          <stop offset="62%" stop-color="#8C8E92" />
          <stop offset="100%" stop-color="#5e5f63" />
        </linearGradient>
        <linearGradient id="boardEdge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#A8AAAE" />
          <stop offset="100%" stop-color="#46474a" />
        </linearGradient>
        <radialGradient id="cap" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stop-color="#3a3a40" />
          <stop offset="100%" stop-color="#121215" />
        </radialGradient>
        <linearGradient id="tassel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#EAD0D5" />
          <stop offset="55%" stop-color="#D8A9B2" />
          <stop offset="100%" stop-color="#C28C97" />
        </linearGradient>
        <radialGradient id="button" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#F3E6E9" />
          <stop offset="100%" stop-color="#C28C97" />
        </radialGradient>
      </defs>

      <!-- base / cap -->
      <ellipse cx="200" cy="246" rx="78" ry="40" fill="url(#cap)" />
      <ellipse
        cx="200"
        cy="240"
        rx="78"
        ry="40"
        fill="none"
        stroke="#5e5f63"
        stroke-width="1.2"
      />

      <!-- board (mortarboard) en perspectiva tipo diamante -->
      <g>
        <path
          d="M200 96 L356 178 L200 260 L44 178 Z"
          fill="url(#boardEdge)"
          transform="translate(0,8)"
        />
        <path d="M200 96 L356 178 L200 260 L44 178 Z" fill="url(#board)" />
        <path
          d="M200 96 L356 178 L200 260 L44 178 Z"
          fill="none"
          stroke="#F3F4F5"
          stroke-opacity="0.5"
          stroke-width="1.3"
        />
        <!-- brillo diagonal -->
        <path
          d="M200 96 L356 178 L200 260 Z"
          fill="#ffffff"
          fill-opacity="0.08"
        />
      </g>

      <!-- botón central -->
      <circle cx="200" cy="178" r="11" fill="url(#button)" />
      <circle
        cx="200"
        cy="178"
        r="11"
        fill="none"
        stroke="#fff"
        stroke-opacity="0.5"
      />

      <!-- cordón de la borla -->
      <path
        d="M200 178 C 250 196, 300 196, 318 176"
        stroke="url(#tassel)"
        stroke-width="3.4"
        fill="none"
        stroke-linecap="round"
      />
      <!-- borla -->
      <g>
        <rect x="311" y="170" width="14" height="9" rx="3" fill="url(#tassel)" />
        <path
          d="M312 178 L318 224 L324 178 Z"
          fill="url(#tassel)"
        />
        <line x1="315" y1="180" x2="316.5" y2="222" stroke="#C28C97" stroke-width="0.8" />
        <line x1="318" y1="180" x2="318" y2="224" stroke="#C28C97" stroke-width="0.8" />
        <line x1="321" y1="180" x2="319.5" y2="222" stroke="#C28C97" stroke-width="0.8" />
      </g>
    </svg>
  `,
})
export class BirreteComponent {}
