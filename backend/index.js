
const express = require('express');
const routerApi = require('./Routes');
const cors = require('cors');

const app = express();
const port = 3000;


app.use(express.json());
app.use(cors());

app.get('/', (req, res)=>{
    res.send("prueba");
});

routerApi(app);

app.listen(port, ()=>{
    console.log(`App listening on port http://localhost:${port}`);
})

