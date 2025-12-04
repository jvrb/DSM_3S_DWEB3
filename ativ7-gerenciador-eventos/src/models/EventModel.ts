import mongoose, {Schema} from 'mongoose';


export interface IEvent extends Document {
    title: string,
    description: string,
    eventDate: Date,
    locationEvent: string,
    amount: number
}

const Event: Schema = new Schema({
    title:{
        type: String,
        required: [true, "o titulo é obrigatório"]
    },
    description: {
        type: String,
        required: [true, "Descrição Obrigatória"]
    },
    eventDate: {
        type: Date,
        required: [true, "Defina a data do Evento"]
    },
    locationEvent: {
        type: String,
        required: [true, "Defina o local do Evento"]
    },
    amount: {
        type: String,
        required: [ true, "Valor obrigatório"]
    }
})

export default mongoose.model<IEvent>("Event", Event)