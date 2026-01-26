'use client';

import Image from 'next/image';
import { useEffect, useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Clock } from '@/public/icons';

interface IProjectMedia {
  video?: string;
  photos?: string[];
}

interface IProject {
  title: string;
  description: string;
  img: string;
  url: Array<{ type: string; url: string }>;
  media?: IProjectMedia;
  startDate?: string;
  endDate?: string;
  technologies?: string[];
  implemented?: string[];
}

// Функция для форматирования даты в "МММ YYYY"
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const months = [
    'Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн',
    'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'
  ];
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
}

// Функция для расчёта количества месяцев между датами
function calculateMonths(startDate: string, endDate?: string): number {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  
  const yearsDiff = end.getFullYear() - start.getFullYear();
  const monthsDiff = end.getMonth() - start.getMonth();
  
  return yearsDiff * 12 + monthsDiff + 1; // +1 чтобы включить оба месяца
}

// Функция для форматирования длительности
function formatDuration(months: number): string {
  if (months < 12) {
    return `${months} ${months === 1 ? 'месяц' : months < 5 ? 'месяца' : 'месяцев'}`;
  }
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  if (remainingMonths === 0) {
    return `${years} ${years === 1 ? 'год' : years < 5 ? 'года' : 'лет'}`;
  }
  
  const yearStr = `${years} ${years === 1 ? 'год' : years < 5 ? 'года' : 'лет'}`;
  const monthStr = `${remainingMonths} ${remainingMonths === 1 ? 'месяц' : remainingMonths < 5 ? 'месяца' : 'месяцев'}`;
  return `${yearStr} ${monthStr}`;
}

export default function Project({
  title,
  description,
  img,
  url,
  media,
  startDate,
  endDate,
  technologies = [],
  implemented = [],
}: IProject) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const handleVideoError = useCallback(() => setVideoError(true), []);
  useEffect(() => {
    if (!isModalOpen && media?.video) setVideoError(false);
  }, [isModalOpen, media?.video]);

  useEffect(() => {
    if (!isModalOpen) return;

    closeBtnRef.current?.focus();
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
      cardRef.current?.focus({ preventScroll: true });
    };
  }, [isModalOpen, closeModal]);

  return (
    <>
      <div className="relative flex text-code flex-col gap-3.5">
        <div className="flex items-center gap-2">
          <span className="font-bold text-blue">{title}</span>
        </div>
        <div
          ref={cardRef}
          role="button"
          tabIndex={0}
          onClick={() => setIsModalOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsModalOpen(true);
            }
          }}
          className="flex flex-col rounded-2xl h-64 max-w-96 border bg-black-dark cursor-pointer hover:border-blue/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue/50"
        >
          <div className="overflow-hidden h-1/2 rounded-t-2xl border-b-0">
            <Image src={img} alt={`project ${title}`} height={1000} width={1000} />
          </div>
          <div className="p-5 flex flex-col justify-between grow border-t">{startDate && (
              <div className="flex items-center gap-1.5 text-xs text-gray shrink-0 mb-1">
                <Clock className="w-3 h-3 text-blue shrink-0" aria-hidden="true" />
                <span>
                  {formatDate(startDate)} — {endDate ? formatDate(endDate) : 'н.в.'}
                </span>
                <span className="text-blue font-medium">
                  · {formatDuration(calculateMonths(startDate, endDate))}
                </span>
              </div>
            )}
            <span className="text-gray">{description}</span>
            <div className="flex gap-5 flex-wrap">
              {url.map((link) => (
                <a
                  href={link.url}
                  key={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-xs px-5 py-1.5 bg-black-light rounded-lg w-fit hover:bg-line transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  {link.type}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-background/90 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
          >
            <div
              className="absolute inset-0"
              onClick={closeModal}
              aria-hidden="true"
            />
            <div
              className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl border border-line bg-black-dark shadow-2xl flex flex-col animate-modal-in"
              onClick={(e) => e.stopPropagation()}
            >
            <div className="flex items-center justify-between shrink-0 px-6 py-4 border-b border-line">
              <h2 id="project-modal-title" className="text-label font-bold text-blue">
                {title}
              </h2>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={closeModal}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-gray hover:border-blue hover:text-blue transition-colors"
                aria-label="Закрыть"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="overflow-y-auto flex-1">
              <div className="relative w-full aspect-video shrink-0 border-b border-line bg-black overflow-hidden">
                <Image
                  src={img}
                  alt={`${title} — превью`}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 896px) 100vw, 896px"
                />
              </div>

              <div className="p-6 space-y-6">
                <p className="text-code text-gray leading-relaxed">{description}</p>

                {startDate && (
                  <div className="rounded-xl border border-line bg-black-light/50 p-4">
                    <p className="text-xs font-medium text-blue mb-3">Период работы</p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-light"></div>
                        <span className="text-xs text-gray">
                          {formatDate(startDate)}
                        </span>
                        <span className="text-xs text-gray">—</span>
                        <span className="text-xs text-gray">
                          {endDate ? formatDate(endDate) : 'По настоящее время'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 pl-4 sm:pl-0 sm:ml-auto">
                        <Clock className="w-3.5 h-3.5 text-blue shrink-0" aria-hidden="true" />
                        <span className="text-xs font-medium text-blue">
                          {formatDuration(calculateMonths(startDate, endDate))}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {media?.video && (
                  <div className="rounded-xl border border-line bg-black-light/50 p-4">
                  <p className="text-xs font-medium text-blue mb-3">Медиа</p>
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-line bg-black">
                      {videoError ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center text-xs text-gray">
                          <span>Не удалось загрузить видео.</span>
                        </div>
                      ) : (
                        <video
                          src={media.video}
                          controls
                          className="w-full h-full object-contain"
                          preload="metadata"
                          playsInline
                          onError={handleVideoError}
                        >
                          Ваш браузер не поддерживает воспроизведение видео.
                        </video>
                      )}
                    </div>
                </div>
                )}

                {technologies.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-blue mb-2">Технологии</p>
                    <div className="flex flex-wrap gap-2">
                      {technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-lg border border-line bg-black-light px-3 py-1.5 text-xs text-gray"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {implemented.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-blue mb-2">Реализовано</p>
                    <ul className="list-inside list-disc space-y-1.5 text-xs text-gray">
                      {implemented.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {url.length > 0 && (
                  <div className="flex flex-wrap gap-3 pt-2">
                    {url.map((link) => (
                      <a
                        href={link.url}
                        key={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white text-xs px-5 py-2.5 bg-black-light rounded-lg hover:bg-line border border-line hover:border-blue/50 transition-colors"
                      >
                        {link.type}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>,
          document.body
        )}
    </>
  );
}
