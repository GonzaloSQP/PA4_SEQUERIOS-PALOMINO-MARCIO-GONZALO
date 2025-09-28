const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS cursos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    creditos INTEGER NOT NULL,
    docente TEXT NOT NULL
  )`, (err) => {
    if (err) {
      console.error('Error creating table cursos:', err.message);
    } else {
      db.get("SELECT COUNT(*) as count FROM cursos", (err, row) => {
        if (err) {
            return console.error(err.message);
        }
        if (row.count === 0) {
          const cursos = [
            { id: 1, nombre: 'Programación Web 2', creditos: 4, docente: 'Juan Pérez' },
            { id: 2, nombre: 'Bases de Datos Avanzadas', creditos: 4, docente: 'Maria García' },
            { id: 3, nombre: 'Sistemas Operativos', creditos: 5, docente: 'Carlos Rodríguez' },
            { id: 4, nombre: 'Inteligencia Artificial', creditos: 5, docente: 'Ana Martinez' },
            { id: 5, nombre: 'Redes y Comunicaciones', creditos: 4, docente: 'Luis Hernandez' }
          ];
          const stmt = db.prepare("INSERT INTO cursos (id, nombre, creditos, docente) VALUES (?, ?, ?, ?)");
          for (const curso of cursos) {
            stmt.run(curso.id, curso.nombre, curso.creditos, curso.docente);
          }
          stmt.finalize();
          console.log('Initial data inserted into cursos');
        }
      });
    }
  });

  db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    studentId TEXT NOT NULL,
    password TEXT NOT NULL
  )`, (err) => {
    if (err) {
      console.error('Error creating table usuarios:', err.message);
    } else {
      db.get("SELECT COUNT(*) as count FROM usuarios", (err, row) => {
        if (err) {
            return console.error(err.message);
        }
        if (row.count === 0) {
          const bcrypt = require('bcrypt');
          const saltRounds = 10;
          const password = 'password';
          bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
              console.error('Error hashing password:', err.message);
            } else {
              db.run("INSERT INTO usuarios (name, email, studentId, password) VALUES (?, ?, ?, ?)", ['Usuario de Prueba', 'test@test.com', '12345', hash], (err) => {
                if (err) {
                  console.error('Error inserting default user:', err.message);
                } else {
                    console.log('Default user inserted');
                    insertCalificaciones();
                }
              });
            }
          });
        } else {
            insertCalificaciones();
        }
      });
    }
  });

  function insertCalificaciones() {
    db.run(`CREATE TABLE IF NOT EXISTS calificaciones (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER NOT NULL,
        curso_id INTEGER NOT NULL,
        nota TEXT NOT NULL,
        FOREIGN KEY (usuario_id) REFERENCES usuarios (id),
        FOREIGN KEY (curso_id) REFERENCES cursos (id)
      )`, (err) => {
        if (err) {
          console.error('Error creating table calificaciones:', err.message);
        } else {
          db.get("SELECT COUNT(*) as count FROM calificaciones", (err, row) => {
            if (err) {
                return console.error(err.message);
            }
            if (row.count === 0) {
              const calificaciones = [
                { usuario_id: 1, curso_id: 1, nota: 'A' },
                { usuario_id: 1, curso_id: 2, nota: 'B+' },
                { usuario_id: 1, curso_id: 3, nota: 'A-' }
              ];
              const stmt = db.prepare("INSERT INTO calificaciones (usuario_id, curso_id, nota) VALUES (?, ?, ?)");
              for (const calificacion of calificaciones) {
                stmt.run(calificacion.usuario_id, calificacion.curso_id, calificacion.nota);
              }
              stmt.finalize();
              console.log('Initial data inserted into calificaciones');
            }
          });
        }
      });
  }
});

module.exports = db;