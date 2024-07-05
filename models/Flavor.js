const mongoose = require("mongoose");
const { Schema } = mongoose;
const { isAlpha, isBoolean } = require('validator');


const schema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Nome do sabor é um campo obrigatório'],
            validate: [isAlpha, "Nome do sabor precisa ser válido"]
        },
        active: {
            type: Boolean,
            required: [true, 'O sabor está ativo ou inativo é um campo obrigatório'],
            validate: [isBoolean, "O campo ativo ou inativo deve ser um booleano"]
        }
    },
    {
        timestamps: true,
    }
);

const Flavor = mongoose.model("flavors", schema);


module.exports = {

}