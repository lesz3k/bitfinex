import store from '../store';
import {LoadBooks, BOOK} from '../utils';

export const reducers = (state = {Precision: 0, Book: null}, action) => {
    switch (action.type) {
     case 'DECREASE_PRECISION':
      console.log(state)
      let prec = state.Precision
      if (prec !== 0 ) {
        prec--
      }
      return {
       ...state,
       Precision: prec
      }
    case 'INCREASE_PRECISION':
      console.log(state)
      let precision = state.Precision
      if (precision < 3 ) {
        precision = precision + 1
      }
      return {
       ...state,
       Precision: precision
      }
    case 'LOAD_BOOK':
      console.log('loading book...')
      const precis = state.Precision;
      LoadBooks(precis);
      return {
       ...state,
       book: BOOK
      }
     default:
      return state
    }
   }