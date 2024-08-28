import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(v);
            },
            message: props => `${props.value} is not a valid password! It must contain at least 8 characters, including one letter, one number, and one special character.`
        }
    }
});


// Add custom validation for password (e.g., length, complexity)
UserSchema.path('password').validate(function (password) {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password);
}, 'Password must be at least 8 characters long and contain at least one letter, one number, and one special character.');

export default mongoose.model('User', UserSchema);
