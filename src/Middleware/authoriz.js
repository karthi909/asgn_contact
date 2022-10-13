const jwt = require('jsonwebtoken');



const autz = async (req, res, next)=>{
    try{    
        let token = req.headers['authorization']
        //console.log(token)

        if (!token) {
            return res.status(403).send({ status: false, message: `Missing token in request` })
        }
        
        tokenNew = token.split(' ')

        let requiredToken = tokenNew[1]

        const decoded = jwt.verify(requiredToken, 'Digital');

        if (!decoded) return res.status(400).send({ status: false, message: "Invalid authentication token in request headers." })

        req.contactID = decoded.contactId

        next()
    } catch(err){
        res.status(500).send({msg:"Error", err: err.message})
    }
};



module.exports.autz = autz;