import React, { Component } from 'react';

export class Path {
    constructor(coords){
        this.coords=coords;
    }
}

export class SVG extends Component {
    
    constructor(props){
        super(props)
        this.state={}
    }
    onMouseEnter(amt){
        console.log("enter")
        this.setState({amount:amt})
    }

    render() {
        
        return (
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" >
                    <defs>
                        <marker id='head' orient='auto' markerWidth='2' markerHeight='4'
                            refX='0.1' refY='2'>
                            <path d='M0,0 V4 L2,2 Z' fill='#0288d1' />
                        </marker>
                    </defs>   
                    {
                        this.props.from && this.props.from.map((f,i) =>{                                                                
                        return  <path key={i} markerEnd='url(#head)' id="lineAB" d={f.d} stroke="#0288d1"
                            strokeWidth={Math.floor(f.amount/50)} fill="none"
                            onMouseEnter={(e)=>this.onMouseEnter(f.amount)} />
                        })
                    }            
                    
                    Sorry, your browser does not support inline SVG.
                </svg>
                
            </div>
        )
    }
}