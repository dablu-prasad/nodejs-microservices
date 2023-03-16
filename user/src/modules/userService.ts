import * as bcrypt from "bcryptjs"
import { dbConnection } from "../database";

class UserService {
    constructor() {
    }
    public register = async (data,image,multiImg) => {

        var salt = bcrypt.genSaltSync(10);
        var hashPassword = bcrypt.hashSync(data.password, salt);
        await dbConnection.query('INSERT INTO USERS (first_name,last_name,email,salt,password,image,address,phone_number,address_image) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)',
            [data.first_name, data.last_name, data.email, salt, hashPassword, multiImg.image, data.address, data.phone_number, multiImg.addressImage])
    }
    public userList = async () => {
        return dbConnection.query('SELECT * FROM USERS')
    }
    public getUserDetail=async(field,userId)=>{
        return dbConnection.query(`SELECT * FROM USERS WHERE ${field.field1}`, [userId.userId])
    }
    public updateUser=async(data,value)=>
    {
        return dbConnection.query(data.query,value )
    }
    public deleteUser=async(userId)=>{
        return dbConnection.query('DELETE FROM USERS WHERE USER_ID=$1',[userId]);
    }
}

export default new UserService();
