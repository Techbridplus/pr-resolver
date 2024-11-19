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
        const user = await UserModel.findById({_id: id});
        return user;
    } catch (error) {
        console.error('Error in getUserById', error);
    }
}
export const updateUserAccount = async (id: string, updateFields:any) => {
    try {
        await dbConnect();
        const updatedUser = await UserModel.findByIdAndUpdate(id, updateFields, { new: true });
        return updatedUser;
    } catch (error) {
        console.error('updateUserAccount', error);
    }
}


    
    