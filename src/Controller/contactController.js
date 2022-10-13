const contactModel = require('../Model/contactModel')

const createContact = async (req, res) => {
    try {
        let data = req.body
        let { name, phoneNumber, email, password } = data;

        let newData = await contactModel.create(data);
        res.status(201).send({ status: true, msg: "Contact Created Successfully", data: newData })
    } catch (err) {
        res.status(500).send({ status: false, Error: err })
    }
}


const updateContact = async (req, res)=>{
    try{
        let contactId = req.params.contactId
        let data = req.body
        let {name, phoneNumber, email, password} = data;

        let newData = await contactModel.findByIdAndUpdate({_id:contactId },data,{new: true})

         res.status(201).send({ status: true, msg: "Contact updated Successfully", data: newData })

    } catch(err){
        res.status(500).send({ status: false, Error: err })
    }
}

const deleteContact = async (req, res)=>{
    try{
            let contactId = req.params.contactId;

            await contactModel.findByIdAndUpdate({_id:contactId },{isDeleted: true})

            res.status(200).send({ status: true, msg: "Contact Deleted Successfully"})


            
    } catch(err){
        res.status(500).send({ status: false, Error: err })
    }
}

const postBulk = async (req, res)=>{
    try{
        let data = req.body

        for(let i=0;i<data.length;i++){
            let dup = await contactModel.findOne({name: data[i].name})
            console.log(dup)
            if(dup) return res.send({status: false, msg:`name:-${data[i].name}  is already existed`})
        }

        let newData = await contactModel.insertMany(data)  
        
        res.status(200).send({ status: true, msg: "Contacts created Successfully", data: newData})

    } catch(err){
        res.status(500).send({ status: false, Error: err })
    }
}

const getSingleContact = async (req, res)=>{
    try {
        const contactId = req.query;

        const con = await contactModel.findById({_id:contactId});

        res.status(200).send({status: true, data:con})
    } catch (err) {
        res.status(500).send({ status: false, Error: err })
    }
}

const getContact = async (req, res)=>{
    try{

        const {page = 1, limit = 2} = req.query
        const contacts = await contactModel.find().limit(limit *1).skip((page-1)*limit);
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