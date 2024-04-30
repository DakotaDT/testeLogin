"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { signIn, useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'

const Login = () => {
  const [error, setError] = useState("")
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.replace("/dashboard")
    }
  }, [session, router])

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!isValidEmail(email)){
        setError("Email Inválido!")
        return;
    } 

    if (!password || password.length <8) {
        setError("Senha Inválida!")
        return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password
    })
    
    if (res?.error) {
      setError("Email ou senha incorretos")
      if (res?.url) router.replace("/dashboard")
    } else {
      setError("")  
    }
  }
  return (
    <div className="flex w-[350px] min-h-screen flex-col p-20 bg-gradient-to-br from-purple-900 to-blue-500 text-white items-center">
        <div className="">
            <h1 className="text-3xl text-center font-semibold mb-8">Entrar</h1>
            <form onSubmit={handleSubmit}>
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
                <button 
                    type="submit"
                    className="w-full bg-gradient-to-br from-purple-500 to-blue-600 py-2 rounded-xl hover:bg-gradient-to-br hover:from-purple-800 hover:to-blue-900 text-sm" 
                >
                    Entrar
                </button>
                <p className="text-white text-[16px] mb-4">{error && error}</p> 
            </form>
            <div className="text-center text-gray-200 mt-4">- OU -</div>
            <div className="block text-center text-sm mt-2">
                {" "} Não tem uma conta? {" "}
                <Link href="/register" className="text-sm hover:underline hover:text-gray-200 mt-2">
                    Clique aqui.
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Login