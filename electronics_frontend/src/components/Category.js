import {useState} from 'react'
import { Grid,Button,TextField,Avatar } from "@mui/material";
import { postData } from '../services/FetchNodeServices';
import Swal from 'sweetalert2';
import Heading from './projectComponent/Heading';
import categoryicon from '../../src/assets/category.png'
import { makeStyles } from "@mui/styles";

var useStyles=makeStyles({
  root:{
    width:'100vw',
    height:'100%',
    display:'flex',
    justifyContent:'center'
  },
  box:{
    width:500,
    height:'auto',
    background:'#f1f2f6',
    padding:10,
    margin:10,
    borderRadius:10
 },
 center:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
 }

})
export default function Category(){
    const useStyle=useStyles()
  const [categoryName,setCategoryName]=useState('')
  const [image,setImage]=useState({bytes:'',filename:''})
  const [errors,setErrors]=useState({})
  
  const handleReset=()=>{
    setCategoryName('')
    setImage({bytes:'',filename:''})
  }

  const handleError=(error,label)=>{
   setErrors((prev)=>({...prev,[label]:error}))
  }

  const validation=()=>{
    let error=false  

    if(categoryName.length==0){
      error=true  
      handleError('Pls Input Category Name...','categoryName')
          
    }

    if(image.filename.length==0){
      error=true
      handleError('Pls Select image...','image')
    }

    return error
  }

const handleSubmit=async()=>{ 
  var error=validation()  

  if(error==false)
  {
      var formData=new FormData()
      formData.append('categoryname',categoryName)
      formData.append('image',image.bytes)
       
      var response=await postData('category/submit_category',formData)

      if(response.status)
      {
        Swal.fire({
          icon: 'success',
          title: 'Category',
          text: response.message,
          toast:true
        })
      }
      else
      {
        Swal.fire({
          icon: 'error',
          title: 'Category',
          text: response.message,
          toast:true
        })
      }
  }
}

const handleImage=(event)=>{
setImage({bytes:event.target.files[0],filename:URL.createObjectURL(event.target.files[0])})
} 

return(
    <div className={useStyle.root} >
      <div className={useStyle.box}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Heading image={categoryicon} caption="New Category" link='/displayallcategory' />
            </Grid>  

              <Grid item xs={12}>
                <TextField 
                value={categoryName}
                onFocus={()=>handleError(null,'categoryName')}
                error={errors.categoryName}
                helperText={errors.categoryName}
                onChange={(event)=>setCategoryName(event.target.value)} label="Category Name" fullWidth/>
              </Grid>

              <Grid item xs={6}>
                  <Button component="label" 
                  fullWidth
                  variant="contained"
                  onFocus={()=>handleError(null,'image')}
                  >
                  <input   onChange={handleImage} hidden type="file" accept="images/*" multiple/>

                      Category Image
                  </Button>
                  <div style={{color:'#d32f2f',fontSize:12,marginLeft:10,marginTop:6}}>{errors.image}</div>

              </Grid>

              <Grid item xs={6} className={useStyle.center} >
                  <Avatar src={image.filename} alt='Category' variant="rounded"/>
              </Grid>

              <Grid item xs={6}>
                  <Button 
                  fullWidth
                  variant="contained"
                  onClick={handleSubmit}
                  >Submit</Button>
            </Grid>

            <Grid item xs={6}>
                  <Button 
                  fullWidth
                  variant="contained"
                  onClick={handleReset}
                  >Reset</Button>
            </Grid>

          </Grid>
      </div>
    </div>
)}