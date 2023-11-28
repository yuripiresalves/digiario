import { useEffect, useState } from 'react';

import { Pencil } from 'lucide-react';
import { Post } from './components/Post';

interface Post {
  id: number;
  date: string;
  time: string;
  content: string;
}

export default function App() {
  const [newPostContent, setNewPostContent] = useState('');
  const [feeling, setFeeling] = useState('...');
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const posts = localStorage.getItem('@digiario:posts');
    if (posts) {
      setPosts(JSON.parse(posts));
    }
  }, []);

  function handleCreateNewPost(event: React.FormEvent) {
    event.preventDefault();
    if (!newPostContent.trim()) return;

    const date = new Date();

    const dateFormatted = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    const timeFormatted = `${date.getHours()}:${date.getMinutes()}`;

    const newPost = {
      id: posts.length > 0 ? posts[0].id + 1 : 1,
      date: dateFormatted,
      time: timeFormatted,
      content: newPostContent,
    };

    setPosts((oldState) => [newPost, ...oldState]);
    localStorage.setItem(
      '@digiario:posts',
      JSON.stringify([newPost, ...posts])
    );
    setNewPostContent('');
  }

  function handleDeletePost(id: number) {
    const res = confirm('Tem certeza que deseja excluir este post?');

    if (!res) return;

    const postsFiltered = posts.filter((post: Post) => post.id !== id);
    localStorage.setItem('@digiario:posts', JSON.stringify(postsFiltered));
    setPosts(postsFiltered);
  }

  return (
    <div>
      <header className='bg-gradient-to-b from-violet-600 to-violet-800 h-40 rounded-b-lg'>
        <div className='px-6 py-5'>
          <div className='flex justify-between'>
            <h2 className='font-title text-violet-50 text-2xl'>Digiário</h2>
            <img
              className='w-9 h-9 rounded-full'
              src='https://github.com/yuripiresalves.png'
              alt='Yuri'
            />
          </div>
          <p className='text-violet-300 text-sm mt-1'>
            Hoje eu estou{' '}
            <input
              type='text'
              className='text-violet-200 bg-transparent font-bold focus:outline-none '
              value={feeling}
              onChange={(e) => setFeeling(e.target.value)}
            />
          </p>
        </div>
      </header>

      <form
        onSubmit={handleCreateNewPost}
        className='px-6 flex flex-col gap-3 -mt-16'
      >
        <textarea
          className='rounded-lg resize-none bg-violet-50 border border-violet-100 p-4 placeholder:text-zinc-400'
          placeholder='Escreva seus pensamentos...'
          rows={5}
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
        ></textarea>

        <button className='flex gap-3 justify-center items-center font-title bg-violet-500 hover:bg-violet-700 text-white rounded-lg p-3 transition-colors'>
          <Pencil className='w-5 h-5' />
          Publicar
        </button>
      </form>

      <main className='px-6 py-8 flex flex-col gap-8'>
        {posts.length > 0 ? (
          posts.map((post) => (
            <Post
              id={post.id}
              date={post.date}
              time={post.time}
              content={post.content}
              handleDeletePost={handleDeletePost}
            />
          ))
        ) : (
          <p>Nenhum post encontrado</p>
        )}
      </main>
    </div>
  );
}
