import mongoose from "mongoose";
const courseSchema = new mongoose.Schema(
  {
    title: {
      type : String ,
      required :true
    },
    typeOfCourse:{
      type:String , 
      required : true 
    },
    insatructor: {
      type : String ,
      required :true
    }, 
    about: {
      type : String ,
      required :true
    },
    description: {
      type : String ,
      required :true
    },
    rating: {
      type : Number ,
      default :0 ,
    },
    price: {
      type : Number ,
      required :true
    },
    discount: {
      type : Number ,
      default : 0 
    }, 
    priceAfDis :{
      type : Number
    }, 
    language: {
      type : String ,
      required :true
    },
    calender: [
      {
        sessionDate : String ,
        sessionDetials : String ,
        sessionLink : String
      }
    ]
  },{ timestamps: true }
);

export default mongoose.model("Course", courseSchema);
