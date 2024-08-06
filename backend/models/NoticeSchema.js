// const mongoose = require('mongoose');
// const noticeSchema = new mongoose.Schema({
//     // title:{
//     //     type:String,
//     // },
//     description:{
//         type:String,
    
//     },
//     date:{
//         type:String,
//         // default:Date.now()
//     },
//     // batch:{
//     //     type:String,
//     //     enum:["Super60", "The Uniques"],
//     // },
//     // postedBy:{
//     //     type:mongoose.Schema.Types.ObjectId,
//     //     ref:"User"
//     // },
//     ref:{
//         type:String,
//     },
// })

// module.exports = mongoose.model("Notice",noticeSchema);

const mongoose = require('mongoose');
const noticeSchema = new mongoose.Schema({
    ref:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    date:{
        type:String,
        // default:Date.now()
    },
    batch:{
        type:String,
        required:true,
        enum:["Super60", "The Uniques","academic"],
    },
    // postedBy:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"User"
    // }
})

module.exports = mongoose.model("Notice",noticeSchema);