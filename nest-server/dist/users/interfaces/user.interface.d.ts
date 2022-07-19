import { DataSizeOperatorReturningNumber, ObjectId } from "mongoose";
export interface UserResponseObject {
    _id: ObjectId;
    email: string;
    contact: number;
    aboutme: string;
    password: string;
    username: string;
    __v?: DataSizeOperatorReturningNumber;
}
