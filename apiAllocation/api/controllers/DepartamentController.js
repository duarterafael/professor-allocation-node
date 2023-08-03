const database = require('../models');

class DepartamentController{

    static async getAllDepartaments(req,res){
        try{
            const AllDpt = await database.Department.findAll();
            
            return res.status(200).json(AllDpt); 
            
        }catch(error){
            
            return res.status(500).json(error.message)
        }
    }
    static async getById(req,res){
        const {id} = req.params
        try{
            const dpt = await database.Department.findOne({
                where: {
                    id: Number(id)
                }
            })
            return res.status(200).json(dpt)
        }catch(error){
            return res.status(500).json(error.message)
        }
    }
    static async createDpt(req,res){
        const newDpt = req.body;
        try{
            const dptCreated = await database.Department.create(newDpt)
            return res.status(200).json(dptCreated)
        }catch(error){
            return res.status(500).json(error.message)
        }
    }
}
module.exports = DepartamentController;