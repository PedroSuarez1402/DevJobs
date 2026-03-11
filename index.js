import express from "express";
import router from "./src/routes/index.js";
import { engine } from "express-handlebars";
import db from "./config/db.js";

const app = express();
// Habilidar handlebars como motor de plantillas definiendo un layout
app.engine('handlebars', engine({ defaultLayout: 'layout' }));
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