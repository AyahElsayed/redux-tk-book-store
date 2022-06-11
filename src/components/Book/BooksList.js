import React from 'react';

const BooksList = ({ isLoading, books, isLoggedIn, dispatch, deleteBook }) => {

  const bookList =
    books.length > 0 ?
      books.map((item) => (
        <li className='list-group-item d-flex  justify-content-between align-items-center' key={item.id}>
          <div>{item.title}</div>
          <div className='btn-group' role='group'>
            <button type='button' className='btn btn-primary' disabled={!isLoggedIn}>
              Read
            </button>
            <button
              type='button'
              className='btn btn-danger'
              disabled={!isLoggedIn}
              onClick={() => { dispatch(deleteBook(item.id)) }}
            >
              Delete
            </button>
          </div>
        </li>
      ))
      :
      'there is no books selected'
  return (
    <div>
      <h2>Books List</h2>
      {
        isLoading ? 'Loading...' :
          <ul className='list-group'>
            {bookList}
          </ul>
      }

    </div>
  );
};

export default BooksList;
