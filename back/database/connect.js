const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("proyectogrupal", "root", "root", {
    host: "localhost",
    dialect: "mysql",
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Se Conecto a la base de datos");
    } catch (error) {
        console.error("Error al conectar con la base de datos:", error);
    }
})();

module.exports = sequelize;