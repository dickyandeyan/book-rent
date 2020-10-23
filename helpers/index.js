const {
  createInvoice
} = require("./createInvoice.js");

const invoice = {
  shipping: {
    name: "Rizki Yoditia",
    address: "1234 Main Street",
    city: "Bekasi",
    state: "Java",
    country: "ID",
    postal_code: 94111
  },
  items: [{
      item: "TC 100",
      description: "Toner Cartridge",
      quantity: 2,
      amount: 6000
    },
    {
      item: "USB_EXT",
      description: "USB Cable Extender",
      quantity: 1,
      amount: 2000
    }
  ],
  subtotal: 8000,
  paid: 0,
  invoice_nr: 1234
};

createInvoice(invoice, "invoice.pdf");