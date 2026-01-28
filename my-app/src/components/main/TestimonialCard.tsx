export default function TestimonialCard({ quote, description, author, role, image_src }: {
    quote: string;
    description: string;
    author: string;
    role: string;
    image_src: string;
}) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-300 p-6 max-w-xs w-full">
            {/* Profile Image */}
            <div className="mb-5">
                <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary">
                    <img
                        src={image_src}
                        alt={author}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Quote */}
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
                {quote}
            </h2>

            {/* Description */}
            <p className="text-gray-500 text-sm leading-relaxed mb-5">
                {description}
            </p>

            {/* Author Info */}
            <div>
                <p className="text-teal-500 font-medium text-sm">{author}</p>
                <p className="text-gray-500 text-sm">{role}</p>
            </div>
        </div>
    )
}
