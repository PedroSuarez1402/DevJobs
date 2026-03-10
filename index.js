import express from "express";
import router from "./routes/index.js";
import { engine } from "express-handlebars";

const app = express();
// Habilidar handlebars como motor de plantillas definiendo un layout
app.engine('handlebars', engine({ defaultLayout: 'layout' }));
app.set('view engine', 'handlebars');
app.set('views', './views');

const port = 3000;

// Static files
app.use(express.static('public'));

app.use('/', router);


app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});