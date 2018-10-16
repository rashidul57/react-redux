var mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    Schema = mongoose.Schema;




var userSchema = new Schema({
    firstName:         {type: String, required: true, index: true},
    lastName:          {type: String, required: true, index: true},
    //Calculated field, update on pre-save
    fullName:          {type: String},
    password:          {type: String, required: true, select: false},
    email:             {type: String, required: true, unique: true, lowercase: true, trim: true},
    phoneNumber:       {type: String},
    chatTag:           {type: String, required: false, index: true},
    company:           {type: Schema.Types.ObjectId, ref: 'Company'},
    location:          {type: Schema.Types.ObjectId, ref: 'CompanyLocation'},
    identity:          {type: String},
    serviceProvider:   {type: Boolean, required: true, default: false},
    admin:             {type: Boolean, required: true, default: false},
    'super':           {type: Boolean, required: true, default: false},
    mAccess:           {type: Boolean, required: true, default: false},
    linkedInProfileLink: {type: String },
    collaborator:{type: Boolean, required: true, default: false},
    collaboratorActionItems: [{type: Schema.Types.ObjectId, ref: 'ActionItem'}],
    nationwide:        {type: Boolean, required: true , default: false},
    passwordSet:       {type: Boolean, required: false},
    notes:             {type: String},
    googleToken: {
        accessToken: {
            type: String,
            index: true,
            select: false
        },
        refreshToken: {
            type: String,
            select: false
        },
        lastUpdated : { type : Date}
    },
    outlookToken: {
        accessToken: {
            type: String,
            index: true,
            select: false
        },
        refreshToken: {
            type: String,
            select: false
        },
        lastUpdated : { type : Date}
    },
    isGoogleSynced:     { type: Boolean, default: false},
    isOutlookSynced:    { type: Boolean, default: false},
    timeZone:          {type: String, required: false},
    actionItemAlerts: [{type: Schema.Types.ObjectId, ref: 'ActionItem'}],
    problems:       [{type: Schema.Types.ObjectId}],
    twilioCallerId: {type: String },
    // sharedResources: [{type: Schema.Types.ObjectId, ref: 'SharedResource'}]
});

//update calculated fields here
userSchema.pre('save', function (next) {
    var fullName = this.firstName + ' ' + this.lastName;
    this.fullName = appUtil.getCamelCase(fullName);
    next();
});

var User = mongoose.model("User", userSchema);



module.exports = User;
