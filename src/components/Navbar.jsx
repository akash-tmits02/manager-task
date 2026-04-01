"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../lib/auth";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const links = [
    { href: "/dashboard", label: "📊 Dashboard" },
    { href: "/tasks", label: "✅ Tasks" },
  ];

  return (
    <nav className={styles.nav}>
      <div className={styles.brand}>
        <span className={styles.brandIcon}>✅</span>
        <span className={styles.brandName}>TaskFlow</span>
      </div>

      <div className={styles.links}>
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`${styles.link} ${pathname === href ? styles.active : ""}`}
          >
            {label}
          </Link>
        ))}
      </div>

      <div className={styles.user}>
        <span className={styles.username}>👤 {user.username}</span>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          Logout
        </button>
      </div>
    </nav>
  );
}
