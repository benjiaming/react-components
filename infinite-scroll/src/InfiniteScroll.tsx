import React, { useEffect, useRef, useState, useId } from "react";

type Post = {
  id: number;
  title: string;
  body: string;
};

export default function InfiniteScroll() {
  const [data, setData] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const limit = 10;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await fetch(
          `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
        );
        const json = await result.json();
        setData((prev) => [...prev, ...json]);
        setHasMore(json.length === limit);
      } catch (e) {
        console.error(e);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page]);

  useEffect(() => {
    if (!observerRef.current || !hasMore) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );
    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [loading, hasMore]);

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Infinite Posts</h1>
      <ul className="space-y-4">
        {data.map((post, i) => (
          <li key={i} className="border p-3 rounded shadow">
            <h2 className="text-lg font-semibold">{post.title}</h2>
            <p>
              {post.id} {post.body}
            </p>
          </li>
        ))}
      </ul>
      {loading && <p className="mt-4 text-gray-500">Loading more...</p>}
      {!hasMore && <p className="mt-4 text-gray-400">No more posts.</p>}
      <div ref={observerRef} className="h-1" />
    </div>
  );
}
