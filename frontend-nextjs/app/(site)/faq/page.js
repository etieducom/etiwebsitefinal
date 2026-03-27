export const metadata = {
  title: 'FAQ | ETI Educom®',
  description: 'Find answers to frequently asked questions about ETI Educom® programs, admissions and certifications.',
  alternates: { canonical: 'https://etieducom.com/faq' },
};

export default function FAQPage() {
  return (
    <div className="min-h-screen section-padding">
      <div className="container-main max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h1>
        <p className="text-xl text-gray-600 mb-8">
          Find answers to common questions about our programs and admissions.
        </p>
      </div>
    </div>
  );
}
