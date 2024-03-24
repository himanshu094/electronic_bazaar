var express = require('express');
var router = express.Router();
var pool=require('./pool')
var upload=require('./multer')

/* GET home page. */
router.post('/submit_category',upload.single('image'), function(req, res, next) {
  try{
    pool.query('insert into category (categoryname,image) values(?,?)',[req.body.categoryname,req.file.filename],function(error,result){
      if(error)
      {
      res.status(200).json({status:false,message:'Database error,pls contact database admin'})

      }
      else
      {
        res.status(200).json({status:true,message:'Category Submitted Successfully'})
      }
    })
  }
  catch(e)
  {
    res.status(200).json({status:false,message:'Server Error....'})
  }
});

/**
 * @swagger
 * /category/display_all_category:
 *   get:
 *     summary: Get method test endpoint
 *     description: Use this endpoint to test if the GET method is working.
 *     responses:
 *       200:
 *         description: Success response indicating the GET method is working.
 *       400:
 *         description: Error
 */

router.get('/display_all_category',function(req,res,next){
  try{
    pool.query('select * from category',function(error,result){
      if(error)
      {
      res.status(200).json({status:false,message:'Database error,pls contact database admin'})
      }
      else
      {
        res.status(200).json({data:result,status:true,message:'Success'})
      }
    })
  }
  catch(e)
  {
      res.status(200).json({status:false,message:'Server Error....'})
  }
})

/**
 * @swagger
 * /category/edit_category_data:
 *   post:
 *     summary: Test endpoint for updating category data
 *     description: Use this endpoint to update category data.
 *     parameters:
 *       - name: categoryname
 *         description: New name for the category
 *         in: formData
 *         required: true
 *         type: string
 *       - name: categoryid
 *         description: ID of the category to be updated
 *         in: formData
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Success response indicating the POST method is working.
 *       400:
 *         description: Error
 */

router.post('/edit_category_data', function(req, res, next) {
  try{
    pool.query('update category set categoryname=? where categoryid=?',[req.body.categoryname,req.body.categoryid],function(error,result){
      if(error)
      {
      res.status(200).json({status:false,message:'Database error,pls contact database admin'})

      }
      else
      {
        res.status(200).json({status:true,message:'Category Updated Successfully'})
      }


    })
}
catch(e)
{

    res.status(200).json({status:false,message:'Server Error....'})
}
  
});


router.post('/edit_category_picture',upload.single('image'), function(req, res, next) {
  try{
    pool.query('update category set image=? where categoryid=?',[req.file.filename,req.body.categoryid],function(error,result){
      if(error)
      {
      res.status(200).json({status:false,message:'Database error,pls contact database admin'})

      }
      else
      {
        res.status(200).json({status:true,message:'Image Updated Successfully'})
      }


    })
}
catch(e)
{

    res.status(200).json({status:false,message:'Server Error....'})
}
  
});


router.post('/delete_category', function(req, res, next) {
  try{
    pool.query('delete from category where categoryid=?',[req.body.categoryid],function(error,result){
      if(error)
      {
      res.status(200).json({status:false,message:'Database error,pls contact database admin'})

      }
      else
      {
        res.status(200).json({status:true,message:'Category Deleted Successfully'})
      }


    })
}
catch(e)
{

    res.status(200).json({status:false,message:'Server Error....'})
}
  
});



module.exports = router;
