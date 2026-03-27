export const metadata = {
  title: 'Blog | ETI Educom®',
  description: 'Read insights on technology, career guidance, and digital skills from ETI Educom®.',
  alternates: { canonical: 'https://etieducom.com/blogs' },
};

export default function BlogsPage() {
  return (
    <div className="min-h-screen section-padding">
      <div className="container-main">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Blog</h1>
        <p className="text-xl text-gray-600 mb-8">
          Insights, tips, and guides for your IT career journey.
        </p>
      </div>
    </div>
  );
}
