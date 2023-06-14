import { useState } from 'react'
import { api } from './libs/axios'
import './index.css'

function App() {
  const [currencyFrom, setCurrencyFrom] = useState('');
  const [currencyTo, setCurrencyTo] = useState('');
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [conversionFactor, setConversionFactor] = useState(0);

  const handleCurrencyFromChange = (event) => {
    setCurrencyFrom(event.target.value);
  }

  const handleCurrencyToChange = (event) => {
    setCurrencyTo(event.target.value);
  }

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  }

  const handleConvert = async () => {
    try {
      const response = await api.get(`/${currencyFrom}-${currencyTo}`);
      const data = response.data;
      console.log(data[0].high)
      // console.log(data[`${currencyFrom}${currencyTo}`])

      const conversionFactor = Number(data[0].high);

      const convertedValue = amount * conversionFactor;

      setConvertedAmount(convertedValue);
      setConversionFactor(conversionFactor);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>

      {/* Titulo do Site */}
      <h1 class="text-center font-extrabold text-6xl" style={{ margin: "15vh" }}>
        Conversor via API
        </h1>

      {/* Div que segura tanto o valor a ser quanto o convertido */}
      <div class="flex font-bold text-xl">

      {/* Moeda desejada */}
      {/* Div que segura tanto a moeda a ser quanto o valor */}
        <div className='bg-[#505050] rounded-2xl border-4 border-[#353535] p-2 w-1/3' style={{ marginLeft: '25%' }}>
      Moeda a ser convertida:
      <select class="w-2/4 ml-2 bg-gray-700 rounded-md" value={currencyFrom} onChange={handleCurrencyFromChange}>
        <option value="">Selecione...</option>
        <option value="BRL">BRL</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
      </select>

      <br></br><br></br>

      {/* Valor desejado */}
      <div class="">
      <label class="w-1/3">Valor Desejado:</label>
      <input class="w-2/4 ml-4 bg-gray-700 rounded-md" type='number' onChange={handleAmountChange}></input>
      - {currencyFrom}
      </div>

      {/* Fim da div que segura o valor e moeda */}
      </div>

      {/* Espaçamento entre as divs de valor para ser convertido e valor convertido */}
      <div className='w-96'>
      </div>




      {/* Div que segura a moeda desejada e seu valor */}
      <div class="bg-[#505050] rounded-2xl border-4 border-[#353535] p-2 w-1/3" style={{ marginRight: '25%' }}>
      <div>
      Moeda desejada:
      <br></br>
      <select value={currencyTo} onChange={handleCurrencyToChange} class="bg-gray-700 rounded-md">
        <option value="">Selecione...</option>
        <option value="BRL">BRL</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
      </select>
      </div>
      
      <br></br>
      <span>Valor convertido: {convertedAmount} - {currencyTo}</span>
      </div>


      {/* Acaba a div principal que aborda tanto o valor a ser quanto o valor convertido */}
      </div>

      <div class="text-center mt-24 text-lg">

      <span>Fator de conversão: {conversionFactor}</span>
      <br></br>
      <button class="bg-[#404040] p-3 rounded-lg" onClick={handleConvert}>Converter</button>

      </div>

    </>
    
  )
}

export default App
