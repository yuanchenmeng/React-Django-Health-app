import React, {useEffect, useState, useCallback} from 'react';



const Bar = () =>{

    const [inputWidth, setInputWidth] = useState('');

    const handleInputChange = (e) => {
      setInputWidth(e.target.value);
    };

    const divStyle = {
      width: inputWidth ? `${inputWidth}px` : 'auto',
    };


    const percentFilled = 75;


    const ProgressBar = ({ percent }) => {
  return (
    <div className="mt-4 w-1/2 h-8  bg-gray-200 rounded-xl overflow-hidden">
      <div
        className="h-full bg-green-500"
        style={{ width: `${percent}%` }}
      >
          <div className="flex justify-end">
              <div className="semi-bold mt-1 mr-1">
                  {percent} %

              </div>


          </div>

      </div>
    </div>
  );
};


    return(

        <div>
              <div>
      <input
        type="text"
        value={inputWidth}
        onChange={handleInputChange}
        placeholder="Enter width"
      />
      <div className="bg-amber-200" style={divStyle}>
        D
      </div>
    </div>

          <div className="flex items-center justify-center">
              <ProgressBar percent={percentFilled}/>
          </div>

        </div>


    )



};
export default Bar;


//
//      <div>
//             <h1>My Slide Shower</h1>
//             <SlideShower slides={slides} />
//       </div>

