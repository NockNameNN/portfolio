import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Custom404 = () => {
  const router = useRouter();

  useEffect(() => {
    // Редирект на главную страницу через 3 секунды
    const timer = setTimeout(() => {
      router.push('/');
    }, 3000);

    // Очистка таймера при размонтировании компонента
    return () => clearTimeout(timer);
  }, [router]);

  return (
      <div className="flex items-center justify-center h-screen">
          <div className="text-center">
              <h1 className="text-6xl font-bold">404</h1>
              <p className="mt-4 text-xl">Страница не найдена. Перенаправление на главную страницу...</p>
          </div>
      </div>
  );
};

export default Custom404;
