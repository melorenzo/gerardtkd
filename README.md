<div align="center">

# 🥋 Escuela de Taekwon-Do ITF ATRA Sáenz Peña

**Sitio web de la escuela** — Villa Lynch · San Martín · Loma Hermosa

[![Astro](https://img.shields.io/badge/Astro-7-BC52EE?logo=astro&logoColor=white)](https://astro.build)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Docker](https://img.shields.io/badge/Docker-ready-2496ED?logo=docker&logoColor=white)](https://www.docker.com)
[![Licencia](https://img.shields.io/badge/licencia-privada-lightgrey)](#-licencia)

Sabum Nim **Gerardo Palauro** (IV Dan ITF) · [WhatsApp](https://wa.me/5491131074612)

</div>

---

## ✨ Qué incluye

- **Sitio estático** generado con Astro: rápido, sin base de datos y fácil de hostear.
- **Componentes** por sección (`Header`, `Hero`, `Clases`, `Profe`, `Fotos`, `Donde`…).
- **Islas de React** solo donde hacen falta: animación y entrada del hero.
- **Animación con Anime.js**: luchador estilizado con cinta al viento y puño en guardia.
- **Menú hamburguesa** accesible en móvil (abre/cierra, `Esc`, `aria-expanded`).
- **Imágenes reales** de la escuela en `site/public/img/`.
- **Docker listo**: build multi-stage (Node → Nginx), se levanta con un comando.
- Respeta `prefers-reduced-motion` (si el usuario pide menos movimiento, no anima).

## 🧱 Stack

| Pieza | Uso |
| --- | --- |
| [Astro 7](https://astro.build) | Generador de sitio estático |
| [React 19](https://react.dev) | Islas interactivas |
| [Tailwind CSS 4](https://tailwindcss.com) | Utilidades + estilos propios |
| [Anime.js 4](https://animejs.com) | Animaciones |
| Docker + Nginx | Build y servido en producción |

## 📁 Estructura

```
.
├── README.md
└── site/                     # proyecto Astro + Docker
    ├── compose.yaml          # servicio web (3060:80)
    ├── Dockerfile            # build Node 22 → nginx:alpine
    ├── nginx.conf            # SPA fallback + cache de assets
    ├── astro.config.mjs
    ├── public/
    │   ├── favicon.svg/.ico
    │   └── img/              # fotos y afiche
    └── src/
        ├── layouts/BaseLayout.astro
        ├── pages/index.astro
        ├── styles/global.css
        └── components/
            ├── Header.astro          # nav + menú hamburguesa
            ├── Hero.astro            # portada
            ├── HeroAnimated.tsx      # entrada escalonada (Anime.js)
            ├── KickAnimation.tsx     # luchador + cinta (Anime.js)
            ├── Strip.astro
            ├── ClaseAbierta.astro
            ├── Clases.astro
            ├── Profe.astro
            ├── Fotos.astro
            └── Donde.astro
```

---

## 🚀 Clonar y deployar en tu server

Requisitos en el server: **Docker** y **Docker Compose v2**.

```bash
# 1) clonar
git clone https://github.com/melorenzo/gerardtkd.git
cd gerardtkd/site

# 2) construir y levantar (en segundo plano)
docker compose up -d --build
```

Queda publicado en **http://TU-IP:3060**.

```bash
docker compose ps          # estado del contenedor
docker compose logs -f     # logs en vivo
docker compose down        # bajar
```

### Usar el puerto 80

En `site/compose.yaml` cambiá el mapeo:

```yaml
ports:
  - "80:80"     # antes: "3060:80"
```

y volvé a levantar:

```bash
docker compose up -d --build
```

### Actualizar el sitio

```bash
cd gerardtkd
git pull
cd site
docker compose up -d --build
```

### Dominio + HTTPS (opcional)

Con el contenedor en `127.0.0.1:3060`, poné Nginx o Caddy adelante como reverse proxy.
Ejemplo de bloque Nginx:

```nginx
server {
    listen 80;
    server_name escuela.ejemplo.com;

    location / {
        proxy_pass http://127.0.0.1:3060;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

Después, el certificado:

```bash
sudo certbot --nginx -d escuela.ejemplo.com
```

---

## 💻 Desarrollo local

```bash
cd site
npm install
npm run dev        # http://localhost:4321

npm run build      # genera site/dist/
npm run preview    # sirve el build
```

Para probar el build de producción igual que en el server:

```bash
docker compose up --build      # http://localhost:3060
```

## 🛠️ Personalización rápida

| Qué | Dónde |
| --- | --- |
| Teléfono / WhatsApp | `site/src/components/Header.astro`, `HeroAnimated.tsx`, `Clases.astro`, `Profe.astro`, `ClaseAbierta.astro` |
| Horarios y sedes | `site/src/components/Clases.astro` y `Donde.astro` |
| Fotos | `site/public/img/` + `Fotos.astro` |
| Colores y tipografías | `site/src/styles/global.css` (variables `--ac`, `--bg`, `--panel`…) |
| Dominio / SEO | `site/src/layouts/BaseLayout.astro` (`canonical`, `og:image`) |
| Animación | `site/src/components/KickAnimation.tsx` |

## 📌 Pendientes conocidos

- [ ] Actualizar `canonical` y `og:url` al dominio final (hoy apuntan al hosting viejo).
- [ ] Agregar `site/public/img/share.jpg` (1200×630) para la miniatura al compartir.
- [ ] Revisar la fecha de la clase abierta (quedó la del 28/10).

## 📄 Licencia

Proyecto privado de la Escuela de Taekwon-Do ITF ATRA Sáenz Peña.
Las fotos pertenecen a la escuela; no reutilizar sin permiso.

<div align="center">

Hecho con 🥋 para la comunidad de Villa Lynch y Loma Hermosa.

</div>
