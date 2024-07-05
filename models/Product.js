const mongoose = require("mongoose");
const { Schema } = mongoose;
const { isAlphanumeric, isURL, isNumeric, isBoolean } = require('validator');


const schema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Nome do produto é um campo obrigatório'],
            validate: [isAlphanumeric, "Nome do produto precisa ser válido"]
        },
        description: {
            type: String,
            maxLength: [110, "A descrição deve conter no máximo 100 caracteres"]
        },
        image: {
            type: String,
            validate: [isURL, "A imagem precisa ser uma URL"]
        },
        price: {
            type: Number,
            validate: [isNumeric, "O preço deve ser um número"]
        },
        active: {
            type: Boolean,
            required: [true, 'O produto está ativo ou inativo é um campo obrigatório'],
            validate: [isBoolean, "O campo ativo ou inativo deve ser um booleano"]
        },
        category_id: {
            type: mongoose.Types.ObjectId,
            required: [true, 'Categoria é um campo obrigatório']
        },
        max_items: {
            type: Number,
            required: [true, 'Quantidade máxima de items é um campo obrigatório'],
            validate: [isNumeric, "O preço deve ser um número"]
        },
        flavors: {
            type: [mongoose.Types.ObjectId]
        }
    },
    { timestamps: true }
);


const Product = mongoose.model("products", schema);



module.exports = {

}