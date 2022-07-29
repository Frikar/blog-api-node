const {Schema, model} = require('mongoose')

const userSchema = new Schema(
	{
		_id: {
			type: Number,
			required: true
		},
		name: {
			type: String,
			unique: true,
			required: true,
		},
		email: {
			type: String,
			unique: true,
			required: true
		}
	},
	{timestamps: true},
);

userSchema.pre('remove', function (next) {
	this.model('Post').deleteMany({userId: this._id}, next);
});

module.exports = model('User', userSchema);
