/* const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 4000;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'navibus'
});

connection.connect(err => {
  if (err) {
    console.error('Error de concexión: ' + err.stack);
    return;
  }
  console.log('Conectado a la base de datos MYSQL como id ' + connection.threadId);
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
}); */


// server.js
import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de la conexión a la base de datos
const db = mysql.createPool({
  host: 'localhost', // Reemplaza con la dirección de tu servidor MySQL
  user: 'root', // Reemplaza con tu nombre de usuario MySQL
  password: '', // Reemplaza con tu contraseña MySQL
  database: 'navibus', // Reemplaza con el nombre de tu base de datos
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.use(express.json());

app.use('/api/users', userRoutes(db));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});