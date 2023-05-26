import React, {useEffect, useState, useCallback, useRef} from 'react';
import {FiEdit} from "react-icons/fi"
import {RiSave3Line} from "react-icons/ri"
import {GiCancel} from "react-icons/gi"
import {AiFillFileAdd, AiFillDelete} from "react-icons/ai"
import { useStateContext } from '../contexts/ContextProvider';
import "./pages.css"
import {
    Category,
    ChartComponent,
    ColumnSeries,
    Inject,
    Legend,
    Tooltip,
    LineSeries,
    SeriesCollectionDirective, SeriesDirective
} from "@syncfusion/ej2-react-charts";
import axios from "axios";



const Walking = () => {
  const [Data, setData] = useState([]);
  const [AData, setAData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [x1, setx1] = useState('');
  const [x2, setx2] = useState('');
  const [x3, setx3] = useState('');
  const [x4, setx4] = useState('');
  const [fid, setfid] = useState('');
  const [EditRow, setEditRow] = React.useState(null);
  const [ReadyEdit, setReadyEdit] = React.useState(null);
  const windowRef = useRef(null);

  useEffect(() => {
      getcurr()
  } ,[])


  function getcurr(){
    axios({
          method: "GET",
          url:"/dbwalking/",
          params: { type: localStorage.getItem('user') },
        }).then(response => {
        setData(response.data);
        setAData(response.data);
        console.log(response.data.results);
        console.log(response.data);
      })
      .catch(error => console.log(error));
  }


  function editcurr(){
    axios({
          method: "PATCH",
          url:"/dbwalking/",
          params: { type: localStorage.getItem('user') },
        }).then(response => {
        setData(response.data);
        console.log(response.data.results);
        console.log(response.data);
      })
      .catch(error => console.log(error));
  }


  const Deletecurr = () => {
      if (fid !== ""){
                axios({
      method: 'DELETE',
      url: "/dbwalking/",
      params: {
        id: fid,
        type: localStorage.getItem('user')
      },

    })
      .then((response) => {
        console.log("Deleting ID: ", fid);
        setEditRow(null);
        setReadyEdit(null);
        setfid("");
        getcurr();
      })
      .catch((error) => console.log(error));

      }
};

  const handleSubmit = () => {
      axios({
          method: "POST",
          url:"/dbwalking/",
          data:{
            UserID: localStorage.getItem('user'),
            Walking_val: parseFloat(x1),
            time: x2,
            Steps: parseInt(x3),
            unit: x4,
           }
        })
        .then((response) => {
           setx1('');
           setx2('');
           setx3('');
           setx4('');
           setIsOpen(false);
           setfid("");
           setReadyEdit(null);
           setEditRow(null);
           getcurr();
        })
      .catch((error) => console.log(error));



  };

  const handleOverlayClick = (event) => {
    if (event.target === windowRef.current) {
      setIsOpen(false);
    }
  };


const ListItem = React.memo(({ val, item, editable, onFieldChange }) => {
  const handleFieldChange = (event, fieldName) => {
    const updatedItem = { ...item, [fieldName]: event.target.value };
    onFieldChange(updatedItem);
  };

  const handlebox = (index) => {
      if (ReadyEdit === index){
          setReadyEdit(null);
      }
      else{
        console.log("Checkbox sets Ready row ", index);
        setReadyEdit(index);
        console.log(Data);
        console.log(Data[index]);
        setfid(Data[index].id);
      }

  };
  if (editable===true){
      return(
      <div className="flex items-center justify-between border-b">
      <input
        type="text"
        value={item.UserID}
        onChange={(e) => handleFieldChange(e, 'UserID')}
      />
      <input
        type="text"
        value={item.Walking_val}
        onChange={(e) => handleFieldChange(e, 'Walking_val')}
      />
      <input
        type="text"
        value={item.time}
        onChange={(e) => handleFieldChange(e, 'time')}
      />
      <input
        type="text"
        value={item.Steps}
        onChange={(e) => handleFieldChange(e, 'Steps')}
      />


        <div>
          <input type="checkbox"  checked={ReadyEdit === val} onChange={() => handlebox(val)} />
        </div>
      </div>

      );
  }

  else{
        return (
    <div className="flex items-center justify-between py-2 border-b">
      <div className="flex-1">{item.time}</div>
      <div className="flex-1">{item.Walking_val}</div>
      <div className="flex-1">{item.unit}</div>
      <div className="flex-1">{item.Steps}</div>

    <div>
        <input type="checkbox"  checked={ReadyEdit === val} onChange={() => handlebox(val)} />
    </div>
    </div>
  );
  }
});



  const handleEdit = () => {
      if (ReadyEdit !== null) {
        setEditRow(ReadyEdit);
        setfid(Data[ReadyEdit].id);
        setReadyEdit(null);
        console.log("NOW", EditRow);
      }
  };


  const handleCancel = () => {
      setAData(Data);
      setReadyEdit(null);
      setEditRow(null);
      setx1("");
      setx2("");
      setx3("");
      setx4("");
      setfid("");
  };



  const handleFieldChange = (updatedItem) => {
    setAData((prevAData) =>
      prevAData.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };



  return (
    <div>
      <div className = "flex justify-center mt-2">
        <ChartComponent id='cal' dataSource={Data}
                        width='470px' height='80%' tooltip={{ enable: true }}>
            <Inject services={[ColumnSeries, Tooltip, Legend, LineSeries, Category]}/>
            <SeriesCollectionDirective>
                <SeriesDirective xName='id' type='Line' yName='Walking_val'
                                 width = '2' name = 'Walking Distance' marker={{ visible: true, width: 5, height: 5 }}/>
            </SeriesCollectionDirective>
        </ChartComponent>
      </div>
      <div>
        <p className="ml-8 mt-8 text-blue-400 text-xl">Statistical Info</p>
        <p className="ml-8 mt-2 text-gray-500">Average</p>
        <p className="ml-8 mt-2 text-gray-500">Median</p>
        <p className="ml-8 mt-2 text-gray-500">Average</p>
        <p className="ml-8 mt-2 text-gray-500">Standard Deviation</p>
      </div>

      <div className="mx-auto py-4 w-4/5">
      <div className="flex items-center justify-between font-bold">
        <div className="flex-1">Date</div>
        <div className="flex-1">Distance</div>
        <div className="flex-1">Unit</div>
        <div className="flex-1">Steps</div>
        <div></div>
      </div>
      {AData.map((item, index) => (
        <ListItem
          val={index}
          item = {item}
          editable={index === EditRow}
          onFieldChange={handleFieldChange}
        />
      ))}
      <div className="mt-4 flex flex-col justify-end">
        <div className="flex justify-end">
          <button className="flex mr-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
                  onClick={handleEdit}>

              <div className="mt-0.5"><FiEdit/></div>
              <p className="ml-2">Edit</p>

          </button>
          <button className="mr-2 px-4 py-2 bg-green-500 text-white rounded-lg">
            <div className="flex justify-between">
                <div className="mt-1"><RiSave3Line/></div>

              <p className="ml-2" onClick={handleSubmit}>Save</p>

            </div>

          </button>
          <button className="flex px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={handleCancel}>
              <div className="mt-1"><GiCancel/></div>

              <p className="ml-2">Cancel</p>
          </button>
        </div>
        <div className="mt-2 flex justify-end">
            <div>
      <button onClick={() => setIsOpen(true)} className="flex px-6 py-2 mr-6 bg-blue-500 text-white rounded-xl">

          <div className="mt-1"><AiFillFileAdd/></div>
                <p className="ml-2">Add data</p>
      </button>
      {isOpen && (
        <div
          ref={windowRef}
          className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
          onClick={handleOverlayClick}
        >
          <div className="bg-white rounded  shadow-lg  w-1/3 h-1/2">
            <div className="flex flex-col h-full">

                <div className="flex py-1 flex-row-reverse myBlock1">
                    <button onClick={() => setIsOpen(false)} className="  mr-1 text-gray-500 hover:text-gray-700">
                      X
                    </button>
                </div>
                <p className="text-xl mt-2 mx-auto font-semibold">Add Data</p>

            <div className="mt-6 mx-auto w-4/5">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label  className="block mb-2 font-medium">Date:</label>
                  <input
                    type="text"
                    value={x2}
                    onChange={(e) => setx2(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
              </div>

                <div className="mb-4">
                  <label  className="block mb-2 font-medium">Walking distance:</label>
                  <input
                    type="text"
                    value={x1}
                    onChange={(e) => setx1(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>

                <div className="mb-4">
                  <label  className="block mb-2 font-medium">Steps:</label>
                  <input
                    type="text"
                    value={x3}
                    onChange={(e) => setx3(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
              </div>
              <div className="mb-4">
                  <label className="block mb-2 font-medium">Unit:</label>
                  <input
                    type="text"
                    value={x4}
                    placeholder="e.g. mi/km"
                    onChange={(e) => setx4(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
              </div>

              <div className="flex justify-end">
                <button type="submit" className="myButton1 rounded"
                        >Add</button>
              </div>
              </form>
            </div>

            </div>



          </div>
        </div>
      )}
    </div>
            <button className="flex ml-1 mr-4 px-4 py-2 bg-red-500 text-white rounded-lg"
            onClick={Deletecurr}
            >

                <div className="mt-1"><AiFillDelete/></div>
                <p className="ml-2">delete</p>

            </button>

        </div>
      </div>
    </div>





      </div>

  );
};
export default Walking;
//
//<svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M12.293 10l4.146-4.147a.5.5 0 0 0-.708-.708L11.586 9 7.439 4.854a.5.5 0 0 0-.708.708L10.293 10l-4.147 4.146a.5.5 0 1 0 .708.708L11.586 11l4.146 4.147a.5.5 0 0 0 .708-.708L12.293 10z"
//                 />
//</svg>