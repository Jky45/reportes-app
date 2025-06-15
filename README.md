# 📄 Reportes App

Aplicación desarrollada con Angular para visualizar, filtrar, editar y eliminar reportes.

---

## ¿Cómo ejecutar el proyecto?

### 1. Clona el repositorio

```bash
git clone https://github.com/Jky45/reportes-app.git
cd reportes-app
```

### 2. Instala las dependencias

```bash
npm install
```

### 3. Asegúrate de tener instalado Node.js (v18+) y Angular CLI de forma global

```bash
npm install -g @angular/cli
```

### 4. Ejecuta el servidor de desarrollo

```bash
ng serve
```

Luego abre tu navegador en:

```
http://localhost:4200/
```

La aplicación se recargará automáticamente cada vez que guardes cambios.

---

## Estructura del Proyecto

El proyecto sigue una arquitectura modular basada en separación de responsabilidades y buenas prácticas de Angular:

```

src/
├── app/
│   ├── core/
│   │   ├── models/              # Interfaces y enums compartidos (Report, ReportStatus, etc.)
│   │   ├── services/            # Servicios reutilizables (API, filtros)
│   │   ├── state/               # Manejo de estado global con Signals (store)
│   │   └── use-cases/           # Casos de uso que encapsulan la lógica de negocio
│   ├── features/
│   │   └── reports/
│   │       ├── components/      # Componentes reutilizables (tabla, filtros, diálogos)
│   │       └── pages/           # Páginas principales (composición de componentes)
│   └── app.config.ts           # Configuración de rutas y otros settings
└── assets/                     # Archivos estáticos como JSON de datos

```

---

## Decisiones Técnicas


### 🟦 1. Arquitectura basada en casos de uso (Use Cases)
Se optó por una arquitectura limpia que separa claramente las **responsabilidades**:
- Los **componentes** solo manejan la vista y eventos del usuario.
- La **lógica de negocio** está encapsulada en clases dentro de `/core/use-cases/`.
- Los **servicios** (como `ReportsService`) se encargan de simular la interacción con una API.
- El **estado global** se maneja con Signals en `ReportsStoreService`.


---

### 2. Manejo del estado con Signals (`@angular/core`)
En lugar de usar `BehaviorSubject` y Observables, se utilizó `signal` para el manejo reactivo del estado:
- `reports`: Lista total de reportes
- `filteredReports`: Lista filtrada por nombre y estado


---

### 3. Angular Material como sistema de diseño
Se usaron componentes de Angular Material para una experiencia de usuario consistente:
- `mat-table` para la tabla de reportes
- `mat-select`, `mat-form-field`, `mat-dialog` para filtros y formularios


---

### 4. Formularios reactivos para edición
Se utilizó `ReactiveFormsModule` para el formulario del diálogo de edición:
- Validación con `Validators.required`
- Recolección del valor mediante `form.value`


---

### 5. Sin backend, pero con lógica realista
Aunque no se conecta a un servidor real, el `ReportsService` simula llamadas HTTP (`get`, `put`, `delete`), y la app actúa como si fuera una SPA con comunicación real.


---

## Justificación Técnica

Durante el desarrollo de esta aplicación se tomaron decisiones que, si bien en un escenario pequeño o sin backend podrían parecer innecesarias, fueron adoptadas con el propósito de **simular un entorno profesional y realista**.

Se buscó aplicar principios de arquitectura limpia, separación de responsabilidades y buenas prácticas en el manejo del estado, incluso si algunas de estas técnicas no eran estrictamente necesarias para un proyecto de esta escala.

El uso de casos de uso, servicios especializados, formularios reactivos y Signals permite:
- Representar una aplicación escalable en el tiempo.
- Facilitar pruebas, mantenibilidad y extensión de funcionalidades.
- Demostrar dominio de herramientas modernas del ecosistema Angular (Angular 17+, Angular Material, Signals, etc.).