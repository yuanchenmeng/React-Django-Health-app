import React, {useEffect, useState, useCallback} from 'react';
import food_data from "./res/food_data.json";
import ex_data from "./res/ex_data.json";
import {json_prepend_index} from "./util";

import {
  Category,
  ChartComponent,
  ColumnSeries,
  Inject,
  Legend,
  LineSeries,
  SeriesCollectionDirective, SeriesDirective
} from "@syncfusion/ej2-react-charts";
import axios from "axios";


const Calorie = () => {
  const [Data, setData] = useState('');

  const [foods, setFoods] = useState([]);
  const [uniqueTypes, setUniqueTypes] = useState(new Set());
  const [selectedType, setSelectedType] = useState('');
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState('');
  const [quantity, setQuantity] = useState(1);

  const [selectedexer, setselectedexer] = useState('');
  const [quantity2, setQuantity2] = useState(1);

  const [val_in, set_val_in] = useState(0);
  const [val_out, set_val_out] = useState(0);

  const primaryxAxis = {valueType: 'Category'};

  useEffect(() => {
    setFoods(food_data);
    const types = new Set(food_data.map(food => food.type));
    setUniqueTypes(types);
    getcurr();
  }, []);

  useEffect(() => {
    const filteredResults = foods.filter(food =>
      food.type.startsWith(selectedType)
    );
    setFilteredFoods(filteredResults);
  }, [selectedType, foods]);


  const Handle_add_food = () => {
    foods.map((item, index) => {
      if (item.name === selectedFood) {
        set_val_in(parseInt(val_in + item.unit_calorie * quantity));
      }
      setSelectedType('');
      setSelectedFood('');
      setQuantity(1);
      return val_in;
    })
  };

  const Handle_add_exe = () => {
    ex_data.map((item, index) => {
      if (item.name === selectedexer) {
        set_val_out(parseInt(val_out + item.val * (quantity2 / 60.0)));
      }
      setQuantity2(1);
      setselectedexer('');
      return val_out;
    })
  };


  function getcurr() {
    axios({
      method: "GET",
      url: "/dbcalorie/",
      params: {type: localStorage.getItem('user')},
    }).then(response => {
      setData(json_prepend_index(response.data));
      //console.log(response.data);
    })
      .catch(error => console.log(error));
  }


  const Handle_confirm = () => {
    if (val_out !== 0 && val_in !== 0) {
      axios({
        method: "POST",
        url: "/dbcalorie/",
        data: {
          UserID: localStorage.getItem('user'),
          in_val: parseInt(val_in),
          out_val: parseInt(val_out),
        }
      })
        .then((response) => {
          getcurr();
        })
        .catch((error) => console.log(error));
    }
  };


  return (
    <div>

      <label className="flex mt-3 font-semibold justify-center text-teal-500 text-2xl">Net Calorie</label>
      <div className="flex mx-auto justify-center mt-3 mb-2">
        <ChartComponent id='charts' primaryXAxis={primaryxAxis} dataSource={Data}
                        width='470px' height='80%'>
          <Inject services={[ColumnSeries, Legend, LineSeries, Category]}/>
          <SeriesCollectionDirective>
            <SeriesDirective xName='index' type='Column' yName='in_val' name='Calorie Intake'/>
            <SeriesDirective xName='index' type='Column' yName='out_val' name='Calorie Burned'/>
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>

      <div className="mt-3 mx-auto items-center justify-center w-1/2 greenpad0">
         <span className="padsubblock1">
              <h4 className="padtextupper">Calories in</h4>
              <span className="padtextlower">{val_in}</span>
         </span>
        <span className="padsubblock2">
            <h4 className="padtextupper">Calories out</h4>
            <span className="padtextlower">{val_out}</span>
        </span>
      </div>


      <div className="flex w-4/5 mt-5 mx-auto">
        <div className="w-1/2 ">
          <h2 className="ml-2 minorheadg">Add New Food Item</h2>
        </div>

        <div className="w-1/2">
          <h2 className="ml-2 minorheadg">Add New Exercise Item</h2>
        </div>
      </div>


      <div className="flex w-4/5 mx-auto ">
        <div className="flex w-1/2 px-2 py-1 borderblkr">

          <div className="container ">
            <label htmlFor="food-type" className="block mb-2 text-base font-medium darkgreent1">
              Select Food Type:
            </label>
            <select
              id="food-type"
              className="p-1.5 border border-gray-300 rounded"
              value={selectedType}
              onChange={event => setSelectedType(event.target.value)}
            >
              <option value="">All</option>
              {[...uniqueTypes].map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <label htmlFor="selected-food" className="block mt-4 mb-2 text-base font-medium darkgreent1">
              Select Food:
            </label>
            <select
              id="selected-food"
              className="p-1.5 border border-gray-300 rounded"
              value={selectedFood}
              onChange={(event) => {
                setSelectedFood(event.target.value)
              }}
            >
              <option value="">All</option>
              {filteredFoods.map((food, index) => (
                <option key={index} value={food.name}>
                  {food.name}
                </option>
              ))}
            </select>

            {selectedFood !== '' && (
              <div className="mt-1">
                <label>Serving Info:

                  {filteredFoods.map((food, index) => {
                    if (food.name === selectedFood) {
                      return <label>{food.serving_info}</label>;
                    } else {
                      return null;
                    }
                  })}
                </label>
              </div>
            )}


            <label htmlFor="quantity" className="block mt-1 mb-2 text-base font-medium darkgreent1">
              Serving Size:
            </label>
            <input
              id="quantity"
              type="number"
              className="p-1.5 border border-gray-300 rounded w-1/3"
              min="0"
              step="0.1"
              value={quantity}
              onChange={event => {
                setQuantity(Number(event.target.value));
              }}
            />

          </div>

          <div className="ml-2 container flex flex-col">
            <label className=" ml-1 mt-2 font-extralight text-sm darkgreent1"> Add current food item </label>
            <button className="w-4/5 mt-2 py-0.5 mybtnb0"
                    onClick={Handle_add_food}
            >Add
            </button>
            <label className=" ml-1 mt-3 font-extralight text-sm darkgreent1"> Submit All items as today's calorie
              intake</label>
            <button className="w-4/5 mt-2 py-0.5 mybtnb0"
                    onClick={Handle_confirm}
            >Confirm
            </button>
          </div>

        </div>

        <div className="flex w-1/2 px-2 py-2 ">
          <div className="container">
            <label htmlFor="exer-type" className="block mb-2 text-base font-medium darkgreent1">
              Select Exercise Type:
            </label>
            <select
              id="exer-type"
              className="p-1.5 border border-gray-300 rounded"
              value={selectedexer}
              onChange={event => setselectedexer(event.target.value)}
            >
              <option value="">Select</option>
              {ex_data.map((item, index) => (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>

            <label htmlFor="quantity2" className="block mt-4 mb-2 text-base font-medium darkgreent1">
              Exercise Duration:
            </label>
            <input
              id="quantity2"
              type="number"
              className="p-1.5 border border-gray-300 rounded w-1/3"
              min="0"
              step="0.1"
              value={quantity2}
              onChange={event => {
                setQuantity2(Number(event.target.value));
              }}
            />
            <label className="ml-2">Min</label>


          </div>
          <div className="container flex flex-col">
            <label className=" ml-1 mt-2 font-extralight text-sm darkgreent1"> Add current exercise item </label>
            <button className="w-4/5 mt-2 py-0.5 mybtnb0"
                    onClick={Handle_add_exe}
            >Add
            </button>
            <label className=" ml-1 mt-3 font-extralight text-sm darkgreent1"> Submit All items as today's calorie
              burned</label>
            <button className="w-4/5 mt-2 py-0.5 mybtnb0"
                    onClick={Handle_confirm}
            >Confirm
            </button>
          </div>

        </div>
      </div>

    </div>

  );
};
export default Calorie;


