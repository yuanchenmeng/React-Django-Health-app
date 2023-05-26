import React, {useEffect, useState, useCallback, useRef} from 'react';
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Legend,
  Category,
  Tooltip,
  DataLabel,
  RangeColumnSeries
} from '@syncfusion/ej2-react-charts';
import {parseData, calculate_S_Average, calculate_S_StandardDeviation, calculateSleepDuration} from "./util";
import "./pages.css";
import DSData from "./rdata/dssleep.json";

import bt1 from "./res/Bt1_f.png";
import bt2 from "./res/Bt2_f.png";
import axios from "axios";


const Sleep = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [GData, setGData] = useState([]);
  const [x1, setx1] = useState('');
  const [x2, setx2] = useState('');
  const windowRef = useRef(null);


  useEffect(() => {
    // Grab Main Data at first
    getcurr();
    //setGData(parseData(DSData));
    //console.log(DSData);

  }, [])

  useEffect(() => {
  }, [GData]);


  function getcurr() {
    axios({
      method: "GET",
      url: "/dbsleeping/",
      params: {type: localStorage.getItem('user')},
    }).then(response => {
      //console.log(response.data);
      setGData(parseData(response.data));
    })
      .catch(error => console.log(error));
  }


  const handleOverlayClick = (event) => {
    if (event.target === windowRef.current) {
      setIsOpen(false);
    }
  };


  const handleSubmit = () => {
    //Testing X1 x2 fields
    axios({
      method: "POST",
      url: "/dbsleeping/",
      data: {
        UserID: localStorage.getItem('user'),
        sleep_dur: calculateSleepDuration(x2, x1),
        start: x2 + ":00",
        end: x1 + ":00",
        unit: "H",
      }
    })
      .then((response) => {
        setx1('');
        setx2('');
        setIsOpen(false);
        getcurr();
      })
      .catch((error) => console.log(error));
  };


  const primaryxAxis = {valueType: 'Category'};
  const primaryyAxis = {minimum: 0, maximum: 24};


  return (
    <div>

      <div className="mx-auto w-2/3 ">
        <label className="mt-3 mb-2 flex font-semibold justify-center text-teal-500 text-2xl">Sleep Pattern</label>


        <div className="flex justify-center">

          <ChartComponent id='charts_sleep' primaryXAxis={primaryxAxis}
                          primaryYAxis={primaryyAxis} title='' width='700px' height='80%'>
            <Inject services={[RangeColumnSeries, Legend, Tooltip, DataLabel, Category]}/>
            <SeriesCollectionDirective>
              <SeriesDirective dataSource={GData} xName='id' low='start' high='end' type='RangeColumn'>
              </SeriesDirective>
            </SeriesCollectionDirective>
          </ChartComponent>


        </div>


      </div>

      <div className="flex-col mx-auto mt-2 w-1/2 justify-center cyanpad">
        <p className="ml-6  text-2xl italic minorheadgwof ">Statistical Info </p>
        <p className="ml-6 mt-1 font-arial text-gray-500">Average Sleep Duration: {calculate_S_Average(GData)}</p>
        <p className="ml-6 mt-2 font-arial text-gray-500">Standard Deviation of sleep
          duration: {calculate_S_StandardDeviation(GData)}</p>
      </div>


      <div className="flex mt-8 w-3/5 mx-auto justify-around ">


        <div className="flex flex-col">
          <div>
            <span className="minorheadg"> Ready to Sleep? </span>
          </div>
          <div className="insertpblock1">


            <div className="flex justify-end items-end h-full">
              <img className="mb-1 fpbt1 hover:opacity-80" onClick={() => setIsOpen(true)} src={bt1} alt=""/>
            </div>

          </div>
        </div>


        <div className="flex flex-col">
          <div>
            <span className="minorheadg"> Good Morning! </span>
          </div>
          <div className="insertpblock2">

            <div className="flex items-end h-full">
              <img className="mb-1 fpbt1 mt-24 hover:opacity-90" onClick={() => setIsOpen(true)} src={bt2} alt=""/>
            </div>

          </div>
        </div>


      </div>


      <div className>
        {isOpen && (
          <div
            ref={windowRef}
            className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
            onClick={handleOverlayClick}
          >
            <div className="bg-white rounded shadow-lg fsize0">
              <div className="flex flex-col h-full w-full ">

                <div className="flex py-1 flex-row-reverse myBlock1">
                  <button onClick={() => setIsOpen(false)} className="  mr-1 text-gray-500 hover:text-gray-700">
                    X
                  </button>
                </div>
                <p className="text-xl mt-2 mx-auto font-semibold">Add Data</p>

                <div className="mt-6 mx-auto">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label className="block mb-2 font-medium">Sleep Start Time</label>

                      <input
                        type="time"
                        value={x2}
                        onChange={(e) => setx2(e.target.value)}
                        className="relative w-full border border-gray-300 rounded px-3 py-2 focus:border-blue-500"
                      />
                      <span className="text-gray-500">Format: HH:MM AM/PM</span>
                    </div>

                    <div className="mb-4">
                      <label className="block mb-2 font-medium">Sleep End Time</label>
                      <input
                        type="time"
                        value={x1}
                        onChange={(e) => setx1(e.target.value)}
                        className="relative w-full border border-gray-300 rounded px-3 py-2 focus:border-blue-500"
                      />
                    </div>


                    <div className="flex justify-end mb-2">
                      <button type="submit" className="myButton1 rounded px-6 py-2"
                      >Add
                      </button>
                    </div>
                  </form>
                </div>

              </div>


            </div>
          </div>
        )}
      </div>


    </div>
  );
};
export default Sleep;
//
//          <p className="font-semibold">Good </p>
//           <p className="font-semibold"> Morning !</p>

