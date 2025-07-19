import Discussion from "../models/discussion.js"

export async function createDiscussion (req, res) {
    const payload = req.body
    
    const coachingOption = payload.coachingOption
    const topic = payload.topic
    const expertName = payload.expertName

    try {
        if (!coachingOption || !topic || !expertName){
           return res.status(401).json({
                success: false,
                message: "Coaching option, topic, and expert name are all required!"
            })
        }
        const newDiscussion = new Discussion(payload);
        await newDiscussion.save();

        return res.status(201).json({
            success: true,
            message: "New discussion created!",
            data: payload
        })
        
    } catch (error) {
        
    }

}