module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: 'myController.index',
    config: {
      policies: [],
    },
  },
{
  method : 'GET',
  path : '/find',
  handler : 'form.find',
  config : {
    policies: [],
    auth : false,

  }
},
{
  method: "POST",
  path: "/create",
  handler: "form.create",
  config: {
    policies: [],
    auth: false,
  },
},

{
  method: "DELETE",
  path: "/delete/:id",
  handler: "form.delete",
  config: {
    policies: [],
    auth: false,
  },
},

{
  method: "PUT",
  path: "/update/:id",
  handler: "form.update",
  config: {
    policies: [],
    auth: false,
  },
},

];
