<template>
<header>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <router-link class="navbar-brand" to="/">App</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDarkDropdown">
      <ul class="navbar-nav">
        <li>
          <router-link type="button" class="btn btn-outline-secondary" to="/accounts">
            ACCOUNTS LIST
          </router-link>
        </li>
        <li class="nav-item dropdown">
          <router-link class="nav-link dropdown-toggle" to="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="true">
          </router-link>
          <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
            <li><router-link class="dropdown-item" to="/accounts/addaccount">Add New Account</router-link></li>
            <li><router-link class="dropdown-item" to="/typesaccount">Account Types</router-link></li>
          </ul>
        </li>
        <li>
          <router-link type="button" class="btn btn-outline-secondary" to="/transactions">
            TRANSACTIONS LIST
          </router-link>
        </li>
        <li class="nav-item dropdown">
          <router-link class="nav-link dropdown-toggle" to="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          </router-link>
          <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
            <li><router-link class="dropdown-item" to="/transactions/addtransaction">Add New Transaction</router-link></li>
            <li><router-link class="dropdown-item" to="/typestransaction">Transaction Types</router-link></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
</header>
  </template>

<style scoped>

header {
  width: 100%;
  height: 5rem;
  justify-content: center;
  align-items: center;
}
a {
  color: rgb(248, 248, 248);
  display: inline-block;

}

#navbarNavDarkDropdown {
  justify-content: center;
}

#navbarDarkDropdownMenuLink {
  margin-left: -5px;
}



</style>

