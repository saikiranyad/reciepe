const findreplybyid = (replies,replyId)=>{
    for(let reply of replies){
        if(reply._id.toString()===replyId) return reply;
        const nested = findreplybyid(reply.replies || [],replyId);
        if(nested) return nested
    }
    return null;


}

module.exports = findreplybyid