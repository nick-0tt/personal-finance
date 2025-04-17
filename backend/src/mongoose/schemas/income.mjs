import mongoose, { Schema } from "mongoose";

const IncomeSchema = new Schema({
      userId: {
        type: Schema.Types.ObjectId,
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
        enum: ['Salary', 'Investment', 'Other'],
        required: true,
      },
});

export const Income = mongoose.model("Income", IncomeSchema);