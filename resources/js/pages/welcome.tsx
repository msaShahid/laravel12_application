import React, { useState } from 'react';
import { Menu, X, BookOpen, ChevronRight, } from 'lucide-react';
import { Head, Link, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';

export default function Welcome() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { auth } = usePage<SharedData>().props;

  const featuredPosts = [
    {
      title: "The Future of Web Development",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800",
      excerpt: "Exploring the latest trends and innovations in web development..."
    },
    {
      title: "Mastering Digital Photography",
      category: "Photography",
      image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=800",
      excerpt: "Essential tips and techniques for capturing stunning photos..."
    },
    {
      title: "Mindful Living Guide",
      category: "Lifestyle",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800",
      excerpt: "Practical ways to incorporate mindfulness into your daily routine..."
    }
  ];

  const categories = [
    { name: "Technology", count: 42 },
    { name: "Photography", count: 28 },
    { name: "Lifestyle", count: 35 },
    { name: "Travel", count: 24 },
    { name: "Food", count: 31 }
  ];

  return (
    <>
        <Head title="Welcome"></Head>
            
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="bg-white shadow-sm fixed w-full z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <BookOpen className="h-8 w-8 text-indigo-600" />
                        <span className="ml-2 text-xl font-bold text-gray-900">Blog 28</span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#" className="text-gray-700 hover:text-indigo-600">Home</a>
                        <a href="#" className="text-gray-700 hover:text-indigo-600">Blog</a>
                        <a href="#" className="text-gray-700 hover:text-indigo-600">About</a>
                        <a href="#" className="text-gray-700 hover:text-indigo-600">Contact</a>
                        
                        {auth.user ? (
                            <Link href={route('dashboard')} className="text-sm leading-normal bg-indigo-600 text-white rounded-md px-4 py-2 hover:bg-indigo-700 transition">
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link href={route('login')} className="text-sm leading-normal text-gray-700 hover:text-indigo-600">
                                    Log in
                                </Link>
                                <Link href={route('register')} className="text-sm leading-normal bg-indigo-600 text-white rounded-md px-4 py-2 hover:bg-indigo-700 transition">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                            className="text-gray-700 hover:text-indigo-600"
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <a href="#" className="block px-3 py-2 text-gray-700 hover:text-indigo-600">Home</a>
                        <a href="#" className="block px-3 py-2 text-gray-700 hover:text-indigo-600">Blog</a>
                        <a href="#" className="block px-3 py-2 text-gray-700 hover:text-indigo-600">About</a>
                        <a href="#" className="block px-3 py-2 text-gray-700 hover:text-indigo-600">Contact</a>

                        <div className="px-3 py-2 space-y-2">
                            {auth.user ? (
                                <Link href={route('dashboard')} className="block px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link href={route('login')} className="block px-4 py-2 text-sm text-gray-700 hover:text-indigo-600">
                                        Login
                                    </Link>
                                    <Link href={route('register')} className="block px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>

            {/* Hero Section */}
            <div className="relative bg-gray-900 h-[600px] flex items-center">
                <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&w=1920')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                >
                <div className="absolute inset-0 bg-black opacity-60"></div>
                </div>
                
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                    Discover Stories That Matter
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
                    Join our community of writers and readers sharing unique perspectives on technology,
                    lifestyle, and creativity.
                </p>
                <button className="px-8 py-4 bg-indigo-600 text-white rounded-md text-lg font-semibold hover:bg-indigo-700 transition duration-150 flex items-center mx-auto">
                    Start Reading
                    <ChevronRight className="ml-2 h-5 w-5" />
                </button>
                </div>
            </div>

            {/* Featured Posts */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Posts</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {featuredPosts.map((post, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1">
                        <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                        <div className="p-6">
                        <span className="text-indigo-600 text-sm font-semibold">{post.category}</span>
                        <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3">{post.title}</h3>
                        <p className="text-gray-600">{post.excerpt}</p>
                        <button className="mt-4 text-indigo-600 font-semibold hover:text-indigo-700">
                            Read More →
                        </button>
                        </div>
                    </div>
                    ))}
                </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Explore Categories</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {categories.map((category, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-6 text-center hover:bg-gray-100 transition duration-150">
                        <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                        <p className="text-gray-600 mt-2">{category.count} articles</p>
                    </div>
                    ))}
                </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-16 bg-indigo-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Subscribe to Our Newsletter</h2>
                    <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
                    Get the latest articles, resources, and insights delivered directly to your inbox.
                    </p>
                    <form className="max-w-md mx-auto flex gap-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                    />
                    <button
                        type="submit"
                        className="px-6 py-3 bg-white text-indigo-600 rounded-md font-semibold hover:bg-indigo-50 transition duration-150"
                    >
                        Subscribe
                    </button>
                    </form>
                </div>
                </div>
            </section>
        </div>
    </>
   
  );
}

