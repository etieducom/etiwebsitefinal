export const metadata = {
  title: 'Program Details | ETI Educom®',
  description: 'Detailed information about our IT training programs and courses.',
};

export default function ProgramDetailPage({ params }) {
  return (
    <div className="min-h-screen section-padding">
      <div className="container-main">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Program Details</h1>
        <p className="text-xl text-gray-600 mb-8">
          Detailed information about this program will be loaded here.
        </p>
      </div>
    </div>
  );
}
