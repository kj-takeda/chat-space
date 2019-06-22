
$(function() {

  var search_list = $("#user-search-result");
  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`
    search_list.append(html);
  }
    
  function appendNoUser(user) {
    var html = `<ul>
                  <li>
                    <div class="chat-group-user clearfix">
                      <p>${user}</p>
                    </div>
                    </li>
                </ul>`
    search_list.append(html);
  }

  function appendEditUser(id,name) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='${id}'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    return html
  }
  
  $("#user-search-field,#user-search-result").on("input" , function() {
    var input = $("#user-search-field, #user-search-result").val();
    search_list.empty();
    
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      if (users.length !== 0) {
        users.forEach(function(users){
          appendUser(users);
        });
      }else {
        appendNoUser("該当するユーザーはいません");
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    });
  });

$("#user-search-result").on("click", ".user-search-add", function() {
  var id = $(this).data("user-id")
  var name = $(this).data("user-name")
  var html = appendEditUser(id,name)
  $("#chat-group-users").append(html);
  $(this).parent().remove();
});
$('#chat-group-users').on('click','.user-search-remove',function(){
  $(this).parent().remove();
});
});

