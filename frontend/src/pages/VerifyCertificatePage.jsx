import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Shield, CheckCircle, XCircle, Search } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut" }
};

const VerifyCertificatePage = () => {
  const [certificateId, setCertificateId] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!certificateId.trim()) return;
    
    setLoading(true);
    setResult(null);
    
    try {
      const response = await axios.post(`${API}/verify-certificate`, {
        certificate_id: certificateId.trim()
      });
      setResult(response.data);
    } catch (error) {
      console.error("Error:", error);
      setResult({
        verified: false,
        message: "An error occurred while verifying. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-[72px]" data-testid="verify-certificate-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container-main">
          <motion.div {...fadeInUp} className="text-center">
            <Badge className="bg-[#1545ea]/10 text-[#1545ea] mb-4">
              <Shield className="w-4 h-4 mr-1" />
              Certificate Verification
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-4 font-['Manrope']">
              Verify Certificate
            </h1>
            <p className="text-lg text-[#4a4a4a] max-w-2xl mx-auto">
              Authenticate ETI Educom® certificates using the certificate ID
            </p>
          </motion.div>
        </div>
      </section>

      {/* Verification Form */}
      <section className="py-20 bg-white">
        <div className="container-main">
          <div className="max-w-xl mx-auto">
            <motion.div {...fadeInUp}>
              <Card className="card-default">
                <CardContent className="p-8">
                  <form onSubmit={handleVerify} className="space-y-6" data-testid="verify-form">
                    <div>
                      <label className="form-label">Certificate ID</label>
                      <div className="relative">
                        <Input
                          value={certificateId}
                          onChange={(e) => setCertificateId(e.target.value)}
                          placeholder="Enter certificate ID (e.g., ETI-2024-12345)"
                          className="form-input pr-12"
                          data-testid="certificate-id-input"
                        />
                        <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#717171]" />
                      </div>
                      <p className="text-sm text-[#717171] mt-2">
                        The certificate ID can be found on your certificate document
                      </p>
                    </div>
                    <Button 
                      type="submit" 
                      className="btn-primary w-full"
                      disabled={loading || !certificateId.trim()}
                      data-testid="verify-btn"
                    >
                      {loading ? "Verifying..." : "Verify Certificate"}
                    </Button>
                  </form>

                  {/* Result */}
                  {result && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mt-8 p-6 rounded-xl ${
                        result.verified 
                          ? "bg-green-50 border border-green-200" 
                          : "bg-red-50 border border-red-200"
                      }`}
                      data-testid="verify-result"
                    >
                      <div className="flex items-start gap-4">
                        {result.verified ? (
                          <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-8 h-8 text-red-600 flex-shrink-0" />
                        )}
                        <div>
                          <h3 className={`font-bold text-lg mb-2 ${
                            result.verified ? "text-green-800" : "text-red-800"
                          }`}>
                            {result.verified ? "Certificate Verified" : "Certificate Not Found"}
                          </h3>
                          <p className={result.verified ? "text-green-700" : "text-red-700"}>
                            {result.message}
                          </p>
                          
                          {result.verified && result.student_name && (
                            <div className="mt-4 space-y-2 text-sm">
                              <p><strong>Student Name:</strong> {result.student_name}</p>
                              {result.course_name && (
                                <p><strong>Course:</strong> {result.course_name}</p>
                              )}
                              {result.issue_date && (
                                <p><strong>Issue Date:</strong> {result.issue_date}</p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Help Text */}
            <motion.div {...fadeInUp} className="mt-8 text-center">
              <p className="text-[#717171] text-sm">
                Having trouble? Contact us at{" "}
                <a href="mailto:verify@etieducom.com" className="text-[#1545ea] hover:underline">
                  verify@etieducom.com
                </a>
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VerifyCertificatePage;
