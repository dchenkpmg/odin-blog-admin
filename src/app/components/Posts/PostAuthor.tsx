export default function PostAuthor({ username }: { username: string }) {
  return (
    <span className="post-author">
      by <i>{username}</i>
    </span>
  );
}
