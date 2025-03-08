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
            <div className="flex flex-col gap-6 p-3 bg-white text-black shadow-lg rounded-xl">
                <div className="flex justify-end">
                     <button 
                     className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded "
                     onClick={() => openModel()} 
                      >Create</button>                   
                </div>
            </div>
        </AppLayout>
    );
}
