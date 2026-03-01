'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const YANDEX_METRIKA_ID = 107062974;

declare global {
  interface Window {
    ym?: (id: number, action: string, ...args: unknown[]) => void;
  }
}

export default function YandexMetrika() {
  const pathname = usePathname();

  // Установка счётчика с defer: true для SPA (ручная отправка просмотров через hit)
  useEffect(() => {
    const script = document.createElement('script');
    script.id = 'yandex-metrika';
    script.innerHTML = `
      (function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) { if (document.scripts[j].src === r) { return; } }
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
      })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js?id=${YANDEX_METRIKA_ID}', 'ym');

      ym(${YANDEX_METRIKA_ID}, 'init', {
        defer: true,
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true
      });
    `;
    document.body.appendChild(script);
    return () => {
      const el = document.getElementById('yandex-metrika');
      if (el) el.remove();
    };
  }, []);

  // Отправка hit при каждом изменении страницы (переход по SPA)
  useEffect(() => {
    if (typeof window === 'undefined' || !window.ym) return;
    const url = window.location.href;
    window.ym(YANDEX_METRIKA_ID, 'hit', url, {
      title: document.title,
      referrer: document.referrer || undefined,
    });
  }, [pathname]);

  return (
    <noscript>
      <div>
        <img
          src={`https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}`}
          style={{ position: 'absolute', left: '-9999px' }}
          alt=""
        />
      </div>
    </noscript>
  );
}
