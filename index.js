import express from "express";
import session from "express-session";
import flash from "connect-flash";
import router from "./src/routes/index.js";
import { engine } from "express-handlebars";
import db from "./config/db.js";

const app = express();
app.use(express.urlencoded({ extended: true }));

// Log de peticiones
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Configurar express-session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
// Configurar connect-flash
app.use(flash());

// Pasar los mensajes a todas las vistas
app.use((req, res, next) => {
    res.locals.mensajes = req.flash();
    res.locals.usuario = req.session.usuario || null;
    res.locals.isProduction = process.env.NODE_ENV === 'production';
    next();
});
// Habilidar handlebars como motor de plantillas definiendo un layout
app.engine('handlebars', engine({ 
    defaultLayout: 'layout',
    helpers: {
        eq: (a, b) => a === b,
        gt: (a, b) => a > b,
        sum: (a, b) => a + b,
        subtract: (a, b) => a - b,
        range: (from, to) => {
            const arr = [];
            for (let i = from; i <= to; i++) arr.push(i);
            return arr;
        },
        buildQuery: (filtros, pagina) => {
            const params = new URLSearchParams();
            if (filtros.keyword) params.set('keyword', filtros.keyword);
            if (filtros.ubicacion) params.set('ubicacion', filtros.ubicacion);
            if (filtros.tipo_contrato) params.set('tipo_contrato', filtros.tipo_contrato);
            params.set('pagina', pagina);
            return params.toString();
        },
        formatDate: (dateString) => {
            if (!dateString) return '';
            const d = new Date(dateString);
            const day = String(d.getDate()).padStart(2, '0');
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const year = d.getFullYear();
            return `${day}-${month}-${year}`;
        },
        json: (context) => JSON.stringify(context)
    }
}));
app.set('view engine', 'handlebars');
app.set('views', './views');

const port = process.env.PORT || 5001;

// Static files
app.use(express.static('public'));

app.use('/', router);
// Conexion a la base de datos
try {
    await db.authenticate();
    console.log('Conexion a la base de datos exitosa');
} catch (error) {
    console.error('Error al conectar a la base de datos:', error);
}

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});