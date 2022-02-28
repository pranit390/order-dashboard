
import '../css/App.css'
function DashboardTable(props){

return(

    <div class="main">

<table class="table" >
  <thead class="thead-dark">
    <tr> 
      <th scope="col">orderID</th>
      <th scope="col">CustomerID</th>
      <th scope="col">DeliveryPincode</th>
      <th scope="col">OrderDate</th>
      <th scope="col">Items</th>
    </tr>
  </thead>
  <tbody>
  {props.parsedCsvData &&
    props.parsedCsvData.map((parsedData, index) => (
      <tr key={index}>
        <td>{parsedData.orderId}</td>
        <td>{parsedData.customerId}</td>
        <td>{parsedData.deliveryPincode}</td>
        <td>{parsedData.orderDate}</td>
        <td>{parsedData.items.split(';').map((item)=><li>{item}</li>)}</td>
        </tr>
    ))}
   
  </tbody>
</table>

    </div>

)

}
export default DashboardTable