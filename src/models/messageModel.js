import { Schema, model} from "mongoose";

const messsageSchema = new Schema({
    chatId: { type: mongoose.Schema.Types.ObjectId, required: true },
    senderId: { type: mongoose.Schema.Types.ObjectId, refPath: 'senderType', required: true },
    senderType: { type: String, enum: ['User', 'Professional'], required: true },
    receivedId: { type: mongoose.Schema.Types.ObjectId, refPath: 'recieverType', required: true },
    receiverType: { type: String, enum: ['User', 'Professional'], required: true },
    messageType: { type: String, enum: ['Text', 'Audio'], required: true },
    // Text content or audio URL
    content: { type: String }
   // timestamp: { type: Date, default: Date.now } 
});

 export const MessageModel = model('Message', messsageSchema); 
  