import { FormControl, InputLabel, Select, MenuItem, Grid, TextField, Button, Avatar } from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { makeStyles } from "@mui/styles";
import { useState, useEffect } from "react";
import { getData, postData } from "../services/FetchNodeServices";
import Swal from 'sweetalert2'
import Heading from './projectComponent/Heading';

import categoryicon from '../../src/assets/category.png'

var useStyles = makeStyles({
    root: {
        width: "100%",
        height: "100%",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    box: {
        width: '500px',
        height: 'auto',
        padding: '1.5%',
        borderRadius: '10px'
    },
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default function Products() {

    const useStyle = useStyles()

    const [productName, setProductName] = useState('')
    const [brandId, setBrandId] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [picture, setPicture] = useState({ bytes: '', filename: '' })
    const [getErrors, setErrors] = useState({})
    const [categoryList, setCategoryList] = useState([])
    const [brandList, setBrandList] = useState([])


    const fetchAllCategory = async () => {
        var result = await getData('category/display_all_category')
        setCategoryList(result.data)
    }

    const fillAllCategory = () => {
        return categoryList.map((item) => {
            return <MenuItem key={item.categoryid} value={item.categoryid}>{item.categoryname}</MenuItem>
        })
    }

    useEffect(function () {
        fetchAllCategory()
    }, [])

    const fetchBrandsByCategory=async(cid)=>{
        var result=await postData('brands/fetch_brands_by_category',{categoryid:cid})
        setBrandList(result.data)
    }

    const handleCategoryChange=(event)=>{
        setCategoryId(event.target.value)
        fetchBrandsByCategory(event.target.value)
    }
    
    const fillBrands=()=>{
      return brandList.map((item)=>{
      return <MenuItem key={item.brandid} value={item.brandid}>{item.brandname}</MenuItem>
      })
    }


    const handleReset = () => {
        setProductName('')
        setCategoryId('')
        setBrandId('')
        setPicture({ bytes: '', filename: '' })
    }

    const handleError = (error, label) => {
        setErrors((prev) => ({ ...prev, [label]: error }))
    }

    const validation = () => {
        var error = false
        if (productName.length === 0) {
            error = true
            handleError('Please enter brand name', 'productName')
        }
        if (categoryId.length === 0) {
            error = true
            handleError('Please choose category', 'categoryId')
        }
        if (brandId.length === 0) {
            error = true
            handleError('Please choose brand', 'brandId')
        }
        if (picture.filename.length === 0) {
            error = true
            handleError('Please select logo', 'logo')
        }
        return error
    }

    const handleSumit = async () => {
        
        if (!validation()) {
            var formData = new FormData()
            formData.append('productname', productName)
            formData.append('picture', picture.bytes)
            formData.append('categoryid', categoryId)
            formData.append('brandid', brandId)


            var response = await postData('products/submit_products', formData)
            if (response.status === true) {
                Swal.fire({
                    icon: 'success',
                    title: 'Brand added sucessfully!',
                    showConfirmButton: true
                })
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Brand not added!',
                    showConfirmButton: true
                })
            }
        }
    }


    function handlePicture(event) {
        setPicture({ bytes: event.target.files[0], filename: URL.createObjectURL(event.target.files[0]) })
    }

    return (
        <div className={useStyle.root}>
            <div className={useStyle.box}>
                <Grid container spacing={3}>

                    <Grid item xs={12}>
                        <Heading  image={categoryicon} caption="New Product" link='/displayallbrands' />
                    </Grid>

{/* //! image ////////////////////////////////////// */}
                    <Grid item xs={12} className={useStyle.center}>
                        <Button
                            style={{ display: 'flex', flexDirection: 'column' }}
                            onFocus={() => handleError('', 'picture')}
                            error={getErrors.picture}
                            onChange={handlePicture} component="label" fullWidth>
                            <input hidden type="file" accept="images/*" />
                            <Avatar src={picture.filename} style={{ width: 80, height: 80 }}>
                                <FolderIcon style={{ width: 40, height: 40 }} />
                            </Avatar>
                            Choose Product Picture
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <p style={{ color: '#FF0000', fontSize: '12.3px', marginLeft: '15px', marginTop: '0' }}>{getErrors.logo}</p>
                    </Grid>

{/* //! category & brands dropdown ////////////////// */}
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel>Category</InputLabel>
                            <Select
                                value={categoryId}
                                onFocus={() => handleError('', 'categoryId')}
                                error={getErrors.categoryId}
                                label="Category"
                                onChange={handleCategoryChange}
                            >
                                {fillAllCategory()}
                            </Select>
                        </FormControl>
                        <p style={{ color: '#FF0000', fontSize: '12.3px', marginLeft: '15px', marginTop: '0' }}>{getErrors.categoryId}</p>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel>Brands</InputLabel>
                            <Select
                                value={brandId}
                                onFocus={() => handleError('', 'brandId')}
                                error={getErrors.brandId}
                                label="Brands"
                                onChange={(event) => setBrandId(event.target.value)}
                            >
                                {fillBrands()}
                            </Select>
                        </FormControl>
                        <p style={{ color: '#FF0000', fontSize: '12.3px', marginLeft: '15px', marginTop: '0' }}>{getErrors.brandId}</p>
                    </Grid>

 {/* //! Product Name /////////////////////////////// */}
                    <Grid item xs={12}>
                        <TextField
                            value={productName}
                            error={getErrors.productName}
                            helperText={getErrors.productName}
                            onChange={(event) => setProductName(event.target.value)}
                            onFocus={() => handleError('', 'productName')}
                            label="Product Name"
                            fullWidth />
                    </Grid>

{/* //! button ///////////////////////////////// */}
                    <Grid item xs={6} className={useStyle.center}>
                        <Button onClick={handleSumit} variant="contained" fullWidth style={{ background: '#004cef', padding: '5% 0', fontWeight: '500' }}>Submit</Button>
                    </Grid>
                    <Grid item xs={6} className={useStyle.center}>
                        <Button onClick={handleReset} variant="contained" fullWidth style={{ background: '#004cef', padding: '5% 0', fontWeight: '500' }}>Reset</Button>
                    </Grid>


                </Grid>
            </div>
        </div>
    )
}