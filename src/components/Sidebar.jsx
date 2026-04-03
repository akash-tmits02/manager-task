"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "../lib/authStore";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ChecklistIcon from "@mui/icons-material/Checklist";
import PersonIcon from "@mui/icons-material/Person";
import MessageIcon from "@mui/icons-material/Message";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import styles from "./Sidebar.module.css";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

export default function Sidebar() {
  const { user, logout } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const navItems = [
    { href: "/dashboard", label: "Dashboard", Icon: DashboardIcon },
    { href: "/tasks", label: "My Tasks", Icon: ChecklistIcon },
    { href: "/team-members", label: "Team Members", Icon: PersonIcon },
    { href: "/messages", label: "Messages", Icon: MessageIcon },
    { href: "#", label: "Settings", Icon: SettingsIcon },
    { href: "#", label: "Help Center", Icon: HelpOutlineIcon },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <div className={styles.brandIconWrapper}>
          <TaskAltIcon className={styles.brandIcon} />
        </div>
        <span className={styles.brandName}>TaskFlow</span>
      </div>

      <nav className={styles.navLinks}>
        {navItems.map(({ href, label, Icon }) => (
          <Link
            key={label}
            href={href}
            className={`${styles.link} ${pathname === href ? styles.active : ""}`}
          >
            <Icon className={styles.linkIcon} />
            <span className={styles.linkLabel}>{label}</span>
          </Link>
        ))}
      </nav>

      <div className={styles.footer}>
        <div className={styles.userProfile}>
          <div className={styles.avatar}>
            <PersonIcon />
          </div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{user.username}</span>
            <span className={styles.userRole}>Admin</span>
          </div>
        </div>

        <button onClick={handleLogout} className={styles.logoutBtn}>
          <ExitToAppIcon className={styles.logoutIcon} />
          Logout
        </button>
      </div>
    </aside>
  );
}
