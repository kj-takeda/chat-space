
$(function(){
  function buildHTML(data){
    var html = 
`<div class="message">
  <div class="upper-message">
    <div class="upper-message__user-name">
    ${ data.user_name }
    </div>

    <div class="upper-message__date">
    ${ data.time }
    </div>
  </div>

  <div class="lower-message">
    <p class="lower-message__content">
    ${ data.content }
    </p>
  </div>
</div>`;

return html;
}

$('.form__submit').click(function(){
    $('.message').animate({scrollbottom: 1000}, 500, 'swing');
  });

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
      console.log(html)
      $('.messages').append(html);
      $('.form__message').val("");
      $('.form__submit').prop('disabled', false);　//ここで解除している
    
    })
    .fail(function(){
     alert('error')
    })
})
})