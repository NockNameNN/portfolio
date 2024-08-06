import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import highlightjs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import { Close, Comments } from '@/public/icons';

interface GistOwner {
  login: string;
  avatar_url: string;
}

interface GistFile {
  filename: string;
  type: string;
  language: string;
  raw_url: string;
  size: number;
  content: string;
}

interface Gist {
  id: string;
  description: string;
  public: boolean;
  created_at: string;
  updated_at: string;
  comments: number;
  comments_url: string;
  owner: GistOwner;
  files: { [key: string]: GistFile };
}

interface GistSnippetProps {
  id: string;
}

const GistSnippet: React.FC<GistSnippetProps> = ({ id }) => {
  const [gist, setGist] = useState<Gist | null>(null);
  const [monthsAgo, setMonthsAgo] = useState<number | null>(null);
  const [content, setContent] = useState<string | null>(null);
  const [language, setLanguage] = useState<string | null>(null);
  const [dataFetched, setDataFetched] = useState(false);
  const [comment, setComment] = useState<string | null>(null);

  const setValues = useCallback(async (gist: Gist) => {
    setGist(gist);
    setMonthsAgo(setMonths(gist.created_at));
    setContent(setSnippet(gist));
    setLanguage(Object.values(gist.files)[0].language);
    setDataFetched(true);
    setComment(await setComments(gist.comments_url));
  }, []);

  useEffect(() => {
    fetch(`https://api.github.com/gists/${id}`)
      .then(response => response.json())
      .then(data => setValues(data));
  }, [id, setValues]);

  const setMonths = (date: string): number => {
    let now = new Date();
    let gistDate = new Date(date);
    let diff = now.getTime() - gistDate.getTime();
    let days = Math.floor(diff / (1000 * 3600 * 24));
    let months = Math.floor(days / 30);
    return months;
  };

  const setSnippet = (gist: Gist): string => {
    let snippet = Object.values(gist.files)[0].content;
    return snippet;
  };

  const setComments = async (comments_url: string): Promise<string | null> => {
    let response = await fetch(comments_url);
    let data = await response.json();
    try {
      let body = data[0].body;
      return body;
    } catch {
      console.log(`no comments found on ${comments_url}`);
      return null;
    }
  };

  const showComment = (id: string) => {
    let comment = document.getElementById('comment' + id);
    comment?.classList.toggle('hidden');
  };

  return (
    dataFetched && (
    <div className="mb-5">
        <div className="flex justify-between my-2">
            <div className="flex">
                {gist?.owner.avatar_url && (
                <Image
                    src={gist.owner.avatar_url}
                    width={36}
                    height={36}
                    alt="Аватарка"
                    className="w-8 h-8 rounded-full mr-2"
                />
            )}
                <div className="flex flex-col">
                    <a
                        id="username"
                        href={`https://github.com/${gist?.owner.login}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-purple-500 text-xs pb-1 hover:cursor-pointer"
                    >
                        @{gist?.owner.login}
                    </a>
                    <p className="text-xs text-gray-500">
                        Создано {monthsAgo} месяцев назад
                    </p>
                </div>
            </div>
            <div className="flex text-gray-500 text-xs justify-self-end lg:mx-2">
                <div
                    className="flex lg:mx-2 hover:cursor-pointer hover:text-white"
                    onClick={() => showComment(gist!.id)}
                >
                    <Comments className='mr-2' />
                    <span>комментарий</span>
                </div>
            </div>
        </div>
        <div className="bg-black-dark p-2 rounded-lg border text-xs max-h-[220px]">
            <pre className="m-0 w-full max-h-[220px]">
                <code
                    className="hljs"
                    dangerouslySetInnerHTML={{ __html: highlightjs.highlight(content!, { language: language! }).value }}
                />
            </pre>
        </div>
        <div
            id={'comment' + gist!.id}
            className="flex hidden justify-between text-gray-500 mt-4 pt-4 border-t"
        >
            <p
                id="comment"
                className="w-5/6"
            >
                {comment ? comment : 'Нет комментариев.'}
            </p>
            <Close
                className="cursor-pointer"
                onClick={() => showComment(gist!.id)}
            />
        </div>
    </div>
    )
  );
};

export default GistSnippet;
