'use client'
import { BiSolidDashboard, BiDetail, BiSolidBriefcase, BiUser } from "react-icons/bi";
import { PiUsersThree } from "react-icons/pi";
import { usePathname } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
import { MdPostAdd } from "react-icons/md";
import Link from 'next/link';
import { useEffect, useState } from "react";

let id;


const sidebarItems = [
    {
        name: "Dashboard",
        href: "/admin",
        icon: BiSolidDashboard,
    },
    {
        name: "Project",
        href: "#",
        icon: BiDetail,
        subItems: [
            {
                name: "All",
                href: "/admin/projects"
            },
            {
                name: "New",
                href: "/admin/projects/new"
            }
        ]
    },
    {
        name: "Career",
        href: "#",
        icon: BiSolidBriefcase,
        subItems: [
            {
                name: "All",
                href: "/admin/careers"
            },
            {
                name: "New",
                href: "/admin/careers/new"
            }
        ]
    },
    {
        name: "Category",
        href: "/admin/categories",
        icon: MdPostAdd,
        subItems: [
            {
                name: "All",
                href: "/admin/categories"
            },
            {
                name: "New",
                href: "/admin/categories/new"
            }
        ]
    },
    {
        name: "Profile",
        href: `/admin/userprofile/${id}`,
        icon: BiUser
    },
    {
        name: "All Users",
        href: "/admin/allusers",
        icon: PiUsersThree
    },
    {
        name: "Logout",
        href: "/admin/logout",
        icon: FiLogOut
    },
]

const Sidebar = ({ isMenuOpen }) => {
    const [openDropdown, setOpenDropdown] = useState(null);
    const pathName = usePathname();

    useEffect(() => {
        id = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))._id : ""
    
    })

    const handleDropdown = (index) => {
        setOpenDropdown(index === openDropdown && pathName === href
            ? null
            : index);
    };

    return (
        <div>
            <aside className={`fixed h-full  z-10 bg-black ${isMenuOpen ? '' : 'flex flex-col items-center'} p-3 overflow-auto`}>
                <ul className='text-gray-200'>
                    {sidebarItems.map(({ name, href, icon: Icon, subItems }, index) => (
                        <li key={name}>
                            <Link href={href}
                                className={`flex h-full items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer ${pathName === href ? 'bg-gray-700' : 'hover:bg-gray-700'
                                    }`}
                                onClick={() => subItems && handleDropdown(index)}
                            >
                                <span >
                                    <Icon size={24} />
                                </span>
                                <span className={` ml-3 ${!isMenuOpen ? 'block lg:hidden' : 'hidden lg:block'}`}>{name}</span>
                            </Link>
                            {subItems && openDropdown === index && (
                                <ul>
                                    {subItems.map(({ name: subName, href: subHref }) => (
                                        <li key={subName} className='py-1'>
                                            <Link href={subHref} className={`block text-center py-2 px-3 font-medium rounded-md cursor-pointer ${subHref === pathName ? 'bg-gray-700' : 'hover:bg-gray-700'
                                                }`}>
                                                <span>{subName}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </aside>
        </div>
    );
};

export default Sidebar;
