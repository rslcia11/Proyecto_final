const { DataTypes } = require('sequelize');
const sequelize = require('../database/connect.js');

const Marketplace = sequelize.define('Marketplace', {
    idbusiness: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    user_iduser: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user_idneighborhood: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    product_status: {
        type: DataTypes.ENUM('available','sold'),
        defaultValue: 'available',
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image: {
        type: DataTypes.TEXT, // Usa TEXT en lugar de JSON para evitar errores de almacenamiento
        allowNull: true,
        defaultValue: "[]", // Guarda como string JSON
        validate: {
            isValidImageArray(value) {
                try {
                    const images = typeof value === "string" ? JSON.parse(value) : value;
                    if (!Array.isArray(images)) {
                        throw new Error("El campo image debe ser un array");
                    }
                    if (!images.every(img => typeof img === "string" && /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/.test(img))) {
                        throw new Error("Cada imagen debe ser una URL válida que termine en .jpg, .jpeg, .png, .gif o .webp");
                    }
                } catch (error) {
                    throw new Error("Formato de imágenes inválido");
                }
            },
        },
        get() {
            const rawValue = this.getDataValue("image");
            return rawValue ? JSON.parse(rawValue) : [];
        },
        set(value) {
            if (Array.isArray(value)) {
                this.setDataValue("image", JSON.stringify(value));
            } else {
                throw new Error("El campo image debe ser un array de URLs");
            }
        },
    },
    price: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        defaultValue: 0.00
    },
    // Fecha de creación (se establece automáticamente)
    created_at: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    tableName: 'marketplace', 
    timestamps: false,
});

module.exports = Marketplace;