const { Server } = require('socket.io');
const db = require('./db');



const users = {};
const initializeSocket = (server) => {

    const io = new Server(server, {
        cors: {
            origin: 'http://localhost:5173',
            methods: ['GET', 'POST'],
            credentials: true
        }
    });
    // Manejar la conexión de clientes
    // Manejar la conexión de clientes
    io.on('connection', (socket) => {
        console.log(`Usuario conectado: ${socket.id}`);
        socket.on('register', (cedula) => {
            users[cedula] = socket.id;  // Guardar el socket.id con la cédula del usuario
            console.log(`Usuario ${cedula} registrado con socket ID: ${socket.id}`);
        });
        // No es necesario registrar al usuario ya que no quieres hacerlo
        // socket.on('register', (cedula) => { ... });

        // Enviar notificación a un usuario específico (despachadorId)
        socket.on('sendNotification', (data) => {
            const { recipientCedula, message } = data;

            // Verificar si la cédula existe en la base de datos
            db.query('SELECT cedula FROM usuarios WHERE cedula = ?', [recipientCedula], (err, results) => {
                if (err) {
                    console.error('Error al consultar la base de datos:', err);
                    return;
                }

                if (results.length > 0) {
                    const recipientSocketId = users[recipientCedula];

                    if (recipientSocketId) {
                        io.to(recipientSocketId).emit('receiveNotification', message);  // Enviar la notificación
                        console.log(`Notificación enviada a despachador ${recipientCedula}: ${message}`);
                    } else {
                        console.log(`Despachador ${recipientCedula} no está conectado`);
                    }
                } else {
                    console.log(`Cédula ${recipientCedula} no encontrada en la base de datos.`);
                }
            });
        });

        socket.on('notificationConfirmed', (data) => {
            const { userId } = data; // userId es el ID del conductor
            const senderSocketId = users[userId]; // Obtener el socket ID del conductor que envió la notificación
        
            if (senderSocketId) {
                io.to(senderSocketId).emit('confirmationReceived');  // Notificar al conductor
                console.log(`Confirmación enviada al conductor ${userId}`);
            } else {
                console.log(`Conductor ${userId} no está conectado`);
            }
        });

    
      // Manejar la desconexión
      socket.on('disconnect', () => {
        console.log(`Usuario desconectado: ${socket.id}`);
        // Eliminar usuario de la lista de conectados
        for (const cedula in users) {
          if (users[cedula] === socket.id) {
            delete users[cedula];
            console.log(`Usuario ${cedula} eliminado de la lista de conectados`);
            break;
          }
        }
      });
    });
}
module.exports = initializeSocket;
