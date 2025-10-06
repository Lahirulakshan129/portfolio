import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function AboutMe() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900 text-white flex items-center justify-center px-6 py-12">
      <div className="max-w-4xl w-full bg-purple-950/50 backdrop-blur-md p-10 rounded-2xl shadow-xl">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center mb-4">
          Hi, I’m <span className="text-purple-300">Lahiru Lakshan</span>
        </h1>
        <p className="text-center text-lg text-purple-200 mb-8">
          Final Year CS Undergraduate | Full-Stack Developer | Tech Enthusiast
        </p>

        {/* Bio */}
        <p className="text-base leading-relaxed text-gray-200 mb-6">
          I’m a final year <span className="font-semibold">BSc (Hons) in Computer Science</span> 
          student at <span className="font-semibold">Uva Wellassa University of Sri Lanka</span>.  
          I have hands-on experience in developing projects using{" "}
          <span className="text-purple-300">React, Next.js, PHP, SQL, and Spring Boot</span>, 
          along with solid foundations in other technologies.  
        </p>
        <p className="text-base leading-relaxed text-gray-200 mb-6">
          My passion lies in building scalable applications, solving real-world problems, 
          and constantly learning new technologies. I’m particularly interested in 
          full-stack development, cloud systems, and modern web solutions.
        </p>

        {/* Skills */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-purple-300 mb-4">
            Skills & Technologies
          </h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-gray-300">
            <li className="bg-purple-800/40 p-3 rounded-lg text-center">React</li>
            <li className="bg-purple-800/40 p-3 rounded-lg text-center">Next.js</li>
            <li className="bg-purple-800/40 p-3 rounded-lg text-center">Spring Boot</li>
            <li className="bg-purple-800/40 p-3 rounded-lg text-center">PHP & SQL</li>
            <li className="bg-purple-800/40 p-3 rounded-lg text-center">Java</li>
            <li className="bg-purple-800/40 p-3 rounded-lg text-center">Git/GitHub</li>
          </ul>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-xl font-semibold text-purple-300 mb-4">
            Let’s Connect
          </h2>
          <div className="flex justify-center gap-6 text-2xl">
            <a
              href="mailto:lahiru@example.com"
              className="hover:text-purple-400 transition"
              aria-label="Email"
            >
              <FaEnvelope />
            </a>
            <a
              href="https://github.com/Lahirulakshan129"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
