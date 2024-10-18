"use client";

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import logoHalf from "@/public/hh-half.svg"
import logo from "@/public/hotelhunger-logo.svg"

const navItems = [
    { name: 'About', href: '/about', rotation: "0deg" },
    { name: 'Shop', href: '/shop', rotation: "180deg" },
    { name: 'Booking', href: 'https://tbamusic.dk', redirect: true, rotation: "90deg" },
    { name: 'Press', href: '/press', rotation: "180deg" },
    { name: 'Social', href: '/social', rotation: "0deg" },
    { name: 'Contact', href: '/contact', rotation: "270deg" },
]

const NavItem = ({ item }: { item: typeof navItems[0] }) => (
    <li className="relative group text-center">
        <Link
            href={item.href}
            target={item.redirect ? "_blank" : "_self"}
            className="text-gray-800 group-hover:text-[#1f293787] transition-colors text-lg font-medium">
            <div className="mb-2 flex justify-center">
                <div
                    className="rotate-on-hover group-hover:rotate-on-hover"
                    style={{ '--initial-rotation': item.rotation } as React.CSSProperties}
                >
                    <Image
                        src={logoHalf}
                        alt="hotelhunger logo"
                        width={20}
                        height={20}
                    />
                </div>
            </div>
            {item.name}
        </Link>
    </li>
)

export default function Navbar() {
    const pathname = usePathname()
    const isHomePage = pathname === '/'

    const middleIndex = Math.floor(navItems.length / 2);
    const leftItems = navItems.slice(0, middleIndex);
    const rightItems = navItems.slice(middleIndex);

    return (
        <nav className="p-4 relative z-50 mt-8">
            <div className="flex justify-center items-center">
                <ul className="flex items-center space-x-8">
                    {leftItems.map((item) => (
                        <NavItem key={item.name} item={item} />
                    ))}
                    {!isHomePage && (
                        <li className="mx-8">
                            <Link href="/">
                                <Image
                                    src={logo}
                                    alt="hotelhunger full logo"
                                    width={100}
                                    height={100}
                                />
                            </Link>
                        </li>
                    )}

                    {rightItems.map((item) => (
                        <NavItem key={item.name} item={item} />
                    ))}
                </ul>
            </div>
        </nav>
    )
}