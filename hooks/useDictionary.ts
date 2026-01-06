import { useState, useEffect } from 'react';
import { DICTIONARY_SOURCES, WORD_LENGTH } from '../constants';

interface UseDictionaryResult {
  dictionary: Set<string>;
  isLoading: boolean;
  error: string | null;
  addWord: (word: string) => void;
}

export function useDictionary(): UseDictionaryResult {
  const [dictionary, setDictionary] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDictionary = async () => {
      for (const url of DICTIONARY_SOURCES) {
        try {
          const response = await fetch(url, { cache: 'no-cache' });
          if (!response.ok) continue;

          const text = await response.text();
          const words = text
            .split(/\r?\n/)
            .map((w) => w.trim().toLowerCase())
            .filter((w) => w.length === WORD_LENGTH && /^[a-z]+$/.test(w));

          if (words.length > 0) {
            setDictionary(new Set(words));
            setIsLoading(false);
            return;
          }
        } catch (e) {
          console.warn(`Failed to fetch from ${url}, trying next...`);
        }
      }
      setError('Connection error. Check your network.');
      setIsLoading(false);
    };

    fetchDictionary();
  }, []);

  const addWord = (word: string) => {
    setDictionary((prev) => {
      const next = new Set(prev);
      next.add(word.toLowerCase());
      return next;
    });
  };

  return { dictionary, isLoading, error, addWord };
}
