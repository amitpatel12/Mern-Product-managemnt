import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const ProductList = () => {
    const [products , setProduct] = useState([]);

    useEffect(() =>{
        getProduct()
    },[])

    const getProduct = async () =>{
        console.log(JSON.parse(localStorage.getItem('user'))._id)
        let id = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch(`http://localhost:8080/products/${id}`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            },
            // body:JSON.stringify(localStorage.getItem('user')._id)
        })    
        result = await result.json()
        setProduct(result)

        
        
    }
    

    // console.warn(products)

    const deleteProduct = async (id) => {
       let result = await fetch(`http://localhost:8080/product/${id}`,{
        method: 'DELETE',
        headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
    }
       });
       result = await result.json()

       if(result){
        alert('Successfully deleted product')
        getProduct()
       }
    }

    const searchHandle = async (e) =>{
        let key = e.target.value
        if(key){
            let result = await fetch(`http://localhost:8080/search/${key}`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }})
            result = await result.json()
            if(result){
                setProduct(result)
            }
        }
        else{
            getProduct()
        }
        
    }
  return (
    <div className='product-list container'>
        <h1>Product List</h1>
        <input className='search-product-box' type="text" placeholder='Search Products'
        onChange={searchHandle}/>
    <table className='table'>
        <thead className ='m-20'>
            <tr>
            <th scope="col">S No.</th>
            <th scope="col">Name</th>
            <th scope="col">Brand</th>
            <th scope="col">Price</th>
            <th scope="col">category</th>
            <th scope="col">operation</th>


            </tr>
        </thead>

  {
            products.length > 0 ? products.map((item,index) =>(
                <tbody key={item._id} className='table'>
                    <tr>
                    <th className='row'>{index+1}</th>
                    <th>{item.name}</th>
                    <th>{item.company}</th>
                    <th>${item.price}</th>
                    <th>{item.category}</th>
                    <th className='operations'>
                        <button type='button' onClick={() => deleteProduct(item._id)} className='btn btn-danger btn-sm'>Delete</button>
                        <Link to={`/update/${item._id}`} className='btn btn-primary'>Update</Link>
                    </th>
                    </tr>
                </tbody>
            )):
            <h3 className='no-result-found'>No Result Found</h3>
        }
        </table>
    </div>
  )
}

export default ProductList
