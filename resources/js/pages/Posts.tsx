import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts',
        href: '/posts',
    },
];

interface Posts {
    id: number;
    title: string;
    content: string;
    image?: string;
}

export default function Posts() {

    const { posts } = usePage<{posts: Posts[] }>().props;

    const [isModelOpen, setIsModelOpen] = useState(false);
    const [selectPost, setSelectPost] = useState(null);

    const openModel = (post = null) => {
        setIsModelOpen(true);
        setSelectPost(post);
    };

    const handleEdit = (id: number) => {
        console.log('click on edit')
    }
    const handleDelete = (id: number) => {
        router.delete(`/posts/${id}`,{
            onSuccess: () => {
                router.reload();
                router.push('/posts');
            },
            onError: () => {
                console.error('Error deleting post');
            }
        })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Posts" />
            <div className="flex flex-col gap-4 p-3 bg-gray-50 text-white shadow-sm rounded-xl mt-5 mx-2">
              <div className="flex justify-end">
                    <button 
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded "
                    onClick={() => openModel()} 
                    >
                    Create
                    </button>                   
              </div>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 mx-2">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="p-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-all-search"
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label htmlFor="checkbox-all-search" className="sr-only">Select All</label>
                      </div>
                    </th>
                    {['Image', 'Title', 'Content', 'Actions'].map((header) => (
                      <th key={header} className="px-6 py-3 text-left">{header}</th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {posts.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-4 text-center">No posts found</td>
                    </tr>
                  ) : (
                    posts.map((post) => (
                      <tr key={post.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="w-4 p-4">
                          <div className="flex items-center">
                            <input
                              id={`checkbox-table-search-${post.id}`}
                              type="checkbox"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label htmlFor={`checkbox-table-search-${post.id}`} className="sr-only">Select post</label>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-12 h-12 object-cover rounded"
                          />
                        </td>
                        <td className="px-6 py-4">{post.title}</td>
                        <td className="px-6 py-4">{post.content}</td>
                        <td className="flex items-center px-6 py-4 space-x-3">
                          <button
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            onClick={() => handleEdit(post.id)}
                            aria-label={`Edit post titled ${post.title}`}
                          >
                            Edit
                          </button>
                          <button
                            className="font-medium text-red-600 dark:text-red-500 hover:underline"
                            onClick={() => handleDelete(post.id)}
                            aria-label={`Delete post titled ${post.title}`}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

        </AppLayout>
    );
}
