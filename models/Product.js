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

const storeProduct = async(product) => {
    return await Product.create(product);
}

const editProduct = async(id, product) => {
    return await Product.findByIdAndUpdate(id, product);
}

const fetchProduct = async(id) => {
    return await Product.findById(id);
}

const fetchProducts = async(page = 1, limit = 10, search) => {
    page = parseInt(page);
    limit = parseInt(limit);

    const skip = (page - 1) * limit;
    const query = search ? { name: { $regex: search, $options: 'i' } } : {};
    const products = await Product.find(query).skip(skip).limit(limit);
    const total = await Product.countDocuments();

    return {
        products,
        total,
        page,
        totalPages: Math.ceil(total / limit),
    };
}

const deleteProduct = async(id) => {
    return await Product.findByIdAndDelete(id);
}

module.exports = {
    deleteProduct,
    fetchProduct,
    fetchProducts,
    storeProduct,
    editProduct
}