import JohnCarter from '@/assets/John Carter.png'
import SophieMoore from '@/assets/Sophie Moore.png'
import AndySmith from '@/assets/Andy Smith.png'
import TestimonialCard from './TestimonialCard';
import SectionTitle from './SectionTitle';

const testimonials: { quote: string; description: string; author: string; role: string; image_src: string; }[] = [
    {
        "quote": "“An amazing service”",
        "description": "Lorem ipsum dolor sit ametolil col consectetur adipiscing lectus a nunc mauris scelerisque sed egestas.",
        "author": "John Carter",
        "role": "CEO at Google",
        "image_src": JohnCarter
    },
    {
        "quote": "“The best service”",
        "description": "Convallis posuere morbi leo urna molestie at elementum eu facilisis sapien pellentesque habitant.",
        "author": "Andy Smith",
        "role": "CEO Dot Austere",
        "image_src": AndySmith
    },
    {
        "quote": "“One of a kind service”",
        "description": "Ultrices eros in cursus turpis massa tincidunt sem nulla pharetra diam sit amet nisl suscipit adipis.",
        "author": "Sophie Moore",
        "role": "MD at Facebook",
        "image_src": SophieMoore
    },
    {
        "quote": "“The best service”",
        "description": "Convallis posuere morbi leo urna molestie at elementum eu facilisis sapien pellentesque habitant.",
        "author": "Andy Smith",
        "role": "CEO Dot Austere",
        "image_src": AndySmith
    },
]



function Testimonials() {
    return (
        <div className='py-6 md:py-10'>
            <SectionTitle title="Our Customers Love us" />
            <p className='text-center text-sm md:text-base  text-gray-500'>Lorem ipsum dolor obcaecati quibusdam lorem nesciunt ullam.</p>
            <div className="flex flex-wrap justify-center xl:justify-between items-center gap-8 mt-10">
                {testimonials.map((testimonial, index) => (
                    <div key={index}>
                        <TestimonialCard
                            quote={testimonial.quote}
                            description={testimonial.description}
                            author={testimonial.author}
                            role={testimonial.role}
                            image_src={testimonial.image_src}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Testimonials