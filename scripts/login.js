
Creds = {
    "Talha" : "12345",
    "Hamza" : "45678",
}

//Triggering on Submit of Our loginForm
document.getElementById("loginForm").addEventListener('submit', function(event){
        event.preventDefault();

        //Getting Data Through FormData
        let data = new FormData(event.target)

     
        //Converting it in Json/Object
        let Fdata = {}
        for (let [key,value] of data.entries()){
            Fdata[key] = value
        }

        //Checking if they match with the Registered User Credentials!
        let flag = false
        for (let key of Object.keys(Creds)){
            if(Fdata["username"]==key){
                if(Fdata["password"]==Creds[key]){
                    flag = true
                }
            }
        }
        
        //If Yes LogIn else Error!
        if(flag){
            console.log("loginSuccessfull");
            const date = new Date();
            date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000));
            const expires = `expires=${date.toUTCString()}`;
            document.cookie = `${"SessionCookie"}=${Fdata['username']}; ${expires}; path=${'/'};`;
            window.location.href = "index.html"

        }else{
            console.log("Wrong Credentials!");
            
        }
        
        
        
        
        

})
