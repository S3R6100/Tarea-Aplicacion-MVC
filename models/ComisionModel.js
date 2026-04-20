import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, '../database/db.sqlite');

/////////////////////////CONEXION A BASE DE DATOS////////////////////////////////
const getDbConnection = () => {
  return new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
    if (err) console.error('Error connecting to database:', err.message);
  });
};

/////////////////////////MODELO DE VENDEDORES////////////////////////////////
export const getVendedores = () => {
  return new Promise((resolve, reject) => {
    const db = getDbConnection();
    db.all(`SELECT * FROM Vendedor`, [], (err, rows) => {
      db.close();
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

/////////////////////////MODELO DE VENTAS////////////////////////////////
export const getVentasPorFecha = (fechaInicio, fechaFin) => {
  return new Promise((resolve, reject) => {
    const db = getDbConnection();
    db.all(
      `SELECT * FROM Ventas WHERE fecha_venta >= ? AND fecha_venta <= ?`,
      [fechaInicio, fechaFin],
      (err, rows) => {
        db.close();
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
};

/////////////////////////MODELO DE REGLAS////////////////////////////////
export const getReglas = () => {
  return new Promise((resolve, reject) => {
    const db = getDbConnection();
    db.all(`SELECT * FROM Reglas ORDER BY cantidad_requerida DESC`, [], (err, rows) => {
      db.close();
      if (err) reject(err);
      else resolve(rows);
    });
  });
};
