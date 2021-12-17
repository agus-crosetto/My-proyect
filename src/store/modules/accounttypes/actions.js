export default {

    
    //AHORA EL CODIGO QUE VI EN EL CURSO
    // Add Account
    async addAccountTypes(_, data){
        const accountData = {
            fullName: data.fullName,
            shortName: data.shortName,
        };
        const response = await fetch('https://simplear.js-software.com/account-types', {
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
    async loadAccountTypes(context){
        const url = new URL('https://simplear.js-software.com/account-types/search.json');
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
            };
            accounts.results.push(account);
            accounts.offset = responseData.offset;
            accounts.total = responseData.total;
        }     
        context.commit('loadAccountTypes', accounts);
    },

    // Search Account for ID
    async searchAccountTypeId(context, data){
        const id = data.id;
        const url = new URL(`https://simplear.js-software.com/account-types/${id}.json`);
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
         }
        accounts.results.push(account);
        accounts.total = accounts.results.length;
        context.commit('searchAccountTypeId', accounts);
    },

    // Search Account for Name
    async searchAccountTypesName(context, data){
        const searchName = data;
        const url = new URL(`https://simplear.js-software.com/account-types/search.json`);
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
            };
            accounts.results.push(account);
            accounts.offset = responseData.offset;
            accounts.total = responseData.total;

        }
        context.commit('searchAccountTypesName', accounts);
    },

    //delete Account
    async deleteAccountTypeId(_, data){
        const id = data;
        const response = await fetch(`https://simplear.js-software.com/account-types/${id}.json`, {
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
        async updateAccountType(_, data){
            const accountData = {
                fullName: data.fullName,
                shortName: data.shortName,
            };
            const id = data.id;
            const response = await fetch(`https://simplear.js-software.com/account-types/${id}.json`, {
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