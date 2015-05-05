function save_options() {
  console.log('saving');

  var sendto = $('#sendto').val();
  var sendfrom = $('#sendfrom').val();
  var apikey = $('#apikey').val();
  chrome.storage.sync.set({
    sendto: sendto,
    sendfrom: sendfrom,
    apikey: apikey
  }, function() {
    console.log('saved');  
  });
}

function restore_options() {
  chrome.storage.sync.get({
    sendto: '',
    sendfrom: '',
    apikey: ''
  }, function(items) {
    $('#sendto').val(items.sendto);
    $('#sendfrom').val(items.sendfrom);
    $('#apikey').val(items.apikey);
  });
}

$(restore_options);
$('#save').click(save_options);
