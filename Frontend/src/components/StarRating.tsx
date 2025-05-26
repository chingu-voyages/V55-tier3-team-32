export default function StarRating({ rating }: { rating: number }) {
  const stars = Array.from({ length: 5 }, (_, index) => {
    return (
      <svg
        key={index}
        className={`w-6 h-6 ${
          index < rating ? 'text-yellow-500' : 'text-gray-300'
        }`}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 .587l3.668 7.431L24 9.587l-6 5.873L19.335 24 12 20.896 4.665 24l1.335-8.54L0 9.587l8.332-1.569z" />
      </svg>
    );
  });

  return <div className="flex">{stars}</div>;
}
