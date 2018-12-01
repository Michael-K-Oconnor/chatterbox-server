var FormView = {

  $form: $('#send'),

  initialize: function () {
    FormView.$form.on('submit', FormView.handleSubmit);
  },

  handleSubmit: function (event) {
    // Stop the browser from submitting the form
    event.preventDefault();


    var message = {
      username: App.username,
      text: FormView.$form.find('#message').val(),
      roomname: Rooms.selected || 'lobby'
    };
    FormView.$form[0].reset();
    Parse.create(message, (data) => {
      data = JSON.parse(data);
      Messages.add(data, MessagesView.render);
    });

  },

  setStatus: function (active) {
    var status = active ? 'true' : null;
    FormView.$form.find('input[type=submit]').attr('disabled', status);
  }

};