const Axios = require("axios");

class XenditController {
  static createInvoice(req, res) {
    const { amount } = req.body;
    Axios.post(
      "https://api.xendit.co/v2/invoices",
      {
        external_id: `invoice-${Date.now()}`,
        amount,
        payer_email: req.currentUser.email,
        description: "Flower and Handcraft BloomyBloom",
        should_send_email: true,
        reminder_time_unit: "hours",
        reminder_time: "1",
        success_redirect_url: "http://localhost:8081",
      },
      {
        auth: {
          username:
            "xnd_development_38htM0ePPAlzMjpPxUl0e7x2gKPGL2VJWHqq36OPge6lR8NxmYi3A6uK6XlcEB",
          password: "",
        },
      }
    )
      .then(({ data }) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        res.status(500).json({ message: err.response.data.message });
      });
  }
}

module.exports = XenditController;
