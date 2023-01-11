import { useEffect,useState } from 'react';
import './App.css';
import CurrencyConverter from './CurrencyConverter';

const BASE_URL = 'https://api.exchangerate.host/latest';

function App() {
  const [currentOptions, setCurrencyOptions]=useState([]);
  // console.log(currentOptions);
  const [fromCurrency,setFromCurrency]=useState('EUR');
  const [exchangeRate,setExchangeRate]=useState();
  const [toCurrency,setToCurrency]=useState('EUR');
  const [amount,setAmount]=useState(1);
  const [amountIntFromCurrency, setAmountInFromCurrency]=useState(true);
  
  let toAmount, fromAmount
  if(amountIntFromCurrency){
    fromAmount=amount;
    toAmount=amount*exchangeRate;
  }
  else{
    toAmount=amount;
    fromAmount=amount/exchangeRate;
  }
  
  
  useEffect(()=>{
    
    fetch(BASE_URL)
    .then(res => res.json())
    .then(data => {
      const firstCurrency= Object.keys(data.rates)[0];
      setFromCurrency(data.base);
      setToCurrency(firstCurrency);
      setExchangeRate(data.rates[firstCurrency]);
      setCurrencyOptions([data.base,...Object.keys(data.rates)])}
    
          
    );
  },[])
  useEffect(()=>{
    if(fromCurrency !=null && toCurrency!=null){
    fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
    .then(res=>res.json())
    .then(data=>{
      setExchangeRate(data.rates[toCurrency])
    })
  }
  },[fromCurrency,toCurrency])
  function handleFromChange(e){
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }
  function handleToChange(e){
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }
  return (
    <div className='main_container'>

      <h1 className="font-effect-shadow-multiple">Converter</h1>
      <CurrencyConverter 
          l={currentOptions}
          currentCurrency={fromCurrency}
          onChangeCurrency={(e)=>{setFromCurrency(e.target.value)}}
          amount={fromAmount}
          onChangeAmount={handleFromChange}
          
      ></CurrencyConverter>
      <div className='equals'>=</div>
      <CurrencyConverter 
          l={currentOptions}
          currentCurrency={toCurrency}
          onChangeCurrency={(e)=>{setToCurrency(e.target.value)}}
          amount={toAmount}
          onChangeAmount={handleToChange}
      ></CurrencyConverter>
    </div>
    
  );
}

export default App;
