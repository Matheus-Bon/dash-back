const mongoose = require("mongoose");
const { Schema } = mongoose;
const { isAlphanumeric, isBoolean } = require('validator');

const schema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Nome da categoria é um campo obrigatório'],
            validate: [isAlphanumeric, "Nome do produto precisa ser válido"]
        },
        active: {
            type: Boolean,
            required: [true, 'A categroia está ativa ou inativa é um campo obrigatório'],
            validate: [isBoolean, "O campo ativo ou inativo deve ser um booleano"]
        },
    },
    {
        timestamps: true,
    }
);

const Category = mongoose.model("categories", schema);
