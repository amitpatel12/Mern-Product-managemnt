import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const UpdateProduct = () => {
 
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [company, setCompany] = useState('')
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() =>{
        
        getProductDetails();
    },[])

    const getProductDetails = async () =>{
        console.log(params)
        let result = await fetch(`http://localhost:8080/product/${params.id}`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
        })
        result = await result.json()
        console.log(result)
        setName(result.name)
        setPrice(result.price)
        setCategory(result.category)
        setCompany(result.company)
    }
    const updateProduct = async () => {
        console.log(name, price, category, company)
        let result = await fetch(`http://localhost:8080/product/${params.id}`,{
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            
        },
            body: JSON.stringify({name, price, category, company})
        })

        result = await result.json()
        if(result.acknowledged){
            navigate('/')
        }
        console.log(result)
    }


  return (
    <div className='product'>
      <h1>Update Product</h1>

      <input type="text" 
      placeholder='Enter Product Name'
      className='inputBox'
      value={name}
      onChange={(e) =>setName(e.target.value)}
      />

      <input type="text" 
      placeholder='Enter Product Price'
      className='inputBox'
      value={price}
      onChange={(e) =>setPrice(e.target.value)}
      />


      <input type="text" 
      placeholder='Enter Product Category'
      className='inputBox'
      value={category}
      onChange={(e) =>setCategory(e.target.value)}
      />



      <input type="text" 
      placeholder='Enter Product Company'
      className='inputBox'
      value={company}
      onChange={(e) =>setCompany(e.target.value)}
      />



      <button type="submit"
       className='appButton'
       onClick={updateProduct} 
       >
        Update Product
        </button>
    </div>
  )
  
  }

export default UpdateProduct
