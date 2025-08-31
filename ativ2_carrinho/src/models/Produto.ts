import mongoose, { Document, Schema } from "mongoose";

export interface IProduto extends Document {
	nomeProduto: string;
	valorProduto: string;
}

const ProdutoSchema: Schema = new Schema({
	nomeProduto: { type: String, required: true },
	valorProduto: { type: String, required: true },
});

export default mongoose.model<IProduto>("shoppingitems", ProdutoSchema);
