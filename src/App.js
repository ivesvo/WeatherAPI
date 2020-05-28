import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import {Button} from 'react-bootstrap'

import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";
import './App.css';
// import ForecastCard from './components/ForecastCard'
// import { FlatList } from 'react-native-elements';


const override = css`
  display: block;
  margin: 30px auto;

  justify-content: center;
`;

export default class App extends Component {
  constructor(props){
    super(props)
    this.state={
      weatherResult:null,
      isLoading: true,
      weatherFiveDays:null,
      dailyData: []
      

    }
  }
  
  getCurrentWeather = async(lon,lat) =>{
    let apiKey = process.env.REACT_APP_APIKEY;

    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    // let url = `http://api.openweathermap.org/data/2.5/weather?id=${city id}&appid=${apiKey}&units=metric`
    // console.log("api key" , url);
   
    let data = await fetch(url)
    let result = await data.json()
    
    console.log("what's the result?", result)
    this.setState({
      weatherResult: result,
    })

  }

  getCityWeather = async(city,countrycode) =>{
    let apiKey = process.env.REACT_APP_APIKEY;
    let url =`https://api.openweathermap.org/data/2.5/weather?q=${city},${countrycode}&appid=${apiKey}&units=metric`
    let data = await fetch(url)
  
    
    let result =  await data.json()
    let result5days = this.getFiveWeather(city, countrycode)
    console.log("what is the city", result)
    console.log("result is", result5days)
   
    this.setState({
      weatherResult: result,
      weatherFiveDays: result5days
      

    })
  }

  getFiveWeather = async(city,countrycode) =>{
   
    let apiKey = process.env.REACT_APP_APIKEY;
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${countrycode}&appid=${apiKey}&units=metric`
    let data = await fetch(url)
    let result = await data.json()

    
    console.log("how is the week like", result)
    // this.setState({
    //   weatherResult: result
    return result
  }
  

  getLocation  = () => {
    navigator.geolocation.getCurrentPosition((post) => {
      this.getCurrentWeather(post.coords.longitude, post.coords.latitude) //CurrentWeather is being called here already
    })
  }


  componentDidMount(){
    // console.log("open your app please")
    this.getLocation()
    
  }


 
  render() {
    if(!this.state.weatherResult){
      return (<div className="sweet-loading">
      <BounceLoader
        css={override}
        size={300}
        color={"#e8e04d"}
        loading={this.state.loading}
      />
    </div>)
    }
    return (
    <div className ="App">

  
      <div className="container-fluid my-auto content">
        <div className="container mx-auto my-4 py-4">
          <div className="row justify-content-center text-center">
            <h2 className="col-12 display-4 my-2 py-3 title">✺  Today  ✺</h2>
            <h1 className="col-12 location">{this.state.weatherResult.name}, {this.state.weatherResult.sys.country}</h1>
            <h3 className="col-12 temp">{this.state.weatherResult.main.temp.toFixed(0)}°C</h3>
            <h3 className="col-12 descriptipn">{this.state.weatherResult.weather[0].description.toUpperCase()}</h3>
            
          </div>
        </div>
        <div className="container mx-auto my-4 py-4 week">
          <h1>5 Days Forecast</h1>
          
        </div>
        <div className="container mx-auto my-4 py-4 week">

            <div className="col-sm-2 day">Day 1</div>
            <div className="col-sm-2 day">Day 2</div>
            <div className="col-sm-2 day">Day 3</div>
            <div className="col-sm-2 day">Day 4</div>
            <div className="col-sm-2 day">Day 5</div>

            
        </div>
        <div className="side-bar">
    
          
          <Button variant="info" class="city-button" onClick={()=>this.getCityWeather("Ho Chi Minh")}>Ho Chi Minh</Button>{' '}
          <Button variant="info" class="city-button" onClick={()=>this.getCityWeather("Manchester")}>Manchester</Button>{' '}
          <Button variant="info" class="city-button" onClick={()=>this.getCityWeather("Llanfairpwllgwyngyll,")}>Llanfairpwllgwyngyll</Button>{' '}
          <Button variant="info" class="city-button" onClick={()=>this.getCityWeather("Hongkong")}>Hong Kong</Button>{' '}
          <Button variant="info" class="city-button" onClick={()=>this.getCityWeather("Lisbon")}>Lisbon</Button>{' '}
          <Button variant="info" class="city-button" onClick={()=>this.getCityWeather("Cuba")}>Cuba</Button>{' '}
        </div>
          
          
       
      </div>
  </div>
    )
  }
}
