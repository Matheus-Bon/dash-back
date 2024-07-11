const mongoose = require("mongoose");
const { Schema } = mongoose;
const { isAlpha, isEmail, isStrongPassword } = require('validator');
const bcrypt = require('bcrypt');

const credentialsSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email é um campo obrigatório'],
        unique: true,
        validate: [isEmail, 'Email deve ser válido']
    },
    password: {
        type: String,
        required: [true, 'Senha é um campo obrigatório'],
        validate: [isStrongPassword, 'Senha não cumpre os requisitos'],
        minlength: [8, "Senha deve ter no mínimo 8 caracteres"],
    }
}, { _id: false });

const schema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Nome é um campo obrigatório'],
            validate: [isAlpha, "Nome precisa ser válido"]
        },
        phone: {
            type: String,
            maxlength: [13, "Contato deve ter 13 caracteres"],
            minlength: [13, "Contato deve ter 13 caracteres"],
            unique: true
        },
        role: {
            type: String,
            enum: {
                values: ['admin', 'clerk', 'user', 'delivery_man'],
                message: "Esse cargo não existe"
            }
        },
        credentials: credentialsSchema,
    },
    {
        timestamps: true,
    }
);

schema.pre('save', async function (next) {
    if (!this.isModified('credentials.password')) return next();
    const pwd = this.credentials.password;
    this.credentials.password = await bcrypt.hash(pwd, 12);
    next();
})

const User = mongoose.model("users", schema);

const fetchUserByEmail = async (email) => {
    return await User.findOne({ "credentials.email": email });
}

const storeUser = async (newUser) => {
    return await User.create(newUser);
}

const fetchUsers = async (page = 1, limit = 10, search, role) => {
    page = page === 0 ? 1 : page;

    const filter = { role };
    const skip = (page - 1) * limit;

    if (search) {
        filter.name = {
            $regex: search, $options: 'i'
        }
    }

    const users = await User
        .find(filter)
        .select('name phone')
        .skip(skip)
        .limit(limit)
    const total = await User.countDocuments(filter);

    return {
        users,
        total,
        page,
        totalPages: Math.ceil(total / limit),
    };
}

const deleteUser = async(id) => {
    return await User.findByIdAndDelete(id);
}

module.exports = {
    User,
    fetchUserByEmail,
    storeUser,
    fetchUsers,
    deleteUser
}