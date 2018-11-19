import React, { Component } from 'react';
import { connect } from 'react-redux';
import { decreasePrec, increasePrec, loadBook } from './actions/actions'
import CRC from 'crc-32';
import './App.css';
import _ from 'lodash';
import Book from './components/book';
import {LoadBooks, BOOK} from './utils';
import {store} from './store';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { book: BOOK };
    this.decreasePrec = this.decreasePrec.bind(this)
    this.increasePrec = this.increasePrec.bind(this)
  }
  decreasePrec = () => {
    this.props.decreasePrec();
  }
  increasePrec = () => {
    this.props.increasePrec();
  }

  componentDidMount() {
    const {loadBook, state} = this.props;
    let items = this.props
    setInterval(function() {
      //LoadBooks();
      console.log(items)
      console.log(BOOK)
      loadBook();
    }, 3500)
    
  }

  render() {
    
    const {book} = this.state;
    return (
      <div className="App">
        <div className="buttons-list">
          <button onClick={()=>this.increasePrec()}>Increase precision</button>
          <button onClick={()=>this.decreasePrec()}>Decrease precision</button>
        </div>
          <Book bids={book.bids} asks={book.asks} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
 })

 const mapDispatchToProps = dispatch => ({
  decreasePrec: () => dispatch(decreasePrec()),
  increasePrec: () => dispatch(increasePrec()),
  loadBook: () => dispatch(loadBook())
 })

 export default connect(mapStateToProps, mapDispatchToProps)(App);



