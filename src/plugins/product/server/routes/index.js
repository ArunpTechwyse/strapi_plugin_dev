module.exports = [
  {
    method: "GET",
    path: "/",
    handler: "myController.index",
    config: {
      policies: [],
    },
  },

  {
    method: "GET",
    path: "/find",
    handler: "product.find",
   
  },

  {
    method: "POST",
    path: "/create",
    handler: "product.create",
    
  },

  {
    method: "DELETE",
    path: "/delete/:id",
    handler: "product.delete",
    
  },

  {
    method: "PUT",
    path: "/toggle/:id",
    handler: "product.toggle",
   
  },

  {
    method: "PUT",
    path: "/update/:id",
    handler: "product.update",
   
  },

];
