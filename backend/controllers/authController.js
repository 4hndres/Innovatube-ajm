const { OAuth2Client } = require("google-auth-library");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const {generateJWT} = require("../helpers/jwt")


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const getUsers = async (req, res = response) => {

    const users = await User.find({});
  return res.json({
    ok: true,
    users,
  });
};

const createUser =  async(req, res = response) => {
    const {name, lastName, userName, email, password, confirmPassword} = req.body

    if(password !== confirmPassword) return status(400).json({ok:false, msg: "Passwords doesnt match" })

    try {        
        let user = await User.findOne({email})
        let userN = await User.findOne({userName})

        if(user || userN){
            return res.status(400).json({
                ok: false,
                msg:'Someone used that email alredy!!'
            })
        }

        user = new User(req.body)

        // ENCRYPTING PASSWORD0.
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(password, salt) 
        await user.save()

        // GENERTATE JWT
        const token = await generateJWT(user.id, user.name+user.lastName)
    
        res.status(201).json({
            ok: true,
            uuid: user.id,
            name: user.name+" "+user.lastName,
            userName,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Please talk to the admin'
        })
    }

}

const loginUser = async(req, res = response) => {
    const { email, password} = req.body

    try {
        const user = await User.findOne({
            $or: [
                {email: email},
                {userName: email}
            ]
        })
        
        if(!user ){
            return res.status(400).json({
                ok: false,
                msg:'Email or password are incorrect!!'
            })
        }

        // CONFIRM PASSWORDS
        const validPassword = bcrypt.compareSync(password, user.password)
        if(!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Email or password are incorrect!!' 
            })
        }

        // GENERTATE JWT
        const token = await generateJWT(user.id, user.name)

        res.json({
            ok:true,
            uuid: user.id,
            name: user.name+" "+user.lastName,
            userName: user.userName,
            email: user.email,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Please talk to the admin'
        })
    }
}

const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "There is no user with the given id!!!",
      });
    }

    await User.findByIdAndDelete(userId);

    res.json({
      ok: true,
      msg: "User deleted"
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Talk with the admin",
    });
  }
};

module.exports = {getUsers, createUser, loginUser, deleteUser}