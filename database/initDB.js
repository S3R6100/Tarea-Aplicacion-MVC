import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, 'db.sqlite');

// Remove existing db if exists to start fresh
if (fs.existsSync(dbPath)) {
  fs.unlinkSync(dbPath);
}

const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  // Create Tablas
  db.run(`
    CREATE TABLE Vendedor (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE Ventas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      vendedor_id INTEGER,
      monto REAL NOT NULL,
      fecha_venta DATE NOT NULL,
      FOREIGN KEY(vendedor_id) REFERENCES Vendedor(id)
    )
  `);

  db.run(`
    CREATE TABLE Reglas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cantidad_requerida REAL NOT NULL,
      porcentaje_comision REAL NOT NULL
    )
  `);

  // Insert Mock Data

  // Vendedores
  const vendedores = ['Juan Perez', 'Maria Garcia', 'Carlos Lopez'];
  vendedores.forEach(nombre => {
    db.run(`INSERT INTO Vendedor (nombre) VALUES (?)`, [nombre]);
  });

  // Reglas (por ejemplo: si vende >0 gana 1%, si >1000 gana 5%, si >5000 gana 10%)
  db.run(`INSERT INTO Reglas (cantidad_requerida, porcentaje_comision) VALUES (0, 0.01)`);
  db.run(`INSERT INTO Reglas (cantidad_requerida, porcentaje_comision) VALUES (1000, 0.05)`);
  db.run(`INSERT INTO Reglas (cantidad_requerida, porcentaje_comision) VALUES (5000, 0.10)`);

  // Ventas
  // Juan: 2 ventas en Enero, Carlos: 1 venta en Enero, Maria: 1 venta en Febrero
  const ventas = [
    { vendedor_id: 1, monto: 1500, fecha_venta: '2024-01-15' },
    { vendedor_id: 1, monto: 6000, fecha_venta: '2024-01-20' },
    { vendedor_id: 2, monto: 500, fecha_venta: '2024-02-10' },
    { vendedor_id: 3, monto: 2000, fecha_venta: '2024-01-05' }
  ];

  ventas.forEach(venta => {
    db.run(
      `INSERT INTO Ventas (vendedor_id, monto, fecha_venta) VALUES (?, ?, ?)`,
      [venta.vendedor_id, venta.monto, venta.fecha_venta]
    );
  });

  console.log('Base de datos inicializada correctamente con datos de prueba.');
});

db.close();
