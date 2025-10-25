import mongoose, { Schema, Document } from "mongoose";

export interface IDisco extends Document {
	titulo: string;
	artista: string;
	ano: number;
	genero: string;
	formato: string;
	preco: number;	
}

const DiscoSchema: Schema = new Schema({
	titulo: { type: String, required: true },
	artista: { type: String, required: true },
	ano: { type: Number, required: true },
	genero: { type: String, require: true},
	formato: { type: String, require: true },
	preco: { type: Number, require: true}
});

export default mongoose.model<IDisco>("Disco", DiscoSchema);
