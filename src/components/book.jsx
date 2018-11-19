import React, { Component } from 'react';
import { Optional } from './Optional';
import BookBids from './BookBids';
import BookAsks from './BookAsks';
import '../App.css';

class Book extends Component {
    render() {
      const {bids, asks} = this.props;
      return (
        <div className='book'>
            <BookBids bids={bids} />
            <BookAsks asks={asks} />
        </div>
      );
    }
  }
  
  export default Book; 