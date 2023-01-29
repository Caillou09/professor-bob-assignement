require('dotenv').config();
const { sequelize } = require('./models');

const server = require('./server');
const port = process.env.PORT;

const connectDb = async () => {
    console.log('db connection')
    try {
        await sequelize.authenticate();
        console.log('connecté');
    } catch (e) {
        console.log(e)
    }
};

(async () => {
    await connectDb();

    server.listen(port, () => {
        console.log(`App is listening at http://localhost:${port}`)
    })
})();
