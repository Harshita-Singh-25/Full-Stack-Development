// src/components/FeatureCard.jsx
export default function FeatureCard({ title, description, icon }) {
  return (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:border-indigo-300 transition-all">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}