"use client";
import { Search } from "@mui/icons-material";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const Navbar = () => {
  const [search, setSearch] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const router = useRouter();

  const handleScroll = useCallback(() => {
    if (window.scrollY > 66) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.scrollTo(0, 0);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <div className={`navbar ${isScrolled ? "bg-black-1" : ""}`}>
      <Link href="/">
        <img className="logo" src="/assets/images/logo.png" alt="logo" />
      </Link>

      <div className="nav-links">
        <Link className="nav-link font-nsans-bold" href="/">
          Home
        </Link>
        <Link className="nav-link font-nsans-bold" href="/myfavorites">
          My Favorites
        </Link>
      </div>

      <div className="nav-right">
        <div className="search">
          <input
            className="input-search font-nsans-light"
            placeholder="Search movie here"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button disabled={!search || search === ""}>
            <Search
              className="icon"
              onClick={() => router.push(`/search/${search}`)}
            />
          </button>
        </div>

        <img
          className="profile hover:border-2 hover:border-red-500 cursor-pointer mr-5"
          src="/assets/images/profile.jpg"
          alt="profile"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        />

        {isDropdownOpen && (
          <div className="dropdown-menu">
            <Link href="/">Home</Link>
            <Link href="/myfavorites">My Favorites</Link>
            <a onClick={handleLogout}>Logout</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
