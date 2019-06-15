
$(function(){
  function buildHTML(data){

    if(data.image.present?){
    var img = <img src="${ data.image }"></img>
    }else{
    var img = ""
    }
    end

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

  <div class="image">
    <p class="image">
    ${img}
    </p>
  </div>
 
    <div></div>
  }

</div>`;

return html;
}

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
      $('.main__body').animate({scrolltop: $('.main__body').scrollHeight}, 'fast');
      $('.form')[0].reset();
      $('.form__submit').prop('disabled', false); //ここで解除している
    })
    .fail(function(){
     alert('error')
        })
})
})
