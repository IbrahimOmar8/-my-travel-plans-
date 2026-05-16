export function StarRating({
  value,
  size = "sm"
}: {
  value: number;
  size?: "sm" | "md" | "lg";
}) {
  const px = size === "lg" ? "text-2xl" : size === "md" ? "text-lg" : "text-base";
  return (
    <span
      className={`inline-flex items-center text-amber-500 ${px}`}
      aria-label={`${value} out of 5`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} aria-hidden>
          {i <= Math.round(value) ? "★" : "☆"}
        </span>
      ))}
    </span>
  );
}
