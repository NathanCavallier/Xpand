const http = require('http');
const app = require('./app');
const { createTables } = require('./dbTables');
const { db, closeDatabase } = require('./dbConfig');


// normalizePort function to normalize a port into a number, string, or false
const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

// Get port from environment and store in Express
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// errorHandler function to manage errors and log them to the console
const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const server = http.createServer(app);

server.on('error', errorHandler); // Event listener for the error event
server.on('listening', () => { // Event listener for the listening event
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

// Create the tables when the server starts
createTables();

// List all tables when accessing /tables route
app.get('/tables', (req, res) => {
    db.all(`SELECT name FROM sqlite_master WHERE type='table'`, [], (err, tables) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ tables });
        }
    });
});

// Get all users when accessing /users route
app.get('/users', (req, res) => {
    db.all(`SELECT * FROM users`, [], (err, users) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ users });
        }
    });
});

// Get all challenges
app.get('/challenges', (req, res) => {
    db.all(`SELECT * FROM challenges`, [], (err, challenges) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ challenges });
        }
    });
});


// Close database connection on server shutdown
process.on('SIGINT', () => {
    closeDatabase();
    process.exit();
});

server.listen(port); // Start the server