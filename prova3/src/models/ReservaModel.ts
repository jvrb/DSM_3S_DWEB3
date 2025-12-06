import mongoose, { Schema } from "mongoose";
import MesaModel from "./MesaModel";

export interface IReserva extends Document {
	nomeCliente: string;
	contatoCliente: string;
	numeroMesa: string;
	quatidadePessoas: number;
	dataReserva: Date;
	obsReserva: string;
	status: string;
}

const ReservaModel: Schema = new Schema({
	nomeCliente: {
		type: String,
		required: [true, "Informe o nome do cliente"],
	},
	contatoCliente: {
		type: String,
		required: [true, "Informe o número de telefone do cliente"],
	},
	numeroMesa: {
		type: Schema.Types.ObjectId,
        ref: "Mesa",
        required: true,
        validate: {
            validator: async function (id: string) {
                const mesaExists = await MesaModel.findById(id)
                return !!mesaExists
            },
            message: "Mesa não existe"
        }
	},
    quatidadePessoas: {
        type: Number,
        required: [true, "Informe o número de pessoas"]
    },
    dataReserva: {
        type: Date,
        required: [true, "Informe a data da reserva"]
    },
    obsReserva: {
        type: String,
    },
    status: {
        type: String,
        required: [true, "Informe o status da reserva"],
        validate: {
            validator: async (status: string) => {
                const validacoes = ["reservado", "ocupado", "finalizado", "cancelado"]
                return validacoes.includes(status)
            },
            message: "Informe um status valido"
        }
    }
});

export default mongoose.model<IReserva>("Reserva", ReservaModel);
