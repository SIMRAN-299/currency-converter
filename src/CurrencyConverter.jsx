import React from 'react'
import './CurrencyRowStyle.css'
export default function CurrencyConverter(props) {
  const {
    l,
    currentCurrency,
    onChangeCurrency,
    onChangeAmount,
    amount,
    
  }=props;
  const optionsList = l;
  // console.log(optionsList);
  let euroCount=0;
  return (
    <div>
      <input type="number" className='input' value={amount} onChange={onChangeAmount}></input>
      <select value={currentCurrency} onChange={onChangeCurrency}>
        {
          optionsList.map((listItem)=>{
             if(listItem==='EUR'){
                euroCount++;
             }
             if(euroCount>1){
              return 0;
             }
             return <option key={listItem} value={listItem}>{listItem}</option>
          })
        }
          
      </select>
    </div>
  )
}
