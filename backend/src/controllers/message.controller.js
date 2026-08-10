// message controller
import { asyncHandler } from "../utils/asyncHandler.js"
import { Conversation } from "../models/conversation.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Message } from "../models/message.model.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { getIO, getSocketId } from "../socket/socket.js"


const sendMessage = asyncHandler(async (req, res) => {
    const senderId = req.user?._id
    const receiverId = req.params?._id
    const {message} = req.body
    console.log("SENDER:", req.user?._id);
console.log("RECEIVER:", req.params?._id);
  

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
        message: message?.trim(),
        deletedForEveryone: false,
        isSeen: false
    })

    //send real time message to the receiver through socket.io

   const receiverSocketId = getSocketId(receiverId)

console.log("RECEIVER ID:", receiverId)
console.log("RECEIVER SOCKET ID:", receiverSocketId)

if (receiverSocketId) {

    console.log("Sending socket message to:", receiverSocketId)

    getIO()
        .to(receiverSocketId)
        .emit("newMessage", newMessage)

} else {

    console.log("❌ Receiver is not online")
}

    // add message to conversation

 const updatedConversation = await Conversation.findByIdAndUpdate(
    conversation._id,
    {
        $push: {
            messages: newMessage._id
        }
    },
   
);



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
    }).populate({
        path: "messages",
        match: {
            deletedFor: {
                $ne: senderId
            },
            deletedForEveryone: false
        }
    })

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
    const senderId = req.params?._id
    const receiverId = req.user?._id
  

    const messages = await Message.find({
        senderId,
        receiverId,
        isSeen: false
    }).select("_id");


    const messageIds = messages.map( message => message._id);
    console.log("senderId:", senderId);
console.log("receiverId:", receiverId);
console.log("messages:", messages);
console.log("messageIds:", messageIds);
    const result = await Message.updateMany(
        {
           _id: {$in: messageIds}
        },
        {
            $set: {
                isSeen: true
            }
        }
    )
    console.log("result",result)

    const updatedMessages = await Message.find({
        _id: {$in: messageIds}
    })

    const senderSocketId = getSocketId(senderId)
    if(senderSocketId){
         getIO()
           .to(senderSocketId)
           .emit("updatedMessages", updatedMessages)
    }
   

    
   

    return res
    .status(200)
    .json(
       new ApiResponse(
        200,
      updatedMessages
       )
    )
})

// delete for me
const deleteForMe = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const messageId = req.params._id;

    // Find message
    const message = await Message.findById(messageId);

    if (!message) {
        throw new ApiError(404, "Message not found");
    }

    // Check if already deleted for this user
    const alreadyDeleted = message.deletedFor.some((id) =>
        id.equals(userId)
    );

    // If not deleted, add user id
    if (!alreadyDeleted) {
        message.deletedFor.push(userId);
        await message.save();
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            message,
            "Message deleted for you"
        )
    );
});

// deleted for everyone

const deleteForEveryone = asyncHandler(async(req, res) => {
    const messageId = req.params?._id
    const senderId = req.user?._id
    
    // message id check

    if(!messageId){
        throw new ApiError(404, "messageId is required")
    }
    
    //message find

    const message = await Message.findById(messageId)

    if(!message){
        throw new ApiError(404, "message not founnd")
    }

    // check message current user ne hi send kiya h

    if(message.senderId.toString() !== senderId.toString()){
        throw new ApiError(403, "you can only delete your own message for everyone ")
    }
    
    // mark message delete for everyone

    const deleteMsg = await Message.findByIdAndUpdate(
        messageId,
        {
            $set: {
                deletedForEveryone: true
            }
        },
        {
            new: true
        }
    )
    console.log("updated", deleteMsg)

    await deleteMsg.save();

   return res
   .status(200)
   .json(
    new ApiResponse(
        200,
        deleteMsg,
        "message deleted for everyone"
    )
   )

})















export {
    sendMessage,
    getMessage,
    markMessageAsSeen,
    deleteForMe,
    deleteForEveryone

}