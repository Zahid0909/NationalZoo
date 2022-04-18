function inputValidation(){

    var name = document.getElementById("name").value;
    var address = document.getElementById("uAddress").value;
    var cdname = document.getElementById("cHName").value;
    var cdnum = document.getElementById("cNum").value;
    var cvcnum = document.getElementById("cvcNum").value;
    var exp = document.getElementById("exp").value;
    
    
    var name_pattern = /^[A-Za-z\s\.]{10,}$/;
    var add_pattern = /^[A-Za-z\d\.\-\/\#\,\s]+$/;
    var cdname_pattern = /^[A-Za-z\s\.]{10,}$/;


    if(!name.match(name_pattern)){
        if(name.length<10){
            alert("Please enter your full name with credintials to proceed.");
        }
        else{
            alert("Invalid name.");
        }
        document.getElementById("name").focus();
        return false;
    }

    if(!address.match(add_pattern)){
        alert("Invalid address.");
        document.getElementById("uAddress").focus();
        return false;
    }
    

    if(cdnum=="" || cdnum.length<19){
        alert("Invalid Card number. Please Check the Card number and try again.");
        document.getElementById("cNum").focus();
        return false;
    }

    if(!cdname.match(cdname_pattern)){
        if(cdname.length<10){
            alert("Please enter the cardholder's name according to the name which has been printed on the card.");
        }
        else{
            alert("Please enter a valid cardholder's name.");
        }
        document.getElementById("cHName").focus();
        return false;
    }

    if(exp==""){
        alert("Please Enter the card's expiry Month & Year according to the Month & Year which has been printed behind the card.");
        document.getElementById("exp").focus();
        return false;
    }


    if(cvcnum=="" || cvcnum.length<3){
        alert("Invalid CVC. Please enter a Three Digit number to continue.");
        document.getElementById("cvcNum").focus();
        return false;
    }

resetDonation();
    
}
function resetDonation(){
    document.getElementById("don").reset();
}