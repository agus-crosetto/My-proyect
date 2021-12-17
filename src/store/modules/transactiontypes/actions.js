export default {

    
    //AHORA EL CODIGO QUE VI EN EL CURSO
    // Add Account
    async addTransactionTypes(_, data){
        const accountData = {
            fullName: data.fullName,
            shortName: data.shortName,
            sign: data.sign,
        };
        const response = await fetch('https://simplear.js-software.com/transaction-types', {
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
    async loadTransactionTypes(context){
        const url = new URL('https://simplear.js-software.com/transaction-types/search.json');
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
            const transactionTypes = {
                id: responseData.results[key].id + '',
                shortName: responseData.results[key].shortName,
                fullName: responseData.results[key].fullName,
                sign: responseData.results[key].sign,
            };
            accounts.results.push(transactionTypes);
            accounts.offset = responseData.offset;
            accounts.total = responseData.total;
        }     
        context.commit('loadTransactionTypes', accounts);
    },

    // Search Account for ID
    async searchTransactionTypeId(context, data){
        const id = data.id;
        const url = new URL(`https://simplear.js-software.com/transaction-types/${id}.json`);
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
             sign: responseData.result.sign,
         }
        accounts.results.push(account);
        accounts.total = accounts.results.length;
        context.commit('searchTransactionTypeId', accounts);
    },

    // Search Account for Name
    async searchTransactionTypesName(context, data){
        const searchName = data;
        const url = new URL(`https://simplear.js-software.com/transaction-types/search.json`);
        if(searchName.length > 5){
            url.searchParams.append('fullName', searchName);
        } else {
            url.searchParams.append('shortName', searchName); 
        }
        const response = await fetch(url);
        const responseData = await response.json();
        if(!response.ok){
            // const error = new Error(responseData.message || 'Failed to fetch!');
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
                sign: responseData.results[key].sign,
                
            };
            console.log(accounts)
            accounts.results.push(account);
            accounts.offset = responseData.offset;
            accounts.total = responseData.total;

        }
        context.commit('searchTransactionTypesName', accounts);
    },

    //delete Account
    async deleteTransactionTypeId(_, data){
        const id = data;
        const response = await fetch(`https://simplear.js-software.com/transaction-types/${id}.json`, {
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
        async updateTransactionType(_, data){
            const accountData = {
                fullName: data.fullName,
                shortName: data.shortName,
                sign: data.sign,
            };
            const id = data.id;
            const response = await fetch(`https://simplear.js-software.com/transaction-types/${id}.json`, {
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