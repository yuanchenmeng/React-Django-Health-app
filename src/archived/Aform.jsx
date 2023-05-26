import React, {useState} from 'react';

// ListItem component
const ListItem = React.memo(({item, onFieldChange}) => {
  const handleFieldChange = (event, fieldName) => {
    const updatedItem = {...item, [fieldName]: event.target.value};
    onFieldChange(updatedItem);
  };

  return (
    <div>
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
    </div>
  );
});

// Parent component
const ParentComponent = () => {
  const [list, setList] = useState([
    {id: 1, UserID: '', Walking_val: '', time: '', Steps: ''},
    {id: 2, UserID: '', Walking_val: '', time: '', Steps: ''},
    // Add more items as needed
  ]);

  const handleFieldChange = (updatedItem) => {
    setList((prevList) =>
      prevList.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  return (
    <div>
      {list.map((item) => (
        <ListItem
          key={item.id}
          item={item}
          onFieldChange={handleFieldChange}
        />
      ))}
    </div>
  );
};

export default ParentComponent;