"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./Nav.module.css";

export default function Nav() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/quizzes", label: "Quizzes" },
    { href: "/new-quiz", label: "New Quiz" },
  ];

  return (
    <nav className="flex mb-4">
      <ul className="flex gap-4">
        {links.map((link) => (
          <li 
            key={link.href} 
            className={`text-lg ${styles.navItem}`}
            >
              <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
