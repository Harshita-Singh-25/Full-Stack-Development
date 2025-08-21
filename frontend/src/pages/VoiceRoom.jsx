// src/pages/VoiceRoom.jsx
import { useParams } from 'react-router-dom';

export default function VoiceRoom() {
  const { id } = useParams();
  
  const participants = [
    { id: 1, name: 'Alex Johnson', speaking: true, muted: false },
    { id: 2, name: 'Sam Wilson', speaking: false, muted: true },
    { id: 3, name: 'Taylor Smith', speaking: false, muted: false },
    { id: 4, name: 'You', speaking: false, muted: false },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold mb-6">Voice Room #{id}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {participants.map(participant => (
            <div 
              key={participant.id} 
              className={`p-4 rounded-lg border ${participant.speaking ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${participant.speaking ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                  {participant.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium">{participant.name}</p>
                  <p className="text-sm text-gray-500">
                    {participant.muted ? 'Muted' : participant.speaking ? 'Speaking' : 'Connected'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center space-x-4">
          <button className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </button>
          <button className="p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.728-2.728" />
            </svg>
          </button>
          <button className="p-3 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
          <button className="p-3 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </button>
          <button className="p-3 bg-red-600 text-white rounded-full hover:bg-red-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}