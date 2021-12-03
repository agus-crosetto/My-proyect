<template>
<div>
    <h1>Lista de Transacciones</h1>
    <router-link to="/transactions/addtransaction"> Add new Transactions </router-link>
    <router-view></router-view>
    <section>
        <ul>Toda la lista</ul>
    </section>
</div>
</template>