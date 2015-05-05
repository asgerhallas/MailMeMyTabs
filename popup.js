function send(apikey, sendto, sendfrom, subject) 
{
  chrome.tabs.query({ currentWindow: true }, function(tabs)
  {
    var ids = [];
    var mail = '<html><body style="font-family:Tahoma, sans-serif;font-size:13px;">';

    for (var i = tabs.length - 1; i >= 0; i--) {
      var tab = tabs[i];
      ids.push(tab.id);

      mail += '<p>' + tab.title + '<br /><a href="' + tab.url + '">' + tab.url + '</a></p>';
    };

    mail += '</body></html>'

    $.ajax({
      type: "POST",
      url: "https://mandrillapp.com/api/1.0/messages/send.json",
      data: {
        'key': apikey,
        'message': {
          'from_email': sendfrom,
          'to': [
              {
                'email': sendto,
                'type': 'to'
              }
            ],
          'auto_html': 'true',
          'subject': subject,
          'html': mail
        }
      }
    }).done(function(response) {
      chrome.tabs.remove(ids);
    });
  });
}

function invoke()
{
  $("input").prop('disabled', true);
  $("button").prop('disabled', true);

  chrome.storage.sync.get({
    sendto: '',
    sendfrom: '',
    apikey: ''
  }, function(items) {
    send(items.apikey, items.sendto, items.sendfrom, $('input').val());
  });
}

$(function(){
  $('input').focus();
  $('button').click(function(){
    invoke();
  })

  $('button').keypress(function(e) {
    if (e.which == 13) invoke()
  })
})