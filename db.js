
const mongoose = require('mongoose')
exports.mongodb = async ()=>
{
   try
   {
      await mongoose.connect("mongodb://localhost:27017/boimelaDB", {
   useNewUrlParser: true,
   useUnifiedTopology: true
});
      console.log('mongoes connect');
   }
   catch(err)
   {
        console.log('mongo is problem')
        console.log(err)
   }
  
     
}
