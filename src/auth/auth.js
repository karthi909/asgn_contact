const jwt = require('jsonwebtoken')
const contactModel = require('../Model/contactModel')


const login = async (req, res) => {

   try {
        let data = req.body;
        let { email, password } = data;

        if(!email) return res.status(400).send({ status: false, message: "please provide Email" });
        if(!password) return res.status(400).send({status: false, msg:"please provide password "});

        let resData = await contactModel.findOne({ email: email });

        if (!resData) return res.status(400).send({ masg: `No user found with this Email - ${email}` })

        if (resData.password !== password) {
            return res.status(400).send({ status: false, msg: "password is incorrect" })
        }

        let token = jwt.sign({ contactId: resData._id }, "Digital", { expiresIn: '5h' });

        //tokens.push(token)
        //console.log(tokens)

        return res.status(201).send({status:"LogedIn successfully", token:token});

   } catch(err){
       res.status(500).send({status:"Error", msg: err.message})
   }

}




module.exports.login = login;