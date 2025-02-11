
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

// Obtener todos los usuarios
const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un usuario por ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear un nuevo usuario
const createUser = async (req, res) => {
    try {
        const { name, last_name, email, gender, idneighborhood, latitude, longitude, phone, password } = req.body;
        const newUser = await User.create({ 
            name, 
            last_name, 
            email, 
            gender, 
            idneighborhood, 
            latitude, 
            longitude, 
            phone, 
            password 
        });
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error completo:', error); // Para debug
        res.status(500).json({ 
            message: 'Error al crear usuario',
            error: error.message 
        });
    }
};

// Actualizar un usuario
const updateUser = async (req, res) => {
    try {
        const { name, last_name, email, gender, idneighborhood, latitude, longitude, phone } = req.body;
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        await user.update({ name, last_name, email, gender, idneighborhood, latitude, longitude, phone });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un usuario
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        await user.destroy();
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Buscar usuario por email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        // Comparar la contraseña (en este ejemplo, se compara en texto plano)
        if (user.password !== password) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }
        // Generar un token JWT
        const token = jwt.sign(
            { id: user.iduser, email: user.email },
            process.env.JWT_SECRET || 'clave_secreta', // Usa una variable de entorno para la clave secreta en producción
            { expiresIn: '1h' }
        );
        // Eliminar la contraseña de la respuesta
        const { password: pwd, ...userWithoutPassword } = user.dataValues;
        res.status(200).json({ user: userWithoutPassword, token });
    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ error: error.message });
    }
};
module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser, loginUser };
