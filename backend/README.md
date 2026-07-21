# Helpdesk Backend

Backend para Sistema de Gestión de Incidentes con Node.js, Express y PostgreSQL.

## Tecnologías
- Node.js + Express
- PostgreSQL
- dotenv, cors, pg

## Instalación
1. Clonar repo
```bash
git clone https://github.com/malvarado9568-glitch/helpdesk-backend.git
cd helpdesk-backend
## 3. Configurar Variables de Entorno
Crear archivo .env en la raíz:
## 4. Crear Base de Datos
Ejecutar en PostgreSQL:
```sql
CREATE TABLE tickets (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  descripcion TEXT NOT NULL,
  categoria VARCHAR(50) CHECK (categoria IN ('Red', 'Hardware', 'Software')),
  prioridad VARCHAR(10) CHECK (prioridad IN ('Alta', 'Media', 'Baja')),
  estado VARCHAR(20) DEFAULT 'Abierto',
  fecha_creacion TIMESTAMP DEFAULT NOW()
);