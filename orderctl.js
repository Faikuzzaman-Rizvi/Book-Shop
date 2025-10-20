
const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(

    {
           customername : String ,
           items : [
            {
                product : {
                      type : mongoose.Schema.ObjectId , ref : 'product' 
                },
                quantity : Number 
            }
           ], totalprice : Number ,
           status : { type : String , default : 'pending'}
          

    }
    ,
    {
         timestamps : true
    }
)

const order = mongoose.model('order',orderSchema);

exports.orderCreate = async(req , res)=>{

    try{
         const { customername , items , totalprice } = req.body;
        const o = new order({ customername , items , totalprice });

        await o.save();
        res.json(o);

    }
    catch
    {
           res.status(500).json({  message : 'order  is not saved '});
    }
   

}