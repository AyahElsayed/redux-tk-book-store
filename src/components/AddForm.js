import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { insrtBook } from '../store/bookSlice';


const Addform = () => {
  const { isLoggedIn } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const title = useRef('')
  const price = useRef(0)
  const describtion = useRef('')

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: title.current.value,
      price: price.current.value,
      describtion: describtion.current.value
    }

    console.log(title.current.value)
    dispatch(insrtBook(data));
    // remove data from form after submit
    title.current.value = ''
    price.current.value = ''
    describtion.current.value = ''
  }

  return (
    <div className='row'>
      <div className='col-6 offset-3 mt-3'>
        <h2>Insert Book</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='title'>Title</label>
            <input type='text' className='form-control' id='title' required ref={title} />
          </div>
          <div className='form-group'>
            <label htmlFor='price'>Price</label>
            <input type='number' className='form-control' id='price' required ref={price} />
          </div>
          <div className='form-group'>
            <label htmlFor='Description'>Description</label>
            <textarea
              ref={describtion}
              className='form-control'
              id='Description'
              rows='3'
              required
            ></textarea>
          </div>
          <button type='submit' className='btn btn-primary' disabled={!isLoggedIn}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addform;
