# chat-space DB設計
## usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_name|string|null: false|
|email|string|null: false|
|password|string|null: false|
|group_id|integer|null: false, foreign_key: true|

### Association
- has_many :groups_users
- has_many :groups,  through:  :groups_users
- has_many :chats

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_name|stringu|null: false|

### Association
- has_many :grous_users
- has_many :users,  through:  :groups_users
- has_many :chats

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## chatsテーブル

|Column|Type|Options|
|------|----|-------|
|text|text||
|image|text||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user