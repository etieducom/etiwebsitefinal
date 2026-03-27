export const metadata = {
  title: 'Privacy Policy | ETI Educom®',
  description: "Read ETI Educom's privacy policy. Learn how we protect your personal information.",
  alternates: { canonical: 'https://etieducom.com/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen section-padding">
      <div className="container-main max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
        <div className="prose prose-lg">
          <p className="text-gray-600">
            This privacy policy explains how ETI Educom collects, uses, and protects your personal information.
          </p>
        </div>
      </div>
    </div>
  );
}
