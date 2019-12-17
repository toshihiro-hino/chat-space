$(function(){
    function buildHTML(message){
        if (message.image) {
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
        } else {
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
});
