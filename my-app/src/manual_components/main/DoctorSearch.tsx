import PrimaryInput from "./PrimaryInput";
import { Link } from "react-router-dom";

export function DoctorSearch() {
    return (
        <div className="w-full text-left bg-white rounded-xl shadow-sm">
            <div className="p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
                    Find A Doctor
                </h2>

                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-x-12 lg:gap-x-16 md:justify-between">
                    <div className="flex lg:gap-x-8 max-xl:flex-col max-xl:space-y-4">

                        <PrimaryInput
                            placeholder="Name"
                            value=""
                            onChange={() => { }}
                        />

                        <PrimaryInput
                            placeholder="Speciality"
                            value=""
                            onChange={() => { }}
                        />
                    </div>


                    <div className="flex flex-col max-md:space-y-4 md:flex-row md:gap-x-6 lg:gap-x-10 md:mr-auto">


                        {/* Available Toggle */}
                        <div className="flex items-center gap-3">
                            <span className="text-gray-600 font-medium">Available</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary transition-all duration-300"></div>
                            </label>
                        </div>

                        {/* Search Button */}
                        <Link to={""} className="w-full lg:w-36 xl:min-w-44 text-center px-8 py-2.5 bg-primary hover:bg-teal-700 text-white font-medium rounded-md transition-colors">
                            Search
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    )
}
