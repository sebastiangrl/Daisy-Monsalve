/** Prefijo correcto para archivos en `public/` (local y GitHub Pages). */
export function asset(path: string): string {
  const raw = import.meta.env.BASE_URL;
  const file = path.replace(/^\//, '');
  if (!raw || raw === '/') return `/${file}`;
  const prefix = raw.endsWith('/') ? raw : `${raw}/`;
  return `${prefix}${file}`;
}
