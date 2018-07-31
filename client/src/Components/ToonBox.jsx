import React from 'react';

const api_url = 'http://10.200.200.155:8080'

const ToonBox = props => {
    const cartoonPanels = x => {
        return x.map( panel => {
            return <img alt="cp" className={`${panel.id.substr(0,2)} col-md-2,col-lg-2,col-sm-12`} src={api_url + panel.url}></img>
        }) 
    } 
    const checkRow = (p,currentRow) => {
        return p.toon.panels.filter(x => Number(x.pos.substr(1,1)) === currentRow)
    }
        //  console.log ('position: ', props.toon.panels.filter(x => Number(x.pos.substr(1,1)) === 1))
    if (props.toon){
        console.log(props.toon)
        return  (
            <div>
                <h2> {  props.toon.title } </h2>
                <h3>{  props.toon.publishingDate }</h3>
                
                <div className="first-row col-md-12 col-lg-12">{  cartoonPanels(checkRow(props,1)) }</div>
                <div className="second-row col-md-12">{  cartoonPanels(checkRow(props,2)) }</div>
                <div className="third-row col-md-12">{  cartoonPanels(checkRow(props,3)) }</div>
                <div className="fourth-row col-md-12">{  cartoonPanels(checkRow(props,4)) }</div>
                
                <p>{  props.toon.artistComments }</p>
            </div>)
    }
    else {
        console.log('returning null!!!')
        return null
    }
}

export default ToonBox;