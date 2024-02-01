import mongoose from 'mongoose'

const addFundSchema = new mongoose.Schema(
    {
      name: String,
      topUpAmount: Number,
      transactionCode:String,
      status: String
    },
    {
      timestamps: true,
    }
  )






const adminSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
      },
    address: {
        type: String,
        required: true,
    },
    password:{
        type:String,
        required:true
    },
    transactionPassword:{
        type:String,
      },
      isSuperAdmin: {
        type: Boolean,
        default: true,
      },
      userStatus: {
        type: String,
        enum: ["pending", "readyToApprove", "approved"],
      },
      ownSponserId: {
        type: String,
        required: true,
      },
    addFundHistory: [addFundSchema],
    capitalWithdrawHistory:[withdrawSchema],
    walletWithdrawHistory:[withdrawSchema],
    dailyROIHistory:[dailyROISchema],
    childLevel1:[{type:mongoose.Schema.Types.ObjectId,
        ref:"User"}],
      childLevel2:[{type:mongoose.Schema.Types.ObjectId,
        ref:"User"}],
      childLevel3:[{type:mongoose.Schema.Types.ObjectId,
        ref:"User"}],

    },{timestamps:true});

const Admin=mongoose.model("Admin",adminSchema);

export default Admin;
