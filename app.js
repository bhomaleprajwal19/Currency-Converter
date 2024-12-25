const Base_URL="https://v6.exchangerate-api.com/v6/18238bcde19c30b62f4e83b3/pair";

const dropDowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

for(let select of dropDowns){
for(code in countryList){
 let newOption=document.createElement("option");
 newOption.innerText=code;
 newOption.value=code;
 select.append(newOption);
 if (select.name==="from"&&code==="USD") {
newOption.selected="selected";
    
 } else if (select.name==="to"&&code==="INR"){
    newOption.selected="selected";
    
 }
}
select.addEventListener("change",(evt)=>{
    updateFlag(evt.target);
})
}

const updateFlag=(element)=>{
let currCode= element.value;
let countryCode=countryList[currCode];
let newSRc=`https://flagsapi.com/${countryCode}/flat/32.png`
let img =element.parentElement.querySelector("img");
img.src=newSRc;
}


btn.addEventListener("click",async(evt)=>{
evt.preventDefault();
let amount=document.querySelector(".amount input");
let amtValue=amount.value;
if(amtValue===""||amtValue<=1){
    amtValue=1;
    amount.value="1"
}
const URL =`${Base_URL}/${fromCurr.value}/${toCurr.value}`;
let response=await fetch(URL);
let data=await response.json();
let rate=data.conversion_rate;
let finalAmount=amtValue*rate;
console.log(finalAmount);
msg.innerText=`${amtValue} ${fromCurr.value}=${finalAmount} ${toCurr.value}`;
})