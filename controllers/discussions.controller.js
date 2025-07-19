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
            data: newDiscussion
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `An error occured: ${error}`
        })
    }
}

export async function getSingleDiscussion(req, res) {
    const {id} = req.params;

    try {
        const discussion = await Discussion.findById(id);
        if(!discussion || id.length < 24) {
            return res.status(404).json({
                success: false,
                message: "Discussion not found!"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Discussion fetched successfully",
            item: discussion
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `An error occured. ${error.message}`,
        })
    }
}