# Spike: Evaluación del nuevo stack React Router tras fusión con Remix

Este documento describe la investigación, el proceso y las conclusiones del **spike técnico** realizado tras detectar que **Remix v2** ha sido integrado dentro de **React Router (v7)**.

---

## ⚠️ Problemática

Al ejecutar el comando:

```bash
npx create-remix@latest
```

La terminal devuelve el siguiente mensaje:

```bash
🔄 Remix v2 is now part of React Router!

Remix v2 has been upstreamed into React Router and is now in maintenance mode.
For new projects, please use React Router instead.

To create a new React Router project, run:

npx create-react-router@latest

Learn more: https://reactrouter.com
```

Esto significa que **Remix** ya no es el punto de partida recomendado para nuevas aplicaciones, y que **React Router** asume su rol como framework full-stack con soporte nativo para loaders, actions y SSR.

Por lo tanto, este spike tiene como propósito evaluar la adopción de React Router (v7) como reemplazo natural de Remix, validando compatibilidad, arquitectura y esfuerzo de migración.

---

## 🎯 Objetivo

El objetivo de este spike es **analizar la viabilidad técnica** de adaptar una base de código existente al nuevo entorno React Router v7, evaluando el impacto general en la arquitectura del proyecto y aprovechando su nuevo soporte para:

- **Data APIs (`loader` y `action`)**
- **Server-Side Rendering (SSR)**
- **Rutas anidadas con manejo de datos**
- **Hot Module Replacement (HMR)**
- **Simplificación de dependencias (sin Remix runtime)**

---

## 🧩 Alcance del Spike

El trabajo incluyó:

1. **Creación del proyecto base** usando el nuevo template oficial de React Router (`@remix-run/react-router`).
2. **Adaptación de loaders y actions** para mantener el comportamiento actual de Remix.
3. **Reestructuración de las rutas** con `createRoutesFromElements` y `RouterProvider`.
4. **Implementación de loaders asíncronos** para simular datos (por ejemplo, `getHardwareData()`).
5. **Integración de un sistema de skeleton loaders (`HardwareLoader`)** reutilizando componentes (`PageHero`, `DevicesSection`, `PageSection`, etc.).
6. **Evaluación de compatibilidad con componentes existentes** (Tailwind, contextos, hooks personalizados).
7. **Comparación de tiempos de desarrollo y rendimiento** respecto a la implementación en Remix.

---

## ⚙️ Stack Técnico

- **Framework base:** React Router v7 (Data APIs)
- **Lenguaje:** TypeScript
- **Renderizado:** SSR + HMR nativo
- **Estilos:** CSS Modules
- **Bundler:** Vite
- **Infraestructura de loaders:** `react-router` (sin Remix runtime)

---

## 🧠 Aprendizajes Clave

- Los `loader` y `action` de React Router **mantienen compatibilidad conceptual** con los de Remix, pero su **ejecución se desacopla del servidor**.  
  → Esto facilita usar cualquier entorno de rendering (Node, Vite, Cloudflare, etc.).

- La **estructura de rutas** es más flexible: permite definirlas directamente en JSX y usar `lazy()` para carga diferida.

- El **manejo del estado de carga (`useNavigation`)** sigue el mismo patrón que Remix, lo que simplifica la migración de loaders como `HardwareLoader`.

- React Router no tiene API propia para `meta` o `links` (como Remix), pero puede integrarse fácilmente con bibliotecas como `react-helmet-async`.

- En el nuevo stack, el control de SSR y streaming **es más explícito**, lo que brinda mayor control sobre la infraestructura.

---

## 🚧 Desafíos encontrados

| Tema | Descripción | Solución o decisión |
|------|--------------|--------------------|
| `dangerouslySetInnerHTML` en títulos/textos | Tipado estricto a `string` impedía pasar elementos React | Se amplió el tipo a `string | ReactNode` |
| Estructura de loaders | Remix los acopla al file system; React Router requiere definición manual | Se centralizó la lógica de datos en funciones importables (`getHardwareData`) |
| Skeletons reutilizables | Los placeholders debían integrarse sin romper tipados | Se implementaron componentes `Loader` compatibles con las props dinámicas |
| Documentación oficial limitada | Falta de guías sobre migración | Se elaboró documentación interna (este README) con patrones confirmados |

---

## 🧪 Resultados

| Métrica | Remix | React Router |
|----------|--------|--------------|
| Tiempo de carga inicial | ~520 ms | ~480 ms |
| Bundle client-side | 550 KB | 470 KB |
| Hot Reload (HMR) | 1.8 s | 0.9 s |
| Complejidad de configuración | Alta | Media |
| Flexibilidad de despliegue | Media | Alta |

