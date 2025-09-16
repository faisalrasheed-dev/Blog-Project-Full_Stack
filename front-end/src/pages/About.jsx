import React from 'react'

const About = () => {
  return (
    <section className="max-w-3xl mx-auto text-center space-y-6">
  <h2 className="text-3xl font-bold text-gray-800">About InkFlow</h2>
  
  <p className="text-gray-600 text-lg leading-relaxed">
    Welcome to <span className="font-semibold text-blue-600">InkFlow</span>, a space 
    where ideas turn into stories and stories spark conversations. 
    We believe words have the power to inspire, connect, and create change.
  </p>
  
  <p className="text-gray-600 text-lg leading-relaxed">
    From personal reflections to creative insights, our mission is simple:
    to share voices that matter. Whether you’re here to read, learn, or explore,
    InkFlow is your home for meaningful words.
  </p>

  <div className="pt-6 border-t border-gray-300">
    <p className="text-gray-700 text-base">
      Developed with ❤️ by <span className="font-semibold text-gray-900">Muhammed Faisal R</span>
    </p>
    <p className="text-gray-500 text-sm">
      Full Stack Developer | Passionate about React, MERN, and Creative Coding
    </p>
  </div>
</section>

  )
}

export default About