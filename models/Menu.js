const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        price: {
            type: Number,
            required: true,
            default: 10
        },
        category: {
            type: String,
            enum: ['Appetizer', 'Main Course', 'Dessert', 'Beverage'],
            required: true
        },
        description: {
            type: String,
            required: true
        }
    }
);

const Menu = mongoose.model('Menu', menuItemSchema);
module.exports = Menu;
