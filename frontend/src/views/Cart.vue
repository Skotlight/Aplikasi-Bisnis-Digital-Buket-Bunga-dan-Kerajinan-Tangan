<template>
  <div id="app" class="container">
    <Navbar />
    <div class="text-right">
      <button
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#cartModal"
      >Cart ({{ cartItems.length }})
      </button>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="cartModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 class="modal-title" id="myModalLabel">Cart</h4>
          </div>
          <div class="modal-body">
            <shopping-cart inline-template :items="cartItems">
              <div>
                <table class="table table-cart">
                  <tr
                    v-for="product in $store.state.products"
                    :key="product.id"
                  >
                    <td>{{ item.title }}</td>
                    <td style="width:120px">
                      QTY:
                      <input
                        v-model="item.qty"
                        class="form-control input-qty"
                        type="number"
                      />
                    </td>
                    <td class="text-right">
                      ${{ item.price | formatCurrency }}
                    </td>
                    <td>
                      <button @click="removeItem(index)">
                        <span class="glyphicon glyphicon-trash"></span>
                      </button>
                    </td>
                  </tr>
                  <tr v-show="items.length === 0">
                    <td colspan="4" class="text-center">Cart is empty</td>
                  </tr>
                  <tr v-show="items.length > 0">
                    <td></td>
                    <td class="text-right">Cart Total</td>
                    <td class="text-right">${{ Total | formatCurrency }}</td>
                    <td></td>
                  </tr>
                </table>
              </div>
              <!-- /.container -->
            </shopping-cart>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div
          class="col-xs-3 text-center"
          v-for="product in $store.state.products"
          :key="product.id"
        >
          <img class="img-responsive" :src="item.image" alt="" />
          <h5>{{ item.title }}</h5>
          <h6>${{ item.price | formatCurrency }}</h6>
          <p class="text-center">
            <input
              v-model="item.qty"
              type="number"
              class="form-control"
              placeholder="Qty"
              min="1"
            />

            <button @click="addToCart(item)" class="btn btn-sm btn-primary">
              Add to Cart
            </button>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "Cart",
  components: {
    Footer,
    Navbar,
  },
  computed: {
    Total() {
      let total = 0;
      this.items.forEach((item) => {
        total += item.price * item.qty;
      });
      return total;
    },
  },

  methods: {
    // Remove item by its index
    removeItem(index) {
      this.items.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
  max-width: 600px;
}

.input-qty {
  width: 60px;
  float: right;
}

.table-cart > tr > td {
  vertical-align: middle !important;
}
</style>
