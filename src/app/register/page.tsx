"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Register = () => {
  const [error, setError] = useState("")
  const router = useRouter();

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const confirmPassword = e.target[3].value

    if (!isValidEmail(email)){
        setError("Email Inválido!")
        return;
    } 

    if (!password || password.length <8) {
        setError("Senha muito pequena, tente novamentee!")
        return;
    }

    if (confirmPassword != password){
        setError("As senhas são diferentes")
        return;
    }

    try {
        const res = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password,
                confirmPassword
            })
        })
        if(res.status === 400) {
            setError("Email já registrado!")
        } if(res.status === 200) {
            setError("")
            router.push("/login")
        }
    } catch (error) {
        setError("Ocorreu um erro, tente novamente")
        console.log(error)
    }
  }

  

  return (
    <div className="flex w-[350px] min-h-screen flex-col p-20 bg-gradient-to-br from-purple-900 to-blue-500 text-white items-center">
        <div className="">
            <h1 className="text-3xl text-center font-semibold mb-8">Registrar</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    className="border border-white text-white rounded-xl px-3 py-2 mb-4 focus:outline-none focus:border-white bg-transparent text-sm w-[250px]"
                    placeholder="Nome Completo"
                    required
                />
                <input 
                    type="text"
                    className="border border-white text-white rounded-xl px-3 py-2 mb-4 focus:outline-none focus:border-white bg-transparent text-sm w-[250px]"
                    placeholder="E-mail"
                    required
                />
                <input 
                    type="password"
                    className="border border-white text-white rounded-xl px-3 py-2 mb-4 focus:outline-none focus:border-white bg-transparent text-sm w-[250px]"
                    placeholder="Insira uma Senha"
                    required
                />
                <input 
                    type="password"
                    className="border border-white text-white rounded-xl px-3 py-2 mb-4 focus:outline-none focus:border-white bg-transparent text-sm w-[250px]"
                    placeholder="Confirme sua Senha"
                    required
                />
                <button 
                    type="submit"
                    className="w-full bg-gradient-to-br from-purple-500 to-blue-600 py-2 rounded-xl hover:bg-gradient-to-br hover:from-purple-800 hover:to-blue-900 text-sm" 
                >
                    Criar conta
                </button>
                <p className="text-white text-[16px] mb-4">{error && error}</p>
            </form>
            <div className="text-center text-gray-200 mt-4">- OU -</div>
            <div className="block text-center text-sm mt-2">
                {" "} Tem uma conta? {" "}
                <Link href="/login" className="text-sm hover:underline hover:text-gray-200 mt-2">
                    Faça Login!
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Register