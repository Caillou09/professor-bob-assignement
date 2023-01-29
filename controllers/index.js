const { User } = require('../sequelize/models');

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        return res.status(201).json({
            user,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        return res.status(201).json({
            users,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
};

const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const deleted = await User.destroy({
            where: { id: userId }
        });
        if (deleted) {
            return res.status(204).send("Post deleted");
        }
        throw new Error("Post not found");
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    createUser, getAllUsers, deleteUser
}
