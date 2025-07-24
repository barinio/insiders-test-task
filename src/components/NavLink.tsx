import Link from "next/link";

export function NavLink({href, children}: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="relative px-3 py-1 transition text-white hover:text-indigo-600 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-indigo-600 after:scale-x-0 after:origin-left after:transition-transform hover:after:scale-x-100"
        >
            {children}
        </Link>
    );

};
