import {Schema,model}  from 'mongoose';



const PostSchema=new Schema({
title:{type: String, require:true},
url:{ type: String ,require:true,unique:true,lowercase:true},
content: {type: String, requiered:true},
Image: String,
createdAt: {type:Date, default :Date.now},
uodatedAt: Date

})


export default model('Post', PostSchema);