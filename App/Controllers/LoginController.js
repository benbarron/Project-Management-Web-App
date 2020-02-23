const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mailer = require('nodemailer');
const uuid = require('uuid');

const { User } = model;

class AdminController {
  async register(req, res) {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'Email address is already in use' });
    }

    const newUser = new User({
      fullname,
      email,
      password
    });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newUser.password, salt);

    newUser.password = hash;

    await newUser.save();

    const token = await jwt.sign({ id: newUser._id }, env('jwtSecret', ''), {
      expiresIn: env('jwtLiftTime', 50000)
    });

    return res.json({
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        profileImage: newUser.profileImage
      }
    });
  }

  async authenticate(req, res) {
    try {
      const user = await User.findById(req.user.id).select('-password');
      return res.json(user);
    } catch (err) {
      return res.status(401);
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'User Does not exist' });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = await jwt.sign({ id: user.id }, env('jwtSecret', ''), {
      expiresIn: env('jwtLiftTime', 50000)
    });

    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage
      }
    });
  }

  async sendPasswordResetLink(req, res) {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ msg: "There isn't an account with that email address" });
    }

    const key = `${uuid()}-${uuid()}-${uuid()}`;

    const base = `${
      env('mode') === 'PRODUCTION'
        ? env('domain')
        : `http://localhost:${env('devPort')}`
    }`;

    user.passwordResetToken = key;
    await user.save();

    const options = {
      from: env('emailUser'),
      to: user.email,
      subject: 'Password Reset Form',
      text: `${base}/reset-password?key=${key}`
    };

    const transporter = mailer.createTransport({
      service: 'gmail',
      auth: {
        user: env('emailUser'),
        pass: env('emailPassword')
      }
    });

    await transporter.sendMail(options);

    return res.json({ msg: 'Check your email for a reset link' });
  }

  async showResetPasswordForm(req, res) {
    const { key } = req.query;

    if (!key) {
      return res.redirect('/');
    }

    const user = await User.findOne({ passwordResetToken: key });

    if (!user) {
      return res.redirect('/');
    }

    return res.render('App');
  }

  async resetPassword(req, res) {}
}

module.exports = AdminController;
