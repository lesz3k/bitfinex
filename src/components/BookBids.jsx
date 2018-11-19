import React, { Component } from 'react';
import { Optional } from './Optional';
import '../App.css';

class BookBids extends Component {
    render() {
      const {bids} = this.props;
      const bidsObj = bids ? Object.keys(bids) : null
      return (
        <table className="book-bids">
            <thead>
                <tr>
                    <th>Count</th>
                    <th>Amount</th>
                    <th>Total</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>    
             <Optional renderIf={!!bids} component={()=>{
                 let total = 0;
                return bidsObj.map((key,i)=>{
                    total = total + bids[key].amount;
                    return (
                        <tr key={i} className="book-bids--row">
                            <td>{bids[key].cnt}</td>
                            <td>{bids[key].amount}</td>
                            <td>{bids[key].amount + total}</td>
                            <td>{bids[key].price}</td>
                        </tr>
                    )
                }) 
             }} />
             </tbody>
                  
        </table>
      );
    }
  }
  
  export default BookBids;