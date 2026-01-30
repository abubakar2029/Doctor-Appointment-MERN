export default function SubcribeSection() {
    return (
            <section className="w-full py-12 px-4">
                <div className="max-w-2xl mx-auto text-center">
                    {/* Heading */}
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">
                        Subscribe to our newsletter
                    </h2>

                    {/* Form */}
                    <form className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full sm:w-80 px-5 py-3 rounded-full bg-white border-0 text-gray-700 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                        <button
                            type="submit"
                            className="px-6 py-3 bg-teal-600 text-white text-sm font-medium rounded-full hover:bg-teal-700 transition-colors"
                        >
                            Suscribe
                        </button>
                    </form>
                </div>
            </section>
    )
}
