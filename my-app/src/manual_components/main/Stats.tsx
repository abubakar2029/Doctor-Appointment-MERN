import SectionTitle from "./SectionTitle"

const stats = [
    { id: 1, name: 'Customer Satisfaction', value: '99', sign: '%' },
    { id: 2, name: 'Online Patients', value: '15', sign: 'k' },
    { id: 3, name: 'Patients Recovered', value: '12', sign: 'k' },
    { id: 4, name: 'Company Growth', value: '240', sign: '%' },
]

export default function Stats() {
    return (
        <div className="md:pb-6 pb-3">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionTitle title="Our results in numbers" />
                <dl className="grid grid-cols-2 gap-x-4 gap-y-12 text-center sm:grid-cols-2 md:grid-cols-4">
                    {stats.map((stat) => (
                        <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-2 sm:gap-y-3">

                            {/* Label */}
                            <dt className="text-xs sm:text-sm font-bold md:text-base text-gray-600">
                                {stat.name}
                            </dt>

                            {/* Value */}
                            <dd className="order-first font-semibold tracking-tight text-primary
                             text-xl sm:text-2xl md:text-4xl lg:text-5xl">
                                {stat.value}
                                <span className="text-base sm:text-lg md:text-2xl lg:text-3xl text-primary/50">
                                    {stat.sign}
                                </span>
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    )
}
