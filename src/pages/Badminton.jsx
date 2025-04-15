import PageLayout from '../layouts/PageLayout';
import ScrollRevealSection from '../sections/ScrollRevealSection';

export default function Badminton() {
  return (
    <PageLayout
      introLeft={
        <>
          <h2 className="text-2xl font-bold mb-4">NLP & Policy</h2>
          <p>Research focused on language models for climate action.</p>
        </>
      }
      introRight={
        <>
          <h2 className="text-2xl font-bold mb-4">AI for Good</h2>
          <p>Exploring the intersection of machine learning and social impact.</p>
        </>
      }
      after={<ScrollRevealSection />}
    >
      <div>
        <h1 className="text-4xl font-bold mb-4">About My Research</h1>
        <p>Here’s the main content block...</p>
      </div>
    </PageLayout>
  );
}
