import React from 'react'
import { Check } from "lucide-react"


export function SignupSuccess() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 max-w-md w-full text-center">
                <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-teal-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-3">
                    Registration Complete
                </h2>
                <p className="text-slate-600 mb-6">
                    Thank you for registering as a doctor. We will contact you shortly.
                </p>
            </div>
        </main>
    )
}
