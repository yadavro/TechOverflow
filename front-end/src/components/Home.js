import React from "react";
import developer from "../images/developer.png";
import "../util/home.css";
import { useNavigate } from "react-router-dom";
import { 
  FaUsers,
  FaQuestionCircle,
  FaCheckCircle,
  FaCode,
  FaClock,
  FaGlobe,
  FaMedal,
  FaRocket,
  FaLightbulb,
  FaHeart,
  FaStar,
  FaArrowRight,
  FaPlay,
  FaChartLine,
  FaShieldAlt,
  FaBolt,
  FaGem,
  FaLinux
} from "react-icons/fa";
import { 
  FaUbuntu
} from "react-icons/fa6";
import { 
  SiServerfault,
  SiSuperuser,
  SiGamedeveloper
} from "react-icons/si";
import { 
  BsDatabaseFillGear
} from "react-icons/bs";
import { 
  GiArtificialIntelligence
} from "react-icons/gi";
import { 
  PiNetworkSlashFill
} from "react-icons/pi";
import { 
  IoMdSettings
} from "react-icons/io";
import { 
  HiSparkles
} from "react-icons/hi";
import tech from '../images/tech.png';

function Home() {
  const navigate = useNavigate();
  
  const stats = [
    { number: "50M+", label: "Monthly Visitors", icon: <FaUsers /> },
    { number: "21M+", label: "Questions Asked", icon: <FaQuestionCircle /> },
    { number: "170+", label: "Communities", icon: <FaGlobe /> },
    { number: "99%", label: "Questions Answered", icon: <FaCheckCircle /> }
  ];

  const features = [
    {
      icon: <FaCode />,
      title: "Expert Answers",
      description: "Get solutions from experienced developers and industry professionals worldwide."
    },
    {
      icon: <FaClock />,
      title: "Fast Response",
      description: "Average response time of just 11 minutes for your technical questions."
    },
    {
      icon: <FaShieldAlt />,
      title: "Verified Solutions",
      description: "Community-verified answers ensure you get accurate, tested solutions."
    },
    {
      icon: <FaBolt />,
      title: "Real-time Help",
      description: "Connect with developers solving similar problems in real-time."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Senior Developer, Google",
      avatar: "👩‍💻",
      quote: "techOverflow has been my go-to resource for over 8 years. The community here is unmatched."
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO, StartupCo",
      avatar: "👨‍💼",
      quote: "Whenever my team hits a roadblock, we know we can find the answer on techOverflow."
    },
    {
      name: "Lisa Park",
      role: "Full Stack Engineer",
      avatar: "👩‍🔬",
      quote: "The quality of answers and the supportive community make learning enjoyable here."
    }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <HiSparkles />
              <span>Trusted by 50M+ Developers</span>
            </div>
            
            <h1 className="hero-title">
              Where <span className="highlight">developers</span> learn,
              <br />
              share, and build <span className="highlight-secondary">careers</span>
            </h1>
            
            <p className="hero-description">
              Join the world's largest developer community. Get instant answers to your coding questions, 
              share your knowledge, and connect with millions of developers worldwide.
            </p>
            
            <div className="hero-buttons">
              <button className="btn-primary" onClick={() => navigate('/signup')}>
                <FaRocket />
                Start Learning Free
              </button>
              <button className="btn-secondary" onClick={() => navigate('/questions')}>
                <FaPlay />
                Explore Questions
              </button>
            </div>

            <div className="hero-stats-quick">
              <div className="stat-item">
                <FaUsers />
                <span>50M+ Developers</span>
              </div>
              <div className="stat-item">
                <FaQuestionCircle />
                <span>21M+ Questions</span>
              </div>
              <div className="stat-item">
                <FaGlobe />
                <span>170+ Communities</span>
              </div>
            </div>
          </div>

          <div className="hero-image">
            <div className="hero-image-wrapper">
              <img src={developer} alt="Developer coding" />
              <div className="floating-card card-1">
                <FaCheckCircle />
                <span>Solution Found!</span>
              </div>
              <div className="floating-card card-2">
                <FaLightbulb />
                <span>+50 Reputation</span>
              </div>
              <div className="floating-card card-3">
                <FaHeart />
                <span>Thanks!</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <h2>Powering the Developer Ecosystem</h2>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <div className="features-header">
            <h2>Why millions of developers choose techOverflow</h2>
            <p>Everything you need to accelerate your development journey</p>
          </div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Communities Section */}
      <section className="communities-section">
        <div className="communities-container">
          <div className="communities-header">
            <h2>Explore 170+ Technology Communities</h2>
            <p>From AI to Web Development, find your tribe and level up your skills</p>
          </div>
          
          <div className="communities-grid">
            <div className="community-card featured">
              <BsDatabaseFillGear />
              <h3>Database Management</h3>
              <span className="community-stats">2.1M questions</span>
            </div>
            
            <div className="community-card">
              <GiArtificialIntelligence />
              <h3>AI & Machine Learning</h3>
              <span className="community-stats">890K questions</span>
            </div>
            
            <div className="community-card">
              <FaLinux />
              <h3>Linux & Open Source</h3>
              <span className="community-stats">1.5M questions</span>
            </div>
            
            <div className="community-card">
              <SiGamedeveloper />
              <h3>Game Development</h3>
              <span className="community-stats">445K questions</span>
            </div>
            
            <div className="community-card">
              <FaUbuntu />
              <h3>Ubuntu & Distributions</h3>
              <span className="community-stats">670K questions</span>
            </div>
            
            <div className="community-card">
              <SiServerfault />
              <h3>DevOps & Infrastructure</h3>
              <span className="community-stats">1.2M questions</span>
            </div>
          </div>
          
          <div className="communities-more">
            <button className="btn-outline" onClick={() => navigate('/tags')}>
              View All Communities
              <FaArrowRight />
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="testimonials-container">
          <div className="testimonials-header">
            <h2>Loved by developers worldwide</h2>
            <div className="rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <span>4.8/5 from 100K+ reviews</span>
            </div>
          </div>
          
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-content">
                  <p>"{testimonial.quote}"</p>
                </div>
                <div className="testimonial-author">
                  <span className="avatar">{testimonial.avatar}</span>
                  <div className="author-info">
                    <div className="author-name">{testimonial.name}</div>
                    <div className="author-role">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="solutions-section">
        <div className="solutions-container">
          <div className="solutions-grid">
            <div className="solution-card">
              <div className="solution-header">
                <FaGem />
                <h3>For Businesses</h3>
              </div>
              <p>Access techOverflow's vast knowledge base through our enterprise API solutions.</p>
              <ul>
                <li>API access to 21M+ Q&As</li>
                <li>Custom integration support</li>
                <li>Enterprise-grade security</li>
                <li>24/7 technical support</li>
              </ul>
              <button className="btn-primary">
                Explore Enterprise
                <FaArrowRight />
              </button>
            </div>
            
            <div className="solution-card">
              <div className="solution-header">
                <FaChartLine />
                <h3>For Marketers</h3>
              </div>
              <p>Reach the world's largest community of developers and technologists.</p>
              <ul>
                <li>50M+ monthly active users</li>
                <li>Targeted developer audience</li>
                <li>Multiple ad formats</li>
                <li>Detailed analytics</li>
              </ul>
              <button className="btn-primary">
                Start Advertising
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <h2>Ready to accelerate your development journey?</h2>
            <p>Join millions of developers who trust techOverflow to solve their toughest coding challenges.</p>
            <div className="cta-buttons">
              <button className="btn-primary large" onClick={() => navigate('/signup')}>
                <FaRocket />
                Join the Community
              </button>
              <button className="btn-secondary large" onClick={() => navigate('/questions')}>
                Ask Your First Question
              </button>
            </div>
          </div>
          <div className="cta-features">
            <div className="cta-feature">
              <FaCheckCircle />
              <span>Free forever</span>
            </div>
            <div className="cta-feature">
              <FaClock />
              <span>Get answers in minutes</span>
            </div>
            <div className="cta-feature">
              <FaMedal />
              <span>Build your reputation</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;