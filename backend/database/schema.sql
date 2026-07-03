-- FarmaStock - Script de creación de la base de datos y la tabla medicamentos
-- Cómo ejecutarlo (PowerShell):
--   Get-Content backend/database/schema.sql | mysql -u root -p

-- 1) Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS farmastock_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- 2) Usar la base de datos
USE farmastock_db;

-- 3) Crear la tabla de medicamentos
CREATE TABLE IF NOT EXISTS medicamentos (
  id                INT AUTO_INCREMENT PRIMARY KEY,
  nombre            VARCHAR(150)   NOT NULL,
  categoria         VARCHAR(100),
  precio            DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  cantidad          INT            NOT NULL DEFAULT 0,
  fecha_vencimiento DATE,
  proveedor         VARCHAR(150),
  estado            VARCHAR(20)    NOT NULL DEFAULT 'activo',
  created_at        TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
  updated_at        TIMESTAMP      DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- TODO (Base de datos): Revisar tipos de datos y agregar índices/validaciones

