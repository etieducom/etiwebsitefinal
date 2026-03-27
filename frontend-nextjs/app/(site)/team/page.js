export const metadata = {
  title: 'Our Team | ETI Educom®',
  description: 'Meet the team behind ETI Educom® dedicated to structured computer career education.',
  alternates: { canonical: 'https://etieducom.com/team' },
};

export default function TeamPage() {
  return (
    <div className="min-h-screen section-padding">
      <div className="container-main">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Our Team</h1>
        <p className="text-xl text-gray-600 mb-8">
          Meet the dedicated professionals who make ETI Educom a leading IT training institute.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card text-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
            <h3 className="font-bold text-gray-900">Expert Faculty</h3>
            <p className="text-sm text-gray-600">Industry Professionals</p>
          </div>
        </div>
      </div>
    </div>
  );
}
