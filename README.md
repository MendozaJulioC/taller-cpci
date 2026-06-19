# Taller CPCI

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Comité Permanente sobre el Catastro en Iberoamérica

Aplicación web desarrollada para apoyar las actividades del **Taller CPCI (Comité Permanente sobre el Catastro en Iberoamérica)**.

El CPCI es un foro que agrupa a las instituciones públicas con funciones catastrales en Iberoamérica y fue constituido durante el IX Seminario sobre Catastro Inmobiliario celebrado entre el 8 y el 12 de mayo de 2006 en Cartagena de Indias, Colombia.

---

# Objetivo del Proyecto

Desarrollar una plataforma web moderna para la gestión y difusión de información relacionada con el Taller CPCI, permitiendo:

* Gestión de participantes.
* Gestión documental.
* Administración de talleres y eventos.
* Consulta de información institucional.
* Integración futura con herramientas geográficas y catastrales.
* Administración de usuarios y roles.

---

# Tecnologías Utilizadas

## Frontend

* React
* Next.js
* JavaScript
* TailwindCSS
* Axios
* Zustand
* Ant Design
* React Icons

## Backend

* Node.js
* Express
* PostgreSQL
* pg
* JWT
* bcryptjs
* dotenv
* cors
* helmet
* morgan
* nodemailer

## Herramientas Adicionales

* Git
* GitHub
* Nodemon
* XLSX
* PapaParse

---

# Estructura del Proyecto

```text
# Estructura del Proyecto

```text
tallercpci/
│
├── public/
│   ├── images/
│   ├── icons/
│   └── logo/
│
├── src/
│   │
│   ├── app/
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.js
│   │   └── page.js
│   │
│   ├── assets/
│   │
│   ├── components/
│   │   ├── home/
│   │   └── layout/
│   │
│   ├── contexts/
│   │
│   ├── hooks/
│   │
│   ├── services/
│   │
│   └── utils/
│
├── .gitignore
├── AGENTS.md
├── CLAUDE.md
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── package.json
├── package-lock.json
└── README.md
```

## Descripción de Directorios

### public/

Contiene los recursos estáticos de la aplicación:

* Imágenes
* Iconos
* Logos institucionales
* Archivos descargables

### src/app/

Contiene la configuración principal de Next.js utilizando App Router:

* `layout.js`: Layout principal de la aplicación.
* `page.js`: Página de inicio.
* `globals.css`: Estilos globales.
* `favicon.ico`: Ícono de la aplicación.

### src/assets/

Recursos utilizados por los componentes:

* Imágenes
* SVG
* Recursos gráficos

### src/components/

Componentes reutilizables de la aplicación.

#### home/

Componentes específicos de la página principal:

* Hero
* About
* Objectives
* History
* Countries

#### layout/

Componentes estructurales:

* Header
* Footer
* Navbar

### src/contexts/

Contextos globales de React para compartir estados entre componentes.

### src/hooks/

Hooks personalizados de React.

### src/services/

Servicios para comunicación con APIs externas o internas.

### src/utils/

Funciones auxiliares reutilizables.

## Arquitectura

La aplicación está desarrollada utilizando:

* React
* Next.js (App Router)
* JavaScript
* Tailwind CSS
* Axios
* Zustand
* React Icons
* Ant Design

Actualmente el proyecto funciona únicamente con Next.js y está preparado para desplegarse directamente en Vercel.
---

# Instalación

## Clonar repositorio

```bash
git clone https://github.com/MendozaJulioC/taller-cpci.git
```

```bash
cd taller-cpci
```

---

## Instalar Frontend

```bash
cd client
npm install
```

---

## Instalar Backend

```bash
cd ../server
npm install
```

---

# Ejecución del Proyecto

## Frontend

```bash
cd client
npm run dev
```

Aplicación disponible en:

```text
http://localhost:3001
```

---

## Backend

```bash
cd server
npm run dev
```

API disponible en:

```text
http://localhost:5000
```

---

# Variables de Entorno

## Frontend

Crear archivo:

```text
client/.env.local
```

Ejemplo:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_NAME=Taller CPCI
```

---

## Backend

Crear archivo:

```text
server/.env
```

Ejemplo:

```env
PORT=5000

DB_HOST=
DB_PORT=
DB_NAME=
DB_USER=
DB_PASSWORD=

JWT_SECRET=
```

---

# Flujo de Trabajo Git

## Ramas principales

```text
main
develop
```

## Ramas de desarrollo

Cada colaborador trabajará en una rama propia:

```text
feature/julio
feature/juan
feature/nombre-colaborador
```

---

# Flujo de trabajo

```text
feature/*
        ↓
     develop
        ↓
       main
```

1. Crear rama desde develop.
2. Realizar cambios.
3. Commit.
4. Push a la rama feature.
5. Crear Pull Request hacia develop.
6. Revisión y aprobación.
7. Merge a develop.
8. Posteriormente merge de develop a main.

---

# Convenciones

## Commits

Utilizar commits descriptivos:

```bash
feat: crear página principal
fix: corregir validación de login
docs: actualizar README
refactor: reorganizar componentes
```

---

# Estado Actual

## Versión 0.1

Implementado:

* Estructura base del proyecto.
* Frontend Next.js.
* Backend Express.
* Landing page institucional inicial.
* Configuración inicial de rutas.
* Configuración Git colaborativa.

Pendiente:

* Autenticación.
* PostgreSQL.
* Gestión de usuarios.
* Gestión documental.
* Gestión de talleres.
* Módulo administrativo.

---

# Equipo de Desarrollo

Proyecto desarrollado para el Taller CPCI.

Comité Permanente sobre el Catastro en Iberoamérica.

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