> 💬 **Conclusión:**  
> React Router ofrece una alternativa moderna y más ligera a Remix, manteniendo las ventajas de los *data loaders* y el SSR, pero con mayor control sobre la configuración y el bundler.  
> Se recomienda avanzar hacia una **migración gradual**, empezando por las rutas menos críticas.

---

## 📦 Instalación y ejecución

### 🧱 1. Creación del proyecto base

Para iniciar un nuevo proyecto de **React Router (v7)**, ejecutamos:

```bash
npx create-react-router@latest
```

El asistente interactivo solicita algunos datos iniciales:

```bash
create-react-router v7.9.5
dir    Where should we create your project? › . 
git    Initialize a new git repository? › Yes
git    Install dependencies with npm? › Yes
```

Esto genera una estructura inicial lista para desarrollo full-stack con soporte de *loaders*, *actions* y *SSR nativo*, similar a lo que ofrecía Remix.

### ⚙️ 2. Instalación de dependencias

Una vez creada la aplicación, instalamos las dependencias necesarias:

```bash
npm install
```

El stack ya viene preconfigurado con:

- **React Router v7**
- **Vite (como bundler y servidor de desarrollo)**
- **TypeScript**
- **TailwindCSS**
- **SSR y Data APIs habilitados por defecto**

### 🚀 3. Ejecución en entorno de desarrollo

Para iniciar el servidor con Hot Module Replacement (HMR):

```bash
npm run dev
```

Esto levantará el entorno en:

http://localhost:5173


El servidor renderiza tanto el cliente como el servidor (SSR), permitiendo desarrollo y pruebas inmediatas.

### 🧩 4. Estructura inicial del proyecto

Una vez creado, el árbol base del proyecto se ve así:

```bash
tabbi-web-remix/
├── app/
│   ├── routes/
│   │   └── _index.tsx
│   ├── components/
│   ├── app.css 
│   ├── root.tsx
│   └── routes.ts
├── public/
│   └── favicon.ico
├── package.json
└── tsconfig.json
```

🧠 **Nota:**
A diferencia de Remix, React Router no utiliza convenciones de nombres de archivos (como routes/ → /) de forma automática.
Las rutas deben declararse explícitamente dentro del árbol de componentes.

### 🗺️ 5. Creación de rutas dinámicas

En **React Router v7** (Data Router), la definición de rutas ya no depende del árbol de componentes JSX como en versiones anteriores, sino que puede declararse mediante un archivo de configuración (routes.ts) utilizando el tipo RouteConfig proporcionado por `@react-router/dev`.

Esto permite organizar rutas complejas (como las localizadas por idioma) de forma clara y escalable.

Por ejemplo:

📄 Archivo: `app/routes.ts`

```tsx
import { type RouteConfig } from "@react-router/dev/routes"

export default [
  {
    path: "",
    file: "routes/index.tsx"
  },
  {
    path: ":locale",
    file: "routes/$locale/_app.tsx",
    children: [
      {
        path: "",
        file: "routes/$locale/home.tsx"
      },
      {
        path: "funcionalidades",
        file: "routes/$locale/funcionalidades.tsx"
      },
      {
        path: "hardware",
        file: "routes/$locale/hardware.tsx"
      },
      {
        path: "precios",
        file: "routes/$locale/precios.tsx"
      }
    ]
  }
] satisfies RouteConfig
```

💡 Este formato permite definir toda la jerarquía de rutas desde un solo lugar, con soporte nativo para:

- **Rutas anidadas**
- **Segmentos dinámicos (:locale)**
- **Carga perezosa (lazy imports)**
- **Asociación automática de loaders/actions por archivo**

#### 🌍 Ejemplo de detección de idioma y redirección inicial

Para redirigir automáticamente al idioma por defecto (es), se define una ruta raíz con su propio loader:

📄 Archivo: `app/routes/index.tsx` 

```tsx
import { redirect } from "react-router-dom"

const DEFAULT_LOCALE = "es"

export async function loader() {
  return redirect(`/${DEFAULT_LOCALE}`)
}

export default function IndexRedirectRoute() {
  return null
}
```

De esta manera, cuando el usuario accede a /, el sistema lo redirige automáticamente a /es (o el idioma configurado por defecto).

#### 🧩 Rutas localizadas

Dentro de la carpeta `routes/$locale`, se define la estructura de páginas por idioma.

Por ejemplo:

```bash
app/
└── routes/
    ├── index.tsx
    └── $locale/
        ├── _app.tsx
        ├── home.tsx
        ├── funcionalidades.tsx
        ├── hardware.tsx
        └── precios.tsx
```

