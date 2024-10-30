const express = require('express');
const app = express();
const sequelize = require('./config/config');

const Cliente = require('./models/Cliente');
const CondicoesPagamento = require('./models/CondicoesPagamento');

app.use(express.json());

app.use('/clientes', require('./routes/clientes'));
app.use('/condicoespagamentos', require('./routes/condicoespagamento'));
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