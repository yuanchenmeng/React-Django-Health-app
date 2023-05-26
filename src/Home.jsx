import React, {useEffect, useState} from 'react';
import {BiTask, BiTaskX} from 'react-icons/bi';
import {IoIosMore} from 'react-icons/io';
import hike from './res/hike.jpg';
import './App.css';
import DSsleep from './rdata/dssleep.json';
import DScalorie from './rdata/dscalorie.json';
import DSweight from './rdata/dsweight.json';
import {json_prepend_index, parseData, calculate_S_Average} from "./util";

import {
  Category, ChartComponent, ColumnSeries, Inject, Legend, LineSeries,
  SeriesCollectionDirective, SeriesDirective, SparklineComponent, SparklineTooltip
} from '@syncfusion/ej2-react-charts';
import axios from "axios";

const Home = () => {

  const currentColor = '#3874ff';

  const primaryxAxis = {valueType: 'Category'}

  const [SleepData, setSleepData] = useState([]);
  const [WeightData, setWeightData] = useState([]);
  const [CalorieData, setCalorieData] = useState([]);

  const [Bval1, setBval1] = useState(null);
  const [Bval2, setBval2] = useState(null);
  const [Bval3, setBval3] = useState(null);
  const [Bval4, setBval4] = useState(null);


  function fetchSleep() {
    axios({
      method: "GET",
      url: "/dbsleeping/",
      params: {type: localStorage.getItem('user')},
    }).then(response => {
      //console.log(response.data);
      setSleepData(json_prepend_index(response.data).slice(0, 5));
      //console.log(json_prepend_index(response.data).slice(0, 5));
    })
      .catch(error => console.log(error));
  }


  function fetchCalorie() {
    axios({
      method: "GET",
      url: "/dbcalorie/",
      params: {type: localStorage.getItem('user')},
    }).then(response => {
      //console.log(response.data);
      setCalorieData(json_prepend_index(response.data));
      setBval3((response.data)[0].in_val)
      setBval4((response.data)[0].out_val)

    })
      .catch(error => console.log(error));
  }

  function fetchWeight() {
    axios({
      method: "GET",
      url: "/dbweights/",
      params: {type: localStorage.getItem('user')},
    }).then(response => {
      setWeightData(json_prepend_index(response.data).slice(0, 5));
    })
      .catch(error => console.log(error));
  }


  function fetchWalking() {
    axios({
      method: "GET",
      url: "/dbwalking/",
      params: {type: localStorage.getItem('user')},
    }).then(response => {
      setBval1(response.data[0].Walking_val);
      setBval2(response.data[0].Steps);
    })
      .catch(error => console.log(error));
  }


  useEffect(() => {
    fetchSleep();
    fetchCalorie();
    fetchWeight();
    fetchWalking();
  }, [])


  return (
    <div>

      <div className="mt-4 mb-4 mx-auto rboxca">
        <div className="bg-white m-3 p-4 rounded-2l md:w-780 ">
          <div className="flex justify-between">
            <p className="font-semibold text-xl">Health Dashboard</p>
          </div>
          <div className="mt-5 flex gap-10 flex-wrap justify-left">
            <div className=" border-r-1 border-color m-4 pr-10">
              <div>
                <p>
                  <span className="text-3xl font-semibold">{Bval1} mi</span>
                  <span className="p-1 rounded-full text-white bg-green-400 ml-3 text-xs">
                    +23%
                  </span>
                </p>
                <p className="text-gray-500 mt-1">Walking distance</p>
              </div>
              <div className="mt-4">
                <p>
                  <span className="text-3xl font-semibold">{Bval2}</span>
                  <span className="p-1 rounded-full text-white bg-green-400 ml-3 text-xs">
                    +18%
                  </span>
                </p>
                <p className="text-gray-500 mt-1">Steps</p>
              </div>

              <div className="mt-4">
                <p>
                  <span className="text-3xl font-semibold">{Bval3} Cal</span>
                  <span className="p-1 rounded-full text-white bg-green-300 ml-3 text-xs">
                    +3%
                  </span>
                </p>
                <p className="text-gray-500 mt-1">Calorie Intake</p>
              </div>

              <div className="mt-4">
                <p>
                  <span className="text-3xl font-semibold">{Bval4} Cal</span>
                  <span className="p-1 rounded-full text-white bg-orange-400 ml-3 text-xs">
                    -7%
                  </span>
                </p>
                <p className="text-gray-500 mt-1">Calorie Consumption</p>
              </div>

            </div>

            <div>
              <ChartComponent id='charts' primaryXAxis={primaryxAxis} dataSource={CalorieData}
                              width='470px' height='80%'>
                <Inject services={[ColumnSeries, Legend, LineSeries, Category]}/>
                <SeriesCollectionDirective>
                  <SeriesDirective xName='index' type='Column' yName='in_val' name='Calorie Intake'/>
                  <SeriesDirective xName='index' type='Column' yName='out_val' name='Calorie Burned'/>
                </SeriesCollectionDirective>
              </ChartComponent>
            </div>


          </div>
        </div>
      </div>


      <div className="rboxc">
        <div className="rbox2">
          <div className="flex justify-between ">
            <p className="font-semibold text-white text-2xl">Sleep</p>

            <div className="justify-end">
              <p className="text-xl text-white font-semibold">8 hr</p>
              <p className="text-gray-200">in average</p>
            </div>
          </div>

          <div className="mt-4">

            <SparklineComponent
              id="column-sparkLine" height="100px" width='320px'
              valueType="Numeric" color="rgb(242, 252, 253)" fill="#b2cfff"
              tooltipSettings={{
                visible: true, format: 'Day ${index}: ${sleep_dur}h',
                trackLineSettings: {visible: true,},
              }}
              markerSettings={{size: 2.5, fill: currentColor}}
              dataSource={SleepData} xName="index" yName="sleep_dur" type="Column"
            >
              <Inject services={[SparklineTooltip]}/>
            </SparklineComponent>
          </div>
        </div>
        <div className="rbox">

          <div className="flex justify-between">
            <p className="font-semibold text-blue-500 text-2xl">Weight</p>

            <div className="ml-4">
              <p className="text-xl text-blue-500 font-semibold">150 lb</p>
              <p className="text-blue-300">in average</p>
            </div>
          </div>

          <div className="mt-4">


            <SparklineComponent
              id="spark1" height="100px" width='340px' valueType="Numeric"
              fill={currentColor}
              tooltipSettings={{
                visible: true,
                format: '${index}: ${weight_val} lb',
                trackLineSettings: {
                  visible: true,
                },
              }}
              markerSettings={{size: 2, fill: currentColor}}
              dataSource={WeightData} xName="index" yName="weight_val" type="Line"
            >
              <Inject services={[SparklineTooltip]}/>
            </SparklineComponent>
          </div>

        </div>
      </div>

      <div className="flex flex-wrap justify-center">
        <div className="rbox4">
          <div className="flex justify-between">
            <p className="text-xl font-semibold">Goals & To-do list</p>
            <button type="button" className="text-xl font-semibold text-gray-500">
              <IoIosMore/>
            </button>
          </div>

          <div className="mt-10 ">

            <div className="flex justify-between mt-4 w-full">
              <div className="flex gap-4">
                <button
                  type="button"
                  style={{background: '#17c5a6'}}
                  className="text-2xl hover:drop-shadow-xl text-white rounded-full p-3"
                >
                  <BiTask/>
                </button>
                <div>
                  <p className="text-md font-semibold mt-3">Calorie Intake &lt; 2500</p>
                </div>
              </div>
              <p className="mt-3">Completed</p>

            </div>

            <div className="flex justify-between mt-4 w-full">
              <div className="flex gap-4">
                <button
                  type="button"
                  style={{background: '#17c5a6'}}
                  className="text-2xl hover:drop-shadow-xl text-white rounded-full p-3"
                >
                  <BiTask/>
                </button>
                <div>
                  <p className="text-md font-semibold mt-3">Walking 1 mi</p>
                </div>
              </div>
              <p className="mt-3">Completed</p>
            </div>

            <div className="flex justify-between mt-4 w-full">
              <div className="flex gap-4">
                <button
                  type="button"
                  style={{background: '#ff9700'}}
                  className="text-2xl hover:drop-shadow-xl text-white rounded-full p-3"
                >
                  <BiTaskX/>
                </button>
                <div>
                  <p className="text-md font-semibold mt-3">Sleep at least 8 hr</p>
                </div>
              </div>
              <p className="mt-3">Incomplete</p>
            </div>

          </div>

        </div>
        <div className="rbox4">
          <div className="flex justify-between">
            <p className="text-xl font-semibold">Daily Activities</p>
            <button type="button" className="text-xl font-semibold text-gray-500">
              <IoIosMore/>
            </button>
          </div>
          <div className="mt-10">
            <img
              className="md:w-96 h-50 "
              src={hike}
              alt=""
            />
            <div className="mt-8">
              <p className="font-semibold text-lg">Why you need to go Hiking</p>
              <p className="text-gray-400 ">By Colbert Jan</p>
              <p className="mt-4 text-sm text-gray-400">
                Feel stressed? Get away from the hustle and bustle of daily life and
                experience the breathtaking beauty of nature and the fresh air.
              </p>
              <div className="mt-3">
                <button> Read More</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
