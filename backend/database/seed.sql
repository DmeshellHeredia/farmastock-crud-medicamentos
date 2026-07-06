-- FarmaStock - Datos de prueba (seed) para la tabla medicamentos
-- Ejecutar DESPUÉS de schema.sql (PowerShell):
--   Get-Content backend/database/seed.sql | mysql -u root -p

USE farmastock_db;

INSERT INTO medicamentos
  (nombre, categoria, precio, cantidad, fecha_vencimiento, proveedor, estado)
VALUES
  ('Paracetamol 500mg', 'Analgésico',    2.50,  120, '2026-12-31', 'Genfar',     'activo'),
  ('Amoxicilina 500mg', 'Antibiótico',   5.75,   80, '2026-08-15', 'Bayer',      'activo'),
  ('Ibuprofeno 400mg',  'Antiinflamatorio', 3.20, 200, '2027-03-10', 'La Sante', 'activo');
