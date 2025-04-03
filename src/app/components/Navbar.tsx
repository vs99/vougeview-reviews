"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../components/ui/navigation-menu";
import { Input } from "../components/ui/input";
import { Separator } from "../components/ui/separator";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const [user, setUser] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    id: string;
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [categoriesData, setCategoriesData] = useState<
    {
      id: string;
      name: string;
      image: string;
      productCount: number;
      description: string;
      href?: string;
    }[]
  >([]);

  // Refs for the dropdown trigger and content elements.
  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Global mousemove listener: if the cursor leaves both the trigger and content, close the dropdown.
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (
        triggerRef.current &&
        contentRef.current &&
        !triggerRef.current.contains(e.target as Node) &&
        !contentRef.current.contains(e.target as Node)
      ) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Fetch categories from API.
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        if (res.ok) {
          const data = await res.json();
          const mapped = data.categories.map((cat: any) => ({
            id: cat._id.toString(),
            name: cat.name,
            image: cat.image,
            productCount: cat.productCount,
            description: cat.description,
            href: `/categories/${cat._id.toString()}`,
          }));
          setCategoriesData(mapped);
        } else {
          console.error("Failed to fetch categories", await res.text());
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Load user from localStorage.
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const getInitials = () => {
    if (!user) return "";
    const firstInitial = user.firstName
      ? user.firstName.charAt(0).toUpperCase()
      : "";
    const lastInitial = user.lastName
      ? user.lastName.charAt(0).toUpperCase()
      : "";
    return `${firstInitial}${lastInitial}`;
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/auth/login";
  };

  const handleSearch = async () => {
    if (searchQuery.trim() !== "") {
      try {
        const res = await fetch(
          `/api/products/search?query=${encodeURIComponent(searchQuery.trim())}`
        );
        if (res.ok) {
          const data = await res.json();
          if (data.products && data.products.length > 0) {
            const foundProduct = data.products[0];
            router.push(`/products/${foundProduct._id.toString()}`);
          } else {
            console.error("No matching product found");
          }
        } else {
          const errorText = await res.text();
          console.error("Search API error:", errorText);
        }
      } catch (error) {
        console.error("Error during search:", error);
      }
    }
  };

  return (
    <nav className="border-b bg-background sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left Section (Logo + Navigation) */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-indigo-600 mr-8">
              VougeView
            </Link>

            <div className="hidden md:flex">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link href="/" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        Home
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-white shadow-md rounded-lg p-4">
                      <div className="w-[400px]">
                        <div className="mb-3 text-lg font-semibold text-gray-900">
                          Browse Categories
                        </div>
                        <Separator className="mb-4" />
                        <div className="grid grid-cols-2 gap-4">
                          {categoriesData.slice(0, 5).map((category) => (
                            <Link
                              key={category.id}
                              href={category.href || "#"}
                              className="group block rounded-md p-3 transition-all duration-200 hover:bg-gray-100 aspect-[2/1] flex flex-col justify-center"
                            >
                              <div className="font-medium text-gray-800 group-hover:text-indigo-600 text-center">
                                {category.name}
                              </div>
                              <div className="text-xs text-gray-600 text-center">
                                {category.description}
                              </div>
                              <div className="text-xs text-gray-500 text-center">
                                {category.productCount} products
                              </div>
                            </Link>
                          ))}
                        </div>
                        <div className="mt-4 flex justify-end">
                          <Link href="/categories">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-xs font-medium text-indigo-600 hover:underline"
                            >
                              View All Categories →
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Link href="/reviews" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        Latest Reviews
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          {/* Right Section (Search + Profile Dropdown) */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {/* Search Bar */}
            <div className="relative w-64">
              <Input
                type="text"
                className="pl-10"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
              />
              <button
                onClick={handleSearch}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.472 3.906l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {user ? (
              <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
                <div>
                  <DropdownMenuTrigger asChild>
                    {/* The trigger element: on mouse enter, open the dropdown */}
                    <div
                      ref={triggerRef}
                      onMouseEnter={() => setOpenDropdown(true)}
                    >
                      <Button
                        variant="ghost"
                        className="relative flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 p-0 text-white hover:bg-indigo-700"
                        title="Open profile"
                      >
                        <span className="font-bold text-sm text-white">
                          {getInitials()}
                        </span>
                      </Button>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-64 p-4 shadow-md"
                    ref={contentRef}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-indigo-600 text-white font-bold">
                            {getInitials()}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div>
                        <div className="font-semibold text-sm">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {user.email}
                        </div>
                      </div>
                    </div>
                    <DropdownMenuSeparator className="my-2" />
                    <DropdownMenuItem asChild>
                      <Link href="/profile">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer text-destructive"
                    >
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </div>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm">Sign up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="h-10 w-10"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          {/* Mobile menu content remains unchanged */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
