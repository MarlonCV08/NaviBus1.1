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
    io.on('connection', (socket) => {
        console.log(`Usuario conectado: ${socket.id}`);
        socket.on('register', (cedula) => {
            users[cedula] = socket.id;  // Guardar el socket.id con la cédula del usuario
            console.log(`Usuario ${cedula} registrado con socket ID: ${socket.id}`);
        });

        // Enviar notificación a un usuario específico (despachadorId)
        socket.on('sendNotification', (data) => {
            const { recipientCedula, message, conductorId } = data;

            // Verificar si la cédula existe en la base de datos
            db.query('SELECT cedula FROM usuarios WHERE cedula = ?', [recipientCedula], (err, results) => {
                if (err) {
                    console.error('Error al consultar la base de datos:', err);
                    return;
                }

                if (results.length > 0) {
                    const recipientSocketId = users[recipientCedula];

                    if (recipientSocketId) {
                        io.to(recipientSocketId).emit('receiveNotification', {
                            message,
                            conductorId
                        });  // Enviar la notificación
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
            console.log(data);
            const { userId, conductorId } = data; // userId es el ID del conductor
            console.log('ID del conductor en la confirmacion', userId);
            const senderSocketId = users[conductorId]; // Obtener el socket ID del conductor que envió la notificación
        
            if (senderSocketId) {
                io.to(senderSocketId).emit('confirmationReceived');  // Notificar al conductor
                console.log(`Confirmación enviada al conductor ${conductorId}`);
            } else {
                console.log(`Conductor ${conductorId} no está conectado`);
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
