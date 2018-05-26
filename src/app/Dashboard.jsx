import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Wallets from './Wallets'
import { SVG } from './Svg'
class DashBoard extends Component {

  constructor(props) {
    super(props)
    this.state = { res: [] }
    this.onchildclick = this.onchildclick.bind(this)
    this.toggle = this.toggle.bind(this)
    this.from = []
  }

  componentDidMount() {
    fetch('wallets.json')
      .then(res => res.json())
      .then(res => {
        this.setState({ res })
      })
    fetch('transactions.json')
      .then(res => res.json())
      .then(trans => {
        this.setState({ trans })
      })

  }

  dx = 150;
  dy = 100;

  onchildclick(child) {
    let recs = this.state.res['recipient']
    let own = this.state.res['own']
    let paymnts = this.state.res['payment']
    let trans = this.state.trans
    let recipientArr = []
    let paymentArr = []
    let ownArr = []
    //reset
    recs.map(r => {
      return r['selected'] = false;
    })
    paymnts.map(p => {
      return p['selected'] = false;
    })
    own.map((r, i) => {
      if (r['name'] === child) {
        ownArr.push(i)
        r['selected'] = true;
      } else {
        r['selected'] = false;
      }
      return null;
    })

    //recipient handle
    trans.map(t => {
      if (t.type === 'RECIPIENT' && t.dest === child) {
        recs.map((r, i) => {
          if (r.name === t.src) {
            recipientArr.push({ i: i, amt: t.amt })
            r['selected'] = true;
          }

        })
      } else if (t.type === 'PAYMENT' && t.src === child) {
        paymnts.map((p, i) => {
          if (p.name === t.dest) {
            p['selected'] = true;
            paymentArr.push({ i: i, amt: t.amt })
          }
        })
      }
      return null;
    })

    //let from=["M 180 450 L 330 250"]
    //let from=["M 510 150 L 660 250"]
    let from = []
    recipientArr.map((r, i) => {
      let x1 = 180;
      let y1 = r.i * this.dy + 120;
      let x2 = 340;
      let y2 = ownArr[0] * this.dy + 120
      let str = "M ".concat(x1).concat(" ").concat(y1).concat("L ").concat(x2).concat(" ").concat(y2)
      from.push({ d: str, amount: r.amt })
    })


    paymentArr.map((r) => {
      let x1 = 510;
      let y1 = ownArr[0] * this.dy + 120
      let x2 = 660;
      let y2 = r.i * this.dy + 120;
      let str = "M ".concat(x1).concat(" ").concat(y1).concat("L ").concat(x2).concat(" ").concat(y2)
      from.push({ d: str, amount: r.amt })
    })


    this.setState({ recipient: recs, payment: paymnts, own: own, from: from })
  }


  toggle() {
    this.setState({ show: !this.state.show })
  }

  render() {
    const wallets = ['recipient', 'own', 'payment'];
    return (

      <div className="container">
        <div className="content">
          <div className="row">
            <div className="col m4"><h4>Recipient Wallet</h4></div>
            <div className="col m4"><h4>Own Wallet</h4></div>
            <div className="col m4"><h4>Payment Wallet</h4></div>
            {
              wallets.map(w => {
                return (
                  <div className="col m4" key={w}>
                    <Wallets wallets={this.state.res[w]} key={w} type={w} onchildclick={this.onchildclick}
                    />
                  </div>
                )
              })
            }
          </div>
          <div>
            <SVG to={this.state.to} from={this.state.from} />
          </div>
        </div>
        <div>
          <a className="btn-floating pulse" onClick={this.toggle}>
            <i className="material-icons">file_download</i>
          </a>
        </div>

        <div class={"transactions " + (this.state.show ? '' : 'hide')}>
          <a className="btn-floating pulse close" onClick={this.toggle}>
            <i className="material-icons">close</i>
          </a>
          <pre> {"" + JSON.stringify(this.state.trans, undefined, 2) + ""}</pre>
        </div>
      </div>
    );
  }
}

export default DashBoard;
