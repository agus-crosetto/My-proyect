export default {

    
    //AHORA EL CODIGO QUE VI EN EL CURSO
    // Add Account
    async addAccount(_, data){
        const accountData = {
            fullName: data.fullName,
            shortName: data.shortName,
            accountTypeId: data.accountTypeId,
            addressLine1: data.addressLine1,
            addressLine2: data.addressLine2,
            city: data.city,
            state: data.state,
            country: data.country,
            contact: data.contact,
            email: data.email,
            phone: data.phone
        };
        const response = await fetch('https://simplear.js-software.com/accounts', {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(accountData)
            
        });   
        // const responseData = await response.json(); 
        
        if(!response.ok){
            //error ...
        }   
    },
    
    // Load Account
    async loadAccounts(context){
        const url = new URL('https://simplear.js-software.com/accounts/search.json');
        const response = await fetch(url);
        const responseData = await response.json();
        console.log(responseData)
        if(!response.ok){
            //...
        }
        const accounts = {
            results:[],
            offset:null,
            total:null
        };
        for(const key in responseData.results){
            console.log(key);
            console.log(responseData.results);
            const account = {
                id: responseData.results[key].id,
                shortName: responseData.results[key].shortName,
                fullName: responseData.results[key].fullName,
                accountTypeId: responseData.results[key].accountTypeId,
                addressLine1: responseData.results[key].addressLine1,
                addressLine2: responseData.results[key].addressLine2,
                city: responseData.results[key].city,
                state: responseData.results[key].state,
                country: responseData.results[key].country,
                contact: responseData.results[key].contact,
                email: responseData.results[key].email,
                phone: responseData.results[key].phone,
            };
            accounts.results.push(account);
            accounts.offset = responseData.offset;
            accounts.total = responseData.total;

        }
        
        context.commit('loadAccounts', accounts);
    },

    // Search Account for ID
    async searchAccountsId(context, data){
        const id = data.id;
        const url = new URL(`https://simplear.js-software.com/accounts/${id}.json`);
        console.log(id)
        const response = await fetch(url);
        console.log(url)
        const responseData = await response.json();
        console.log(responseData)
        if(!response.ok){
            //...
        }
        const accounts = {
            results:[],
        };
        console.log(responseData.result.id);
         const account = {

             id: responseData.result.id,
             shortName: responseData.result.shortName,
             fullName: responseData.result.fullName,
             accountTypeId: responseData.result.accountTypeId,
             addressLine1: responseData.result.addressLine1,
             addressLine2: responseData.result.addressLine2,
             city: responseData.result.city,
             state: responseData.result.state,
             country: responseData.result.country,
             contact: responseData.result.contact,
             email: responseData.result.email,
             phone: responseData.result.phone
         }
         accounts.results.push(account);
        context.commit('searchAccountsId', accounts);
    },
};

// id: '1',
// shortName: "FRED",
// fullName: "Fred's Electric",
// accountTypeId: 4,
// addressLine1: "123 ABC Street",
// addressLine2: "",
// city: "Edmonton",
// state: "Alberta",
// country: "Canada",
// contact: "Fred Spark",
// email: "sparky@fredelectric.com",
// phone: "7809876543"

//Add new account
// addAccount2(context, data){
//     const accountData = {
//         id: new Date().toISOString(),
//         shortName: data.fullName,
//         fullName: data.fullName,
//         accountTypeId: data.accountTypeId,
//         addressLine1: data.addressLine1,
//         addressLine2: data.addressLine2,
//         city: data.city,
//         state: data.state,
//         country: data.country,
//         contact: data.contact,
//         email: data.email,
//         phone: data.phone
//     };
//     fetch('https://vue-http-demo-f3d11-default-rtdb.firebaseio.com/accounts.json', {
//         method: 'POST',
//         headers:{
//          'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(accountData)
//     }).then(response =>{
//         if(response.ok){
//             //OK
//         } else {
//            throw new Error('could not save data!');
//         }
//     });    
//         context.commit('addAccount', {
//           ...accountData,
//         });        
// },

// // Search all Account
// loadAccounts2(context){
//     fetch('https://vue-http-demo-f3d11-default-rtdb.firebaseio.com/accounts.json').then(
//         (response) =>{
//             if(response.ok){
//                 return response.json();         
//             }
//         }).then((responseData) =>{
//              const accounts = [];
//              for(const key in responseData){
//                 accounts.push({
//                     id: key,
//                     shortName: responseData[key].shortName,
//                     fullName: responseData[key].fullName,
//                     accountTypeId: responseData[key].accountTypeId,
//                     addressLine1: responseData[key].addressLine1,
//                     addressLine2: responseData[key].addressLine2,
//                     city: responseData[key].city,
//                     state: responseData[key].state,
//                     country: responseData[key].country,
//                     contact: responseData[key].contact,
//                     email: responseData[key].email,
//                     phone: responseData[key].phone
//                 });
//             }
//             this.accounts = accounts;
//             context.commit('getAccounts', accounts);
//         });
       

// },