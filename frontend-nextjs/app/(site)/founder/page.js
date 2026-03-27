export const metadata = {
  title: "Founder's Desk | ETI Educom®",
  description: 'A message from the founder of ETI Educom® on building structured computer career education.',
  alternates: { canonical: 'https://etieducom.com/founder' },
};

export default function FounderPage() {
  return (
    <div className="min-h-screen section-padding">
      <div className="container-main max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Founder&apos;s Desk</h1>
        <div className="prose prose-lg">
          <p className="text-xl text-gray-600 mb-8">
            Welcome to ETI Educom. Our journey began with a simple vision: 
            to bridge the gap between traditional education and industry requirements.
          </p>
          <p className="text-gray-600">
            Since 2017, we have been committed to transforming lives through 
            structured, career-focused IT education. Every student who walks 
            through our doors is a future IT professional in the making.
          </p>
        </div>
      </div>
    </div>
  );
}
