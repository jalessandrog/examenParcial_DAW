const express = require('express');
const ejs = require('ejs');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const PORT = 3030;
const csrf = require('csurf');
const csrfProtection = csrf();

//---------------Rutas-----------------
const zombieRouter = require('./routes/zombieRoute');


// ************ Template Engine ************
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
    secret: 'kJSDLKJshdflMOEKJHDKJAHSKJHksWCD03DIDAPI3WDPpoijp98jpjjkiojp0LKSD0knlnl', //mi string secreto que debe ser un string aleatorio muy largo', 
    resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
    saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
}));

app.use(csrfProtection); 
app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
});

//---------------Rutas-----------------
app.use('/', zombieRouter);

app.use((req, res, next) => {
    res.status(404).send('Recurso no encontrado'); 
});

//Activando el servidor desde express
app.listen(PORT, () => console.log('Servidor corriendo en el puerto ' + PORT))