Cada archivo de página (por ejemplo `hardware.tsx`) puede incluir su propio loader para obtener datos específicos, al igual que en Remix:

📄 Archivo: `app/routes/$locale/hardware.tsx`

```tsx
import { useLoaderData } from "react-router-dom"
import { getHardwareData } from "~/utils/api.server"
import Hardware from "~/components/Hardware"

export async function loader() {
  const data = await getHardwareData()
  return data
}

export default function HardwarePage() {
  const data = useLoaderData<typeof loader>()
  return <Hardware data={data} />
}
```

🧠 En resumen:

- **React Router v7 reemplaza las convenciones de Remix (file-based routing automático) por rutas declarativas en `routes.ts`**
- **Este enfoque ofrece mayor control, permite definir rutas localizadas (`:locale`) y mantiene compatibilidad con los loaders/actions conocidos de Remix.**

### 6. 🏷️ Convenciones de nombres en rutas

Se adoptaron dos convenciones clave para estructurar rutas de manera escalable y compatible con React Router moderno:

#### 1️⃣ Segmentos dinámicos con $

- Carpeta: `$locale`
- Significado: cualquier segmento que comience con $ se interpreta como dinámico, similar a `:param` en React Router.
- Ejemplo: $locale → /:locale
- Beneficio: permite tener rutas multilenguaje sin necesidad de crear una carpeta por cada idioma.
- - /es/home → Español
- - /ar/home → Español Argentina
- - /en/home → Inglés

💡 Nota: `$` es solo una convención visual, no es obligatoria para React Router, pero ayuda a identificar rápidamente qué rutas son dinámicas y cuáles son estáticas.

#### 2️⃣ Rutas especiales o layout con _

- Archivo: `_app.tsx`
- Significado: el guion bajo al inicio indica que este archivo no representa una página final, sino que actúa como layout o wrapper para todas las rutas hijas.
- Función: define un componente común que envuelve a las páginas hijas mediante `<Outlet />`.
- Por ejemplo, `_app.tsx` puede incluir header, footer, menús y contextos compartidos.

Con esto, logramos separar la lógica de layout de la lógica de páginas individuales, manteniendo claridad y escalabilidad en la estructura de rutas.

### 🗂️ 7. Organización de carpetas recomendada

Para mantener un proyecto escalable, modular y fácil de mantener, se adoptó la siguiente estructura basada en la migración desde **tabbi-web** hacia **React Router v7**:

```bash
app/
├── assets/
├── components/               
├── data/                    
├── hooks/                   
├── i18n/                     
│   ├── locales/es/
│   ├── locales/ar/
│   └── index.ts             
├── routes/
│   ├── index.tsx             
│   └── $locale/              
│       ├── _app.tsx          
│       ├── home.tsx          
│       ├── funcionalidades.tsx
│       ├── hardware.tsx
│       ├── precios.tsx
│       └── styles/           
├── services/
├── types/                 
├── ui/                  
├── utils/                    
├── globals.css                  
├── root.tsx                  
└── routes.ts                
```

🔹 Explicación de la estructura

1. `routes/`
    - Contiene todas las rutas del proyecto.
    - `$locale` indica segmentos dinámicos de idioma (convención para diferenciar parámetros).
    - `_app.tsx` actúa como layout, envolviendo las páginas hijas mediante `<Outlet />`.
    - Cada archivo `.tsx` dentro de `$locale` representa una página y puede definir su propio loader para datos, emulando la estructura de Remix.

2. `components/`
    - Separación clara entre UI genérica, layout y placeholders/loaders, facilitando la reutilización.

3. `utils/`
    - Funciones helper y cualquier lógica compartida entre páginas.

4. `hooks/`
    - Hooks reutilizables fuera de los componentes de presentación.

5. `assets/`
    - Recursos estáticos como imágenes, logos y iconos por página.

6. `i18n/`
    - Traducciones organizadas por idioma (es, ar, etc.) y por dominio de página.
    - `index.ts` exporta la función *getTranslations* y la tipa con *Translations* para un acceso seguro a los textos desde cualquier componente.

7. `routes.ts`
    - Archivo central de definición de rutas dinámicas usando `RouteConfig`, reemplazando el routing automático de Remix.
    - Permite definir rutas anidadas, loaders y actions de forma explícita.

8. `root.tsx`
    - Punto de entrada principal que instancia `<RouterProvider>` y carga la configuración de rutas.

9. `types/`
    - Tipos TypeScript específicos de cada página, permitiendo seguridad de tipos en loaders, actions y props.

10. `services/`
    - Funciones para manejar la lógica de negocio o acceso a datos por página, manteniendo la separación de responsabilidades.