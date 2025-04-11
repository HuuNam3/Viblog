import Footer from "@/components/common/Footer"
import Header from "@/components/common/Header"
import RegisterForm from "./RegisterForm"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 to-white">
      <Header/>
      <RegisterForm/>
      <Footer/>
    </div>
  )
}
