import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema(
  {
    userId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    name:      { type: String, required: true, trim: true },
    amount:    { type: Number, required: true, min: 0.01 },
    category:  { type: String, required: true },
    date:      { type: String },
    timestamp: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.model('Expense', expenseSchema);
