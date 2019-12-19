$(function(){
    function buildHTML(message){
        if (message.content && message.image) {
          var html = `<div class="message">
                        <div class="top-info">
                            <div class="top-info__user-name">
                                ${message.name}
                            </div>
                            <div class="top-info__date">
                                ${message.created_at}
                            </div>
                        </div>
                        <div class="comment">
                            <p class="lower-message__content">
                                ${message.content}
                            </p>
                        <img class="lower-message__image" src= ${message.image}>
                        </div>
                      </div>`
        } else if (message.content) {
          var html = `<div class="message">
                        <div class="top-info">
                            <div class="top-info__user-name">
                                ${message.name}
                            </div>
                            <div class="top-info__date">
                                ${message.created_at}
                            </div>
                        </div>
                        <div class="comment">
                            <p class="lower-message__content">
                                ${message.content}
                            </p>
                        </div>
                      </div>`
        } else if (message.image) {
            var html = `<div class="message">
                        <div class="top-info">
                            <div class="top-info__user-name">
                                ${message.name}
                            </div>
                            <div class="top-info__date">
                                ${message.created_at}
                            </div>
                        </div>
                        <div class="comment">                           
                        <img class="lower-message__image" src= ${message.image}>
                        </div>
                      </div>`
        }
        return html
    }
    $('#new_message').on('submit',function(e){
        e.preventDefault()
        let formData = new FormData(this);
        let url = $(this).attr('action');
        $.ajax({
            url: url,
            type: 'POST',
            data: formData,
            dataType: 'json',
            processData: false,
            contentType: false
        })
        .done(function(message){
            var html = buildHTML(message);
            $(".messages").append(html);
            $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
            $('#message_content').val('')
            $('.new_message__submit').attr('disabled',false);
        })
        .fail(function(){
            alert("メッセージ送信に失敗しました");
        })
    })
    if (document.location.href.match(/\/groups\/\d+\/messages/)) {
        var reloadMessages = function() {
            last_message_id = $('.message:last').data("message-id");
            $.ajax({
                url: "api/messages",
                type: 'GET',
                dataType: 'json',
                data: {id: last_message_id}
            })
            .done(function(messages) {
                var insertHTML = '';
                $.each(messages, function(i, message) {
                    insertHTML += buildHTML(message)
                });
                $('.messages').append(insertHTML);
                
                $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
                
            })
            .fail(function() {
                alert("自動更新に失敗しました");
            });
        };
        setInterval(reloadMessages, 7000)   
    }   
});

