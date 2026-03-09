import express from "express";
import router from "./routes/index.js";
import { ExpressHandlebars } from "express-handlebars";

const app = express();
// Habilidar handlebars como motor de plantillas definiendo un layout
const hbs = ExpressHandlebars.create({
    defaultLayout: 'layout',
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');

const port = 3000;

app.use('/', router);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});