export default function Loading() {
  return (
    <div className="container-page py-20">
      <div className="space-y-6">
        <div className="h-8 w-32 animate-pulse rounded-full bg-sand-200" />
        <div className="h-12 w-2/3 animate-pulse rounded-lg bg-sand-200" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-sand-200" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5"
            >
              <div className="aspect-[16/10] animate-pulse bg-sand-200" />
              <div className="space-y-3 p-5">
                <div className="h-5 w-3/4 animate-pulse rounded bg-sand-200" />
                <div className="h-4 w-full animate-pulse rounded bg-sand-100" />
                <div className="h-4 w-5/6 animate-pulse rounded bg-sand-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
