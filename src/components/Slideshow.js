import React, { useState, useEffect, useRef } from 'react';
import { slaps } from '../data/slaps';
import Title from './learn/title';
import Description from './learn/description';
import CardGame from './learn/cardgame';
import '../styles/slideshow.css';
import { Link } from 'react-router-dom';

const Slideshow = () => {

  const cardGameRef = useRef();

  const getInitialSlide = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const slideParam = urlParams.get('slide');
    if (slideParam !== null) {
      const slideIndex = parseInt(slideParam, 10);
      if (!isNaN(slideIndex) && slideIndex >= 0 && slideIndex < slaps.slides.length) {
        return slideIndex;
      }
    }
    return 0;
  };

  const [currentSlide, setCurrentSlide] = useState(getInitialSlide());
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckButtonClicked, setIsCheckButtonClicked] = useState(false);
  const [currentAnswerCorrect, setCurrentAnswerCorrect] = useState(null);

  const handleAnswerChecked = (isCorrect) => {
    setCurrentAnswerCorrect(isCorrect);
  };

  useEffect(() => {
    // update URL when currentSlide changes
    const url = new URL(window.location);
    url.searchParams.set('slide', currentSlide);
    window.history.pushState({}, '', url);
    
    // reset button clicked state when changing slides
    setIsCheckButtonClicked(false);
  }, [currentSlide]);

  const updateServerState = async (slide, isRight) => {
    // console.log('Sending to server - slide:', slide, 'isCorrect:', isRight);
    setIsLoading(true);
    try {
      const response = await fetch('/api/update_progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          current_slide: slide,
          is_correct: isRight
        }),
      });
      
      if (!response.ok) {
        console.error('Failed to update server state');
      }
    } catch (error) {
      console.error('Error updating server state:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkIfSlideVisited = async (slideIndex) => {
    try {
      const response = await fetch('/api/get_progress');
      if (!response.ok) {
        console.error('Failed to get progress');
        return false;
      }
      const data = await response.json();
      return data.previously_visited.includes(slideIndex);
    } catch (error) {
      console.error('Error checking slide visited status:', error);
      return false;
    }
  };

  const nextSlide = async (isRight = false) => {
    if (currentSlide < slaps.slides.length - 1) {
      const nextSlideIndex = currentSlide + 1;
      
      // check if current slide has been visited before
      const isCurrentSlideVisited = await checkIfSlideVisited(currentSlide);
      // console.log('current slide visited before:', isCurrentSlideVisited);
      
      if (!isCurrentSlideVisited && slaps.slides[currentSlide].id !== "review") {
        // for new slides, check button must be clicked
        if (!isCheckButtonClicked) {
          return;
        } else {
          // button was clicked on a new slide, update with correctness
          updateServerState(nextSlideIndex, isRight);
        }
      } else {
        // slide was previously visited, just update position
        updateServerState(nextSlideIndex, null);
      }
      
      setCurrentSlide(nextSlideIndex);
      if (
        slaps.slides[nextSlideIndex].id !== "review" &&
        slaps.slides[nextSlideIndex].id !== "conclusion" &&
        cardGameRef.current
      ) {
        cardGameRef.current.resetDropZones();
      }
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      const prevSlideIndex = currentSlide - 1;
      // just update the slide position without sending correctness info
      updateServerState(prevSlideIndex, null);
      setCurrentSlide(prevSlideIndex);
      if (cardGameRef.current) {
        cardGameRef.current.resetDropZones();
      }
    }
  };

  const handleCheckButtonClick = (clicked) => {
    setIsCheckButtonClicked(clicked);
    // console.log('Check button clicked:', clicked);
  };

  const renderCurrentSlide = () => {
    const slideData = slaps.slides[currentSlide];
    
    // render intro slide
    if (slideData.id === "review") {
      return (
        <div className="intro-slide">
          <Title title={slideData.title} />
          <div className="intro-content">
            <div className="video-container">
              <iframe 
                width="560" 
                height="315" 
                src="https://www.youtube.com/embed/VGp1CDK71PM?si=dCGugwyKlvI-OgAt?start=0&end=90&autoplay=1&rel=0&showinfo=0&loop=1&modestbranding=1&color=white" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      );
    }

    // render conclusion slide
    if (slideData.id === "conclusion") {
      return (
        <div className="conclusion-slide">
          <Title title="You've completed the tutorial!"/>
          
          <div className="conclusion-buttons">
            <div className="conclusion-card-flip-container">
              <Link to="/practice" className="conclusion-card-button practice-button">
                <div className="conclusion-card-flipper">
                  <div className="conclusion-card-front">
                    <span>Practice</span>
                  </div>
                  <div className="conclusion-card-back">
                    <div className="label">Practice</div>
                    <div className="description">
                      mastering your recognition and reflexes from easy to hard!
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          
          <Link to="/" className="home-link">
            Return to home
          </Link>
        </div>
      );
    }
    
    // render standard slide
    return (
      <>
        <Title title={slideData.title} />
        <Description description={slideData.description} />
        <CardGame 
          key={`slide-${currentSlide}`}
          ref={cardGameRef}
          dropZones={slideData.dropZones}
          correctSequence={slideData.correctSequence}
          cards={slideData.cards}
          onAnswerChecked={handleAnswerChecked}
          onCheckButtonClick={handleCheckButtonClick}
        />
      </>
    );
  };

  return (
    
    <div className="slideshow-container">
      <button 
        className={`nav-button prev ${currentSlide === 0 || isLoading ? 'disabled' : ''}`} 
        onClick={prevSlide}
        disabled={currentSlide === 0 || isLoading}
      >
        <img src="https://i.imgur.com/oMyzkuE.png" alt="Previous Slide" className="arrow-image flip-horizontal" />
      </button>
      
      <div className="slide-container">
        <div className="slide">
          {renderCurrentSlide()}
          </div>
      </div>
      
      <button 
        className={`nav-button next ${currentSlide === slaps.slides.length - 1 || isLoading ? 'disabled' : ''}`} 
        onClick={() => nextSlide(currentAnswerCorrect)}
        disabled={currentSlide === slaps.slides.length - 1 || isLoading}
      >
        <img src="https://i.imgur.com/oMyzkuE.png" alt="Next Slide" className="arrow-image" />
      </button>
    </div>
  );
};

export default Slideshow;