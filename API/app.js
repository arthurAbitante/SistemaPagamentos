const express = require('express');
const app = express();
const sequelize = require('./config/config');

const cors = require('cors');
app.use(cors());

const Cliente = require('./routes/clientes'); 
const CondicoesPagamento = require('./routes/condicoespagamento');

app.use(express.json());

app.use('/clientes', Cliente);
app.use('/condicoespagamentos', CondicoesPagamento);
app.use('/historicoprecos', require('./routes/historicopreco'));
app.use('/relatoriopagamentos', require('./routes/relatoriopagamento'));
app.use('/produtos', require('./routes/produtos'));


sequelize.sync().then(() => {
    console.log("Database synced");
}).catch(error => console.log("Error syncing database:", error));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});