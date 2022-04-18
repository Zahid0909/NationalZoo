let items = {
    duration : [0,250,500,1000],
    extras : [5000,500]
}
var adultsNumber = 0;
var childrenNumber = 0;

function calculateCost(){
    var duration_price = items["duration"];
    var extra_price = items["extras"];

    var totalValue = 0;

    var tType = document.getElementById("txtTicket").value;
    
    var duration = document.getElementById("duration").value;
    var numOfAdults = document.getElementById("nAdults").value;
    var numOfChildren = document.getElementById("nChildren").value;
    var aPasses = document.getElementById("annualP").value;
    var fTokens = document.getElementById("fTokens").value;
if(numOfAdults || numOfChildren){
    if(tType == ""){
        alert("Please choose the Ticket Type.");
        document.getElementById("txtTicket").focus();
        return;
    }
    if(duration ==""){
        alert("Please choose a Duration.")
        document.getElementById("duration")
        return;
    }
}
    if(numOfAdults == ""){
        numOfAdults = 0;
    }
    else{
        numOfAdults=parseInt(numOfAdults);
    }
    if(numOfAdults<0){
       alert("Enter a valid integer for Adults.")
    }
    if(numOfChildren == ""){
       numOfChildren = 0;
    }
    else{
        numOfChildren=parseInt(numOfChildren);
    }
     if(numOfChildren<0){
        alert("Enter a valid integer for Children.")
    }
    if(aPasses == ""){
        aPasses = 0;
    }
    else{
        aPasses=parseInt(aPasses);
    }

    if(fTokens == ""){
        fTokens = 0;
    }
    else{
        fTokens=parseInt(fTokens);
    }
    totalPrice = 0;
    tType = parseInt(tType);
    if (tType == 0){
        totalPrice = (numOfAdults*1000) + (numOfChildren*500);
    }
    else if(tType==1){
    totalPrice = (numOfAdults*500) + (numOfChildren*250);    
    }
    else if(tType==2){
        totalPrice = (numOfAdults*5000) + (numOfChildren*2500);
    }

    if (duration!= ""){
        
        totalPrice = totalPrice + duration_price[duration];
    }
    totAnnu = aPasses* extra_price[0];
    totFoodT = fTokens* extra_price[1];

    totalValue = parseFloat(totalPrice + totAnnu + totFoodT);
    document.getElementById("spCost").innerHTML = totalValue.toFixed(2);

    adultsNumber =  numOfAdults ;
    childrenNumber = numOfChildren ;
}
function extras(){
    var divExtras = document.getElementById("divExtras");
    divExtras.style.display = optional.checked? "block" : "none";
}
function addToOrder(){

    var cost = parseFloat(document.getElementById("spCost").innerHTML);
    if(cost == 0){
        alert("Please choose a valid Ticket Type as well as the Duration and no of Tickets to proceed.");
        return;
    }
        
    document.getElementById("divOrder").style = "display : block";

    var grand_total = parseFloat(document.getElementById("fTotal").innerHTML);

    var ctrl_tType = document.getElementById("txtTicket");
    var ticket_price_name = ctrl_tType.options[ctrl_tType.selectedIndex].text;
   
    var ctrl_duration_price = document.getElementById("duration");
    var duration_price_name = ctrl_duration_price.options[ctrl_duration_price.selectedIndex].text;
    /*Adding Rows to the table body*/
    var tbody = document.getElementById("tbody_order");
    var trow = tbody.insertRow(-1);

    td1 = trow.insertCell(0);
    td1.innerHTML = ticket_price_name;

    td2 = trow.insertCell(1);
    td2.innerHTML = document.getElementById("nAdults").value;

    td3 = trow.insertCell(2);
    td3.innerHTML = document.getElementById("nChildren").value;

    td4 = trow.insertCell(3);
    td4.innerHTML = duration_price_name;

    td5 = trow.insertCell(4);
    td5.innerHTML = document.getElementById("annualP").value;

    td6 = trow.insertCell(5);
    td6.innerHTML = document.getElementById("fTokens").value;

    var total = parseFloat(document.getElementById("spCost").innerHTML);
    grand_total = grand_total + total;

    td7 = trow.insertCell(6);
    td7.innerHTML = total.toFixed(2);

    td8 = trow.insertCell(7);
    td8.innerHTML = "<a href='javascript:void(0)' style='color:red;font-weight:bold' onclick='removeRecord(this.parentElement);'>X</a>";

    document.getElementById("fTotal").innerHTML = grand_total.toFixed(2);
  
calcLoyaltyPoints()    
resetPurchaseForm();
    extras() 
}
function removeRecord(item){
    var result = confirm("Do you want to remove this record ?");
    
    if(result == true){
        var table = document.getElementById("tbl_order");
        var grand_total = parseFloat(document.getElementById("fTotal").innerHTML);
        var total = parseFloat(item.parentElement.cells[6].innerHTML);
        grand_total = grand_total - total;
        document.getElementById("fTotal").innerHTML = grand_total.toFixed(2);
        table.deleteRow(item.parentElement.rowIndex);
    }
   
}
function placeOrder(){
    var grand_total = document.getElementById("fTotal").innerHTML;
    if(grand_total>0){
        alert("Thank You for purchasing, We wish you to see again. ");
        return;
    }
    
}
function resetPurchaseForm(){
    document.getElementById("frmPurchase").reset();
    document.getElementById("spCost").innerHTML = "0.00";
}
// form.js
const formId = "frmPurchase"; 
const formDetector = `${formId}`; 
const saveButton = document.querySelector("#addToFav"); 
const retrieveButton = document.querySelector("#orderThroughFav"); 
const alertBox = document.querySelector(".alert");
let form = document.querySelector(`#${formId}`); 
let formElements = form.elements; 

 const getFormData = () => {
  let data = { [formDetector]: {} }; 
  for (const element of formElements) {
    if (element.name.length > 0) {
      data[formDetector][element.name] = element.value;
    }
  }
  return data;
};
saveButton.onclick = event => {
  event.preventDefault();
  data = getFormData();
  localStorage.setItem(formDetector, JSON.stringify(data[formDetector]));
  alert("Your order has been saved.");
  
};
 const formautoRefill = () => {
  if (localStorage.key(formDetector)) {
    const savedData = JSON.parse(localStorage.getItem(formDetector)); 
    for (const element of formElements) {
      if (element.name in savedData) {
        element.value = savedData[element.name];
      }
    }
    alert("Your order has been retrived from favourites.");
  }
};
// auto refill the form when the retreive favourite button is clicked
retrieveButton.onclick = function(){
    formautoRefill(); 
    calculateCost();

}
//Calculate loyalty points and save it in the local storage

var grand_loyaltyPoints = 0;

var loyaltyPoints =0;

var totalTicket = 0;



function calcLoyaltyPoints(){

  totalTicket = totalTicket + adultsNumber + childrenNumber;

  //alert(totalTicket);
  if(totalTicket > 3){

      loyaltyPoints = 20 * totalTicket;

      grand_loyaltyPoints = grand_loyaltyPoints + loyaltyPoints;

      localStorage.setItem("loyalty",grand_loyaltyPoints);

  }
}
/*"Check loyalty points" button,

it shows total loyalty points that have earned by the user so far based on the overall order*/

function showLoyaltyPoints(){

  grand_loyaltyPoints = JSON.parse(localStorage.getItem(`loyalty`));

  if(grand_loyaltyPoints>0){

      alert("Congratulations! You have earned "+  grand_loyaltyPoints + " loyalty points so far.");

  }

  else{

      alert("Sorry! You don't have any loyalty points so far.");

  }
}

