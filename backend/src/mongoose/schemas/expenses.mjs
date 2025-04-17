import mongoose, { Schema } from "mongoose";

const ExpensesSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true // Add an index for performance
      },
      source: {
        type: String,
        required: true
      },
      amount: {
        type: Number,
        required: true
      },
      category: {
        type: String,
        enum: ['Housing', 'Food', 'Transportation', 'Utilities', 'Entertainment', 'Healthcare', 'Insurance', 'Clothing', 'Education', 'Other'],
        required: true,
      },
});

export const Expenses = mongoose.model("Expenses", ExpensesSchema);