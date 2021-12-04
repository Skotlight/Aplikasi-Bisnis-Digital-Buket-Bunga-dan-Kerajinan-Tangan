<template>
  <div>
    <NavbarVue />
    <ModalVue />
    <SidebarVue />
    <div class="page-content-product">
      <div class="main-product">
        <div class="container">
          <div class="row clearfix">
            <div class="find-box">
              <h1>Find your Flower Bouquet or<br />Hand Craft here.</h1>
              <h4>Happy Shopping.</h4>
              <div class="product-sh">
                <div class="col-sm-6">
                  <div class="form-sh">
                    <input
                      type="text"
                      placeholder="Search something you want to Buy"
                      v-model="searchData.search"
                    />
                  </div>
                </div>
                <div class="col-sm-3">
                  <div class="form-sh">
                    <select class="selectpicker" v-model="searchData.category">
                      <option>Flower Bouquet</option>
                      <option>Hand Craft</option>
                    </select>
                  </div>
                </div>
                <div class="col-sm-3">
                  <div class="form-sh">
                    <a class="btn" href="#" @click.prevent="searchProduct"
                      >Search</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row clearfix">
            <div
              class="col-lg-3 col-sm-6 col-md-3"
              v-for="product in $store.state.products"
              :key="product.id"
            >
              <a href="productpage.html">
                <div class="box-img">
                  <h4>{{ product.name }}</h4>
                  <img :src="product.image_url" alt="" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <FooterVue />
  </div>
</template>

<script>
// @ is an alias to /src
import NavbarVue from "../components/Navbar.vue";
import FooterVue from "../components/Footer.vue";
import ModalVue from "../components/Modal.vue";
import SidebarVue from "../components/Sidebar.vue";

export default {
  name: "Home",
  components: {
    NavbarVue,
    FooterVue,
    ModalVue,
    SidebarVue,
  },
  created() {
    this.$store.dispatch("fetchProducts");
  },
  data() {
    return {
      searchData: {
        search: "",
        category: "Flower Bouquet",
      },
    };
  },
  methods: {
    searchProduct() {
      if (this.searchData.search !== null)
        this.$store.dispatch("search", this.searchData);
      else this.$store.dispatch("fetchProducts", this.searchData.category);
    },
  },
};
</script>

<style scoped>
.box-img {
  height: 450px;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.box-img img {
  height: 280px;
  width: 150px;
  object-fit: cover;
}
</style>
