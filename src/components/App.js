import '../css/App.css'
import { useEffect,useState } from 'react';
import file from '../csv/seedData.csv'
import Papa from 'papaparse'
import DashboardTable from './DashboardTable';


function App() {

const [parsedCsvData, setParsedCsvData] = useState([]);
const[tabledata,setTabledata]=useState([]);
const[pincode,setPincode]=useState('');
const[date,setDate]=useState('');

const handleClick=(e)=>{
  if(e.target.className==="btn btn-outline-secondary pincode"){

setTabledata(parsedCsvData.filter((num)=>{
 
 if(num.deliveryPincode==pincode && (date===''?true:num.orderDate==date))
  return num;
}));

}
if(e.target.className==="btn btn-outline-secondary date"){

  setTabledata(parsedCsvData.filter((num)=>{
   
   if(num.orderDate==date && (pincode===''?true:num.deliveryPincode==pincode))
    return num;
  
  }));
}
if(e.target.className==="btn btn-outline-secondary all-items"){
  setTabledata(parsedCsvData);
  setDate('')
  setPincode('')
}
if(e.target.className==="btn btn-outline-secondary sort-pincode"){
  let temp=[...tabledata]
temp.sort((a,b) => (a.deliveryPincode > b.deliveryPincode) ? 1 : ((b.deliveryPincode > a.deliveryPincode) ? -1 : 0))
setTabledata(temp)
}
if(e.target.className==="btn btn-outline-secondary sort-order"){
  let temp1=[...tabledata]
  temp1.sort((a,b) =>{
    let d1 = new Date(a.orderDate);
    let d2 = new Date(b.orderDate);
     return d1.valueOf()-d2.valueOf(); 
  })
  setTabledata(temp1)
}


}

useEffect(()=>{
  Papa.parse(file, {
    header: true,
    download: true,
    complete: results => {
      setParsedCsvData(results.data)
      setTabledata(results.data)
    },
  });
 
 },[])



  return (
    <div className="App">
      
  <div className="input-group mb-3">
  <button  className="btn btn-outline-secondary pincode" onClick={(e)=>handleClick(e)} type="button" id="button-addon1">Search</button>
  <input type="text" onChange={(evt)=>setPincode(evt.target.value)} class="form-control" placeholder="Enter Pincode" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
</div>

<div className="input-group mb-3">
  <button  className="btn btn-outline-secondary date" onClick={(e)=>handleClick(e)} type="button" id="button-addon1">Search</button>
  <input type="text" title='Format:DD/MM/YYYY' onChange={(evt)=>setDate(evt.target.value)} class="form-control" placeholder="Enter Date" aria-label="Example text with button addon" aria-describedby="button-addon1"
  />
</div>

<button  className="btn btn-outline-secondary all-items" onClick={(e)=>handleClick(e)} type="button" id="button-addon1">All Items</button>
<button  className="btn btn-outline-secondary sort-pincode" onClick={(e)=>handleClick(e)} type="button" id="button-addon1">Sort By Pincode</button>
<button  className="btn btn-outline-secondary sort-order" onClick={(e)=>handleClick(e)} type="button" id="button-addon1">Sort By Order</button>
<DashboardTable parsedCsvData={tabledata}/>
    </div>
  );
}

export default App;
