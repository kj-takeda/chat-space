
json.user_name    @message.user.name

json.content    @message.content

json.time    @message.created_at.to_s(:datatime)

json.id    @message.id

json.image @message.image
