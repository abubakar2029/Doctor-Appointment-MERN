import {
    FacebookIcon,
    TwitterIcon,
    InstagramIcon,
    LinkedinIcon,
} from "@/svgs";


export function MemberCard({ name, role, description, image_src }: {
    name: string;
    role: string;
    description: string;
    image_src: string;
}) {
    return (

        <div className="bg-white rounded-2xl shadow-sm p-6 max-w-sm w-full text-center border border-gray-300">
            {/* Profile Image */}
            <div className="flex justify-center mb-3">
                <div className="w-20 h-20 rounded-full overflow-hidden ">
                    <img
                        src={image_src}
                        alt={name}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Name */}
            <h2 className="text-2xl font-semibold text-primary mb-1">
                {name}
            </h2>

            {/* Title */}
            <p className="text-sm font-semibold text-gray-800 tracking-wider mb-4">
                {role}
            </p>

            {/* Description */}
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
                {description}
            </p>

            {/* Social Icons */}
            <div className="flex justify-center gap-3">
                <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-100 transition-colors"
                >
                    <FacebookIcon className="w-5 h-5" />
                </a>
                <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center text-sky-400 hover:bg-sky-100 transition-colors"
                >
                    <TwitterIcon className="w-5 h-5" />
                </a>
                <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-500 hover:bg-teal-100 transition-colors"
                >
                    <InstagramIcon className="w-5 h-5" />
                </a>
                <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 hover:bg-blue-100 transition-colors"
                >
                    <LinkedinIcon className="w-5 h-5" />
                </a>
            </div>
        </div>
        // </main>
    )
}
