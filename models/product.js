const mongoose =  require ('mongoose')



const product = new mongoose.Schema({ 
    name:{
        type: String,
        required:[true, "Please enter the name"],
        trim:true
    },
    description:{
        type: String,
        required: [true, "Please enter the Discription"]
    },
    price:{
        type: Number,
        required: [true, "Please enter the Discription"],
        maxLegth: 8
    },
    rating:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type: String,
        required: [true, "Please select the category"]
    },
    stock:{
        type:Number,
        required: [true,"Enter the Stock"],
        default:1
    },
    numberOfReviews:{
        type:Number,
       
    },
    reviews:[
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                 type:Number,
                 required: true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Product = mongoose.model('Product', product)
module.exports = Product