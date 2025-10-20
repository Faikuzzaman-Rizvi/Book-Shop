

const mongoose = require('mongoose');

const prodSchema = mongoose.Schema(
    {
         name : { type: String , required : true  },
         price : { type: String , required : true},
         stock : { type: String , required : true },
         image : String ,
         description : String


    },{timestamps:true}
);

const product = mongoose.model('product',prodSchema);

 //(new product({ name  : 'abce' , price:200 , stock:900 , description:'something' , image: 'no path'})).save();


exports.productCreate = async(req , res)=>
{
     try{

         const{ name , price , stock , description } = req.body;
         const  image  = req.file? req.file.filename: 'no path';
        console.log('this is here we want to share');
        console.log(image)
         const p = new product({ name , price , stock , description , image});
         await p.save();
         res.json(p)

     }catch
     {
         res.status(500).json({  message : 'product is not saved '});
     }
}

exports.productGet = async(req,res)=>{

    console.log('this is informaksd ')
    const products = await  product.find();
    res.json(products)

}

exports.productUpdate = async(req,res)=>{

    try{

         const { id } = req.params;
    const { stock } = req.body;
    console.log(id);
    console.log(stock)
    const p = await  product.findByIdAndUpdate(id,{stock},{new : true});
    res.json(p);

    }
    catch(err)
    {
         res.status(500).json({  message : 'product is not update ' + err.message});
    }
   

}


