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
        if(!response.ok){
            const error = new Error(responseData.message || 'Failed to fetch!');
            throw error;
        }
        const accounts = {
            results:[],
            offset:null,
            total:null
        };
        for(const key in responseData.results){
            const account = {
                id: responseData.results[key].id + '',
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
        const response = await fetch(url);
        const responseData = await response.json();
        if(!response.ok){
            //...
        }
        const accounts = {
            results:[],
        };
         const account = {

             id: responseData.result.id + '',
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
        accounts.total = accounts.results.length;
        context.commit('searchAccountsId', accounts);
    },

    // Search Account for Name
    async searchAccountsName(context, data){
        const searchName = data;
        const url = new URL(`https://simplear.js-software.com/accounts/search.json`);
        if(searchName.length > 6){
            url.searchParams.append('fullName', searchName);
        } else {
            url.searchParams.append('shortName', searchName); 
        }
        const response = await fetch(url);
        const responseData = await response.json();
        if(!response.ok){
            //...
        }
        const accounts = {
            results:[],
            offset:null,
            total:null
        };
        for(const key in responseData.results){
            const account = {
                id: responseData.results[key].id + '',
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
        
        context.commit('searchAccountsName', accounts);
    },

    //delete Account
    async deleteAccountId(_, data){
        const id = data;
        const response = await fetch(`https://simplear.js-software.com/accounts/${id}.json`, {
            method: 'DELETE',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },            
        });   
        // const responseData = await response.json(); 
        
        if(!response.ok){
            //error ...
        }   
    },


    //Update Account
        async updateAccounts(_, data){
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
            const id = data.id;
            const response = await fetch(`https://simplear.js-software.com/accounts/${id}.json`, {
                method: 'PUT',
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

        
};