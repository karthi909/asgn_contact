const contactModel = require('../Model/contactModel')
const Validator = require('../validation/validator')

const createContact = async (req, res) => {
    try {
        let data = req.body
        let { name, phoneNumber, email, password } = data;

        if (!Validator.isValidRequestBody(data)) return res.status(400).send({ status: false, msg: "please provide some data" });


        //validation checking for the Name
        if (!name) return res.status(400).send({ status: false, msg: "please provide title field." });
        if (!Validator.isValid(name)) return res.status(400).send({ status: false, msg: "please provide valid title." });
        let dupname = await contactModel.findOne({name: name})
        if (dupname) return res.status(400).send({ status: false, msg: "name already exists." });


        //validation checking for the phoneNumber
        if(!phoneNumber) return res.status(400).send({ status: false, message: "phone is required or not valid" })
        if (!Validator.isValidNumber(phoneNumber)) return res.status(406).send({ status: false, message: "phone number is not valid" })
        let dupnumber = await contactModel.findOne({phoneNumber: phoneNumber})
        if (dupnumber) return res.status(400).send({ status: false, msg: "phoneNumber already exists." });


        //validation checking for the Email
        if(!email) return res.status(400).send({ status: false, message: "email is required or not valid" })
        if (!Validator.isValid(email)) return res.status(400).send({ status: false, message: "email is required or not valid" })
        if (!Validator.isValidEmail(email)) return res.status(400).send({ status: false, message: "email is not valid" })
        let dupEmail = await contactModel.findOne({name: name})
        if (dupEmail) return res.status(400).send({ status: false, msg: "Email already exists." });

         //validation checking for the password
        if (!password) return res.status(400).send({ status: false, msg: "please provide title field." });



        let newData = await contactModel.create(data);
        res.status(201).send({ status: true, msg: "Contact Created Successfully", data: newData })
    } catch (err) {
        res.status(500).send({ status: false, Error: err })
    }
}


const updateContact = async (req, res)=>{
    try{
        let contactId = req.params.contactId

        //authorization code
        if (req.contactID != contactId) {
            return res.send({ msg: "Not Authorized" })
        }

        let data = req.body
        let {name, phoneNumber, email, password} = data;

        //validation checking for the Name
        if (!Validator.isValid(name)) return res.status(400).send({ status: false, msg: "please provide valid title." });
        let dupname = await contactModel.findOne({name: name})
        if (dupname) return res.status(400).send({ status: false, msg: "name already exists." });

        //validation checking for the phoneNumber
        if (!Validator.isValidNumber(phoneNumber)) return res.status(406).send({ status: false, message: "phone number is not valid" })
        let dupnumber = await contactModel.findOne({phoneNumber: phoneNumber})
        if (dupnumber) return res.status(400).send({ status: false, msg: "phoneNumber already exists." });


        //validation checking for the Email
        if (!Validator.isValid(email)) return res.status(400).send({ status: false, message: "email is required or not valid" })
        if (!Validator.isValidEmail(email)) return res.status(400).send({ status: false, message: "email is not valid" })
        let dupEmail = await contactModel.findOne({name: name})
        if (dupEmail) return res.status(400).send({ status: false, msg: "Email already exists." });

         

        let newData = await contactModel.findByIdAndUpdate({_id:contactId },data,{new: true})

         res.status(201).send({ status: true, msg: "Contact updated Successfully", data: newData })

    } catch(err){
        res.status(500).send({ status: false, Error: err })
    }
}

const deleteContact = async (req, res)=>{
    try{
            let contactId = req.params.contactId;

            //authorization code
            if (req.contactID != contactId) {
                return res.send({ msg: "Not Authorized" })
            }

            await contactModel.findByIdAndUpdate({_id:contactId },{isDeleted: true})

            res.status(200).send({ status: true, msg: "Contact Deleted Successfully"})


            
    } catch(err){
        console.log(err)
        res.status(500).send({ status: false, Error: err })
    }
}

const postBulk = async (req, res)=>{
    try{
        let data = req.body

        for(let i=0;i<data.length;i++){
           //validation checking for the Name
        if (!data[i].name) return res.status(400).send({ status: false, msg: "please provide title field." });
        if (!Validator.isValid(data[i].name)) return res.status(400).send({ status: false, msg: "please provide valid title." });
        let dupname = await contactModel.findOne({name: data[i].name})
        if (dupname) return res.status(400).send({ status: false, msg: "name already exists." });


        //validation checking for the phoneNumber
        if(!data[i].phoneNumber) return res.status(400).send({ status: false, message: "phone is required or not valid" })
        if (!Validator.isValidNumber(data[i].phoneNumber)) return res.status(406).send({ status: false, message: "phone number is not valid" })
        let dupnumber = await contactModel.findOne({phoneNumber: data[i].phoneNumber})
        if (dupnumber) return res.status(400).send({ status: false, msg: "phoneNumber already exists." });


        //validation checking for the Email
        if(!data[i].email) return res.status(400).send({ status: false, message: "email is required or not valid" })
        if (!Validator.isValid(data[i].email)) return res.status(400).send({ status: false, message: "email is required or not valid" })
        if (!Validator.isValidEmail(data[i].email)) return res.status(400).send({ status: false, message: "email is not valid" })
        let dupEmail = await contactModel.findOne({name: data[i].email})
        if (dupEmail) return res.status(400).send({ status: false, msg: "Email already exists." });

         //validation checking for the password
        if (!data[i].password) return res.status(400).send({ status: false, msg: "please provide title field." });
        }

        let newData = await contactModel.insertMany(data)  
        
        res.status(200).send({ status: true, msg: "Contacts created Successfully", data: newData})

    } catch(err){
        res.status(500).send({ status: false, Error: err })
    }
}

const getSingleContact = async (req, res)=>{
    try {
        const contactId = req.params.contactId;

        //authorization code
        if (req.contactID != contactId) {
            return res.send({ msg: "Not Authorized" })
        }

        const con = await contactModel.findById({_id:contactId, isDeleted: false}).select({_id:0, password: 0, isDeleted: 0, createdAt: 0, updatedAt: 0, __v: 0 });

        res.status(200).send({status: true, data:con})
    } catch (err) {
        res.status(500).send({ status: false, Error: err })
    }
}

const getContact = async (req, res)=>{
    try{

        const {page = 1, limit = 2} = req.query


        const contacts = await contactModel.find({isDeleted: false}).select({_id:0, password: 0, isDeleted: 0, createdAt: 0, updatedAt: 0, __v: 0 }).limit(limit *1).skip((page-1)*limit);



        if(contacts.length == 0) return res.status(404).send({status: false, msg:"No page Found"})
        res.status(200).send({status: true, data:contacts})

    } catch(err){
        res.status(500).send({ status: false, Error: err })
    }
}



module.exports.createContact = createContact
module.exports.updateContact = updateContact
module.exports.deleteContact = deleteContact
module.exports.postBulk = postBulk
module.exports.getContact = getContact
module.exports.getSingleContact = getSingleContact