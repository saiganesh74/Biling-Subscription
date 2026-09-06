const Tenant = require("../models/tenant.model");
const createTenant = async (req, res) =>{
    try{
        const {name} = req.body ;
        const tenant = await Tenant.create({name});
        res.status(201).json({
            success:  true,
            tenant
        })
    }catch(error){
        throw error;
    }
}

module.exports = {createTenant};