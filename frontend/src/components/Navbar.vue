<template>
  <header id="header" class="top-head">
         <!-- Static navbar -->
         <nav class="navbar navbar-default">
            <div class="container-fluid">
               <div class="row">
                  <div class="col-md-4 col-sm-12 left-rs">
                     <div class="navbar-header">
                        <button type="button" id="top-menu" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false"> 
                        <span class="sr-only">Toggle navigation</span> 
                        <span class="icon-bar"></span> 
                        <span class="icon-bar"></span> 
                        <span class="icon-bar"></span> 
                        </button>
                        <a href="index.html" class="navbar-brand"><img src="images/New Project.png" class="web-icon" alt="" /></a>
                     </div>
                  </div>
                  <div class="col-md-8 col-sm-12">
                     <div class="right-nav">
                        <div class="login-sr">
                           <div class="login-signup">
                              <ul v-if="$store.state.isAuthenticated === false">
                                 <li><a href="#" @click.prevent=" $router.push('/login').catch(err => {})">Login</a></li>
                                 <li><a href="#" @click.prevent=" $router.push('/register').catch(err => {})">Sign up</a></li>
                              </ul>
                              <ul v-if="$store.state.isAuthenticated === true">
                                 <li><a href="#" @click.prevent="submitLogout">Logout</a></li>
                              </ul>
                           </div>
                        </div>
                        <div class="nav-b hidden-xs">
                           <div class="nav-box">
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <!--/.container-fluid --> 
         </nav>
      </header>
</template>

<script>
export default {
methods: {
    submitLogout () {
      localStorage.removeItem('access_token')
      this.$store.dispatch('authenticate', false)
    }
  }
}
</script>

<style scoped>
.web-icon{
    height: 100% !important;
    width: 100% !important;
}
</style>