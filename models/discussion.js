import mongoose from "mongoose"

const discussionSchema = new mongoose.Schema({
    coachingOption: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    expertName: {
        type: String,
        required: true
    },
    conversation: {
        type: String,
    },
},
{timeStanps: true}
)

const Discussion = mongoose.model("Discussion", discussionSchema)
export default Discussion;