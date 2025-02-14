const { DataTypes } = require("sequelize");
const sequelize = require("../database/connect.js"); 

const Post = sequelize.define("Post", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    neighborhood_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    post_type: {
        type: DataTypes.ENUM("complaint", "event", "news"),
        allowNull: false
    },
    image_urls: {
        type: DataTypes.JSON,
        allowNull: true
    },
    video_url: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: "post",
    timestamps: false
});

module.exports = Post;
