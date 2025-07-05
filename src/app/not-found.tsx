import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container-custom flex flex-col items-center justify-center min-h-[70vh] text-center">
      <h1 className="text-7xl font-bold text-[var(--primary-400)] mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-[var(--dark-200)] mb-8 max-w-md">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>
      
      <Link
        href="/"
        className="btn-primary"
      >
        Return Home
      </Link>
    </div>
  );
}