export default {
    //AHORA EL CODIGO QUE VI EN EL CURSO
    // Add Transaction
    //new Date().toISOString()
    async addTransaction(_, data){
        const transactionData = {
            reference: data.reference,
            typeId: data.typeId,
            accountId: data.accountId,
            date: data.date,
            amount: data.amount,
        };
        const response = await fetch('https://simplear.js-software.com/transactions', {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transactionData)
            
        });   
        // const responseData = await response.json(); 
        
        if(!response.ok){
            //error ...
        }   
    },
    
    // Load Account
    async loadTransaction(context){
        const url = new URL('https://simplear.js-software.com/transactions/search.json');
        const response = await fetch(url);
        const responseData = await response.json();
        if(!response.ok){
            const error = new Error(responseData.message || 'Failed to fetch!');
            throw error;
        }
        const transactions = {
            results:[],
            offset:null,
            total:null
        };
        for(const key in responseData.results){
            const account = {
                id: responseData.results[key].id + '',
                reference: responseData.results[key].reference,
                typeId: responseData.results[key].typeId,
                accountId: responseData.results[key].accountId,
                date: responseData.results[key].date,
                amount: responseData.results[key].amount,
            };
            transactions.results.push(account);
            transactions.offset = responseData.offset;
            transactions.total = responseData.total;

        }
        
        context.commit('loadTransaction', transactions);
    },

    // Search Account for ID
    async searchTransactionId(context, data){
        const id = data.id;
        const url = new URL(`https://simplear.js-software.com/transactions/${id}.json`);
        const response = await fetch(url);
        const responseData = await response.json();
        if(!response.ok){
            //...
        }
        const transactions = {
            results:[],
        };
         const account = {
             id: responseData.result.id + '',
             reference: responseData.result.reference,
             typeId: responseData.result.typeId,
             accountId: responseData.result.accountId,
             date: responseData.result.date,
             amount: responseData.result.amount,
         }
         transactions.results.push(account);
        transactions.total = transactions.results.length;
        context.commit('searchTransactionId', transactions);
    },

    //search Transaction for Account Id    
    async searchTransactionAccountId(context, data){
        const accountId = data;
        const url = new URL(`https://simplear.js-software.com/transactions/search.json`);
        url.searchParams.append('accountId', accountId);
        const response = await fetch(url);
        const responseData = await response.json();
        if(!response.ok){
            //...
        }
        const transactions = {
            results:[],
            offset:null,
            total:null
        };
        for(const key in responseData.results){
            const account = {
                id: responseData.results[key].id + '',
                reference: responseData.results[key].reference,
                typeId: responseData.results[key].typeId,
                accountId: responseData.results[key].accountId,
                date: responseData.results[key].date,
                amount: responseData.results[key].amount,
            };
            transactions.results.push(account);
            transactions.offset = responseData.offset;
            transactions.total = responseData.total;

        }
        
        context.commit('searchTransactionReference', transactions);
    },

    // Search Account for Name
    async searchTransactionReference(context, data){
        const searchReference = data;
        const url = new URL(`https://simplear.js-software.com/transactions/search.json`);
        url.searchParams.append('reference', searchReference);
        const response = await fetch(url);
        const responseData = await response.json();
        if(!response.ok){
            //...
        }
        const transactions = {
            results:[],
            offset:null,
            total:null
        };
        for(const key in responseData.results){
            const account = {
                id: responseData.results[key].id + '',
                reference: responseData.results[key].reference,
                typeId: responseData.results[key].typeId,
                accountId: responseData.results[key].accountId,
                date: responseData.results[key].date,
                amount: responseData.results[key].amount,
            };
            transactions.results.push(account);
            transactions.offset = responseData.offset;
            transactions.total = responseData.total;

        }
        
        context.commit('searchTransactionReference', transactions);
    },

    //delete Account
    async deleteTransactionId(_, data){
        const id = data;
        const response = await fetch(`https://simplear.js-software.com/transactions/${id}.json`, {
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
                reference: data.reference,
                typeId: data.typeId,
                accountId: data.accountId,
                date: data.date,
                amount: data.amount,
            };
            const id = data.id;
            const response = await fetch(`https://simplear.js-software.com/transactions/${id}.json`, {
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