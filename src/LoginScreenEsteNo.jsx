import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FaGoogle } from 'react-icons/fa';

const LoginScreen = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#19254d]">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardContent className="text-center">
          <h1 className="text-2xl font-bold text-[#E4E5E6] mb-6">SmartEdu Suite</h1>
          <h2 className="text-lg text-[#E4E5E6] mb-4">Inicia Sesión</h2>
          <form>
            <div className="mb-4">
              <Input
                type="email"
                placeholder="Correo"
                className="w-full p-2 text-sm rounded bg-[#3E4E61] text-[#E4E5E6] border border-[#5A6B81] focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
              />
            </div>
            <div className="mb-6">
              <Input
                type="password"
                placeholder="Contraseña"
                className="w-full p-2 text-sm rounded bg-[#3E4E61] text-[#E4E5E6] border border-[#5A6B81] focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
              />
            </div>
            <Button
              type="submit"
              className="w-full py-2 bg-[#1E90FF] text-[#E4E5E6] font-semibold rounded hover:bg-[#0077CC] focus:outline-none focus:ring-2 focus:ring-[#1E90FF] focus:ring-opacity-50">
              Iniciar Sesión
            </Button>
          </form>
          <div className="mt-4 text-[#E4E5E6] text-sm">
            o inicia sesión con
          </div>
          <Button
            className="mt-2 w-full py-2 bg-[#FFFFFF] text-[#2D3E50] font-semibold rounded flex items-center justify-center shadow-md hover:bg-[#F0F0F0] focus:outline-none focus:ring-2 focus:ring-[#2D3E50] focus:ring-opacity-50">
            <FaGoogle className="mr-2" />
            Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginScreen;