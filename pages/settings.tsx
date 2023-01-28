import React from 'react'
import AuthContent from "../components/AuthContent"
import ProfileForm from "../components/profile-setting"

function settings() {
  return (
    <AuthContent>
      <div className="bg-[#DFEDFF] my-16 p-16 rounded-3xl max-w-2xl mx-auto">
        <h1 className="leading-tight mb-8 text-4xl font-black">Inställningar</h1>
        <ProfileForm />
      </div>
    </AuthContent>
  )
}

export default settings