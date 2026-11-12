# Publicar la landing (preview para diseño / cliente)

## Opción recomendada: GitHub Pages

Repo: https://github.com/sebastiangrl/Daisy-Monsalve

**URL pública tras el primer deploy:**  
https://sebastiangrl.github.io/Daisy-Monsalve/

### Una sola vez en GitHub

1. Repo → **Settings** → **Pages**
2. **Build and deployment** → Source: **GitHub Actions** (no “Deploy from branch”)

### Subir el código

```bash
cd /mnt/datos/works/DaisyMonsalve
git add .
git commit -m "Landing Daisy Monsalve — preview"
git push -u origin main
```

El workflow `.github/workflows/deploy.yml` construye con pnpm y publica `dist/`.  
Cada `git push` a `main` actualiza el sitio (1–3 min).

### Probar la build local con la misma URL base

```bash
pnpm build
pnpm preview
```

Abre la URL que muestra `preview` (incluye el prefijo `/Daisy-Monsalve`).

---

## Opción rápida sin Git: Netlify Drop

1. `pnpm build`
2. Entra en https://app.netlify.com/drop
3. Arrastra la carpeta `dist/`

Netlify te da un enlace aleatorio al instante (ideal para una revisión puntual).

---

## Producción futura

Dominio propio (ej. en el hosting de la tatuadora) o **Vercel / Cloudflare Pages** conectando el mismo repo de GitHub.
