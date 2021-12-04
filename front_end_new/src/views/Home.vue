<template>
  <div class="js">
    <NavbarVue />
    <div class="product-area section">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="section-title">
              <h2>Products</h2>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="product-info">
              <div class="nav-main">
                <!-- Tab Nav -->
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                  <li class="nav-item">
                    <a
                      class="nav-link  active"
                      data-toggle="tab"
                      href="#bouquet"
                      role="tab"
                      >Bouquet</a
                    >
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      data-toggle="tab"
                      href="#handcraft"
                      role="tab"
                      >Handcraft</a
                    >
                  </li>
                </ul>
                <!--/ End Tab Nav -->
              </div>
              <div class="tab-content" id="myTabContent">
                <!-- Start Single Tab -->
                <div
                  class="tab-pane fade show active"
                  id="bouquet"
                  role="tabpanel"
                >
                  <div class="tab-single">
                    <div class="row">
                      <ProductCardVue
                        v-for="product in $store.state.products"
                        :key="product.id"
                        :product="product"
                      />
                    </div>
                  </div>
                </div>
                <!--/ End Single Tab -->
                <!-- Start Single Tab -->
                <div
                  class="tab-pane fade show active"
                  id="handcraft"
                  role="tabpanel"
                >
                  <div class="tab-single">
                    <div class="row">
                      <ProductCardVue
                        v-for="product in $store.state.handcrafts"
                        :key="product.id"
                        :product="product"
                      />
                    </div>
                  </div>
                </div>
                <!--/ End Single Tab -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <FooterVue />
  </div>
</template>

<script>
import NavbarVue from "../components/Navbar.vue";
import FooterVue from "../components/Footer.vue";
import ProductCardVue from "../components/ProductCard.vue";

export default {
  name: "Home",
  components: {
    NavbarVue,
    FooterVue,
    ProductCardVue,
  },
  created() {
    this.$store.dispatch("fetchProducts");
    this.$store.dispatch("fetchHandcrafts");
    if (localStorage.access_token) {
      this.$store.dispatch("authenticate", true);
    }
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
    submitLogout() {
      localStorage.removeItem("access_token");
      this.$store.dispatch("authenticate", false);
    },
  },
};
</script>
