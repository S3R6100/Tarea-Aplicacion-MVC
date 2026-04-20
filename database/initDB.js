import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, 'db.sqlite');

/////////////////////////REINICIAR BASE DE DATOS////////////////////////////////
if (fs.existsSync(dbPath)) {
  fs.unlinkSync(dbPath);
}

const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  /////////////////////////CREACION DE TABLAS RELACIONADAS////////////////////////////////
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

  /////////////////////////INSERCION DE DATOS DE PRUEBA////////////////////////////////
  const vendedores = ['Juan Perez', 'Maria Garcia', 'Carlos Lopez'];
  vendedores.forEach(nombre => {
    db.run(`INSERT INTO Vendedor (nombre) VALUES (?)`, [nombre]);
  });

  db.run(`INSERT INTO Reglas (cantidad_requerida, porcentaje_comision) VALUES (0, 0.01)`);
  db.run(`INSERT INTO Reglas (cantidad_requerida, porcentaje_comision) VALUES (1000, 0.05)`);
  db.run(`INSERT INTO Reglas (cantidad_requerida, porcentaje_comision) VALUES (5000, 0.10)`);

  const ventas = [
    { vendedor_id: 1, monto: 1500, fecha_venta: '2026-04-15' },
    { vendedor_id: 1, monto: 6000, fecha_venta: '2026-04-20' },
    { vendedor_id: 2, monto: 500, fecha_venta: '2026-04-10' },
    { vendedor_id: 3, monto: 2000, fecha_venta: '2026-04-05' }
  ];

  ventas.forEach(venta => {
    db.run(
      `INSERT INTO Ventas (vendedor_id, monto, fecha_venta) VALUES (?, ?, ?)`,
      [venta.vendedor_id, venta.monto, venta.fecha_venta]
    );
  });

  console.log('Base de datos inicializada correctamente.');
});

db.close();
