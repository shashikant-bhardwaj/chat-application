// message controller
import { asyncHandler } from "../utils/asyncHandler.js"
import { Conversation } from "../models/conversation.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Message } from "../models/message.model.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"


const sendMessage = asyncHandler(async (req, res) => {
    const senderId = req.user?._id
    const receiverId = req.params._id
    const {message} = req.body
  

    //validate message 

    if (!message?.trim()) {
        throw new ApiError(400, "message is required")
    }

    // prevent sending message to yourself

    if (senderId.equals(receiverId)) {
        throw new ApiError(400, "you can't send a message to yourself")
    }

    //check receiver exist

    const receiver = await User.findById(receiverId)

    if (!receiver) {
        throw new ApiError(404, "receiver doesn't exist")
    }

    //find conversation if doesn't exist create it

//    const conversationKey = [senderId.toString(), receiverId.toString()].sort().join("_")

//     const conversation = await Conversation.findOneAndUpdate(
//         {
//             conversationKey
//         },
//         {
//             $setOnInsert: {
//                   conversationKey,
//                 participants: [senderId, receiverId]
//             }
//         },
//         {
//             upsert: true,
//             new: true
//         }
//     )

    let conversation = await Conversation.findOne({
        participants: {
            $all: [senderId, receiverId]
        }
})
    
     if(!conversation){
        conversation = await Conversation.create({
            participants: [senderId, receiverId]
        })
     }

    // create message


    const newMessage = await  Message.create({
        senderId,
        receiverId,
        message: message?.trim()
    })

    // add message to conversation

    await Conversation.findByIdAndUpdate(
        conversation._id,
        {
            $push: {
                messages: newMessage._id
            }
        }
    )

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            newMessage,
            "message sent successfully"
        )
    )
})


// get message

const getMessage = asyncHandler(async(req, res) => {
    const receiverId = req.params?._id
    const senderId = req.user?._id
    
    const conversation = await Conversation.findOne({
        participants: {$all: [senderId, receiverId]}
    }).populate("messages")

    if(!conversation){
        throw new ApiError(404, "conversation of participants doesn't exist")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            conversation,
            "messages fetched successfully"
        )
    )

})

// markMessageAsSeen

const markMessageAsSeen = asyncHandler(async(req, res) => {
    const senderId = req.params._id
    const receiverId = req.user._id
    console.log(senderId)
    console.log(receiverId)

    const result = await Message.updateMany(
        {
            senderId,
            receiverId,
            isSeen: false
        },
        {
            $set: {
                isSeen: true
            }
        }
    )

    return res
    .status(200)
    .json(
       new ApiResponse(
        200,
        {modifiedCount: result.modifiedCount},
        "message marked as seen"
       )
    )
})

















export {
    sendMessage,
    getMessage,
    markMessageAsSeen

}