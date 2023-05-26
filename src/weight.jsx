import React, {useEffect, useState, useCallback} from 'react';
import axios from 'axios';
import {
  Category, ChartComponent, ColumnSeries, Inject, Legend, LineSeries,
  SeriesCollectionDirective, SeriesDirective, SparklineComponent, SparklineTooltip, Tooltip
} from '@syncfusion/ej2-react-charts';
import {calculateBMI} from './util';
import DSdata from './rdata/dsweight.json';
import "./App.css";
import "./pages.css";

const Weight = () => {
  const [curr, setcurr] = useState([]);
  const [weight_val, set_weight_val] = useState(null);
  const [weight_unit, set_weight_unit] = useState("lb");
  const [date_val, set_date_val] = useState(null);

  const [weightVal, setWeightVal] = useState("");
  const [heightVal, setHeightVal] = useState("");
  const [weightUnit, setWeightUnit] = useState("lb");
  const [heightUnit, setHeightUnit] = useState("in");
  const [bmi, setBMI] = useState(null);


  const handleSubmit = (event) => {
    event.preventDefault();
    const roundedBMI = calculateBMI(weightVal, weightUnit, heightVal, heightUnit);
    setBMI(roundedBMI);
  };


  function getcurr() {
    axios({
      method: "GET",
      url: "/dbweights/",
      params: {type: localStorage.getItem('user')},
    }).then(response => {
      setcurr(response.data);
      //console.log("after setting");
      //console.log(response.data.results);
      //console.log(response.data);
    })
      .catch(error => console.log(error));
  }


  function putval() {
    axios({
      method: "POST",
      url: "/dbweights/",
      data: {
        UserID: localStorage.getItem('user'),
        weight_val: parseInt(weight_val),
        time: Date.now(),
        unit: weight_unit,
      }
    })
      .then((response) => {
        getcurr()
      })
  }


  useEffect(() => {
    getcurr()
    //setcurr(DSdata);
  }, [])

  useEffect(() => {
    if (curr.length > 0) {
      // Set the default value of weightVal here
      setWeightVal(curr[0].weight_val.toString());
    } // Don't use defaultValue to the field, as it gets fill before getcurr()
  }, [curr]);


  return (
    <div className="">
      <div className="w-4/5 mx-auto bg-white m-3 p-4 rounded-2l">

        <label className="flex font-semibold justify-center text-teal-500 text-2xl">Weights Trend</label>


        <div className="flex mt-4 justify-center">
          <ChartComponent id='cal' dataSource={curr}
                          width='700px' height='80%' tooltip={{enable: true}}>
            <Inject services={[ColumnSeries, Tooltip, Legend, LineSeries, Category]}/>
            <SeriesCollectionDirective>
              <SeriesDirective xName='id' type='Line' yName='weight_val'
                               width='2' name='Weights' marker={{visible: true, width: 5, height: 5}}/>
            </SeriesCollectionDirective>
          </ChartComponent>
        </div>


      </div>


      <div className="widfixed8 mt-8 flex mx-auto">
        <div className="flex w-1/2">
          <div className="flex flex-col mx-auto items-center
          rounded-2xl justify-center border-gray-50
           mt-5 mb-5 px-5 py-8 shadow-md cyanpad">
            <h1 className="text-4xl mt-1 mb-3 font-bold minorheadgwof border-b border-dashed border-gray-300">Add
              Data</h1>
            <div className="flex flex-col mt-3 mb-2">
              <label htmlFor="weight" className="font-medium mb-1 darkgreent1">
                Weight:
              </label>

              <div className="flex space-x-2 mt-1.5 mb-2">
                <input
                  type="number"
                  step="0.1"
                  className="py-1.5 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  placeholder="Enter weight"
                  value={weight_val}
                  onChange={(e) => {
                    set_weight_val(e.target.value)
                  }}
                />
                <input
                  type="text"
                  className="py-1.5 border border-gray-300 rounded focus:outline-none focus:border-blue-500 w-16"
                  placeholder="Unit"
                  defaultValue="lb"
                  value={weight_unit}
                  onChange={(e) => {
                    set_weight_unit(e.target.value)
                  }}
                />

              </div>

              <label htmlFor="weight" className="font-medium mb-0.5 darkgreent1">
                Date:
              </label>

              <div className="flex space-x-2 mt-1 mb-2">
                <input
                  type="date"
                  step="0.1"
                  className="py-1.5 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  value={date_val}
                  onChange={(e) => {
                    set_date_val(e.target.value)
                  }}
                />

              </div>


              {/*mt-2 py-1 px-1 pb-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600*/}

              <button
                className="mt-2 py-1.5 font-semibold mybtnb1"
                onClick={putval}
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        <div className="mx-auto">
          <form onSubmit={handleSubmit} className="mx-auto rounded-2xl px-4 py-4 mt-4 mb-4
      justify-center border-gray-50 shadow-md cyanpad">
            <h1 className="text-4xl font-bold minorheadgwof border-b border-dashed border-gray-300">BMI Calculator</h1>
            <div className="flex flex-col justify-center">
              <div className="mt-4 mb-4">
                <label htmlFor="weight" className="block font-medium mb-1 darkgreent1">
                  Weight:
                </label>
                <div className="flex items-center">
                  <input
                    type="number"
                    id="weight"
                    value={weightVal}
                    onChange={(e) => {
                      setWeightVal(e.target.value)
                    }}
                    className="w-1/2 appearance-none border border-gray-300 rounded py-1.5 px-3 mr-2 leading-tight focus:outline-none focus:border-blue-500"
                  />
                  <select
                    value={weightUnit}
                    onChange={(e) => {
                      setWeightUnit(e.target.value)
                    }}
                    className="border border-gray-300 rounded bg-white py-1.5 px-3 appearance-none leading-tight focus:outline-none focus:border-blue-500"
                  >
                    <option value="lb">lb</option>
                    <option value="kg">kg</option>
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="height" className="block font-medium mb-1 darkgreent1">
                  Height:
                </label>
                <div className="flex items-center">
                  <input
                    type="number"
                    id="height"
                    value={heightVal}
                    onChange={(e) => {
                      setHeightVal(e.target.value)
                    }}
                    className="w-1/2 appearance-none border border-gray-300 rounded py-1.5 px-3 mr-2 leading-tight focus:outline-none focus:border-blue-500"
                  />
                  <select
                    value={heightUnit}
                    onChange={(e) => {
                      setHeightUnit(e.target.value)
                    }}
                    className="border border-gray-300 bg-white rounded py-1.5 px-3 appearance-none leading-tight focus:outline-none focus:border-blue-500"
                  >
                    <option value="in">in</option>
                    <option value="cm">cm</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="mt-2 py-1.5 mb-2 font-semibold mybtnb1"
              >
                Calculate BMI
              </button>
            </div>
          </form>

        </div>
      </div>

      <div className="flex mx-auto items-center rounded-2xl justify-left
       border-gray-50 bg-white shadow-md w-3/4 ">
        {bmi && (
          <div className="py-1 ml-5">
            <h2 className> Your BMI: </h2>
            {bmi}
          </div>
        )}
      </div>

      <div className="flex mt-4 mx-auto items-center rounded-2xl justify-left
       border-gray-50 bg-white shadow-md w-3/4 ">
        {bmi && (
          <div className="py-1 ml-5">
            {bmi <= 18.5 && <p>Underweight</p>}
            {bmi > 18.5 && bmi <= 24.9 && <p>Healthy Weight</p>}
            {bmi > 24.9 && bmi <= 29.9 && <p>Overweight</p>}
            {bmi > 29.9 && <p>Obesity</p>}
          </div>
        )}
      </div>


      <div className="flex mt-4 mx-auto items-center rounded-2xl justify-left
       border-gray-50 bg-white shadow-md w-3/4 ">
        {bmi && (
          <div className="py-1 ml-5">
            {bmi <= 18.5 && <p>You fall into the underweight range (less than 18.5).
              Being underweight indicates that you have a lower body weight in relation
              to your height. This may suggest insufficient body fat and muscle mass,
              which can have potential health risks. Underweight individuals may be more
              prone to nutrient deficiencies, weakened immune system, osteoporosis,
              and other related complications.</p>}
            {bmi > 18.5 && bmi <= 24.9 && <p>You fall within the healthy weight range (18.5 to less than 25).
              This range is generally associated with a balanced body composition, indicating
              that your weight is proportionate to your height. Maintaining a healthy weight
              can contribute to overall well-being and lower the risk of certain health
              conditions, such as cardiovascular diseases, diabetes, and certain types of cancer.</p>}
            {bmi > 24.9 && bmi <= 29.9 && <p>You fall within the overweight range. (25.0 to less than 30)
              Being overweight means that you have excess body weight relative to your height.
              It can be an indication of higher body fat levels and can increase the risk of
              various health issues, including heart disease, high blood pressure, type 2 diabetes,
              certain cancers, and musculoskeletal problems.</p>}
            {bmi > 29.9 && <p>You fall within the obesity range.(30.0 or higher)
              Obesity is characterized by having an excessive amount of body fat in
              relation to your height. It is associated with a significantly increased
              risk of several chronic conditions, including cardiovascular diseases,
              stroke, type 2 diabetes, certain cancers (such as breast, colon, and kidney
              cancer), sleep apnea, osteoarthritis, and mental health disorders. Obesity
              is generally considered a serious health concern that requires attention and
              lifestyle changes to reduce the associated risks.</p>}
          </div>
        )}
      </div>

    </div>
  );
};
export default Weight;


//<p>Here is list of all values</p>
//{curr && curr.map(item => (
//  <p>{item.UserID}: {item.weight_val} - {item.unit}</p>
//))}
