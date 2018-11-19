import React, { Component } from 'react';
import { Optional } from './Optional';
import '../App.css';

class BookAsks extends Component {
    render() {
      const {asks} = this.props;
      const asksObj = asks ? Object.keys(asks) : null
      return (
        <table className="book-asks">
            <thead>
                <tr>
                    <th>Price</th>
                    <th>Total</th>
                    <th>Amount</th>
                    <th>Count</th>
                </tr>
            </thead>
            <tbody>    
             <Optional renderIf={!!asks} component={()=>{
                 let total = 0;
                return asksObj.map((key,i)=>{
                    total = total + asks[key].amount;
                    return (
                        <Optional key={i} renderIf={!Number.isNaN(asks[key].amount) && !Number.isNaN(asks[key].cnt) && !Number.isNaN(asks[key].price)} component={()=>{
                           return <tr className="book-asks--row">   
                                <td>{asks[key].price}</td>
                                <td>{asks[key].amount + total}</td>
                                <td>{asks[key].amount}</td>
                                <td>{asks[key].cnt}</td>
                            </tr> 
                        }}/>      
                    )
                }) 
             }} />
             </tbody>
                  
        </table>
      );
    }
  }
  
  export default BookAsks;