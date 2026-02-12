import React, { useState } from 'react';

const Home = () => {
  const [lang, setLang] = useState('en');

  const content = {
    en: {
      title: "Small Shop Manager",
      login: "Login",
      signup: "Owner Signup",
      empLogin: "Login as Employee"
    },
    hi: {
      title: "छोटी दुकान प्रबंधक",
      login: "लॉगिन",
      signup: "मालिक साइनअप",
      empLogin: "कर्मचारी लॉगिन"
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <button 
        onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
        className="absolute top-5 right-5 bg-blue-600 text-white px-4 py-2 rounded shadow"
      >
        {lang === 'en' ? 'हिन्दी 🇮🇳' : 'English 🇬🇧'}
      </button>

      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        {content[lang].title}
      </h1>

      <div className="space-y-4 w-full max-w-xs">
        <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700">
          {content[lang].signup}
        </button>
        <button className="w-full bg-white border-2 border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50">
          {content[lang].login}
        </button>
        <hr />
        <button className="w-full text-blue-600 font-medium hover:underline">
          {content[lang].empLogin}
        </button>
      </div>
    </div>
  );
};

export default Home;