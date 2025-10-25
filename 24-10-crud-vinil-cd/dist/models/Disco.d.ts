import mongoose, { Document } from "mongoose";
export interface IDisco extends Document {
    titulo: string;
    artista: string;
    ano: number;
    genero: string;
    formato: string;
    preco: number;
}
declare const _default: mongoose.Model<IDisco, {}, {}, {}, mongoose.Document<unknown, {}, IDisco, {}, {}> & IDisco & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Disco.d.ts.map