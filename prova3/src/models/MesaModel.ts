import mongoose, { Schema } from "mongoose";

export interface IMesa extends Document {
	numeroMesa: number;
	capacidade: number;
	localizacao: string;
}

const MesaModel: Schema = new Schema({
	numeroMesa: {
		type: Number,
		required: [true, "Informe o numero da mesa"],
	},
	capacidade: {
		type: Number,
		required: [true, "Informe a capacidade da mesa"],
	},
	localizacao: {
		type: String,
		required: [true, "Informe a localização da mesa"],
	},
});

export default mongoose.model<IMesa>("Mesa", MesaModel);
