import React, { Component } from 'react';
class Wallets extends Component { 
  constructor(props){
    super(props)
    this.send=this.send.bind(this)     
  }
  
  send(name){    
    this.props.onchildclick(name)    
  }
 
  render() {
    const { wallets } = this.props;
   
    return (
      <div className="col m12">
        {wallets && wallets.map((w) => {          
          return (
            <div className={"card-panel "+(w.selected?'selected ':' ')} key={w.name} 
               onClick={()=>this.send(w.name)} >
              <div className="chip">
                {w.name}
              </div>
            </div>
          )
        })
        }
      </div>
    );
  }
}

export default Wallets;
