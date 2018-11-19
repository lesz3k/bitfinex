import React, { Component } from 'react';
import { loadBook } from './actions/actions'
import {store} from './store';
import CRC from 'crc-32';
import './App.css';
import _ from 'lodash';

const pair = process.argv[2]
export let BOOK = {};
let msg;
let connected = false
let connecting = false
let cli
let seq = null

export const LoadBooks = (prec) => {

    const bookReq = JSON.stringify({ 
        event: 'subscribe', 
        channel: 'book', 
        pair: pair,
        symbol: 'tBTCUSD',
        prec: 'P'+prec
      })

    const wss = new WebSocket('wss://api.bitfinex.com/ws/2')

    wss.onopen = () => {
      BOOK.bids = {}
      BOOK.asks = {}
      BOOK.psnap = {}
      BOOK.mcnt = 0

      wss.send(JSON.stringify({ event: 'conf', flags: 65536 + 131072 }))
      wss.send(bookReq)
    }

    wss.onmessage = (msg) => {
      msg = JSON.parse(msg.data)

    if (msg.event) return
    if (msg[1] === 'hb') {
      seq = +msg[2]
      return
    } else if (msg[1] === 'cs') {
      seq = +msg[3]

      const checksum = msg[2]
      const csdata = []
      const bids_keys = BOOK.psnap['bids']
      const asks_keys = BOOK.psnap['asks']

      for (let i = 0; i < 25; i++) {
        if (!!bids_keys && bids_keys[i]) {
          const price = bids_keys[i]
          const pp = BOOK.bids[price]
          csdata.push(pp.price, pp.amount)
        }
        if (!!asks_keys && asks_keys[i]) {
          const price = asks_keys[i]
          const pp = BOOK.asks[price]
          csdata.push(pp.price, -pp.amount)
        }
      }

      const cs_str = csdata.join(':')
      const cs_calc = CRC.str(cs_str)

      return
    }

    if (BOOK.mcnt === 0) {
      _.each(msg[1], function (pp) {
        pp = { price: pp[0], cnt: pp[1], amount: pp[2] }
        const side = pp.amount >= 0 ? 'bids' : 'asks'
        pp.amount = Math.abs(pp.amount)
        BOOK[side][pp.price] = pp
      })
    } else {
      const cseq = +msg[2]
      msg = msg[1]

      if (!seq) {
        seq = cseq - 1
      }

      seq = cseq

      let pp = { price: msg[0], cnt: msg[1], amount: msg[2] }

      if (!pp.cnt) {
        let found = true

        if (pp.amount > 0) {
          if (BOOK['bids'][pp.price]) {
            delete BOOK['bids'][pp.price]
          } else {
            found = false
          }
        } else if (pp.amount < 0) {
          if (BOOK['asks'][pp.price]) {
            delete BOOK['asks'][pp.price]
          } else {
            found = false
          }
        }
      } else {
        let side = pp.amount >= 0 ? 'bids' : 'asks'
        pp.amount = Math.abs(pp.amount)
        if (!!BOOK[side]){
          BOOK[side][pp.price] = pp
        }
        
      }
    }

    _.each(['bids', 'asks'], function (side) {
      let sbook = BOOK[side]
      let bprices = Object.keys(sbook)

      let prices = bprices.sort(function (a, b) {
        if (side === 'bids') {
          return +a >= +b ? -1 : 1
        } else {
          return +a <= +b ? -1 : 1
        }
      })

      BOOK.psnap[side] = prices
    })

    BOOK.mcnt++

    if (BOOK.mcnt>50000) {
      BOOK = {}
      BOOK.mcnt = 0;
    }


  }

}