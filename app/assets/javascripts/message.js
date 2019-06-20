$(function(){
  function buildHTML(message) {
    if (message.content && message.image.url) {
      //data-idが反映されるようにしている
      var html = `<div class = "message" data-id= "${message.id}">
        <div class = "upper-message">
          <div class= "upper-message__user-name">
            ${message.user_name}
          </div>

          <div class="upper-message__date">
            ${message.created_at}
          </div>
        
        <div class="lower-message">
          <p class="lower-message__content">
            ${message.content}
          </p>
          <img src= "${message.image.url}" class="lower-message__image" >
        </div>

      </div>`

    } else if (message.content) {
      //同様に、data-idが反映されるようにしている
      var html = `<div class = "message" data-id= "${message.id}">
        <div class = "upper-message">
          <div class= "upper-message__user-name">
            ${message.user_name}
          </div>

          <div class="upper-message__date">
            ${message.created_at}
          </div>
        
        <div class="lower-message">
          <p class="lower-message__content">
            ${message.content}
          </p>
        </div>
      </div>`

    } else if (message.image.url) {
      //同様に、data-idが反映されるようにしている
      var html =  `<div class = "message" data-id= "${message.id}">
        <div class = "upper-message">
          <div class= "upper-message__user-name">
            ${message.user_name}
          </div>

          <div class="upper-message__date">
            ${message.created_at}
          </div>
        
        <div class="lower-message">
          <img src= "${message.image.url}" class="lower-message__image" >
        </div>
      </div>`

    };
    return html;
  };

$("#new_message").on('submit', function(e){

    e.preventDefault();
    var formData = new FormData(this)
    var url = $(this).attr('action')

    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })  
    .done(function(data){
      var html = buildHTML(data);
      $('.main__body').append(html);
      $('.main__body').animate({scrolltop: $('.main__body')[0].scrollHeight}, 'fast');

      $('#new_message')[0].reset();
      $('.form__submit').prop('disabled', false); //ここで解除している
    })
    .fail(function(){
     alert('error')
      })
    })
      
      var reloadMessages = function() {
        //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
        var last_message_id = $('.message:last').data("message-id")
        if(last_message_id)

        $.ajax({
          //ルーティングで設定した通りのURLを指定
          url: "api/messages",
          //ルーティングで設定した通りhttpメソッドをgetに指定
          type: 'GET',
          dataType: 'json',
          //dataオプションでリクエストに値を含める
          data: {id: last_message_id}
        })
        .done(function(messages) {
          messages.forEach(function(message) {
          var insertHTML = buildHTML(message);
          $('.main__body').append(insertHTML)
        })
      })
        .fail(function() {
          alert('error');
      });
    };
    setInterval(reloadMessages, 5000);
  });
  