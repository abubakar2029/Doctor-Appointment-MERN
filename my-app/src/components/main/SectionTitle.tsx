import React from 'react'

function SectionTitle({ title }: { title: string }) {
    return (
        <h1 className="text-center text-2xl font-semibold pb-3 md:pb-6 text-primary sm:text-3xl md:text-4xl">
            {title}
        </h1>
    )
}

export default SectionTitle