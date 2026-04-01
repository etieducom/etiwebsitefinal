'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Shield, 
  Award,
  CheckCircle,
  XCircle,
  ChevronRight,
  Download,
  RotateCcw,
  Trophy,
  Clock,
  User,
  Mail,
  Phone,
  Building2,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner';
import html2canvas from 'html2canvas';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

// 10 Cybersecurity Quiz Questions
const quizQuestions = [
  {
    id: 1,
    question: "What is phishing?",
    options: [
      "A type of fishing sport",
      "A cyber attack that tricks users into revealing sensitive information",
      "A software for editing photos",
      "A type of computer virus"
    ],
    correct: 1
  },
  {
    id: 2,
    question: "Which of the following is the strongest password?",
    options: [
      "password123",
      "john1990",
      "Tr0ub4dor&3#Secure!",
      "qwerty"
    ],
    correct: 2
  },
  {
    id: 3,
    question: "What does 2FA stand for?",
    options: [
      "Two Factor Authentication",
      "Two File Access",
      "Transfer File Application",
      "Two Finger Access"
    ],
    correct: 0
  },
  {
    id: 4,
    question: "What should you do if you receive an email from your 'bank' asking for your password?",
    options: [
      "Reply with your password immediately",
      "Click on the link and enter your details",
      "Ignore it and contact your bank directly through official channels",
      "Forward it to all your contacts"
    ],
    correct: 2
  },
  {
    id: 5,
    question: "What is a firewall?",
    options: [
      "A wall that prevents fire",
      "A security system that monitors and controls network traffic",
      "A type of computer screen",
      "An antivirus software"
    ],
    correct: 1
  },
  {
    id: 6,
    question: "Which of these is a sign of a fake/scam website?",
    options: [
      "URL starts with HTTPS",
      "Has a padlock icon",
      "Misspelled domain name (amaz0n.com instead of amazon.com)",
      "Has a privacy policy"
    ],
    correct: 2
  },
  {
    id: 7,
    question: "What is ransomware?",
    options: [
      "Software that gives you free stuff",
      "Malware that encrypts files and demands payment for decryption",
      "A tool for backing up data",
      "An online shopping platform"
    ],
    correct: 1
  },
  {
    id: 8,
    question: "What should you do before clicking a link in an email?",
    options: [
      "Click immediately if it looks interesting",
      "Hover over it to see the actual URL destination",
      "Forward it to friends first",
      "Delete the email without reading"
    ],
    correct: 1
  },
  {
    id: 9,
    question: "Which is the safest practice for online banking?",
    options: [
      "Use public WiFi for convenience",
      "Save password in browser on shared computers",
      "Use a secure, private network and enable 2FA",
      "Share OTP with bank callers"
    ],
    correct: 2
  },
  {
    id: 10,
    question: "What is social engineering in cybersecurity?",
    options: [
      "Building social media apps",
      "Manipulating people to reveal confidential information",
      "Engineering social networks",
      "Creating dating websites"
    ],
    correct: 1
  }
];

