const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

let UserSchema = new mongoose.Schema({ // 사용자 스키마
    username: String,
    firstName: String,
    lastName: String,
    password: String,
    profile: String,
    posts: [ 
        {
            type: mongoose.Schema.Types.ObjectId, //objectId 는 각각의 document를 식별하는 고유의 아이디이다. 
                                                  //이를 이용하여 다른 Collection의 Document와 매칭한다.
            ref: "Post" //User Collection에 있는 posts 필드는 Post Collection에 있는 Document와 매핑됨. (외래키 릴레이션과 비슷)
        }
    ],

    liked_posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ],

    liked_comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ],
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    friendRequests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
});

UserSchema.plugin(passportLocalMongoose); //사용자인증을 위한 passport-local-mongoose모듈과 스키마 연결
let User = mongoose.model("User", UserSchema); //몽고DB에 User Document 생성 -UserSchema의 구조를 따름
module.exports = User;