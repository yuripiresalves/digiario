import { Trash2 } from 'lucide-react';

interface PostProps {
  id: number;
  date: string;
  time: string;
  content: string;
  handleDeletePost: (id: number) => void;
}

export function Post({ id, date, time, content, handleDeletePost }: PostProps) {
  const hour = time.split(':')[0];
  const minute = time.split(':')[1];

  time = `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`;

  return (
    <div
      key={id}
      className='bg-violet-50 p-4 flex flex-col gap-5 rounded-lg border border-violet-100'
    >
      <header className='flex justify-between'>
        <div className='flex items-center gap-2'>
          <strong className='text-xl'>{date}</strong>
          <span className='text-xs font-semibold text-zinc-400'>às {time}</span>
        </div>
        <button onClick={() => handleDeletePost(id)}>
          <Trash2 className='w-4 h-4 text-zinc-400 hover:text-red-500 transition-colors' />
        </button>
      </header>
      <p>{content}</p>
    </div>
  );
}
