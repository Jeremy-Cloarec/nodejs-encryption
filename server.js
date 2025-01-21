import express from 'express';
import routes from './routes.js';
import config from './config.js';

const app = express();
const port = config.port;

app.use(express.json());
app.use(express.static('public'));

// Passe les données sous format JSON à l'application
app.use(express.urlencoded({ extended: false }));

app.use(routes);

app.listen(3000, ()=> {
    console.log(`Server is running on port ${port}. Visit http://localhost:${port}`);
})