export default function WarriorsAssessmentClient() {
  const [step, setStep] = useState('register'); // register, quiz, result
  const [studentData, setStudentData] = useState({
    name: '',
    email: '',
    phone: '',
    college: ''
  });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const certificateRef = useRef(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!studentData.name || !studentData.phone || !studentData.email) {
      toast.error('Please fill all required fields');
      return;
    }

    // Validate phone
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(studentData.phone.replace(/\D/g, ''))) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(studentData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setStep('quiz');
    toast.success('Registration successful! Starting assessment...');
  };

  const handleAnswer = (questionId, answerIndex) => {
    setAnswers({ ...answers, [questionId]: answerIndex });
  };

  const handleNext = () => {
    if (answers[quizQuestions[currentQuestion].id] === undefined) {
      toast.error('Please select an answer');
      return;
    }
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitQuiz = async () => {
    if (Object.keys(answers).length < quizQuestions.length) {
      toast.error('Please answer all questions');
      return;
    }

    setSubmitting(true);

    // Calculate score
    let correctCount = 0;
    quizQuestions.forEach((q) => {
      if (answers[q.id] === q.correct) {
        correctCount++;
      }
    });
    setScore(correctCount);

    // Save to database
    try {
      await fetch(`${API_URL}/api/cyber-warriors/assessment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...studentData,
          score: correctCount,
          total: quizQuestions.length,
          passed: correctCount >= 7,
          completed_at: new Date().toISOString()
        })
      });
    } catch (error) {
      console.log('Failed to save assessment');
    }

    setSubmitting(false);
    setStep('result');
  };

  const downloadCertificate = async () => {
    if (!certificateRef.current) return;
    
    toast.loading('Generating certificate...');
    
    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true
      });
      
      const link = document.createElement('a');
      link.download = `CyberWarrior_Certificate_${studentData.name.replace(/\s+/g, '_')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      
      toast.dismiss();
      toast.success('Certificate downloaded!');
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to generate certificate. Please try again.');
    }
  };

  const restartAssessment = () => {
    setStep('register');
    setStudentData({ name: '', email: '', phone: '', college: '' });
    setCurrentQuestion(0);
    setAnswers({});
    setScore(0);
  };

  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-bold text-white text-lg">Cyber Warriors</span>
                <span className="text-xs text-gray-400 block">by ETI Educom</span>
              </div>
            </Link>
            <Link href="/cyber-warriors" className="text-sm text-gray-400 hover:text-white transition-colors">
              ← Back to Cyber Warriors
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        
        {/* Registration Step */}
        {step === 'register' && (
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Free Assessment
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Cyber Warrior Assessment
            </h1>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
              Test your cybersecurity knowledge with our 10-question quiz. 
              Score 7 or more to earn your Cyber Warrior Certificate!
            </p>

            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 max-w-lg mx-auto">
              <h2 className="text-2xl font-bold text-white mb-6">Enter Your Details</h2>
              
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Your Full Name *"
                    value={studentData.name}
                    onChange={(e) => setStudentData({ ...studentData, name: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    required
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Email Address *"
                    value={studentData.email}
                    onChange={(e) => setStudentData({ ...studentData, email: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    required
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    value={studentData.phone}
                    onChange={(e) => setStudentData({ ...studentData, phone: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    required
                  />
                </div>

                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="College/Organization Name (Optional)"
                    value={studentData.college}
                    onChange={(e) => setStudentData({ ...studentData, college: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] mt-6"
                >
                  Start Assessment
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>

              <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  ~5 minutes
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Certificate on pass
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quiz Step */}
        {step === 'quiz' && (
          <div>
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
                <span>{Math.round(((currentQuestion + 1) / quizQuestions.length) * 100)}% Complete</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              <div className="flex items-start gap-4 mb-8">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary font-bold text-lg flex-shrink-0">
                  {currentQuestion + 1}
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {quizQuestions[currentQuestion].question}
                </h2>
              </div>

              <div className="space-y-3">
                {quizQuestions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(quizQuestions[currentQuestion].id, index)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      answers[quizQuestions[currentQuestion].id] === index
                        ? 'bg-primary/20 border-primary text-white'
                        : 'bg-white/5 border-white/10 text-gray-300 hover:border-white/30 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        answers[quizQuestions[currentQuestion].id] === index
                          ? 'border-primary bg-primary'
                          : 'border-gray-500'
                      }`}>
                        {answers[quizQuestions[currentQuestion].id] === index && (
                          <CheckCircle className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <span>{option}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className="px-6 py-3 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  ← Previous
                </button>

                {currentQuestion < quizQuestions.length - 1 ? (
                  <button
                    onClick={handleNext}
                    className="px-8 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl flex items-center gap-2 transition-all"
                  >
                    Next
                    <ChevronRight className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitQuiz}
                    disabled={submitting}
                    className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl flex items-center gap-2 transition-all disabled:opacity-70"
                  >
                    {submitting ? 'Submitting...' : 'Submit Quiz'}
                    <Award className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Question Navigator */}
            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              {quizQuestions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-10 h-10 rounded-lg font-semibold text-sm transition-all ${
                    currentQuestion === index
                      ? 'bg-primary text-white'
                      : answers[quizQuestions[index].id] !== undefined
                      ? 'bg-green-600/20 text-green-400 border border-green-600/50'
                      : 'bg-white/10 text-gray-400 hover:bg-white/20'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Result Step */}
        {step === 'result' && (
          <div className="text-center">
            {score >= 7 ? (
              <>
                <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Trophy className="w-12 h-12 text-green-400" />
                </div>
                <h1 className="text-4xl font-bold text-white mb-4">
                  Congratulations, Cyber Warrior!
                </h1>
                <p className="text-gray-400 text-lg mb-2">
                  You scored <span className="text-green-400 font-bold">{score}/10</span>
                </p>
                <p className="text-gray-400 mb-8">
                  You&apos;ve demonstrated excellent cybersecurity awareness. Download your certificate below!
                </p>

                {/* Certificate */}
                <div 
                  ref={certificateRef}
                  className="bg-white rounded-2xl p-8 mx-auto mb-8 max-w-2xl text-gray-900"
                  style={{ aspectRatio: '1.414' }}
                >
                  <div className="border-4 border-primary/30 rounded-xl p-6 h-full flex flex-col">
                    {/* Certificate Header */}
                    <div className="text-center mb-4">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Shield className="w-8 h-8 text-primary" />
                        <span className="text-2xl font-bold text-primary">ETI Educom®</span>
                      </div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">presents this</p>
                    </div>

                    {/* Certificate Title */}
                    <div className="text-center mb-4">
                      <h2 className="text-3xl font-bold text-gray-900 mb-1">Certificate of Achievement</h2>
                      <div className="flex items-center justify-center gap-2">
                        <div className="h-px w-16 bg-primary/50"></div>
                        <Award className="w-6 h-6 text-primary" />
                        <div className="h-px w-16 bg-primary/50"></div>
                      </div>
                    </div>

                    {/* Cyber Warrior Badge */}
                    <div className="text-center mb-4">
                      <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold">
                        CYBER WARRIOR
                      </span>
                    </div>

                    {/* Recipient Name */}
                    <div className="text-center flex-1 flex flex-col justify-center">
                      <p className="text-gray-600 mb-2">This is to certify that</p>
                      <h3 className="text-3xl font-bold text-gray-900 mb-2 border-b-2 border-primary/30 pb-2 inline-block mx-auto px-8">
                        {studentData.name}
                      </h3>
                      <p className="text-gray-600 mt-2 text-sm max-w-md mx-auto">
                        has successfully completed the Cyber Warriors Assessment with a score of {score}/10, 
                        demonstrating proficiency in cybersecurity awareness and digital safety.
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                      <div className="text-left">
                        <p className="text-xs text-gray-500">Date</p>
                        <p className="text-sm font-semibold">{currentDate}</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-1 flex items-center justify-center">
                          <Shield className="w-12 h-12 text-primary" />
                        </div>
                        <p className="text-xs text-gray-500">Verified</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Certificate ID</p>
                        <p className="text-sm font-semibold">CW-{Date.now().toString(36).toUpperCase()}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                  <button
                    onClick={downloadCertificate}
                    className="px-8 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl flex items-center gap-2 transition-all"
                  >
                    <Download className="w-5 h-5" />
                    Download Certificate
                  </button>
                  <button
                    onClick={restartAssessment}
                    className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl flex items-center gap-2 transition-all"
                  >
                    <RotateCcw className="w-5 h-5" />
                    Take Again
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <XCircle className="w-12 h-12 text-red-400" />
                </div>
                <h1 className="text-4xl font-bold text-white mb-4">
                  Keep Learning!
                </h1>
                <p className="text-gray-400 text-lg mb-2">
                  You scored <span className="text-red-400 font-bold">{score}/10</span>
                </p>
                <p className="text-gray-400 mb-8">
                  You need 7 or more correct answers to earn the Cyber Warrior certificate. 
                  Don&apos;t worry, you can try again!
                </p>

                {/* Show Correct Answers */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-left mb-8 max-w-2xl mx-auto">
                  <h3 className="text-lg font-bold text-white mb-4">Review Your Answers:</h3>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {quizQuestions.map((q, index) => (
                      <div key={q.id} className="flex items-start gap-3 text-sm">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                          answers[q.id] === q.correct ? 'bg-green-500' : 'bg-red-500'
                        }`}>
                          {answers[q.id] === q.correct ? (
                            <CheckCircle className="w-4 h-4 text-white" />
                          ) : (
                            <XCircle className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <div>
                          <p className="text-gray-300">Q{index + 1}: {q.question}</p>
                          {answers[q.id] !== q.correct && (
                            <p className="text-green-400 text-xs mt-1">
                              Correct: {q.options[q.correct]}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                  <button
                    onClick={restartAssessment}
                    className="px-8 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl flex items-center gap-2 transition-all"
                  >
                    <RotateCcw className="w-5 h-5" />
                    Try Again
                  </button>
                  <Link
                    href="/cyber-warriors"
                    className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl flex items-center gap-2 transition-all"
                  >
                    Learn More
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} ETI Educom® | Cyber Warriors Initiative
          </p>
        </div>
      </footer>
    </div>
  );
}
