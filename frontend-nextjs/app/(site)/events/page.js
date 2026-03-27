export const metadata = {
  title: 'Events & Activities | ETI Educom®',
  description: 'Explore workshops, seminars and learning events organized by ETI Educom®.',
  alternates: { canonical: 'https://etieducom.com/events' },
};

export default function EventsPage() {
  return (
    <div className="min-h-screen section-padding">
      <div className="container-main">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Events & Activities</h1>
        <p className="text-xl text-gray-600 mb-8">
          Stay updated with our workshops, seminars, and career guidance sessions.
        </p>
      </div>
    </div>
  );
}
