import React from "react";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { Badge } from "../components/ui/badge";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut" }
};

const PrivacyPolicyPage = () => {
  return (
    <div className="pt-[72px]" data-testid="privacy-policy-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container-main">
          <motion.div {...fadeInUp} className="text-center">
            <Badge className="bg-[#1545ea]/10 text-[#1545ea] mb-4">
              <Shield className="w-4 h-4 mr-1" />
              Legal
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-4 font-['Poppins']">
              Privacy Policy
            </h1>
            <p className="text-lg text-[#4a4a4a]">
              Last updated: February 2025
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="container-main">
          <motion.div {...fadeInUp} className="max-w-3xl mx-auto prose prose-lg">
            
            <h2>Introduction</h2>
            <p>
              ETI Educom® ("we," "our," or "us"), a unit of ETI Learning Systems Private Limited, 
              is committed to protecting your privacy. This Privacy Policy explains how we collect, 
              use, disclose, and safeguard your information when you visit our website or enroll in our programs.
            </p>

            <h2>Information We Collect</h2>
            <h3>Personal Information</h3>
            <p>We may collect personal information that you voluntarily provide, including:</p>
            <ul>
              <li>Name and contact information (email, phone number, address)</li>
              <li>Educational background and qualifications</li>
              <li>Employment information (for franchise or career inquiries)</li>
              <li>Payment information (for course enrollments)</li>
              <li>Government-issued identification (for certification verification)</li>
            </ul>

            <h3>Automatically Collected Information</h3>
            <p>When you visit our website, we may automatically collect:</p>
            <ul>
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>IP address</li>
              <li>Pages visited and time spent</li>
              <li>Referring website</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use the collected information for:</p>
            <ul>
              <li>Processing enrollments and providing educational services</li>
              <li>Communicating about courses, events, and updates</li>
              <li>Responding to inquiries and providing support</li>
              <li>Sending promotional materials (with your consent)</li>
              <li>Improving our website and services</li>
              <li>Complying with legal obligations</li>
            </ul>

            <h2>Information Sharing</h2>
            <p>We may share your information with:</p>
            <ul>
              <li><strong>Certification Partners:</strong> Microsoft, Adobe, and other certification bodies for exam registration</li>
              <li><strong>Placement Partners:</strong> Companies for job placement purposes (with your consent)</li>
              <li><strong>Service Providers:</strong> Third parties who assist in website operations</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
            </ul>

            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal 
              information against unauthorized access, alteration, disclosure, or destruction. However, 
              no internet transmission is completely secure, and we cannot guarantee absolute security.
            </p>

            <h2>Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent (where applicable)</li>
            </ul>

            <h2>Cookies</h2>
            <p>
              Our website uses cookies to enhance your browsing experience. You can control cookies 
              through your browser settings. Disabling cookies may affect some website functionality.
            </p>

            <h2>Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the 
              privacy practices of these external sites. We encourage you to review their privacy policies.
            </p>

            <h2>Children's Privacy</h2>
            <p>
              Our services are not directed to children under 13. We do not knowingly collect personal 
              information from children. If you believe we have collected such information, please contact us.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. The updated version will be indicated 
              by the "Last updated" date. We encourage you to review this policy periodically.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <ul>
              <li><strong>Email:</strong> info@etieducom.com</li>
              <li><strong>Phone:</strong> Contact our helpline</li>
              <li><strong>Address:</strong> ETI Educom Head Office, India</li>
            </ul>

            <div className="bg-[#ebebeb] rounded-lg p-6 mt-8">
              <p className="text-sm text-[#4a4a4a] mb-0">
                <strong>ETI Learning Systems Private Limited</strong><br />
                Registered under the Companies Act, 2013<br />
                Trading as ETI Educom®
              </p>
            </div>

          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
