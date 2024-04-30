import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
    const { name, email, password, confirmPassword } = await request.json();

    await connect();

    const existingUser = await User.findOne({ email })
    if (existingUser) {
        return new NextResponse("E-mail já em uso", { status: 400 })
    }
    
    if (confirmPassword == !password){
        return new NextResponse("As senhas não são iguais", { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const hashedConfirm = await bcrypt.hash(confirmPassword, 10)
    const newUser = new User({
        name, 
        email,
        password: hashedPassword,
        confirmPassword: hashedConfirm
    })

    try {
        await newUser.save()
        return new NextResponse("Usuário criado com sucesso!", { status: 200 })
    } catch (error: any) {
        console.log(error)
        
    }
}