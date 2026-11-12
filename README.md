# Clínica Laboratorio Saresa — Sitio Web Institucional (Salta, Argentina)

Sitio web institucional de **Clínica Laboratorio Saresa** (Mariano Boedo 23, Salta Capital), optimizado con enfoque *mobile-first*, **SEO Local** y **GEO / LLMO** (optimización para motores de IA como ChatGPT, Google Gemini, Perplexity, Claude y Copilot).

## Archivos SEO y Posicionamiento en IA (GEO) incluidos

- **`index.html`**:
  - Esquemas `Schema.org` JSON-LD (`DiagnosticLab`, `MedicalClinic`, `LocalBusiness`, `WebSite` y `FAQPage`) con dirección, coordenadas GPS, horarios, WhatsApp, acreditaciones **SAMER** y **PEEC-FBA**, estudios y obras sociales.
  - Contenido HTML semántico pre-renderizado dentro de `#root` para que crawlers de IA que no ejecutan JavaScript (`OAI-SearchBot`, `GPTBot`, `ClaudeBot`, `PerplexityBot`) lean el 100% de la información clínica.
  - Etiqueta `<link rel="canonical" href="https://www.laboratoriosaresa.com.ar/" />` para proteger el dominio oficial durante la etapa previa en GitHub Pages.
- **`public/llms.txt` y `public/llms-full.txt`**: Documentación estructurada en Markdown siguiendo el estándar `llmstxt.org` para entrenamiento de contexto y respuestas directas de modelos de IA.
- **`public/robots.txt`**: Acceso explícito habilitado para `Googlebot`, `Google-Extended`, `OAI-SearchBot`, `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Bingbot` y `Applebot-Extended`.
- **`public/sitemap.xml`**: Mapa del sitio con URLs profundas por sección (`?seccion=reproduccion`, `?seccion=pacientes`, `?seccion=profesionales`).

---

## Paso a paso para pasar al dominio propio (`.com.ar`)

1. **Crear el archivo `public/CNAME`** con el dominio final (por ejemplo `www.laboratoriosaresa.com.ar`).
   - `vite.config.js` detecta automáticamente `public/CNAME` y cambia la ruta base de `/WebLaboratorioSaresa/` a `/` sin tocar código.
2. **Apuntar DNS (Cloudflare / DNS del hosting / NIC Argentina)**:
   - Registros `A` del dominio raíz (`@`) hacia GitHub Pages:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - Registro `CNAME` de `www` hacia `iavolante.github.io`.
3. **Activar HTTPS** en *GitHub → Settings → Pages → Enforce HTTPS*.
4. **Dar de alta en buscadores e IAs (15 minutos, gratuito)**:
   - **Google Search Console**: verificar el dominio y enviar `https://www.laboratoriosaresa.com.ar/sitemap.xml`.
   - **Bing Webmaster Tools** (*clave para aparecer primero en ChatGPT y Copilot*): importar el sitio en 1 clic desde Google Search Console.
   - **Google Business Profile (Google Maps)**: vincular `https://www.laboratoriosaresa.com.ar/`, cargar categorías (*Laboratorio de análisis clínicos* y *Clínica de fertilidad*) y sumar reseñas reales mencionando *sin turno*, *IPS Salta*, *espermograma* y *domicilio*.

---

## Comandos de desarrollo

```bash
npm install
npm run dev      # Entorno local
npm run lint     # Verificación con Oxlint
npm run build    # Build de producción
```
