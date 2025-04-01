"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    id: string;
  } | null>(null);

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

  const categories = [
    {
      name: "Beauty",
      href: "/categories/beauty",
      description: "Skincare, makeup, fragrances and beauty tools",
      productCount: 120,
    },
    {
      name: "Cars",
      href: "/categories/cars",
      description: "Vehicles, car accessories and automotive tech",
      productCount: 75,
    },
    {
      name: "Electronics",
      href: "/categories/electronics",
      description: "Computers, phones, gadgets and accessories",
      productCount: 200,
    },
    {
      name: "Home & Garden",
      href: "/categories/home-garden",
      description: "Furniture, decor, kitchenware and gardening",
      productCount: 150,
    },
    {
      name: "Fashion",
      href: "/categories/fashion",
      description: "Clothing, footwear, bags and accessories",
      productCount: 95,
    },
  ];

  const featuredCategory = {
    name: "Summer Collections",
    href: "/collections/summer",
    description: "Explore our curated summer products with exclusive reviews",
    image:
      "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
  };

  return (
    <nav className="border-b bg-background sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
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
                      <div className="grid grid-cols-5 w-[800px] gap-4">
                        <div className="col-span-3 p-4">
                          <div className="mb-3 text-lg font-semibold text-gray-900">
                            Browse Categories
                          </div>
                          <Separator className="mb-4" />
                          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                            {categories.map((category) => (
                              <Link
                                key={category.name}
                                href={category.href}
                                className="group block rounded-md p-3 transition-all duration-200 hover:bg-gray-100"
                              >
                                <div className="font-medium text-gray-800 group-hover:text-indigo-600">
                                  {category.name}
                                </div>
                                <div className="text-xs text-gray-600">
                                  {category.description}
                                </div>
                                <div className="text-xs text-gray-500">
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
                        <div className="col-span-2 bg-gray-100 rounded-lg overflow-hidden">
                          <div className="p-6 flex flex-col h-full">
                            <div className="text-lg font-semibold text-gray-900 mb-2">
                              Featured
                            </div>
                            <div className="relative aspect-video overflow-hidden rounded-md mb-2">
                              <Image
                                src={featuredCategory.image}
                                alt={featuredCategory.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <h3 className="font-medium text-gray-800">
                              {featuredCategory.name}
                            </h3>
                            <p className="text-sm text-gray-600 mb-3">
                              {featuredCategory.description}
                            </p>
                            <div className="mt-auto">
                              <Link href={featuredCategory.href}>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white"
                                >
                                  Explore
                                </Button>
                              </Link>
                            </div>
                          </div>
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

          <div className="hidden md:flex md:items-center md:space-x-4">
            <div className="relative w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-muted-foreground"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <Input
                type="text"
                className="pl-10"
                placeholder="Search products..."
              />
            </div>

            {user ? (
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                  {getInitials()}
                </div>
                <Button size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
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
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent hover:text-accent-foreground"
            >
              Home
            </Link>

            <div>
              <div className="block px-3 py-2 text-base font-medium">
                Categories
              </div>
              <div className="px-3 py-2 bg-muted/70 rounded-md mx-3 space-y-2">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    className="flex flex-col p-2 rounded-md hover:bg-accent hover:text-accent-foreground"
                  >
                    <span className="font-medium">{category.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {category.description}
                    </span>
                  </Link>
                ))}
                <Separator className="my-2" />
                <Link
                  href="/categories"
                  className="flex justify-center pt-1 text-sm text-primary hover:underline"
                >
                  View all categories
                </Link>
              </div>
            </div>

            <Link
              href="/reviews"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent hover:text-accent-foreground"
            >
              Latest Reviews
            </Link>

            <div className="px-3 py-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-muted-foreground"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <Input
                  type="text"
                  className="pl-10 w-full"
                  placeholder="Search products..."
                />
              </div>
            </div>

            <div className="flex pt-2 space-x-2">
              {user ? (
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                    {getInitials()}
                  </div>
                  <Button size="sm" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
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
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
