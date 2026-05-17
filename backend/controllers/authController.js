const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const googleSignIn = async (req, res) => {
    const {token} = req.body

    if(!token) {
        return res.status(400).json({ok: false, msg: "The token is missing :("})
    }

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        })

        const payload = ticket.getPayload()

        const user = {
            email: payload.email,
            name: payload.name,
        }

        res.json({
            ok: true,
            msg: "Logged succesfully",
            user
        })

    } catch (error) {
        console.log(error)
        return res.status(401).json({
            ok: false,
            msg: "Invalid token"
        })
    }
}

module.exports = {googleSignIn}