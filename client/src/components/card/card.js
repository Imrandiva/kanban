import React,{Component }  from 'react';
import './styles.css';
import { Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'

export default class WeatherCard extends Component {
  constructor() {
    super();
    this.state = {
    weatherData: [],
    
    }
    this.getData().then(this.weatherTable);

  }


getData = () => {
  return fetch('https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/18.1489/lat/57.3081/data.json')
  .then(response => {
    // alert(response.tid);
    return response.json();
  })

}

refresh = () => {

  window.location.reload();

}
weatherTable = (text) =>  {
  console.log(text.timeSeries[0].validTime);
console.log(text.timeSeries[0].parameters[10].values); 
let weatherinfo = [];
const temp = text.timeSeries[0].parameters[10].values;
weatherinfo.push(temp);
this.setState({ weatherData: weatherinfo });

}

prayerData = (text) =>  {
  this.setState({ prayerTimes: text });
  console.log(text);
}

render() {

  return (
    <div className="mt-20 layout-row justify-content-center align-items-center">
    <div className="main">
      <div className="top">
        <p className="header">Weather in Stockholm right now</p>
        <Button className="button" inverted color='blue' circular icon='refresh' onClick={this.refresh} />
      </div>
      

      <div className="flex">
        <p className="temp">Temprature: {this.state.weatherData[0]}°C </p>
      </div>

    </div>
  </div>


  )
  }
}
  


