<template>
  <main>
    <a href="http://localhost:3000/.well-known/security.txt">
      Go to http://localhost:3000/.well-known/security.txt
    </a>
    <a href="http://localhost:3000/.well-known/change-password">
      Go to http://localhost:3000/.well-known/change-password, you will be redirected to http://localhost:3000/password-recovery
    </a>
  </main>
</template>

<style lang="css">
html,
body {
  margin: 0;
  padding: 0;
  font-size: 16px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
</style>

<style lang="css" scoped>
  main {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  a {
    padding: 1rem;
    background-color: black;
    color: white;
    display: inline-flex;
    text-decoration: none;
  }

  a:hover{
    background-color: gray;
  }
</style>
