import mongoose, {DateExpression, Schema} from 'mongoose';


export interface IExpense extends Document {
    description: string,
    amount: number,
    date: Date
}

const Expense: Schema = new Schema({
    description: {
        type: String,
        required: [true, "Descrição Obrigatória"]
    },
    amount: {
        type: Number,
        required: [true, "Defina o valor da Despesa"]
    },
    date: {
        type: Date,
        required: [true, "Defina a data da Despesa"]
    }
})

export default mongoose.model<IExpense>("Expense", Expense)