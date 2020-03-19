import express from 'express';
import config from './utils/config';


const app = express();

app.use(express.static('public'));
app.get('*', (req, res) => res.sendFile(path.resolve('public', 'index.html')));

app.listen(config.port);
