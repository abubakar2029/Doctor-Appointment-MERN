import React from 'react'
import SectionTitle from './SectionTitle'
import { MemberCard } from './MemberCard';
import johnCarter from '@/assets/john-carter.png'
import sophieMoore from '@/assets/sophie-moore.png'
import mattCannon from '@/assets/matt-cannon.png'
import andySmith from '@/assets/andy-smith.png'
import lilyWoods from '@/assets/lily-woods.png'
import patrickMeyer from '@/assets/patrick-meyer.png'

const members: { name: string; role: string; description: string; image_src: string }[] = [
    {
        "name": "John Carter",
        "role": "CEO & CO-FOUNDER",
        "description": "Lorem ipsum dolor sit amet consectetur adipiscing elit amet hendrerit pretium nulla sed enim iaculis mi.",
        "image_src": johnCarter

    },
    {
        "name": "Sophie Moore",
        "role": "DENTAL SPECIALIST",
        "description": "Lorem ipsum dolor sit amet consectetur adipiscing elit amet hendrerit pretium nulla sed enim iaculis mi.",
        "image_src": sophieMoore
    },
    {
        "name": "Matt Cannon",
        "role": "ORTHOPEDIC",
        "description": "Lorem ipsum dolor sit amet consectetur adipiscing elit amet hendrerit pretium nulla sed enim iaculis mi.",
        "image_src": mattCannon
    },
    {
        "name": "Andy Smith",
        "role": "BRAIN SURGEON",
        "description": "Lorem ipsum dolor sit amet consectetur adipiscing elit amet hendrerit pretium nulla sed enim iaculis mi.",
        "image_src": andySmith
    },
    {
        "name": "Lily Woods",
        "role": "HEART SPECIALIST",
        "description": "Lorem ipsum dolor sit amet consectetur adipiscing elit amet hendrerit pretium nulla sed enim iaculis mi.",
        "image_src": lilyWoods
    },
    {
        "name": "Patrick Meyer",
        "role": "EYE SPECIALIST",
        "description": "Lorem ipsum dolor sit amet consectetur adipiscing elit amet hendrerit pretium nulla sed enim iaculis mi.",
        "image_src": patrickMeyer
    }
]

function OurExperts() {
    return (
        <div>
            <SectionTitle title="Meet Our Team Members" />
            <p className='text-center text-sm md:text-base  text-gray-500'>Lorem ipsum dolor obcaecati quibusdam nesciunt dignissimos ullam. <br />Possimus vitae rem, doloribus quam impedit.</p>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 pt-8 md:pt-12">
                {members.map((member, index) => (
                    <div key={index}>
                        <MemberCard
                            name={member.name}
                            role={member.role}
                            description={member.description}
                            image_src={member.image_src}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default OurExperts