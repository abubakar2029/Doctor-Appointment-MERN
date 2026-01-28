import { Link } from "react-router-dom"

type ButtonProps = {
    text: string
    link: string
    px?: string
    py?: string
    fontWeight?: string
}

export function PrimaryButton({
    text,
    link,
    px = "px-8",
    py = "py-3",
    fontWeight = "font-medium",
}: ButtonProps) {
    const classes = `
    w-full  bg-primary text-white rounded-lg leading-3 flex justify-center items-center hover:bg-teal-800 md:w-auto px-8 py-2.5 transition-all duration-300 hover:bg-teal-700 text-white rounded-md
    ${px} ${py} ${fontWeight}
  `


    return (
        <Link
            to={link}
            className={classes}>
            {text}
        </Link>
    )
}
