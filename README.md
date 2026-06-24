# Invitación Digital · Generación 2020 — 2026

Invitación digital para la **Ceremonia de Clausura** de la Escuela Primaria
Federal *Jesús Reyes Heroles*. Construida con **Angular 17**, **Tailwind CSS**,
**GSAP** (animaciones / reveal por scroll) y **Lenis** (scroll suave).

Estética minimalista en **negro, plateado y rosa palo**, con un fondo fijo de
birrete que **gira con el scroll**, imagen de la generación en el hero, cuenta
regresiva en vivo y el programa del evento.

## Cómo correrla

```bash
npm install        # solo la primera vez
npm start          # servidor de desarrollo → http://localhost:4200
npm run build      # build de producción en dist/graduacion
```

## Personalización rápida

Casi todo se edita en un solo lugar: **`src/app/app.component.ts`**, en el objeto
`event`.

| Qué | Dónde |
|-----|-------|
| Fecha, hora, lugar, ciudad | `event` en `app.component.ts` |
| Fecha objetivo del countdown | `event.targetIso` (formato `2026-07-10T08:00:00`) |
| Programa del evento / frases | `src/app/app.component.html` (sección `#programa`) |
| Textos / frases | `src/app/app.component.html` |
| Colores y tipografías | `tailwind.config.js` |

### Imagen de la generación

La ilustración de la generación vive en **`src/assets/graduacion.jpg`** y es la
imagen protagonista del **hero** (entra con un revelado tipo cortina + zoom).
Para cambiarla, reemplaza ese archivo (ideal ~1800 px de ancho, formato
horizontal).

## Estructura

```
src/app/
├─ core/
│  ├─ scroll.service.ts     # Lenis + GSAP ScrollTrigger
│  └─ reveal.directive.ts   # [appReveal] anima al entrar en viewport
├─ components/
│  ├─ background.component.ts  # fondo fijo + birrete giratorio + partículas
│  ├─ birrete.component.ts     # gorro de graduación (SVG)
│  └─ countdown.component.ts   # cuenta regresiva
├─ app.component.ts / .html    # página completa de la invitación
```

## Secciones

Hero (datos de la escuela + imagen de la generación) · Frase 1 · Invitación ·
Detalles (fecha/hora/lugar) · Cuenta regresiva · Frase 2 · Programa del evento ·
Pie con datos oficiales.
