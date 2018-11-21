var mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    Schema = mongoose.Schema;


var userSchema = new Schema({
    firstName:         {type: String, required: true, index: true},
    lastName:          {type: String, required: true, index: true},
    //Calculated field, update on pre-save
    fullName:          {type: String},
    password:          {type: String, required: true, select: false},
    email:             {type: String, required: true, unique: true, index: true, lowercase: true, trim: true},
    chatTag:           {type: String, required: false, index: true},
    'super':           {type: Boolean, required: true, default: false},
    mAccess:           {type: Boolean, required: true, default: false}
});

//update calculated fields here
userSchema.pre('save', function (next) {
    var fullName = this.firstName + ' ' + this.lastName;
    this.fullName = appUtil.getCamelCase(fullName);
    next();
});

var User = mongoose.model("User", userSchema);



module.exports = User;
