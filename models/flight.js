// mongoose schema s.3.1 import mongoose
import mongoose from 'mongoose'

// mongoose schema s.3.4 export flight model 
export{
    Flight,
}


// mongoose schema s.3.2 make mongoose class
const Schema = mongoose.Schema;



const ticketsSchema = new Schema({
    seat: String,
    price: {
        type: Number,
    }
}, {
    timstamps: true
})

// mongoose schema s.3.3 make schema function 
const flightSchema = new Schema({
    // 
    airline:{
        type: String,
        enum:["American","SouthWest","United",],
        required:true,
    },
    airport:{
        type: String,
        enum:["AUS","DFW","LAX","DEN","SAN",],
        default:"DEN",
},
    flightNo:{
        type: Number,
        min:10,
        max:9999,
        required:true,
    },
   departs:{ 
      
    type: Date, 
    
        default: function(){
           // this was a struggle
       
           return new Date ().setFullYear(new Date().getFullYear()+1)
            },    
         },

         tickets: [ticketsSchema],
         
         destinations: [{type: Schema.Types.ObjectId, ref:'Destination'}]
        },{
            timestamps: true
        });
// mongoose complie schema in models

const Flight = mongoose.model("Flight", flightSchema)