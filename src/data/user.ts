import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

// dbConnect();

export const getUserByEmail = async (email: string) => { 

    try {
        await dbConnect();
        const user = await UserModel.findOne({ email });
        return user;
    } catch (error) {
        console.error('getUserByEmail', error);
    }
}

export const getUserById = async (id : string) => {
    try {
        await dbConnect();
        const user = await UserModel.findById(id);
        return user;
    } catch (error) {
        console.error('getUserById', error);
    }
}


    
    