import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { testimonials } from '../data/mockData.js';
import { pickLang } from '../utils/i18nData.js';

function TestimonialSlider() {
  const { i18n } = useTranslation();
  const [current, setCurrent] = useState(0);
  const active = testimonials[current];

  const previousTestimonial = () => {
    setCurrent((c) => (c - 1 < 0 ? testimonials.length - 1 : c - 1));
  };

  const nextTestimonial = () => {
    setCurrent((c) => (c + 1 >= testimonials.length ? 0 : c + 1));
  };

  return (
    <div className="testimonial-card">
      <div className="testimonial-left">
        <p id="testimonialText">{pickLang(active.text, i18n.language)}</p>

        <div className="testimonial-author">
          <div className="author-square"></div>

          <div>
            <h4 id="testimonialName">{active.name}</h4>
            <span id="testimonialRole">{pickLang(active.role, i18n.language)}</span>
          </div>
        </div>

        <div className="testimonial-arrows">
          <button onClick={previousTestimonial}>&#10094;</button>
          <button onClick={nextTestimonial}>&#10095;</button>
        </div>
      </div>

      <div className="testimonial-right">
        <div className="image-frame">
          <img id="testimonialImage" src={active.image} alt="" />
        </div>

        <div className="slider-dots-vertical">
          {testimonials.map((t, i) => (
            <span key={t.name} className={i === current ? 'active' : ''}></span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TestimonialSlider;
