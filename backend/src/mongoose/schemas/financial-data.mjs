import mongoose, { Schema } from "mongoose";

const FinancialDataSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true // Add an index for performance
      },
      type: {
        type: String,
        enum: ['Income', 'Expenses'],
        required: true
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
        enum: ['Salary', 'Investment', 'Other', 'Housing', 'Food', 'Transportation', 'Utilities', 'Entertainment', 'Healthcare', 'Insurance', 'Clothing', 'Education', 'Other'],
        required: true,
      },
});

export const FinancialData = mongoose.model("FinancialData", FinancialDataSchema);