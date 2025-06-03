
import React from 'react';
import { Quote } from 'lucide-react';

interface TestimonialCardProps {
  testimonial: {
    text: string;
    author: string;
    company: string;
    role: string;
  };
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <Quote className="w-8 h-8 text-[#FED141] mb-4" />
      <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
      <div className="border-t border-gray-200 pt-4">
        <p className="font-semibold text-black">{testimonial.author}</p>
        <p className="text-sm text-gray-600">{testimonial.role} na {testimonial.company}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
