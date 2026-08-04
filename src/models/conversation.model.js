import mongoose, { Schema, model } from "mongoose"

const conversationSchema = new Schema(
    {
    //    conversationKey: {
    //         type: String,
    //         required: true,
    //         unique: true,
    //         index: true
    //    },
       participants: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
       ],
         messages: [
        {
            type: Schema.Types.ObjectId,
            ref: "Message"
        }
       ]
    }, 
    {timestamps: true})

export const Conversation = model("Conversation", conversationSchema)