//d99e0e31admsh16577b49cde0229p1fa008jsn05650f676f5a
//RDXO2KIKVITJ259O
import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Chart } from 'chart.js/auto';

const myChart = document.getElementById('myChart');

const Market = (props) => {
  const [searchInput, setSearchInput] = useState('');
  const [tickerAvgArr, setTickerAvgArr] = useState([]);
  const [flag, setFlag] = useState(false);
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  
  let tickerArr = [];

  const clearArr = () => {
    setTickerAvgArr([]);
    setFlag(true);
  }

  const tickerDetail = (data) => {
    setName((Object.values(Object.values(data)[0])[1]));
    setDate(Object.values(Object.values(data)[0])[2].split(' ')[0]);
    tickerArr = Object.values(Object.values(data)[1]);
    for (let i = 0; i < tickerArr.length; i++){
      let tickerAvg = (parseFloat(Object.values(tickerArr[i])[1] + Object.values(tickerArr[i])[2])/2).toFixed(2);
      tickerAvgArr.push(tickerAvg);
    }
    setTickerAvgArr(tickerAvgArr)
    const yValues = tickerAvgArr;
    
    let xValues = [];
    for (let i=0; i<tickerAvgArr.length; i++){
      xValues.push(Object.keys(Object.values(data)[1])[i].split(' ')[1])
    }
    xValues.reverse();

    new Chart(myChart, {
      type: "line",
      options: {
        animation: false,

      },
      data: {
        labels: xValues,
        datasets: [{
          label: searchInput,
          backgroundColor:"rgba(0,0,255,1.0)",
          borderColor: "rgba(0,0,255,0.1)",
          data: yValues
        }]
      }
    });

  }

  const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'd99e0e31admsh16577b49cde0229p1fa008jsn05650f676f5a',
        'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
    }
  };

  const getApi = async (event) => {
    event.preventDefault();
    if (!searchInput) {
      return false;
    }
    let tickerApi =
    'https://alpha-vantage.p.rapidapi.com/query?interval=5min&function=TIME_SERIES_INTRADAY&symbol='+searchInput+'&datatype=json&output_size=compact'
    fetch(tickerApi, options)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        tickerDetail(data);
        return (data);
      })
      .catch((err) => {
        console.log(err);
        // response.status(500).json(err);
      });
  }
    return (
      <Container>
        <div className='my-2'>
          <h2>Enter a ticker symbol:</h2>
          <Form onSubmit={getApi}>
            <Form.Row>
              <Form.Control
                name='searchInput'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                type='text'
                size='lg'
                placeholder='SPDR, MSFT, TSLA'
              />
              <Button type='submit' variant='success' size='lg' onClick={clearArr}>Search</Button>
            </Form.Row>
          </Form>
        </div>
        {flag
          ? 
          <>
            <h2>{name}</h2>
            <h3>Date: {date}</h3>
          </>
          : `Search for ticker symbol to begin`
        }
      </Container>
    )
}
//CHANGE LINE 86 TO JSCHART DISPLAY DAILY TREND
export default Market;