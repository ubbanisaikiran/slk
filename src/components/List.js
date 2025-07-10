import React, {useState} from 'react'


export default function List() {

  const [inputValue, setInputValue] = useState('');
const [itemList, setItemList] = useState([]);

const handleInput = (setting) => {
  setInputValue(setting.target.value);
}

const handleAddItem = (setting) => {
 if(inputValue.trim() !== ''){
   setItemList([...itemList,inputValue]);
  setInputValue('')
 }
}
  return (
    <div>
      <h1>Add the items to List</h1>
      <input placeholder='Enter Text' value={inputValue} onChange={handleInput}></input>
      <button onClick={handleAddItem}>Add Item</button>
      <ul>
        {itemList.map((item,index)=>(
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
}


