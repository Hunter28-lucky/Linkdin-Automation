import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import InputForm from './components/InputForm';
import OutputDisplay from './components/OutputDisplay';
import VideoOutputDisplay from './components/VideoOutputDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import ParallaxSection from './components/ParallaxSection';
import './App.css';

function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleGenerate = async (formData) => {
    setLoading(true);
    setResult(null);

    try {
      // Determine endpoint based on content type
      const endpoint = formData.contentType === 'video' 
        ? '/api/video/analyze' 
        : '/api/generate';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setResult({ ...data, contentType: formData.contentType });
        const message = formData.contentType === 'video' 
          ? '🎥 Video content analysis complete!'
          : '🔥 Viral content generated successfully!';
        toast.success(message, {
          position: 'top-right',
          autoClose: 3000,
        });
      } else {
        throw new Error(data.message || 'Generation failed');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(`❌ ${error.message}`, {
        position: 'top-right',
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <CustomCursor />
      <ScrollProgress />
      <ToastContainer theme="dark" />
      
      <Header />
      
      <main className="main-container">
        <div className="content-wrapper">
          <ParallaxSection speed={0.3}>
            <InputForm onGenerate={handleGenerate} loading={loading} />
          </ParallaxSection>
          
          {loading && (
            <ParallaxSection speed={0.2}>
              <LoadingSpinner />
            </ParallaxSection>
          )}
          
          {result && !loading && (
            <ParallaxSection speed={0.4}>
              {result.contentType === 'video' 
                ? <VideoOutputDisplay data={result} />
                : <OutputDisplay data={result} />
              }
            </ParallaxSection>
          )}
        </div>
      </main>

      <footer className="footer">
        <p>
          Made with ⚡ by <span className="gradient-text">Krish Goswami</span>
        </p>
        <p className="footer-subtitle">
          Powered by Google Gemini AI • 100% Free Tools
        </p>
      </footer>
    </div>
  );
}

export default App;
